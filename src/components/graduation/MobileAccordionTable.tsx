import type { MobileAccordionTableProps } from "@/types/graduation";
import MobileAccordionRow from "@/components/graduation/MobileAccordionRow";
import MobileExpandableTable from "@/components/graduation/MobileExpandableTable";

function MobileAccordionTable({
  columns,
  headerBgColor,
  group,
}: MobileAccordionTableProps) {
  const mainCols = columns.filter((c) => (c.mobile?.table ?? 1) > 0);
  const detailCols = columns.filter((c) => (c.mobile?.table ?? 1) === 0);

  return (
    <MobileExpandableTable
      mainColumns={mainCols}
      group={group}
      headerBgColor={headerBgColor}
      renderDetails={(rowData) => (
        <MobileAccordionRow rowData={rowData} detailColumns={detailCols} />
      )}
    />
  );
}

export default MobileAccordionTable;