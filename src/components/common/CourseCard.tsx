import React from 'react';
import { ExternalLink } from 'lucide-react';

interface CourseCardProps {
  course: {
    학년: string;
    과목번호: string;
    교과목명: string;
    학점: string;
    담당교수: string;
    강의실: string;
    시간?: string;
    과목코드?: string;
  };
  onEnroll?: () => void;
  onAddToWishlist?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll = () => console.log('전선 클릭'),
  onAddToWishlist = () => console.log('3학점 클릭')
}) => {
  return (
    <div className="bg-beige rounded-[10px] p-4 mb-3">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="text-darkgray text-mobile-extrasmall mb-1">
            {course.과목코드 || 'COA&A8723'}
          </div>
          <h3 className="text-black text-mobile-small-bold leading-tight mb-1">
            분산시스템및컴퓨팅
          </h3>
          <div className="text-darkgray text-mobile-small">
            {course.담당교수}
          </div>
        </div>
        <div className="flex gap-2 ml-3">
          <button
            onClick={onEnroll}
            className="bg-darkgreen text-white px-3 py-1 rounded-[6px] text-mobile-extrasmall-bold whitespace-nowrap"
          >
            전선
          </button>
          <button
            onClick={onAddToWishlist}
            className="bg-darkgreen text-white px-3 py-1 rounded-[6px] text-mobile-extrasmall-bold whitespace-nowrap"
          >
            {course.학점}학점
          </button>
        </div>
      </div>

      {/* Course Details */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-darkgray text-mobile-extrasmall">
          {course.강의실} 수 15-16 {course.과목번호}
        </div>
        <ExternalLink className="w-4 h-4 text-darkgray" />
      </div>

      {/* Bottom Info */}
      <div className="pt-3 border-t border-darkgray/20">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 text-mobile-extrasmall text-darkgray">
            <span>{course.학년}학년</span>
            <span>컴퓨터공학</span>
            <span>절대평가 (A/B/F)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
