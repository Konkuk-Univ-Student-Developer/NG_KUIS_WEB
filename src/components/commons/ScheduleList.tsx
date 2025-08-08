import ScheduleListItem from "./ScheduleListItem";

// 목록 아이템의 타입 정의
interface ScheduleItem {
  title: string;
  date: string;
}

interface ScheduleListProps {
  items: ScheduleItem[];
}

const ScheduleList = ({ items }: ScheduleListProps) => {
  return (
    <div className="bg-beige rounded-[10px] py-5 px-6 space-y-4 md:rounded-2xl md:px-9 md:py-7 md:space-y-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center gap-x-4 text-sm font-normal leading-[1.2] tracking-[-0.28px] md:text-xl md:font-normal md:leading-[2.0] md:tracking-[-0.4]"
        >
          <ScheduleListItem title={item.title} date={item.date} />
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;
