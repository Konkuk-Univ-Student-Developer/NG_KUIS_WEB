import { http } from "@/api/fetch";
import { useEffect, useState } from "react";

export interface CreditRow {
  programType: string;
  category: string;
  required: number;
  acquired: number;
  remaining: number;
}

export interface CreditSummary {
  totalEarned: number;
  totalRegistered: number;
  duplicated: number;
  remainingAll: number;
}

export interface CountStatus {
  label: string;
  target: number;
  acquired: number;
}

export interface DuplicateCourse {
  courseNumber: string;
  courseName: string;
  category: string;
  credit: number;
  letterGrade: string;
}

export interface CourseItem {
  courseYear: number;
  semester: "FIRST" | "SECOND";
  gradeLevel: number;
  courseNumber: string;
  courseName: string;
  divisionLabel: string;
  credit: number;
  letterGrade: string;
}

export interface CategoryCourse {
  categoryLabel: string;
  totalEarnedCredits: number;
  totalRegisteredCredits: number;
  items: CourseItem[];
}

export interface CreditDetailsResponse {
  creditRows: CreditRow[];
  creditSummary: CreditSummary;
  basicLiberal: CountStatus[];
  advancedLiberal: CountStatus[];
  englishCounts: CountStatus[];
  duplicates: DuplicateCourse[];
  categoryCourses: CategoryCourse[];
}

const fetchCreditDetails = async (
  memberId: number
): Promise<CreditDetailsResponse> => {
  const { response } = await http.get<CreditDetailsResponse>(
    `/members/${memberId}/graduations/dashboard`
  );
  return response;
};

export const useResultCredit = (memberId: number) => {
  const [data, setData] = useState<CreditDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!memberId) return;

    setIsLoading(true);
    setIsError(false);

    fetchCreditDetails(memberId)
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
