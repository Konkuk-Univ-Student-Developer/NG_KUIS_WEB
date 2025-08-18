import ArrowDownIcon from '@/assets/icon/ic_arrow_down.svg?react';
import ArrowUpIcon from '@/assets/icon/ic_arrow_up.svg?react';
import DetailGradeTable from './DetailGradeTable';
import type { GradeItem, DetailGrade } from '@/types/grade';
import { GRADE_TABLE_CLASSES, TERM_GRADE_COLUMNS } from '@/constants/GradeConstants';

interface TermGradeTableRowProps {
  grade: GradeItem;
  detailGrade: DetailGrade;
  isExpanded: boolean;
  isLastRow?: boolean;
  onToggle: () => void;
}

const TermGradeTableRow = ({
  grade,
  detailGrade,
  isExpanded,
  isLastRow = false,
  onToggle,
}: TermGradeTableRowProps) => {
  // 각 컬럼에 해당하는 데이터를 매핑
  const getColumnData = (columnLabel: string) => {
    switch (columnLabel) {
      case 'No':
        return grade.no;
      case '학수번호':
        return grade.학수번호;
      case '과목번호':
        return grade.과목번호;
      case '과목명':
        return grade.과목명;
      case '담당교수':
        return grade.담당교수;
      case '학점':
        return grade.학점;
      case '이수구분':
        return grade.이수구분;
      case '등급':
        return grade.등급;
      case '성적평가방법':
        return grade.성적평가방법;
      case '상세성적 보기':
        return isExpanded ? (
          <ArrowUpIcon
            className="w-6 h-6 text-darkgreen cursor-pointer hover:opacity-70 mx-auto"
            onClick={onToggle}
          />
        ) : (
          <ArrowDownIcon
            className="w-6 h-6 text-darkgreen cursor-pointer hover:opacity-70 mx-auto"
            onClick={onToggle}
          />
        );
      default:
        return '';
    }
  };

  return (
    <div>
      <div
        className={`${GRADE_TABLE_CLASSES.row.base} ${
          !isExpanded && !isLastRow ? GRADE_TABLE_CLASSES.row.last : ''
        }`}
      >
        <div className="grid grid-cols-10 gap-2 text-mobile-small md:text-desktop-small md:gap-1">
          {TERM_GRADE_COLUMNS.map((column) => (
            <div
              key={column.label}
              className={`${column.width} text-black font-medium`}
            >
              {getColumnData(column.label)}
            </div>
          ))}
        </div>
      </div>

      {isExpanded && <DetailGradeTable detailGrade={detailGrade} />}
    </div>
  );
};

export default TermGradeTableRow;
