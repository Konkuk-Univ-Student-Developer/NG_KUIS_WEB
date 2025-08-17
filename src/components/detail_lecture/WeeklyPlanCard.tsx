import React from 'react';
import { Badge } from '@/components/commons';
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