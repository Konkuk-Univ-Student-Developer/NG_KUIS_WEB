import TitleSection from "@/components/commons/TitleSection";
import ResponsiveListTable from "@/components/graduation/ResponsiveTable";
import { GRADUATION_AUDIT_COLUMNS, GRADUATION_AUDIT_ROWS } from "@/constants/GraduationConstants";

const GraduationAudit: React.FC = () => {
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="학사 졸업 요건 충족 여부" />
        <div className="order-2 md:order-2 lg:order-1 w-full">
          <ResponsiveListTable
            rows={GRADUATION_AUDIT_ROWS}
            columns={GRADUATION_AUDIT_COLUMNS}
          />
        </div>
      </div>
      <div>
        <TitleSection title="전공별 졸업 요건 충족 여부" />
        <div className="order-2 md:order-2 lg:order-1 w-full">
          <ResponsiveListTable
            rows={GRADUATION_AUDIT_ROWS}
            columns={GRADUATION_AUDIT_COLUMNS}
          />
        </div>
      </div>
    </div>
  );
};

export default GraduationAudit;
