import Filter from "@/components/commons/Filter";
import SearchBar from "@/components/commons/SearchBar";
import Tab from "@/components/commons/Tab";
import { NOTICE_TABS } from "@/constants/NoticeConstants";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import NoticeList from "@/components/notice/NoticeList";

const Notice = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const isMobile = useMediaQuery("(min-width: 768px)");
  const tabVariant = isMobile ? "distributed" : "full";

  const handleSearch = (query: string) => {
    console.log("검색어:", query);
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
          onTabClick={setActiveTab}
        />
      </div>

      <div className="mx-4 md:mx-auto md:flex md:items-center md:justify-between md:pb-12">
        <h3 className="hidden text-[32px] font-bold leading-[1.4] text-darkgreen md:block">
          {activeTab}
        </h3>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex-shrink-0 w-25 md:w-[150px] md:flex-shrink">
            <Filter placeholder="제목" />
          </div>

          <div className="flex-grow md:w-[400px] md:flex-grow-0">
            <SearchBar placeholder="검색하기" onSearch={handleSearch} />
          </div>
        </div>
      </div>

      <NoticeList />
    </div>
  );
};

export default Notice;
