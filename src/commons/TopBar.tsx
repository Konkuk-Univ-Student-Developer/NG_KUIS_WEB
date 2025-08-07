import React from "react";
import useAuthStore from "@/stores/authStore";
import Logo from "@/commons/Logo";

import MenuIcon from "@/assets/icon/ic_hamburger.svg?react";
import UserIcon from "@/assets/icon/ic_user.svg?react";
import Button from "./Button";
import SessionTimer from "./Timer";

const TopBar: React.FC = () => {
  const { isLoggedIn, login } = useAuthStore();
  
  const navLinks = ["학사", "대학원", "오픈 데이터"];

  return (
    <header className="w-full bg-white shadow-[0px_5px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="relative flex items-center justify-between h-14 md:h-16 px-4 md:px-24">
        {/* left */}
        <div className="flex items-center gap-x-12">
          {/* [todo] : 모바일 메뉴 버튼 클릭 시 사이드바 열리도록 구현 */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => console.log("Menu clicked")}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="hidden md:block">
            <Logo />
          </div>
          <nav className="hidden md:flex items-center gap-x-12">
            {navLinks.map((link) =>
              link === "학사" ? (
                // [todo] : 학사 버튼 클릭 시 사이드바 열리도록 구현
                <button
                  type="button"
                  key={link}
                  onClick={() => console.log(`${link} clicked`)}
                  className="text-lg font-bold text-font hover:text-darkgreen transition-colors"
                >
                  {link}
                </button>
              ) : (
                <div
                  key={link}
                  className="text-lg font-bold text-font cursor-default"
                >
                  {link}
                </div>
              )
            )}
          </nav>
        </div>

        {/* mobile logo */}
        <div className="md:hidden">
          <Logo />
        </div>

        {/* right */}
        <div className="flex items-center gap-x-3 md:gap-x-6">
          {isLoggedIn ? (
            <>
              <div className="hidden md:block">
                <SessionTimer />
              </div>
              <button type="button" className="flex items-center gap-x-2">
                <UserIcon className="h-8 w-8" />
              </button>
            </>
          ) : (
            <Button
              text="로그인"
              variant="secondary"
              size="extrasmall"
              onClick={login}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
