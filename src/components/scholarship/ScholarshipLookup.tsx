import {
  SCHOLARSHIP_LOOKUP_COLUMNS,
  SCHOLARSHIP_LOOKUP_ROWS,
} from '@/constants/ScholarshipConstants';
import TitleSection from '@/components/commons/TitleSection';
import ScholarshipTable from '@/components/scholarship/ScholarshipTable';
import type { TableHeader, TableCell } from '@/types/scholarship';

function ScholarshipLookup() {
  // Convert columns to headers format
  const headers: TableHeader[] = SCHOLARSHIP_LOOKUP_COLUMNS.map((column) => ({
    content: column.label,
    widthClass: column.desktop?.widthClass || 'w-1/6',
  }));

  // Convert rows to table cells format
  const rows: TableCell[][] = SCHOLARSHIP_LOOKUP_ROWS.map((row) =>
    SCHOLARSHIP_LOOKUP_COLUMNS.map((column) => ({
      content: row[column.id] || '',
      widthClass: column.desktop?.widthClass || 'w-1/6',
    }))
  );

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="장학금 수혜이력 조회" />

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

export default ScholarshipLookup;
