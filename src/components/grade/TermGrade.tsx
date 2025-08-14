import GradeTitle from '@/components/grade/GradeTitle';
import TermGradeSummary from '@/components/grade/TermGradeSummary';
import TermGradeTable from '@/components/grade/TermGradeTable';

const TermGrade: React.FC = () => {
  // 정규학기 관련 상태 관리 (예: 선택된 연도/학기)
  const currentYear = 2025;
  const currentSemester = 1;

  return (
    <>
      <div className="mx-4 md:m-0 md:flex md:gap-30 md:pb-18 md:items-end">
        <GradeTitle year={currentYear} semester={currentSemester} />
        <TermGradeSummary />
      </div>

      <TermGradeTable />
    </>
  );
};

export default TermGrade;
