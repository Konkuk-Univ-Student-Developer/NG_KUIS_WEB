import { http } from "@/api/fetch";
import type { CourseData, ApiResponse } from "@/constants/TimetableConstants";

// Request parameters for timetable API
export interface TimetableParams {
  year?: string;
  semester?: string;
  category?: string;
  professor?: string;
  courseNumber?: string;
  department?: string;
  courseName?: string;
  page?: number;
  size?: number;
}

// Semester mapping
export const SEMESTER_MAP: Record<string, string> = {
  '1학기': 'FIRST',
  '하계 계절학기': 'SUMMER',
  '2학기': 'SECOND',
  '동계 계절학기': 'WINTER'
};

// Response type for list view
export interface TimetableListResponse {
  content: CourseData[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// Response type for card view (can be different if needed)
export interface TimetableCardResponse extends TimetableListResponse {}

/**
 * Fetch timetable data for list view
 * @param params - Query parameters for filtering and pagination
 * @returns Promise with timetable list data
 */
export const fetchTimetableList = async (
  params: TimetableParams = {}
): Promise<TimetableListResponse> => {
  // Build query parameters
  const queryParams: Record<string, string> = {};
  
  if (params.year) queryParams.year = params.year;
  if (params.semester) queryParams.semester = params.semester;
  if (params.category) queryParams.category = params.category;
  if (params.professor) queryParams.professor = params.professor;
  if (params.courseNumber) queryParams.courseNumber = params.courseNumber;
  if (params.department) queryParams.department = params.department;
  if (params.courseName) queryParams.courseName = params.courseName;
  if (params.page !== undefined) queryParams.page = params.page.toString();
  if (params.size !== undefined) queryParams.size = params.size.toString();
  
  console.log('📋 Fetching Timetable List:', {
    endpoint: '/courses',
    params: queryParams
  });
  
  try {
    const { response } = await http.get<TimetableListResponse>(
      '/courses',
      queryParams
    );
    
    console.log('✅ Timetable List Response:', {
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      currentPage: response.number,
      contentSize: response.content?.length || 0
    });
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching timetable list:', error);
    throw error;
  }
};

/**
 * Fetch timetable data for card view
 * @param params - Query parameters for filtering and pagination
 * @returns Promise with timetable card data
 */
export const fetchTimetableCard = async (
  params: TimetableParams = {}
): Promise<TimetableCardResponse> => {
  // Build query parameters
  const queryParams: Record<string, string> = {};
  
  if (params.year) queryParams.year = params.year;
  if (params.semester) queryParams.semester = params.semester;
  if (params.category) queryParams.category = params.category;
  if (params.professor) queryParams.professor = params.professor;
  if (params.courseNumber) queryParams.courseNumber = params.courseNumber;
  if (params.department) queryParams.department = params.department;
  if (params.courseName) queryParams.courseName = params.courseName;
  if (params.page !== undefined) queryParams.page = params.page.toString();
  if (params.size !== undefined) queryParams.size = params.size.toString();
  
  console.log('🎴 Fetching Timetable Cards:', {
    endpoint: '/courses/card',
    params: queryParams
  });
  
  try {
    const { response } = await http.get<TimetableCardResponse>(
      '/courses/card',
      queryParams
    );
    
    console.log('✅ Timetable Card Response:', {
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      currentPage: response.number,
      contentSize: response.content?.length || 0
    });
    
    return response;
  } catch (error) {
    console.error('❌ Error fetching timetable cards:', error);
    throw error;
  }
};

/**
 * Transform API response to match component expectations
 * This is useful if the API response format differs from what the component expects
 */
export const transformTimetableData = (data: TimetableListResponse): ApiResponse => {
  return {
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    first: data.first,
    last: data.last,
    size: data.size,
    content: data.content,
    number: data.number,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    numberOfElements: data.content.length,
    pageable: {
      pageNumber: data.number,
      pageSize: data.size,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      offset: data.number * data.size,
      paged: true,
      unpaged: false
    },
    empty: data.empty
  };
};