import { useState, useEffect, useCallback } from 'react';
import { fetchLecturePlan, type LecturePlanParams } from '@/api/services/lectureService';
import type { LectureDetail } from '@/constants/DetailLectureConstants';
import type { CourseData } from '@/constants/TimetableConstants';

interface UseLecturePlanResult {
  data: Partial<LectureDetail> | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch lecture plan data from KUPIS
 * @param params - year and courseNumber (ltShtm is fixed as B01012)
 * @returns Object with data, loading, error states and refetch function
 */
export const useLecturePlan = (params?: Partial<LecturePlanParams>): UseLecturePlanResult => {
  const [data, setData] = useState<Partial<LectureDetail> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = useCallback(async () => {
    // Skip if params are incomplete
    if (!params?.year || !params?.courseNumber) {
      console.log('⏭️ Skipping fetch - missing params:', {
        hasParams: !!params,
        year: params?.year,
        courseNumber: params?.courseNumber
      });
      return;
    }
    
    console.log('🔄 Fetching lecture plan from API:', {
      year: params.year,
      courseNumber: params.courseNumber
    });
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchLecturePlan({
        year: params.year,
        courseNumber: params.courseNumber,
      });
      
      setData(result);
      
      console.log('✅ Lecture plan fetched successfully');
    } catch (err) {
      console.error('Failed to fetch lecture plan:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch lecture plan'));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [params?.year, params?.courseNumber]);
  
  // Fetch data when params change
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
 * Hook to merge fetched lecture plan with existing data
 * Prioritizes fetched data, falls back to courseData, then defaultData
 */
export const useMergedLectureData = (
  fetchedData: Partial<LectureDetail> | null,
  courseData: CourseData | undefined,
  defaultData: LectureDetail
): LectureDetail => {
  // Log the merge process
  console.log('🔄 Merging Lecture Data:', {
    hasDefaultData: !!defaultData,
    hasCourseData: !!courseData,
    hasFetchedData: !!fetchedData,
    fetchedDataKeys: fetchedData ? Object.keys(fetchedData) : [],
    courseDataKeys: courseData ? Object.keys(courseData) : [],
  });
  
  // Extract data from courseData
  const courseDataExtracted = courseData ? {
    subjectName: courseData.courseName,
    courseCode: courseData.courseCode,
    courseNumber: courseData.courseNumber,
    category: courseData.courseCategory,
    grade: courseData.grade,
    credit: courseData.credit,
    professor: courseData.professor,
    department: courseData.departmentName,
    time: courseData.schedule,
  } : {};
  
  console.log('📦 Course Data Extracted:', courseDataExtracted);
  
  // Filter out empty values from fetchedData
  const cleanFetchedData = fetchedData ? Object.entries(fetchedData).reduce((acc, [key, value]) => {
    // Only include non-empty values
    if (value !== '' && value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Partial<LectureDetail>) : {};
  
  console.log('🧹 Cleaned Fetched Data:', {
    originalKeys: fetchedData ? Object.keys(fetchedData) : [],
    cleanedKeys: Object.keys(cleanFetchedData),
    cleanedData: cleanFetchedData
  });
  
  // Merge in order: defaultData -> courseData -> fetchedData (only non-empty values)
  const merged = {
    ...defaultData,
    ...courseDataExtracted,
    ...cleanFetchedData,
  } as LectureDetail;
  
  console.log('✅ Final Merged Result:', {
    subjectName: merged.subjectName,
    courseCode: merged.courseCode,
    courseNumber: merged.courseNumber,
    professor: merged.professor,
    grade: merged.grade,
    credit: merged.credit
  });
  
  return merged;
};