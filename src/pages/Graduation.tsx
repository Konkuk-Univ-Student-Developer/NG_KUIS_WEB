import React from 'react';
import { TopBar } from '@/components/common';
import { GraduationCap, Target, AlertCircle, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-white md:bg-gray-50">
      {/* Mobile TopBar */}
      <div className="md:hidden">
        <TopBar
          isLoggedIn={false}
          onMenuClick={() => console.log('메뉴 클릭')}
          onLoginClick={() => console.log('로그인 클릭')}
        />
      </div>
      
      <div className="px-5 py-[25px] space-y-6 md:p-8 md:max-w-7xl md:mx-auto">
        <h1 className="text-darkgreen text-mobile-medium-bold md:text-3xl md:font-bold md:mb-8">졸업 시뮬레이션</h1>
        
        <div className="space-y-6 md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-6 md:space-y-0">
          {/* 졸업 진행률 */}
          <div className="bg-beige rounded-[10px] p-5 md:lg:col-span-2 md:bg-white md:rounded-lg md:shadow-sm md:p-6">
            <div className="flex items-center gap-3 mb-4 md:justify-between md:mb-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-darkgreen" />
                <h2 className="text-mobile-small-bold md:text-xl md:font-semibold">졸업 진행률</h2>
              </div>
              <span className="hidden md:block text-2xl font-bold text-darkgreen">{percentage}%</span>
            </div>
            
            <div className="mb-4 md:mb-8">
              <div className="flex justify-between items-center mb-2 md:mb-3">
                <span className="text-mobile-small md:text-lg">전체 이수 학점</span>
                <span className="text-mobile-small-bold md:text-lg md:font-medium">{totalCompleted} / {totalRequired}</span>
              </div>
              <div className="w-full bg-lightgray rounded-full h-3 md:bg-gray-200 md:h-6">
                <div 
                  className="bg-darkgreen h-3 rounded-full transition-all duration-300 md:h-6 md:flex md:items-center md:justify-end md:pr-3"
                  style={{ width: `${percentage}%` }}
                >
                  <span className="hidden md:inline text-white text-sm font-medium">{percentage}%</span>
                </div>
              </div>
              <p className="text-darkgreen text-mobile-small-bold mt-2 text-right md:hidden">{percentage}%</p>
            </div>
            
            {/* Desktop: 영역별 상세 */}
            <div className="hidden md:block space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-lg">{req.category}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-semibold ${req.status === 'success' ? 'text-green' : 'text-orange'}`}>
                        {req.completed} / {req.required}
                      </span>
                      {req.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange" />
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        req.status === 'success' ? 'bg-green' : 'bg-orange'
                      }`}
                      style={{ width: `${Math.min((req.completed / req.required) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile: 영역별 이수 현황 */}
          <div className="space-y-3 md:hidden">
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
          
          {/* Desktop: 졸업 요건 요약 & 추가 요건 */}
          <div className="hidden md:block space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">졸업 요건 요약</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">최소 이수학점</span>
                  <span className="font-medium">130학점</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">현재 이수학점</span>
                  <span className="font-medium text-darkgreen">{totalCompleted}학점</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">잔여 학점</span>
                  <span className="font-medium text-orange">{totalRequired - totalCompleted}학점</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-600">예상 졸업시기</span>
                  <span className="font-medium">2025년 2월</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">추가 졸업요건</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">영어 졸업인증</span>
                  <CheckCircle className="w-5 h-5 text-green" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">졸업논문/프로젝트</span>
                  <AlertCircle className="w-5 h-5 text-orange" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">봉사활동 (30시간)</span>
                  <CheckCircle className="w-5 h-5 text-green" />
                </div>
              </div>
            </div>
            
            <button className="w-full bg-darkgreen text-white py-3 rounded-lg hover:bg-darkgreen/90 font-medium">
              상세 졸업요건 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduationPage;