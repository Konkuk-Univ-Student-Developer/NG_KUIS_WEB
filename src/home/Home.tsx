import { useState } from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/commons";
import BookIcon from "@/assets/icon/ic_book.svg?react";
import CalendarIcon from "@/assets/icon/ic_calendar.svg?react";
import GraduationIcon from "@/assets/icon/ic_graduation.svg?react";
import SearchIcon from "@/assets/icon/ic_search.svg?react";
import EditIcon from "@/assets/icon/ic_edit.svg?react";
import MagnifierIcon from "@/assets/icon/ic_magnifier.svg?react";
import TitleSection from "@/components/commons/TitleSection";
import QuickMenu from "@/components/home/QuickMenu";

const HomePage = () => {
  const isLoggedIn = false; // TODO: Replace with actual login state
  const userName = "김건국";

  const [activeTab, setActiveTab] = useState("전체");

  const quickMenuItems = [
    {
      icon: <BookIcon />,
      label: (
        <>
          <span className="block md:hidden">
            성적
            <br />
            조회
          </span>
          <span className="hidden md:block">성적 조회</span>
        </>
      ),
      path: "/grades",
    },
    {
      icon: <CalendarIcon />,
      label: (
        <>
          <span className="block md:hidden">
            강의
            <br />
            시간표
          </span>
          <span className="hidden md:block">
            종합
            <br />
            강의시간표
          </span>
        </>
      ),
      path: "/timetable",
    },
    {
      icon: <GraduationIcon />,
      label: (
        <>
          <span className="block md:hidden">
            졸업
            <br />
            시뮬
          </span>
          <span className="hidden md:block">
            졸업
            <br />
            시뮬레이션
          </span>
        </>
      ),
      path: "/graduation",
    },
    {
      icon: <GraduationIcon />,
      label: (
        <>
          <span className="block md:hidden">
            장학
            <br />
            관리
          </span>
          <span className="hidden md:block">장학 관리</span>
        </>
      ),
      path: "/scholarship",
    },
  ];

  const schoolLifeItems = [
    { title: "2학기 수강신청 시작", date: "D-3" },
    { title: "2학기 수강신청 시작", date: "D-3" },
    { title: "2학기 수강신청 시작", date: "D-3" },
  ];

  const noticeTabs = [
    "전체",
    "학사",
    "장학",
    "취창업",
    "국제",
    "학생",
    "입학",
    "일반",
  ];

  const noticeItems = [
    { title: "2025년 2학기 조기 졸업 신청 안내", date: "2025.06.28" },
    { title: "2025년 2학기 조기 졸업 신청 안내", date: "2025.06.28" },
    { title: "2025년 2학기 조기 졸업 신청 안내", date: "2025.06.28" },
  ];

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

          <div className="mt-4 md:mt-6 flex w-full items-center justify-center">
            <div className="relative w-full max-w-180 md:max-w-233">
              <input
                type="text"
                placeholder="이번 학기 성적 확인하기"
                className="w-full rounded-2xl border-transparent bg-beige py-4 pl-6 text-base font-normal text-black placeholder-darkgray focus:outline-none md:border md:border-darkgray md:bg-white md:py-2 md:text-xl"
              />
              <SearchIcon className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-darkgray" />
            </div>
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
            {quickMenuItems.map((item, i) => (
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

            <div className="bg-beige rounded-[10px] py-5 px-6 space-y-4 md:rounded-2xl md:px-9 md:py-7 md:space-y-6">
              {schoolLifeItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-x-4 text-sm font-normal leading-[1.2] tracking-[-0.28px] md:text-xl md:font-normal md:leading-[2.0] md:tracking-[-0.4]"
                >
                  <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                    {item.title}
                    {item.title}
                  </span>
                  <span className="flex-shrink-0 text-darkgreen text-sm font-semibold leading-[1.2] tracking-[-0.28px] md:text-xl md:font-bold md:leading-[2.0]">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
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
              <nav className="flex items-center gap-x-2 rounded-[6px] bg-beige p-2 overflow-x-auto">
                {noticeTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
          flex-shrink-0
          whitespace-nowrap rounded-[6px] py-2 px-3 text-center text-xl font-normal leading-[2.0]
          transition-all duration-200 focus:outline-none 
          focus-visible:ring-2 focus-visible:ring-darkgreen 
          focus-visible:ring-offset-2 focus-visible:ring-offset-beige 
          ${
            activeTab === tab
              ? "bg-white text-darkgreen shadow md:font-bold"
              : "text-darkgray hover:bg-white/70"
          }
        `}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="divide-y">
              {noticeItems.map((item, i) => (
                <div className="flex justify-between items-center py-2 md:py-3">
                  <div
                    key={i}
                    className="text-sm font-normal leading-[1.2] tracking-[-0.28px] cursor-pointer min-w-0 whitespace-nowrap overflow-hidden text-ellipsis md:text-xl md:font-normal md:leading-[2.0]"
                  >
                    {item.title}
                  </div>
                  <div className="hidden md:block md:text-xl md:font-normal md:leading-[2.0] md:text-coolgray">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
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
