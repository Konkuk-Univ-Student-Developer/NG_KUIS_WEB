import SearchBar from "@/components/commons/SearchBar";
import Tab from "@/components/commons/Tab";
import {
  NOTICE_CATEGORY_MAP,
  NOTICE_TABS,
  SORT_MAP,
} from "@/constants/NoticeConstants";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { useNotices } from "@/api/hooks/notice/useNotices";
import NoticeList from "@/components/notice/NoticeList";
import { Pagination } from "@/components/commons";
import { SORT_OPTIONS } from "../constants/NoticeConstants";
import Filter from "@/components/commons/Filter";

const Notice = () => {
  const {
    notices,
    totalPages,
    currentPage,
    setPage,
    setCategory,
    setSearchQuery,
    setSortOrder,
    handleToggleBookmark,
  } = useNotices();

  const [activeTab, setActiveTab] = useState("전체");
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
  const isMobile = useMediaQuery("(min-width: 768px)");
  const tabVariant = isMobile ? "distributed" : "full";

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCategory(NOTICE_CATEGORY_MAP[tab]);
  };

  useEffect(() => {
    setSortOrder(SORT_MAP[sortOption]);
  }, [sortOption, setSortOrder]);

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

        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex-shrink-0 w-30 md:w-[150px] md:flex-shrink">
            <Filter
              options={SORT_OPTIONS}
              selectedOption={sortOption}
              onSelect={setSortOption}
            />
          </div>

          <div className="flex-grow md:w-[400px] md:flex-grow-0">
            <SearchBar placeholder="검색하기" onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      <NoticeList notices={notices} onToggleBookmark={handleToggleBookmark} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Notice;
