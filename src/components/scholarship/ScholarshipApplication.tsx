import {
  APPLY_SCHOLARSHIP_COLUMNS,
  APPLY_SCHOLARSHIP_ROWS,
  APPLY_HISTORY_COLUMNS,
  APPLY_HISTORY_ROWS,
} from '@/constants/ScholarshipConstants';
import TitleSection from '@/components/commons/TitleSection';
import ScholarshipTable from '@/components/scholarship/ScholarshipTable';

function ScholarshipApplication() {
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <section>
        <TitleSection title="2025 1학기 신청 장학금" />
        <div className="overflow-x-auto">
          <ScholarshipTable
            columns={APPLY_SCHOLARSHIP_COLUMNS}
            rows={APPLY_SCHOLARSHIP_ROWS}
            headerBgColor="bg-beige"
          />
        </div>
      </section>

      <section>
        <TitleSection title="신청 내역 (기간 1년)" />
        <div className="overflow-x-auto">
          <ScholarshipTable
            columns={APPLY_HISTORY_COLUMNS}
            rows={APPLY_HISTORY_ROWS}
            headerBgColor="bg-beige"
          />
        </div>
      </section>
    </div>
  );
}

export default ScholarshipApplication;
