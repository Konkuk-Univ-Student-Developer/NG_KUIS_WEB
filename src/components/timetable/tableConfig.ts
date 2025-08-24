// Table configuration presets for different table types

export interface TableConfig {
  headers: string[];
  columns: string[];
}

export const TABLE_CONFIGS: Record<string, TableConfig> = {
  // Mobile table settings
  courseInfo: {
    headers: ['학년', '학수번호', '이수구분', '과목번호', '학점'],
    columns: ['grade', 'courseCode', 'category', 'courseNumber', 'credit']
  },
  enrollment: {
    headers: ['현재인원', '학부인원', '대학생인원', '제한인원'],
    columns: ['enrolled', 'undergraduateEnrolled', 'graduateEnrolled', 'capacity']
  },
  textbooks: {
    headers: ['번호', '교재구분', '교재명', '저자', '링크'],
    columns: ['index', 'type', 'name', 'author', 'link']
  },
  assignments: {
    headers: ['번호', '구분', '과제명', '제출시기'],
    columns: ['index', 'type', 'name', 'dueDate']
  },
  evaluation: {
    headers: ['항목', '비중', '만점', '공개여부', '설명'],
    columns: ['item', 'weight', 'maxScore', 'isPublic', 'description']
  },

  // Desktop specific table settings
  desktopBasic1: {
    headers: ['학년', '학수번호', '이수구분', '과목번호', '학점', '시간', '강의요시/강의실', '담당교수'],
    columns: ['grade', 'courseCode', 'category', 'courseNumber', 'credit', 'hours', 'schedule', 'professor']
  },
  desktopBasic2: {
    headers: ['개설학부(과)/전공', '수강학부(과)/전공', '제청학부(과)/전공', '비고'],
    columns: ['openDept', 'targetDept', 'requestDept', 'note']
  },
  desktopBasic3: {
    headers: ['수업유형', '캡스톤디자인', 'NCS', '패스과목', '원어강의', '원어유형', '현재인원', '학부인원', '대학원인원', '제한인원'],
    columns: ['classType', 'capstone', 'ncs', 'passSubject', 'foreignLang', 'langType', 'currentEnroll', 'undergrad', 'grad', 'capacity']
  },
  desktopTextbooks: {
    headers: ['번호', '교재구분', '교재명', '저자', '출판사', '출판년도', '링크'],
    columns: ['index', 'type', 'name', 'author', 'publisher', 'publishYear', 'link']
  },
  desktopAssignments: {
    headers: ['번호', '구분', '과제명', '제출시기'],
    columns: ['index', 'type', 'name', 'dueDate']
  },
  desktopEvaluation: {
    headers: ['항목', '비중(%)', '만점', '공개여부', '설명'],
    columns: ['item', 'weight', 'maxScore', 'isPublic', 'description']
  }
};