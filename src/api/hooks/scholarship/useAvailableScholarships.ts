import { useState, useEffect } from 'react';
import { http } from '@/api/fetch';
import type { AvailableScholarshipsResponse, ScholarshipRequestParams } from '@/types/scholarship';

export const getAvailableScholarships = async (params: ScholarshipRequestParams): Promise<AvailableScholarshipsResponse> => {
  const { memberId, year, semester } = params;
  const queryParams: Record<string, string> = {};
  if (year) queryParams.year = year.toString();
  if (semester) queryParams.semester = semester;
  
  const { response } = await http.get<AvailableScholarshipsResponse>(`/scholarships/${memberId}/available`, queryParams);
  return response;
};

export const useAvailableScholarships = (params: ScholarshipRequestParams) => {
  const [availableScholarshipsData, setAvailableScholarshipsData] = useState<AvailableScholarshipsResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAvailableScholarships(params);
        setAvailableScholarshipsData(data);
      } catch (err) {
        console.error('Failed to fetch available scholarships data:', err);
      }
    };

    fetchData();
  }, [params.memberId, params.year, params.semester]);

  return { availableScholarshipsData };
};
