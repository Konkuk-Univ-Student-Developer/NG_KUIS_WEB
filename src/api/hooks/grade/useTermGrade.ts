import { useState, useEffect } from 'react';
import { http } from '@/api/fetch';
import type { TermGradeResponse, GradeRequestParams } from '@/types/grade';

// API 함수
export const getTermGrade = async (params: GradeRequestParams): Promise<TermGradeResponse> => {
  const { memberId, year, semester } = params;
  const queryParams: Record<string, string> = {};
  
  if (year) queryParams.year = year.toString();
  if (semester) queryParams.semester = semester;
  
  const { response } = await http.get<TermGradeResponse>(
    `/members/${memberId}/grades`, 
    queryParams
  );
  return response;
};

// 훅
export const useTermGrade = (params: GradeRequestParams) => {
  const [termGradeData, setTermGradeData] = useState<TermGradeResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTermGrade(params);
        setTermGradeData(data);
      } catch (err) {
        console.error('Failed to fetch term grade data:', err);
      }
    };

    fetchData();
  }, [params.memberId, params.year, params.semester]);

  return { termGradeData };
};
