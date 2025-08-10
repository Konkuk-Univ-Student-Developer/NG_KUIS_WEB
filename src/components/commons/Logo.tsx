interface LogoProps {
  onClick?: () => void;
}

const Logo : React.FC<LogoProps> = ({
  onClick
}) => {
  return (
    <div className="flex cursor-pointer items-center gap-x-2" onClick={onClick}>
      <img
        src="src/assets/img/img_konkuk.jpg"
        alt="Konkuk University Logo"
        className="w-8 h-8"
      />
      <div>
        <span className="block text-xs font-semibold leading-tight text-black">
          KONKUK
        </span>
        <span className="block text-xs font-normal leading-tight text-black">
          UNIVERSITY
        </span>
      </div>
    </div>
  );
};

export default Logo;
