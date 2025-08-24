import React, { useRef, useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { CourseData } from '@/constants/TimetableConstants';
import Badge from './Badge';

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

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll = () => console.log('이수구분 클릭'),
  onAddToWishlist = () => console.log('학점 클릭')
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [slideDistance, setSlideDistance] = useState(0);
  const chipContainerRef = useRef<HTMLDivElement>(null);
  const chipWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (chipContainerRef.current && chipWrapperRef.current) {
        const containerWidth = chipContainerRef.current.offsetWidth;
        const wrapperWidth = chipWrapperRef.current.scrollWidth;
        const overflow = wrapperWidth > containerWidth;
        setIsOverflowing(overflow);

        if (overflow) {
          // Calculate the exact distance needed to show all chips
          setSlideDistance(wrapperWidth - containerWidth + 10); // +10 for some padding
        }
      }
    };

    checkOverflow();
    // Small delay to ensure proper measurement after render
    const timeout = setTimeout(checkOverflow, 100);

    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
      clearTimeout(timeout);
    };
  }, [course]);

  return (
    <div className="group w-full max-h-[200px] px-4 py-5 bg-beige hover:brightness-90 transition-all duration-300 ease-in-out rounded-[20px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start flex-shrink-0">
        <div className="flex-1 min-w-0 mb-1">
          <div className="text-darkgray truncate">
            {course.courseCode}
          </div>
          <div className="mt-1">
            <span className="justify-center text-black font-semibold">
              {course.courseName}
            </span>
            <span className="ml-2 text-darkgray truncate">
              {course.professor}
            </span>
          </div>
        </div>
        <div className="flex gap-2 ml-3 shrink-0">
          <button onClick={onEnroll}>
            <Tag label={course.courseCategory} />
          </button>
          <button onClick={onAddToWishlist}>
            <Tag label={`${course.credit || 3}학점`} />
          </button>
        </div>
      </div>

      {/* Course Details */}
      <div className="flex justify-between items-center flex-shrink-0">
        <div className="text-darkgray text-mobile-extrasmall truncate">
          {course.schedule}  {course.courseNumber}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-auto pt-5">
        <div className="flex justify-between items-center">
          <div
            ref={chipContainerRef}
            className="relative overflow-hidden flex-1 mr-3"
          >
            <div
              ref={chipWrapperRef}
              className={`flex gap-2.5 flex-nowrap ${isOverflowing ? 'group-hover:animate-[slideCustom_4s_ease-in-out_infinite]' : ''
                }`}
              style={{
                '--slide-distance': `-${slideDistance}px`
              } as React.CSSProperties}
            >
              {course.grade && <Badge variant="white">{course.grade}학년</Badge>}
              {course.departmentName && <Badge variant="white">{course.departmentName}</Badge>}
              {course.method && <Badge variant="white">{course.method}</Badge>}
            </div>
          </div>
          <ExternalLink className="w-6 h-6 text-darkgray flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;