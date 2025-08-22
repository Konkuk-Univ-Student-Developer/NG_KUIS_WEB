import React from 'react';

export type RowData = {
  [key: string]: string | number | React.ReactNode;
};

export interface ColumnConfig {
  id: string;
  label: string;
  desktop?: { widthClass: string; row: number };
}

// 장학금 지급 이력 관련 타입
export interface ScholarshipDisbursement {
  semesterText: string;
  scholarshipName: string;
  admissionAmount: number;
  tuitionAmount: number;
  flatAmount: number;
  paidOn: string;
}

export interface YearDisbursements {
  year: number;
  items: ScholarshipDisbursement[];
}

export interface ScholarshipDisbursementsResponse {
  years: YearDisbursements[];
}

// 신청 가능 장학금 관련 타입
export interface AvailableScholarship {
  scholarshipId: number;
  actionLabel: string;
  name: string;
  periodText: string;
  noticeUrl: string;
  hasAttachment: boolean;
  myApplicationStatus: string;
}

export interface AvailableScholarshipsResponse {
  year: number;
  semester: 'FIRST' | 'SUMMER' | 'SECOND' | 'WINTER';
  items: AvailableScholarship[];
}

// 장학금 신청 내역 관련 타입
export interface ScholarshipApplication {
  applicationYear: number;
  applicationSemester: 'FIRST' | 'SUMMER' | 'SECOND' | 'WINTER';
  scholarshipName: string;
  appliedDate: string;
  status: string;
  rejectionReason: string;
}

export interface ScholarshipApplicationsResponse {
  items: ScholarshipApplication[];
}

// API 요청 파라미터 타입
export interface ScholarshipRequestParams {
  memberId: number;
  year?: number;
  semester?: 'FIRST' | 'SUMMER' | 'SECOND' | 'WINTER';
  from?: string; // yyyy-MM-dd 형식
  to?: string; // yyyy-MM-dd 형식
}
