import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

// 공통 스타일 상수
export const tableStyles = {
  table: {
    wrapper: "overflow-hidden rounded-lg overflow-x-auto border border-zinc-400",
    base: "w-full border-collapse",
    headerRow: "bg-beige",
    bodyRow: "bg-white"
  },
  cell: {
    headerBase: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
    bodyBase: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none",
    firstHeader: "border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
    bodyBold: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none"
  },
  evaluation: {
    expandRow: "bg-white cursor-pointer hover:bg-gray-50",
    chevron: "w-4 h-4 text-[#036B3F] mx-auto transition-transform duration-300",
    chevronDisabled: "w-4 h-4 text-gray-400 mx-auto",
    expandedContent: "bg-white border border-gray-500 rounded px-2 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none transition-all duration-300 ease-in-out"
  }
};

// 헬퍼 함수: 테두리 클래스 생성
export const getCellClass = (
  type: 'header' | 'body' | 'bodyBold',
  index: number,
  total: number,
  isLastRow: boolean = false
) => {
  let baseClass = '';
  if (type === 'header') {
    baseClass = index === 0 ? tableStyles.cell.firstHeader : tableStyles.cell.headerBase;
  } else if (type === 'bodyBold') {
    baseClass = tableStyles.cell.bodyBold;
  } else {
    baseClass = tableStyles.cell.bodyBase;
  }
  
  const borderRight = index < total - 1 ? 'border-r' : '';
  const borderBottom = !isLastRow ? 'border-b' : '';
  
  return `${baseClass} ${borderRight} ${borderBottom}`.trim();
};

// 기본 RoundedTable 인터페이스
export interface RoundedTableProps {
  headers: string[];
  data: any[];
  renderCell?: (row: any, rowIdx: number, totalRows: number) => React.ReactNode;
  columns?: string[];
  isFirstColumnBold?: boolean;
  className?: string;
  wrapperClassName?: string;
}

// 기본 RoundedTable 컴포넌트
export const RoundedTable: React.FC<RoundedTableProps> = ({
  headers,
  data,
  renderCell,
  columns,
  isFirstColumnBold = false,
  className = '',
  wrapperClassName = ''
}) => {
  return (
    <div className={`${tableStyles.table.wrapper} ${wrapperClassName}`}>
      <table className={`${tableStyles.table.base} ${className}`}>
        <thead>
          <tr className={tableStyles.table.headerRow}>
            {headers.map((header, idx) => (
              <th key={idx} className={getCellClass('header', idx, headers.length)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className={tableStyles.table.bodyRow}>
              {renderCell ? (
                renderCell(row, rowIdx, data.length)
              ) : columns ? (
                columns.map((col, colIdx) => {
                  const isLastRow = rowIdx === data.length - 1;
                  const cellType = isFirstColumnBold && colIdx === 0 ? 'bodyBold' : 'body';
                  const value = col === 'index' ? rowIdx + 1 : row[col];
                  
                  return (
                    <td key={colIdx} className={getCellClass(cellType, colIdx, columns.length, isLastRow)}>
                      {value || '-'}
                    </td>
                  );
                })
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Expandable Table 인터페이스
export interface ExpandableTableProps {
  headers: string[];
  data: any[];
  expandedRows: Set<string>;
  onToggleExpand: (key: string) => void;
  getRowKey: (row: any) => string;
  getExpandContent: (row: any) => React.ReactNode | null;
  renderRow: (row: any, rowIdx: number, totalRows: number, isExpanded: boolean) => React.ReactNode;
}

// Expandable Table 컴포넌트
export const ExpandableTable: React.FC<ExpandableTableProps> = ({
  headers,
  data,
  expandedRows,
  onToggleExpand,
  getRowKey,
  getExpandContent,
  renderRow
}) => {
  return (
    <div className={tableStyles.table.wrapper}>
      <table className={tableStyles.table.base}>
        <thead>
          <tr className={tableStyles.table.headerRow}>
            {headers.map((header, idx) => (
              <th key={idx} className={getCellClass('header', idx, headers.length)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => {
            const key = getRowKey(row);
            const isExpanded = expandedRows.has(key);
            const expandContent = getExpandContent(row);
            const hasExpandContent = !!expandContent;
            
            return (
              <React.Fragment key={key}>
                <tr
                  className={hasExpandContent ? tableStyles.evaluation.expandRow : tableStyles.table.bodyRow}
                  onClick={() => hasExpandContent && onToggleExpand(key)}
                >
                  {renderRow(row, rowIdx, data.length, isExpanded)}
                </tr>
                {isExpanded && expandContent && (
                  <tr className="animate-fadeIn">
                    <td 
                      colSpan={headers.length} 
                      className={`${rowIdx === data.length - 1 ? '' : 'border-b'} border-gray-500 bg-beige px-2 py-1`}
                    >
                      <div className={tableStyles.evaluation.expandedContent}>
                        {expandContent}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Vertical Table 인터페이스 (강의 역량 및 목표 같은 테이블용)
export interface VerticalTableRow {
  label: string;
  value: React.ReactNode;
  rowSpan?: number;
  isCheckList?: boolean;
}

export interface VerticalTableProps {
  rows: VerticalTableRow[];
  className?: string;
}

// Vertical Table 컴포넌트
export const VerticalTable: React.FC<VerticalTableProps> = ({ rows, className = '' }) => {
  return (
    <div className={`${tableStyles.table.wrapper} ${className}`}>
      <table className={tableStyles.table.base}>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td 
                className={`border-r ${idx === rows.length - 1 ? '' : 'border-b'} border-zinc-400 bg-beige px-2 py-${row.rowSpan ? '4' : '2'} text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle whitespace-normal`}
                style={{ wordBreak: 'keep-all' }}
                rowSpan={row.rowSpan}
              >
                {row.label}
              </td>
              <td className={`${idx === rows.length - 1 ? '' : 'border-b'} border-zinc-400 bg-white px-3 py-2`}>
                {row.isCheckList && Array.isArray(row.value) ? (
                  <div className="flex flex-col gap-1">
                    {row.value.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {row.value}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};