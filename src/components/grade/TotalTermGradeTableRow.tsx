import type { TotalTermGradeItem } from '@/types/grade';

interface TotalTermGradeTableRowProps {
  grade: TotalTermGradeItem;
  isLastRow?: boolean;
}

const TotalTermGradeTableRow = ({
  grade,
  isLastRow = false,
}: TotalTermGradeTableRowProps) => {
  return (
    <div
      className={`px-4 py-3 hover:bg-beige/50 transition-colors min-w-max md:min-w-full ${
        !isLastRow ? 'border-b border-coolgray' : ''
      }`}
    >
      <div className="grid grid-cols-8 gap-2 text-mobile-small md:text-desktop-regular md:gap-1">
        <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center">
          {grade.이수구분}
        </div>
        <div className="text-black font-medium min-w-[100px] md:min-w-0 text-center">
          {grade.학수번호}
        </div>
        <div className="text-black font-medium min-w-[160px] md:min-w-0 text-center">
          {grade.과목명}
        </div>
        <div className="text-black font-medium min-w-[60px] md:min-w-0 text-center">
          {grade.학점}
        </div>
        <div className="text-black font-medium min-w-[60px] md:min-w-0 text-center">
          {grade.등급}
        </div>
        <div className="text-black font-medium min-w-[110px] md:min-w-0 text-center">
          {grade.인정구분}
        </div>
        <div className="text-black font-medium min-w-[110px] md:min-w-0 text-center">
          {grade.삭제구분}
        </div>
        <div className="text-black font-medium min-w-[110px] md:min-w-0 text-center">
          {grade.삭제일자}
        </div>
      </div>
    </div>
  );
};

export default TotalTermGradeTableRow;
