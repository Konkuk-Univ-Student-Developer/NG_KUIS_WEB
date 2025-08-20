import TermGrade from '@/components/grade/TermGrade';
import TotalGrade from '@/components/grade/TotalGrade';

import type { 
  ColumnConfig, 
  RowData, 
  GradeSummaryData
} from '@/types/grade';

// 테이블 스타일 관련 상수
export const cellBaseClasses =
  'flex justify-center items-center p-2 flex-shrink-0 break-keep';
export const headerTextClasses =
  'text-black text-sm md:text-lg font-bold text-center';
export const valueTextClasses = 'text-black text-sm md:text-lg text-center';

// Grade 탭 관련 상수
export const GRADE_TABS = [
  '정규학기 성적 조회',
  '계절학기 성적 조회',
  '전체 성적 조회',
];

export const TAB_COMPONENTS: { [key: string]: React.FC } = {
  '정규학기 성적 조회': TermGrade,
  '전체 성적 조회': TotalGrade,
};

// 정규학기 성적 조회 요약 카드 데이터
export const TERM_SUMMARY_DATA: GradeSummaryData = {
  cards: [
    { title: '평점 평균', value: 4.5, unit: '/4.5', isHighlighted: true },
    { title: '취득/신청학점', value: 18, unit: '/18', isHighlighted: true },
    { title: '학사경고/우등구분', value: 'N / Y', isHighlighted: false },
  ],
};

// 전체 성적 조회 학기별 요약 카드 데이터
export const TOTAL_SUMMARY_DATA: GradeSummaryData = {
  cards: [
    { title: '평점 평균', value: 4.5, unit: '/4.5', isHighlighted: true },
    { title: '취득/신청학점', value: 18, unit: '/18', isHighlighted: true },
    { title: '백분율', value: 100.0, isHighlighted: true },
    { title: '학기별 석차', value: 1, unit: '/157', isHighlighted: true },
  ],
};

// 정규학기 성적조회 테이블 데이터
export const TERM_GRADE_COLUMNS: ColumnConfig[] = [
  {
    id: 'number',
    label: 'No',
    desktop: { row: 1, widthClass: 'w-1/15' },
  },
  {
    id: 'courseNumber',
    label: '학수번호',
    desktop: { row: 1, widthClass: 'w-2/15' },
  },
  {
    id: 'subjectNumber',
    label: '과목번호',
    desktop: { row: 1, widthClass: 'w-1/15' },
  },
  {
    id: 'courseName',
    label: '과목명',
    desktop: { row: 1, widthClass: 'w-3/15' },
  },
  {
    id: 'professor',
    label: '담당교수',
    desktop: { row: 1, widthClass: 'w-1/15' },
  },
  {
    id: 'unit',
    label: '학점',
    desktop: { row: 1, widthClass: 'w-1/15' },
  },
  {
    id: 'classification',
    label: '이수구분',
    desktop: { row: 1, widthClass: 'w-1/15' },
  },
  {
    id: 'rating',
    label: '등급',
    desktop: { row: 1, widthClass: 'w-1/15' },
  },
  {
    id: 'evaluationMethod',
    label: '성적평가방법',
    desktop: { row: 1, widthClass: 'w-2/15' },
  },
  {
    id: 'DetailedGrades',
    label: '상세성적 보기',
    desktop: { row: 1, widthClass: 'w-2/15' },
  },
];

export const TERM_GRADE_ROWS: RowData[] = [
  {
    number: 1,
    courseNumber: 'C0AA8723',
    subjectNumber: '1114',
    courseName: '컴퓨터공학개론',
    professor: '김건국',
    unit: 3,
    classification: '전선',
    rating: 'A+',
    evaluationMethod: '상대평가',
    DetailedGrades: '상세보기',
  },
  {
    number: 2,
    courseNumber: 'C0AA8723',
    subjectNumber: '1114',
    courseName: '컴퓨터공학개론',
    professor: '김건국',
    unit: 3,
    classification: '전선',
    rating: 'A+',
    evaluationMethod: '상대평가',
    DetailedGrades: '상세보기',
  },
  {
    number: 3,
    courseNumber: 'C0AA8723',
    subjectNumber: '1114',
    courseName: '컴퓨터공학개론',
    professor: '김건국',
    unit: 3,
    classification: '전선',
    rating: 'A+',
    evaluationMethod: '상대평가',
    DetailedGrades: '상세보기',
  },
  {
    number: 4,
    courseNumber: 'C0AA8723',
    subjectNumber: '1114',
    courseName: '컴퓨터공학개론',
    professor: '김건국',
    unit: 3,
    classification: '전선',
    rating: 'A+',
    evaluationMethod: '상대평가',
    DetailedGrades: '상세보기',
  },
  {
    number: 5,
    courseNumber: 'C0AA8723',
    subjectNumber: '1114',
    courseName: '컴퓨터공학개론',
    professor: '김건국',
    unit: 3,
    classification: '전선',
    rating: 'A+',
    evaluationMethod: '상대평가',
    DetailedGrades: '상세보기',
  },
  {
    number: 6,
    courseNumber: 'C0AA8723',
    subjectNumber: '1114',
    courseName: '컴퓨터공학개론',
    professor: '김건국',
    unit: 3,
    classification: '전선',
    rating: 'A+',
    evaluationMethod: '상대평가',
    DetailedGrades: '상세보기',
  },
];

// 상세 성적 테이블 컬럼 설정
export const DETAIL_GRADE_COLUMNS: ColumnConfig[] = [
  {
    id: 'attendance',
    label: '출석',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'midterm',
    label: '중간고사',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'final',
    label: '기말고사',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'assignment',
    label: '과제물',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'project',
    label: '프로젝트',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'quiz',
    label: '퀴즈',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'presentation',
    label: '발표',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'discussion',
    label: '토론',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'other',
    label: '기타5',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
];

// 상세 성적 테이블 데이터
export const DETAIL_GRADE_ROWS: RowData[] = [
  {
    attendance: '100점',
    midterm: '100점',
    final: '100점',
    assignment: '100점',
    project: '100점',
    quiz: '0점',
    presentation: '0점',
    discussion: '0점',
    other: '0점',
  },
  {
    attendance: '100',
    midterm: '100',
    final: '100',
    assignment: '100',
    project: '100',
    quiz: '0',
    presentation: '0',
    discussion: '0',
    other: '0',
  },
];

// 전체 학기별 성적 테이블 컬럼 설정
export const TOTALTERM_GRADE_COLUMNS: ColumnConfig[] = [
  {
    id: 'classification',
    label: '이수구분',
    desktop: { row: 1, widthClass: 'w-1/13' },
  },
  {
    id: 'courseNumber',
    label: '학수번호',
    desktop: { row: 1, widthClass: 'w-2/13' },
  },
  {
    id: 'courseName',
    label: '과목명',
    desktop: { row: 1, widthClass: 'w-2/13' },
  },
  {
    id: 'unit',
    label: '학점',
    desktop: { row: 1, widthClass: 'w-1/13' },
  },
  {
    id: 'rating',
    label: '등급',
    desktop: { row: 1, widthClass: 'w-1/13' },
  },
  {
    id: 'recognitionType',
    label: '인정구분',
    desktop: { row: 1, widthClass: 'w-2/13' },
  },
  {
    id: 'deletionType',
    label: '삭제구분',
    desktop: { row: 1, widthClass: 'w-2/13' },
  },
  {
    id: 'deletionDate',
    label: '삭제일자',
    desktop: { row: 1, widthClass: 'w-2/13' },
  },
];

// 전체 학기 성적 테이블 데이터
export const TOTALTERM_GRADE_ROWS: RowData[] = [
  {
    classification: '전선',
    courseNumber: 'C0AA8723',
    courseName: '컴퓨터공학개론',
    unit: '3',
    rating: 'A+',
    recognitionType: '',
    deletionType: '',
    deletionDate: '',
  },
  {
    classification: '전선',
    courseNumber: 'C0AA8723',
    courseName: '컴퓨터공학개론',
    unit: '3',
    rating: 'A+',
    recognitionType: '',
    deletionType: '',
    deletionDate: '',
  },
  {
    classification: '전선',
    courseNumber: 'C0AA8723',
    courseName: '컴퓨터공학개론',
    unit: '3',
    rating: 'A+',
    recognitionType: '',
    deletionType: '',
    deletionDate: '',
  },
  {
    classification: '전선',
    courseNumber: 'C0AA8723',
    courseName: '컴퓨터공학개론',
    unit: '3',
    rating: 'A+',
    recognitionType: '',
    deletionType: '',
    deletionDate: '',
  },
  {
    classification: '전선',
    courseNumber: 'C0AA8723',
    courseName: '컴퓨터공학개론',
    unit: '3',
    rating: 'A+',
    recognitionType: '',
    deletionType: '',
    deletionDate: '',
  },
  {
    classification: '전선',
    courseNumber: 'C0AA8723',
    courseName: '컴퓨터공학개론',
    unit: '3',
    rating: 'A+',
    recognitionType: '',
    deletionType: '',
    deletionDate: '',
  },
];

// 전체 성적 테이블 컬럼 설정
export const TOTAL_GRADE_COLUMNS: ColumnConfig[] = [
  {
    id: 'category',
    label: '구분',
    desktop: { row: 1, widthClass: 'w-2/19' },
  },
  {
    id: 'major',
    label: '전공',
    desktop: { row: 1, widthClass: 'w-1/19' },
  },
  {
    id: 'general',
    label: '교양',
    desktop: { row: 1, widthClass: 'w-1/19' },
  },
  {
    id: 'multipleMajor',
    label: '다전공',
    desktop: { row: 1, widthClass: 'w-1/19' },
  },
  {
    id: 'minor',
    label: '부전공',
    desktop: { row: 1, widthClass: 'w-1/19' },
  },
  {
    id: 'interdisciplinary',
    label: '연계전공',
    desktop: { row: 1, widthClass: 'w-2/19' },
  },
  {
    id: 'teaching',
    label: '교직',
    desktop: { row: 1, widthClass: 'w-1/19' },
  },
  {
    id: 'other',
    label: '기타',
    desktop: { row: 1, widthClass: 'w-1/19' },
  },
  {
    id: 'totalAcquired',
    label: '총취득학점',
    desktop: { row: 1, widthClass: 'w-2/19' },
  },
  {
    id: 'totalApplied',
    label: '총신청학점',
    desktop: { row: 1, widthClass: 'w-2/19' },
  },
  {
    id: 'totalForfeited',
    label: '총포기학점',
    desktop: { row: 1, widthClass: 'w-2/19' },
  },
  {
    id: 'totalFN',
    label: '총F/N학점',
    desktop: { row: 1, widthClass: 'w-2/19' },
  },
  {
    id: 'perfectScore',
    label: '만점',
    desktop: { row: 1, widthClass: 'w-1/19' },
  },
];

// 전체 성적 테이블 데이터
export const TOTAL_GRADE_ROWS: RowData[] = [
  {
    category: '학점',
    major: '36.0',
    general: '0.0',
    multipleMajor: '0.0',
    minor: '0.0',
    interdisciplinary: '0.0',
    teaching: '0.0',
    other: '0.0',
    totalAcquired: '36.0',
    totalApplied: '36.0',
    totalForfeited: '0.0',
    totalFN: '0.0',
    perfectScore: '',
  },
  {
    category: '평점평균',
    major: '4.50',
    general: '0.00',
    multipleMajor: '0.00',
    minor: '0.00',
    interdisciplinary: '0.00',
    teaching: '0.00',
    other: '0.00',
    totalAcquired: '4.50',
    totalApplied: '',
    totalForfeited: '',
    totalFN: '',
    perfectScore: '4.50',
  },
  {
    category: '백분율',
    major: '100.0',
    general: '0.0',
    multipleMajor: '0.0',
    minor: '0.0',
    interdisciplinary: '0.0',
    teaching: '0.0',
    other: '0.0',
    totalAcquired: '100',
    totalApplied: '',
    totalForfeited: '',
    totalFN: '',
    perfectScore: '100',
  },
  {
    category: '전체석차',
    major: '1/337',
    general: '',
    multipleMajor: '',
    minor: '',
    interdisciplinary: '',
    teaching: '',
    other: '',
    totalAcquired: '',
    totalApplied: '',
    totalForfeited: '',
    totalFN: '',
    perfectScore: '',
  },
];
