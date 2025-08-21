import { useState, useEffect } from 'react';
import { http } from '@/api/fetch';
import type { AllGradesResponse } from '@/types/grade';

// API 함수
export const getAllGrades = async (memberId: number): Promise<AllGradesResponse> => {
  const { response } = await http.get<AllGradesResponse>(`/members/${memberId}/allgrades`);
  return response;
};

// 훅
export const useAllGrades = (memberId: number) => {
  const [allGradesData, setAllGradesData] = useState<AllGradesResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllGrades(memberId);
        setAllGradesData(data);
      } catch (err) {
        console.error('Failed to fetch all grades data:', err);
      }
    };

    fetchData();
  }, [memberId]);

  return { allGradesData };
};
