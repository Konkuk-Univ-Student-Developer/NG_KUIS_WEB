import React, { useMemo } from "react";
import TitleSection from "@/components/commons/TitleSection";
import ResponsiveListTable from "@/components/graduation/ResponsiveTable";
import {
  CREDITS_SUMMARY_COLUMNS,
  CREDITS_SUMMARY_ROWS,
  SUBSECTION_DETAILS_DATA,
  CREDIT_DATA,
  CREDITS_ELECTIVE_GENERAL_ROWS,
  CREDITS_ELECTIVE_GENERAL_COLUMNS,
} from "@/constants/GraduationConstants";
import CreditInfoCard from "@/components/graduation/CreditInfoCard";
import CreditSubSection from "@/components/graduation/CreditSubSection";
import SubjectCard from "@/components/graduation/SubjectCard";
import type { RowData } from "@/types/graduation";

const CompletedCredits: React.FC = () => {
  const combinedRows: RowData[] = useMemo(() => {
    return CREDITS_SUMMARY_ROWS.map((summaryRow) => {
      const detailSection = SUBSECTION_DETAILS_DATA.find(
        (detail) => detail.id === summaryRow.id
      );

      return {
        ...summaryRow,
        rowType: "custom",
        customRenderer: (
          <div className="flex flex-col gap-3 p-2">
            {detailSection ? (
              detailSection.table.rows.map((course) => (
                <SubjectCard {...course} />
              ))
            ) : (
              <p className="p-4 text-center text-gray-500">
                상세 과목 정보가 없습니다.
              </p>
            )}
          </div>
        ),
      };
    });
  }, []);

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <div>
        <TitleSection title="졸업요건별 취득학점 내역" />
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="order-2 lg:order-1 w-full lg:w-4/6">
            <ResponsiveListTable
              rows={combinedRows}
              columns={CREDITS_SUMMARY_COLUMNS}
            />
          </div>

          <div className="order-1 lg:order-2 w-full lg:w-2/6 flex flex-row justify-center md:grid md:grid-cols-2 gap-3 md:gap-12 bg-beige rounded-2xl px-6 py-4 md:px-9 md:py-6">
            {CREDIT_DATA.map((data, index) => (
              <CreditInfoCard
                key={index}
                title={data.title}
                value={data.value}
                unit={data.unit}
              />
            ))}
          </div>
        </div>
      </div>

      {/* todo: 더미데이터 모두 실제 데이터로 바꿀 것 */}
      <div className="flex flex-col md:flex-row justify-between gap-16">
        <div className="md:w-4/6">
          <TitleSection title="선택 교양 이수" />
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <ResponsiveListTable
              rows={CREDITS_ELECTIVE_GENERAL_ROWS}
              columns={CREDITS_ELECTIVE_GENERAL_COLUMNS}
            />
            <ResponsiveListTable
              rows={CREDITS_ELECTIVE_GENERAL_ROWS}
              columns={CREDITS_ELECTIVE_GENERAL_COLUMNS}
            />
          </div>
        </div>
        <div className="md:w-2/6">
          <TitleSection title="영어 강의" />
          <ResponsiveListTable
            rows={CREDITS_ELECTIVE_GENERAL_ROWS}
            columns={CREDITS_ELECTIVE_GENERAL_COLUMNS}
          />
        </div>
      </div>
      <div>
        <TitleSection title="중복 과목" />
      </div>

      <div className="hidden md:block pt-6">
        {SUBSECTION_DETAILS_DATA.map((sectionData) => (
          <CreditSubSection
            key={sectionData.id}
            id={sectionData.id}
            title={sectionData.title}
            card={sectionData.card}
            table={sectionData.table}
          />
        ))}
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
};

export default CompletedCredits;
