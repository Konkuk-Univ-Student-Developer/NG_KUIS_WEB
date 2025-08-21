import { TERM_SUMMARY_DATA } from '@/constants/GradeConstants';
import type { GradeSummaryCard } from '@/types/grade';

interface SemesterGradeSummaryCardProps {
  card: GradeSummaryCard;
}

function SemesterGradeSummaryCard({ card }: SemesterGradeSummaryCardProps) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-black text-sm md:text-base font-normal text-center">
        {card.title}
      </span>
      <div className="flex items-baseline mt-1">
        <span
          className={`text-lg md:text-3xl font-bold   ${
            card.isHighlighted
              ? 'text-darkgreen'
              : 'text-darkgray text-sm md:text-lg font-normal ml-1 pt-2'
          }`}
        >
          {card.value}
        </span>
        {card.unit && (
          <span className="text-darkgray text-sm md:text-lg font-normal ml-1">
            {card.unit}
          </span>
        )}
      </div>
    </div>
  );
}

interface SemesterGradeSummaryProps {
  summaryData?: {
    gpa: number;
    gpaScale: number;
    earnedCredits: number;
    appliedCredits: number;
    registeredCredits?: number; // 추가
    percentage: number;
    rank: string | null;
    totalInSemester: number | null;
  };
}

function SemesterGradeSummary({ summaryData }: SemesterGradeSummaryProps) {
  // API 데이터가 있으면 사용하고, 없으면 기본 데이터 사용
  const cards: GradeSummaryCard[] = summaryData
    ? [
        {
          title: '평점 평균',
          value: summaryData.gpa,
          unit: `/${summaryData.gpaScale}`,
          isHighlighted: true,
        },
        {
          title: '취득/신청학점',
          value: summaryData.earnedCredits,
          unit: `/${
            summaryData.appliedCredits || summaryData.registeredCredits
          }`,
          isHighlighted: true,
        },
        {
          title: '백분율',
          value:
            summaryData.percentage ||
            (summaryData.appliedCredits > 0
              ? Math.round(
                  (summaryData.earnedCredits / summaryData.appliedCredits) * 100
                )
              : 0),
          isHighlighted: true,
        },
        {
          title: '학기별 석차',
          value: summaryData.rank || '-',
          isHighlighted: true,
        },
      ]
    : TERM_SUMMARY_DATA.cards;

  return (
    <div className="flex justify-start md:justify-end">
      <div className="grid grid-cols-4 md:flex md:flex-row items-center py-4 px-6 md:py-6 md:px-8 gap-4 md:gap-8 bg-beige rounded-[15px] w-full md:w-auto">
        {cards.map((card) => (
          <SemesterGradeSummaryCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}

export default SemesterGradeSummary;
