import React from 'react';
import TotalGradeSection from './TotalGradeSection';
import TotalGradeTable from './TotalGradeTable';

const TotalGrade: React.FC = () => {
  return (
    <div className="mx-4 md:m-0">
      <TotalGradeSection />
      <TotalGradeSection />

      <div className="overflow-hidden">
        <TotalGradeTable />
      </div>
    </div>
  );
};

export default TotalGrade;
