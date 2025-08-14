import React, { useState } from "react";
import ChevronDown from "@/assets/icon/ic_chevron_down.svg?react";
import ChevronUp from "@/assets/icon/ic_chevron_up.svg?react";
import {
  cellBaseClasses,
  headerTextClasses,
  valueTextClasses,
} from "@/constants/GraduationConstants";
import { getStatusStyle } from "@/utils/graduation";
import type { ColumnConfig, RowData, RowGroup } from "@/types/graduation";

interface MobileExpandableTableProps {
  mainColumns: ColumnConfig[];
  group: RowGroup;
  headerBgColor?: string;
  renderDetails: (row: RowData) => React.ReactNode;
}

function MobileExpandableTable({
  mainColumns,
  group,
  headerBgColor,
  renderDetails,
}: MobileExpandableTableProps) {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const handleToggleRow = (index: number) => {
    setOpenStates((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const mainTableHeaders = mainColumns.map((col) => ({
    content: col.label,
    widthClass: col.mobile?.widthClass || "",
  }));

  return (
    <div className="flex flex-col rounded overflow-hidden border border-coolgray">
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
          {/* Main Data Row (Clickable) */}
          <div
            className="flex bg-white border-t border-coolgray cursor-pointer"
            onClick={() => handleToggleRow(originalIndex)}
          >
            {mainColumns.map((col, idx) => {
              const statusColor =
                col.id === "status"
                  ? getStatusStyle(row[col.id])
                  : "text-gray-800";
              const isExpandableIndicator = col.id === "detailsStatus";

              return (
                <div
                  key={idx}
                  className={`${cellBaseClasses} ${
                    col.mobile?.widthClass || ""
                  } ${statusColor} ${
                    idx > 0 ? "border-l border-coolgray" : ""
                  } ${valueTextClasses}`}
                >
                  {isExpandableIndicator ? (
                    <div className="flex items-center justify-center w-full h-full">
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
              {renderDetails(row)}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default MobileExpandableTable;
