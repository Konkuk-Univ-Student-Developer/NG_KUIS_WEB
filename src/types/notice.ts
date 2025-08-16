export interface NoticeData {
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
  categoryId?: number;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface NoticeResponse {
  content: NoticeData[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
