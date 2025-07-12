import React from 'react';
import { TopBar } from '@/components/common';
import { GraduationCap, Target, AlertCircle } from 'lucide-react';

const GraduationPage: React.FC = () => {
  const requirements = [
    { category: '전공필수', required: 42, completed: 38, status: 'warning' },
    { category: '전공선택', required: 30, completed: 32, status: 'success' },
    { category: '교양필수', required: 24, completed: 24, status: 'success' },
    { category: '교양선택', required: 15, completed: 12, status: 'warning' },
    { category: '일반선택', required: 19, completed: 20, status: 'success' }
  ];

  const totalRequired = 130;
  const totalCompleted = 126;
  const percentage = Math.round((totalCompleted / totalRequired) * 100);

  return (
    <div className="min-h-screen bg-white">
      <TopBar
        isLoggedIn={false}
        onMenuClick={() => console.log('메뉴 클릭')}
        onLoginClick={() => console.log('로그인 클릭')}
      />
      
      <div className="px-5 py-[25px] space-y-6">
        <h1 className="text-darkgreen text-mobile-medium-bold">졸업 시뮬레이션</h1>
        
        <div className="bg-beige rounded-[10px] p-5">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-darkgreen" />
            <h2 className="text-mobile-small-bold">졸업 진행률</h2>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-mobile-small">전체 이수 학점</span>
              <span className="text-mobile-small-bold">{totalCompleted} / {totalRequired}</span>
            </div>
            <div className="w-full bg-lightgray rounded-full h-3">
              <div 
                className="bg-darkgreen h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-darkgreen text-mobile-small-bold mt-2 text-right">{percentage}%</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-mobile-small-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-darkgreen" />
            영역별 이수 현황
          </h2>
          
          {requirements.map((req, index) => (
            <div key={index} className="bg-lightgray rounded-[8px] p-4">
              <div className="flex justify-between items-center">
                <span className="text-mobile-small">{req.category}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-mobile-small-bold ${req.status === 'success' ? 'text-green' : 'text-orange'}`}>
                    {req.completed} / {req.required}
                  </span>
                  {req.status === 'warning' && (
                    <AlertCircle className="w-4 h-4 text-orange" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraduationPage;