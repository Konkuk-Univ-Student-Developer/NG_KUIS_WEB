import {
  getNotices,
  addBookmark,
  deleteBookmark,
  type GetNoticesParams,
  type NoticeData,
} from "@/api/noticeApi";
import { useState, useEffect, useCallback } from "react";

export const useNotices = () => {
  const [params, setParams] = useState<GetNoticesParams>({
    page: 0,
    size: 15,
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
    setParams((prev) => ({ ...prev, category: categoryId, page: 0 }));
  }, []);

  // 검색어 변경 함수
  const setSearchQuery = useCallback((query: string) => {
    setParams((prev) => ({ ...prev, title: query || undefined, page: 0 }));
  }, []);

  // 페이지 변경 함수
  const setPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page: page - 1 }));
  }, []);

  // 즐겨찾기(북마크) 상태 토글 함수
  const handleToggleBookmark = useCallback(
    async (id: number, isBookmarked: boolean) => {
      const originalNotices = [...notices];

      setNotices((currentNotices) =>
        currentNotices.map((notice) =>
          notice.id === id ? { ...notice, isBookMarked: !isBookmarked } : notice
        )
      );

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
