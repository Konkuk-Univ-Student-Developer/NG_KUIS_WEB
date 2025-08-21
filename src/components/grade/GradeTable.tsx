import { useState } from 'react';
import {
  cellBaseClasses,
  headerTextClasses,
  valueTextClasses,
} from '@/constants/GradeConstants';
import type { ColumnConfig, RowData, GradeItem } from '@/types/grade';
import ArrowDownIcon from '@/assets/icon/ic_arrow_down.svg?react';
import ArrowUpIcon from '@/assets/icon/ic_arrow_up.svg?react';
import DetailGradeTable from './DetailGradeTable';

interface GradeTableProps {
  columns: ColumnConfig[];
  rows: RowData[];
  headerBgColor?: string;
  originalData?: GradeItem[]; // API 원본 데이터
}

function GradeTable({
  columns,
  rows,
  headerBgColor = 'bg-beige',
  originalData,
}: GradeTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (rowIndex: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowIndex)) {
      newExpandedRows.delete(rowIndex);
    } else {
      newExpandedRows.add(rowIndex);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="overflow-x-auto w-full">
      <div
        className="flex flex-col rounded overflow-hidden border border-coolgray"
        style={{ minWidth: '800px' }}
      >
        {/* Header */}
        <div className={`flex ${headerBgColor}`}>
          {columns.map((column, index) => (
            <div
              key={index}
              className={`${cellBaseClasses} ${
                column.desktop?.widthClass || 'w-1/6'
              } ${index > 0 ? 'border-l border-coolgray' : ''}`}
            >
              <div className={headerTextClasses}>{column.label}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex}>
            <div className="flex bg-white border-t border-coolgray">
              {columns.map((column, cellIndex) => {
                const content = row[column.id] || '';

                // DetailedGrades 컬럼인 경우 토글 버튼 렌더링
                if (column.id === 'DetailedGrades') {
                  const isExpanded = expandedRows.has(rowIndex);
                  return (
                    <div
                      key={cellIndex}
                      className={`${cellBaseClasses} ${
                        column.desktop?.widthClass || 'w-1/6'
                      } ${cellIndex > 0 ? 'border-l border-coolgray' : ''}`}
                    >
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleRow(rowIndex)}
                          className="text-darkgreen cursor-pointer hover:text-green-700"
                        >
                          {isExpanded ? (
                            <ArrowUpIcon className="w-6 h-6" />
                          ) : (
                            <ArrowDownIcon className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                }

                // 과목명 컬럼인 경우 줄바꿈 스타일 적용
                const isCourseName = column.id === 'courseName';
                const cellTextClasses = isCourseName
                  ? 'text-black text-sm md:text-lg text-left break-all whitespace-normal leading-relaxed'
                  : valueTextClasses;

                return (
                  <div
                    key={cellIndex}
                    className={`${cellBaseClasses} ${
                      column.desktop?.widthClass || 'w-1/6'
                    } ${cellIndex > 0 ? 'border-l border-coolgray' : ''}`}
                  >
                    <div className={cellTextClasses}>{content}</div>
                  </div>
                );
              })}
            </div>
            {/* 상세 성적 테이블 */}
            <DetailGradeTable
              isVisible={expandedRows.has(rowIndex)}
              gradeDetailData={originalData?.[rowIndex]?.gradeDetailResponse}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GradeTable;
