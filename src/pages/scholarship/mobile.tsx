import React from 'react';
import { TopBar } from '@/components/common';
import { DollarSign, Award, Clock, CheckCircle } from 'lucide-react';

const ScholarshipPage: React.FC = () => {
  const currentScholarships = [
    {
      name: '성적우수장학금',
      amount: '2,500,000',
      status: '지급완료',
      semester: '2024-2'
    },
    {
      name: '근로장학금',
      amount: '800,000',
      status: '신청중',
      semester: '2024-2'
    }
  ];

  const availableScholarships = [
    {
      name: '건국가족장학금',
      deadline: 'D-7',
      amount: '등록금 50%',
      condition: '직계가족 재학생'
    },
    {
      name: '봉사장학금',
      deadline: 'D-14',
      amount: '1,000,000',
      condition: '봉사시간 60시간 이상'
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
        <h1 className="text-darkgreen text-mobile-medium-bold">장학 관리</h1>
        
        <div className="bg-beige rounded-[10px] p-5">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-darkgreen" />
            <h2 className="text-mobile-small-bold">내 장학금 현황</h2>
          </div>
          
          <div className="space-y-3">
            {currentScholarships.map((scholarship, index) => (
              <div key={index} className="bg-white rounded-[8px] p-4">
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
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-mobile-small-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-darkgreen" />
            신청 가능 장학금
          </h2>
          
          {availableScholarships.map((scholarship, index) => (
            <div key={index} className="bg-lightgray rounded-[8px] p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-mobile-small-bold">{scholarship.name}</h3>
                <span className="text-danger text-mobile-extrasmall-bold">{scholarship.deadline}</span>
              </div>
              <p className="text-mobile-extrasmall text-darkgray mb-1">{scholarship.condition}</p>
              <p className="text-darkgreen text-mobile-small">지원금액: {scholarship.amount}</p>
            </div>
          ))}
        </div>
        
        <button className="w-full bg-darkgreen text-white rounded-[10px] py-4 text-mobile-small-bold">
          장학금 신청하기
        </button>
      </div>
    </div>
  );
};

export default ScholarshipPage;