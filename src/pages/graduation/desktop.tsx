import React from 'react';
import { GraduationCap, Target, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const GraduationDesktop: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-darkgreen mb-8">졸업 시뮬레이션</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 졸업 진행률 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-darkgreen" />
                졸업 진행률
              </h2>
              <span className="text-2xl font-bold text-darkgreen">{percentage}%</span>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg">전체 이수 학점</span>
                <span className="text-lg font-medium">{totalCompleted} / {totalRequired}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-darkgreen h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-white text-sm font-medium">{percentage}%</span>
                </div>
              </div>
            </div>
            
            {/* 영역별 상세 */}
            <div className="space-y-4">
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
          
          {/* 졸업 요건 요약 */}
          <div className="space-y-6">
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

export default GraduationDesktop;