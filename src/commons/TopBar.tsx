import React from "react";
import useAuthStore from "@/stores/authStore";
import Logo from "@/commons/Logo";

import MenuIcon from "@/assets/icon/ic_hamburger.svg?react";
import UserIcon from "@/assets/icon/ic_user.svg?react";
import Button from "./Button";
import SessionTimer from "./Timer";
import useSidebarStore from "@/stores/sidebarStore";

const TopBar: React.FC = () => {
  const { isLoggedIn, login } = useAuthStore();
  const { toggleSidebar } = useSidebarStore();
  
  const navLinks = ["학사", "대학원", "오픈 데이터"];

  return (
    <header className="relative z-50 w-full bg-white px-8 shadow-[0px_5px_4px_0px_rgba(0,0,0,0.1)] sm:px-6">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between md:h-16">
        <div className="flex items-center gap-x-12">
          <button type="button" className="md:hidden" onClick={toggleSidebar}>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="hidden md:block">
            <Logo />
          </div>
          <nav className="hidden md:flex items-center gap-x-12">
            {navLinks.map((link) =>
              link === "학사" ? (
                <button
                  type="button"
                  key={link}
                  onClick={toggleSidebar}
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

        <div className="md:hidden">
          <Logo />
        </div>

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
