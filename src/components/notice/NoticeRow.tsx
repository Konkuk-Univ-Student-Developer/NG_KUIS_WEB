import { Star } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { formatDate } from "@/utils/date";

interface Notice {
  id: number;
  title: string;
  createdAt: string; // "2025-02-16" 형태의 날짜 문자열
  isFavorite: boolean;
}

interface NoticeRowProps {
  notice: Notice;
  onToggleFavorite: (id: number) => void;
}

const NoticeRow = ({ notice, onToggleFavorite }: NoticeRowProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex gap-4 w-full px-5 items-center border-b-[0.5px] h-10 border-coolgray text-center text-sm font-normal leading-[1.2]">
      <div
        className="flex basis-[15%] justify-center md:basis-[10%] cursor-pointer"
        onClick={() => onToggleFavorite(notice.id)}
      >
        <Star
          className={`size-5 ${
            notice.isFavorite ? "text-orange" : "text-gray-300"
          }`}
          fill={notice.isFavorite ? "currentColor" : "none"}
        />
      </div>

      <div className="basis-[15%] md:basis-[10%]">{notice.id}</div>

      <div className="flex-1 basis-[50%] cursor-pointer truncate px-2 pr-4 hover:underline md:basis-[60%]">
        {notice.title}
      </div>

      <div className="basis-[20%]">
        {formatDate(notice.createdAt, isDesktop ? "full" : "short")}
      </div>
    </div>
  );
};

export default NoticeRow;
