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
