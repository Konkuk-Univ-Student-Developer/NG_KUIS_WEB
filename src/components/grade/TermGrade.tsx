import TitleSection from '@/components/commons/TitleSection';
import GradeTable from '@/components/grade/GradeTable';
import TermGradeSummary from '@/components/grade/TermGradeSummary';
import { useTermGrade } from '@/api/hooks/grade/useTermGrade';
import type { GradeRequestParams, GradeItem } from '@/types/grade';
import { TERM_GRADE_COLUMNS } from '@/constants/GradeConstants';

function TermGrade() {
  // 테스트용 memberId (실제로는 로그인 후 사용자 정보에서 가져와야 함)
  const memberId = 1;

  const params: GradeRequestParams = {
    memberId,
    year: 2024, // 2025 -> 2024로 변경하여 데이터가 있는 학기로 테스트
    semester: 'FIRST',
  };

  const { termGradeData } = useTermGrade(params);

  // API 데이터를 테이블 형식으로 변환하는 함수
  const transformGradeDataToTableRows = (gradeItems: GradeItem[]) => {
    return gradeItems.map((item) => ({
      number: item.no,
      courseNumber: item.courseCode,
      subjectNumber: item.classNo || '-',
      courseName: item.courseName,
      professor: item.instructor,
      unit: item.credit,
      classification: item.division,
      rating: item.letterGrade,
      evaluationMethod: item.gradingMethod,
      DetailedGrades: '상세보기',
    }));
  };

  // 데이터가 없는 경우 기본 데이터 사용
  if (!termGradeData) {
    return (
      <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <TitleSection title="2025년 1학기" />
          <TermGradeSummary />
        </div>
        <GradeTable
          columns={TERM_GRADE_COLUMNS}
          rows={[]}
          headerBgColor="bg-beige"
        />
      </div>
    );
  }

  const tableRows = transformGradeDataToTableRows(termGradeData.items);
  const semesterText = `${termGradeData.year}년 ${
    termGradeData.semester === 'FIRST' ? '1' : '2'
  }학기`;

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <TitleSection title={semesterText} />
        <TermGradeSummary summaryData={termGradeData.summary} />
      </div>
      <GradeTable
        columns={TERM_GRADE_COLUMNS}
        rows={tableRows}
        headerBgColor="bg-beige"
        originalData={termGradeData?.items}
      />
    </div>
  );
}

export default TermGrade;
