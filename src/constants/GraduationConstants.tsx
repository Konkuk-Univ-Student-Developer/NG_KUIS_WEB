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
    value: ["20201999"],
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 1, widthClass: "w-1/4" },
  },
  {
    id: "name",
    label: "성명",
    value: ["김건국"],
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 1, widthClass: "w-1/4" },
  },
  {
    id: "birthDate",
    label: "생년월일",
    value: ["030403"],
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 1, widthClass: "w-1/4" },
  },
  {
    id: "gender",
    label: "성별",
    value: ["남"],
    desktop: { row: 1, widthClass: "w-1/13" },
    mobile: { table: 1, widthClass: "w-1/4" },
  },

  // --- Desktop: Row 1 / Mobile: Table 2 ---
  {
    id: "entryYear",
    label: "입학년도",
    value: ["2022"],
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
  {
    id: "entrySemester",
    label: "입학학기",
    value: ["1학기"],
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
  {
    id: "entryType",
    label: "입학구분",
    value: ["수시1"],
    desktop: { row: 1, widthClass: "w-2/13" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },

  // --- Desktop: Row 2 / Mobile: Table 2 ---
  {
    id: "studentType",
    label: "학생구분",
    value: ["일반"],
    desktop: { row: 2, widthClass: "w-2/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },

  // --- Desktop: Row 2 / Mobile: Table 3 ---
  {
    id: "major",
    label: "학과(부)/전공",
    value: ["컴퓨터공학부"],
    desktop: { row: 2, widthClass: "w-3/12" },
    mobile: { table: 3, widthClass: "w-2/5" }, // 모바일에서는 이 칸이 좀 더 넓으므로 비율 조정
  },
  {
    id: "college",
    label: "대학명",
    value: ["공과대학"],
    desktop: { row: 2, widthClass: "w-3/12" },
    mobile: { table: 3, widthClass: "w-1/5" },
  },
  {
    id: "grade",
    label: "학년",
    value: ["4학년"],
    desktop: { row: 2, widthClass: "w-2/12" },
    mobile: { table: 3, widthClass: "w-1/5" },
  },
  {
    id: "status",
    label: "학적상태",
    value: ["재학생"],
    desktop: { row: 2, widthClass: "w-2/12" },
    mobile: { table: 3, widthClass: "w-1/5" },
  },
];

/**
 * 원전공 정보 데이터
 */
export const PRIMARY_MAJOR_FIELDS: ListTableField[] = [
  {
    id: "primaryMajorName",
    label: "전공명",
    value: ["컴퓨터공학부"],
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 1, widthClass: "w-4/12" },
  },
  {
    id: "primaryCollegeName",
    label: "대학명",
    value: ["공과대학"],
    desktop: { row: 1, widthClass: "w-2/12" },
    mobile: { table: 1, widthClass: "w-3/12" },
  },
  {
    id: "primaryApplyYear",
    label: "신청년도",
    value: ["2022"],
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-3/12" },
  },
  {
    id: "primaryApplySemester",
    label: "신청학기",
    value: ["1학기"],
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "primaryThesisType",
    label: "논문유형",
    value: ["졸업논문"],
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
  {
    id: "primaryThesisTitle",
    label: "논문제목",
    value: ["데이터 기반 UI/UX 개선 연구"],
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 2, widthClass: "w-2/4" },
  },
  {
    id: "primaryPassStatus",
    label: "합격",
    value: ["Y"],
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
];

/**
 * 복수전공 정보 데이터 (데이터가 없는 경우를 가정한 예시)
 */
export const SECONDARY_MAJOR_FIELDS: ListTableField[] = [
  {
    id: "secondaryMajorName",
    label: "전공명",
    value: ["-"],
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 1, widthClass: "w-4/12" },
  },
  {
    id: "secondaryCollegeName",
    label: "대학명",
    value: ["-"],
    desktop: { row: 1, widthClass: "w-2/12" },
    mobile: { table: 1, widthClass: "w-3/12" },
  },
  {
    id: "secondaryApplyYear",
    label: "신청년도",
    value: ["-"],
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-3/12" },
  },
  {
    id: "secondaryApplySemester",
    label: "신청학기",
    value: ["-"],
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "secondaryThesisType",
    label: "논문유형",
    value: ["-"],
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
  {
    id: "secondaryThesisTitle",
    label: "논문제목",
    value: ["-"],
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 2, widthClass: "w-2/4" },
  },
  {
    id: "secondaryPassStatus",
    label: "합격",
    value: ["-"],
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/4" },
  },
];

export const USER_MAJOR_INFO = [
  {
    title: "원전공",
    fields: PRIMARY_MAJOR_FIELDS,
  },
  {
    title: "복수전공",
    fields: SECONDARY_MAJOR_FIELDS,
  },
];

export const GRADUATION_AUDIT_BASIC_DATA = [
  {
    id: "no",
    label: "No",
    value: ["1", "2", "3"],
    desktop: { row: 1, widthClass: "w-1/20" },
    mobile: { table: 1, widthClass: "w-1/12" },
  },
  {
    id: "content",
    label: "요건 내용",
    value: [
      "교양학점(영역별 이수학점 및 총 이수학점 조건)",
      "교양학점(영역별 이수학점 및 총 이수학점 조건)",
      "교양학점(영역별 이수학점 및 총 이수학점 조건)",
    ],
    desktop: { row: 1, widthClass: "w-8/20" },
    mobile: { table: 1, widthClass: "w-7/12" },
  },
  {
    id: "standard",
    label: "기준",
    value: ["12과목", "12과목", "12과목"],
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "acquired",
    label: "취득",
    value: ["12과목", "12과목", "12과목"],
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "deficient",
    label: "부족",
    value: ["0과목", "0과목", "0과목"],
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "details",
    label: "세부항목",
    value: ["-", "-", "-"],
    desktop: { row: 1, widthClass: "w-3/20" },
    mobile: { table: 0, widthClass: "w-6/12" },
  },
  {
    id: "status",
    label: "합격",
    value: ["합격", "불합", "합격"],
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "detailsStatus",
    label: "상세보기",
    value: [""],
    desktop: { row: 0, widthClass: "w-2/20" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
];