import NoticeRow from "./NoticeRow";
import NoticeTitle from "./NoticeTitle";
import type { NoticeData } from "@/types/notice";

interface NoticeListProps {
  notices: NoticeData[];
  onToggleBookmark: (id: number, isBookmarked: boolean) => void;
}

const NoticeList = ({ notices, onToggleBookmark }: NoticeListProps) => {
  return (
    <div>
      <NoticeTitle />
      <div>
        {notices.length > 0 ? (
          notices.map((notice) => (
            <NoticeRow
              key={notice.id}
              notice={{
                id: notice.id,
                title: notice.title,
                createdAt: notice.pubDate,
                isFavorite: notice.isBookMarked,
                link: notice.link,
              }}
              onToggleFavorite={onToggleBookmark}
            />
          ))
        ) : (
          <div className="text-center py-10 text-darkgray">
            해당하는 공지사항이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
