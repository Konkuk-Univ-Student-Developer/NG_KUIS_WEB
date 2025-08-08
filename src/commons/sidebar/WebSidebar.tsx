import React, { useState } from "react";
import menuData from "../../constants/SidebarConstants"; // 메뉴 데이터 import
import SideTitleList from "@/commons/sidebar/SideTitleList";
import SideDetailList from "./SideDetailList";

const WebSidebar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("학적");

  const activeMenuData = menuData.find(
    (menu) => menu.category === activeCategory
  );

  return (
    <div className="hidden md:block absolute left-0 top-16 w-full bg-beige shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SideTitleList
          categories={menuData}
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
          listClassName="flex-row min-h-12"
          itemClassName="px-4 py-2 text-sm"
        />
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:px-8">
          {activeMenuData ? (
            <SideDetailList
              data={activeMenuData}
              listclassName="flex flex-row space-x-3"
              itemclassName="max-w-sm"
            />
          ) : (
            <div className="text-center text-font py-10">메뉴가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebSidebar;
