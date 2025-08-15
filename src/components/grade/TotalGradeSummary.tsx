export interface TotalGradeSummaryData {
  avgGpa: number;
  gpaScale: number;
  earnedCredits: number;
  attemptedCredits: number;
  percentage: number;
  rank: number;
  allStudents: number;
}

interface TotalGradeSummaryProps {
  avgGpa?: number;
  gpaScale?: number;
  earnedCredits?: number;
  attemptedCredits?: number;
  percentage?: number;
  rank?: number;
  allStudents?: number;
}

const TotalGradeSummary = ({
  avgGpa = 4.5,
  gpaScale = 4.5,
  earnedCredits = 18,
  attemptedCredits = 18,
  percentage = 100.0,
  rank = 1,
  allStudents = 171,
}: TotalGradeSummaryProps) => {
  return (
    <div className="mt-4 md:mt-0 md:flex-1 md:min-w-[800px]">
      <div className="rounded-[15px] bg-beige p-4 md:rounded-[20px] md:py-6 md:px-9">
        <div className="grid grid-cols-4 md:gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm md:text-base">평점 평균</span>
            <div className="flex items-end gap-1">
              <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                {avgGpa}
              </span>
              <span className="text-darkgray text-base md:text-lg">
                / {gpaScale}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm md:text-base">
              취득학점 / 신청학점
            </span>
            <div className="flex items-end gap-1">
              <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                {earnedCredits}
              </span>
              <span className="text-darkgray text-base md:text-lg">
                / {attemptedCredits}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm md:text-base">백분율</span>
            <div className="flex items-end gap-1">
              <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                {percentage}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-black text-sm md:text-base">학기별 석차</span>
            <div className="flex items-end gap-1">
              <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                {rank}
              </span>
              <span className="text-darkgray text-base md:text-lg">
                / {allStudents}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalGradeSummary;
