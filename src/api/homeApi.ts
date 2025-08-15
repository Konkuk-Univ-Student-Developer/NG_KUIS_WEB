import { http } from "@/api/fetch";
import type { NoticeResponse } from "@/api/noticeApi";

export interface HomeDataResponse {
  nickname: string;
  noticeResponses: NoticeResponse[];
}

export const getHomeData = async (): Promise<HomeDataResponse> => {
  const { response } = await http.get<HomeDataResponse>(`/api/v1/home`);
  return response;
};
