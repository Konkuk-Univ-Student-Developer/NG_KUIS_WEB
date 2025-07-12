import React from 'react';
import {
  GraduationCap,
  Calendar,
  School,
  Search,
  Edit3,
  ZoomIn,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TopBar } from '@/components/common';

const HomePage: React.FC = () => {
  const quickMenuItems = [
    {
      icon: <GraduationCap className="w-6 h-6 text-darkgreen" />,
      label: '성적 조회',
      path: '/grades'
    },
    {
      icon: <Calendar className="w-6 h-6 text-darkgreen" />,
      label: '강의 시간표',
      path: '/timetable'
    },
    {
      icon: <School className="w-6 h-6 text-darkgreen" />,
      label: '졸업 시뮬',
      path: '/graduation'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-darkgreen" />,
      label: '장학 관리',
      path: '/scholarship'
    },
  ];

  const schoolLifeItems = [
    { title: '2학기 수강신청 시작', date: 'D-3' },
    { title: '2025학년도 학위수여식', date: '26.02.' },
    { title: '2학기 수강신청 시작', date: 'D-3' },
  ];

  const noticeItems = [
    '2025년 2학기 조기 졸업 신청 안내',
    '2025년 2학기 조기 졸업 신청 안내',
    '2025년 2학기 조기 졸업 신청 안내',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* TopBar */}
      <TopBar
        isLoggedIn={false}
        onMenuClick={() => console.log('메뉴 클릭')}
        onLoginClick={() => console.log('로그인 클릭')}
      />

      {/* Main Content */}
      <div className="px-5 py-[25px] space-y-8">
        {/* Section 1: Welcome & Search */}
        <div className="space-y-[15px]">
          {/* Title Section */}
          <div className="bg-white px-[3px] h-[50px] flex items-center">
            <div className="text-mobile-medium text-black leading-[1.4] tracking-[-0.36px]">
              <span className="text-darkgreen font-bold">로그인</span>
              <span>이</span>
              <br />
              <span>필요합니다.</span>
            </div>
          </div>

          {/* Search */}
          <div className="bg-beige rounded-[15px] h-11 flex items-center px-4">
            <div className="flex-1 text-darkgray text-mobile-small tracking-[-0.28px]">
              이번 학기 성적 확인하기
            </div>
            <Search className="w-6 h-6 text-darkgray" />
          </div>
        </div>

        {/* Section 3: Quick Menu */}
        <div className="space-y-[19px]">
          {/* Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-darkgreen text-mobile-medium-bold leading-[1.4] tracking-[-0.36px]">
              QUICK MENU
            </h2>
            <Edit3 className="w-6 h-6 text-darkgray" />
          </div>

          {/* Menu Grid */}
          <div className="flex justify-between">
            {quickMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="bg-beige w-[79px] h-[74px] rounded-[10px] flex flex-col items-center justify-center px-1 hover:bg-lightgray transition-colors"
              >
                <div className="mb-1">
                  {item.icon}
                </div>
                <span className="text-black text-mobile-small-bold text-center leading-[1.2] tracking-[-0.32px] whitespace-pre-line">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2: 건국생활 한눈에 보기 */}
        <div className="space-y-[19px]">
          {/* Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-darkgreen text-mobile-medium-bold leading-[1.4] tracking-[-0.36px]">
              건국생활 한눈에 보기
            </h2>
            <ZoomIn className="w-6 h-6 text-darkgray" />
          </div>

          {/* List */}
          <div className="bg-beige rounded-[10px] px-[22px] py-[19px]">
            <div className="space-y-4">
              {schoolLifeItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-black text-mobile-small tracking-[-0.28px] leading-[1.2]">
                    {item.title}
                  </span>
                  <span className="text-darkgreen text-mobile-small-bold tracking-[-0.32px] leading-[1.2]">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: 공지사항 */}
        <div className="space-y-[19px]">
          {/* Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-darkgreen text-mobile-medium-bold leading-[1.4] tracking-[-0.36px]">
              공지사항
            </h2>
            <ArrowRight className="w-6 h-6 text-darkgray" />
          </div>

          {/* Notice List */}
          <div className="space-y-1">
            {noticeItems.map((item, index) => (
              <div
                key={index}
                className="h-[30px] flex items-center border-b border-darkgray/20 last:border-b-0"
              >
                <span className="text-black text-mobile-small tracking-[-0.28px] leading-[1.2]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
