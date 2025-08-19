import {
  SCHOLARSHIP_LOOKUP_ROWS,
  SCHOLARSHIP_LOOKUP_COLUMNS,
} from '@/constants/ScholarshipConstants';
import TitleSection from '@/components/commons/TitleSection';
import ScholarshipTable from '@/components/scholarship/ScholarshipTable';

function ScholarshipLookup() {
  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <section>
        <TitleSection title="2025" />
        <div className="overflow-x-auto">
          <ScholarshipTable
            columns={SCHOLARSHIP_LOOKUP_COLUMNS}
            rows={SCHOLARSHIP_LOOKUP_ROWS}
            headerBgColor="bg-beige"
          />
        </div>
      </section>
    </div>
  );
}

export default ScholarshipLookup;
