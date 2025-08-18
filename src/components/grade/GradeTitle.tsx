import type { GradeTitleProps } from '@/types/grade';
import { SEMESTERS } from '@/constants/GradeConstants';

const GradeTitle = ({ year, semester }: GradeTitleProps) => {
  const getSemesterText = (semester: typeof SEMESTERS[number]) => {
    switch (semester) {
      case 1:
        return '1학기';
      case 2:
        return '2학기';

      default:
        return '';
    }
  };

  return (
    <div className="md:flex-1">
      <h3 className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] md:text-2xl md:leading-[2.0]">
        {year}년 {getSemesterText(semester)}
      </h3>
    </div>
  );
};

export default GradeTitle;
