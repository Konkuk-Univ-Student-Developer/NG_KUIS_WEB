import React from 'react';
import { DollarSign, Award, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const ScholarshipDesktop: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-darkgreen mb-8">장학 관리</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 현재 학기 장학금 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <Award className="w-6 h-6 text-darkgreen" />
                  2024년 2학기 장학금 현황
                </h2>
                <button className="text-darkgreen hover:text-darkgreen/80 text-sm font-medium">
                  장학증명서 발급
                </button>
              </div>
              
              <div className="space-y-4">
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
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">이번 학기 총 장학금</span>
                  <span className="text-2xl font-bold text-darkgreen">₩5,900,000</span>
                </div>
              </div>
            </div>
            
            {/* 신청 가능 장학금 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-darkgreen" />
                신청 가능 장학금
              </h2>
              
              <div className="space-y-4">
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
          
          {/* 장학금 통계 */}
          <div className="space-y-6">
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
      </div>
    </div>
  );
};

export default ScholarshipDesktop;