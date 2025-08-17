import type { LectureDetail } from '@/constants/DetailLectureConstants';

interface LecturePlanParams {
  year: string;
  courseNumber: string;   // 과목번호 - sbjtId로 전송 (e.g., 0702, 1203, 3143)
  courseCode?: string;    // 학수번호 - 현재는 사용하지 않음 (ltShtm은 B01012로 고정)
}

/**
 * Parse lecture plan HTML from KUPIS
 * Extracts structured data from HTML tables
 */
const parseLecturePlanHTML = (html: string): Partial<LectureDetail> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const result: Partial<LectureDetail> = {};
  
  console.log('🔍 Starting HTML parsing...', {
    hasBody: !!doc.body,
    tableCount: doc.querySelectorAll('table').length,
    thCount: doc.querySelectorAll('th').length,
    tdCount: doc.querySelectorAll('td').length
  });
  
  try {
    // Helper function to extract text from table cell
    const getText = (selector: string): string => {
      const element = doc.querySelector(selector);
      return element?.textContent?.trim() || '';
    };
    
    // Helper function to extract table data by header text
    const getTableCellByHeader = (headerText: string): string => {
      const headers = Array.from(doc.querySelectorAll('th, td'));
      const header = headers.find(h => h.textContent?.includes(headerText));
      
      console.log(`🔎 Searching for header "${headerText}":`, {
        found: !!header,
        headerText: header?.textContent?.trim(),
        totalHeaders: headers.length
      });
      
      if (header) {
        const nextCell = header.nextElementSibling || header.parentElement?.nextElementSibling?.querySelector('td');
        const value = nextCell?.textContent?.trim() || '';
        console.log(`  → Found value: "${value}"`);
        return value;
      }
      return '';
    };
    
    // Extract basic information
    console.log('📊 Extracting basic information...');
    result.subjectName = getTableCellByHeader('교과목명') || getTableCellByHeader('과목명');
    result.subjectNameEng = getTableCellByHeader('영문교과목명') || getTableCellByHeader('영문명');
    result.courseCode = getTableCellByHeader('학수번호');  // e.g., BBAB67057
    result.courseNumber = getTableCellByHeader('과목번호'); // Should be 4-digit like 0702
    // If courseNumber is longer than 4 digits, truncate to first 4
    if (result.courseNumber && result.courseNumber.length > 4) {
      result.courseNumber = result.courseNumber.substring(0, 4);
    }
    result.grade = parseInt(getTableCellByHeader('학년')) || undefined;
    result.credit = parseFloat(getTableCellByHeader('학점')) || undefined;
    result.category = getTableCellByHeader('이수구분');
    result.department = getTableCellByHeader('학부') || getTableCellByHeader('학과');
    result.professor = getTableCellByHeader('담당교수') || getTableCellByHeader('교강사');
    
    console.log('📋 Basic info extracted:', {
      subjectName: result.subjectName || '(empty)',
      courseCode: result.courseCode || '(empty)',
      courseNumber: result.courseNumber || '(empty)',
      professor: result.professor || '(empty)',
      grade: result.grade,
      credit: result.credit
    });
    
    // Extract enrollment information
    result.capacity = parseInt(getTableCellByHeader('제한인원')) || undefined;
    result.enrolled = parseInt(getTableCellByHeader('현재인원')) || undefined;
    result.undergraduateEnrolled = parseInt(getTableCellByHeader('학부인원')) || undefined;
    result.graduateEnrolled = parseInt(getTableCellByHeader('대학원인원')) || undefined;
    
    // Extract enrollment notes/prerequisites
    const enrollmentNotes = getTableCellByHeader('수강신청유의사항') || getTableCellByHeader('수강신청 유의사항');
    if (enrollmentNotes) {
      result.prerequisites = [enrollmentNotes];
    }
    
    // Extract professor information
    const professorInfo = {
      name: result.professor || '',
      email: getTableCellByHeader('이메일') || getTableCellByHeader('E-mail'),
      phone: getTableCellByHeader('연락처') || getTableCellByHeader('전화번호'),
      consultationHours: getTableCellByHeader('상담시간') || getTableCellByHeader('상담가능시간')
    };
    if (professorInfo.name) {
      result.professorInfo = professorInfo;
    }
    
    // Extract competency goals - handle multiline content in cell
    const coreCompetencyGoalText = getTableCellByHeader('핵심역량강의목표') || getTableCellByHeader('핵심역량');
    
    const competencyGoals = {
      coreCompetencyGoal: coreCompetencyGoalText,
      mainCompetency: getTableCellByHeader('주 전공역량') || getTableCellByHeader('주전공역량'),
      mainCompetencyDefinition: getTableCellByHeader('주 전공역량 정의') || getTableCellByHeader('주전공역량정의'),
      subCompetency1: getTableCellByHeader('보조전공역량1') || getTableCellByHeader('보조 전공역량1'),
      subCompetency1Definition: getTableCellByHeader('보조전공역량1 정의') || getTableCellByHeader('보조 전공역량1 정의'),
      subCompetency2: getTableCellByHeader('보조전공역량2') || getTableCellByHeader('보조 전공역량2'),
      subCompetency2Definition: getTableCellByHeader('보조전공역량2 정의') || getTableCellByHeader('보조 전공역량2 정의'),
      competencyBasedGoal: getTableCellByHeader('역량기반교육목표') || getTableCellByHeader('역량기반 교육목표'),
      jobCompetencies: []
    };
    
    // Extract job competencies (직무역량)
    const jobCompCell = getTableCellByHeader('직무역량');
    if (jobCompCell) {
      const competencies = jobCompCell.split(/[,，、]/).map(c => c.trim()).filter(c => c);
      competencyGoals.jobCompetencies = competencies;
    }
    
    if (competencyGoals.coreCompetencyGoal || competencyGoals.mainCompetency) {
      result.competencyGoals = competencyGoals;
    }
    
    // Extract evaluation items - look for table with 항목/비중/만점/공개여부 headers
    const evaluationItems: any[] = [];
    const evalTable = Array.from(doc.querySelectorAll('table')).find(table => 
      table.textContent?.includes('항목') && table.textContent?.includes('비중') && table.textContent?.includes('만점')
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
            let itemName = item;
            if (item.includes('출석')) itemName = '출석률';
            else if (item.includes('중간')) itemName = '중간';
            else if (item.includes('기말')) itemName = '기말';
            else if (item.includes('과제')) itemName = '과제물';
            else if (item.includes('프로젝트')) itemName = '프로젝트';
            else if (item.includes('발표')) itemName = '발표';
            else if (item.includes('퀴즈')) itemName = '퀴즈';
            else if (item.includes('토론')) itemName = '토론';
            
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
    const textbooks: any[] = [];
    const textbookTable = Array.from(doc.querySelectorAll('table')).find(table => {
      const headers = table.querySelectorAll('th');
      return Array.from(headers).some(h => h.textContent?.includes('교재명'));
    });
    
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
    const assignments: any[] = [];
    const assignmentTable = Array.from(doc.querySelectorAll('table')).find(table => {
      const headers = table.querySelectorAll('th');
      return Array.from(headers).some(h => h.textContent?.includes('과제명'));
    });
    
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
    const weeklyPlans: any[] = [];
    const weeklyTable = Array.from(doc.querySelectorAll('table')).find(table => {
      const headers = table.querySelectorAll('th');
      return Array.from(headers).some(h => 
        h.textContent?.includes('주차') || h.textContent?.includes('주별')
      );
    });
    
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
    
    // Extract description (course overview)
    result.description = getTableCellByHeader('교과목개요') || getTableCellByHeader('과목개요') || getTableCellByHeader('강의개요');
    
    // Extract evaluation method
    result.evaluation = getTableCellByHeader('평가방법') || getTableCellByHeader('성적평가방법');
    
    // Extract room and time
    result.room = getTableCellByHeader('강의실');
    result.time = getTableCellByHeader('강의시간') || getTableCellByHeader('수업시간');
    
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
  
  console.log('🌐 Fetching Lecture Plan from KUPIS:', {
    year,
    ltShtm,  // Fixed as B01012
    sbjtId: courseNumber,
    fullUrl: url
  });
  
  try {
    // Note: This will likely fail due to CORS in production
    // You'll need to either:
    // 1. Set up a proxy in vite.config.ts for development
    // 2. Create a backend endpoint that fetches the HTML
    // 3. Use a CORS proxy service
    
    // For development, assuming proxy is configured in vite.config.ts
    const proxyUrl = `/api/kupis/sugang/acd/cour/plan/CourLecturePlanInq.jsp?ltYy=${year}&ltShtm=${ltShtm}&sbjtId=${courseNumber}`;
    
    console.log('📡 Attempting fetch with proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
      },
    });
    
    // Log response details
    console.log('📨 Response Details:', {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      url: response.url
    });
    
    if (!response.ok) {
      console.error(`❌ Response not OK: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch lecture plan: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Log HTML response
    console.log('📄 HTML Response:', {
      length: html.length,
      first500Chars: html.substring(0, 500),
      isEmpty: html.trim().length === 0,
      containsError: html.includes('error') || html.includes('Error'),
      containsHtml: html.includes('<html') || html.includes('<HTML'),
      containsTable: html.includes('<table') || html.includes('<TABLE')
    });
    
    // Check if we got a valid HTML response
    if (!html || html.trim().length === 0) {
      console.error('❌ Empty HTML response received');
      throw new Error('Empty response from KUPIS');
    }
    
    if (html.includes('error') || html.includes('Error')) {
      console.warn('⚠️ HTML contains error keyword, but continuing to parse');
    }
    
    // Parse the HTML
    console.log('🔧 Starting HTML parsing...');
    const parsedData = parseLecturePlanHTML(html);
    
    // Log parsed data
    console.log('✅ Parsed Data Result:', {
      hasData: Object.keys(parsedData).length > 0,
      fields: Object.keys(parsedData),
      subjectName: parsedData.subjectName || '(empty)',
      courseCode: parsedData.courseCode || '(empty)',
      courseNumber: parsedData.courseNumber || '(empty)',
      professor: parsedData.professor || '(empty)',
      fullParsedData: parsedData
    });
    
    return parsedData;
    
  } catch (error) {
    console.error('❌ Error fetching lecture plan:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // In case of error, try direct fetch (for testing)
    console.log('🔄 Attempting direct fetch to test connectivity...');
    try {
      const directResponse = await fetch(url, {
        mode: 'no-cors', // This won't give us the response body but can test connectivity
      });
      console.log('✅ Direct fetch completed (no-cors mode, no body available)');
    } catch (directError) {
      console.error('❌ Direct fetch also failed:', directError);
    }
    
    throw error;
  }
};

// Export types
export type { LecturePlanParams };