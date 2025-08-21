import { useState, lazy, Suspense } from 'react';
import Tab from '@/components/commons/Tab';
import { GRADE_TABS } from '@/constants/GradeConstants';

// Lazy loading으로 컴포넌트 import
const TermGrade = lazy(() => import('@/components/grade/TermGrade'));
const TotalGrade = lazy(() => import('@/components/grade/TotalGrade'));

const TAB_COMPONENTS: { [key: string]: React.ComponentType } = {
  '정규학기 성적 조회': TermGrade,
  '전체 성적 조회': TotalGrade,
};

const GradePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(GRADE_TABS[0]);
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="flex flex-col gap-6 md:mx-auto md:max-w-350 py-8 md:block md:px-16 lg:px-24 md:py-12">
      <h2 className="text-xl font-bold leading-[1.4] text-darkgreen ml-5 md:m-0 md:pb-18 md:text-center md:text-4xl md:font-bold md:leading-[2.0]">
        성적 조회
      </h2>

      <div className="px-5 md:px-0 md:pb-14">
        <Tab
          tabs={GRADE_TABS}
          activeTab={activeTab}
          onTabClick={setActiveTab}
          variant="fit"
        />
      </div>

      <div className="px-5 md:px-0">
        <Suspense fallback={<div>로딩 중...</div>}>
          {ActiveComponent && <ActiveComponent />}
        </Suspense>
      </div>
    </div>
  );
};

export default GradePage;
