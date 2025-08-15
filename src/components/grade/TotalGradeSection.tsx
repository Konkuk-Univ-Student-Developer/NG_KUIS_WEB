import React from 'react';
import GradeTitle from './GradeTitle';
import TotalGradeSummary from './TotalGradeSummary';
import TotalTermGradeTable from './TotalTermGradeTable';

const TotalGradeSection: React.FC = () => {
  const currentYear = 2025;
  const currentSemester = 1;

  return (
    <div>
      {/* 헤더 섹션 */}
      <div className="pb-4">
        <div className="flex flex-col md:flex-row md:gap-8 md:items-end">
          <GradeTitle year={currentYear} semester={currentSemester} />
          <TotalGradeSummary />
        </div>
      </div>

      {/* 테이블 섹션 */}
      <div className="overflow-hidden">
        <TotalTermGradeTable />
      </div>
    </div>
  );
};

export default TotalGradeSection;
