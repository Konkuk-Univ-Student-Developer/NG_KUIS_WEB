import type { LectureDetail } from '@/constants/DetailLectureConstants';

interface LecturePlanParams {
  year: string;
  courseCode: string;     // 학수번호 (e.g., BBAB67057)
  courseNumber: string;   // 4자리 과목번호 (e.g., 0702, 1203)
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
    result.subjectNameEng = getTableCellByHeader('영문명');
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
    
    // Extract competency goals
    const competencyGoals = {
      coreCompetencyGoal: getTableCellByHeader('핵심역량강의목표') || getTableCellByHeader('핵심역량'),
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
    
    // Extract evaluation items
    const evaluationItems: any[] = [];
    const evalTable = Array.from(doc.querySelectorAll('table')).find(table => 
      table.textContent?.includes('성적평가') || table.textContent?.includes('평가항목')
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
            evaluationItems.push({
              item,
              weight,
              maxScore,
              isPublic: cells[3]?.textContent?.includes('O') || cells[3]?.querySelector('input[type="checkbox"]:checked') !== null,
              description: cells[4]?.textContent?.trim() || ''
            });
          }
        }
      });
    }
    
    if (evaluationItems.length > 0) {
      result.evaluationItems = evaluationItems;
    }
    
    // Extract textbooks
    const textbooks: any[] = [];
    const textbookTable = Array.from(doc.querySelectorAll('table')).find(table => 
      table.textContent?.includes('교재명') || table.textContent?.includes('교재')
    );
    
    if (textbookTable) {
      const rows = textbookTable.querySelectorAll('tbody tr');
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
          const type = cells[1]?.textContent?.trim();
          const name = cells[2]?.textContent?.trim();
          const author = cells[3]?.textContent?.trim();
          const link = cells[4]?.textContent?.trim() || '';
          if (name && name !== '-') {
            textbooks.push({
              id: index + 1,
              type: type || '주교재',
              name,
              author: author || '',
              link
            });
          }
        }
      });
    }
    
    if (textbooks.length > 0) {
      result.textbooks = textbooks;
    }
    
    // Extract assignments
    const assignments: any[] = [];
    const assignmentTable = Array.from(doc.querySelectorAll('table')).find(table => 
      table.textContent?.includes('과제명') || table.textContent?.includes('과제')
    );
    
    if (assignmentTable) {
      const rows = assignmentTable.querySelectorAll('tbody tr');
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
          const type = cells[1]?.textContent?.trim();
          const name = cells[2]?.textContent?.trim();
          const dueDate = cells[3]?.textContent?.trim() || '';
          if (name && name !== '-') {
            assignments.push({
              id: index + 1,
              type: type || '과제',
              name,
              dueDate
            });
          }
        }
      });
    }
    
    if (assignments.length > 0) {
      result.assignments = assignments;
    }
    
    // Extract weekly plans
    const weeklyPlans: any[] = [];
    const weeklyTable = Array.from(doc.querySelectorAll('table')).find(table => 
      table.textContent?.includes('주별') || table.textContent?.includes('주차')
    );
    
    if (weeklyTable) {
      const rows = weeklyTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 5) {
          const weekText = cells[0]?.textContent?.trim();
          const weekMatch = weekText?.match(/(\d+)/);
          if (weekMatch) {
            const week = parseInt(weekMatch[1]);
            const dateRange = cells[1]?.textContent?.trim() || '';
            const topic = cells[2]?.textContent?.trim() || '';
            const instructor = cells[3]?.textContent?.trim() || result.professor || '';
            const activities = cells[4]?.textContent?.trim() || '';
            const type = cells[5]?.textContent?.trim() || '이론';
            const schedule = cells[6]?.textContent?.trim() || '';
            
            if (topic) {
              weeklyPlans.push({
                week,
                dateRange,
                topic,
                instructor,
                activities,
                type,
                schedule
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
 * @param params - year, courseCode, courseNumber
 * @returns Parsed lecture plan data
 */
export const fetchLecturePlan = async (params: LecturePlanParams): Promise<Partial<LectureDetail>> => {
  const { year, courseCode, courseNumber } = params;
  
  // Build KUPIS URL
  const url = `https://kupis.konkuk.ac.kr/sugang/acd/cour/plan/CourLecturePlanInq.jsp?ltYy=${year}&ltShtm=${courseCode}&sbjtId=${courseNumber}`;
  
  console.log('🌐 Fetching Lecture Plan from KUPIS:', {
    year,
    courseCode,
    courseNumber,
    fullUrl: url
  });
  
  try {
    // Note: This will likely fail due to CORS in production
    // You'll need to either:
    // 1. Set up a proxy in vite.config.ts for development
    // 2. Create a backend endpoint that fetches the HTML
    // 3. Use a CORS proxy service
    
    // For development, assuming proxy is configured in vite.config.ts
    const proxyUrl = `/api/kupis/sugang/acd/cour/plan/CourLecturePlanInq.jsp?ltYy=${year}&ltShtm=${courseCode}&sbjtId=${courseNumber}`;
    
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