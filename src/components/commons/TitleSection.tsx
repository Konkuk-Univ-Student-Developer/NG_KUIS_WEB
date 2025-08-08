import { Link } from "react-router-dom";

interface TitleSectionProps {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const TitleSection = ({ title, icon, path }: TitleSectionProps) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] md:text-4xl md:font-bold md:leading-[2.0] md:tracking-[-0.72]">
        {title}
      </h3>
      <Link to={path} className="cursor-pointer">
        {icon}
      </Link>
    </div>
  );
};

export default TitleSection;
