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

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices(params);
        setNotices(data.content);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
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
    setCategory,
    setSearchQuery,
    handleToggleBookmark,
  };
};
