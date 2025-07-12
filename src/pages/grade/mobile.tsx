import React from 'react';
import { TopBar } from '@/components/common';
import { FileText, Calendar, TrendingUp } from 'lucide-react';

const GradePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar
        isLoggedIn={false}
        onMenuClick={() => console.log('메뉴 클릭')}
        onLoginClick={() => console.log('로그인 클릭')}
      />
      
      <div className="px-5 py-[25px] space-y-6">
        <h1 className="text-darkgreen text-mobile-medium-bold">성적 조회</h1>
        
        <div className="bg-beige rounded-[10px] p-5">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-darkgreen" />
            <h2 className="text-mobile-small-bold">학기별 성적</h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white rounded-[8px] p-4">
              <div className="flex justify-between items-center">
                <span className="text-mobile-small">2024년 2학기</span>
                <span className="text-darkgreen text-mobile-small-bold">4.2 / 4.5</span>
              </div>
            </div>
            
            <div className="bg-white rounded-[8px] p-4">
              <div className="flex justify-between items-center">
                <span className="text-mobile-small">2024년 1학기</span>
                <span className="text-darkgreen text-mobile-small-bold">4.0 / 4.5</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-lightgray rounded-[10px] p-5">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-darkgreen" />
            <h2 className="text-mobile-small-bold">전체 평점</h2>
          </div>
          
          <div className="text-center">
            <p className="text-darkgreen text-[36px] font-bold">4.1</p>
            <p className="text-darkgray text-mobile-small">/ 4.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradePage;