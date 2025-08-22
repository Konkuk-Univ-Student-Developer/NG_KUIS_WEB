import type { ColumnConfig, GradeSummaryData } from '@/types/grade';

// 테이블 스타일 관련 상수
export const cellBaseClasses =
  'flex justify-center items-center p-2 flex-shrink-0 break-keep';
export const headerTextClasses =
  'text-black text-sm md:text-lg font-bold text-center';
export const valueTextClasses = 'text-black text-sm md:text-lg text-center';

// Grade 탭 관련 상수
export const GRADE_TABS = ['정규학기 성적 조회', '전체 성적 조회'];

// 정규학기 성적 조회 요약 카드 데이터 (기본값)
export const TERM_SUMMARY_DATA: GradeSummaryData = {
  cards: [
    { title: '평점 평균', value: 4.5, unit: '/4.5', isHighlighted: true },
    { title: '취득/신청학점', value: 18, unit: '/18', isHighlighted: true },
    { title: '학사경고/우등구분', value: 'N / Y', isHighlighted: false },
  ],
};

// 정규학기 성적조회 테이블 컬럼 설정
export const TERM_GRADE_COLUMNS: ColumnConfig[] = [
  {
    id: 'number',
    label: 'No',
    desktop: { row: 1, widthClass: 'w-1/24' },
  },
  {
    id: 'courseNumber',
    label: '학수번호',
    desktop: { row: 1, widthClass: 'w-3/24' },
  },
  {
    id: 'subjectNumber',
    label: '과목번호',
    desktop: { row: 1, widthClass: 'w-2/24' },
  },
  {
    id: 'courseName',
    label: '과목명',
    desktop: { row: 1, widthClass: 'w-6/24' },
  },
  {
    id: 'professor',
    label: '담당교수',
    desktop: { row: 1, widthClass: 'w-2/24' },
  },
  {
    id: 'unit',
    label: '학점',
    desktop: { row: 1, widthClass: 'w-1/24' },
  },
  {
    id: 'classification',
    label: '이수구분',
    desktop: { row: 1, widthClass: 'w-2/24' },
  },
  {
    id: 'rating',
    label: '등급',
    desktop: { row: 1, widthClass: 'w-1/24' },
  },
  {
    id: 'evaluationMethod',
    label: '성적평가방법',
    desktop: { row: 1, widthClass: 'w-3/24' },
  },
  {
    id: 'DetailedGrades',
    label: '상세성적 보기',
    desktop: { row: 1, widthClass: 'w-3/24' },
  },
];

// 전체 성적 조회 테이블 컬럼 설정
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

// 전체 성적 조회 학기별 테이블 컬럼 설정
export const TOTALTERM_GRADE_COLUMNS: ColumnConfig[] = [
  {
    id: 'classification',
    label: '이수구분',
    desktop: { row: 1, widthClass: 'w-2/24' },
  },
  {
    id: 'courseNumber',
    label: '학수번호',
    desktop: { row: 1, widthClass: 'w-3/24' },
  },
  {
    id: 'courseName',
    label: '과목명',
    desktop: { row: 1, widthClass: 'w-8/24' },
  },
  {
    id: 'unit',
    label: '학점',
    desktop: { row: 1, widthClass: 'w-1/24' },
  },
  {
    id: 'rating',
    label: '등급',
    desktop: { row: 1, widthClass: 'w-1/24' },
  },
  {
    id: 'recognitionType',
    label: '인정구분',
    desktop: { row: 1, widthClass: 'w-3/24' },
  },
  {
    id: 'deletionType',
    label: '삭제구분',
    desktop: { row: 1, widthClass: 'w-3/24' },
  },
  {
    id: 'deletionDate',
    label: '삭제일자',
    desktop: { row: 1, widthClass: 'w-3/24' },
  },
];
