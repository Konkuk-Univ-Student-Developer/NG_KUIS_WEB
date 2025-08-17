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

// 공통 렌더러 함수들
export const TableCellRenderers = {
  checkIcon: (isChecked: boolean) => 
    isChecked ? <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" /> : null,
  
  expandIcon: (hasContent: boolean, isExpanded: boolean) => 
    hasContent ? (
      <ChevronDown className={`${tableStyles.evaluation.chevron} ${isExpanded ? 'rotate-180' : ''}`} />
    ) : (
      <ChevronDown className={tableStyles.evaluation.chevronDisabled} />
    ),
  
  indexCell: (index: number) => index,
  
  textCell: (value: unknown) => value || '-'
};

// 테이블 구성 프리셋
export const TABLE_CONFIGS = {
  courseInfo: {
    headers: ['학년', '학수번호', '이수구분', '과목번호', '학점'],
    columns: ['grade', 'courseCode', 'category', 'courseNumber', 'credit']
  },
  enrollment: {
    headers: ['현재인원', '학부인원', '대학생인원', '제한인원'],
    columns: ['enrolled', 'undergraduateEnrolled', 'graduateEnrolled', 'capacity']
  },
  textbooks: {
    headers: ['번호', '교재구분', '교재명', '저자', '링크'],
    columns: ['index', 'type', 'name', 'author', 'link']
  },
  assignments: {
    headers: ['번호', '구분', '과제명', '제출시기'],
    columns: ['index', 'type', 'name', 'dueDate']
  },
  evaluation: {
    headers: ['항목', '비중', '만점', '공개여부', '설명'],
    columns: ['item', 'weight', 'maxScore', 'isPublic', 'description']
  }
};

// 기본값 생성 함수
export const createDefaultData = (type: string, _count: number = 1) => {
  const defaults: Record<string, () => any[]> = {
    textbooks: () => Array.from({length: 4}, (_, i) => ({
      index: i + 1, type: '-', name: '-', author: '-', link: '-'
    })),
    assignments: () => [{ index: 1, type: '-', name: '-', dueDate: '-' }],
    evaluation: () => [
      { item: '출석률', weight: '10%', maxScore: '10', isPublic: true, description: 'Checked with e-campus system' },
      { item: '중간', weight: '30%', maxScore: '30', isPublic: true, description: 'Checked with e-campus system' },
      { item: '기말', weight: '30%', maxScore: '30', isPublic: true, description: 'Checked with e-campus system' },
      { item: '과제물', weight: '30%', maxScore: '30', isPublic: true, description: 'Checked with e-campus system' }
    ]
  };
  return defaults[type]?.() || [];
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
  data: Record<string, unknown>[];
  renderCell?: (row: Record<string, unknown>, rowIdx: number, totalRows: number) => React.ReactNode;
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
  data: Record<string, unknown>[];
  expandedRows: Set<string>;
  onToggleExpand: (key: string) => void;
  getRowKey: (row: Record<string, unknown>) => string;
  getExpandContent: (row: Record<string, unknown>) => React.ReactNode | null;
  renderRow: (row: Record<string, unknown>, rowIdx: number, totalRows: number, isExpanded: boolean) => React.ReactNode;
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

// 고차 컴포넌트 패턴 - 특화된 테이블들
export interface BasicInfoTableProps {
  data: Record<string, unknown>[];
  type: 'courseInfo' | 'enrollment';
}

export const BasicInfoTable: React.FC<BasicInfoTableProps> = ({ data, type }) => (
  <RoundedTable
    headers={TABLE_CONFIGS[type].headers}
    data={data}
    columns={TABLE_CONFIGS[type].columns}
  />
);

export interface StandardTableProps {
  data: Record<string, unknown>[];
  type: 'textbooks' | 'assignments';
}

export const StandardTable: React.FC<StandardTableProps> = ({ data, type }) => (
  <RoundedTable
    headers={TABLE_CONFIGS[type].headers}
    data={data && data.length > 0 ? data : createDefaultData(type)}
    columns={TABLE_CONFIGS[type].columns}
  />
);

export interface EvaluationTableProps {
  data: Record<string, unknown>[];
  expandedRows: Set<string>;
  onToggleExpand: (key: string) => void;
}

export const EvaluationTable: React.FC<EvaluationTableProps> = ({ 
  data, 
  expandedRows, 
  onToggleExpand 
}) => (
  <ExpandableTable
    headers={TABLE_CONFIGS.evaluation.headers}
    data={data && data.length > 0 ? data : createDefaultData('evaluation')}
    expandedRows={expandedRows}
    onToggleExpand={onToggleExpand}
    getRowKey={(row) => row.item}
    getExpandContent={(row) => row.description}
    renderRow={(row, rowIdx, totalRows, isExpanded) => (
      <>
        <td className={getCellClass('bodyBold', 0, 5, rowIdx === totalRows - 1)}>
          {row.item}
        </td>
        <td className={getCellClass('body', 1, 5, rowIdx === totalRows - 1)}>
          {row.weight}
        </td>
        <td className={getCellClass('body', 2, 5, rowIdx === totalRows - 1)}>
          {row.maxScore}
        </td>
        <td className={`${getCellClass('body', 3, 5, rowIdx === totalRows - 1).replace('text-black text-sm font-normal font-[\'Noto_Sans\'] leading-none', '').trim()}`}>
          {TableCellRenderers.checkIcon(row.isPublic)}
        </td>
        <td className={`${rowIdx === totalRows - 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center`}>
          {TableCellRenderers.expandIcon(!!row.description, isExpanded)}
        </td>
      </>
    )}
  />
);