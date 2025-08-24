import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

// 공통 스타일 상수
export const tableStyles = {
  mobile: {
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
  },
  desktop: {
    table: {
      wrapper: "overflow-hidden rounded-lg border border-zinc-400",
      base: "w-full border-collapse",
      headerRow: "bg-beige",
      bodyRow: "bg-white"
    },
    cell: {
      headerBase: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-bold font-['Noto_Sans'] leading-5",
      bodyBase: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-5",
      firstHeader: "border-zinc-400 px-2 py-2 text-center text-black text-sm font-bold font-['Noto_Sans'] leading-5",
      bodyBold: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-bold font-['Noto_Sans'] leading-5"
    },
    evaluation: {
      expandRow: "bg-white cursor-pointer hover:bg-gray-50",
      chevron: "w-6 h-6 text-[#036B3F] mx-auto transition-transform duration-300",
      chevronDisabled: "w-6 h-6 text-gray-400 mx-auto",
      expandedContent: "bg-white border border-gray-500 rounded px-2 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-5 transition-all duration-300 ease-in-out"
    }
  },
  // 하위 호환성을 위해 기본 스타일 유지
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
  // Mobile 테이블 설정 (기존 유지)
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
  },

  // Desktop 전용 테이블 설정 (Figma 기준)
  desktopBasic1: {
    headers: ['학년', '학수번호', '이수구분', '과목번호', '학점', '시간', '강의요시/강의실', '담당교수'],
    columns: ['grade', 'courseCode', 'category', 'courseNumber', 'credit', 'hours', 'schedule', 'professor']
  },
  desktopBasic2: {
    headers: ['개설학부(과)/전공', '수강학부(과)/전공', '제청학부(과)/전공', '비고'],
    columns: ['openDept', 'targetDept', 'requestDept', 'note']
  },
  desktopBasic3: {
    headers: ['수업유형', '캡스톤디자인', 'NCS', '패스과목', '원어강의', '원어유형', '현재인원', '학부인원', '대학원인원', '제한인원'],
    columns: ['classType', 'capstone', 'ncs', 'passSubject', 'foreignLang', 'langType', 'currentEnroll', 'undergrad', 'grad', 'capacity']
  },
  desktopTextbooks: {
    headers: ['번호', '교재구분', '교재명', '저자', '출판사', '출판년도', '링크'],
    columns: ['index', 'type', 'name', 'author', 'publisher', 'publishYear', 'link']
  },
  desktopAssignments: {
    headers: ['번호', '구분', '과제명', '제출시기'],
    columns: ['index', 'type', 'name', 'dueDate']
  },
  desktopEvaluation: {
    headers: ['항목', '비중(%)', '만점', '공개여부', '설명'],
    columns: ['item', 'weight', 'maxScore', 'isPublic', 'description']
  }
};

// 기본값 생성 함수
export const createDefaultData = (type: string, _count: number = 1) => {
  const defaults: Record<string, () => any[]> = {
    textbooks: () => Array.from({ length: 4 }, (_, i) => ({
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
  isLastRow: boolean = false,
  variant: 'mobile' | 'desktop' = 'mobile'
) => {
  const styles = variant === 'desktop' ? tableStyles.desktop : tableStyles.mobile;
  let baseClass = '';
  if (type === 'header') {
    baseClass = index === 0 ? styles.cell.firstHeader : styles.cell.headerBase;
  } else if (type === 'bodyBold') {
    baseClass = styles.cell.bodyBold;
  } else {
    baseClass = styles.cell.bodyBase;
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
  variant?: 'mobile' | 'desktop';
}

// 기본 RoundedTable 컴포넌트
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

// Expandable Table 인터페이스
export interface ExpandableTableProps {
  headers: string[];
  data: Record<string, unknown>[];
  expandedRows: Set<string>;
  onToggleExpand: (key: string) => void;
  getRowKey: (row: Record<string, unknown>) => string;
  getExpandContent: (row: Record<string, unknown>) => React.ReactNode | null;
  renderRow: (row: Record<string, unknown>, rowIdx: number, totalRows: number, isExpanded: boolean) => React.ReactNode;
  variant?: 'mobile' | 'desktop';
}

// Expandable Table 컴포넌트
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
  variant?: 'mobile' | 'desktop';
}

// Vertical Table 컴포넌트
export const VerticalTable: React.FC<VerticalTableProps> = ({ rows, className = '', variant = 'mobile' }) => {
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

// Desktop 기본정보 데이터 매핑 함수들
export const mapDesktopBasicData = (lectureData: any, courseData?: any) => {
  const basic1 = {
    grade: lectureData.grade || '-',
    courseCode: lectureData.courseCode || '-',
    category: lectureData.category || lectureData.classification || '-',
    courseNumber: lectureData.courseNumber || '-',
    credit: lectureData.credit || 3,
    hours: lectureData.hours || lectureData.credit ? `${lectureData.credit}시간` : '3시간',
    schedule: lectureData.schedule || '-',
    professor: lectureData.professor || '-'
  };

  const basic2 = {
    openDept: lectureData.openDept || lectureData.department || '-',
    targetDept: lectureData.targetDept || lectureData.department || '-',
    requestDept: lectureData.requestDept || '-',
    note: lectureData.note || courseData?.method || '-'
  };

  const basic3 = {
    classType: lectureData.classType || lectureData.method || '-',
    capstone: lectureData.capstone || '-',
    ncs: lectureData.ncs || '-',
    passSubject: lectureData.passSubject || '-',
    foreignLang: lectureData.foreignLang || '-',
    langType: lectureData.langType || '-',
    currentEnroll: lectureData.enrolled || lectureData.currentEnroll || 0,
    undergrad: lectureData.undergraduateEnrolled || lectureData.undergrad || 0,
    grad: lectureData.graduateEnrolled || lectureData.grad || 0,
    capacity: lectureData.capacity || 0
  };

  return { basic1, basic2, basic3 };
};

// Desktop 3개 테이블 컴포넌트
export interface DesktopBasicInfoTablesProps {
  lectureData: any;
  courseData?: any;
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

// 고차 컴포넌트 패턴 - 특화된 테이블들
export interface BasicInfoTableProps {
  data: Array<Record<string, string | number | unknown>>;
  type: 'courseInfo' | 'enrollment';
  variant?: 'mobile' | 'desktop';
}

export const BasicInfoTable: React.FC<BasicInfoTableProps> = ({ data, type, variant = 'mobile' }) => (
  <RoundedTable
    headers={TABLE_CONFIGS[type].headers}
    data={data}
    columns={TABLE_CONFIGS[type].columns}
    variant={variant}
  />
);

export interface StandardTableProps {
  data: Array<Record<string, string | number | unknown>>;
  type: 'textbooks' | 'assignments';
  variant?: 'mobile' | 'desktop';
}

export const StandardTable: React.FC<StandardTableProps> = ({ data, type, variant = 'mobile' }) => {
  const configKey = variant === 'desktop' ? `desktop${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof TABLE_CONFIGS : type;
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
  data: Array<Record<string, string | number | boolean | unknown>>;
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
      getRowKey={(row) => (row as any).item as string}
      getExpandContent={(row) => (row as any).description as React.ReactNode}
      variant={variant}
      renderRow={(row, rowIdx, totalRows, isExpanded) => (
        <>
          <td className={getCellClass('bodyBold', 0, 5, rowIdx === totalRows - 1, variant)}>
            {(row as any).item as React.ReactNode}
          </td>
          <td className={getCellClass('body', 1, 5, rowIdx === totalRows - 1, variant)}>
            {(row as any).weight as React.ReactNode}
          </td>
          <td className={getCellClass('body', 2, 5, rowIdx === totalRows - 1, variant)}>
            {(row as any).maxScore as React.ReactNode}
          </td>
          <td className={`${getCellClass('body', 3, 5, rowIdx === totalRows - 1, variant).replace(/text-black text-\w+ font-normal font-\['Noto_Sans'\] leading-\w+/, '').trim()}`}>
            {TableCellRenderers.checkIcon((row as any).isPublic as boolean)}
          </td>
          <td className={`${rowIdx === totalRows - 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center`}>
            {TableCellRenderers.expandIcon(!!(row as any).description, isExpanded)}
          </td>
        </>
      )}
    />
  );
};