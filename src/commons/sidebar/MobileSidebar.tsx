import React, { useState } from "react";

import menuData from "./SidebarData";
import SideTitleList from "./SideTitleList";
import SideDetailList from "./SideDetailList";

const MobileSidebar: React.FC = () => {
  // const { closeSidebar } = useSidebarStore();
  const [activeCategory, setActiveCategory] = useState("학적");
  const [activeTab, ] = useState("학사");

  const activeMenuData = menuData.find(
    (menu) => menu.category === activeCategory
  );

  return (
    <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col px-5 py-4">
      {/* 상단 타이틀 및 탭 섹션 */}
      <div className="flex-shrink-0 space-y-4 pb-8">
        {/* [todo] : TitleSection 컴포넌트로 타이틀 추가 필요 */}
        {/* [todo] : Tabs 컴포넌트로 학사/대학원 추가 필요 */}
      </div>

      {activeTab === "학사" ? (
        <div className="flex flex-1 overflow-hidden">
          <SideTitleList
            categories={menuData}
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
          />
          <SideDetailList data={activeMenuData} />
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
