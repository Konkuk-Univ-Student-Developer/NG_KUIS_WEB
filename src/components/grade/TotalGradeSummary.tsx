import { TOTAL_SUMMARY_DATA } from '@/constants/GradeConstants';
import type { GradeSummaryCard } from '@/types/grade';

interface TotalGradeSummaryCardProps {
  card: GradeSummaryCard;
}

function TotalGradeSummaryCard({ card }: TotalGradeSummaryCardProps) {
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

function TotalGradeSummary() {
  return (
    <div className="flex justify-start md:justify-end">
      <div className="grid grid-cols-4 md:flex md:flex-row items-center py-4 px-6 md:py-6 md:px-8 gap-4 md:gap-8 bg-beige rounded-[15px] w-full md:w-auto">
        {TOTAL_SUMMARY_DATA.cards.map((card) => (
          <TotalGradeSummaryCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}

export default TotalGradeSummary;