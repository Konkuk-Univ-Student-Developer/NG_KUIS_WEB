import type { ListTableField } from "@/types/listTable";
import { useState } from "react";
import ChevronDown from "@/assets/icon/ic_chevron_down.svg?react";
import ChevronUp from "@/assets/icon/ic_chevron_up.svg?react";
import { getStatusStyle } from "@/utils/graduation";

interface MobileAccordionRowProps {
  rowIndex: number;
  mainFields: ListTableField[];
  detailFields: ListTableField[];
}

const MobileAccordionRow: React.FC<MobileAccordionRowProps> = ({
  rowIndex,
  mainFields,
  detailFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cellBaseClasses =
    "flex justify-center items-center p-2 flex-shrink-0 break-keep";

  const mainCells = mainFields.map((field) => ({
    content: field.value[rowIndex],
    widthClass: field.mobile.widthClass,
    id: field.id,
  }));

  const detailHeaders = detailFields.map((field) => ({
    content: field.label,
    widthClass: "w-1/4",
  }));

  const detailValues = detailFields.map((field) => ({
    content: field.value[rowIndex],
    widthClass: "w-1/4",
  }));

  return (
    <div className="flex flex-col bg-white">
      <div className="flex w-full border-t border-coolgray">
        {mainCells.map((cell, cellIndex) => {
          if (cell.id === "detailsStatus") {
            return (
              <div
                key={cellIndex}
                className={`${cellBaseClasses} ${
                  cell.widthClass
                } cursor-pointer ${
                  cellIndex > 0 ? "border-l border-coolgray" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </div>
            );
          }

          const dynamicTextStyle =
            cell.id === "status" ? getStatusStyle(cell.content) : "";

          return (
            <div
              key={cellIndex}
              className={`${cellBaseClasses} ${
                cell.widthClass
              } text-sm text-center ${
                cellIndex > 0 ? "border-l border-coolgray" : ""
              } ${dynamicTextStyle}`}
            >
              {cell.content}
            </div>
          );
        })}
      </div>

      {isOpen && (
        <div className="p-3 bg-beige border-t border-coolgray">
          <div className="flex flex-col rounded overflow-hidden border border-darkgray">
            <div className="flex bg-warmgray border-b border-darkgray">
              {detailHeaders.map((header, index) => (
                <div
                  key={index}
                  className={`${cellBaseClasses} ${
                    header.widthClass
                  } text-sm font-bold ${
                    index > 0 ? "border-l border-darkgray" : ""
                  }`}
                >
                  {header.content}
                </div>
              ))}
            </div>
            <div className="flex bg-white">
              {detailValues.map((value, index) => (
                <div
                  key={index}
                  className={`${cellBaseClasses} ${value.widthClass} text-sm ${
                    index > 0 ? "border-l border-darkgray" : ""
                  }`}
                >
                  {value.content}
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
