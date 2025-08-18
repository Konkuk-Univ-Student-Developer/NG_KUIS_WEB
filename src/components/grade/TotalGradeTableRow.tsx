import type { TotalGradeItem } from '@/types/grade';
import {
  GRADE_TABLE_CLASSES,
  TOTAL_GRADE_COLUMNS,
} from '@/constants/GradeConstants';

interface TotalGradeTableRowProps {
  grade: TotalGradeItem;
  isLastRow?: boolean;
}

const TotalGradeTableRow = ({
  grade,
  isLastRow = false,
}: TotalGradeTableRowProps) => {
  // 각 컬럼에 해당하는 데이터를 매핑
  const getColumnData = (columnLabel: string) => {
    switch (columnLabel) {
      case '구분':
        return grade.구분;
      case '전공':
        return grade.전공;
      case '교양':
        return grade.교양;
      case '다전공':
        return grade.다전공;
      case '부전공':
        return grade.부전공;
      case '연계전공':
        return grade.연계전공;
      case '교직':
        return grade.교직;
      case '기타':
        return grade.기타;
      case '총취득학점':
        return grade.총취득학점;
      case '총신청학점':
        return grade.총신청학점;
      case '총포기학점':
        return grade.총포기학점;
      case '총F/N학점':
        return grade.총FN학점;
      case '만점':
        return grade.만점;
      default:
        return '';
    }
  };

  return (
    <div
      className={`${GRADE_TABLE_CLASSES.row.base} ${
        !isLastRow ? GRADE_TABLE_CLASSES.row.last : ''
      }`}
    >
      <div className="flex gap-2 text-mobile-small md:text-desktop-small md:gap-1">
        {TOTAL_GRADE_COLUMNS.map((column) => (
          <div
            key={column.label}
            className={`${column.width} text-black font-medium`}
          >
            {getColumnData(column.label)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalGradeTableRow;
