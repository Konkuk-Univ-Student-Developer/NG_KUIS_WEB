interface ScheduleListItemProps {
  title: string;
  date: string;
}

const ScheduleListItem = ({ title, date }: ScheduleListItemProps) => {
  return (
    <>
      <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </span>
      <span className="flex-shrink-0 text-darkgreen text-sm font-semibold leading-[1.2] tracking-[-0.28px] md:text-xl md:font-bold md:leading-[2.0]">
        {date}
      </span>
    </>
  );
};

export default ScheduleListItem;
