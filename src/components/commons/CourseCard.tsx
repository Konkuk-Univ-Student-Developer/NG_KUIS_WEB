import React from 'react';
import { ExternalLink } from 'lucide-react';

interface CourseCardProps {
  // Note: Timetable page maps CourseData (from constants) into this localized shape.
  course: {
    학년: string;
    과목번호: string; // subjectCode
    교과목명: string; // subjectName
    학점: string; // credit
    담당교수: string; // professor
    강의실: string; // room
    시간?: string; // time
    과목코드?: string; // optional
    이수구분?: string; // category
    학과?: string; // department
    평가?: string; // evaluation summary
    학수번호?: string; // subjectCode, optional
  };
  onEnroll?: () => void;
  onAddToWishlist?: () => void;
}

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="bg-darkgreen text-white px-3 py-2 w-12 h-8 rounded-xl whitespace-nowrap">
    {label}
  </span>
);

// Figma-style Chip for meta information (학년/학과/평가)
const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-white text-darkgray px-4 py-1 rounded-[10px] text-mobile-small text-center whitespace-nowrap">
    {children}
  </span>
);

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll = () => console.log('전선 클릭'),
  onAddToWishlist = () => console.log('3학점 클릭')
}) => {
  return (
    <div className="self-stretch px-3 py-4 bg-beige rounded-[20px]">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 mb-1">
          <div className="text-darkgray truncate mb-1">
            {course.학수번호 ?? "C0AA8723"}
          </div>
          <span className="justify-center text-black font-semibold">
            {course.교과목명}
          </span>
          <span className="ml-2 text-darkgray truncate">
            {course.담당교수}
          </span>
        </div>
        <div className="flex gap-2 ml-3 shrink-0">
          <button onClick={onEnroll}>
            <Tag label={course.이수구분 ?? '전선'} />
          </button>
          <button onClick={onAddToWishlist}>
            <Tag label={`${course.학점}학점`} />
          </button>
        </div>
      </div>

      {/* Course Details */}
      <div className="flex justify-between items-center">
        <div className="text-darkgray text-mobile-extrasmall truncate">
          {course.강의실}  {course.시간 ?? ''}  {course.과목번호}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="pt-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5 flex-wrap">
            <Chip>{course.학년}학년</Chip>
            <Chip>{course.학과 ?? '컴퓨터공학'}</Chip>
            <Chip>{course.평가 ?? '절대평가 (A/B/F)'}</Chip>
          </div>
          <ExternalLink className="w-6 h-6 text-darkgray" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
