import SearchBar from "@/components/commons/SearchBar";
import Tab from "@/components/commons/Tab";
import { NOTICE_CATEGORY_MAP, NOTICE_TABS } from "@/constants/NoticeConstants";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import { useNotices } from "@/api/hooks/notice/useNotices";
import NoticeList from "@/components/notice/NoticeList";

const Notice = () => {
  const { notices, setCategory, setSearchQuery, handleToggleBookmark } =
    useNotices();

  const [activeTab, setActiveTab] = useState("전체");
  const isMobile = useMediaQuery("(min-width: 768px)");
  const tabVariant = isMobile ? "distributed" : "full";

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCategory(NOTICE_CATEGORY_MAP[tab]);
  };

  return (
    <div className="flex flex-col gap-6 md:mx-auto md:max-w-350 md:block md:px-16 lg:px-24 md:py-13">
      <h2 className="text-xl font-bold leading-[1.4] text-darkgreen mt-2 ml-5 md:m-0 md:pb-18 md:text-center md:text-4xl md:font-bold md:leading-[2.0]">
        공지사항
      </h2>

      <div className="mx-4 md:m-0 md:pb-9">
        <Tab
          tabs={NOTICE_TABS}
          activeTab={activeTab}
          variant={tabVariant}
          onTabClick={handleTabClick}
        />
      </div>

      <div className="mx-4 md:mx-auto md:flex md:items-center md:justify-between md:pb-12">
        <h3 className="hidden text-[32px] font-bold leading-[1.4] text-darkgreen md:block">
          {activeTab}
        </h3>

        <div className="md:w-[400px]">
          <SearchBar placeholder="검색하기" onSearch={setSearchQuery} />
        </div>
      </div>

      <NoticeList notices={notices} onToggleBookmark={handleToggleBookmark} />
    </div>
  );
};

export default Notice;
