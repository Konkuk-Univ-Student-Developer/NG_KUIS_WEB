import { http } from "@/api/fetch";
import type { NoticeData } from "@/types/notice";

export interface HomeDataResponse {
  nickname: string;
  noticeResponses: NoticeData[];
}

export const getHomeData = async (): Promise<HomeDataResponse> => {
  const { response } = await http.get<HomeDataResponse>(`/api/v1/home`);
  return response;
};

export interface CalendarItem {
  title: string;
  dday: string;
}

export type CalendarResponse = CalendarItem[];

export const getCalendars = async (): Promise<CalendarResponse> => {
  const { response } = await http.get<CalendarResponse>(`/api/v1/calendars`);
  return response;
};
