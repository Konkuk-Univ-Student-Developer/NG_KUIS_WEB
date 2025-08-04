import React from "react";
import { Link } from "react-router-dom";
import { TopBar } from "@/commons";
import BookIcon from "@/assets/icon/ic_book.svg";
import CalendarIcon from "@/assets/icon/ic_calendar.svg";
import GraduationIcon from "@/assets/icon/ic_graduation.svg";
import SearchIcon from "@/assets/icon/ic_search.svg";
import EditIcon from "@/assets/icon/ic_edit.svg";
import MagnifierIcon from "@/assets/icon/ic_magnifier.svg";

const HomePage: React.FC = () => {
  const isLoggedIn = false; // TODO: Replace with actual login state
  const userName = "김건국";

  const quickMenuItems = [
    {
      icon: <img src={BookIcon} />,
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
      icon: <img src={CalendarIcon} />,
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
      icon: <img src={GraduationIcon} />,
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
      icon: <img src={GraduationIcon} />,
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

      <main className="mx-auto px-5 py-6 md:px-24 md:py-13 flex flex-col gap-8 md:gap-18">
        {/* Greeting */}
        <section className="text-left md:text-center">
          <h2 className="text-black">
            {isLoggedIn ? (
              <div className="flex flex-col md:inline-block">
                <span className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] md:text-desktop-extrabig-bold">
                  {userName}
                  <span className="text-lg font-normal leading-[1.4] tracking-[-0.36px] text-black md:text-desktop-extrabig-bold">
                    {" 님,"}
                  </span>
                </span>
                <span className="text-lg font-normal leading-[1.4] tracking-[-0.36px] md:hidden">
                  안녕하세요.
                </span>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:gap-1 md:justify-center">
                <div className="inline-block">
                  <Link
                    to="/login"
                    className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] underline md:no-underline md:text-desktop-extrabig-bold"
                  >
                    로그인
                  </Link>
                  <span className="text-lg font-normal leading-[1.4] tracking-[-0.36px]">
                    이
                  </span>
                </div>
                <span className="text-lg font-normal leading-[1.4] tracking-[-0.36px] md:text-desktop-extrabig-bold">
                  필요합니다
                </span>
              </div>
            )}
          </h2>

          <p className="mt-2 text-lg font-normal leading-[1.4] tracking-[-0.36px] text-black md:text-desktop-big hidden md:block">
            안녕하세요. 건국대학교 학사정보시스템입니다.
          </p>

          <div className="mt-4 md:mt-6 flex items-center justify-center w-full">
            <div className="relative w-full max-w-180 md:max-w-233">
              <input
                type="text"
                placeholder="이번 학기 성적 확인하기"
                className="w-full py-4 pl-6 text-sm font-normal leading-[1.2] tracking-[-0.28px] rounded-2xl bg-beige text-black placeholder-darkgray md:py-2 md:border md:border-darkgray md:desktop-small_regular focus:outline-none"
              />
              <img
                src={SearchIcon}
                alt="검색"
                className="w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-darkgray cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Quick Menu */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] md:desktop-extrabig_bold">
              QUICK MENU
            </h3>
            <img src={EditIcon} className="size-6 cursor-pointer" />
          </div>

          <div className="flex justify-between gap-3">
            {quickMenuItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="flex-1 bg-beige relative w-full md:max-w-65 h-21 rounded-[10px] md:rounded-2xl md:h-37"
              >
                <div className="absolute size-6 top-2 left-2 md:top-3 md:left-6 md:size-11">
                  {item.icon}
                </div>
                <span className="absolute right-2 bottom-2 text-sm font-semibold leading-[1.2] tracking-[-0.28px] text-right text-black md:right-4 md:bottom-4 md:desktop-medium_bold">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 생활 & 공지 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 건국생활 한눈에 보기 */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px]">
                건국생활 한눈에 보기
              </h3>
              <img src={MagnifierIcon} className="size-6 cursor-pointer" />
            </div>

            <div className="bg-beige rounded-[10px] py-5 px-6 space-y-4">
              {schoolLifeItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-x-4 text-sm font-normal leading-[1.2] tracking-[-0.28px]"
                >
                  <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                    {item.title}
                    {item.title}
                  </span>
                  <span className="flex-shrink-0 text-darkgreen text-sm font-semibold leading-[1.2] tracking-[-0.28px]">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 공지사항 */}
        <section>
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px]">
                공지사항
              </h3>
              <img src={MagnifierIcon} className="size-6 cursor-pointer" />
            </div>

            <div className="divide-y">
              {noticeItems.map((item, i) => (
                <div
                  key={i}
                  className="py-2 text-sm font-normal leading-[1.2] tracking-[-0.28px] cursor-pointer"
                >
                  {item.title}
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
