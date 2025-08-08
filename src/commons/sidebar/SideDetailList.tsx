import React from "react";
import SideDetailItem from "@/commons/sidebar/SideDetailItem";

interface SubSection {
  id: string;
  title: string;
  items: {id: string, name: string}[];
}

interface SideDetailListProps {
  data?: {
    subSections: SubSection[];
  };
  listclassName?: string;
  itemclassName?: string;
}

const SideDetailList: React.FC<SideDetailListProps> = ({
  data,
  listclassName = "",
  itemclassName = "",
}) => {
  if (!data || data.subSections.length === 0) {
    return (
      <div className="flex-1 text-center text-font pt-10">메뉴가 없습니다.</div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className={listclassName}>
        {data.subSections.map((section) => (
          <section key={section.title} className="flex-1">
            <h3 className="text-md font-semibold text-darkgreen mb-2 whitespace-nowrap">
              {section.title}
            </h3>
            <div className={itemclassName}>
              {section.items.map((item) => (
                <SideDetailItem key={item.id} href={item.id}>{item.name}</SideDetailItem>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default SideDetailList;
