// 상세 성적 점수 타입
export interface ScoreItem {
  score: number;
  max: number;
}

// 상세 성적 타입
export interface DetailGrade {
  출석: ScoreItem;
  중간고사: ScoreItem;
  기말고사: ScoreItem;
  과제물: ScoreItem;
  프로젝트: ScoreItem;
  퀴즈: ScoreItem;
  발표: ScoreItem;
  토론: ScoreItem;
  기타5: ScoreItem;
}

// 개별 과목 성적 타입
export interface GradeItem {
  no: number;
  학수번호: string;
  과목번호: string;
  과목명: string;
  담당교수: string;
  학점: number;
  이수구분: string;
  등급: string;
  성적평가방법: string;
}

// 전체 성적 요약 타입
export interface TotalGradeItem {
  구분: '학점' | '평점평균' | '백분율' | '전체석차';
  전공: string | number;
  교양: string | number;
  다전공: string | number;
  부전공: string | number;
  연계전공: string | number;
  교직: string | number;
  기타: string | number;
  총취득학점: string | number;
  총신청학점?: string | number; // 학점 구분에서만 사용
  총포기학점?: string | number; // 학점 구분에서만 사용
  총FN학점?: string | number; // 학점 구분에서만 사용
  만점?: string | number; // 평점평균, 백분율 구분에서만 사용
}

// 전체 학기별 성적 타입
export interface TotalTermGradeItem {
  이수구분: string;
  학수번호: string;
  과목명: string;
  학점: number;
  등급: string;
  인정구분: string;
  삭제구분: string;
  삭제일자: string;
}

// 학기별 성적 요약 타입
export interface TermGradeSummaryData {
  avgGpa: number;
  gpaScale: number;
  earnedCredits: number;
  attemptedCredits: number;
  academicWarning: string;
  honors: string;
}

// 전체 학기별 성적 요약 타입
export interface TotalGradeSummaryData {
  avgGpa: number;
  gpaScale: number;
  earnedCredits: number;
  attemptedCredits: number;
  percentage: number;
  rank: number;
  allStudents: number;
}

// Props 타입들

// 학기별 성적 요약 Props
export interface TermGradeSummaryProps {
  avgGpa?: number;
  gpaScale?: number;
  earnedCredits?: number;
  attemptedCredits?: number;
  academicWarning?: string;
  honors?: string;
}

// 전체 학기별 성적 요약 Props
export interface TotalGradeSummaryProps {
  avgGpa?: number;
  gpaScale?: number;
  earnedCredits?: number;
  attemptedCredits?: number;
  percentage?: number;
  rank?: number;
  allStudents?: number;
}

// 성적 제목 Props
export interface GradeTitleProps {
  year: number;
  semester: 1 | 2;
}

// 상세 성적 테이블 Props
export interface DetailGradeTableProps {
  detailGrade: DetailGrade;
}

// 학기별 성적 테이블 행 Props
export interface TermGradeTableRowProps {
  grade: GradeItem;
  detailGrade: DetailGrade;
  isExpanded: boolean;
  isLastRow?: boolean;
  onToggle: () => void;
}

// 전체 성적 테이블 행 Props
export interface TotalGradeTableRowProps {
  grade: TotalGradeItem;
  isLastRow?: boolean;
}

// 전체 학기별 성적 테이블 행 Props
export interface TotalTermGradeTableRowProps {
  grade: TotalTermGradeItem;
  isLastRow?: boolean;
}
