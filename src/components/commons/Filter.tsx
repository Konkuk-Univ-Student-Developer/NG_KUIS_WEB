import ArrowDown from "@/assets/icon/ic_arrow_down.svg?react";

interface FilterProps {
  placeholder: string;
  onClick?: () => void;
}

const Filter = ({ placeholder, onClick }: FilterProps) => {
  return (
    <div className="bg-beige rounded-2xl pl-6 pr-4 h-11 flex items-center justify-between w-full md:h-14">
      <span className="text-darkgray text-sm font-normal leading-[1.2] md:text-xl md:leading-[2.0]">
        {placeholder}
      </span>
      <ArrowDown onClick={onClick} className="size-6" />
    </div>
  );
};

export default Filter;
