import { http } from "@/api/fetch";
import type { CourseDetailResponse } from "@/types/courseDetail";

/**
 * Fetch course detail data including syllabus information
 * @param code - 4-digit course code
 * @returns Promise with complete course detail data
 */
export const fetchCourseDetail = async (
  code: string
): Promise<CourseDetailResponse> => {
  // Ensure code is a 4-digit string
  const formattedCode = code?.padStart(4, '0');
  
  console.log('📚 Fetching Course Detail:', {
    endpoint: `/courses/${formattedCode}`,
    originalCode: code,
    formattedCode: formattedCode,
    fullUrl: `${import.meta.env.VITE_API_BASE_URL}/courses/${formattedCode}`
  });
  
  try {
    const { response } = await http.get<CourseDetailResponse>(
      `/courses/${formattedCode}`
    );
    
    console.log('✅ Course Detail Response:', {
      subjectId: response.subjectInfo?.sbjt_id,
      subjectName: response.subjectInfo?.subject_name,
      evaluationItems: response.evaluation?.length || 0,
      books: response.books?.length || 0,
      assignments: response.assignments?.length || 0,
      weeklyPlans: response.weeklyPlans?.length || 0
    });
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching course detail:', {
      error,
      endpoint: `/courses/${formattedCode}`,
      code: formattedCode
    });
    throw error;
  }
};

/**
 * Transform course detail data if needed for UI components
 * @param data - Raw course detail response
 * @returns Transformed data for UI consumption
 */
export const transformCourseDetail = (data: CourseDetailResponse) => {
  return {
    ...data,
    evaluationTotal: data.evaluation?.reduce((sum, item) => sum + item.ratio, 0) || 0,
    hasTextbooks: data.books && data.books.length > 0,
    hasAssignments: data.assignments && data.assignments.length > 0,
    totalWeeks: data.weeklyPlans?.length || 0,
  };
};