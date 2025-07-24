import React from 'react';
import { TopBar } from '@/components/common';
import { DollarSign, Award, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const ScholarshipPage: React.FC = () => {
  const currentScholarships = [
    {
      name: '성적우수장학금',
      amount: '2,500,000',
      status: '지급완료',
      semester: '2024-2',
      type: '교내'
    },
    {
      name: '근로장학금',
      amount: '800,000',
      status: '신청중',
      semester: '2024-2',
      type: '교내'
    },
    {
      name: '국가장학금 I유형',
      amount: '2,600,000',
      status: '지급완료',
      semester: '2024-2',
      type: '교외'
    }
  ];

  const availableScholarships = [
    {
      name: '건국가족장학금',
      deadline: 'D-7',
      amount: '등록금 50%',
      condition: '직계가족 재학생',
      type: '교내'
    },
    {
      name: '봉사장학금',
      deadline: 'D-14',
      amount: '1,000,000',
      condition: '봉사시간 60시간 이상',
      type: '교내'
    },
    {
      name: 'KU드림장학금',
      deadline: 'D-21',
      amount: '3,000,000',
      condition: '가계곤란 + 성적우수',
      type: '교내'
    }
  ];

  const scholarshipHistory = [
    { semester: '2024-2', total: 5900000 },
    { semester: '2024-1', total: 5200000 },
    { semester: '2023-2', total: 4800000 },
    { semester: '2023-1', total: 4500000 }
  ];

  const totalAmount = scholarshipHistory.reduce((sum, item) => sum + item.total, 0);

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
        <h1 className="text-darkgreen text-mobile-medium-bold md:text-3xl md:font-bold md:mb-8">장학 관리</h1>
        
        <div className="space-y-6 md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-6 md:space-y-0">
          {/* 현재 학기 장학금 */}
          <div className="space-y-6 md:lg:col-span-2">
            <div className="bg-beige rounded-[10px] p-5 md:bg-white md:rounded-lg md:shadow-sm md:p-6">
              <div className="flex items-center gap-3 mb-4 md:justify-between md:mb-6">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-darkgreen" />
                  <h2 className="text-mobile-small-bold md:text-xl md:font-semibold">
                    <span className="md:hidden">내 장학금 현황</span>
                    <span className="hidden md:inline">2024년 2학기 장학금 현황</span>
                  </h2>
                </div>
                <button className="hidden md:block text-darkgreen hover:text-darkgreen/80 text-sm font-medium">
                  장학증명서 발급
                </button>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {/* Mobile: Show only first 2 items */}
                {currentScholarships.slice(0, 2).map((scholarship, index) => (
                  <div key={index} className="bg-white rounded-[8px] p-4 md:hidden">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-mobile-small-bold">{scholarship.name}</h3>
                        <p className="text-mobile-extrasmall text-darkgray">{scholarship.semester}</p>
                      </div>
                      <span className={`text-mobile-extrasmall-bold px-2 py-1 rounded ${
                        scholarship.status === '지급완료' 
                          ? 'bg-green/20 text-green' 
                          : 'bg-orange/20 text-orange'
                      }`}>
                        {scholarship.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-darkgreen" />
                      <span className="text-darkgreen text-mobile-small-bold">₩{scholarship.amount}</span>
                    </div>
                  </div>
                ))}
                
                {/* Desktop: Show all items */}
                <div className="hidden md:block space-y-4">
                  {currentScholarships.map((scholarship, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{scholarship.name}</h3>
                          <span className="text-sm text-gray-600">{scholarship.type} · {scholarship.semester}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          scholarship.status === '지급완료' 
                            ? 'bg-green/20 text-green' 
                            : 'bg-orange/20 text-orange'
                        }`}>
                          {scholarship.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-darkgreen" />
                        <span className="text-xl font-bold text-darkgreen">₩{scholarship.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Total amount */}
              <div className="hidden md:block mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">이번 학기 총 장학금</span>
                  <span className="text-2xl font-bold text-darkgreen">₩5,900,000</span>
                </div>
              </div>
            </div>
            
            {/* 신청 가능 장학금 */}
            <div className="space-y-3 md:bg-white md:rounded-lg md:shadow-sm md:p-6">
              <h2 className="text-mobile-small-bold flex items-center gap-2 md:text-xl md:font-semibold md:gap-3 md:mb-6">
                <Clock className="w-5 h-5 text-darkgreen md:w-6 md:h-6" />
                신청 가능 장학금
              </h2>
              
              <div className="space-y-3 md:space-y-4">
                {/* Mobile: Show only first 2 items */}
                {availableScholarships.slice(0, 2).map((scholarship, index) => (
                  <div key={index} className="bg-lightgray rounded-[8px] p-4 md:hidden">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-mobile-small-bold">{scholarship.name}</h3>
                      <span className="text-danger text-mobile-extrasmall-bold">{scholarship.deadline}</span>
                    </div>
                    <p className="text-mobile-extrasmall text-darkgray mb-1">{scholarship.condition}</p>
                    <p className="text-darkgreen text-mobile-small">지원금액: {scholarship.amount}</p>
                  </div>
                ))}
                
                {/* Desktop: Show all items */}
                <div className="hidden md:block space-y-4">
                  {availableScholarships.map((scholarship, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:border-darkgreen transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{scholarship.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{scholarship.condition}</p>
                        </div>
                        <span className="text-danger font-bold">{scholarship.deadline}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-darkgreen font-medium">지원금액: {scholarship.amount}</span>
                        <button className="px-4 py-2 bg-darkgreen text-white rounded hover:bg-darkgreen/90 text-sm">
                          신청하기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop: 장학금 통계 & 자격 요건 */}
          <div className="hidden md:block space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-darkgreen" />
                장학금 수혜 현황
              </h2>
              
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-darkgreen">₩{totalAmount.toLocaleString()}</p>
                <p className="text-gray-600 text-sm mt-1">총 수혜 금액</p>
              </div>
              
              <div className="space-y-3">
                {scholarshipHistory.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{item.semester}</span>
                    <span className="font-medium">₩{item.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">장학금 자격 요건</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">직전학기 성적</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">4.2 / 4.5</span>
                    <CheckCircle className="w-4 h-4 text-green" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">이수학점</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">18학점</span>
                    <CheckCircle className="w-4 h-4 text-green" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">봉사시간</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">45시간</span>
                    <AlertCircle className="w-4 h-4 text-orange" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile: Apply button */}
        <button className="w-full bg-darkgreen text-white rounded-[10px] py-4 text-mobile-small-bold md:hidden">
          장학금 신청하기
        </button>
      </div>
    </div>
  );
};

export default ScholarshipPage;