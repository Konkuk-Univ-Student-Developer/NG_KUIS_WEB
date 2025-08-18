import type { TotalTermGradeItem } from '@/types/grade';
import { GRADE_TABLE_CLASSES, TOTAL_TERM_GRADE_COLUMNS } from '@/constants/GradeConstants';

interface TotalTermGradeTableRowProps {
  grade: TotalTermGradeItem;
  isLastRow?: boolean;
}

const TotalTermGradeTableRow = ({
  grade,
  isLastRow = false,
}: TotalTermGradeTableRowProps) => {
  // 각 컬럼에 해당하는 데이터를 매핑
  const getColumnData = (columnLabel: string) => {
    switch (columnLabel) {
      case '이수구분':
        return grade.이수구분;
      case '학수번호':
        return grade.학수번호;
      case '과목명':
        return grade.과목명;
      case '학점':
        return grade.학점;
      case '등급':
        return grade.등급;
      case '인정구분':
        return grade.인정구분;
      case '삭제구분':
        return grade.삭제구분;
      case '삭제일자':
        return grade.삭제일자;
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
      <div className="grid grid-cols-8 gap-2 text-mobile-small md:text-desktop-small md:gap-1">
        {TOTAL_TERM_GRADE_COLUMNS.map((column) => (
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

export default TotalTermGradeTableRow;
