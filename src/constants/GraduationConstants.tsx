import GraduationSummary from "@/components/graduation/GraduationSummary";
import GraduationAudit from "@/components/graduation/GraduationAudit";
import CompletedCredits from "@/components/graduation/CompletedCredits";
import type { ColumnConfig } from "@/types/graduation";

export const TAB_COMPONENTS = {
  "결과 요약": GraduationSummary,
  "졸업 사정": GraduationAudit,
  취득학점확인원: CompletedCredits,
};

export const GRADUATION_TABS = Object.keys(
  TAB_COMPONENTS
) as (keyof typeof TAB_COMPONENTS)[];

export type GraduationTab = keyof typeof TAB_COMPONENTS;

export const CREDIT_SUMMARY_DATA = [
  { title: "총 취득 학점", value: 122, unit: "/132" },
  { title: "전체 평점", value:4.31, unit: "/4.5" },
];

export const USER_INFO_COLUMNS: ColumnConfig[] = [
  { id: "studentNo", label: "학번", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "name", label: "성명", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "birthRaw", label: "생년월일", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "gender", label: "성별", desktop: { row: 1, widthClass: "w-1/13" }, mobile: { table: 1, widthClass: "w-1/4" } },

  { id: "entranceYear", label: "입학년도", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },
  { id: "entranceSemester", label: "입학학기", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },
  { id: "admissionType", label: "입학구분", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },

  { id: "studentType", label: "학생구분", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 2, widthClass: "w-1/4" } },

  { id: "department", label: "학과(부)/전공", desktop: { row: 2, widthClass: "w-3/12" }, mobile: { table: 3, widthClass: "w-2/5" } },
  { id: "college", label: "대학명", desktop: { row: 2, widthClass: "w-3/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
  { id: "grade", label: "학년", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
  { id: "status", label: "학적상태", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
];

export const MAJOR_COLUMNS: ColumnConfig[] = [
  { id: "majorName", label: "전공명", desktop: { row: 1, widthClass: "w-3/12" }, mobile: { table: 1, widthClass: "w-6/16" } },
  { id: "collegeName", label: "대학명", desktop: { row: 1, widthClass: "w-2/12" }, mobile: { table: 1, widthClass: "w-4/16" } },
  { id: "appliedYear", label: "신청년도", desktop: { row: 1, widthClass: "w-1/12" }, mobile: { table: 1, widthClass: "w-3/16" } },
  { id: "appliedSemester", label: "신청학기", desktop: { row: 1, widthClass: "w-1/12" }, mobile: { table: 1, widthClass: "w-3/16" } },
  { id: "thesisType", label: "논문유형", desktop: { row: 1, widthClass: "w-1/12" }, mobile: { table: 2, widthClass: "w-2/8" } },
  { id: "thesisTitle", label: "논문제목", desktop: { row: 1, widthClass: "w-3/12" }, mobile: { table: 2, widthClass: "w-5/8" } },
  { id: "passed", label: "합격", desktop: { row: 1, widthClass: "w-1/12" }, mobile: { table: 2, widthClass: "w-1/8" } },
];

export const GRADUATION_AUDIT_COLUMNS: ColumnConfig[] = [
  {
    id: "no",
    label: "No",
    desktop: { row: 1, widthClass: "w-1/20" },
    mobile: { table: 1, widthClass: "w-1/12" },
  },
  {
    id: "title",
    label: "요건 내용",
    desktop: { row: 1, widthClass: "w-8/20" },
    mobile: { table: 1, widthClass: "w-7/12" },
  },
  {
    id: "criterion",
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
    id: "lack",
    label: "부족",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "detail",
    label: "세부항목",
    desktop: { row: 1, widthClass: "w-3/20" },
    mobile: { table: 0, widthClass: "w-6/12" },
  },
  {
    id: "result",
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

export const CREDITS_SUMMARY_COLUMNS: ColumnConfig[] = [
  {
    id: "programType",
    label: "전공구분",
    desktop: { row: 1, widthClass: "w-5/24" },
    mobile: { table: 1, widthClass: "w-5/24" },
  },
  {
    id: "category",
    label: "이수구분",
    desktop: { row: 1, widthClass: "w-4/24" },
    mobile: { table: 1, widthClass: "w-4/24" },
  },
  {
    id: "required",
    label: "기준",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "acquired",
    label: "취득",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "remaining",
    label: "잔여",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "detailsStatus",
    label: "상세보기",
    desktop: { row: 1, widthClass: "w-6/24" },
    mobile: { table: 1, widthClass: "w-6/24" },
  },
];


export const DETAILS_TABLE_COLUMNS: ColumnConfig[] = [
  {
    id: "courseYear",
    label: "수강 연도",
    desktop: { row: 1, widthClass: "w-2/24" },
  },
  {
    id: "semester",
    label: "수강 학기",
    desktop: { row: 1, widthClass: "w-2/24" },
  },
  {
    id: "gradeLevel",
    label: "수강 학년",
    desktop: { row: 1, widthClass: "w-2/24" },
  },
  {
    id: "courseNumber",
    label: "학수번호",
    desktop: { row: 1, widthClass: "w-3/24" },
  },
  {
    id: "courseName",
    label: "과목명",
    desktop: { row: 1, widthClass: "w-9/24" },
  },
  {
    id: "divisionLabel",
    label: "분류",
    desktop: { row: 1, widthClass: "w-4/24" },
  },
  { id: "credit", label: "학점", desktop: { row: 1, widthClass: "w-1/24" } },
  {
    id: "letterGrade",
    label: "성적",
    desktop: { row: 1, widthClass: "w-1/24" },
  },
];


export const CREDITS_ELECTIVE_GENERAL_COLUMNS: ColumnConfig[] = [
  {
    id: "label",
    label: "기초교양 영역",
    desktop: { row: 1, widthClass: "w-4/8" },
    mobile: { table: 1, widthClass: "w-8/12" },
  },
  {
    id: "target",
    label: "기준",
    desktop: { row: 1, widthClass: "w-2/8" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "acquired",
    label: "취득",
    desktop: { row: 1, widthClass: "w-2/8" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
];

export const CREDITS_ELECTIVE_ADVANCED_COLUMNS: ColumnConfig[] = [
  {
    id: "label",
    label: "심화교양 영역",
    desktop: { row: 1, widthClass: "w-4/8" },
    mobile: { table: 1, widthClass: "w-8/12" },
  },
  {
    id: "target",
    label: "기준",
    desktop: { row: 1, widthClass: "w-2/8" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "acquired",
    label: "취득",
    desktop: { row: 1, widthClass: "w-2/8" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
];

export const CREDITS_ENGLISH_COLUMNS: ColumnConfig[] = [
  {
    id: "label",
    label: "분류",
    desktop: { row: 1, widthClass: "w-4/8" },
    mobile: { table: 1, widthClass: "w-8/12" },
  },
  {
    id: "target",
    label: "기준",
    desktop: { row: 1, widthClass: "w-2/8" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "acquired",
    label: "취득",
    desktop: { row: 1, widthClass: "w-2/8" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
];

export const DUPLICATE_SUBJECTS_COLUMNS: ColumnConfig[] = [
  { id: "courseNumber", label: "학수번호", desktop: { row: 1, widthClass: "w-4/16" } },
  { id: "courseName", label: "과목명", desktop: { row: 1, widthClass: "w-6/16" } },
  { id: "category", label: "이수구분", desktop: { row: 1, widthClass: "w-2/16" } },
  { id: "credit", label: "학점", desktop: { row: 1, widthClass: "w-2/16" } },
  { id: "letterGrade", label: "성적", desktop: { row: 1, widthClass: "w-2/16" } },
];

export const cellBaseClasses = "flex justify-center items-center p-2 flex-shrink-0 break-keep";
export const headerTextClasses = "text-black text-sm md:text-lg font-bold text-center";
export const valueTextClasses = "text-black text-sm md:text-lg text-center";