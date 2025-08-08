import React from 'react';
import { Menu, User } from 'lucide-react';

interface TopBarProps {
  isLoggedIn?: boolean;
  onMenuClick?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  isLoggedIn = false,
  onMenuClick,
  onLoginClick,
  onProfileClick,
}) => {
  return (
    <div className="bg-white h-11 w-full relative">
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className="absolute left-[23px] top-[7px] w-8 h-8 flex items-center justify-center"
        aria-label="메뉴"
      >
        <Menu className="w-6 h-4 text-darkgray" />
      </button>

      {/* Logo */}
      <div className="absolute left-36 top-[7px] w-[102px] h-[30px] flex items-center">
        {/* University Logo Placeholder */}
        <div className="w-[30px] h-[30px] bg-lightgray rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-darkgreen rounded-full"></div>
        </div>

        {/* University Text */}
        <div className="ml-[3px] flex flex-col justify-center h-[30px]">
          <p className="text-black text-mobile-logo font-semibold leading-none mb-0">
            KONKUK
          </p>
          <p className="text-black text-mobile-logo font-normal leading-[1.2]">
            UNIVERSITY
          </p>
        </div>
      </div>

      {/* Right Side Button */}
      <div className="absolute right-[23px] top-[7px]">
        {isLoggedIn ? (
          // Profile Button (로그인 상태)
          <button
            onClick={onProfileClick}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="프로필"
          >
            <User className="w-6 h-6 text-darkgray" />
          </button>
        ) : (
          // Login Button (비로그인 상태)
          <button
            onClick={onLoginClick}
            className="h-[25px] w-[54px] bg-beige rounded-lg flex items-center justify-center"
            aria-label="로그인"
          >
            <span className="text-black text-mobile-extrasmall-bold">로그인</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
