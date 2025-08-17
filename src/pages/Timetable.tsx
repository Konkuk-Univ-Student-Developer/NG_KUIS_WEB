import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, CourseCard, TitleSection, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Tab, Select, SearchInput } from '@/components/commons';

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
    subjectCode: '',
    department: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const goDetail = (subjectCode: string) => navigate(subjectCode);

  return (
    <div className="min-h-screen bg-white md:mx-24">
      <div className="px-5 py-[25px] space-y-6 md:px-16 md:pt-[72px] md:pb-12">
        {/* Title */}
        <TitleSection title="종합강의시간표" icon={<></>} path="/quick-menu"
        />

        {/* Filters and Search - 모바일: 2줄, 데스크톱: 1줄 */}
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
          {/* Filter Dropdowns */}
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

          {/* Search Inputs */}
          <SearchInput
            key="professor-search"
            placeholder="교강사"
            value={searchQueries.professor}
            onChange={(value) => setSearchQueries(prev => ({ ...prev, professor: value }))}
          />
          <SearchInput
            key="subjectCode-search"
            placeholder="과목번호"
            value={searchQueries.subjectCode}
            onChange={(value) => setSearchQueries(prev => ({ ...prev, subjectCode: value }))}
          />
          <SearchInput
            key="department-search"
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
        <div className="md:px-16">
          <Table>
            <TableHeader className="border-t bg-beige">
              <TableRow className="[&>th]:text-center [&>th]:font-bold md:[&>th]:text-xl md:[&>th]:font-normal">
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
                <TableRow key={index} className="[&>td]:text-center md:[&>td]:text-base cursor-pointer" onClick={() => goDetail(course.subjectCode)}>
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
        /* Card View */
        <div className="px-5 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-[36px] justify-items-center">
            {COURSE_DATA.map((course, index) => (
              <div key={index} onClick={() => goDetail(course.subjectCode)} className="cursor-pointer w-full">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="px-5 py-6 md:px-16">
        <Pagination
          currentPage={currentPage}
          totalPages={MOCK_API_RESPONSE.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TimetablePage;