import { useState } from "react";
import ChevronDown from "@/assets/icon/ic_chevron_down.svg?react";
import ChevronUp from "@/assets/icon/ic_chevron_up.svg?react";
import GraduationTable from "@/components/graduation/GraduationTable";
import { getStatusStyle } from "@/utils/graduation";
import type { MobileAccordionRowProps } from "@/types/graduation";

const MobileAccordionRow: React.FC<MobileAccordionRowProps> = ({
  rowData,
  mainColumns,
  detailColumns,
  headerBgColor = "bg-beige",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const collapsedHeader = mainColumns.map((col) => ({
    content: col.label,
    widthClass: col.mobile?.widthClass || "",
  }));

  const collapsedRow = mainColumns.map((col) => ({
    content:
      col.id === "detailsStatus" ? (
        <div
          className="cursor-pointer flex justify-center items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      ) : (
        rowData[col.id]
      ),
    widthClass: col.mobile?.widthClass || "",
    textColor:
      col.id === "status" ? getStatusStyle(rowData[col.id]) : undefined,
  }));

  return (
    <div className="flex flex-col bg-white">
      <GraduationTable
        headers={collapsedHeader}
        rows={[collapsedRow]}
        headerBgColor={headerBgColor}
      />

      {isOpen && (
        <div className="p-3 bg-beige border-t border-coolgray">
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
      )}
    </div>
  );
};

export default MobileAccordionRow;