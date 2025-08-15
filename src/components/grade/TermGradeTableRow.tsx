import ArrowDownIcon from '@/assets/icon/ic_arrow_down.svg?react';
import ArrowUpIcon from '@/assets/icon/ic_arrow_up.svg?react';
import DetailGradeTable from './DetailGradeTable';
import type { GradeItem, DetailGrade } from './TermGradeTable';

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
  return (
    <div>
      <div
        className={`px-4 py-3 hover:bg-beige/50 transition-colors min-w-max md:min-w-full ${
          !isExpanded && !isLastRow ? 'border-b border-coolgray' : ''
        }`}
      >
        <div className="grid grid-cols-10 gap-2 text-mobile-small md:text-desktop-regular md:gap-1">
          <div className="text-black font-medium min-w-[48px] md:min-w-0 text-center">
            {grade.no}
          </div>
          <div className="text-black font-medium min-w-[100px] md:min-w-0 text-center">
            {grade.학수번호}
          </div>
          <div className="text-black font-medium min-w-[90px] md:min-w-0 text-center">
            {grade.과목번호}
          </div>
          <div className="text-black font-medium min-w-[160px] md:min-w-0 text-center">
            {grade.과목명}
          </div>
          <div className="text-black font-medium min-w-[90px] md:min-w-0 text-center">
            {grade.담당교수}
          </div>
          <div className="text-black font-medium min-w-[60px] md:min-w-0 text-center">
            {grade.학점}
          </div>
          <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center">
            {grade.이수구분}
          </div>
          <div className="text-black font-medium min-w-[60px] md:min-w-0 text-center">
            {grade.등급}
          </div>
          <div className="text-black font-medium min-w-[110px] md:min-w-0 text-center">
            {grade.성적평가방법}
          </div>
          <div className="min-w-[110px] md:min-w-0 text-center">
            {isExpanded ? (
              <ArrowUpIcon
                className="w-6 h-6 text-darkgreen cursor-pointer hover:opacity-70 mx-auto"
                onClick={onToggle}
              />
            ) : (
              <ArrowDownIcon
                className="w-6 h-6 text-darkgreen cursor-pointer hover:opacity-70 mx-auto"
                onClick={onToggle}
              />
            )}
          </div>
        </div>
      </div>

      {isExpanded && <DetailGradeTable detailGrade={detailGrade} />}
    </div>
  );
};

export default TermGradeTableRow;
