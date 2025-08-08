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
      className="flex justify-between items-center px-2 py-3 text-xs text-font border-b-[0.10px] border-darkgray hover:bg-darkgray"
    >
      <span>{children}</span>
      <ArrowRightIcon />
    </a>
  );
};

export default SideDetailItem;
