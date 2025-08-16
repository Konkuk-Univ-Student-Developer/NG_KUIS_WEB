import TotalGradeTableRow from './TotalGradeTableRow';
import { SAMPLE_TOTAL_GRADES, GRADE_TABLE_CLASSES, TOTAL_GRADE_COLUMNS } from '@/constants/GradeConstants';

const TotalGradeTable = () => {
  return (
    <div className={GRADE_TABLE_CLASSES.container}>
      <div className={GRADE_TABLE_CLASSES.tableWrapper}>
        <div className={GRADE_TABLE_CLASSES.tableContainer}>
          {/* 테이블 헤더 */}
          <div className={GRADE_TABLE_CLASSES.header.total}>
            <div className={GRADE_TABLE_CLASSES.headerText.total}>
              {TOTAL_GRADE_COLUMNS.map((column) => (
                <div key={column.label} className={`${column.width} text-center flex-1`}>
                  {column.label}
                </div>
              ))}
            </div>
          </div>

          {/* 테이블 로우들 */}
          <div>
            {SAMPLE_TOTAL_GRADES.map((row, index) => (
              <TotalGradeTableRow
                key={index}
                grade={row}
                isLastRow={index === SAMPLE_TOTAL_GRADES.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalGradeTable;
