import { useMemo } from "react";
import { MAJOR_COLUMNS } from "@/constants/GraduationConstants";
import { type RowData } from "@/types/graduation";
import { useResultSummary } from "@/api/hooks/graduation/useResultSummary";
import { type DashboardProgram } from "@/api/hooks/graduation/useResultSummary";

export function useSummaryData(memberId: number) {
  const { data, isLoading, isError } = useResultSummary(memberId);

  const creditSummaryData = useMemo(() => {
    if (!data) return [];
    return [
      {
        title: "총 취득 학점",
        value: data.summary.totalEarnedCredits,
        unit: `/${data.summary.requiredCredits}`,
      },
      {
        title: "전체 평점",
        value: parseFloat(data.summary.gpa),
        unit: `/${data.summary.gpaScale}`,
      },
    ];
  }, [data]);

  const userInfoRows = useMemo((): RowData[] => {
    if (!data) return [];
    const { basic } = data;

    const formattedData = {
      ...basic,
      birthRaw: basic.birthRaw.replace(/-/g, "").slice(2),
      gender: basic.gender === "MALE" ? "남" : "여",
      entranceSemester: basic.entranceSemester === "FIRST" ? "1학기" : "2학기",
      grade: `${basic.grade}학년`,
      status: basic.status === "ENROLLED" ? "재학생" : "휴학생",
    };

    return [formattedData];
  }, [data]);

  const userMajorInfo = useMemo(() => {
    if (!data) return [];

    const formatPrograms = (programs: DashboardProgram[]) => {
      return programs.map((p) => ({
        ...p,
        majorName: p.majorName ?? "-",
        collegeName: p.collegeName ?? "-",
        appliedYear: p.appliedYear ?? "-",
        appliedSemester:
          p.appliedSemester === "FIRST"
            ? "1학기"
            : p.appliedSemester === "SECOND"
            ? "2학기"
            : "-",
        thesisType: p.thesisType ?? "-",
        thesisTitle: p.thesisTitle ?? "-",
        passed: p.passed ?? "-",
      }));
    };

    const primaryMajor = data.programs.filter(
      (p) => p.programType === "원전공"
    );
    const secondaryMajor = data.programs.filter(
      (p) => p.programType === "복수전공"
    );

    const secondaryMajorRows =
      secondaryMajor.length > 0
        ? formatPrograms(secondaryMajor)
        : [
            {
              majorName: "-",
              collegeName: "-",
              appliedYear: "-",
              appliedSemester: "-",
              thesisType: "-",
              thesisTitle: "-",
              passed: "-",
            },
          ];

    return [
      {
        title: "원전공",
        rows: formatPrograms(primaryMajor),
        columns: MAJOR_COLUMNS,
      },
      { title: "복수전공", rows: secondaryMajorRows, columns: MAJOR_COLUMNS },
    ];
  }, [data]);

  return {
    data,
    isLoading,
    isError,
    creditSummaryData,
    userInfoRows,
    userMajorInfo,
  };
}