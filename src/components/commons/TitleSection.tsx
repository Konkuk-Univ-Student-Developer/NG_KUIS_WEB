import { Link } from "react-router-dom";

interface BaseTitleSectionProps {
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

interface TitleWithLink extends BaseTitleSectionProps {
  path: string;
  onClick?: never;
}

interface TitleWithAction extends BaseTitleSectionProps {
  path?: never;
  onClick?: () => void;
}

type TitleSectionProps = TitleWithLink | TitleWithAction;

const TitleSection = (props: TitleSectionProps) => {
  const { title, icon, iconPosition = "right" } = props;

  const IconWrapper = props.path ? (
    <Link to={props.path} className="cursor-pointer">
      {icon}
    </Link>
  ) : (
    <button type="button" onClick={props.onClick} className="cursor-pointer">
      {icon}
    </button>
  );

  const TitleText = (
    <h3 className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] md:text-3xl md:font-bold md:leading-[2.0] md:tracking-[-0.72]">
      {title}
    </h3>
  );

  if (iconPosition === "left") {
    return (
      <div className="flex items-center gap-x-2 md:gap-x-3 mb-5">
        {IconWrapper}
        {TitleText}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-5">
      {TitleText}
      {IconWrapper}
    </div>
  );
};

export default TitleSection;
