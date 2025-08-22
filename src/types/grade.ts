import React from 'react';

export type RowData = {
  [key: string]: string | number | React.ReactNode;
};

export interface ColumnConfig {
  id: string;
  label: string;
  desktop?: { widthClass: string; row: number };
}

// 성적 요약 카드 타입 정의
export interface GradeSummaryCard {
  title: string;
  value: number | string;
  unit?: string;
  isHighlighted?: boolean;
}

export interface GradeSummaryData {
  cards: GradeSummaryCard[];
}

// API 응답 타입들 - Swagger 스펙 기반
export interface GradeDetailResponse {
  attendance: number;
  midterm: number;
  finalExam: number;
  assignment: number;
  project: number;
  quiz: number;
  presentation: number;
  discussion: number;
  etc5: number;
}

export interface GradeItem {
  no: number;
  courseCode: string;
  classNo: string;
  courseName: string;
  instructor: string;
  credit: number;
  division: string;
  letterGrade: string;
  gradingMethod: string;
  gradeDetailResponse: GradeDetailResponse;
  // 전체 성적 조회에서 사용되는 추가 속성들
  classification?: string;
  recognitionType?: string;
  deletionType?: string;
  deletionDate?: string;
}

export interface GradeSummary {
  gpa: number;
  gpaScale: number;
  earnedCredits: number;
  registeredCredits: number;
  probation: boolean;
  honors: boolean;
  percentage?: number;
  rank?: string;
}

export interface TermGradeResponse {
  year: number;
  semester: 'FIRST' | 'SUMMER' | 'SECOND' | 'WINTER';
  summary: GradeSummary;
  items: GradeItem[];
}

export interface SemesterGrade {
  year: number;
  semester: 'FIRST' | 'SUMMER' | 'SECOND' | 'WINTER';
  summary: {
    gpa: number;
    gpaScale: number;
    earnedCredits: number;
    appliedCredits: number;
    percentage: number;
    rank: string | null;
    totalInSemester: number | null;
  };
  courses: GradeItem[];
}

export interface AllGradesResponse {
  memberId: number;
  semesters: SemesterGrade[];
}

export interface CreditRow {
  byCategory: Record<string, number>;
  totalEarned: number;
  totalApplied: number;
  totalDropped: number;
  totalFn: number;
  fullMark: number;
}

export interface GpaRow {
  byCategory: Record<string, number>;
  totalEarned: number;
  totalApplied: number;
  totalDropped: number;
  totalFn: number;
  fullMark: number;
}

export interface PercentageRow {
  byCategory: Record<string, number>;
  totalEarned: number;
  totalApplied: number;
  totalDropped: number;
  totalFn: number;
  fullMark: number;
}

export interface GradeSummaryResponse {
  creditRow: CreditRow;
  gpaRow: GpaRow;
  percentageRow: PercentageRow;
  overallRank: string;
}

// API 요청 파라미터 타입들
export interface GradeRequestParams {
  memberId: number;
  year?: number;
  semester?: 'FIRST' | 'SUMMER' | 'SECOND' | 'WINTER';
}
