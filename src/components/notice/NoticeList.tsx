import { useState } from "react";
import NoticeRow from "./NoticeRow";
import NoticeTitle from "./NoticeTitle";

interface Notice {
  id: number;
  title: string;
  createdAt: string; // "2025-02-16" 형태의 날짜 문자열
  isFavorite: boolean;
}

const NoticeList = () => {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 512,
      title: "2025년 8월 졸업 예정자 졸업유예 신청 안내",
      createdAt: "2025-08-10",
      isFavorite: true,
    },
    {
      id: 511,
      title: "2025학년도 2학기 재입학 신청 안내입니다.",
      createdAt: "2025-08-09",
      isFavorite: false,
    },
    {
      id: 510,
      title:
        "장학금 신청 마감 D-3장학금 신청 마감 D-3장학금 신청 마감 D-3장학금 신청 마감 D-3",
      createdAt: "2025-08-07",
      isFavorite: true,
    },
  ]);

  const handleToggleFavorite = (id: number) => {
    setNotices((currentNotices) =>
      currentNotices.map((notice) =>
        notice.id === id
          ? { ...notice, isFavorite: !notice.isFavorite }
          : notice
      )
    );
  };

  return (
    <div>
      <NoticeTitle />
      <div>
        {notices.map((notice) => (
          <NoticeRow
            key={notice.id}
            notice={notice}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default NoticeList;
