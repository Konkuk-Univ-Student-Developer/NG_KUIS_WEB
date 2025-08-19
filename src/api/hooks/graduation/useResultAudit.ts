import { http } from "@/api/fetch";
import { useEffect, useState } from "react";

export interface AuditStatus {
  title: string;
  criterion: string;
  acquired: string;
  lack: string;
  detail: string;
  result: string;
}

export interface AuditResponse {
  bachelor: AuditStatus[];
  major: AuditStatus[];
}

const fetchGraduationAudits = async (
  memberId: number
): Promise<AuditResponse> => {
  const { response } = await http.get<AuditResponse>(
    `/members/${memberId}/graduations/check`
  );
  return response;
};

export const useResultAudit = (memberId: number) => {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!memberId) return;

    setIsLoading(true);
    setIsError(false);

    fetchGraduationAudits(memberId)
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
