import GraduationTable from "@/components/graduation/GraduationTable";
import { getStatusStyle } from "@/utils/graduation";
import type {
  ColumnConfig,
  ResponsiveListTableProps,
  RowData,
  RowGroup,
} from "@/types/graduation";
import MobileAccordionTable from "@/components/graduation/MobileAccordionTable";
import MobileExpandableTable from "@/components/graduation/MobileExpandableTable";

function ResponsiveTable ({
  columns,
  rows,
  headerBgColor,
}: ResponsiveListTableProps) {

  if (!rows || rows.length === 0) {
    const desktopHeaders = columns.filter((c) => (c.desktop?.row ?? 0) > 0);
    const desktopTableHeaders = desktopHeaders.map((f) => ({
      content: f.label,
      widthClass: f.desktop?.widthClass || "",
    }));

    return (
      <>
        <div className="hidden md:block">
          <GraduationTable
            headers={desktopTableHeaders}
            rows={[
              [
                {
                  content: (
                    <p>
                      데이터가 존재하지 않습니다.
                    </p>
                  ),
                  widthClass: "w-1/1"
                },
              ],
            ]}
            headerBgColor={headerBgColor}
          />
        </div>
        <div className="md:hidden w-full text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
          데이터가 없습니다
        </div>
      </>
    );
  }

  const createDataRows = (
    fields: ColumnConfig[],
    rowList: RowData[],
    view: "desktop" | "mobile"
  ) => {
    return rowList.map((row) =>
      fields.map((field) => ({
        content:
          field.id === "detailsStatus" ? (
            <button
              type="button"
              className="text-blue underline"
              onClick={() => {
                document
                  .getElementById(String(row.desktopLink))
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              {field.render ? field.render(row[field.id], row) : row[field.id]}
            </button>
          ) : field.render ? (
            field.render(row[field.id], row)
          ) : (
            row[field.id]
          ),
        widthClass: field[view]?.widthClass || "",
        textColor:
          field.id === "result" ? getStatusStyle(row[field.id]) : undefined,
      }))
    );
  };

  /** ------------------- DESKTOPs ------------------- */
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
    const rowGroups = rows.reduce<RowGroup[]>((acc, row, index) => {
      const type = row.rowType || "default";
      const lastGroup = acc[acc.length - 1];

      if (lastGroup && lastGroup.type === type) {
        lastGroup.items.push({ row, originalIndex: index });
      } else {
        acc.push({ type, items: [{ row, originalIndex: index }] });
      }
      return acc;
    }, []);

    return (
      <div className="flex flex-col md:hidden">
        {rowGroups.map((group, groupIndex) => {
          switch (group.type) {
            case "accordion": {
              return (
                <MobileAccordionTable
                  key={groupIndex}
                  columns={columns}
                  headerBgColor={headerBgColor}
                  group={group}
                />
              );
            }

            case "default": {
              const tableIndexes = [
                ...new Set(
                  columns.map((c) => c.mobile?.table).filter((t) => t && t > 0)
                ),
              ].sort((a, b) => (a || 0) - (b || 0));

              return (
                <div key={groupIndex} className="flex flex-col gap-4">
                  {tableIndexes.map((tableIndex) => {
                    const tableCols = columns.filter(
                      (c) => c.mobile?.table === tableIndex
                    );
                    if (tableCols.length === 0) return null;

                    const tableHeaders = tableCols.map((col) => ({
                      content: col.label,
                      widthClass: col.mobile?.widthClass || "",
                    }));

                    const tableRows = group.items.map(({ row }) =>
                      tableCols.map((col) => ({
                        content: col.render
                          ? col.render(row[col.id], row)
                          : row[col.id],
                        widthClass: col.mobile?.widthClass || "",
                        textColor:
                          col.id === "result"
                            ? getStatusStyle(row[col.id])
                            : undefined,
                      }))
                    );

                    return (
                      <GraduationTable
                        key={tableIndex}
                        headers={tableHeaders}
                        rows={tableRows}
                        headerBgColor={headerBgColor}
                      />
                    );
                  })}
                </div>
              );
            }

            case "custom": {
              const mainCols = columns.filter(
                (c) => (c.mobile?.table ?? 1) > 0
              );

              return (
                <MobileExpandableTable
                  key={groupIndex}
                  mainColumns={mainCols}
                  group={group}
                  headerBgColor={headerBgColor}
                  renderDetails={(row) => row.customRenderer}
                />
              );
            }

            default:
              return null;
          }
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