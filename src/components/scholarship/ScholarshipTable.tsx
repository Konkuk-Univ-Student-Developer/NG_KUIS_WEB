import {
  cellBaseClasses,
  headerTextClasses,
  valueTextClasses,
} from '@/constants/ScholarshipConstants';
import type { ColumnConfig, RowData } from '@/types/scholarship';

interface ScholarshipTableProps {
  columns: ColumnConfig[];
  rows: RowData[];
  headerBgColor?: string;
}

function ScholarshipTable({
  columns,
  rows,
  headerBgColor = 'bg-beige',
}: ScholarshipTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <div className="flex flex-col rounded overflow-hidden border border-coolgray" style={{ minWidth: '800px' }}>
      {/* Header */}
      <div className={`flex ${headerBgColor}`}>
        {columns.map((column, index) => (
          <div
            key={index}
            className={`${cellBaseClasses} ${column.desktop?.widthClass || 'w-1/6'} ${
              index > 0 ? 'border-l border-coolgray' : ''
            }`}
          >
            <div className={headerTextClasses}>{column.label}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex bg-white border-t border-coolgray">
          {columns.map((column, cellIndex) => {
            const content = row[column.id] || '';
            return (
              <div
                key={cellIndex}
                className={`${cellBaseClasses} ${column.desktop?.widthClass || 'w-1/6'} ${
                  cellIndex > 0 ? 'border-l border-coolgray' : ''
                }`}
              >
                <div className={valueTextClasses}>{content}</div>
              </div>
            );
          })}
        </div>
      ))}
      </div>
    </div>
  );
}

export default ScholarshipTable;
