import BookIcon from '@/assets/icon/ic_book.svg?react';
import CalendarIcon from '@/assets/icon/ic_calendar.svg?react';
import GraduationIcon from '@/assets/icon/ic_graduation.svg?react';

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
    path: '/1140302',
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

    path: "/1130420",

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
    path: '/1170201',
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
    path: '/1150502',
  },
];
