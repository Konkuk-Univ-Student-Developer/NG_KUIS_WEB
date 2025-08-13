interface TermGradeTitleProps {
  year: number;
  semester: 1 | 2 | 'summer' | 'winter';
}

const TermGradeTitle = ({ year, semester }: TermGradeTitleProps) => {
  const getSemesterText = (semester: 1 | 2 | 'summer' | 'winter') => {
    switch (semester) {
      case 1:
        return '1학기';
      case 2:
        return '2학기';
      case 'summer':
        return '여름 계절학기';
      case 'winter':
        return '겨울 계절학기';
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

export default TermGradeTitle;
