import React from "react";
import ArrowRightIcon from "@/assets/icon/ic_chevron_right.svg?react";

interface SideDetailItemProps {
  href?: string;
  children: React.ReactNode;
}

const SideDetailItem: React.FC<SideDetailItemProps> = ({
  href = "#",
  children,
}) => {
  return (
    <a
      href={href}
      className="flex justify-between items-center py-2 px-1 md:px-2 md:py-3 md:min-w-24 text-[11px] md:text-xs text-font border-b-[0.10px] border-darkgray hover:bg-gray-100"
    >
      <span className="flex-1 min-w-0 break-words">{children}</span>
      <ArrowRightIcon />
    </a>
  );
};

export default SideDetailItem;