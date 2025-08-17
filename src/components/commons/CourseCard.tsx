import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { CourseData } from '@/constants/TimetableConstants';

interface CourseCardProps {
  course: CourseData;
  onEnroll?: () => void;
  onAddToWishlist?: () => void;
}

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center justify-center bg-darkgreen text-white px-3 py-2 rounded-xl whitespace-nowrap text">
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
  onEnroll = () => console.log('이수구분 클릭'),
  onAddToWishlist = () => console.log('학점 클릭')
}) => {
  return (
    <div className="w-full max-h-[200px] px-4 py-5 bg-beige hover:brightness-90 transition-all duration-200 rounded-[20px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start flex-shrink-0">
        <div className="flex-1 min-w-0 mb-1">
          <div className="text-darkgray truncate">
            {course.subjectCode}
          </div>
          <div className="mt-1">
            <span className="justify-center text-black font-semibold">
              {course.subjectName}
            </span>
            <span className="ml-2 text-darkgray truncate">
              {course.professor}
            </span>
          </div>
        </div>
        <div className="flex gap-2 ml-3 shrink-0">
          <button onClick={onEnroll}>
            <Tag label={course.category ?? '전선'} />
          </button>
          <button onClick={onAddToWishlist}>
            <Tag label={`${course.credit}학점`} />
          </button>
        </div>
      </div>

      {/* Course Details */}
      <div className="flex justify-between items-center flex-shrink-0">
        <div className="text-darkgray text-mobile-extrasmall truncate">
          {course.room}  {course.time ?? ''}  {course.subjectCode}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-auto pt-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5 flex-nowrap overflow-hidden">
            <Chip>{course.grade}학년</Chip>
            <Chip>{course.department ?? '컴퓨터공학'}</Chip>
            <Chip>{course.evaluation ?? '절대평가 (A/B/F)'}</Chip>
          </div>
          <ExternalLink className="w-6 h-6 text-darkgray flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
