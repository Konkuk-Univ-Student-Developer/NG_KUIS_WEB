import React from 'react';
import { TopBar } from '@/components/common';
import { Calendar, Clock, MapPin } from 'lucide-react';

const TimetablePage: React.FC = () => {
  const todayClasses = [
    {
      time: '09:00 - 10:30',
      name: '데이터베이스',
      location: '새천년관 1203호',
      professor: '김교수'
    },
    {
      time: '11:00 - 12:30',
      name: '운영체제',
      location: '공학관 A동 405호',
      professor: '이교수'
    },
    {
      time: '14:00 - 15:30',
      name: '알고리즘',
      location: '새천년관 1101호',
      professor: '박교수'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopBar
        isLoggedIn={false}
        onMenuClick={() => console.log('메뉴 클릭')}
        onLoginClick={() => console.log('로그인 클릭')}
      />
      
      <div className="px-5 py-[25px] space-y-6">
        <h1 className="text-darkgreen text-mobile-medium-bold">강의 시간표</h1>
        
        <div className="bg-beige rounded-[10px] p-5">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-darkgreen" />
            <h2 className="text-mobile-small-bold">오늘의 강의</h2>
          </div>
          
          <div className="space-y-3">
            {todayClasses.map((cls, index) => (
              <div key={index} className="bg-white rounded-[8px] p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-mobile-small-bold">{cls.name}</h3>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-darkgray" />
                    <span className="text-mobile-extrasmall text-darkgray">{cls.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-darkgray">
                  <MapPin className="w-4 h-4" />
                  <span className="text-mobile-extrasmall">{cls.location}</span>
                  <span className="text-mobile-extrasmall ml-2">· {cls.professor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button className="w-full bg-darkgreen text-white rounded-[10px] py-4 text-mobile-small-bold">
          전체 시간표 보기
        </button>
      </div>
    </div>
  );
};

export default TimetablePage;