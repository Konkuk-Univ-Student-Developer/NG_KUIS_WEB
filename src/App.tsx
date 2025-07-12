import {
  Button,
  CourseCard,
  DataTable,
  SearchInput,
  QuickMenu,
  StatusBadge,
  Navigation,
  CustomTabs,
} from '@/components/common';
import { BookOpen, FileText, Calendar } from 'lucide-react';

function App() {
  // Sample data for demonstration
  const courseData = [
    {
      title: '2024년 2학기 컴퓨터 중급',
      instructor: '김교수',
      semester: '2024-2',
      credits: 3,
      code: 'CSE101',
      time: '월 1,2교시',
      isRequired: true,
    },
    {
      title: '웹 프로그래밍 기초',
      instructor: '이교수',
      semester: '2024-2',
      credits: 3,
      code: 'CSE102',
      time: '화 3,4교시',
      isRequired: false,
    },
  ];

  const tableData = [
    {
      번호: '1',
      과목명: '컴퓨터 중급',
      교수: '김교수',
      학점: '3',
      시간: '월 1,2교시',
      상태: 'active',
    },
    {
      번호: '2',
      과목명: '웹 프로그래밍',
      교수: '이교수',
      학점: '3',
      시간: '화 3,4교시',
      상태: 'pending',
    },
  ];

  const tableColumns = [
    { key: '번호', label: '번호' },
    { key: '과목명', label: '과목명' },
    { key: '교수', label: '교수' },
    { key: '학점', label: '학점' },
    { key: '시간', label: '시간' },
    {
      key: '상태',
      label: '상태',
      render: (value: unknown) => (
        <StatusBadge status={value as 'active' | 'pending'} />
      ),
    },
  ];

  const navigationItems = [
    {
      id: 'courses',
      label: '강의',
      icon: <BookOpen size={20} />,
      isActive: true,
    },
    {
      id: 'grades',
      label: '성적',
      icon: <FileText size={20} />,
    },
    {
      id: 'schedule',
      label: '시간표',
      icon: <Calendar size={20} />,
    },
  ];

  const quickMenuItems = [
    { label: '강의 등록', href: '/courses/register' },
    { label: '성적 조회', href: '/grades' },
    { label: '시간표 조회', href: '/schedule' },
    { label: '학사 일정', href: '/calendar' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <Navigation
        items={navigationItems}
        logo={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--darkgreen)] rounded-lg flex items-center justify-center">
              <span className="text-white mobile-extrasmall-bold">KU</span>
            </div>
            <span className="mobile-small-bold text-[var(--black)]">학개팀</span>
          </div>
        }
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="mobile-medium-bold text-[var(--black)] mb-2">
              학생 정보 시스템
            </h1>
            <p className="mobile-small-regular text-[var(--darkgray)]">
              강의 및 학사 정보를 확인하세요
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <SearchInput
              placeholder="강의명 또는 교수명으로 검색"
              className="max-w-md"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Button variant="darkgreen">강의 등록</Button>
            <Button variant="outline">성적 조회</Button>
            <Button variant="secondary">시간표 다운로드</Button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Cards */}
            <div className="lg:col-span-2">
              <h2 className="mobile-small-bold text-[var(--black)] mb-4">
                수강 중인 강의
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {courseData.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </div>

              {/* Data Table */}
              <h2 className="mobile-small-bold text-[var(--black)] mb-4">
                강의 목록
              </h2>
              <DataTable
                columns={tableColumns}
                data={tableData}
                className="mb-6"
              />
            </div>

            {/* Quick Menu */}
            <div>
              <QuickMenu
                title="QUICK MENU"
                items={quickMenuItems}
                className="mb-6"
              />

              {/* Status Examples */}
              <div className="bg-white p-4 rounded-lg border border-[var(--lightgray)]">
                <h3 className="mobile-small-bold text-[var(--black)] mb-3">
                  상태 예시
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status="active" />
                    <span className="mobile-extrasmall-regular text-[var(--darkgray)]">
                      활성 상태
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="pending" />
                    <span className="mobile-extrasmall-regular text-[var(--darkgray)]">
                      대기 상태
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="completed" />
                    <span className="mobile-extrasmall-regular text-[var(--darkgray)]">
                      완료 상태
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="error" />
                    <span className="mobile-extrasmall-regular text-[var(--darkgray)]">
                      오류 상태
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
