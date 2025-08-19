import { http } from "@/api/fetch";
import { useEffect, useState } from "react";

export interface DashboardBasic {
  studentNo: string;
  name: string;
  birthRaw: string;
  gender: string;
  entranceYear: number;
  entranceSemester: string;
  admissionType: string;
  college: string;
  department: string;
  grade: number;
  status: string;
  studentType: string;
}

export interface DashboardSummary {
  totalEarnedCredits: number;
  requiredCredits: number;
  gpa: string;
  gpaScale: string;
  passStatus: string;
  earlyGraduation: boolean;
}

export interface DashboardProgram {
  programType: string;
  majorName: string;
  collegeName: string;
  appliedYear: number;
  appliedSemester: string;
  thesisType: string;
  thesisTitle: string;
  passed: string;
}

export interface DashboardResponse {
  basic: DashboardBasic;
  summary: DashboardSummary;
  programs: DashboardProgram[];
}

const fetchMemberDashboard = async (
  memberId: number
): Promise<DashboardResponse> => {
  const { response } = await http.get<DashboardResponse>(
    `/members/${memberId}/dashboard`
  );
  return response;
};

export const useResultSummary = (memberId: number) => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!memberId) return;
    setIsLoading(true);
    setIsError(false);
    fetchMemberDashboard(memberId)
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [memberId]);

  return { data, isLoading, isError };
};
