import ScholarshipApplication from '@/components/scholarship/ScholarshipApplication';
import ScholarshipLookup from '@/components/scholarship/ScholarshipLookup';
import LinkIcon from '@/assets/icon/ic_link.svg?react';

import type { ColumnConfig, RowData } from '@/types/scholarship';

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

export const APPLY_SCHOLARSHIP_ROWS: RowData[] = [
  {
    number: 1,
    apply: (
      <button className="bg-darkgreen hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
        신청
      </button>
    ),
    scholarshipName: '재단법인 선현',
    applyPeriod: '07-09 14:00 ~ 07-15 10:00',
    notice: <LinkIcon className="w-5 h-5" />,
    attachment: '',
    applyStatus: '',
  },
  {
    number: 2,
    apply: (
      <button className="bg-darkgreen hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
        신청
      </button>
    ),
    scholarshipName: '재단법인 선현',
    applyPeriod: '07-09 14:00 ~ 07-15 10:00',
    notice: <LinkIcon className="w-5 h-5" />,
    attachment: '',
    applyStatus: '',
  },
  {
    number: 3,
    apply: (
      <button className="bg-darkgreen hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
        신청
      </button>
    ),
    scholarshipName: '재단법인 선현',
    applyPeriod: '07-09 14:00 ~ 07-15 10:00',
    notice: <LinkIcon className="w-5 h-5" />,
    attachment: '',
    applyStatus: '',
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

export const APPLY_HISTORY_ROWS: RowData[] = [
  {
    number: 1,
    applyYear: 2025,
    applySemester: '1학기',
    scholarshipName: '롯데장학관(별도회계)',
    applyDate: '2025.05.04',
    applyStatus: <span className="text-darkgreen font-bold">선정</span>,
    failReason: '',
  },
  {
    number: 2,
    applyYear: 2025,
    applySemester: '1학기',
    scholarshipName: '롯데장학관(별도회계)',
    applyDate: '2025.05.04',
    applyStatus: <span className="text-darkgreen font-bold">선정</span>,
    failReason: '',
  },
  {
    number: 3,
    applyYear: 2025,
    applySemester: '1학기',
    scholarshipName: '롯데장학관(별도회계)',
    applyDate: '2025.05.04',
    applyStatus: <span className="text-darkgreen font-bold">선정</span>,
    failReason: '',
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

export const SCHOLARSHIP_LOOKUP_ROWS: RowData[] = [
  {
    number: 1,
    semester: '2학기',
    scholarshipName: '건국가족장학',
    admission: 0,
    tuition: 500000,
    flatAmount: 0,
    paymentDate: '7/13',
  },
  {
    number: 1,
    semester: '1학기',
    scholarshipName: '건국가족장학',
    admission: 0,
    tuition: 500000,
    flatAmount: 0,
    paymentDate: '7/13',
  },
  {
    number: 1,
    semester: '1학기',
    scholarshipName: '건국가족장학',
    admission: 0,
    tuition: 500000,
    flatAmount: 0,
    paymentDate: '7/13',
  },
];

export const cellBaseClasses =
  'flex justify-center items-center p-2 flex-shrink-0 break-keep';
export const headerTextClasses =
  'text-black text-sm md:text-lg font-bold text-center';
export const valueTextClasses = 'text-black text-sm md:text-lg text-center';
