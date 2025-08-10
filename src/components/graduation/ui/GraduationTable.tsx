import React from "react";

interface TableProps {
  headers: { content: React.ReactNode; widthClass: string }[];
  values: { content: React.ReactNode; widthClass: string }[];
  headerBgColor?: string;
}

const GraduationTable: React.FC<TableProps> = ({
  headers,
  values,
  headerBgColor = "bg-beige",
}) => {
  const cellBaseClasses =
    "flex justify-center items-center p-2 flex-shrink-0 break-keep";

  const headerTextClasses =
    "text-black text-sm md:text-lg font-bold text-center";
  const valueTextClasses = "text-black text-sm md:text-lg text-center";

  return (
    <div className="flex flex-col rounded overflow-hidden border border-coolgray">
      {/* Header Row */}
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

      {/* Data Row */}
      <div className="flex bg-white border-t border-coolgray">
        {values.map((value, index) => (
          <div
            key={index}
            className={`${cellBaseClasses} ${value.widthClass} ${
              index > 0 ? "border-l border-coolgray" : ""
            }`}
          >
            <div className={valueTextClasses}>{value.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraduationTable;
