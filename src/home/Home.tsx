import { useState } from "react";
import { TopBar } from "@/commons";
import EditIcon from "@/assets/icon/ic_edit.svg?react";
import MagnifierIcon from "@/assets/icon/ic_magnifier.svg?react";
import TitleSection from "@/components/commons/TitleSection";
import QuickMenu from "@/components/home/QuickMenu";
import SearchMain from "@/components/commons/SearchMain";
import ScheduleList from "@/components/home/ScheduleList";
import NoticeList from "@/components/home/NoticeList";
import Tab from "@/components/commons/Tab";
import HomeHeader from "@/components/home/HomeHeader";
import {
  USER_INFO,
  QUICK_MENU_ITEMS,
  SCHOOL_LIFE_ITEMS,
  NOTICE_TABS,
  NOTICE_ITEMS,
} from "@/constants/HomeConstants";

const HomePage = () => {
  const { isLoggedIn, userName } = USER_INFO;
  const [activeTab, setActiveTab] = useState("전체");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen">
      <TopBar
        isLoggedIn={isLoggedIn}
        onMenuClick={() => console.log("메뉴 클릭")}
        onLoginClick={() => console.log("로그인 클릭")}
        onProfileClick={() => console.log("프로필 클릭")}
      />

      <main className="mx-auto px-5 py-6 md:px-24 md:py-13 flex flex-col gap-8 md:gap-18 md:max-w-350">
        {/* Greeting */}
        <section className="text-left md:text-center">
          <HomeHeader isLoggedIn={isLoggedIn} userName={userName} />

          <div className="mt-4 md:mt-6 flex w-full items-center justify-center">
            <SearchMain
              value={searchValue}
              onChange={setSearchValue}
              placeholder="이번 학기 성적 확인하기"
            />
          </div>
        </section>

        {/* Quick Menu */}
        <section>
          <TitleSection
            title="QUICK MENU"
            icon={<EditIcon className="size-6 cursor-pointer md:size-12" />}
            path="/quick-menu"
          />

          <div className="flex justify-between gap-3">
            {QUICK_MENU_ITEMS.map((item, i) => (
              <QuickMenu
                key={i}
                icon={item.icon}
                label={item.label}
                path={item.path}
              />
            ))}
          </div>
        </section>

        {/* 생활 & 공지 */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 md:gap-12">
          {/* 건국생활 한눈에 보기 */}
          <div>
            <TitleSection
              title="건국생활 한눈에 보기"
              icon={
                <MagnifierIcon className="size-6 cursor-pointer md:size-12" />
              }
              path="/quick-menu"
            />
            <ScheduleList items={SCHOOL_LIFE_ITEMS} />
          </div>

          {/* 공지사항 */}
          <div>
            <TitleSection
              title="공지사항"
              icon={
                <MagnifierIcon className="size-6 cursor-pointer md:size-12" />
              }
              path="/quick-menu"
            />

            <div className="hidden md:block">
              <Tab
                tabs={NOTICE_TABS}
                activeTab={activeTab}
                onTabClick={setActiveTab}
              />
            </div>

            <NoticeList items={NOTICE_ITEMS} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="hidden md:block text-xs text-gray-500 mt-12 space-y-1 text-center">
        <div>
          건국대학교 (05029) 120 Neungdong-ro, Gwangjin-gu, Seoul (05029) KOREA
        </div>
        <div>TEL : 02-450-3114</div>
        <div className="text-gray-400">
          COPYRIGHT &copy; 2025 KONKUK UNIVERSITY STUDENTS DEVELOPER. ALL RIGHTS
          RESERVED
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
