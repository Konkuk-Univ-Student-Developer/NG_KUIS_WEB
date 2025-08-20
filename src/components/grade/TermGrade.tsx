import TitleSection from '@/components/commons/TitleSection';
import GradeTable from '@/components/grade/GradeTable';
import TermGradeSummary from '@/components/grade/TermGradeSummary';
import {
  TERM_GRADE_COLUMNS,
  TERM_GRADE_ROWS,
} from '@/constants/GradeConstants';

function TermGrade() {
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <TitleSection title="2025년 1학기" />
        <TermGradeSummary />
      </div>
      <GradeTable
        columns={TERM_GRADE_COLUMNS}
        rows={TERM_GRADE_ROWS}
        headerBgColor="bg-beige"
      />
    </div>
  );
}

export default TermGrade;
