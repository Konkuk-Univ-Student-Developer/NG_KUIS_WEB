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
    <div className="h-60 px-8 py-6 bg-stone-200 rounded-[20px] inline-flex flex-col justify-between items-start overflow-hidden">
      <div className="self-stretch inline-flex justify-between items-start">
        <div className="inline-flex flex-col justify-start items-start gap-3">
          <div className="w-full flex flex-col justify-start items-start gap-1">
            <div className="self-stretch h-7 justify-center text-black text-2xl font-bold font-['Noto_Sans'] leading-7">
              week{plan.week} {plan.dateRange && `(${plan.dateRange})`}
            </div>
            <div className="self-stretch h-7 justify-center text-black text-xl font-normal font-['Noto_Sans'] leading-10">
              {plan.topic}
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-1">
            {plan.instructor && plan.instructor.trim() && (
              <div className="self-stretch h-7 justify-center text-gray-500 text-xl font-normal font-['Noto_Sans'] leading-10">
                담당 교강사 : {plan.instructor}
              </div>
            )}
            <div className="self-stretch h-7 inline-flex justify-start items-center gap-3">
              <div className="flex-1 justify-center text-gray-500 text-xl font-normal font-['Noto_Sans'] leading-10">
                학습 활동 : {plan.activities}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-start items-center gap-3.5">
        <div className="h-9 px-6 py-2 bg-white rounded-[10px] flex justify-center items-center overflow-hidden">
          <div className="text-center justify-center text-gray-500 text-xl font-normal font-['Noto_Sans'] leading-10">
            {plan.type}
          </div>
        </div>
        {plan.schedule && (
          <div className="h-9 px-6 py-2 bg-white rounded-[10px] flex justify-center items-center overflow-hidden">
            <div className="text-center justify-center text-gray-500 text-xl font-normal font-['Noto_Sans'] leading-10">
              {plan.schedule}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DefaultWeeklyPlanCard: React.FC<DefaultWeeklyPlanCardProps> = ({ week, fallbackProfessor }) => {
  return (
    <div className="h-60 px-8 py-6 bg-stone-200 rounded-[20px] inline-flex flex-col justify-between items-start overflow-hidden">
      <div className="self-stretch inline-flex justify-between items-start">
        <div className="inline-flex flex-col justify-start items-start gap-3">
          <div className="w-full flex flex-col justify-start items-start gap-1">
            <div className="self-stretch h-7 justify-center text-black text-2xl font-bold font-['Noto_Sans'] leading-7">
              week{week}
            </div>
            <div className="self-stretch h-7 justify-center text-black text-xl font-normal font-['Noto_Sans'] leading-10">
              강의 내용
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-1">
            {fallbackProfessor && fallbackProfessor.trim() && fallbackProfessor !== '-' && (
              <div className="self-stretch h-7 justify-center text-gray-500 text-xl font-normal font-['Noto_Sans'] leading-10">
                담당 교강사 : {fallbackProfessor}
              </div>
            )}
            <div className="self-stretch h-7 inline-flex justify-start items-center gap-3">
              <div className="flex-1 justify-center text-gray-500 text-xl font-normal font-['Noto_Sans'] leading-10">
                학습 활동 : -
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-start items-center gap-3.5">
        <div className="h-9 px-6 py-2 bg-white rounded-[10px] flex justify-center items-center overflow-hidden">
          <div className="text-center justify-center text-gray-500 text-xl font-normal font-['Noto_Sans'] leading-10">
            이론
          </div>
        </div>
      </div>
    </div>
  );
};

export { WeeklyPlanCard, DefaultWeeklyPlanCard };