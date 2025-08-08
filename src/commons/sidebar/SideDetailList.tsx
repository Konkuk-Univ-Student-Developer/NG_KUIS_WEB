import React from "react";
import SideDetailItem from "@/commons/sidebar/SideDetailItem";

interface SubSection {
  title: string;
  items: string[];
}

interface SideDetailListProps {
  data?: {
    subSections: SubSection[];
  };
}

const SideDetailList: React.FC<SideDetailListProps> = ({ data }) => {
  if (!data || data.subSections.length === 0) {
    return (
      <div className="flex-1 text-center text-font pt-10">메뉴가 없습니다.</div>
    );
  }

  return (
    <main className="flex-1 px-8 py-2 overflow-y-auto">
      <div className="space-y-6">
        {data.subSections.map((section) => (
          <section key={section.title}>
            <h3 className="text-md font-semibold text-darkgreen mb-2">
              {section.title}
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              {section.items.map((item) => (
                <SideDetailItem key={item}>{item}</SideDetailItem>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default SideDetailList;
