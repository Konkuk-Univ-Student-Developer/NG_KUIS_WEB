import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Pagination, CourseCard, TitleSection, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Tab, Select, SearchInput } from '@/components/commons';
import { useTimetableList } from '@/api/hooks/timetable/useTimetableList';
import { useTimetableCard } from '@/api/hooks/timetable/useTimetableCard';
import { SEMESTER_MAP } from '@/api/services/timetableService';

import {
  YEAR_OPTIONS,
  SEMESTER_OPTIONS,
  CATEGORY_OPTIONS,
  COURSE_DATA,
  MOCK_API_RESPONSE,
  type CourseData
} from '@/constants/TimetableConstants';

const TimetablePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'List' | 'Card'>('List');
  const [filters, setFilters] = useState({
    year: '',
    semester: '',
    category: ''
  });
  const [searchQueries, setSearchQueries] = useState({
    professor: '',
    courseNumber: '',
    department: '',
    courseName: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [apiParams, setApiParams] = useState({
    page: 0,
    size: 20
  });
  
  // Sorting state
  type SortColumn = 'grade' | 'courseNumber' | 'courseName' | 'credit' | 'professor' | null;
  type SortDirection = 'asc' | 'desc' | 'none';
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('none');

  // Use appropriate hook based on view mode
  const listResult = useTimetableList(viewMode === 'List' ? apiParams : undefined);
  const cardResult = useTimetableCard(viewMode === 'Card' ? apiParams : undefined);

  // Select the active result based on view mode
  const activeResult = viewMode === 'List' ? listResult : cardResult;
  const { data, totalPages, loading, error, refetch } = activeResult;

  // Update API params when filters or search queries change
  useEffect(() => {
    interface ApiParams {
      page: number;
      size: number;
      year?: string;
      semester?: string;
      category?: string;
      professor?: string;
      courseNumber?: string;
      department?: string;
      courseName?: string;
    }

    const params: ApiParams = {
      page: currentPage - 1, // Convert to 0-based indexing
      size: 20
    };

    if (filters.year) params.year = filters.year;
    // Convert semester label to API format
    if (filters.semester) {
      params.semester = SEMESTER_MAP[filters.semester] || filters.semester;
    }
    if (filters.category) params.category = filters.category;
    if (searchQueries.professor) params.professor = searchQueries.professor;
    if (searchQueries.courseNumber) params.courseNumber = searchQueries.courseNumber;
    if (searchQueries.department) params.department = searchQueries.department;
    if (searchQueries.courseName) params.courseName = searchQueries.courseName;

    setApiParams(params);
  }, [filters, searchQueries, currentPage]);

  // Use fallback data if API is not available
  const baseData = data && data.length > 0 ? data : COURSE_DATA;
  const displayTotalPages = totalPages > 0 ? totalPages : MOCK_API_RESPONSE.totalPages;

  // Sorting function
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Cycle through: asc -> desc -> none
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection('none');
        setSortColumn(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Apply sorting to data
  const displayData = useMemo(() => {
    if (!sortColumn || sortDirection === 'none') {
      return baseData;
    }

    const sortedData = [...baseData];
    sortedData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // Handle credit default value and numeric comparison
      if (sortColumn === 'credit') {
        const aCredit = (aValue as number | undefined) || 3;
        const bCredit = (bValue as number | undefined) || 3;
        return sortDirection === 'asc' ? aCredit - bCredit : bCredit - aCredit;
      }

      // Numeric comparison for grade
      if (sortColumn === 'grade') {
        const aGrade = Number(aValue);
        const bGrade = Number(bValue);
        return sortDirection === 'asc' ? aGrade - bGrade : bGrade - aGrade;
      }

      // String comparison for other columns (courseNumber, courseName, professor)
      const aStr = String(aValue || '');
      const bStr = String(bValue || '');
      return sortDirection === 'asc' 
        ? aStr.localeCompare(bStr, 'ko')
        : bStr.localeCompare(aStr, 'ko');
    });

    return sortedData;
  }, [baseData, sortColumn, sortDirection]);

  const navigate = useNavigate();

  const goDetail = (courseNumber: string, courseData?: CourseData) => {
    console.log('🚀 Navigating to DetailLecture:', {
      courseNumber,
      semester: filters.semester,
      courseData: {
        courseCode: courseData?.courseCode,
        courseNumber: courseData?.courseNumber,
        courseName: courseData?.courseName,
        fullData: courseData
      }
    });
    navigate(courseNumber, {
      state: {
        courseData,
        semester: filters.semester // 학기 정보 추가
      }
    });
  };

  return (
    <div className="min-h-screen bg-white md:mx-12 lg:mx-24 transition-all duration-300 ease-in-out select-none">
      <div className="px-5 py-[25px] space-y-6 md:px-8 lg:px-16 md:pt-[72px] md:pb-12 transition-all duration-300 ease-in-out">
        {/* Title */}
        <TitleSection title="종합강의시간표" icon={<></>} path="/quick-menu"
        />

        {/* Filters and Search - 모바일: 여러 줄, 데스크톱: 2줄 */}
        <div className="space-y-3">
          {/* First row: Filters */}
          <div className="grid grid-cols-3 gap-3">
            <Select
              value={filters.year}
              onChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
              placeholder="강의년도"
              options={YEAR_OPTIONS}
            />
            <Select
              value={filters.semester}
              onChange={(value) => setFilters(prev => ({ ...prev, semester: value }))}
              placeholder="강의학기"
              options={SEMESTER_OPTIONS}
            />
            <Select
              value={filters.category}
              onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
              placeholder="이수구분"
              options={CATEGORY_OPTIONS}
            />
          </div>

          {/* Second row: Search Inputs */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <SearchInput
              key="courseName-search"
              placeholder="교과목명"
              value={searchQueries.courseName}
              onChange={(value) => setSearchQueries(prev => ({ ...prev, courseName: value }))}
            />
            <SearchInput
              key="courseNumber-search"
              placeholder="과목번호"
              value={searchQueries.courseNumber}
              onChange={(value) => setSearchQueries(prev => ({ ...prev, courseNumber: value }))}
            />
            <SearchInput
              key="professor-search"
              placeholder="교강사"
              value={searchQueries.professor}
              onChange={(value) => setSearchQueries(prev => ({ ...prev, professor: value }))}
            />
            <SearchInput
              key="department-search"
              placeholder="학부(과)/전공"
              value={searchQueries.department}
              onChange={(value) => setSearchQueries(prev => ({ ...prev, department: value }))}
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end">
          <Tab
            tabs={['List', 'Card']}
            activeTab={viewMode}
            variant="fit"
            onTabClick={(tab) => setViewMode(tab as 'List' | 'Card')}
          />
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">데이터를 불러오는 중...</div>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center py-12">
          <div className="text-red-500 mb-4">데이터를 불러오는데 실패했습니다.</div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* Content - List or Card View */}
      {!loading && !error && viewMode === 'List' ? (
        <div className="md:px-8 lg:px-16 transition-all duration-300 ease-in-out">
          <Table>
            <TableHeader className="border-t bg-beige">
              <TableRow className="[&>th]:text-center [&>th]:font-bold md:[&>th]:text-xl md:[&>th]:font-normal">
                <TableHead 
                  className="cursor-pointer hover:bg-beige/80 transition-colors"
                  onClick={() => handleSort('grade')}
                >
                  <div className="flex items-center justify-center gap-1">
                    학년
                    {sortColumn === 'grade' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> :
                      sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : null
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-beige/80 transition-colors"
                  onClick={() => handleSort('courseNumber')}
                >
                  <div className="flex items-center justify-center gap-1">
                    과목번호
                    {sortColumn === 'courseNumber' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> :
                      sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : null
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-beige/80 transition-colors"
                  onClick={() => handleSort('courseName')}
                >
                  <div className="flex items-center justify-center gap-1">
                    교과목명
                    {sortColumn === 'courseName' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> :
                      sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : null
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-beige/80 transition-colors"
                  onClick={() => handleSort('credit')}
                >
                  <div className="flex items-center justify-center gap-1">
                    학점
                    {sortColumn === 'credit' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> :
                      sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : null
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-beige/80 transition-colors"
                  onClick={() => handleSort('professor')}
                >
                  <div className="flex items-center justify-center gap-1">
                    담당교수
                    {sortColumn === 'professor' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> :
                      sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : null
                    )}
                  </div>
                </TableHead>
                <TableHead>수업시간 및 강의실</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&>tr]:hover:bg-gray-100">
              {displayData.map((course, index) => (
                <TableRow key={index} className="[&>td]:text-center md:[&>td]:text-base cursor-pointer" onClick={() => goDetail(course.courseNumber, course)}>
                  <TableCell>{course.grade}</TableCell>
                  <TableCell>{course.courseNumber}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.credit || 3}</TableCell>
                  <TableCell>{course.professor}</TableCell>
                  <TableCell>{course.schedule}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : !loading && !error ? (
        /* Card View */
        <div className="px-5 md:px-8 lg:px-16 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-[18px] lg:gap-[36px] justify-items-center transition-all duration-300 ease-in-out">
            {displayData.map((course, index) => (
              <div key={index} onClick={() => goDetail(course.courseNumber, course)} className="cursor-pointer w-full">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Pagination */}
      {!loading && !error && displayData.length > 0 && (
        <div className="px-5 py-6 md:px-8 lg:px-16 transition-all duration-300 ease-in-out">
          <Pagination
            currentPage={currentPage}
            totalPages={displayTotalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default TimetablePage;