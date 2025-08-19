import {
  APPLY_HISTORY_COLUMNS,
  APPLY_HISTORY_ROWS,
  APPLY_SCHOLARSHIP_COLUMNS,
  APPLY_SCHOLARSHIP_ROWS,
} from '@/constants/ScholarshipConstants';
import TitleSection from '@/components/commons/TitleSection';
import ScholarshipTable from '@/components/scholarship/ScholarshipTable';
import type { TableHeader, TableCell } from '@/types/scholarship';

function ScholarshipApplication() {
  // Convert columns to headers format
  const ApplyHeaders: TableHeader[] = APPLY_SCHOLARSHIP_COLUMNS.map(
    (column) => ({
      content: column.label,
      widthClass: column.desktop?.widthClass || 'w-1/6',
    })
  );

  // Convert rows to table cells format
  const ApplyRows: TableCell[][] = APPLY_SCHOLARSHIP_ROWS.map((row) =>
    APPLY_SCHOLARSHIP_COLUMNS.map((column) => {
      const content = row[column.id] || '';
      return {
        content,
        widthClass: column.desktop?.widthClass || 'w-1/6',
      };
    })
  );

  // Convert columns to headers format
  const HistoryHeaders: TableHeader[] = APPLY_HISTORY_COLUMNS.map((column) => ({
    content: column.label,
    widthClass: column.desktop?.widthClass || 'w-1/6',
  }));

  // Convert rows to table cells format
  const HistoryRows: TableCell[][] = APPLY_HISTORY_ROWS.map((row) =>
    APPLY_HISTORY_COLUMNS.map((column) => {
      const content = row[column.id] || '';

      return {
        content,
        widthClass: column.desktop?.widthClass || 'w-1/6',
      };
    })
  );

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="2025 1학기 신청 장학금" />

        <div className="flex flex-col w-full gap-4 md:flex-col lg:flex-row md:justify-between">
          <div className="order-2 md:order-2 lg:order-1 w-full overflow-x-auto">
            <ScholarshipTable
              headers={ApplyHeaders}
              rows={ApplyRows}
              headerBgColor="bg-beige"
            />
          </div>
        </div>
      </div>

      <div>
        <TitleSection title="신청 내역 (기간 1년)" />

        <div className="flex flex-col w-full gap-4 md:flex-col lg:flex-row md:justify-between">
          <div className="order-2 md:order-2 lg:order-1 w-full overflow-x-auto">
            <ScholarshipTable
              headers={HistoryHeaders}
              rows={HistoryRows}
              headerBgColor="bg-beige"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipApplication;
