import type { InfoTagProps } from "@/types/graduation";

function InfoTag ({
  label,
  widthClass,
}: InfoTagProps) {

  return (
    <div
      className={`relative flex justify-center items-center px-3 py-2 ${widthClass} absolute inset-0 bg-beige rounded-xl z-0`}
    >
      <span className="relative z-10 text-center text-black text-sm font-semibold leading-tight truncate">
        {label}
      </span>
    </div>
  );
}; 

export default InfoTag;