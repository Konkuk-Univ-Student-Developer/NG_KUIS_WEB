import TitleSection from "../commons/TitleSection";

const CompletedCredits: React.FC = () => {
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="졸업요건별 취득학점 내역" />
      </div>
      <div>
        <TitleSection title="선택 교양 이수" />
      </div>
      <div className="w-full text-center justify-center text-darkgray text-xs">
        ※ 과목별 이수구분 변경 및 성적이의신청 후 변경 된 내용 본인 확인 필수.
        <br />
        (이수구분 오류 및 정정사항 미확인으로 인한 불이익을 받지 않도록 주의)
        <br />※ 교육과정년도에 따라 본인 교양 영역 이수구분 기준이 다르므로
        <br />
        본인 교육과정의 요람 참고.
      </div>
    </div>
  );
}

export default CompletedCredits;