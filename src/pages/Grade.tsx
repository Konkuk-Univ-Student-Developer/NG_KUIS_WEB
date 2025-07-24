import React from 'react';
import { TopBar } from '@/components/common';
import { FileText, TrendingUp, Download } from 'lucide-react';

const GradePage: React.FC = () => {
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
        <h1 className="text-darkgreen text-mobile-medium-bold md:text-3xl md:font-bold md:mb-8">성적 조회</h1>
        
        <div className="space-y-6 md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-6 md:space-y-0">
          {/* 학기별 성적 */}
          <div className="bg-beige rounded-[10px] p-5 md:lg:col-span-2 md:bg-white md:rounded-lg md:shadow-sm md:p-6">
            <div className="flex items-center gap-3 mb-4 md:justify-between md:mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-darkgreen" />
                <h2 className="text-mobile-small-bold md:text-xl md:font-semibold">학기별 성적</h2>
              </div>
              {/* Download button - Desktop only */}
              <button className="hidden md:flex text-darkgreen hover:text-darkgreen/80 items-center gap-2">
                <Download className="w-5 h-5" />
                성적표 다운로드
              </button>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white rounded-[8px] p-4 md:border md:rounded-lg md:hover:bg-gray-50 md:transition-colors">
                <div className="flex justify-between items-center md:mb-3">
                  <span className="text-mobile-small md:text-lg md:font-medium">2024년 2학기</span>
                  <span className="text-darkgreen text-mobile-small-bold md:text-xl md:font-bold">4.2 / 4.5</span>
                </div>
                {/* Desktop only - Additional info */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:text-sm md:text-gray-600">
                  <div>신청학점: 18</div>
                  <div>취득학점: 18</div>
                  <div>평점: 4.2</div>
                  <div>백분위: 94.5</div>
                </div>
              </div>
              
              <div className="bg-white rounded-[8px] p-4 md:border md:rounded-lg md:hover:bg-gray-50 md:transition-colors">
                <div className="flex justify-between items-center md:mb-3">
                  <span className="text-mobile-small md:text-lg md:font-medium">2024년 1학기</span>
                  <span className="text-darkgreen text-mobile-small-bold md:text-xl md:font-bold">4.0 / 4.5</span>
                </div>
                {/* Desktop only - Additional info */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:text-sm md:text-gray-600">
                  <div>신청학점: 19</div>
                  <div>취득학점: 19</div>
                  <div>평점: 4.0</div>
                  <div>백분위: 92.3</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 전체 평점 */}
          <div className="bg-lightgray rounded-[10px] p-5 md:bg-white md:rounded-lg md:shadow-sm md:p-6">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <TrendingUp className="w-6 h-6 text-darkgreen" />
              <h2 className="text-mobile-small-bold md:text-xl md:font-semibold">전체 평점</h2>
            </div>
            
            <div className="text-center md:mb-6">
              <p className="text-darkgreen text-[36px] font-bold md:text-5xl md:mb-2">4.1</p>
              <p className="text-darkgray text-mobile-small md:text-gray-600 md:text-base">/ 4.5</p>
            </div>
            
            {/* Desktop only - Additional stats */}
            <div className="hidden md:block md:space-y-3 md:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">총 이수학점</span>
                <span className="font-medium">126 / 130</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">전공 평점</span>
                <span className="font-medium">4.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">교양 평점</span>
                <span className="font-medium">3.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradePage;