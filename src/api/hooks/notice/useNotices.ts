import {
  getNotices,
  type GetNoticesParams,
  type NoticeList,
} from "@/api/noticeApi";
import { useState, useEffect, useCallback } from "react";

export const useNotices = () => {
  const [params, setParams] = useState<GetNoticesParams>({
    page: 0,
    size: 20,
  });

  const [notices, setNotices] = useState<NoticeList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getNotices(params);
        setNotices(data.content);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
        setError("공지사항을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
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

  // 즐겨찾기(북마크) 상태 토글 함수
  const handleToggleBookmark = useCallback((id: number) => {
    setNotices((currentNotices) =>
      currentNotices.map((notice) =>
        notice.id === id
          ? { ...notice, isBookMarked: !notice.isBookMarked }
          : notice
      )
    );
  }, []);

  return {
    notices,
    isLoading,
    error,
    setCategory,
    setSearchQuery,
    handleToggleBookmark,
  };
};
