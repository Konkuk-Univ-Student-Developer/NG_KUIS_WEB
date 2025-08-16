import type { NoticeData } from "@/types/notice";

export interface HomeDataResponse {
  nickname: string;
  noticeResponses: NoticeData[];
}

export interface CalendarItem {
  title: string;
  dday: string;
}

export type CalendarResponse = CalendarItem[];
