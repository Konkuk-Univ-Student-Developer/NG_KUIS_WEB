import React, { useState } from 'react';
import { TopBar, Select, SearchInput, ViewToggle, Pagination, CourseCard } from '@/components/common';

// Course 데이터 타입 정의
interface CourseData {
  학년: string;
  과목번호: string;
  교과목명: string;
  학점: string;
  담당교수: string;
  강의실: string;
  시간: string;
  과목코드: string;
}

// 더미 데이터들
const YEAR_OPTIONS = ['2024학년도', '2025학년도'];
const SEMESTER_OPTIONS = ['1학기', '2학기'];
const DEPARTMENT_OPTIONS = ['전필', '전선', '반교', '선교', '지필', '지교', '일선', '교직', '전기', '기교', '핵교', '일교', '심교', '융필', '융선'];

const COURSE_DATA: CourseData[] = [
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

const TOTAL_PAGES = 10;

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
  selectedDepartment: string;
  searchQueries: {
    professor: string;
    courseCode: string;
    keyword: string;
  };
  currentPage: number;
  setViewMode: (mode: 'List' | 'Card') => void;
  setSelectedYear: (year: string) => void;
  setSelectedSemester: (semester: string) => void;
  setSelectedDepartment: (department: string) => void;
  setSearchQueries: React.Dispatch<React.SetStateAction<{
    professor: string;
    courseCode: string;
    keyword: string;
  }>>;
  setCurrentPage: (page: number) => void;
  yearOptions: string[];
  semesterOptions: string[];
  departmentOptions: string[];
  courseData: CourseData[];
  totalPages: number;
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

// 상태에 따라 업데이트되는 개별 핸들러 함수들
const updateProfessorQuery = (
  setSearchQueries: React.Dispatch<React.SetStateAction<{
    professor: string;
    courseCode: string;
    keyword: string;
  }>>
) => (value: string) => {
  setSearchQueries(prev => ({ ...prev, professor: value }));
};

const updateCourseCodeQuery = (
  setSearchQueries: React.Dispatch<React.SetStateAction<{
    professor: string;
    courseCode: string;
    keyword: string;
  }>>
) => (value: string) => {
  setSearchQueries(prev => ({ ...prev, courseCode: value }));
};

const updateKeywordQuery = (
  setSearchQueries: React.Dispatch<React.SetStateAction<{
    professor: string;
    courseCode: string;
    keyword: string;
  }>>
) => (value: string) => {
  setSearchQueries(prev => ({ ...prev, keyword: value }));
};

// MobileView 컴포넌트 분리
const MobileView: React.FC<MobileViewProps> = ({
  viewMode,
  selectedYear,
  selectedSemester,
  selectedDepartment,
  searchQueries,
  currentPage,
  setViewMode,
  setSelectedYear,
  setSelectedSemester,
  setSelectedDepartment,
  setSearchQueries,
  setCurrentPage,
  yearOptions,
  semesterOptions,
  departmentOptions,
  courseData,
  totalPages
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
          key="professor-search"
          className="flex-1"
          placeholder="교강사"
          value={searchQueries.professor}
          onChange={updateProfessorQuery(setSearchQueries)}
        />
        <SearchInput
          key="courseCode-search"
          className="flex-1"
          placeholder="과목번호"
          value={searchQueries.courseCode}
          onChange={updateCourseCodeQuery(setSearchQueries)}
        />
        <SearchInput
          key="keyword-search"
          className="flex-1"
          placeholder="학부(과)/전공"
          value={searchQueries.keyword}
          onChange={updateKeywordQuery(setSearchQueries)}
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
            <table className="w-full min-w-max text-center">
              <thead className="bg-beige">
                <tr>
                  <th className="px-4 py-3 text-mobile-small-bold text-black min-w-[20px] border-b border-lightgray">학년</th>
                  <th className="px-4 py-3 text-mobile-small-bold text-black min-w-[80px] border-b border-lightgray">과목번호</th>
                  <th className="px-4 py-3text-mobile-small-bold text-black min-w-[120px] border-b border-lightgray">교과목명</th>
                  <th className="px-4 py-3  text-mobile-small-bold text-black min-w-[60px] border-b border-lightgray">학점</th>
                  <th className="px-4 py-3  text-mobile-small-bold text-black min-w-[80px] border-b border-lightgray">담당교수</th>
                  <th className="px-4 py-3  text-mobile-small-bold text-black min-w-[80px] border-b border-lightgray">강의실</th>
                  <th className="px-4 py-3  text-mobile-small-bold text-black min-w-[140px] border-b border-lightgray">시간</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lightgray">
                {courseData.map((course, index) => (
                  <tr key={index} className="hover:bg-beige/50 transition-colors">
                    <td className="px-4 py-3 text-mobile-small text-darkgray min-w-[20px]">{course.학년}</td>
                    <td className="px-4 py-3 text-mobile-small text-darkgray min-w-[80px]">{course.과목번호}</td>
                    <td className="px-4 py-3 text-mobile-small text-black font-medium min-w-[120px]">{course.교과목명}</td>
                    <td className="px-4 py-3 text-mobile-small text-darkgray min-w-[60px]">{course.학점}</td>
                    <td className="px-4 py-3 text-mobile-small text-darkgray min-w-[80px]">{course.담당교수}</td>
                    <td className="px-4 py-3 text-mobile-small text-darkgray min-w-[80px]">{course.강의실}</td>
                    <td className="px-4 py-3 text-mobile-small text-darkgray min-w-[140px]">{course.시간}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  const [selectedDepartment, setSelectedDepartment] = useState('이수구분');
  const [searchQueries, setSearchQueries] = useState({
    professor: '',
    courseCode: '',
    keyword: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Conditional rendering based on viewport
  return (
    <>
      <div className="md:hidden">
        <MobileView
          viewMode={viewMode}
          selectedYear={selectedYear}
          selectedSemester={selectedSemester}
          selectedDepartment={selectedDepartment}
          searchQueries={searchQueries}
          currentPage={currentPage}
          setViewMode={setViewMode}
          setSelectedYear={setSelectedYear}
          setSelectedSemester={setSelectedSemester}
          setSelectedDepartment={setSelectedDepartment}
          setSearchQueries={setSearchQueries}
          setCurrentPage={setCurrentPage}
          yearOptions={YEAR_OPTIONS}
          semesterOptions={SEMESTER_OPTIONS}
          departmentOptions={DEPARTMENT_OPTIONS}
          courseData={COURSE_DATA}
          totalPages={TOTAL_PAGES}
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