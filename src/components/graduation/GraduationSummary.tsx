import CreditSummaryGrid from "@/components/graduation/ui/CreditSummaryGrid";
import CreditInfoCard from "@/components/graduation/ui/CreditInfoCard";
import { CREDIT_DATA as creditData } from "@/constants/GraduationConstants";
import TitleSection from "@/components/commons/TitleSection";

const GrduationSummary: React.FC = () => { 
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="기본 정보" />
        <CreditSummaryGrid>
          {creditData.map((data) => (
            <CreditInfoCard
              key={data.title}
              title={data.title}
              value={data.value}
              unit={data.unit}
            />
          ))}
        </CreditSummaryGrid>
      </div>
      <div>
        <TitleSection title="전공 정보" />
      </div>
    </div>
  );
}

export default GrduationSummary;