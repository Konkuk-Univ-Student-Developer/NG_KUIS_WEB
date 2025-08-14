import ChevronDown from "@/assets/icon/ic_chevron_down.svg?react";
import ChevronUp from "@/assets/icon/ic_chevron_up.svg?react";
import {
  cellBaseClasses,
  headerTextClasses,
  valueTextClasses,
} from "@/constants/GraduationConstants";
import React, { useState } from "react";
import MobileAccordionRow from "./MobileAccordionRow";
import { getStatusStyle } from "@/utils/graduation";
import type { MobileAccordionTableProps } from "@/types/graduation";

function MobileAccordionTable({columns, headerBgColor, group }: MobileAccordionTableProps) {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
  
  const handleToggleRow = (index: number) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };
  
  const mainCols = columns.filter((c) => (c.mobile?.table ?? 1) > 0);
  const detailCols = columns.filter((c) => (c.mobile?.table ?? 1) === 0);
  const mainTableHeaders = mainCols.map((col) => ({
    content: col.label,
    widthClass: col.mobile?.widthClass || "",
  }));

  return (
    <div
      className="flex flex-col rounded overflow-hidden border border-coolgray"
    >
      {/* --- Header --- */}
      <div className={`flex ${headerBgColor || "bg-beige"}`}>
        {mainTableHeaders.map((header, idx) => (
          <div
            key={idx}
            className={`${cellBaseClasses} ${
              header.widthClass
            } ${headerTextClasses} ${
              idx > 0 ? "border-l border-coolgray" : ""
            }`}
          >
            {header.content}
          </div>
        ))}
      </div>

      {/* --- Rows --- */}
      {group.items.map(({ row, originalIndex }) => (
        <React.Fragment key={originalIndex}>
          {/* Main Data Row */}
          <div
            className="flex bg-white border-t border-coolgray"
            onClick={() => handleToggleRow(originalIndex)}
          >
            {mainCols.map((col, idx) => {
              const statusColor =
                col.id === "status"
                  ? getStatusStyle(row[col.id])
                  : "text-gray-800";

              return (
                <div
                  key={idx}
                  className={`${cellBaseClasses} ${
                    col.mobile?.widthClass || ""
                  } ${statusColor}
                  ${
                    idx > 0 ? "border-l border-coolgray" : ""
                  } ${valueTextClasses}`}
                >
                  {col.id === "detailsStatus" ? (
                    <div>
                      {openStates[originalIndex] ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>
                  ) : col.render ? (
                    col.render(row[col.id], row)
                  ) : (
                    row[col.id]
                  )}
                </div>
              );
            })}
          </div>

          {openStates[originalIndex] && (
            <div className="border-t border-gray-200 bg-beige">
              <MobileAccordionRow rowData={row} detailColumns={detailCols} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default MobileAccordionTable;
