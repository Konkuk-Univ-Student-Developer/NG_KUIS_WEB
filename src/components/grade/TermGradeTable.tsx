import { useState } from 'react';

import TermGradeTableRow from './TermGradeTableRow';
import { SAMPLE_GRADES, SAMPLE_DETAIL_GRADES, GRADE_TABLE_CLASSES, TERM_GRADE_COLUMNS } from '@/constants/GradeConstants';

const TermGradeTable = () => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (rowNo: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowNo)) {
        newSet.delete(rowNo);
      } else {
        newSet.add(rowNo);
      }
      return newSet;
    });
  };

  return (
    <div className={GRADE_TABLE_CLASSES.container}>
      <div className={GRADE_TABLE_CLASSES.tableWrapper}>
        <div className={GRADE_TABLE_CLASSES.tableContainer}>
          {/* 테이블 헤더 */}
          <div className={GRADE_TABLE_CLASSES.header.term}>
            <div className={GRADE_TABLE_CLASSES.headerText.term}>
              {TERM_GRADE_COLUMNS.map((column) => (
                <div key={column.label} className={column.width}>
                  {column.label}
                </div>
              ))}
            </div>
          </div>

          {/* 테이블 로우들 */}
          <div>
            {SAMPLE_GRADES.map((grade, index) => (
              <TermGradeTableRow
                key={index}
                grade={grade}
                detailGrade={SAMPLE_DETAIL_GRADES}
                isExpanded={expandedRows.has(grade.no)}
                isLastRow={index === SAMPLE_GRADES.length - 1}
                onToggle={() => toggleRow(grade.no)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermGradeTable;
