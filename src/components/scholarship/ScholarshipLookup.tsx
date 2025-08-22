import { SCHOLARSHIP_LOOKUP_COLUMNS } from '@/constants/ScholarshipConstants';
import TitleSection from '@/components/commons/TitleSection';
import ScholarshipTable from '@/components/scholarship/ScholarshipTable';
import { useScholarshipDisbursements } from '@/api/hooks/scholarship/useScholarshipDisbursements';
import type { RowData } from '@/types/scholarship';

function ScholarshipLookup() {
  const memberId = Number(import.meta.env.VITE_MEMBER_ID) || 1;
  const { disbursementsData } = useScholarshipDisbursements(memberId);

  // 장학금 지급 이력 데이터 변환
  const transformDisbursementsToRows = () => {
    if (!disbursementsData?.years) return [];

    const allRows: RowData[] = [];
    let rowNumber = 1;

    disbursementsData.years.forEach((yearData) => {
      yearData.items.forEach((item) => {
        allRows.push({
          number: rowNumber++,
          semester: item.semesterText,
          scholarshipName: item.scholarshipName,
          admission: item.admissionAmount,
          tuition: item.tuitionAmount,
          flatAmount: item.flatAmount,
          paymentDate: item.paidOn,
        });
      });
    });

    return allRows;
  };

    // 연도 정보 추출 (가장 최근 연도)
  const getYearTitle = () => {
    if (!disbursementsData?.years?.length) {
      return '2025';
    }
    
    const years = disbursementsData.years
      .map((yearData) => yearData.year)
      .sort((a, b) => b - a);
    return years[0].toString();
  };

  const disbursementRows = transformDisbursementsToRows();
  const yearTitle = getYearTitle();

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <section>
        <TitleSection title={yearTitle} />
        <div className="overflow-x-auto">
          <ScholarshipTable
            columns={SCHOLARSHIP_LOOKUP_COLUMNS}
            rows={disbursementRows}
            headerBgColor="bg-beige"
          />
        </div>
      </section>
    </div>
  );
}

export default ScholarshipLookup;
