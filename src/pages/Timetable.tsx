import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, CourseCard, TitleSection, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Tab, Select, SearchInput } from '@/components/commons';
import { useTimetableList } from '@/api/hooks/timetable/useTimetableList';
import { useTimetableCard } from '@/api/hooks/timetable/useTimetableCard';
import { SEMESTER_MAP } from '@/api/services/timetableService';

import {
  YEAR_OPTIONS,
  SEMESTER_OPTIONS,
  CATEGORY_OPTIONS,
  COURSE_DATA,
  MOCK_API_RESPONSE
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

  // Use appropriate hook based on view mode
  const listResult = useTimetableList(viewMode === 'List' ? apiParams : undefined);
  const cardResult = useTimetableCard(viewMode === 'Card' ? apiParams : undefined);

  // Select the active result based on view mode
  const activeResult = viewMode === 'List' ? listResult : cardResult;
  const { data, totalPages, loading, error, refetch } = activeResult;

  // Update API params when filters or search queries change
  useEffect(() => {
    const params: any = {
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
  const displayData = data && data.length > 0 ? data : COURSE_DATA;
  const displayTotalPages = totalPages > 0 ? totalPages : MOCK_API_RESPONSE.totalPages;

  const navigate = useNavigate();
  const goDetail = (courseCode: string, courseData?: any) => {
    navigate(courseCode, { state: { courseData } });
  };

  return (
    <div className="min-h-screen bg-white md:mx-24">
      <div className="px-5 py-[25px] space-y-6 md:px-16 md:pt-[72px] md:pb-12">
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
        <div className="md:px-16">
          <Table>
            <TableHeader className="border-t bg-beige">
              <TableRow className="[&>th]:text-center [&>th]:font-bold md:[&>th]:text-xl md:[&>th]:font-normal">
                <TableHead>학년</TableHead>
                <TableHead>과목번호</TableHead>
                <TableHead>교과목명</TableHead>
                <TableHead>학점</TableHead>
                <TableHead>담당교수</TableHead>
                <TableHead>수업시간 및 강의실</TableHead>
                <TableHead>수업방법</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&>tr]:hover:bg-gray-100">
              {displayData.map((course, index) => (
                <TableRow key={index} className="[&>td]:text-center md:[&>td]:text-base cursor-pointer" onClick={() => goDetail(course.courseCode, course)}>
                  <TableCell>{course.grade}</TableCell>
                  <TableCell>{course.courseNumber}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.credit || 3}</TableCell>
                  <TableCell>{course.professor}</TableCell>
                  <TableCell>{course.schedule}</TableCell>
                  <TableCell>{course.method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : !loading && !error ? (
        /* Card View */
        <div className="px-5 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-[36px] justify-items-center">
            {displayData.map((course, index) => (
              <div key={index} onClick={() => goDetail(course.courseCode, course)} className="cursor-pointer w-full">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Pagination */}
      {!loading && !error && displayData.length > 0 && (
        <div className="px-5 py-6 md:px-16">
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