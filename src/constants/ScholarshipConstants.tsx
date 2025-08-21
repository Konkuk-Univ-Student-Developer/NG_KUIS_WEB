import ScholarshipApplication from '@/components/scholarship/ScholarshipApplication';
import ScholarshipLookup from '@/components/scholarship/ScholarshipLookup';

import type { ColumnConfig } from '@/types/scholarship';

export const SCHOLARSHIP_TABS = ['장학금 신청(학부생)', '수혜이력 조회'];

export const TAB_COMPONENTS: { [key: string]: React.FC } = {
  '장학금 신청(학부생)': ScholarshipApplication,
  '수혜이력 조회': ScholarshipLookup,
};

export const APPLY_SCHOLARSHIP_COLUMNS: ColumnConfig[] = [
  {
    id: 'number',
    label: 'No',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'apply',
    label: '처리',
    desktop: { row: 1, widthClass: 'w-2/12' },
  },
  {
    id: 'scholarshipName',
    label: '장학금명',
    desktop: { row: 1, widthClass: 'w-3/12' },
  },
  {
    id: 'applyPeriod',
    label: '신청기간',
    desktop: { row: 1, widthClass: 'w-3/12' },
  },
  {
    id: 'notice',
    label: '공지사항',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'attachment',
    label: '첨부파일',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'applyStatus',
    label: '신청상태',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
];

export const APPLY_HISTORY_COLUMNS: ColumnConfig[] = [
  {
    id: 'number',
    label: 'No',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'applyYear',
    label: '신청년도',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'applySemester',
    label: '신청학기',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'scholarshipName',
    label: '장학금명',
    desktop: { row: 1, widthClass: 'w-3/12' },
  },
  {
    id: 'applyDate',
    label: '신청일자',
    desktop: { row: 1, widthClass: 'w-2/12' },
  },
  {
    id: 'applyStatus',
    label: '신청상태',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'failReason',
    label: '탈락사유',
    desktop: { row: 1, widthClass: 'w-3/12' },
  },
];

export const SCHOLARSHIP_LOOKUP_COLUMNS: ColumnConfig[] = [
  {
    id: 'number',
    label: 'No',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'semester',
    label: '학기',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'scholarshipName',
    label: '장학금명',
    desktop: { row: 1, widthClass: 'w-3/12' },
  },
  {
    id: 'admission',
    label: '장학입학금',
    desktop: { row: 1, widthClass: 'w-2/12' },
  },
  {
    id: 'tuition',
    label: '장학수업료',
    desktop: { row: 1, widthClass: 'w-2/12' },
  },
  {
    id: 'flatAmount',
    label: '정액금액',
    desktop: { row: 1, widthClass: 'w-1/12' },
  },
  {
    id: 'paymentDate',
    label: '지급일',
    desktop: { row: 1, widthClass: 'w-2/12' },
  },
];

export const cellBaseClasses =
  'flex justify-center items-center p-2 flex-shrink-0 break-keep';
export const headerTextClasses =
  'text-black text-sm md:text-lg font-bold text-center';
export const valueTextClasses = 'text-black text-sm md:text-lg text-center';
