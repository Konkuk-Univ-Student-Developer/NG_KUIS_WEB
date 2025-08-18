const NoticeTitle = () => {
  return (
    <div className="flex gap-4 w-full px-5 items-center border-y h-10 border-coolgray text-center text-sm font-normal leading-[1.2]">
      <div className="flex basis-[15%] justify-center md:basis-[10%]">
        즐겨찾기
      </div>

      <div className="basis-[15%] md:basis-[10%]">번호</div>

      <div className="flex-1 basis-[50%] truncate px-2 pr-4 md:basis-[60%] md:whitespace-normal">
        제목
      </div>

      <div className="basis-[20%]">작성일</div>
    </div>
  );
};

export default NoticeTitle;
