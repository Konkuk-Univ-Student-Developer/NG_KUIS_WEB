import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, CourseCard } from '@/components/commons';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Tab, Select, SearchInput } from '@/components/commons';

import {
  YEAR_OPTIONS,
  SEMESTER_OPTIONS,
  CATEGORY_OPTIONS,
  COURSE_DATA,
  MOCK_API_RESPONSE
} from '@/constants/TimetableConstants';

// Props 타입 정의
interface MobileViewProps {
  viewMode: 'List' | 'Card';
  filters: {
    year: string;
    semester: string;
    category: string;
  };
  searchQueries: {
    professor: string;
    subjectCode: string;
    department: string;
  };
  currentPage: number;
  setViewMode: (mode: 'List' | 'Card') => void;
  setFilters: React.Dispatch<React.SetStateAction<{
    year: string;
    semester: string;
    category: string;
  }>>;
  setSearchQueries: React.Dispatch<React.SetStateAction<{
    professor: string;
    subjectCode: string;
    department: string;
  }>>;
  setCurrentPage: (page: number) => void;
}

// MobileView 컴포넌트 분리
const MobileView: React.FC<MobileViewProps> = ({
  viewMode,
  filters,
  searchQueries,
  currentPage,
  setViewMode,
  setFilters,
  setSearchQueries,
  setCurrentPage
}) => {
  const navigate = useNavigate();
  const goDetail = (subjectCode: string) => navigate(`/timetable/${subjectCode}`);
  return (
    <div className="min-h-screen bg-white">
      <div className="px-5 py-[25px] space-y-6">
        {/* Title */}
        <h1 className="text-darkgreen w-72 h-7 justify-center  text-lg font-bold leading-relaxed">종합강의시간표</h1>

        {/* Filter Dropdowns */}
        <div className="flex gap-3">
          <Select
            value={filters.year}
            onChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
            placeholder="강의년도"
            options={YEAR_OPTIONS}
            className="flex-1"
          />
          <Select
            value={filters.semester}
            onChange={(value) => setFilters(prev => ({ ...prev, semester: value }))}
            placeholder="강의학기"
            options={SEMESTER_OPTIONS}
            className="flex-1"
          />
          <Select
            value={filters.category}
            onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            placeholder="이수구분"
            options={CATEGORY_OPTIONS}
            className="flex-1"
          />
        </div>

        {/* Search Inputs */}
        <div className="flex gap-3">
          <SearchInput
            key="professor-search"
            className="flex-1"
            placeholder="교강사"
            value={searchQueries.professor}
            onChange={(value) => setSearchQueries(prev => ({ ...prev, professor: value }))}
          />
          <SearchInput
            key="subjectCode-search"
            className="flex-1"
            placeholder="과목번호"
            value={searchQueries.subjectCode}
            onChange={(value) => setSearchQueries(prev => ({ ...prev, subjectCode: value }))}
          />
          <SearchInput
            key="department-search"
            className="flex-1"
            placeholder="학부(과)/전공"
            value={searchQueries.department}
            onChange={(value) => setSearchQueries(prev => ({ ...prev, department: value }))}
          />
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

      {/* Content - List or Card View */}
      {viewMode === 'List' ? (
        <Table>
          <TableHeader className="border-t bg-beige">
            <TableRow className="[&>th]:text-center [&>th]:font-bold">
              <TableHead>학년</TableHead>
              <TableHead>과목번호</TableHead>
              <TableHead>교과목명</TableHead>
              <TableHead>학점</TableHead>
              <TableHead>담당교수</TableHead>
              <TableHead>강의실</TableHead>
              <TableHead>수업시간</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&>tr]:hover:bg-gray-100">
            {COURSE_DATA.map((course, index) => (
              <TableRow key={index} className="[&>td]:text-center cursor-pointer" onClick={() => goDetail(course.subjectCode)}>
                <TableCell>{course.grade}</TableCell>
                <TableCell>{course.subjectCode}</TableCell>
                <TableCell>{course.subjectName}</TableCell>
                <TableCell>{course.credit}</TableCell>
                <TableCell>{course.professor}</TableCell>
                <TableCell>{course.room}</TableCell>
                <TableCell>{course.time || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        /* Card View */
        <div className="px-5 space-y-3">
          {COURSE_DATA.map((course, index) => (
            <div key={index} onClick={() => goDetail(course.subjectCode)} className="cursor-pointer">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="px-5 py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={MOCK_API_RESPONSE.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
};

const DesktopView: React.FC<MobileViewProps> = ({
  viewMode,
  filters,
  searchQueries,
  currentPage,
  setViewMode,
  setFilters,
  setSearchQueries,
  setCurrentPage
}) => {
  const navigate = useNavigate();
  const goDetail = (subjectCode: string) => navigate(`/timetable/${subjectCode}`);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
        {/* 헤더: 제목 + 뷰 토글 */}
        <div className="flex items-center justify-between">
          <h1 className="text-darkgreen text-2xl font-bold">종합강의시간표</h1>
          <Tab
            tabs={['List', 'Card']}
            activeTab={viewMode}
            variant="fit"
            onTabClick={(tab) => setViewMode(tab as 'List' | 'Card')}
          />
        </div>

        {/* 필터군: Select 3개 + Search 3개 */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Select
              value={filters.year}
              onChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
              placeholder="강의년도"
              options={YEAR_OPTIONS}
              className="w-full"
            />
            <Select
              value={filters.semester}
              onChange={(value) => setFilters(prev => ({ ...prev, semester: value }))}
              placeholder="강의학기"
              options={SEMESTER_OPTIONS}
              className="w-full"
            />
            <Select
              value={filters.category}
              onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
              placeholder="이수구분"
              options={CATEGORY_OPTIONS}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <SearchInput
              key="professor-search-desktop"
              placeholder="교강사"
              value={searchQueries.professor}
              onChange={(value) => setSearchQueries(prev => ({ ...prev, professor: value }))}
            />
            <SearchInput
              key="subjectCode-search-desktop"
              placeholder="과목번호"
              value={searchQueries.subjectCode}
              onChange={(value) => setSearchQueries(prev => ({ ...prev, subjectCode: value }))}
            />
            <SearchInput
              key="department-search-desktop"
              placeholder="학부(과)/전공"
              value={searchQueries.department}
              onChange={(value) => setSearchQueries(prev => ({ ...prev, department: value }))}
            />
          </div>
        </div>

        {/* 콘텐츠: List 또는 Card */}
        {viewMode === 'List' ? (
          <div className="bg-white border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="border-t bg-beige">
                <TableRow className="[&>th]:text-center [&>th]:font-bold">
                  <TableHead>학년</TableHead>
                  <TableHead>과목번호</TableHead>
                  <TableHead>교과목명</TableHead>
                  <TableHead>학점</TableHead>
                  <TableHead>담당교수</TableHead>
                  <TableHead>강의실</TableHead>
                  <TableHead>수업시간</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&>tr]:hover:bg-gray-100">
                {COURSE_DATA.map((course, index) => (
                  <TableRow key={index} className="[&>td]:text-center cursor-pointer" onClick={() => goDetail(course.subjectCode)}>
                    <TableCell>{course.grade}</TableCell>
                    <TableCell>{course.subjectCode}</TableCell>
                    <TableCell>{course.subjectName}</TableCell>
                    <TableCell>{course.credit}</TableCell>
                    <TableCell>{course.professor}</TableCell>
                    <TableCell>{course.room}</TableCell>
                    <TableCell>{course.time || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {COURSE_DATA.map((course, index) => (
              <div key={index} onClick={() => goDetail(course.subjectCode)} className="cursor-pointer">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={MOCK_API_RESPONSE.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

const TimetablePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'List' | 'Card'>('List');
  const [filters, setFilters] = useState({
    year: '',
    semester: '',
    category: ''
  });
  const [searchQueries, setSearchQueries] = useState({
    professor: '',
    subjectCode: '',
    department: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Conditional rendering based on viewport
  return (
    <>
      <div className="md:hidden">
        <MobileView
          viewMode={viewMode}
          filters={filters}
          searchQueries={searchQueries}
          currentPage={currentPage}
          setViewMode={setViewMode}
          setFilters={setFilters}
          setSearchQueries={setSearchQueries}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="hidden md:block">
        <DesktopView
          viewMode={viewMode}
          filters={filters}
          searchQueries={searchQueries}
          currentPage={currentPage}
          setViewMode={setViewMode}
          setFilters={setFilters}
          setSearchQueries={setSearchQueries}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default TimetablePage;