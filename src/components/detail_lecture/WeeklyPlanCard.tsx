import React from 'react';
import { Badge } from '@/components/commons';
import useMediaQuery from '@/hooks/useMediaQuery';
import type { WeeklyPlan } from '@/constants/DetailLectureConstants';

interface WeeklyPlanCardProps {
  plan: WeeklyPlan;
  fallbackProfessor?: string;
}

interface DefaultWeeklyPlanCardProps {
  week: number;
  fallbackProfessor?: string;
}

const WeeklyPlanCard: React.FC<WeeklyPlanCardProps> = ({ plan, fallbackProfessor }) => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  
  if (isTablet) {
    // Desktop/Tablet view - new design
    return (
      <div className="min-h-44 px-6 py-4 bg-beige rounded-[20px] flex flex-col justify-between items-start">
        <div className="self-stretch flex justify-between items-start">
          <div className="flex flex-col justify-start items-start gap-3 flex-1">
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <div className="self-stretch text-black text-lg font-bold font-['Noto_Sans'] leading-6">
                week{plan.week} {plan.dateRange && `(${plan.dateRange})`}
              </div>
              <div className="self-stretch text-black text-base font-normal font-['Noto_Sans'] leading-5 break-words">
                {plan.topic}
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-1">
              {plan.instructor && plan.instructor.trim() && (
                <div className="self-stretch text-gray-500 text-base font-normal font-['Noto_Sans'] leading-5">
                  담당 교강사 : {plan.instructor}
                </div>
              )}
              <div className="self-stretch flex justify-start items-start">
                <div className="flex-1 text-gray-500 text-base font-normal font-['Noto_Sans'] leading-5 break-words">
                  학습 활동 : {plan.activities}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2 flex-wrap">
          <div className="px-4 py-1 bg-white rounded-[10px] flex justify-center items-center">
            <div className="text-center text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-5">
              {plan.type}
            </div>
          </div>
          {plan.schedule && (
            <div className="px-4 py-1 bg-white rounded-[10px] flex justify-center items-center">
              <div className="text-center text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-5 break-words">
                {plan.schedule}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Mobile view - original design
  return (
    <div className="p-4 bg-beige rounded-[20px] flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
            week{plan.week} {plan.dateRange && `(${plan.dateRange})`}
          </div>
          <div className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
            {plan.topic}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {plan.instructor && plan.instructor.trim() && (
            <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
              담당 교강사 : {plan.instructor}
            </div>
          )}
          <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
            학습 활동 : {plan.activities}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <Badge variant="white-gray" size="md">
          {plan.type}
        </Badge>
        {plan.schedule && (
          <Badge variant="white-gray" size="md">
            {plan.schedule}
          </Badge>
        )}
      </div>
    </div>
  );
};

const DefaultWeeklyPlanCard: React.FC<DefaultWeeklyPlanCardProps> = ({ week, fallbackProfessor }) => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  
  if (isTablet) {
    // Desktop/Tablet view - new design
    return (
      <div className="min-h-44 px-6 py-4 bg-beige rounded-[20px] flex flex-col justify-between items-start">
        <div className="self-stretch flex justify-between items-start">
          <div className="flex flex-col justify-start items-start gap-3 flex-1">
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <div className="self-stretch text-black text-lg font-bold font-['Noto_Sans'] leading-6">
                week{week}
              </div>
              <div className="self-stretch text-black text-base font-normal font-['Noto_Sans'] leading-5">
                강의 내용
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-1">
              {fallbackProfessor && fallbackProfessor.trim() && fallbackProfessor !== '-' && (
                <div className="self-stretch text-gray-500 text-base font-normal font-['Noto_Sans'] leading-5">
                  담당 교강사 : {fallbackProfessor}
                </div>
              )}
              <div className="self-stretch flex justify-start items-start">
                <div className="flex-1 text-gray-500 text-base font-normal font-['Noto_Sans'] leading-5">
                  학습 활동 : -
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <div className="px-4 py-1 bg-white rounded-[10px] flex justify-center items-center">
            <div className="text-center text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-5">
              이론
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Mobile view - original design
  return (
    <div className="p-4 bg-beige rounded-[20px] flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
            week{week}
          </div>
          <div className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
            강의 내용
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {fallbackProfessor && fallbackProfessor.trim() && fallbackProfessor !== '-' && (
            <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
              담당 교강사 : {fallbackProfessor}
            </div>
          )}
          <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
            학습 활동 : -
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <Badge variant="white-gray" size="md">
          이론
        </Badge>
      </div>
    </div>
  );
};

export { WeeklyPlanCard, DefaultWeeklyPlanCard };