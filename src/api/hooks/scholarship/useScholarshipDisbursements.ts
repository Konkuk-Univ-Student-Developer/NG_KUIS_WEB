import { useState, useEffect } from 'react';
import { http } from '@/api/fetch';
import type { ScholarshipDisbursementsResponse } from '@/types/scholarship';

export const getScholarshipDisbursements = async (memberId: number): Promise<ScholarshipDisbursementsResponse> => {
  const { response } = await http.get<ScholarshipDisbursementsResponse>(`/scholarships/${memberId}/disbursements`);
  return response;
};

export const useScholarshipDisbursements = (memberId: number) => {
  const [disbursementsData, setDisbursementsData] = useState<ScholarshipDisbursementsResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getScholarshipDisbursements(memberId);
        setDisbursementsData(data);
      } catch (err) {
        console.error('Failed to fetch scholarship disbursements data:', err);
      }
    };

    fetchData();
  }, [memberId]);

  return { disbursementsData };
};
