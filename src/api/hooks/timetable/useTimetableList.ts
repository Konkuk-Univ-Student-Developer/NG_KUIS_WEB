import { useState, useEffect, useCallback } from 'react';
import { fetchTimetableList, type TimetableParams, type TimetableListResponse } from '@/api/services/timetableService';
import type { CourseData } from '@/constants/TimetableConstants';

interface UseTimetableListResult {
  data: CourseData[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch timetable list data
 * @param params - Query parameters for filtering and pagination
 * @returns Object with data, pagination info, loading, error states and refetch function
 */
export const useTimetableList = (params?: TimetableParams): UseTimetableListResult => {
  const [data, setData] = useState<CourseData[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Create a cache key from params
  const cacheKey = params ? JSON.stringify(params) : 'default';
  
  // Simple in-memory cache using sessionStorage
  const getCachedData = useCallback(() => {
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem(`timetable-list-${cacheKey}`);
      if (cached) {
        try {
          const parsedCache = JSON.parse(cached);
          // Check if cache is still valid (5 minutes)
          const cacheTime = parsedCache.timestamp;
          const now = Date.now();
          if (now - cacheTime < 5 * 60 * 1000) {
            return parsedCache.data;
          } else {
            // Clear expired cache
            sessionStorage.removeItem(`timetable-list-${cacheKey}`);
          }
        } catch {
          return null;
        }
      }
    }
    return null;
  }, [cacheKey]);
  
  const setCachedData = useCallback((responseData: TimetableListResponse) => {
    if (typeof window !== 'undefined' && responseData) {
      const cacheData = {
        data: responseData,
        timestamp: Date.now()
      };
      sessionStorage.setItem(`timetable-list-${cacheKey}`, JSON.stringify(cacheData));
    }
  }, [cacheKey]);
  
  const fetchData = useCallback(async () => {
    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
      console.log('📦 Using cached timetable list data');
      setData(cachedData.content || []);
      setTotalPages(cachedData.totalPages || 0);
      setTotalElements(cachedData.totalElements || 0);
      setCurrentPage(cachedData.number || 0);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Fetching timetable list with params:', params);
      const response = await fetchTimetableList(params);
      
      setData(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
      setCurrentPage(response.number || 0);
      
      // Cache the response
      setCachedData(response);
      
      console.log('✅ Timetable list fetched successfully:', {
        items: response.content?.length || 0,
        pages: response.totalPages,
        total: response.totalElements
      });
    } catch (err) {
      console.error('❌ Failed to fetch timetable list:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch timetable list'));
      setData([]);
      setTotalPages(0);
      setTotalElements(0);
      setCurrentPage(0);
    } finally {
      setLoading(false);
    }
  }, [params, getCachedData, setCachedData]);
  
  // Fetch data when params change
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Refetch function that bypasses cache
  const refetch = useCallback(async () => {
    // Clear cache for this key
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(`timetable-list-${cacheKey}`);
    }
    await fetchData();
  }, [cacheKey, fetchData]);
  
  return {
    data,
    totalPages,
    totalElements,
    currentPage,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to handle timetable list with filters and pagination
 * This is a higher-level hook that manages the state for filters and pagination
 */
export const useTimetableListWithFilters = () => {
  const [filters, setFilters] = useState<TimetableParams>({
    page: 0,
    size: 20,
  });
  
  const result = useTimetableList(filters);
  
  const updateFilters = useCallback((newFilters: Partial<TimetableParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      // Reset to first page when filters change (except page itself)
      page: newFilters.page !== undefined ? newFilters.page : 0,
    }));
  }, []);
  
  const setPage = useCallback((page: number) => {
    setFilters(prev => ({
      ...prev,
      page: page - 1, // Convert 1-based to 0-based indexing
    }));
  }, []);
  
  return {
    ...result,
    filters,
    updateFilters,
    setPage,
  };
};