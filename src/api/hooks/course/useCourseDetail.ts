import { useState, useEffect, useCallback } from 'react';
import { fetchCourseDetail } from '@/api/services/courseDetailService';
import type { CourseDetailResponse } from '@/types/courseDetail';

interface UseCourseDetailResult {
  data: CourseDetailResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch course detail data from API
 * @param courseCode - 4-digit course code
 * @returns Object with data, loading, error states and refetch function
 */
export const useCourseDetail = (courseCode?: string): UseCourseDetailResult => {
  const [data, setData] = useState<CourseDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = useCallback(async () => {
    // Skip if no courseCode provided
    if (!courseCode) {
      console.log('⏭️ Skipping fetch - no course code provided');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Fetching course detail for code:', courseCode);
      const response = await fetchCourseDetail(courseCode);
      
      setData(response);
      
      console.log('✅ Course detail fetched successfully:', {
        courseCode,
        subjectName: response.subjectInfo?.subject_name
      });
    } catch (err) {
      console.error('❌ Failed to fetch course detail:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch course detail'));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [courseCode]);
  
  // Fetch data when courseCode changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Refetch function
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);
  
  return {
    data,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to merge course detail with existing course data
 * Useful when you have partial data from a list and need complete details
 */
export const useMergedCourseDetail = (
  courseCode?: string,
  existingData?: Partial<CourseDetailResponse>
): UseCourseDetailResult & { mergedData: CourseDetailResponse | null } => {
  const { data, loading, error, refetch } = useCourseDetail(courseCode);
  
  const mergedData = data || existingData ? {
    ...existingData,
    ...data,
  } as CourseDetailResponse : null;
  
  console.log('🔄 Merging Course Detail Data:', {
    hasFetchedData: !!data,
    hasExistingData: !!existingData,
    mergedSubjectName: mergedData?.subjectInfo?.subject_name
  });
  
  return {
    data,
    loading,
    error,
    refetch,
    mergedData
  };
};