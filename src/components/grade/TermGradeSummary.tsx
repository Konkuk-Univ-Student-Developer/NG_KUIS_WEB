export interface TermGradeSummaryData {
  avgGpa: number;
  gpaScale: number;
  earnedCredits: number;
  attemptedCredits: number;
  academicWarning: string;
  honors: string;
}

interface TermGradeSummaryProps {
  avgGpa?: number;
  gpaScale?: number;
  earnedCredits?: number;
  attemptedCredits?: number;
  academicWarning?: string;
  honors?: string;
}

const TermGradeSummary = ({
  avgGpa = 4.5,
  gpaScale = 4.5,
  earnedCredits = 18,
  attemptedCredits = 18,
  academicWarning = 'N',
  honors = 'Y',
}: TermGradeSummaryProps) => {
  return (
    <div className="mt-4 md:mt-0 md:flex-1">
      <div className="rounded-[15px] bg-beige p-4 md:rounded-[20px] md:py-6 md:px-8">
        <div className="grid grid-cols-3 md:gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-darkgray text-sm md:text-base">
              평점 평균
            </span>
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
            <span className="text-darkgray text-sm md:text-base">
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
            <span className="text-darkgray text-sm md:text-base">
              학사경고 / 우등구분
            </span>
            <div className="flex items-end gap-2">
              <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                {academicWarning}
              </span>
              <span className="text-darkgray text-base md:text-lg">
                / {honors}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermGradeSummary;
