import { http } from "@/api/fetch";
import {
  type GetNoticesParams,
  type NoticeData,
  type NoticeResponse,
} from "@/types/notice";
import { useState, useEffect, useCallback } from "react";

export const getNotices = async (
  params: GetNoticesParams
): Promise<NoticeResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== ""
    )
  ) as Record<string, string>;

  const { response } = await http.get<NoticeResponse>(`/notices`, cleanParams);
  return response;
};

export const addBookmark = async (noticeId: number): Promise<void> => {
  await http.post(`/notices/${noticeId}/bookmark`);
};

export const deleteBookmark = async (noticeId: number): Promise<void> => {
  await http.delete(`/notices/${noticeId}/bookmark`);
};

export const useNotices = (initialSize: number = 15) => {
  const [params, setParams] = useState<GetNoticesParams>({
    page: 0,
    size: initialSize,
  });

  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices(params);
        setNotices(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("공지사항 조회 실패:", err);
      }
    };

    fetchNotices();
  }, [params]);

  // 카테고리 변경 함수
  const setCategory = useCallback((categoryId: number | undefined) => {
    setParams((prev) => ({ ...prev, categoryId: categoryId, page: 0 }));
  }, []);

  // 검색어 변경 함수
  const setSearchQuery = useCallback((query: string) => {
    setParams((prev) => ({ ...prev, keyword: query || undefined, page: 0 }));
  }, []);

  // 페이지 변경 함수
  const setPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page: page - 1 }));
  }, []);

  // 즐겨찾기(북마크) 상태 토글 함수
  const handleToggleBookmark = useCallback(
    async (id: number, isBookmarked: boolean) => {
      const originalNotices = [...notices];

      const updatedNotices = notices.map((notice) =>
        notice.id === id ? { ...notice, isBookMarked: !isBookmarked } : notice
      );

      updatedNotices.sort((a, b) => {
        if (a.isBookMarked !== b.isBookMarked) {
          return a.isBookMarked ? -1 : 1;
        }
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });

      setNotices(updatedNotices);

      try {
        if (isBookmarked) {
          await deleteBookmark(id);
        } else {
          await addBookmark(id);
        }
      } catch (err) {
        console.error("북마크 토글 실패:", err);
        setNotices(originalNotices);
      }
    },
    [notices]
  );

  return {
    notices,
    totalPages,
    currentPage: params.page ? params.page + 1 : 1,
    setPage,
    setCategory,
    setSearchQuery,
    handleToggleBookmark,
  };
};
