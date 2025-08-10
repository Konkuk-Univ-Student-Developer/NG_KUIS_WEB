import Tab from "@/components/commons/Tab";
import { NOTICE_TABS } from "@/constants/NoticeConstants";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";

const Notice = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const isMobile = useMediaQuery("(min-width: 768px)");
  const tabVariant = isMobile ? "distributed" : "full";

  return (
    <div className="flex flex-col gap-6 md:block md:px-16 lg:px-24 md:py-13">
      <h2 className="text-xl font-bold leading-[1.4] text-darkgreen mt-2 ml-5 md:m-0 md:pb-18 md:text-center md:text-4xl md:font-bold md:leading-[2.0]">
        공지사항
      </h2>

      <div className="mx-4 md:m-0 md:pb-9">
        <Tab
          tabs={NOTICE_TABS}
          activeTab={activeTab}
          variant={tabVariant}
          onTabClick={setActiveTab}
        />
      </div>
    </div>
  );
};

export default Notice;
