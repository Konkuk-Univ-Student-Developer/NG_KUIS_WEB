import { Link } from "react-router-dom";

interface QuickMenuProps {
  icon: React.ReactNode;
  label: React.ReactNode;
  path: string;
}

const QuickMenu = ({ icon, label, path }: QuickMenuProps) => {
  return (
    <Link
      to={path}
      className="flex-1 bg-beige relative w-full md:max-w-65 h-21 rounded-[10px] md:rounded-2xl md:h-37"
    >
      <div className="absolute size-6 top-2 left-2 md:top-3 md:left-6 md:size-11">
        {icon}
      </div>
      <span className="absolute right-2 bottom-2 text-sm font-semibold leading-[1.2] tracking-[-0.28px] text-right text-black md:right-4 md:bottom-4 md:text-2xl md:font-bold md:leading-[1.2] md:tracking-[-0.48]">
        {label}
      </span>
    </Link>
  );
};

export default QuickMenu;
