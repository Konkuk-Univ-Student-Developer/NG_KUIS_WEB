import { useState } from 'react';
import Tab from '@/components/commons/Tab';
import useMediaQuery from '@/hooks/useMediaQuery';
import { GRADE_TABS, TAB_COMPONENTS } from '@/constants/GradeConstants';

const Grade = () => {
  const [activeTab, setActiveTab] = useState(GRADE_TABS[0]);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const tabVariant = isDesktop ? 'fit' : 'distributed';
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="flex flex-col gap-6 md:mx-auto md:max-w-350 md:block md:px-16 lg:px-24 md:py-13">
      <h2 className="text-xl font-bold leading-[1.4] text-darkgreen mt-2 ml-5 md:m-0 md:pb-18 md:text-center md:text-4xl md:font-bold md:leading-[2.0]">
        성적 조회
      </h2>

      <div className="mx-4 md:m-0 md:pb-18">
        <Tab
          tabs={GRADE_TABS}
          activeTab={activeTab}
          variant={tabVariant}
          onTabClick={setActiveTab}
        />
      </div>

      {ActiveComponent && <ActiveComponent />}
    </div>
  );
};

export default Grade;
