import TitleSection from "@/components/commons/TitleSection";
import ResponsiveListTable from '@/components/graduation/ResponsiveTable';
import CreditInfoCard from "@/components/graduation/CreditInfoCard";
import type { CreditSubSectionProps } from "@/types/graduation";

function CreditSubSection({ id, title, card, table } : CreditSubSectionProps){
  return (
    <div id={id} className="pb-16">
      <div className="flex flex-row justify-between items-end pb-6">
        <TitleSection title={title} />
        <div className="flex flex-row justify-center gap-16 bg-beige rounded-2xl px-8 py-3">
          {card.map((data, index) => (
            <CreditInfoCard
              key={index}
              title={data.title}
              value={data.value}
              unit={data.unit}
            />
          ))}
        </div>
      </div>
      <ResponsiveListTable rows={table.rows} columns={table.columns} />
    </div>
  );
}

export default CreditSubSection;