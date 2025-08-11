import React from "react";

interface TableProps {
  headers: { content: React.ReactNode; widthClass: string }[];
  rows: { content: React.ReactNode; widthClass: string; textColor?:string }[][];
  headerBgColor?: string;
}

const GraduationTable: React.FC<TableProps> = ({
  headers,
  rows,
  headerBgColor = "bg-beige",
}) => {
  const cellBaseClasses =
    "flex justify-center items-center p-2 flex-shrink-0 break-keep";
  const headerTextClasses =
    "text-black text-sm md:text-lg font-bold text-center";
  const valueTextClasses = "text-black text-sm md:text-lg text-center";

  return (
    <div className="flex flex-col rounded overflow-hidden border border-coolgray">
      <div className={`flex ${headerBgColor}`}>
        {headers.map((header, index) => (
          <div
            key={index}
            className={`${cellBaseClasses} ${header.widthClass} ${
              index > 0 ? "border-l border-coolgray" : ""
            }`}
          >
            <div className={headerTextClasses}>{header.content}</div>
          </div>
        ))}
      </div>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex bg-white border-t border-coolgray">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`${cellBaseClasses} ${cell.widthClass} ${
                cellIndex > 0 ? "border-l border-coolgray" : ""
              }`}
            >
              <div className={cell.textColor || valueTextClasses}>
                  {cell.content}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GraduationTable;