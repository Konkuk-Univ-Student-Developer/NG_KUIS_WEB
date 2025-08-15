import { http } from "@/api/fetch";

export interface NoticeList {
  id: number;
  categoryId: number;
  categoryName: string;
  title: string;
  link: string;
  pubDate: string;
  author: string;
  description: string;
  isBookMarked: boolean;
}

export interface GetNoticesParams {
  category?: number;
  page?: number;
  size?: number;
  title?: string;
}

export interface NoticeResponse {
  content: NoticeList[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export const getNotices = async (
  params: GetNoticesParams
): Promise<NoticeResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  ) as Record<string, string>;

  const { response } = await http.get<NoticeResponse>(
    `/api/v1/notices`,
    cleanParams
  );
  return response;
};
