import type { TotalGradeItem } from '@/types/grade';
import TermGrade from '@/components/grade/TermGrade';
import TotalGrade from '@/components/grade/TotalGrade';

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

// 성적 평가 항목 카테고리
export const GRADE_CATEGORIES = [
  '출석',
  '중간고사',
  '기말고사',
  '과제물',
  '프로젝트',
  '퀴즈',
  '발표',
  '토론',
  '기타5',
] as const;

// 성적 등급
export const GRADE_LEVELS = [
  'A+',
  'A0',
  'B+',
  'B0',
  'C+',
  'C0',
  'D+',
  'D0',
  'F',
  'P',
  'N',
] as const;

// 이수구분
export const COURSE_TYPES = [
  '전필',
  '전선',
  '기교',
  '심교',
  '반교',
  '지교',
  '지필',
  '전기',
  '일선',
  '기타',
] as const;

// 성적평가방법
export const EVALUATION_METHODS = ['상대평가', '절대평가', 'P/F'] as const;

// 학기
export const SEMESTERS = [1, 2] as const;

// 샘플 데이터 - TotalGradeTable
export const SAMPLE_TOTAL_GRADES: TotalGradeItem[] = [
  {
    구분: '학점',
    전공: 36.0,
    교양: 0.0,
    다전공: 0.0,
    부전공: 0.0,
    연계전공: 0.0,
    교직: 0.0,
    기타: 0.0,
    총취득학점: 36.0,
    총신청학점: 36.0,
    총포기학점: 0.0,
    총FN학점: 0.0,
  },
  {
    구분: '평점평균',
    전공: 4.5,
    교양: 0.0,
    다전공: 0.0,
    부전공: 0.0,
    연계전공: 0.0,
    교직: 0.0,
    기타: 0.0,
    총취득학점: 4.5,
    만점: 4.5,
  },
  {
    구분: '백분율',
    전공: 100.0,
    교양: 0.0,
    다전공: 0.0,
    부전공: 0.0,
    연계전공: 0.0,
    교직: 0.0,
    기타: 0.0,
    총취득학점: 100,
    만점: 100,
  },
  {
    구분: '전체석차',
    전공: '1/337',
    교양: '',
    다전공: '',
    부전공: '',
    연계전공: '',
    교직: '',
    기타: '',
    총취득학점: '',
  },
];

// 샘플 데이터 - TermGradeTable
export const SAMPLE_GRADES = Array.from({ length: 6 }).map((_, i) => ({
  no: i + 1,
  학수번호: 'COAA8723',
  과목번호: '1114',
  과목명: '컴퓨터공학개론',
  담당교수: '김건국',
  학점: 3,
  이수구분: '전선',
  등급: 'A+',
  성적평가방법: '상대평가',
}));

export const SAMPLE_DETAIL_GRADES = {
  출석: { score: 100, max: 100 },
  중간고사: { score: 100, max: 100 },
  기말고사: { score: 100, max: 100 },
  과제물: { score: 100, max: 100 },
  프로젝트: { score: 100, max: 100 },
  퀴즈: { score: 0, max: 0 },
  발표: { score: 0, max: 0 },
  토론: { score: 0, max: 0 },
  기타5: { score: 0, max: 0 },
};

// 샘플 데이터 - TotalTermGradeTable
export const SAMPLE_TOTALTERMGRADES = Array.from({
  length: 6,
}).map(() => ({
  이수구분: '전선',
  학수번호: 'COAA8723',
  과목명: '컴퓨터공학개론',
  학점: 3,
  등급: 'A+',
  인정구분: '',
  삭제구분: '',
  삭제일자: '',
}));

// 기본값 상수
export const DEFAULT_VALUES = {
  avgGpa: 4.5,
  gpaScale: 4.5,
  earnedCredits: 18,
  attemptedCredits: 18,
  academicWarning: 'N',
  honors: 'Y',
  percentage: 100.0,
  rank: 1,
  allStudents: 171,
} as const;

// CSS 클래스 상수
export const GRADE_TABLE_CLASSES = {
  container: 'md:m-0 md:pb-13',
  tableWrapper: 'bg-white rounded-[8px] border border-coolgray overflow-hidden',
  tableContainer: 'overflow-x-auto md:overflow-visible',
  header: {
    total:
      'bg-[#B0CDA6] px-4 py-3 border-b border-coolgray min-w-max md:min-w-full',
    term: 'bg-beige px-4 py-3 border-b border-coolgray min-w-max md:min-w-full',
  },
  headerText: {
    total:
      'flex gap-2 text-mobile-small-bold md:text-desktop-small-bold text-darkgreen font-bold md:gap-1',
    term: 'grid grid-cols-10 gap-2 text-mobile-small-bold md:text-desktop-small-bold text-black font-bold md:gap-1',
  },
  row: {
    base: 'px-4 py-3 hover:bg-beige/50 transition-colors min-w-max md:min-w-full',
    last: 'border-b border-coolgray',
  },
  cell: {
    total: 'min-w-[80px] md:min-w-0 text-center flex-1',
    totalWide: 'min-w-[100px] md:min-w-0 text-center flex-1',
    term: 'min-w-[48px] md:min-w-0 text-center',
    termWide: 'min-w-[100px] md:min-w-0 text-center',
    termExtraWide: 'min-w-[160px] md:min-w-0 text-center',
  },
} as const;

// 테이블 컬럼 설정
export const TOTAL_GRADE_COLUMNS = [
  { label: '구분', width: GRADE_TABLE_CLASSES.cell.total },
  { label: '전공', width: GRADE_TABLE_CLASSES.cell.total },
  { label: '교양', width: GRADE_TABLE_CLASSES.cell.total },
  { label: '다전공', width: GRADE_TABLE_CLASSES.cell.total },
  { label: '부전공', width: GRADE_TABLE_CLASSES.cell.total },
  { label: '연계전공', width: GRADE_TABLE_CLASSES.cell.total },
  { label: '교직', width: GRADE_TABLE_CLASSES.cell.total },
  { label: '기타', width: GRADE_TABLE_CLASSES.cell.total },
  { label: '총취득학점', width: GRADE_TABLE_CLASSES.cell.totalWide },
  { label: '총신청학점', width: GRADE_TABLE_CLASSES.cell.totalWide },
  { label: '총포기학점', width: GRADE_TABLE_CLASSES.cell.totalWide },
  { label: '총F/N학점', width: GRADE_TABLE_CLASSES.cell.totalWide },
  { label: '만점', width: GRADE_TABLE_CLASSES.cell.total },
] as const;

export const TERM_GRADE_COLUMNS = [
  { label: 'No', width: GRADE_TABLE_CLASSES.cell.term },
  { label: '학수번호', width: GRADE_TABLE_CLASSES.cell.termWide },
  { label: '과목번호', width: GRADE_TABLE_CLASSES.cell.term },
  { label: '과목명', width: GRADE_TABLE_CLASSES.cell.termExtraWide },
  { label: '담당교수', width: GRADE_TABLE_CLASSES.cell.termWide },
  { label: '학점', width: GRADE_TABLE_CLASSES.cell.term },
  { label: '이수구분', width: GRADE_TABLE_CLASSES.cell.termWide },
  { label: '등급', width: GRADE_TABLE_CLASSES.cell.term },
  { label: '성적평가방법', width: GRADE_TABLE_CLASSES.cell.termWide },
  { label: '상세성적 보기', width: GRADE_TABLE_CLASSES.cell.termWide },
] as const;

export const TOTAL_TERM_GRADE_COLUMNS = [
  { label: '이수구분', width: GRADE_TABLE_CLASSES.cell.term },
  { label: '학수번호', width: GRADE_TABLE_CLASSES.cell.termWide },
  { label: '과목명', width: GRADE_TABLE_CLASSES.cell.termExtraWide },
  { label: '학점', width: GRADE_TABLE_CLASSES.cell.term },
  { label: '등급', width: GRADE_TABLE_CLASSES.cell.term },
  { label: '인정구분', width: GRADE_TABLE_CLASSES.cell.termWide },
  { label: '삭제구분', width: GRADE_TABLE_CLASSES.cell.termWide },
  { label: '삭제일자', width: GRADE_TABLE_CLASSES.cell.termWide },
] as const;
