interface NoticeItem {
  title: string;
  date: string;
}

interface NoticeListProps {
  items: NoticeItem[];
}

const NoticeList = ({ items }: NoticeListProps) => {
  return (
    <>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-center border-b-[0.2px] border-b-darkgray py-2 md:py-3"
        >
          <div className="text-sm font-normal leading-[1.2] tracking-[-0.28px] cursor-pointer min-w-0 whitespace-nowrap overflow-hidden text-ellipsis md:text-xl md:font-normal md:leading-[2.0]">
            {item.title}
          </div>
          <div className="hidden md:block md:text-xl md:font-normal md:leading-[2.0] md:text-coolgray">
            {item.date}
          </div>
        </div>
      ))}
    </>
  );
};

export default NoticeList;
