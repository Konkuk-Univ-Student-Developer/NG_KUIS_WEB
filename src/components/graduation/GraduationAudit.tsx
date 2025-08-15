import { useAuditData } from "@/api/hooks/graduation/useAuditData";
import TitleSection from "@/components/commons/TitleSection";
import ResponsiveListTable from "@/components/graduation/ResponsiveTable";
import { GRADUATION_AUDIT_COLUMNS } from "@/constants/GraduationConstants";
import type { GraduationTabProps } from "@/types/graduation";

function GraduationAudit({ member }: GraduationTabProps) {
  const { isLoading, isError, bachelorRows, majorRows } = useAuditData(member);

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  if (isError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="학사 졸업 요건 충족 여부" />
        <div className="order-2 md:order-2 lg:order-1 w-full">
          <ResponsiveListTable
            rows={bachelorRows}
            columns={GRADUATION_AUDIT_COLUMNS}
          />
        </div>
      </div>
      <div>
        <TitleSection title="전공별 졸업 요건 충족 여부" />
        <div className="order-2 md:order-2 lg:order-1 w-full">
          <ResponsiveListTable
            rows={majorRows}
            columns={GRADUATION_AUDIT_COLUMNS}
          />
        </div>
      </div>
    </div>
  );
}

export default GraduationAudit;
