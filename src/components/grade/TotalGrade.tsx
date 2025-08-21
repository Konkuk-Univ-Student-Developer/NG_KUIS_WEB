import TitleSection from '@/components/commons/TitleSection';
import TotalGradeTable from './TotalGradeTable';
import SemesterGradeSummary from './SemesterGradeSummary';
import { useAllGrades } from '@/api/hooks/grade/useAllGrades';
import { useGradeSummary } from '@/api/hooks/grade/useGradeSummary';
import GradeTable from './GradeTable';
import type { GradeItem, GradeSummaryResponse } from '@/types/grade';
import {
  TOTALTERM_GRADE_COLUMNS,
  TOTAL_GRADE_COLUMNS,
} from '@/constants/GradeConstants';

function TotalGrade() {
  // 테스트용 memberId (실제로는 로그인 후 사용자 정보에서 가져와야 함)
  const memberId = 1;

  const { allGradesData } = useAllGrades(memberId);
  const { gradeSummaryData } = useGradeSummary(memberId);

  // API 데이터를 테이블 형식으로 변환하는 함수
  const transformAllGradesDataToTableRows = (gradeItems: GradeItem[]) => {
    if (!gradeItems || !Array.isArray(gradeItems)) {
      return [];
    }

    return gradeItems.map((item) => ({
      classification: item.classification || item.division || '-',
      courseNumber: item.courseCode || '-',
      courseName: item.courseName,
      unit: item.credit,
      rating: item.letterGrade,
      recognitionType: item.recognitionType || '-',
      deletionType: item.deletionType || '-',
      deletionDate: item.deletionDate || '-',
    }));
  };

  // 전체 성적 요약 데이터를 테이블 형식으로 변환하는 함수
  const transformSummaryDataToTableRows = (
    summaryData: GradeSummaryResponse
  ) => {
    if (!summaryData) return [];

    const { creditRow, gpaRow, percentageRow } = summaryData;

    return [
      {
        category: '학점',
        major: creditRow.byCategory['전공']?.toString() || '0.0',
        general: creditRow.byCategory['교양']?.toString() || '0.0',
        multipleMajor: creditRow.byCategory['다전공']?.toString() || '0.0',
        minor: creditRow.byCategory['부전공']?.toString() || '0.0',
        interdisciplinary:
          creditRow.byCategory['연계전공']?.toString() || '0.0',
        teaching: creditRow.byCategory['교직']?.toString() || '0.0',
        other: creditRow.byCategory['기타']?.toString() || '0.0',
        totalAcquired: creditRow.totalEarned.toString(),
        totalApplied: creditRow.totalApplied.toString(),
        totalForfeited: creditRow.totalDropped.toString(),
        totalFN: creditRow.totalFn.toString(),
        perfectScore: '',
      },
      {
        category: '평점평균',
        major: gpaRow.byCategory['전공']?.toFixed(2) || '0.00',
        general: gpaRow.byCategory['교양']?.toFixed(2) || '0.00',
        multipleMajor: gpaRow.byCategory['다전공']?.toFixed(2) || '0.00',
        minor: gpaRow.byCategory['부전공']?.toFixed(2) || '0.00',
        interdisciplinary: gpaRow.byCategory['연계전공']?.toFixed(2) || '0.00',
        teaching: gpaRow.byCategory['교직']?.toFixed(2) || '0.00',
        other: gpaRow.byCategory['기타']?.toFixed(2) || '0.00',
        totalAcquired: gpaRow.totalEarned.toFixed(2),
        totalApplied: '',
        totalForfeited: '',
        totalFN: '',
        perfectScore: gpaRow.fullMark.toFixed(2),
      },
      {
        category: '백분율',
        major: percentageRow.byCategory['전공']?.toFixed(1) || '0.0',
        general: percentageRow.byCategory['교양']?.toFixed(1) || '0.0',
        multipleMajor: percentageRow.byCategory['다전공']?.toFixed(1) || '0.0',
        minor: percentageRow.byCategory['부전공']?.toFixed(1) || '0.0',
        interdisciplinary:
          percentageRow.byCategory['연계전공']?.toFixed(1) || '0.0',
        teaching: percentageRow.byCategory['교직']?.toFixed(1) || '0.0',
        other: percentageRow.byCategory['기타']?.toFixed(1) || '0.0',
        totalAcquired: percentageRow.totalEarned.toString(),
        totalApplied: '',
        totalForfeited: '',
        totalFN: '',
        perfectScore: percentageRow.fullMark.toString(),
      },
      {
        category: '전체석차',
        major: summaryData.overallRank || '',
        general: '',
        multipleMajor: '',
        minor: '',
        interdisciplinary: '',
        teaching: '',
        other: '',
        totalAcquired: '',
        totalApplied: '',
        totalForfeited: '',
        totalFN: '',
        perfectScore: '',
      },
    ];
  };

  // 데이터가 없는 경우 기본 데이터 사용
  if (!allGradesData || !gradeSummaryData) {
    return (
      <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
        <div className="text-center py-8">
          <p>데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const summaryTableRows = transformSummaryDataToTableRows(gradeSummaryData);

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      {/* 학기별 성적 테이블들 */}
      {allGradesData.semesters &&
        Array.isArray(allGradesData.semesters) &&
        allGradesData.semesters.map((semester, index: number) => {
          const semesterText = `${semester.year}년 ${
            semester.semester === 'FIRST'
              ? '1'
              : semester.semester === 'SECOND'
              ? '2'
              : semester.semester === 'SUMMER'
              ? '여름'
              : '겨울'
          }학기`;

          const semesterTableRows = transformAllGradesDataToTableRows(
            semester.courses || []
          );

          return (
            <div key={index} className={index > 0 ? 'mt-8' : ''}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
                <TitleSection title={semesterText} />
                <SemesterGradeSummary summaryData={semester.summary} />
              </div>
              <GradeTable
                columns={TOTALTERM_GRADE_COLUMNS}
                rows={semesterTableRows}
                headerBgColor="bg-beige"
              />
            </div>
          );
        })}

      {/* 전체 요약 테이블 */}
      <TotalGradeTable columns={TOTAL_GRADE_COLUMNS} rows={summaryTableRows} />
    </div>
  );
}

export default TotalGrade;
