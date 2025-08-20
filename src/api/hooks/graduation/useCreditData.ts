import { useMemo } from "react";
import {
  type CategoryCourse,
  useResultCredit,
} from "@/api/hooks/graduation/useResultCredit";
import { DETAILS_TABLE_COLUMNS } from "@/constants/GraduationConstants";
import type { RowData } from "@/types/graduation";

const formatCategoryCourses = (
  categoryCourses: CategoryCourse[] | undefined
) => {
  if (!categoryCourses) return [];

  return categoryCourses.map((category) => ({
    id: category.categoryLabel,
    title: category.categoryLabel,
    card: [
      {
        title: "취득 학점",
        value: category.totalEarnedCredits,
        unit: "학점",
      },
      {
        title: "수강 신청 학점",
        value: category.totalRegisteredCredits,
        unit: "학점",
      },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: category.items.map((course) => ({
        ...course,
        divisionLabel: course.divisionLabel ? course.divisionLabel : category.categoryLabel,
        semester: course.semester === "FIRST" ? "1학기" : "2학기",
        gradeLevel: course.gradeLevel == 0 ? "9학년" : `${course.gradeLevel}학년`,
      })),
    },
  }));
};

export function useCreditData(memberId: number) {
  const { data, isLoading, isError } = useResultCredit(memberId);

  const creditSummaryData = useMemo(() => {
    if (!data?.creditSummary) return [];
    const summary = data.creditSummary;
    return [
      { title: "총 취득 학점", value: summary.totalEarned, unit: "학점" },
      { title: "수강 신청 학점", value: summary.totalRegistered, unit: "학점" },
      { title: "중복 학점 계", value: summary.duplicated, unit: "학점" },
      { title: "잔여 학점", value: summary.remainingAll, unit: "학점" },
    ];
  }, [data]);

  const creditsSummaryRows = useMemo((): RowData[] => {
    if (!data?.creditRows) return [];
    return data.creditRows.map((row, idx) => ({
      ...row,
      id: idx,
      detailsStatus: "상세과목 보기",
      rowType: "accordion",
      desktopLink: row.category,
    }));
  }, [data]);

  const electiveGeneralRows = useMemo(() => {
    if (!data?.basicLiberal) return [];
    return data.basicLiberal.map((item, index) => ({
      ...item,
      no: index + 1,
    }));
  }, [data]);

  const electiveAdvancedRows = useMemo(() => {
    if (!data?.advancedLiberal) return [];
    return data.advancedLiberal.map((item, index) => ({
      ...item,
      no: index + 1,
    }));
  }, [data]);

  const englishCountsRows = useMemo(() => {
    if (!data?.englishCounts) return [];
    return data.englishCounts.map((item, index) => ({
      ...item,
      no: index + 1,
    }));
  }, [data]);

  const duplicateSubjectsRows = useMemo(() => {
    if (!data?.duplicates) return [];
    return data.duplicates.map((item, index) => ({
      ...item,
      no: index + 1,
    }));
  }, [data]);

  const subsectionDetailsData = useMemo(
    () => formatCategoryCourses(data?.categoryCourses),
    [data]
  );


  return {
    isLoading,
    isError,
    creditSummaryData,
    creditsSummaryRows,
    electiveGeneralRows,
    electiveAdvancedRows,
    englishCountsRows,
    duplicateSubjectsRows,
    subsectionDetailsData,
  };
}