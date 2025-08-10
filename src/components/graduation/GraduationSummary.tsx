import React from "react";
import CreditInfoCard from "@/components/graduation/ui/CreditInfoCard";
import {
  CREDIT_SUMMARY_DATA,
  USER_INFO_FIELDS,
  USER_MAJOR_INFO
} from "@/constants/GraduationConstants";
import TitleSection from "@/components/commons/TitleSection";
import ResponsiveListTable from "@/components/graduation/ui/ResponsiveTable";
import StatusCircle from "@/components/graduation/ui/GraduationStatus";
import Subtitle from "@/components/graduation/ui/SubTitle";

const GrduationSummary: React.FC = () => {
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="기본 정보" />

        <div className="flex flex-col w-full gap-4 md:flex-col lg:flex-row md:justify-between">
          <div className="order-2 md:order-2 lg:order-1 w-full">
            <ResponsiveListTable fields={USER_INFO_FIELDS} />
          </div>

          <div className="order-1 md:order-1 lg:order-2 self-stretch flex flex-row justify-between py-3 px-8 md:py-6 md:px-10 gap-2 md:gap-8 bg-beige rounded-[15px]">
            <div className="md:w-full flex flex-row md:flex-row lg:flex-col gap-4 md:gap-20 lg:gap-6 justify-center md:justify-start lg:justify-center items-center md:items-center lg:items-start">
              {CREDIT_SUMMARY_DATA.map((data) => (
                <CreditInfoCard
                  key={data.title}
                  title={data.title}
                  value={data.value}
                  unit={data.unit}
                />
              ))}
            </div>
            <StatusCircle status="pass" canGraduateEarly={false} />
          </div>
        </div>
      </div>
      <div>
        <TitleSection title="전공 정보" />
        <div className="flex flex-col gap-2 md:gap-4">
          {USER_MAJOR_INFO.map((major) => (
            <div key={major.title}>
              <Subtitle title={major.title} />
              <ResponsiveListTable fields={major.fields} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrduationSummary;