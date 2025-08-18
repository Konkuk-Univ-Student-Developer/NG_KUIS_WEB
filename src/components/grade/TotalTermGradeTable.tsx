import TotalTermGradeTableRow from './TotalTermGradeTableRow';
import { SAMPLE_TOTALTERMGRADES, GRADE_TABLE_CLASSES, TOTAL_TERM_GRADE_COLUMNS } from '@/constants/GradeConstants';

const TotalTermGradeTable = () => {
  return (
    <div className={GRADE_TABLE_CLASSES.container}>
      <div className={GRADE_TABLE_CLASSES.tableWrapper}>
        <div className={GRADE_TABLE_CLASSES.tableContainer}>
          {/* 테이블 헤더 */}
          <div className={GRADE_TABLE_CLASSES.header.term}>
            <div className="grid grid-cols-8 gap-2 text-mobile-small-bold md:text-desktop-small-bold text-black font-bold md:gap-1">
              {TOTAL_TERM_GRADE_COLUMNS.map((column) => (
                <div key={column.label} className={column.width}>
                  {column.label}
                </div>
              ))}
            </div>
          </div>

          {/* 테이블 로우들 */}
          <div>
            {SAMPLE_TOTALTERMGRADES.map((row, index) => (
              <TotalTermGradeTableRow
                key={index}
                grade={row}
                isLastRow={index === SAMPLE_TOTALTERMGRADES.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalTermGradeTable;
