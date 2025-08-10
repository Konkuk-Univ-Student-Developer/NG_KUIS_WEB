import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, CourseCard } from '@/components/commons';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, ViewToggle, Select, SearchInput } from '@/components/commons';
import type { CourseData, ApiResponse } from '@/constants/TimetableConstants';
import {
  YEAR_OPTIONS,
  SEMESTER_OPTIONS,
  CATEGORY_OPTIONS,
  COURSE_DATA,
  MOCK_API_RESPONSE,
  DAYS,
  TIMES,
  SCHEDULE,
  COURSE_LIST
} from '@/constants/TimetableConstants';

// Props 타입 정의
interface MobileViewProps {
  viewMode: 'List' | 'Card';
  selectedYear: string;
  selectedSemester: string;
  selectedCategory: string;
  searchQueries: {
    professor: string;
    subjectCode: string;
    subjectName: string;
    department: string;
  };
  currentPage: number;
  setViewMode: (mode: 'List' | 'Card') => void;
  setSelectedYear: (year: string) => void;
  setSelectedSemester: (semester: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQueries: React.Dispatch<React.SetStateAction<{
    professor: string;
    subjectCode: string;
    subjectName: string;
    department: string;
  }>>;
  setCurrentPage: (page: number) => void;
  yearOptions: string[];
  semesterOptions: string[];
  categoryOptions: string[];
  courseData: CourseData[];
  apiResponse: ApiResponse;
}

interface DesktopViewProps {
  days: string[];
  times: string[];
  schedule: Record<string, Array<{
    time: string;
    name: string;
    location: string;
    professor: string;
    color: string;
  }>>;
}



interface DesktopViewProps {
  days: string[];
  times: string[];
  schedule: Record<string, Array<{
    time: string;
    name: string;
    location: string;
    professor: string;
    color: string;
  }>>;
}

// MobileView 컴포넌트 분리
const MobileView: React.FC<MobileViewProps> = ({
  viewMode,
  selectedYear,
  selectedSemester,
  selectedCategory,
  searchQueries,
  currentPage,
  setViewMode,
  setSelectedYear,
  setSelectedSemester,
  setSelectedCategory,
  setSearchQueries,
  setCurrentPage,
  yearOptions,
  semesterOptions,
  categoryOptions,
  courseData,
  apiResponse
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
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="이수구분"
            options={categoryOptions}
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
          <ViewToggle
            value={viewMode}
            onChange={setViewMode}
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
            {courseData.map((course, index) => (
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
          {courseData.map((course, index) => (
            <div key={index} onClick={() => goDetail(course.subjectCode)} className="cursor-pointer">
              <CourseCard course={{
                학년: course.grade.toString(),
                과목번호: course.subjectCode,
                교과목명: course.subjectName,
                학점: course.credit.toString(),
                담당교수: course.professor,
                강의실: course.room,
                시간: course.time,
                이수구분: course.category,
                학과: course.department,
                평가: course.evaluation
              }} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="px-5 py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={apiResponse.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
};

// DesktopView 컴포넌트 분리
const DesktopView: React.FC<DesktopViewProps> = ({ days, times, schedule }) => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-darkgreen">강의 시간표</h1>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option>2024년 2학기</option>
            <option>2024년 1학기</option>
          </select>
          <button className="px-4 py-2 bg-darkgreen text-white rounded-lg hover:bg-darkgreen/90">
            시간표 내보내기
          </button>
        </div>
      </div>

      {/* 시간표 그리드 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 border-b">
          <div className="p-4 bg-gray-50"></div>
          {days.map(day => (
            <div key={day} className="p-4 text-center font-semibold border-l">
              {day}
            </div>
          ))}
        </div>

        {times.map(time => (
          <div key={time} className="grid grid-cols-6 border-b">
            <div className="p-4 bg-gray-50 text-sm text-gray-600">
              {time}
            </div>
            {days.map(day => (
              <div key={`${day}-${time}`} className="p-2 border-l min-h-[80px] relative">
                {schedule[day]?.map((cls, idx) => {
                  if (cls.time.startsWith(time)) {
                    return (
                      <div
                        key={idx}
                        className={`absolute inset-2 p-2 rounded border-2 ${cls.color}`}
                        style={{
                          height: cls.time.includes('17:00') ? '160px' : '120px',
                          zIndex: 10
                        }}
                      >
                        <p className="font-semibold text-sm">{cls.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{cls.location}</p>
                        <p className="text-xs text-gray-600">{cls.professor}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 수업 상세 정보 */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">수강 과목 목록</h2>
          <div className="space-y-3">
            {COURSE_LIST.map((course, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium">{course.name} ({course.code})</p>
                  <p className="text-sm text-gray-600">{course.time} · {course.professor}</p>
                </div>
                <span className="text-sm font-medium">{course.credit}학점</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">학점 요약</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">총 신청학점</span>
              <span className="font-medium">12학점</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">전공</span>
              <span className="font-medium">12학점</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">교양</span>
              <span className="font-medium">0학점</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TimetablePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'List' | 'Card'>('List');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQueries, setSearchQueries] = useState({
    professor: '',
    subjectCode: '',
    subjectName: '',
    department: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Conditional rendering based on viewport
  return (
    <>
      <div className="md:hidden select-none">
        <MobileView
          viewMode={viewMode}
          selectedYear={selectedYear}
          selectedSemester={selectedSemester}
          selectedCategory={selectedCategory}
          searchQueries={searchQueries}
          currentPage={currentPage}
          setViewMode={setViewMode}
          setSelectedYear={setSelectedYear}
          setSelectedSemester={setSelectedSemester}
          setSelectedCategory={setSelectedCategory}
          setSearchQueries={setSearchQueries}
          setCurrentPage={setCurrentPage}
          yearOptions={YEAR_OPTIONS}
          semesterOptions={SEMESTER_OPTIONS}
          categoryOptions={CATEGORY_OPTIONS}
          courseData={COURSE_DATA}
          apiResponse={MOCK_API_RESPONSE}
        />
      </div>
      <div className="hidden md:block">
        <DesktopView
          days={DAYS}
          times={TIMES}
          schedule={SCHEDULE}
        />
      </div>
    </>
  );
};

export default TimetablePage;