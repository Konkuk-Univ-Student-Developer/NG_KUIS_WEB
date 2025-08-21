import TitleSection from '@/components/commons/TitleSection';
import TotalGradeSummary from './TotalGradeSummary';
import TotalGradeTable from './TotalGradeTable';
import {
  TOTALTERM_GRADE_COLUMNS,
  TOTALTERM_GRADE_ROWS,
} from '@/constants/GradeConstants';
import GradeTable from './GradeTable';

function TotalGrade() {
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <TitleSection title="2025년 1학기" />
        <TotalGradeSummary />
      </div>
      <GradeTable
        columns={TOTALTERM_GRADE_COLUMNS}
        rows={TOTALTERM_GRADE_ROWS}
        headerBgColor="bg-beige"
      />
      <TotalGradeTable />
    </div>
  );
}

export default TotalGrade;
