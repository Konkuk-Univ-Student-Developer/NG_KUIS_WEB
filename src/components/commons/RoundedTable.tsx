import React from 'react';
import { Check } from 'lucide-react';
import { tableStyles } from '@/components/timetable/tableStyles';
import { TABLE_CONFIGS } from '@/components/timetable/tableConfig';
import {
  TableCellRenderers,
  createDefaultData,
  getCellClass,
  mapDesktopBasicData,
  type TableRowData,
  type LectureData,
  type CourseData
} from '@/components/timetable/tableHelpers';

// Basic RoundedTable interfaces
export interface RoundedTableProps {
  headers: string[];
  data: TableRowData[];
  renderCell?: (row: TableRowData, rowIdx: number, totalRows: number) => React.ReactNode;
  columns?: string[];
  isFirstColumnBold?: boolean;
  className?: string;
  wrapperClassName?: string;
  variant?: 'mobile' | 'desktop';
}

// Basic RoundedTable component
export const RoundedTable: React.FC<RoundedTableProps> = ({
  headers,
  data,
  renderCell,
  columns,
  isFirstColumnBold = false,
  className = '',
  wrapperClassName = '',
  variant = 'mobile'
}) => {
  const styles = variant === 'desktop' ? tableStyles.desktop : tableStyles.mobile;

  return (
    <div className={`${styles.table.wrapper} ${wrapperClassName}`}>
      <table className={`${styles.table.base} ${className}`}>
        <thead>
          <tr className={styles.table.headerRow}>
            {headers.map((header, idx) => (
              <th key={idx} className={getCellClass('header', idx, headers.length, false, variant)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className={styles.table.bodyRow}>
              {renderCell ? (
                renderCell(row, rowIdx, data.length)
              ) : columns ? (
                columns.map((col, colIdx) => {
                  const isLastRow = rowIdx === data.length - 1;
                  const cellType = isFirstColumnBold && colIdx === 0 ? 'bodyBold' : 'body';
                  const value = col === 'index' ? rowIdx + 1 : row[col];

                  return (
                    <td key={colIdx} className={getCellClass(cellType, colIdx, columns.length, isLastRow, variant)}>
                      {(value as React.ReactNode) || '-'}
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

// Expandable Table interfaces
export interface ExpandableTableProps {
  headers: string[];
  data: TableRowData[];
  expandedRows: Set<string>;
  onToggleExpand: (key: string) => void;
  getRowKey: (row: TableRowData) => string;
  getExpandContent: (row: TableRowData) => React.ReactNode | null;
  renderRow: (row: TableRowData, rowIdx: number, totalRows: number, isExpanded: boolean) => React.ReactNode;
  variant?: 'mobile' | 'desktop';
}

// Expandable Table component
export const ExpandableTable: React.FC<ExpandableTableProps> = ({
  headers,
  data,
  expandedRows,
  onToggleExpand,
  getRowKey,
  getExpandContent,
  renderRow,
  variant = 'mobile'
}) => {
  const styles = variant === 'desktop' ? tableStyles.desktop : tableStyles.mobile;

  return (
    <div className={styles.table.wrapper}>
      <table className={styles.table.base}>
        <thead>
          <tr className={styles.table.headerRow}>
            {headers.map((header, idx) => (
              <th key={idx} className={getCellClass('header', idx, headers.length, false, variant)}>
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
                  className={hasExpandContent ? styles.evaluation.expandRow : styles.table.bodyRow}
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
                      <div className={styles.evaluation.expandedContent}>
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

// Vertical Table interfaces
export interface VerticalTableRow {
  label: string;
  value: React.ReactNode;
  rowSpan?: number;
  isCheckList?: boolean;
}

export interface VerticalTableProps {
  rows: VerticalTableRow[];
  className?: string;
  variant?: 'mobile' | 'desktop';
}

// Vertical Table component
export const VerticalTable: React.FC<VerticalTableProps> = ({
  rows,
  className = '',
  variant = 'mobile'
}) => {
  const styles = variant === 'desktop' ? tableStyles.desktop : tableStyles.mobile;
  const textSize = variant === 'desktop' ? 'text-sm' : 'text-sm';
  const leadingSize = variant === 'desktop' ? 'leading-5' : 'leading-none';
  const checkSize = variant === 'desktop' ? 'w-5 h-5' : 'w-3.5 h-3.5';

  return (
    <div className={`${styles.table.wrapper} ${className}`}>
      <table className={styles.table.base}>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td
                className={`border-r ${idx === rows.length - 1 ? '' : 'border-b'} border-zinc-400 bg-beige px-2 py-2 text-center text-black ${textSize} font-semibold font-['Noto_Sans'] align-middle whitespace-normal ${leadingSize}`}
                style={{ wordBreak: 'keep-all' }}
                rowSpan={row.rowSpan}
              >
                {row.label}
              </td>
              <td className={`${idx === rows.length - 1 ? '' : 'border-b'} border-zinc-400 bg-white px-3 py-2`}>
                {row.isCheckList && Array.isArray(row.value) ? (
                  <div className={variant === 'desktop' ? "grid grid-cols-4 gap-4" : "flex flex-col gap-1"}>
                    {row.value.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2">
                        <Check className={`${checkSize} text-zinc-400`} />
                        <span className={`text-black ${textSize} font-normal font-['Noto_Sans'] ${leadingSize}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className={`text-black ${textSize} font-normal font-['Noto_Sans'] ${leadingSize}`}>
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

// Desktop basic info tables component
export interface DesktopBasicInfoTablesProps {
  lectureData: LectureData;
  courseData?: CourseData;
  variant?: 'mobile' | 'desktop';
}

export const DesktopBasicInfoTables: React.FC<DesktopBasicInfoTablesProps> = ({
  lectureData,
  courseData,
  variant = 'desktop'
}) => {
  const { basic1, basic2, basic3 } = mapDesktopBasicData(lectureData, courseData);

  return (
    <div className="flex flex-col gap-4">
      <RoundedTable
        headers={TABLE_CONFIGS.desktopBasic1.headers}
        data={[basic1]}
        columns={TABLE_CONFIGS.desktopBasic1.columns}
        variant={variant}
      />
      <RoundedTable
        headers={TABLE_CONFIGS.desktopBasic2.headers}
        data={[basic2]}
        columns={TABLE_CONFIGS.desktopBasic2.columns}
        variant={variant}
      />
      <RoundedTable
        headers={TABLE_CONFIGS.desktopBasic3.headers}
        data={[basic3]}
        columns={TABLE_CONFIGS.desktopBasic3.columns}
        variant={variant}
      />
    </div>
  );
};

// Specialized table component interfaces and components
export interface BasicInfoTableProps {
  data: TableRowData[];
  type: 'courseInfo' | 'enrollment';
  variant?: 'mobile' | 'desktop';
}

export const BasicInfoTable: React.FC<BasicInfoTableProps> = ({
  data,
  type,
  variant = 'mobile'
}) => (
  <RoundedTable
    headers={TABLE_CONFIGS[type].headers}
    data={data}
    columns={TABLE_CONFIGS[type].columns}
    variant={variant}
  />
);

export interface StandardTableProps {
  data: TableRowData[];
  type: 'textbooks' | 'assignments';
  variant?: 'mobile' | 'desktop';
}

export const StandardTable: React.FC<StandardTableProps> = ({
  data,
  type,
  variant = 'mobile'
}) => {
  const configKey = variant === 'desktop'
    ? `desktop${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof TABLE_CONFIGS
    : type;
  const config = TABLE_CONFIGS[configKey] || TABLE_CONFIGS[type];

  return (
    <RoundedTable
      headers={config.headers}
      data={data && data.length > 0 ? data : createDefaultData(type)}
      columns={config.columns}
      variant={variant}
    />
  );
};

export interface EvaluationTableProps {
  data: TableRowData[];
  expandedRows: Set<string>;
  onToggleExpand: (key: string) => void;
  variant?: 'mobile' | 'desktop';
}

export const EvaluationTable: React.FC<EvaluationTableProps> = ({
  data,
  expandedRows,
  onToggleExpand,
  variant = 'mobile'
}) => {
  const configKey = variant === 'desktop' ? 'desktopEvaluation' : 'evaluation';
  const config = TABLE_CONFIGS[configKey];

  return (
    <ExpandableTable
      headers={config.headers}
      data={data && data.length > 0 ? data : createDefaultData('evaluation')}
      expandedRows={expandedRows}
      onToggleExpand={onToggleExpand}
      getRowKey={(row) => (row as { item: string }).item}
      getExpandContent={(row) => (row as { description: string }).description}
      variant={variant}
      renderRow={(row, rowIdx, totalRows, isExpanded) => {
        const evaluationRow = row as {
          item: string;
          weight: string;
          maxScore: string | number;
          isPublic: boolean;
          description: string;
        };

        return (
          <>
            <td className={getCellClass('bodyBold', 0, 5, rowIdx === totalRows - 1, variant)}>
              {evaluationRow.item}
            </td>
            <td className={getCellClass('body', 1, 5, rowIdx === totalRows - 1, variant)}>
              {evaluationRow.weight}
            </td>
            <td className={getCellClass('body', 2, 5, rowIdx === totalRows - 1, variant)}>
              {evaluationRow.maxScore}
            </td>
            <td className={`${getCellClass('body', 3, 5, rowIdx === totalRows - 1, variant).replace(/text-black text-\w+ font-normal font-\['Noto_Sans'\] leading-\w+/, '').trim()}`}>
              {TableCellRenderers.checkIcon(evaluationRow.isPublic)}
            </td>
            <td className={`${rowIdx === totalRows - 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center`}>
              {TableCellRenderers.expandIcon(!!evaluationRow.description, isExpanded)}
            </td>
          </>
        );
      }}
    />
  );
};