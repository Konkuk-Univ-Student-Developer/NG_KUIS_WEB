import {
  APPLY_SCHOLARSHIP_COLUMNS,
  APPLY_SCHOLARSHIP_ROWS,
} from '@/constants/ScholarshipConstants';
import TitleSection from '@/components/commons/TitleSection';
import ScholarshipTable from '@/components/scholarship/ScholarshipTable';
import type { TableHeader, TableCell } from '@/types/scholarship';

function ScholarshipApplication() {
  // Convert columns to headers format
  const headers: TableHeader[] = APPLY_SCHOLARSHIP_COLUMNS.map((column) => ({
    content: column.label,
    widthClass: column.desktop?.widthClass || 'w-1/6',
  }));

  // Convert rows to table cells format
  const rows: TableCell[][] = APPLY_SCHOLARSHIP_ROWS.map((row) =>
    APPLY_SCHOLARSHIP_COLUMNS.map((column) => ({
      content: row[column.id] || '',
      widthClass: column.desktop?.widthClass || 'w-1/6',
    }))
  );

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="2025 1학기 신청 장학금" />

        <div className="flex flex-col w-full gap-4 md:flex-col lg:flex-row md:justify-between">
          <div className="order-2 md:order-2 lg:order-1 w-full">
            <ScholarshipTable
              headers={headers}
              rows={rows}
              headerBgColor="bg-beige"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipApplication;
