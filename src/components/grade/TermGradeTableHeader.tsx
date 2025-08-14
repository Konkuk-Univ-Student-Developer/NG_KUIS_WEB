const TermGradeTableHeader = () => {
  return (
    <div className="bg-beige px-4 py-3 border-b border-lightgray min-w-max md:min-w-full">
      <div className="grid grid-cols-10 gap-2 text-mobile-small-bold text-black font-bold md:gap-1">
        <div className="min-w-[48px] md:min-w-0 text-center">No</div>
        <div className="min-w-[100px] md:min-w-0 text-center">학수번호</div>
        <div className="min-w-[90px] md:min-w-0 text-center">과목번호</div>
        <div className="min-w-[160px] md:min-w-0 text-center">과목명</div>
        <div className="min-w-[90px] md:min-w-0 text-center">담당교수</div>
        <div className="min-w-[60px] md:min-w-0 text-center">학점</div>
        <div className="min-w-[80px] md:min-w-0 text-center">이수구분</div>
        <div className="min-w-[60px] md:min-w-0 text-center">등급</div>
        <div className="min-w-[110px] md:min-w-0 text-center">성적평가방법</div>
        <div className="min-w-[110px] md:min-w-0 text-center">
          상세성적 보기
        </div>
      </div>
    </div>
  );
};

export default TermGradeTableHeader;
