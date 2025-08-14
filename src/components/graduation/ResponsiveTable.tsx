import React from "react";
import GraduationTable from "@/components/graduation/GraduationTable";
import MobileAccordionRow from "@/components/graduation/MobileAccordionRow";
import { getStatusStyle } from "@/utils/graduation";
import type { ColumnConfig, ResponsiveListTableProps, RowData } from "@/types/graduation";

const ResponsiveTable: React.FC<ResponsiveListTableProps> = ({
  columns,
  rows,
  headerBgColor,
}) => {
  /** 공용 데이터 매핑 */
  const createDataRows = (
    fields: ColumnConfig[],
    rowList: RowData[],
    view: "desktop" | "mobile"
  ) => {
    return rowList.map((row) =>
      fields.map((field) => ({
        content: field.render
          ? field.render(row[field.id], row)
          : row[field.id],
        widthClass: field[view]?.widthClass || "",
        textColor:
          field.id === "status" ? getStatusStyle(row[field.id]) : undefined,
      }))
    );
  };

  /** ------------------- DESKTOP ------------------- */
  const DesktopView = () => {
    const row1Fields = columns.filter((f) => f.desktop?.row === 1);
    const row2Fields = columns.filter((f) => f.desktop?.row === 2);

    return (
      <div className="hidden md:flex flex-col w-full md:gap-4 lg:justify-between lg:h-full lg:py-2">
        {row1Fields.length > 0 && (
          <GraduationTable
            headers={row1Fields.map((f) => ({
              content: f.label,
              widthClass: f.desktop?.widthClass || "",
            }))}
            rows={createDataRows(row1Fields, rows, "desktop")}
            headerBgColor={headerBgColor}
          />
        )}
        {row2Fields.length > 0 && (
          <GraduationTable
            headers={row2Fields.map((f) => ({
              content: f.label,
              widthClass: f.desktop?.widthClass || "",
            }))}
            rows={createDataRows(row2Fields, rows, "desktop")}
            headerBgColor={headerBgColor}
          />
        )}
      </div>
    );
  };

  /** ------------------- MOBILE ------------------- */
  const MobileView = () => {
    if (rows.length === 0) return null;

    // 컬럼을 mobile.table 값 기준으로 그룹화
    const tables: Record<number, ColumnConfig[]> = {};
    columns.forEach((col) => {
      const idx = col.mobile?.table ?? 1;
      if (!tables[idx]) tables[idx] = [];
      tables[idx].push(col);
    });

    return (
      <div className="flex flex-col md:hidden gap-4">
        {rows.map((row, rowIndex) => {
          // 1) 아코디언 row
          if (row.rowType === "accordion") {
            const mainCols = columns.filter((c) => (c.mobile?.table ?? 1) > 0);
            const detailCols = columns.filter(
              (c) => (c.mobile?.table ?? 1) === 0
            );
            return (
              <MobileAccordionRow
                key={rowIndex}
                rowData={row}
                mainColumns={mainCols}
                detailColumns={detailCols}
              />
            );
          }

          // 2) 커스텀 row
          if (row.rowType === "custom" && row.customRenderer) {
            return <div key={rowIndex}>{row.customRenderer}</div>;
          }

          // 3) 일반 테이블 row
          return Object.entries(tables).map(([tableIndex, cols]) => (
            <GraduationTable
              key={`${rowIndex}-${tableIndex}`}
              headers={cols.map((f) => ({
                content: f.label,
                widthClass: f.mobile?.widthClass || "",
              }))}
              rows={[
                cols.map((f) => ({
                  content: f.render ? f.render(row[f.id], row) : row[f.id],
                  widthClass: f.mobile?.widthClass || "",
                  textColor:
                    f.id === "status" ? getStatusStyle(row[f.id]) : undefined,
                })),
              ]}
              headerBgColor={headerBgColor}
            />
          ));
        })}
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

export default ResponsiveTable;
