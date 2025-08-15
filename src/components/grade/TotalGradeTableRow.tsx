import type { TotalGradeItem } from './TotalGradeTable';

interface TotalGradeTableRowProps {
  grade: TotalGradeItem;
  isLastRow?: boolean;
}

const TotalGradeTableRow = ({
  grade,
  isLastRow = false,
}: TotalGradeTableRowProps) => {
  return (
    <div
      className={`px-4 py-3 hover:bg-beige/50 transition-colors min-w-max md:min-w-full ${
        !isLastRow ? 'border-b border-coolgray' : ''
      }`}
    >
      <div className="flex gap-2 text-mobile-small md:text-desktop-small md:gap-1">
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.구분}
        </div>
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.전공}
        </div>
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.교양}
        </div>
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.다전공}
        </div>
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.부전공}
        </div>
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.연계전공}
        </div>
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.교직}
        </div>
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.기타}
        </div>
        <div className="text-black font-medium min-w-[100px] md:min-w-0 text-center flex-1">
          {grade.총취득학점}
        </div>
        <div className="text-black font-medium min-w-[100px] md:min-w-0 text-center flex-1">
          {grade.총신청학점}
        </div>
        <div className="text-black font-medium min-w-[100px] md:min-w-0 text-center flex-1">
          {grade.총포기학점}
        </div>
        <div className="text-black font-medium min-w-[100px] md:min-w-0 text-center flex-1">
          {grade.총FN학점}
        </div>
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center flex-1">
          {grade.만점}
        </div>
      </div>
    </div>
  );
};

export default TotalGradeTableRow;
