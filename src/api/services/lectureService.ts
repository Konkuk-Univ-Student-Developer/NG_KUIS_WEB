import type { 
  LectureDetail, 
  EvaluationItem, 
  Textbook, 
  Assignment, 
  WeeklyPlan 
} from '@/constants/DetailLectureConstants';

interface LecturePlanParams {
  year: string;
  courseNumber: string;   // 과목번호 - sbjtId로 전송 (e.g., 0702, 1203, 3143)
}

// Development mode flag
const isDev = import.meta.env.DEV;

/**
 * Parse lecture plan HTML from KUPIS
 * Extracts structured data from HTML tables
 */
const parseLecturePlanHTML = (html: string): Partial<LectureDetail> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const result: Partial<LectureDetail> = {};
  
  try {
    // Cache headers for better performance
    const allCells = Array.from(doc.querySelectorAll('th, td'));
    
    // Helper function to extract table data by header text(s)
    const getTableCellByHeader = (...headerTexts: string[]): string => {
      for (const headerText of headerTexts) {
        const header = allCells.find(h => h.textContent?.includes(headerText));
        if (header) {
          const nextCell = header.nextElementSibling || 
                          header.parentElement?.nextElementSibling?.querySelector('td');
          return nextCell?.textContent?.trim() || '';
        }
      }
      return '';
    };
    
    // Extract basic information
    result.subjectName = getTableCellByHeader('교과목명', '과목명');
    result.subjectNameEng = getTableCellByHeader('영문교과목명', '영문명');
    result.courseCode = getTableCellByHeader('학수번호');  // e.g., BBAB67057
    result.courseNumber = getTableCellByHeader('과목번호')?.substring(0, 4); // Ensure 4-digit
    
    const gradeStr = getTableCellByHeader('학년');
    const creditStr = getTableCellByHeader('학점');
    result.grade = gradeStr ? parseInt(gradeStr) : undefined;
    result.credit = creditStr ? parseFloat(creditStr) : undefined;
    
    result.category = getTableCellByHeader('이수구분');
    result.department = getTableCellByHeader('학부', '학과');
    result.professor = getTableCellByHeader('담당교수', '교강사');
    
    // Extract enrollment information
    const capacityStr = getTableCellByHeader('제한인원');
    const enrolledStr = getTableCellByHeader('현재인원');
    const undergradStr = getTableCellByHeader('학부인원');
    const gradStr = getTableCellByHeader('대학원인원');
    
    result.capacity = capacityStr ? parseInt(capacityStr) : undefined;
    result.enrolled = enrolledStr ? parseInt(enrolledStr) : undefined;
    result.undergraduateEnrolled = undergradStr ? parseInt(undergradStr) : undefined;
    result.graduateEnrolled = gradStr ? parseInt(gradStr) : undefined;
    
    // Extract enrollment notes/prerequisites
    const enrollmentNotes = getTableCellByHeader('수강신청유의사항', '수강신청 유의사항');
    if (enrollmentNotes) {
      result.prerequisites = [enrollmentNotes];
    }
    
    // Extract professor information
    if (result.professor) {
      const email = getTableCellByHeader('이메일', 'E-mail');
      const phone = getTableCellByHeader('연락처', '전화번호');
      const consultationHours = getTableCellByHeader('상담시간', '상담가능시간');
      
      result.professorInfo = {
        name: result.professor,
        email,
        phone,
        consultationHours
      };
    }
    
    // Extract competency goals
    const coreCompetencyGoal = getTableCellByHeader('핵심역량강의목표', '핵심역량');
    const mainCompetency = getTableCellByHeader('주 전공역량', '주전공역량');
    
    if (coreCompetencyGoal || mainCompetency) {
      const jobCompCell = getTableCellByHeader('직무역량');
      const jobCompetencies = jobCompCell 
        ? jobCompCell.split(/[,，、]/).map(c => c.trim()).filter(Boolean)
        : [];
      
      result.competencyGoals = {
        coreCompetencyGoal,
        mainCompetency,
        mainCompetencyDefinition: getTableCellByHeader('주 전공역량 정의', '주전공역량정의'),
        subCompetency1: getTableCellByHeader('보조전공역량1', '보조 전공역량1'),
        subCompetency1Definition: getTableCellByHeader('보조전공역량1 정의', '보조 전공역량1 정의'),
        subCompetency2: getTableCellByHeader('보조전공역량2', '보조 전공역량2'),
        subCompetency2Definition: getTableCellByHeader('보조전공역량2 정의', '보조 전공역량2 정의'),
        competencyBasedGoal: getTableCellByHeader('역량기반교육목표', '역량기반 교육목표'),
        jobCompetencies
      };
    }
    
    // Extract evaluation items - look for table with 항목/비중/만점/공개여부 headers
    const evaluationItems: EvaluationItem[] = [];
    const evalTable = Array.from(doc.querySelectorAll('table')).find(table => 
      table.textContent?.includes('항목') && 
      table.textContent?.includes('비중') && 
      table.textContent?.includes('만점')
    );
    
    if (evalTable) {
      const rows = evalTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
          const item = cells[0]?.textContent?.trim();
          const weight = cells[1]?.textContent?.trim();
          const maxScore = parseInt(cells[2]?.textContent?.trim() || '0');
          if (item && !item.includes('합계')) {
            // Map evaluation item names
            const itemMapping: Record<string, string> = {
              '출석': '출석률',
              '중간': '중간',
              '기말': '기말',
              '과제': '과제물',
              '프로젝트': '프로젝트',
              '발표': '발표',
              '퀴즈': '퀴즈',
              '토론': '토론'
            };
            
            const itemName = Object.entries(itemMapping).find(([key]) => 
              item.includes(key)
            )?.[1] || item;
            
            evaluationItems.push({
              item: itemName,
              weight: weight + (weight.includes('%') ? '' : '%'),
              maxScore,
              isPublic: cells[3]?.textContent?.includes('공개') || cells[3]?.textContent?.includes('O'),
              description: cells[4]?.textContent?.trim() || ''
            });
          }
        }
      });
    }
    
    if (evaluationItems.length > 0) {
      result.evaluationItems = evaluationItems;
    }
    
    // Extract textbooks - look for table with 교재명 header
    const textbooks: Textbook[] = [];
    const textbookTable = Array.from(doc.querySelectorAll('table')).find(table => 
      Array.from(table.querySelectorAll('th')).some(h => h.textContent?.includes('교재명'))
    );
    
    if (textbookTable) {
      const rows = textbookTable.querySelectorAll('tbody tr');
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
          // Adjust indices based on actual HTML structure
          const type = cells[1]?.textContent?.trim() || '주교재';
          const name = cells[2]?.textContent?.trim();
          const author = cells[3]?.textContent?.trim();
          const publisher = cells[4]?.textContent?.trim() || '';
          const year = cells[5]?.textContent?.trim() || '';
          
          if (name && name !== '-' && name !== '') {
            textbooks.push({
              id: index + 1,
              type,
              name,
              author: author || '',
              link: publisher + (year ? ` (${year})` : '')
            });
          }
        }
      });
    }
    
    if (textbooks.length > 0) {
      result.textbooks = textbooks;
    }
    
    // Extract assignments - look for table with 과제명 header
    const assignments: Assignment[] = [];
    const assignmentTable = Array.from(doc.querySelectorAll('table')).find(table => 
      Array.from(table.querySelectorAll('th')).some(h => h.textContent?.includes('과제명'))
    );
    
    if (assignmentTable) {
      const rows = assignmentTable.querySelectorAll('tbody tr');
      // Handle multiple tbody elements in assignment table
      const tbodies = assignmentTable.querySelectorAll('tbody');
      let assignmentIndex = 0;
      
      tbodies.forEach(tbody => {
        const row = tbody.querySelector('tr');
        if (row) {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 3) {
            const number = cells[0]?.textContent?.trim();
            const name = cells[1]?.textContent?.trim();
            const dueDate = cells[2]?.textContent?.trim() || '';
            const method = cells[3]?.textContent?.trim() || '';
            
            if (name && name !== '-' && name !== '') {
              assignmentIndex++;
              // Format date from YYYYMMDD to YYYY-MM-DD
              let formattedDate = dueDate;
              if (dueDate && dueDate.length === 8) {
                formattedDate = `${dueDate.substring(0, 4)}-${dueDate.substring(4, 6)}-${dueDate.substring(6, 8)}`;
              }
              
              assignments.push({
                id: assignmentIndex,
                type: '과제',
                name,
                dueDate: formattedDate
              });
            }
          }
        }
      });
    }
    
    if (assignments.length > 0) {
      result.assignments = assignments;
    }
    
    // Extract weekly plans - look for table with 주차/주별 header
    const weeklyPlans: WeeklyPlan[] = [];
    const weeklyTable = Array.from(doc.querySelectorAll('table')).find(table => 
      Array.from(table.querySelectorAll('th')).some(h => 
        h.textContent?.includes('주차') || h.textContent?.includes('주별')
      )
    );
    
    if (weeklyTable) {
      const rows = weeklyTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
          const weekText = cells[0]?.textContent?.trim();
          const weekMatch = weekText?.match(/(\d+)/);
          if (weekMatch) {
            const week = parseInt(weekMatch[1]);
            const dateRange = cells[1]?.textContent?.trim() || '';
            const topic = cells[2]?.textContent?.trim() || '';
            const content = cells[3]?.textContent?.trim() || '';
            const type = cells[4]?.textContent?.trim() || '';
            const activities = cells[5]?.textContent?.trim() || '';
            const instructor = cells[6]?.textContent?.trim() || result.professor || '';
            
            if (topic || content) {
              weeklyPlans.push({
                week,
                dateRange,
                topic: topic || content,
                instructor,
                activities: content || activities || '',
                type: type || '이론',
                schedule: ''
              });
            }
          }
        }
      });
    }
    
    if (weeklyPlans.length > 0) {
      result.weeklyPlans = weeklyPlans;
    }
    
    // Extract description, evaluation, room and time
    result.description = getTableCellByHeader('교과목개요', '과목개요', '강의개요');
    result.evaluation = getTableCellByHeader('평가방법', '성적평가방법');
    result.room = getTableCellByHeader('강의실');
    result.time = getTableCellByHeader('강의시간', '수업시간');
    
  } catch (error) {
    console.error('Error parsing lecture plan HTML:', error);
  }
  
  return result;
};

/**
 * Fetch lecture plan from KUPIS
 * @param params - year and courseNumber (ltShtm is fixed as B01012)
 * @returns Parsed lecture plan data
 */
export const fetchLecturePlan = async (params: LecturePlanParams): Promise<Partial<LectureDetail>> => {
  const { year, courseNumber } = params;
  
  // Build KUPIS URL - ltShtm is fixed as B01012
  const ltShtm = 'B01012';  // 고정값
  const url = `https://kupis.konkuk.ac.kr/sugang/acd/cour/plan/CourLecturePlanInq.jsp?ltYy=${year}&ltShtm=${ltShtm}&sbjtId=${courseNumber}`;
  
  if (isDev) {
    console.log('🌐 Fetching Lecture Plan from KUPIS:', {
      year,
      ltShtm,
      sbjtId: courseNumber
    });
  }
  
  try {
    // Use proxy URL for development (configured in vite.config.ts)
    const proxyUrl = `/api/kupis/sugang/acd/cour/plan/CourLecturePlanInq.jsp?ltYy=${year}&ltShtm=${ltShtm}&sbjtId=${courseNumber}`;
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch lecture plan: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Check if we got a valid HTML response
    if (!html?.trim()) {
      throw new Error('Empty response from KUPIS');
    }
    
    // Parse the HTML
    const parsedData = parseLecturePlanHTML(html);
    
    if (isDev && Object.keys(parsedData).length > 0) {
      console.log('✅ Successfully parsed lecture plan data');
    }
    
    return parsedData;
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching lecture plan:', errorMessage);
    throw error;
  }
};

// Export types
export type { LecturePlanParams };