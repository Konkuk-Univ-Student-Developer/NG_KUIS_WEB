import { useMemo } from "react";
import { type RowData } from "@/types/graduation";
import { useResultAudit } from "@/api/hooks/graduation/useResultAudit";

export function useAuditData(memberId: number) {
  const { data, isLoading, isError } = useResultAudit(memberId);

  const bachelorRows = useMemo((): RowData[] => {
    if (!data?.bachelor) return [];
    return data.bachelor.map((item, index) => ({
      ...item,
      no: index + 1,
      detailsStatus: "",
      rowType: "accordion",
    }));
  }, [data]);

  const majorRows = useMemo((): RowData[] => {
    if (!data?.major) return [];
    return data.major.map((item, index) => ({
      ...item,
      no: index + 1,
      detailsStatus: "",
      rowType: "accordion",
    }));
  }, [data]);

  return {
    isLoading,
    isError,
    bachelorRows,
    majorRows,
  };
}
