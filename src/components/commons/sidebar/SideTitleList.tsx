import React from "react";
import SideTitleItem from "@/components/commons/sidebar/SideTitleItem";

interface SideTitleListProps {
  categories: { category: string }[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
  listClassName?: string;
  itemClassName?: string;
}

const SideTitleList: React.FC<SideTitleListProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
  listClassName = "",
  itemClassName = "",
}) => {
  return (
    <nav className={`bg-beige h-full flex ${listClassName}`}>
      {categories.map((item) => (
        <SideTitleItem
          key={item.category}
          isActive={activeCategory === item.category}
          onClick={() => onCategoryClick(item.category)}
          className={itemClassName}
        >
          {item.category}
        </SideTitleItem>
      ))}
    </nav>
  );
};

export default SideTitleList;
