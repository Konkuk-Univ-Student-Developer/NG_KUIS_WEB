import type { NoticeData } from "@/types/notice";
import { formatDate } from "@/utils/date";

interface NoticeListProps {
  items: NoticeData[];
}

const NoticeList = ({ items }: NoticeListProps) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b-[0.2px] border-b-darkgray py-2 md:py-3"
        >
          <div className="text-sm font-normal leading-[1.2] tracking-[-0.28px] cursor-pointer min-w-0 whitespace-nowrap overflow-hidden text-ellipsis md:text-xl md:font-normal md:leading-[2.0]">
            {item.title}
          </div>
          <div className="hidden md:block md:text-xl md:font-normal md:leading-[2.0] md:text-coolgray">
            {formatDate(item.pubDate, "full")}
          </div>
        </div>
      ))}
    </>
  );
};

export default NoticeList;
