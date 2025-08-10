import React from "react";
import GraduationTable from "@/components/graduation/ui/GraduationTable";
import { type ListTableField } from "@/types/listTable";

interface ResponsiveListTableProps {
  fields: ListTableField[];
  headerBgColor?: string;
}

const ResponsiveListTable: React.FC<ResponsiveListTableProps> = ({
  fields,
  headerBgColor,
}) => {
  const DesktopView = () => {
    const row1 = fields.filter((f) => f.desktop.row === 1);
    const row2 = fields.filter((f) => f.desktop.row === 2);

    return (
      <div className="flex-col w-full gap-4 hidden md:flex">
        {row1.length > 0 && (
          <GraduationTable
            headers={row1.map((f) => ({
              content: f.label,
              widthClass: f.desktop.widthClass,
            }))}
            values={row1.map((f) => ({
              content: f.value,
              widthClass: f.desktop.widthClass,
            }))}
            headerBgColor={headerBgColor}
          />
        )}
        {row2.length > 0 && (
          <GraduationTable
            headers={row2.map((f) => ({
              content: f.label,
              widthClass: f.desktop.widthClass,
            }))}
            values={row2.map((f) => ({
              content: f.value,
              widthClass: f.desktop.widthClass,
            }))}
            headerBgColor={headerBgColor}
          />
        )}
      </div>
    );
  };

  const MobileView = () => {
    const tables = fields.reduce((acc, field) => {
      const tableIndex = field.mobile.table - 1;
      if (!acc[tableIndex]) acc[tableIndex] = [];
      acc[tableIndex].push(field);
      return acc;
    }, [] as ListTableField[][]);

    return (
      <div className="flex flex-col gap-4 md:hidden">
        {tables.map((tableFields, index) => (
          <GraduationTable
            key={index}
            headers={tableFields.map((f) => ({
              content: f.label,
              widthClass: f.mobile.widthClass,
            }))}
            values={tableFields.map((f) => ({
              content: f.value,
              widthClass: f.mobile.widthClass,
            }))}
            headerBgColor={headerBgColor}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  );
};

export default ResponsiveListTable;
