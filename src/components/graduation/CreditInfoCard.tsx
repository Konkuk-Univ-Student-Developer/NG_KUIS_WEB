import type { CreditInfoCardProps } from "@/types/graduation";

const CreditInfoCard = ({ title, value, unit }: CreditInfoCardProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-black text-sm md:text-lg font-normal flex-shrink-0 whitespace-nowrap">
        {title}
      </span>
      <div className="flex items-baseline mt-1">
        <span className="text-darkgreen text-lg md:text-3xl font-bold">
          {value}
        </span>
        <span className="text-darkgray text-sm md:text-2xl font-normal ml-1">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default CreditInfoCard;
