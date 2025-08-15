import React from 'react';
import TotalGradeSection from './TotalGradeSection';

const TotalGrade: React.FC = () => {
  return (
    <div className="mx-4 md:m-0">
      <TotalGradeSection />
      <TotalGradeSection />
    </div>
  );
};

export default TotalGrade;
