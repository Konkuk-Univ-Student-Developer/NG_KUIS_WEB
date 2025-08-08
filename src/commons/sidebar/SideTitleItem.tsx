import React from "react";

interface SideTitleItemProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const SideTitleItem: React.FC<SideTitleItemProps> = ({
  isActive,
  onClick,
  children,
  className = "",
}) => {
  const baseClasses = "w-full p-3 text-sm text-start transition-colors";
  const activeClasses = "bg-white text-darkgreen font-semibold";
  const inactiveClasses = "text-black font-normal hover:bg-white/60";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default SideTitleItem;
