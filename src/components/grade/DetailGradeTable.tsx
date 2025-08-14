import type { DetailGrade } from './TermGradeTable';

interface DetailGradeTableProps {
  detailGrade: DetailGrade;
}

const DetailGradeTable = ({ detailGrade }: DetailGradeTableProps) => {
  const categories = [
    '출석',
    '중간고사',
    '기말고사',
    '과제물',
    '프로젝트',
    '퀴즈',
    '발표',
    '토론',
    '기타5',
  ] as const;

  return (
    <div className="border-b border-lightgray bg-gray-50 min-w-[1704px] md:min-w-full">
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-lg overflow-hidden border border-lightgray">
          {/* Header */}
          <div className="bg-darkgreen text-white px-4 py-2 min-w-max md:min-w-full">
            <div className="grid grid-cols-9 gap-2 text-mobile-small-bold font-bold text-center">
              {categories.map((category) => (
                <div key={category} className="min-w-[90px] md:min-w-0">
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* 만점 기준 */}
          <div className="bg-beige px-4 py-2 border-b border-lightgray min-w-max md:min-w-full">
            <div className="grid grid-cols-9 gap-2 text-mobile-small text-center">
              {categories.map((category) => (
                <div
                  key={`${category}-max`}
                  className="text-black min-w-[90px] md:min-w-0"
                >
                  {detailGrade[category].max}점
                </div>
              ))}
            </div>
          </div>

          {/* 학생 점수 */}
          <div className="bg-white px-4 py-2 min-w-max md:min-w-full">
            <div className="grid grid-cols-9 gap-2 text-mobile-small text-center">
              {categories.map((category) => (
                <div
                  key={`${category}-score`}
                  className="text-black min-w-[90px] md:min-w-0"
                >
                  {detailGrade[category].score}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGradeTable;
