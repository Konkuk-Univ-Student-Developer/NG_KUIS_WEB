import React from 'react';
import { Bell, GraduationCap, BookOpen, Calculator, DollarSign, Search } from 'lucide-react';

const HomePage: React.FC = () => {
  const quickMenuItems = [
    { icon: <GraduationCap className="w-6 h-6" />, label: '성적조회', onClick: () => console.log('성적조회') },
    { icon: <BookOpen className="w-6 h-6" />, label: '강의시간표', onClick: () => console.log('강의시간표') },
    { icon: <Calculator className="w-6 h-6" />, label: '졸업시뮬', onClick: () => console.log('졸업시뮬') },
    { icon: <DollarSign className="w-6 h-6" />, label: '장학관리', onClick: () => console.log('장학관리') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-desktop-small font-bold">9:41</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-desktop-small font-bold">Konkuk University</div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-black rounded-full"></div>
              <div className="w-4 h-4 bg-black rounded-full"></div>
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => console.log('검색:', e.target.value)}
          />
        </div>

        {/* Quick Menu */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-mobile-medium font-bold mb-4">QUICK MENU</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {item.icon}
                <span className="text-mobile-small mt-2">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Cards */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-mobile-medium font-bold">알림</h2>
            <Bell className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <span className="text-mobile-small-bold">수강신청 안내</span>
                <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">신규</span>
              </div>
              <p className="text-mobile-small text-gray-600 mt-1">
                2024년 1학기 수강신청이 시작되었습니다.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <span className="text-mobile-small-bold">장학금 지급</span>
                <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">완료</span>
              </div>
              <p className="text-mobile-small text-gray-600 mt-1">
                성적우수장학금이 지급되었습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 공지사항 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-mobile-medium font-bold mb-4">공지사항</h2>
          <div className="space-y-3">
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-mobile-small-bold">학사일정 안내</span>
                <span className="text-mobile-small text-gray-500">2024.01.15</span>
              </div>
              <p className="text-mobile-small text-gray-600 mt-1">
                2024년 1학기 학사일정을 안내드립니다.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-mobile-small-bold">기말고사 시행</span>
                <span className="text-mobile-small text-gray-500">2024.01.12</span>
              </div>
              <p className="text-mobile-small text-gray-600 mt-1">
                기말고사 시행 안내 및 주의사항을 확인하세요.
              </p>
            </div>
            <div className="pb-3">
              <div className="flex items-center justify-between">
                <span className="text-mobile-small-bold">휴학 신청 안내</span>
                <span className="text-mobile-small text-gray-500">2024.01.10</span>
              </div>
              <p className="text-mobile-small text-gray-600 mt-1">
                휴학 신청 기간 및 절차를 안내드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
