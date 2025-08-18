import React from 'react';
import GradeTitle from './GradeTitle';
import TermGradeSummary from './TermGradeSummary';
import TermGradeTable from './TermGradeTable';

const TermGradeSection: React.FC = () => {
  const currentYear = 2025;
  const currentSemester = 1;

  return (
    <div>
      {/* 헤더 섹션 */}
      <div className="pb-4">
        <div className="flex flex-col md:flex-row md:gap-8 md:items-end">
          <GradeTitle year={currentYear} semester={currentSemester} />
          <TermGradeSummary />
        </div>
      </div>

      {/* 테이블 섹션 */}
      <div className="overflow-hidden">
        <TermGradeTable />
      </div>
    </div>
  );
};

export default TermGradeSection;
