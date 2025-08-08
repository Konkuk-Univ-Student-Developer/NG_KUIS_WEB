import React, { useState } from 'react';
import { TopBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SearchInput, ViewToggle, Pagination, CourseCard } from '@/components/common';

// Course 데이터 타입 정의 (API 응답 형태에 맞춤)
interface CourseData {
  grade: number;
  subjectCode: string;
  subjectName: string;
  credit: number;
  professor: string;
  room: string;
  time?: string;
}

// API 응답 타입 정의
interface ApiResponse {
  content: CourseData[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 더미 데이터들
const YEAR_OPTIONS = ['2024', '2025'];
const SEMESTER_OPTIONS = ['1학기', '2학기', '하계 계절학기', '동계 계절학기'];
const CATEGORY_OPTIONS = ['전필', '전선', '반교', '선교', '지필', '지교', '일선', '교직', '전기', '기교', '핵교', '일교', '심교', '융필', '융선'];

const COURSE_DATA: CourseData[] = [
  {
    grade: 1,
    subjectCode: '0312',
    subjectName: '이산수학',
    credit: 3,
    professor: '박소영',
    room: '새501',
    time: '화 09-12 / 목 09-12'
  },
  {
    grade: 2,
    subjectCode: '0201',
    subjectName: '자료구조',
    credit: 3,
    professor: '김철수',
    room: '새502',
    time: '월 10-12 / 수 10-12'
  },
  {
    grade: 3,
    subjectCode: '0305',
    subjectName: '데이터베이스',
    credit: 3,
    professor: '이영희',
    room: '새503',
    time: '월 14-16 / 수 14-16'
  },
  {
    grade: 2,
    subjectCode: '0220',
    subjectName: '운영체제',
    credit: 3,
    professor: '박민수',
    room: '새504',
    time: '화 14-16 / 목 14-16'
  },
  {
    grade: 3,
    subjectCode: '0315',
    subjectName: '알고리즘',
    credit: 3,
    professor: '정수현',
    room: '새505',
    time: '월 16-18 / 수 16-18'
  },
  {
    grade: 4,
    subjectCode: '0401',
    subjectName: '캡스톤디자인',
    credit: 3,
    professor: '최교수',
    room: '새506',
    time: '목 16-19'
  }
];

// 더미 API 응답 데이터
const MOCK_API_RESPONSE: ApiResponse = {
  content: COURSE_DATA,
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    offset: 0
  },
  totalPages: 10,
  totalElements: 100,
  first: true,
  last: false,
  empty: false
};

// Desktop timetable data
const DAYS = ['월', '화', '수', '목', '금'];
const TIMES = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const SCHEDULE: Record<string, Array<{ time: string; name: string; location: string; professor: string; color: string; }>> = {
  월: [
    { time: '9:00-10:30', name: '데이터베이스', location: '새천년관 1203호', professor: '김교수', color: 'bg-blue-100 border-blue-300' },
    { time: '14:00-15:30', name: '알고리즘', location: '새천년관 1101호', professor: '박교수', color: 'bg-green-100 border-green-300' }
  ],
  화: [
    { time: '11:00-12:30', name: '운영체제', location: '공학관 A동 405호', professor: '이교수', color: 'bg-purple-100 border-purple-300' }
  ],
  수: [
    { time: '9:00-10:30', name: '데이터베이스', location: '새천년관 1203호', professor: '김교수', color: 'bg-blue-100 border-blue-300' },
    { time: '14:00-15:30', name: '알고리즘', location: '새천년관 1101호', professor: '박교수', color: 'bg-green-100 border-green-300' }
  ],
  목: [
    { time: '11:00-12:30', name: '운영체제', location: '공학관 A동 405호', professor: '이교수', color: 'bg-purple-100 border-purple-300' },
    { time: '15:00-17:00', name: '캡스톤디자인', location: '새천년관 2301호', professor: '최교수', color: 'bg-orange-100 border-orange-300' }
  ],
  금: []
};

const COURSE_LIST = [
  { name: '데이터베이스', code: 'CS301', credit: 3, professor: '김교수', time: '월,수 09:00-10:30' },
  { name: '운영체제', code: 'CS302', credit: 3, professor: '이교수', time: '화,목 11:00-12:30' },
  { name: '알고리즘', code: 'CS303', credit: 3, professor: '박교수', time: '월,수 14:00-15:30' },
  { name: '캡스톤디자인', code: 'CS401', credit: 3, professor: '최교수', time: '목 15:00-17:00' }
];

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
}) => (
  <div className="min-h-screen bg-white">
    <TopBar
      isLoggedIn={false}
      onMenuClick={() => console.log('메뉴 클릭')}
      onLoginClick={() => console.log('로그인 클릭')}
    />

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
          className="flex-1 overflow-hidden"
        />
        <Select
          value={selectedSemester}
          onChange={setSelectedSemester}
          placeholder="강의학기"
          options={semesterOptions}
          className="flex-1 overflow-hidden"
        />
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="이수구분"
          options={categoryOptions}
          className="flex-1 overflow-hidden"
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
        <TableHeader className="border-t outline-1 outline-zinc-400 bg-beige">
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
            <TableRow key={index} className="[&>td]:text-center">
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
          <CourseCard key={index} course={{
            학년: course.grade.toString(),
            과목번호: course.subjectCode,
            교과목명: course.subjectName,
            학점: course.credit.toString(),
            담당교수: course.professor,
            강의실: course.room,
            시간: course.time
          }} />
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
);

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
  const [selectedYear, setSelectedYear] = useState('강의년도');
  const [selectedSemester, setSelectedSemester] = useState('강의학기');
  const [selectedCategory, setSelectedCategory] = useState('이수구분');
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