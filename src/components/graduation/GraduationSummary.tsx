import CreditInfoCard from "@/components/graduation/CreditInfoCard";
import {
  USER_INFO_COLUMNS,
} from "@/constants/GraduationConstants";
import TitleSection from "@/components/commons/TitleSection";
import ResponsiveListTable from "@/components/graduation/ResponsiveTable";
import StatusCircle from "@/components/graduation/GraduationStatus";
import Subtitle from "@/components/graduation/SubTitle";
import { type GraduationTabProps, type RowData } from "@/types/graduation";
import { useSummaryData } from "@/api/hooks/graduation/useSummaryData";

function GraduationSummary({member} : GraduationTabProps) {
  const {
    data,
    isLoading,
    isError,
    creditSummaryData,
    userInfoRows,
    userMajorInfo,
  } = useSummaryData(member);

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  if (isError || !data) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="기본 정보" />
        <div className="flex flex-col w-full gap-4 md:flex-col lg:flex-row md:justify-between">
          <div className="order-2 md:order-2 lg:order-1 w-full">
            <ResponsiveListTable
              columns={USER_INFO_COLUMNS}
              rows={userInfoRows}
              headerBgColor="bg-beige"
            />
          </div>
          <div className="order-1 md:order-1 lg:order-2 self-stretch flex flex-row justify-between py-3 px-8 md:py-6 md:px-10 gap-2 md:gap-8 bg-beige rounded-[15px]">
            <div className="md:w-full flex flex-row md:flex-row lg:flex-col gap-4 md:gap-20 lg:gap-6 justify-center md:justify-start lg:justify-center items-center md:items-center lg:items-start">
              {creditSummaryData.map((d) => (
                <CreditInfoCard
                  key={d.title}
                  title={d.title}
                  value={d.value}
                  unit={d.unit}
                />
              ))}
            </div>
            <StatusCircle
              status={
                data.summary.passStatus.toLowerCase() === "합격"
                  ? "pass"
                  : "non-pass"
              }
              canGraduateEarly={data.summary.earlyGraduation}
            />
          </div>
        </div>
      </div>
      <div>
        <TitleSection title="전공 정보" />
        <div className="flex flex-col gap-2 md:gap-4">
          {userMajorInfo.map((major) => (
            <div key={major.title}>
              <Subtitle title={major.title} />
              <ResponsiveListTable
                columns={major.columns}
                rows={major.rows as RowData[]}
                headerBgColor="bg-beige"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GraduationSummary;
