import React from "react";
import GraduationTable from "@/components/graduation/GraduationTable";
import { type ListTableField } from "@/types/listTable";
import MobileAccordionRow from "@/components/graduation/MobileAccordionRow";
import { getStatusStyle } from "@/utils/graduation";

interface ResponsiveListTableProps {
  fields: ListTableField[];
  headerBgColor?: string;
}

const ResponsiveListTable: React.FC<ResponsiveListTableProps> = ({
  fields,
  headerBgColor,
}) => {
  const DesktopView = () => {
    const row1Fields = fields.filter((f) => f.desktop.row === 1);
    const row2Fields = fields.filter((f) => f.desktop.row === 2);

    const createDataRows = (
      fieldSet: ListTableField[],
      view: "desktop" | "mobile"
    ) => {
      if (!fieldSet || fieldSet.length === 0) return [];
      const numRows = fieldSet[0]?.value.length || 0;
      if (numRows === 0) return [];

      return Array.from({ length: numRows }, (_, rowIndex) =>
        fieldSet.map((field) => ({
          content: field.value[rowIndex],
          widthClass: field[view].widthClass,
          textColor:
            field.id === "status"
              ? getStatusStyle(field.value[rowIndex])
              : undefined,
        }))
      );
    };

    const desktopRows1 = createDataRows(row1Fields, "desktop");
    const desktopRows2 = createDataRows(row2Fields, "desktop");

    return (
      <div className="flex-col w-full md:gap-4 lg:justify-between lg:h-full lg:py-2 hidden md:flex">
        {desktopRows1.length > 0 && (
          <GraduationTable
            headers={row1Fields.map((f) => ({
              content: f.label,
              widthClass: f.desktop.widthClass,
            }))}
            rows={desktopRows1}
            headerBgColor={headerBgColor}
          />
        )}
        {desktopRows2.length > 0 && (
          <GraduationTable
            headers={row2Fields.map((f) => ({
              content: f.label,
              widthClass: f.desktop.widthClass,
            }))}
            rows={desktopRows2}
            headerBgColor={headerBgColor}
          />
        )}
      </div>
    );
  };

  const MobileView = () => {
    const isAccordion = fields.some((f) => f.mobile.table === 0);
    const numRows = fields[0]?.value.length || 0;

    if (numRows === 0) return null;

    if (isAccordion) {
      const mainMobileFields = fields.filter((f) => f.mobile.table > 0);
      const detailMobileFields = fields.filter((f) => f.mobile.table === 0);

      return (
        <div className="flex flex-col md:hidden">
          <div className="flex flex-col rounded overflow-hidden border border-coolgray">
            <div className={`flex ${headerBgColor || "bg-beige"}`}>
              {mainMobileFields.map((header, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center p-2 flex-shrink-0 break-keep ${
                    header.mobile.widthClass
                  } text-black text-sm md:text-lg font-bold text-center ${
                    index > 0 ? "border-l border-coolgray" : ""
                  }`}
                >
                  {header.label}
                </div>
              ))}
            </div>
            <div>
              {Array.from({ length: numRows }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                >
                  <MobileAccordionRow
                    rowIndex={rowIndex}
                    mainFields={mainMobileFields}
                    detailFields={detailMobileFields}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      const tables = fields.reduce((acc, field) => {
        const tableIndex = field.mobile.table - 1;
        if (!acc[tableIndex]) acc[tableIndex] = [];
        acc[tableIndex].push(field);
        return acc;
      }, [] as ListTableField[][]);

      return (
        <div className="flex flex-col gap-4 md:hidden">
          {tables.map((tableFields, index) => {
            if (!tableFields || tableFields.length === 0) return null;

            const dataRows = Array.from({ length: numRows }, (_, rIndex) =>
              tableFields.map((field) => ({
                content: field.value[rIndex],
                widthClass: field.mobile.widthClass,
                textColor:
                  field.id === "status"
                    ? getStatusStyle(field.value[rIndex])
                    : undefined,
              }))
            );

            return (
              <GraduationTable
                key={index}
                headers={tableFields.map((f) => ({
                  content: f.label,
                  widthClass: f.mobile.widthClass,
                }))}
                rows={dataRows}
                headerBgColor={headerBgColor}
              />
            );
          })}
        </div>
      );
    }
  };

  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  );
};

export default ResponsiveListTable;