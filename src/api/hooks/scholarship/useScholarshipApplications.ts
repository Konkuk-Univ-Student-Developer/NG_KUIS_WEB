import { useState, useEffect } from 'react';
import { http } from '@/api/fetch';
import type { ScholarshipApplicationsResponse, ScholarshipRequestParams } from '@/types/scholarship';

export const getScholarshipApplications = async (params: ScholarshipRequestParams): Promise<ScholarshipApplicationsResponse> => {
  const { memberId, from, to } = params;
  const queryParams: Record<string, string> = {};
  if (from) queryParams.from = from;
  if (to) queryParams.to = to;
  
  const { response } = await http.get<ScholarshipApplicationsResponse>(`/scholarships/${memberId}/applications`, queryParams);
  return response;
};

export const useScholarshipApplications = (params: ScholarshipRequestParams) => {
  const [applicationsData, setApplicationsData] = useState<ScholarshipApplicationsResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getScholarshipApplications(params);
        setApplicationsData(data);
      } catch (err) {
        console.error('Failed to fetch scholarship applications data:', err);
      }
    };

    fetchData();
  }, [params.memberId, params.from, params.to]);

  return { applicationsData };
};
