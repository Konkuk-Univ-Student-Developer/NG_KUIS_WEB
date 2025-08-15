import type { InfoTagProps } from "@/types/graduation";

function InfoTag ({
  label,
  widthClass,
}: InfoTagProps) {

  return (
    <div
      className={`relative flex justify-center items-center px-3 py-2 ${widthClass}`}
    >
      <div className="absolute inset-0 bg-beige rounded-xl z-0"></div>
      <span className="relative z-10 text-center text-black text-sm font-semibold leading-tight">
        {label}
      </span>
    </div>
  );
}; 

export default InfoTag;