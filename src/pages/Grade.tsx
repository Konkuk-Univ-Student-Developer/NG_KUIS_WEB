import { useState } from 'react';
import Tab from '@/components/commons/Tab';
import useMediaQuery from '@/hooks/useMediaQuery';
import ArrowDownIcon from '@/assets/icon/ic_arrow_down.svg?react';

type GradeItem = {
  no: number;
  학수번호: string;
  과목번호: string;
  과목명: string;
  담당교수: string;
  학점: number;
  이수구분: string;
  등급: string;
  성적평가방법: string;
};

const GRADE_TABS = [
  '정규학기 성적 조회',
  '계절학기 성적 조회',
  '전체 성적 조회',
];

const SAMPLE_GRADES: GradeItem[] = Array.from({ length: 7 }).map((_, i) => ({
  no: i + 1,
  학수번호: 'COAA8723',
  과목번호: '1114',
  과목명: '컴퓨터공학개론',
  담당교수: '김건국',
  학점: 3,
  이수구분: '전선',
  등급: 'A+',
  성적평가방법: '상대평가',
}));

const Grade = () => {
  const [activeTab, setActiveTab] = useState(GRADE_TABS[0]);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const tabVariant = isDesktop ? 'fit' : 'full';

  const avgGpa = 4.5;
  const gpaScale = 4.5;
  const earnedCredits = 18;
  const attemptedCredits = 18;
  const academicWarning = 'N';
  const honors = 'Y';

  return (
    <div className="flex flex-col gap-6 md:mx-auto md:max-w-350 md:block md:px-8 lg:px-16 md:py-13">
      {/* Title은 냅두기*/}
      <h2 className="text-xl font-bold leading-[1.4] text-darkgreen mt-2 ml-5 md:m-0 md:pb-18 md:text-center md:text-4xl md:font-bold md:leading-[2.0]">
        성적 조회
      </h2>

             {/* Tabs */}
       <div className="mx-4 md:m-0 md:pb-6">
         <Tab
           tabs={GRADE_TABS}
           activeTab={activeTab}
           variant={tabVariant}
           onTabClick={setActiveTab}
         />
       </div>

                               {/* Summary and Term Title Row */}
         <div className="mx-4 md:m-0 md:flex md:gap-8 md:items-end">
           {/* Term Title */}
           <div className="md:flex-1">
             <h3 className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] md:text-2xl md:leading-[2.0]">
               2025년 1학기
             </h3>
           </div>

           {/* Summary */}
           <div className="mt-4 md:mt-0 md:flex-1">
             <div className="rounded-xl bg-beige p-4 md:rounded-2xl md:p-6">
               <div className="grid grid-cols-3 gap-4 md:gap-8">
                 <div className="flex flex-col gap-1">
                   <span className="text-darkgray text-sm md:text-base">
                     평점 평균
                   </span>
                   <div className="flex items-end gap-1">
                     <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                       {avgGpa}
                     </span>
                     <span className="text-darkgray text-base md:text-lg">
                       / {gpaScale}
                     </span>
                   </div>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-darkgray text-sm md:text-base">
                     취득학점 / 신청학점
                   </span>
                   <div className="flex items-end gap-1">
                     <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                       {earnedCredits}
                     </span>
                     <span className="text-darkgray text-base md:text-lg">
                       / {attemptedCredits}
                     </span>
                   </div>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-darkgray text-sm md:text-base">
                     학사경고 / 우등구분
                   </span>
                   <div className="flex items-end gap-2">
                     <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                       {academicWarning}
                     </span>
                     <span className="text-darkgray text-base md:text-lg">
                       / {honors}
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

                             {/* Grades Table */}
         <div className="mx-4 md:m-0 mt-18 md:mt-18">
         <div className="bg-white rounded-[8px] border border-lightgray overflow-hidden">
           <div className="overflow-x-auto md:overflow-visible">
             {/* Header */}
             <div className="bg-beige px-4 py-3 border-b border-lightgray min-w-max md:min-w-full">
               <div className="grid grid-cols-10 gap-4 text-mobile-small-bold text-darkgray md:gap-2">
                 <div className="min-w-[48px] md:min-w-0 text-center">No</div>
                 <div className="min-w-[100px] md:min-w-0 text-center">학수번호</div>
                 <div className="min-w-[90px] md:min-w-0 text-center">과목번호</div>
                 <div className="min-w-[160px] md:min-w-0 text-center">과목명</div>
                 <div className="min-w-[90px] md:min-w-0 text-center">담당교수</div>
                 <div className="min-w-[60px] md:min-w-0 text-center">학점</div>
                 <div className="min-w-[80px] md:min-w-0 text-center">이수구분</div>
                 <div className="min-w-[60px] md:min-w-0 text-center">등급</div>
                 <div className="min-w-[110px] md:min-w-0 text-center">성적평가방법</div>
                 <div className="min-w-[110px] md:min-w-0 text-center">상세성적 보기</div>
               </div>
             </div>

             {/* Body */}
             <div className="divide-y divide-lightgray">
               {SAMPLE_GRADES.map((row) => (
                 <div
                   key={row.no}
                   className="px-4 py-3 hover:bg-beige/50 transition-colors min-w-max md:min-w-full"
                 >
                   <div className="grid grid-cols-10 gap-4 text-mobile-small md:gap-2">
                     <div className="text-darkgray min-w-[48px] md:min-w-0 text-center">{row.no}</div>
                     <div className="text-darkgray min-w-[100px] md:min-w-0 text-center">
                       {row.학수번호}
                     </div>
                     <div className="text-darkgray min-w-[90px] md:min-w-0 text-center">
                       {row.과목번호}
                     </div>
                     <div className="text-black font-medium min-w-[160px] md:min-w-0 text-center">
                       {row.과목명}
                     </div>
                     <div className="text-darkgray min-w-[90px] md:min-w-0 text-center">
                       {row.담당교수}
                     </div>
                     <div className="text-darkgray min-w-[60px] md:min-w-0 text-center">{row.학점}</div>
                     <div className="text-darkgray min-w-[80px] md:min-w-0 text-center">
                       {row.이수구분}
                     </div>
                     <div className="text-darkgray min-w-[60px] md:min-w-0 text-center">{row.등급}</div>
                     <div className="text-darkgray min-w-[110px] md:min-w-0 text-center">
                       {row.성적평가방법}
                     </div>
                     <div className="min-w-[110px] md:min-w-0 text-center">
                       <ArrowDownIcon className="w-4 h-4 text-darkgreen cursor-pointer hover:opacity-70 mx-auto" />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default Grade;
