import React, { useState } from "react";

import ArrowLeft from "@/assets/icon/ic_arrow_left.svg?react";
import { MENU_DATA, TITLE_TABS } from "@/constants/SidebarConstants";
import SideTitleList from "@/components/commons/sidebar/SideTitleList";
import SideDetailList from "@/components/commons/sidebar/SideDetailList";
import TitleSection from "@/components/commons/TitleSection";
import useSidebarStore from "@/stores/sidebarStore";
import Tab from "@/components/commons/Tab";

const MobileSidebar: React.FC = () => {
  const { closeSidebar } = useSidebarStore();
  const [activeCategory, setActiveCategory] = useState("학적");
  const [activeTab, setActiveTab] = useState("학사");

  const activeMenuData = MENU_DATA.find(
    (menu) => menu.category === activeCategory
  );

  return (
    <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col px-5 py-4">
      <div className="flex-shrink-0 space-y-4 pb-8">
        <TitleSection
          title="카테고리"
          icon={<ArrowLeft />}
          onClick={closeSidebar}
          iconPosition="left"
        />
        <div className="w-64">
          <Tab
            tabs={TITLE_TABS}
            activeTab={activeTab}
            variant="fit"
            onTabClick={setActiveTab}
          />
        </div>
      </div>

      {activeTab === "학사" ? (
        <div className="flex flex-1 overflow-hidden">
          <SideTitleList
            categories={MENU_DATA}
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
            listClassName="w-24 flex-col"
          />
          <SideDetailList
            data={activeMenuData}
            listclassName="space-y-6 px-8 py-4"
            itemclassName="grid grid-cols-2 gap-x-2 gap-y-1"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-coolgray">
          대학원 메뉴가 여기에 표시됩니다.
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
