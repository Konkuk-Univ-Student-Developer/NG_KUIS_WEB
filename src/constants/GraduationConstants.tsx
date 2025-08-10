import GraduationSummary from "@/components/graduation/GraduationSummary";
import GraduationAudit from "@/components/graduation/GraduationAudit";
import CompletedCredits from "@/components/graduation/CompletedCredits";

export const GRADUATION_TABS = ["결과 요약", "졸업 사정", "취득학점확인원"];

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
