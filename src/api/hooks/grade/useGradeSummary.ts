import { useState, useEffect } from 'react';
import { http } from '@/api/fetch';
import type { GradeSummaryResponse } from '@/types/grade';

// API 함수
export const getGradeSummary = async (memberId: number): Promise<GradeSummaryResponse> => {
  const { response } = await http.get<GradeSummaryResponse>(`/members/${memberId}/summaries`);
  return response;
};

// 훅
export const useGradeSummary = (memberId: number) => {
  const [gradeSummaryData, setGradeSummaryData] = useState<GradeSummaryResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGradeSummary(memberId);
        setGradeSummaryData(data);
      } catch (err) {
        console.error('Failed to fetch grade summary data:', err);
      }
    };

    fetchData();
  }, [memberId]);

  return { gradeSummaryData };
};
