import React from "react";
import SideTitleItem from "@/commons/sidebar/SideTitleItem";

interface SideTitleListProps {
  categories: { category: string }[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const SideTitleList: React.FC<SideTitleListProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  return (
    <nav className="w-24 bg-beige flex flex-col overflow-y-auto">
      {categories.map((item) => (
        <SideTitleItem
          key={item.category}
          isActive={activeCategory === item.category}
          onClick={() => onCategoryClick(item.category)}
        >
          {item.category}
        </SideTitleItem>
      ))}
    </nav>
  );
};

export default SideTitleList;
