import {
  SCHOLARSHIP_LOOKUP_COLUMNS,
} from '@/constants/ScholarshipConstants';
import TitleSection from '@/components/commons/TitleSection';
import ScholarshipTable from '@/components/scholarship/ScholarshipTable';
import { useScholarshipDisbursements } from '@/api/hooks/scholarship/useScholarshipDisbursements';

function ScholarshipLookup() {
  const memberId = Number(import.meta.env.VITE_MEMBER_ID) || 1;
  const { disbursementsData } = useScholarshipDisbursements(memberId);

  // 장학금 지급 이력 데이터 변환
  const transformDisbursementsToRows = () => {
    if (!disbursementsData?.years) return [];
    
    const allRows: any[] = [];
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

  const disbursementRows = transformDisbursementsToRows();

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <section>
        <TitleSection title="2025" />
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
