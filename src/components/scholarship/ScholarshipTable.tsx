import {
  cellBaseClasses,
  headerTextClasses,
  valueTextClasses,
} from '@/constants/ScholarshipConstants';
import type { TableProps } from '@/types/scholarship';

function ScholarshipTable({
  headers,
  rows,
  headerBgColor = 'bg-beige',
}: TableProps) {
  return (
    <div className="flex flex-col rounded overflow-hidden border border-coolgray">
      {/* Header */}
      <div className={`flex ${headerBgColor}`}>
        {headers.map((header, index) => (
          <div
            key={index}
            className={`${cellBaseClasses} ${header.widthClass} ${
              index > 0 ? 'border-l border-coolgray' : ''
            }`}
          >
            <div className={headerTextClasses}>{header.content}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex bg-white border-t border-coolgray">
          {row.map((cell, cellIndex) => {
            const textStyle = cell.textColor
              ? `${valueTextClasses} ${cell.textColor}`
              : valueTextClasses;
            return (
              <div
                key={cellIndex}
                className={`${cellBaseClasses} ${cell.widthClass} ${
                  cellIndex > 0 ? 'border-l border-coolgray' : ''
                }`}
              >
                <div className={textStyle}>{cell.content}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ScholarshipTable;
