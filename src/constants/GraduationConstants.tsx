import GraduationSummary from "@/components/graduation/GraduationSummary";
import GraduationAudit from "@/components/graduation/GraduationAudit";
import CompletedCredits from "@/components/graduation/CompletedCredits";
import type { ColumnConfig, RowData } from "@/types/graduation";

export const GRADUATION_TABS = ["결과 요약", "졸업 사정", "취득학점확인원"];

export const CREDIT_SUMMARY_DATA = [
  { title: "총 취득 학점", value: 122, unit: "/132" },
  { title: "전체 평점", value:4.31, unit: "/4.5" },
];

export const CREDIT_DATA = [
  { title: "총 취득 학점", value: 106, unit: "학점" },
  { title: "수강 신청 학점", value: 16, unit: "학점" },
  { title: "중복 학점 계", value: 0, unit: "학점" },
  { title: "잔여 학점", value: 10, unit: "학점" },
];

export const TAB_COMPONENTS: { [key: string]: React.FC } = {
  "결과 요약": GraduationSummary,
  "졸업 사정": GraduationAudit,
  "취득학점확인원": CompletedCredits,
};

// UI 정의
export const USER_INFO_COLUMNS: ColumnConfig[] = [
  { id: "studentId", label: "학번", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "name", label: "성명", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "birthDate", label: "생년월일", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "gender", label: "성별", desktop: { row: 1, widthClass: "w-1/13" }, mobile: { table: 1, widthClass: "w-1/4" } },

  { id: "entryYear", label: "입학년도", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },
  { id: "entrySemester", label: "입학학기", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },
  { id: "entryType", label: "입학구분", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },

  { id: "studentType", label: "학생구분", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 2, widthClass: "w-1/4" } },

  { id: "major", label: "학과(부)/전공", desktop: { row: 2, widthClass: "w-3/12" }, mobile: { table: 3, widthClass: "w-2/5" } },
  { id: "college", label: "대학명", desktop: { row: 2, widthClass: "w-3/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
  { id: "grade", label: "학년", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
  { id: "status", label: "학적상태", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
];

// 더미 데이터
export const USER_INFO_ROWS: RowData[] = [
  {
    studentId: "20201999",
    name: "김건국",
    birthDate: "030403",
    gender: "남",
    entryYear: "2022",
    entrySemester: "1학기",
    entryType: "수시1",
    studentType: "일반",
    major: "컴퓨터공학부",
    college: "공과대학",
    grade: "4학년",
    status: "재학생",
  },
];


export const PRIMARY_MAJOR_COLUMNS: ColumnConfig[] = [
  {
    id: "primaryMajorName",
    label: "전공명",
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 1, widthClass: "w-4/12" },
  },
  {
    id: "primaryCollegeName",
    label: "대학명",
    desktop: { row: 1, widthClass: "w-2/12" },
    mobile: { table: 1, widthClass: "w-3/12" },
  },
  {
    id: "primaryApplyYear",
    label: "신청년도",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-3/12" },
  },
  {
    id: "primaryApplySemester",
    label: "신청학기",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "primaryThesisType",
    label: "논문유형",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
  {
    id: "primaryThesisTitle",
    label: "논문제목",
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 2, widthClass: "w-2/4" },
  },
  {
    id: "primaryPassStatus",
    label: "합격",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
];

export const PRIMARY_MAJOR_ROWS: RowData[] = [
  {
    primaryMajorName: "컴퓨터공학부",
    primaryCollegeName: "공과대학",
    primaryApplyYear: "2022",
    primaryApplySemester: "1학기",
    primaryThesisType: "졸업논문",
    primaryThesisTitle: "데이터 기반 UI/UX 개선 연구",
    primaryPassStatus: "Y",
  },
];

export const SECONDARY_MAJOR_COLUMNS: ColumnConfig[] = [
  {
    id: "secondaryMajorName",
    label: "전공명",
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 1, widthClass: "w-4/12" },
  },
  {
    id: "secondaryCollegeName",
    label: "대학명",
    desktop: { row: 1, widthClass: "w-2/12" },
    mobile: { table: 1, widthClass: "w-3/12" },
  },
  {
    id: "secondaryApplyYear",
    label: "신청년도",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-3/12" },
  },
  {
    id: "secondaryApplySemester",
    label: "신청학기",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "secondaryThesisType",
    label: "논문유형",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
  {
    id: "secondaryThesisTitle",
    label: "논문제목",
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 2, widthClass: "w-2/4" },
  },
  {
    id: "secondaryPassStatus",
    label: "합격",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
];

export const SECONDARY_MAJOR_ROWS: RowData[] = [
  {
    secondaryMajorName: "-",
    secondaryCollegeName: "-",
    secondaryApplyYear: "-",
    secondaryApplySemester: "-",
    secondaryThesisType: "-",
    secondaryThesisTitle: "-",
    secondaryPassStatus: "-",
  },
];

export const USER_MAJOR_INFO = [
  {
    title: "원전공",
    rows: PRIMARY_MAJOR_ROWS,
    columns: PRIMARY_MAJOR_COLUMNS,
  },
  {
    title: "복수전공",
    rows: SECONDARY_MAJOR_ROWS,
    columns: SECONDARY_MAJOR_COLUMNS,
  },
];

export const GRADUATION_AUDIT_COLUMNS: ColumnConfig[] = [
  {
    id: "no",
    label: "No",
    desktop: { row: 1, widthClass: "w-1/20" },
    mobile: { table: 1, widthClass: "w-1/12" },
  },
  {
    id: "content",
    label: "요건 내용",
    desktop: { row: 1, widthClass: "w-8/20" },
    mobile: { table: 1, widthClass: "w-7/12" },
  },
  {
    id: "standard",
    label: "기준",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "acquired",
    label: "취득",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "deficient",
    label: "부족",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "details",
    label: "세부항목",
    desktop: { row: 1, widthClass: "w-3/20" },
    mobile: { table: 0, widthClass: "w-6/12" },
  },
  {
    id: "status",
    label: "합격",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "detailsStatus",
    label: "상세보기",
    desktop: { row: 0, widthClass: "w-2/20" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
];

export const GRADUATION_AUDIT_ROWS: RowData[] = [
  {
    no: "1",
    content: "교양학점(영역별 이수학점 및 총 이수학점 조건)",
    standard: "12과목",
    acquired: "12과목",
    deficient: "0과목",
    details: "-",
    status: "합격",
    detailsStatus: "",
    rowType: "accordion",
  },
  {
    no: "2",
    content: "교양학점(영역별 이수학점 및 총 이수학점 조건)",
    standard: "12과목",
    acquired: "12과목",
    deficient: "0과목",
    details: "-",
    status: "불합",
    detailsStatus: "",
    rowType: "accordion",
  },
];

export const CREDITS_SUMMARY_COLUMNS: ColumnConfig[] = [
  {
    id: "majorDivision",
    label: "전공구분",
    desktop: { row: 1, widthClass: "w-5/24" },
    mobile: { table: 1, widthClass: "w-5/24" },
  },
  {
    id: "courseType",
    label: "이수구분",
    desktop: { row: 1, widthClass: "w-4/24" },
    mobile: { table: 1, widthClass: "w-4/24" },
  },
  {
    id: "standardCredits",
    label: "기준",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "acquiredCredits",
    label: "취득",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "remainingCredits",
    label: "잔여",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "details",
    label: "상세보기",
    desktop: { row: 1, widthClass: "w-6/24" },
    mobile: { table: 1, widthClass: "w-6/24" },
  },
];

export const CREDITS_SUMMARY_ROWS: RowData[] = [
  {
    majorDivision: "원전공",
    courseType: "기교",
    standardCredits: "15",
    acquiredCredits: "12",
    remainingCredits: "3",
    details: "",
  },
  {
    majorDivision: "원전공",
    courseType: "심교",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    details: "",
  },
];

