import { Link } from "react-router-dom";

interface HomeHeaderProps {
  isLoggedIn: boolean;
  userName: string;
}

const HomeHeader = ({ isLoggedIn, userName }: HomeHeaderProps) => {
  return (
    <>
      <h2 className="text-black">
        {isLoggedIn ? (
          <div className="flex flex-col md:inline-block">
            <span className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] md:text-4xl md:font-bold md:leading-[2.0] md:tracking-[-0.72]">
              {userName}
              <span className="text-lg font-normal leading-[1.4] tracking-[-0.36px] text-black md:text-4xl md:font-bold md:leading-[2.0] md:tracking-[-0.72]">
                {" 님,"}
              </span>
            </span>
            <span className="text-lg font-normal leading-[1.4] tracking-[-0.36px] md:hidden">
              안녕하세요.
            </span>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:gap-2 md:justify-center">
            <div className="inline-block">
              <Link
                to="/login"
                className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] border-b-2 border-darkgreen md:text-4xl md:font-bold md:leading-[2.0] md:tracking-[-0.72]"
              >
                로그인
              </Link>
              <span className="text-lg font-normal leading-[1.4] tracking-[-0.36px] md:text-4xl md:font-bold md:leading-[2.0] md:tracking-[-0.72]">
                이
              </span>
            </div>
            <span className="text-lg font-normal leading-[1.4] tracking-[-0.36px] md:text-4xl md:font-bold md:leading-[2.0] md:tracking-[-0.72]">
              필요합니다
            </span>
          </div>
        )}
      </h2>

      <p className="text-lg font-normal leading-[1.4] tracking-[-0.36px] text-black hidden md:block md:text-[28px] md:font-normal md:leading-[2.0] md:tracking-[-0.56]">
        안녕하세요. 건국대학교 학사정보시스템입니다.
      </p>
    </>
  );
};

export default HomeHeader;
