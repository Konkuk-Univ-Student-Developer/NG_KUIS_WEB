import React, { useState } from "react";

import Tab from "@/components/commons/Tab";
import { GRADUATION_TABS, TAB_COMPONENTS } from "@/constants/GraduationConstants";

const GraduationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(GRADUATION_TABS[0]);
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="flex flex-col gap-6 md:mx-auto md:max-w-350 md:block md:px-16 lg:px-24 md:py-12">
      <h2 className="text-xl font-bold leading-[1.4] text-darkgreen ml-5 md:m-0 md:pb-18 md:text-center md:text-4xl md:font-bold md:leading-[2.0]">
        졸업시뮬레이션
      </h2>
      <div className="px-5 md:px-0">
        <Tab
          tabs={GRADUATION_TABS}
          activeTab={activeTab}
          onTabClick={setActiveTab}
          variant="fit"
        />
      </div>

      <div className="px-5 md:px-0">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default GraduationPage;
