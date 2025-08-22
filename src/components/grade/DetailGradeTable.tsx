import {
  cellBaseClasses,
  headerTextClasses,
  valueTextClasses,
} from '@/constants/GradeConstants';
import type { ColumnConfig, RowData } from '@/types/grade';

// 상세 성적 테이블 컬럼 설정
const DETAIL_GRADE_COLUMNS: ColumnConfig[] = [
  {
    id: 'attendance',
    label: '출석',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'midterm',
    label: '중간고사',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'final',
    label: '기말고사',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'assignment',
    label: '과제물',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'project',
    label: '프로젝트',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'quiz',
    label: '퀴즈',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'presentation',
    label: '발표',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'discussion',
    label: '토론',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
  {
    id: 'other',
    label: '기타',
    desktop: { row: 1, widthClass: 'w-1/9' },
  },
];

// 상세 성적 테이블 데이터 (기본값)
const DETAIL_GRADE_ROWS: RowData[] = [
  {
    attendance: '100점',
    midterm: '100점',
    final: '100점',
    assignment: '100점',
    project: '100점',
    quiz: '0점',
    presentation: '0점',
    discussion: '0점',
    other: '0점',
  },
  {
    attendance: '100',
    midterm: '100',
    final: '100',
    assignment: '100',
    project: '100',
    quiz: '0',
    presentation: '0',
    discussion: '0',
    other: '0',
  },
];

interface DetailGradeTableProps {
  isVisible: boolean;
  gradeDetailData?: {
    attendance: number;
    midterm: number;
    finalExam: number;
    assignment: number;
    project: number;
    quiz: number;
    presentation: number;
    discussion: number;
    etc5: number;
  };
}

function DetailGradeTable({
  isVisible,
  gradeDetailData,
}: DetailGradeTableProps) {
  if (!isVisible) return null;

  // API 데이터가 있으면 사용하고, 없으면 기본 데이터 사용
  const detailRows: RowData[] = gradeDetailData
    ? [
        {
          attendance: `${gradeDetailData.attendance}점`,
          midterm: `${gradeDetailData.midterm}점`,
          final: `${gradeDetailData.finalExam}점`,
          assignment: `${gradeDetailData.assignment}점`,
          project: `${gradeDetailData.project}점`,
          quiz: `${gradeDetailData.quiz}점`,
          presentation: `${gradeDetailData.presentation}점`,
          discussion: `${gradeDetailData.discussion}점`,
          other: `${gradeDetailData.etc5}점`,
        },
        {
          attendance: gradeDetailData.attendance.toString(),
          midterm: gradeDetailData.midterm.toString(),
          final: gradeDetailData.finalExam.toString(),
          assignment: gradeDetailData.assignment.toString(),
          project: gradeDetailData.project.toString(),
          quiz: gradeDetailData.quiz.toString(),
          presentation: gradeDetailData.presentation.toString(),
          discussion: gradeDetailData.discussion.toString(),
          other: gradeDetailData.etc5.toString(),
        },
      ]
    : DETAIL_GRADE_ROWS;

  return (
    <div className="w-full px-3 md:px-6 py-4 md:py-6 bg-beige">
      <div
        className="flex flex-col rounded overflow-hidden border border-coolgray"
        style={{
          minWidth: '100%',
          maxWidth: '100%',
        }}
      >
        {/* Header */}
        <div className="flex bg-darkgreen">
          {DETAIL_GRADE_COLUMNS.map((column, index) => (
            <div
              key={index}
              className={`${cellBaseClasses} ${
                column.desktop?.widthClass || 'w-1/6'
              } ${index > 0 ? 'border-l border-coolgray' : ''}`}
            >
              <div className={`${headerTextClasses} text-white`}>
                {column.label}
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        {detailRows.map((row, rowIndex) => {
          const isLastRow = rowIndex === detailRows.length - 1;
          return (
            <div
              key={rowIndex}
              className={`flex border-t border-coolgray ${
                isLastRow ? 'bg-white' : 'bg-beige'
              }`}
            >
              {DETAIL_GRADE_COLUMNS.map((column, cellIndex) => {
                const content = row[column.id] || '';
                return (
                  <div
                    key={cellIndex}
                    className={`${cellBaseClasses} ${
                      column.desktop?.widthClass || 'w-1/6'
                    } ${cellIndex > 0 ? 'border-l border-coolgray' : ''}`}
                  >
                    <div className={valueTextClasses}>{content}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DetailGradeTable;
