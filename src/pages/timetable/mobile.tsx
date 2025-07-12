import React, { useState } from 'react';
import { TopBar, Select, SearchInput, ViewToggle, Pagination, CourseCard } from '@/components/common';

const TimetablePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'List' | 'Card'>('List');
  const [selectedYear, setSelectedYear] = useState('강의년도');
  const [selectedSemester, setSelectedSemester] = useState('강의학기');
  const [selectedDepartment, setSelectedDepartment] = useState('이수구분');
  const [searchQueries, setSearchQueries] = useState({
    professor: '',
    courseCode: '',
    keyword: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const yearOptions = [
    { value: '2024', label: '2024년도' },
    { value: '2025', label: '2025년도' }
  ];

  const semesterOptions = [
    { value: '1', label: '1학기' },
    { value: '2', label: '2학기' }
  ];

  const departmentOptions = [
    { value: 'general', label: '교양' },
    { value: 'major', label: '전공' },
    { value: 'elective', label: '선택' }
  ];

  const courseData = [
    {
      학년: '1',
      과목번호: '0312',
      교과목명: '이산수학',
      학점: '3',
      담당교수: '박소영',
      강의실: '새501',
      시간: '화 09-12 / 목 09-12',
      과목코드: 'COA&A8723'
    },
    {
      학년: '1',
      과목번호: '0312',
      교과목명: '이산수학',
      학점: '3',
      담당교수: '박소영',
      강의실: '새501',
      시간: '화 09-12 / 목 09-12',
      과목코드: 'COA&A8723'
    },
    {
      학년: '1',
      과목번호: '0312',
      교과목명: '이산수학',
      학점: '3',
      담당교수: '박소영',
      강의실: '새501',
      시간: '화 09-12 / 목 09-12',
      과목코드: 'COA&A8723'
    },
    {
      학년: '1',
      과목번호: '0312',
      교과목명: '이산수학',
      학점: '3',
      담당교수: '박소영',
      강의실: '새501',
      시간: '화 09-12 / 목 09-12',
      과목코드: 'COA&A8723'
    },
    {
      학년: '1',
      과목번호: '0312',
      교과목명: '이산수학',
      학점: '3',
      담당교수: '박소영',
      강의실: '새501',
      시간: '화 09-12 / 목 09-12',
      과목코드: 'COA&A8723'
    },
    {
      학년: '1',
      과목번호: '0312',
      교과목명: '이산수학',
      학점: '3',
      담당교수: '박소영',
      강의실: '새501',
      시간: '화 09-12 / 목 09-12',
      과목코드: 'COA&A8723'
    }
  ];

  const totalPages = 10;

  return (
    <div className="min-h-screen bg-white">
      <TopBar
        isLoggedIn={false}
        onMenuClick={() => console.log('메뉴 클릭')}
        onLoginClick={() => console.log('로그인 클릭')}
      />

      <div className="px-5 py-[25px] space-y-6">
        {/* Title */}
        <h1 className="text-darkgreen text-mobile-medium-bold">종합강의시간표</h1>

        {/* Filter Dropdowns */}
        <div className="flex gap-3">
          <Select
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="강의년도"
            options={yearOptions}
            className="flex-1"
          />
          <Select
            value={selectedSemester}
            onChange={setSelectedSemester}
            placeholder="강의학기"
            options={semesterOptions}
            className="flex-1"
          />
          <Select
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            placeholder="이수구분"
            options={departmentOptions}
            className="flex-1"
          />
        </div>

        {/* Search Inputs */}
        <div className="flex gap-3">
          <SearchInput
            placeholder="교강사"
            value={searchQueries.professor}
            onChange={(value) => setSearchQueries({ ...searchQueries, professor: value })}
            className="flex-1"
          />
          <SearchInput
            placeholder="과목번호"
            value={searchQueries.courseCode}
            onChange={(value) => setSearchQueries({ ...searchQueries, courseCode: value })}
            className="flex-1"
          />
          <SearchInput
            placeholder="학부(과)/전공"
            value={searchQueries.keyword}
            onChange={(value) => setSearchQueries({ ...searchQueries, keyword: value })}
            className="flex-1"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end">
          <ViewToggle
            value={viewMode}
            onChange={setViewMode}
          />
        </div>

        {/* Content - List or Card View */}
        {viewMode === 'List' ? (
          /* Table with horizontal scroll */
          <div className="bg-white rounded-[8px] border border-lightgray overflow-hidden">
            <div className="overflow-x-auto">
              {/* Table Header */}
              <div className="bg-beige px-4 py-3 border-b border-lightgray min-w-max">
                <div className="grid grid-cols-7 gap-4 text-mobile-small-bold text-darkgray">
                  <div className="min-w-[60px]">학년</div>
                  <div className="min-w-[80px]">과목번호</div>
                  <div className="min-w-[120px]">교과목명</div>
                  <div className="min-w-[60px]">학점</div>
                  <div className="min-w-[80px]">담당교수</div>
                  <div className="min-w-[80px]">강의실</div>
                  <div className="min-w-[140px]">시간</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-lightgray">
                {courseData.map((course, index) => (
                  <div key={index} className="px-4 py-3 hover:bg-beige/50 transition-colors min-w-max">
                    <div className="grid grid-cols-7 gap-4 text-mobile-small">
                      <div className="text-darkgray min-w-[60px]">{course.학년}</div>
                      <div className="text-darkgray min-w-[80px]">{course.과목번호}</div>
                      <div className="text-black font-medium min-w-[120px]">{course.교과목명}</div>
                      <div className="text-darkgray min-w-[60px]">{course.학점}</div>
                      <div className="text-darkgray min-w-[80px]">{course.담당교수}</div>
                      <div className="text-darkgray min-w-[80px]">{course.강의실}</div>
                      <div className="text-darkgray min-w-[140px]">{course.시간}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Card View */
          <div className="space-y-3">
            {courseData.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TimetablePage;