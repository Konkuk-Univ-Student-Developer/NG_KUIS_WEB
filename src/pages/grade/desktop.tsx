import React from 'react';
import { FileText, Calendar, TrendingUp, Download } from 'lucide-react';

const GradeDesktop: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-darkgreen mb-8">성적 조회</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 학기별 성적 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-3">
                <FileText className="w-6 h-6 text-darkgreen" />
                학기별 성적
              </h2>
              <button className="text-darkgreen hover:text-darkgreen/80 flex items-center gap-2">
                <Download className="w-5 h-5" />
                성적표 다운로드
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium">2024년 2학기</span>
                  <span className="text-darkgreen text-xl font-bold">4.2 / 4.5</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>신청학점: 18</div>
                  <div>취득학점: 18</div>
                  <div>평점: 4.2</div>
                  <div>백분위: 94.5</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium">2024년 1학기</span>
                  <span className="text-darkgreen text-xl font-bold">4.0 / 4.5</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>신청학점: 19</div>
                  <div>취득학점: 19</div>
                  <div>평점: 4.0</div>
                  <div>백분위: 92.3</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 전체 평점 요약 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-darkgreen" />
              전체 평점
            </h2>
            
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-darkgreen mb-2">4.1</p>
              <p className="text-gray-600">/ 4.5</p>
            </div>
            
            <div className="space-y-3 text-sm">
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

export default GradeDesktop;