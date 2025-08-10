import React from "react";

interface CreditSummaryGridProps {
  children: React.ReactNode;
}

const CreditSummaryGrid = ({ children }: CreditSummaryGridProps) => {
  return (
    <div className="self-stretch bg-beige rounded-[20px] p-4 md:p-8">
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
        {children}
      </div>
    </div>
  );
};

export default CreditSummaryGrid;
