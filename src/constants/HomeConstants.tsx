import BookIcon from "@/assets/icon/ic_book.svg?react";
import CalendarIcon from "@/assets/icon/ic_calendar.svg?react";
import GraduationIcon from "@/assets/icon/ic_graduation.svg?react";

export const USER_INFO = {
  isLoggedIn: false,
  userName: "김건국",
};

export const QUICK_MENU_ITEMS = [
  {
    icon: <BookIcon className="size-6 md:size-11" />,
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
    icon: <CalendarIcon className="size-6 md:size-11" />,
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
    icon: <GraduationIcon className="size-6 md:size-11" />,
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
    icon: <GraduationIcon className="size-6 md:size-11" />,
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

export const SCHOOL_LIFE_ITEMS = [
  { title: "2학기 수강신청 시작", date: "D-3" },
  { title: "여름 계절학기 성적 확인", date: "D-5" },
  { title: "총장배 축구대회 결승전", date: "D-7" },
];

export const NOTICE_TABS = [
  "전체",
  "학사",
  "장학",
  "취창업",
  "국제",
  "학생",
  "입학",
  "일반",
];

export const NOTICE_ITEMS = [
  { title: "2025년 2학기 조기 졸업 신청 안내", date: "2025.06.28" },
  { title: "2025년 하계방학 단축근무 안내", date: "2025.06.25" },
  { title: "2025학년도 1학기 성적 열람 및 정정 안내", date: "2025.06.21" },
];
