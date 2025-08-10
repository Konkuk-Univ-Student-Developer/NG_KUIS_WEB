import TitleSection from "@/components/commons/TitleSection";

const GraduationAudit: React.FC = () => {
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="학사 졸업 요건 충족 여부" />
      </div>
      <div>
        <TitleSection title="전공별 졸업 요건 충족 여부" />
      </div>
    </div>
  );
};

export default GraduationAudit;
