import React from "react";
import type { ColumnConfig, RowData } from "@/types/graduation";

interface MobileAccordionDetailsProps {
  rowData: RowData;
  detailColumns: ColumnConfig[];
}

const MobileAccordionRow: React.FC<MobileAccordionDetailsProps> = ({
  rowData,
  detailColumns,
}) => {
  return (
    <div className="p-4 bg-beige border-t border-coolgray">
      <div className="flex flex-col rounded overflow-hidden border border-darkgray">
        <div className="flex bg-warmgray border-b border-darkgray">
          {detailColumns.map((col, index) => (
            <div
              key={index}
              className={`flex justify-center items-center p-2 flex-shrink-0 break-keep w-1/4 text-sm font-bold ${
                index > 0 ? "border-l border-darkgray" : ""
              }`}
            >
              {col.label}
            </div>
          ))}
        </div>

        <div className="flex bg-white">
          {detailColumns.map((col, index) => (
            <div
              key={index}
              className={`flex justify-center items-center p-2 flex-shrink-0 break-keep w-1/4 text-sm ${
                index > 0 ? "border-l border-darkgray" : ""
              }`}
            >
              {rowData[col.id]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileAccordionRow;
