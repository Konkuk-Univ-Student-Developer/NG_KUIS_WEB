import React from "react";

import MenuIcon from "@/assets/icon/ic_hamburger.svg?react";
import UserIcon from "@/assets/icon/ic_user.svg?react";
import ChatbotIcon from "@/assets/icon/ic_chatbot.svg?react";

import Logo from "@/components/commons/Logo";
import Button from "@/components/commons/Button";
import SessionTimer from "@/components/commons/Timer";
import { NAV_LINKS } from "@/constants/TopBarConstants";

import useSidebarStore from "@/stores/sidebarStore";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TopBar: React.FC = () => {
  const { isLoggedIn, login } = useAuthStore();
  const { toggleSidebar } = useSidebarStore();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white px-8 shadow-[0px_5px_4px_0px_rgba(0,0,0,0.1)] sm:px-6">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between md:h-16">
        <div className="flex items-center gap-x-12">
          <button type="button" className="md:hidden" onClick={toggleSidebar}>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="hidden md:block">
            <Logo onClick={() => navigate("/")} />
          </div>
          <nav className="hidden md:flex items-center gap-x-12">
            {NAV_LINKS.map((link) =>
              link.isClickable ? (
                <button
                  type="button"
                  key={link.id}
                  onClick={toggleSidebar}
                  data-sidebar-toggle
                  className="text-lg font-bold text-font hover:text-darkgreen transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <div
                  key={link.id}
                  className="text-lg font-bold text-font cursor-default"
                >
                  {link.label}
                </div>
              )
            )}
          </nav>
        </div>

        <div className="md:hidden">
          <Logo onClick={() => navigate("/")} />
        </div>

        <div className="flex items-center gap-x-3 md:gap-x-6">
          {isLoggedIn ? (
            <>
              <div className="hidden md:block">
                <SessionTimer />
              </div>
              <Link to={"/chat"}>
                <ChatbotIcon />
              </Link>
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
