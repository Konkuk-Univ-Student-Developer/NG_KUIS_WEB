import GraduationSummary from "@/components/graduation/GraduationSummary";
import GraduationAudit from "@/components/graduation/GraduationAudit";
import CompletedCredits from "@/components/graduation/CompletedCredits";
import type { ListTableField } from "@/types/listTable";

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

export const USER_INFO_FIELDS: ListTableField[] = [
  // --- Desktop: Row 1 / Mobile: Table 1 ---
  {
    id: "studentId",
    label: "학번",
    value: "20201999",
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 1, widthClass: "w-1/4" },
  },
  {
    id: "name",
    label: "성명",
    value: "김건국",
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 1, widthClass: "w-1/4" },
  },
  {
    id: "birthDate",
    label: "생년월일",
    value: "030403",
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 1, widthClass: "w-1/4" },
  },
  {
    id: "gender",
    label: "성별",
    value: "남",
    desktop: { row: 1, widthClass: "w-1/13" },
    mobile: { table: 1, widthClass: "w-1/4" },
  },

  // --- Desktop: Row 1 / Mobile: Table 2 ---
  {
    id: "entryYear",
    label: "입학년도",
    value: "2022",
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
  {
    id: "entrySemester",
    label: "입학학기",
    value: "1학기",
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
  {
    id: "entryType",
    label: "입학구분",
    value: "수시1",
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },

  // --- Desktop: Row 2 / Mobile: Table 2 ---
  {
    id: "studentType",
    label: "학생구분",
    value: "일반",
    desktop: { row: 2, widthClass: "w-2/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },

  // --- Desktop: Row 2 / Mobile: Table 3 ---
  {
    id: "major",
    label: "학과(부)/전공",
    value: "컴퓨터공학부",
    desktop: { row: 2, widthClass: "w-3/12" },
    mobile: { table: 3, widthClass: "w-2/5" }, // 모바일에서는 이 칸이 좀 더 넓으므로 비율 조정
  },
  {
    id: "college",
    label: "대학명",
    value: "공과대학",
    desktop: { row: 2, widthClass: "w-3/12" },
    mobile: { table: 3, widthClass: "w-1/5" },
  },
  {
    id: "grade",
    label: "학년",
    value: "4학년",
    desktop: { row: 2, widthClass: "w-2/12" },
    mobile: { table: 3, widthClass: "w-1/5" },
  },
  {
    id: "status",
    label: "학적상태",
    value: "재학생",
    desktop: { row: 2, widthClass: "w-2/12" },
    mobile: { table: 3, widthClass: "w-1/5" },
  },
];