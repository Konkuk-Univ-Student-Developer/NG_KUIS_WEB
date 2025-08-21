import {
  APPLY_SCHOLARSHIP_COLUMNS,
  APPLY_HISTORY_COLUMNS,
} from '@/constants/ScholarshipConstants';
import TitleSection from '@/components/commons/TitleSection';
import ScholarshipTable from '@/components/scholarship/ScholarshipTable';
import { useAvailableScholarships } from '@/api/hooks/scholarship/useAvailableScholarships';
import { useScholarshipApplications } from '@/api/hooks/scholarship/useScholarshipApplications';
import type { ScholarshipRequestParams } from '@/types/scholarship';
import LinkIcon from '@/assets/icon/ic_link.svg?react';

function ScholarshipApplication() {
  const memberId = Number(import.meta.env.VITE_MEMBER_ID) || 1;
  
  // 신청 가능 장학금 조회
  const availableParams: ScholarshipRequestParams = { memberId, year: 2025, semester: 'FIRST' };
  const { availableScholarshipsData } = useAvailableScholarships(availableParams);
  
  // 신청 내역 조회 (최근 1년)
  const applicationsParams: ScholarshipRequestParams = { 
    memberId, 
    from: '2024-01-01', 
    to: '2025-12-31' 
  };
  const { applicationsData } = useScholarshipApplications(applicationsParams);

  // 신청 가능 장학금 데이터 변환
  const transformAvailableScholarshipsToRows = () => {
    if (!availableScholarshipsData?.items) return [];
    
    return availableScholarshipsData.items.map((item, index) => ({
      number: index + 1,
      apply: (
        <button className="bg-darkgreen hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
          {item.actionLabel}
        </button>
      ),
      scholarshipName: item.name,
      applyPeriod: item.periodText,
      notice: item.noticeUrl && item.noticeUrl.trim() !== '' ? (
        <a 
          href={item.noticeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-darkgreen hover:text-green-700"
        >
          <LinkIcon className="w-5 h-5" />
        </a>
      ) : '-',
      attachment: item.hasAttachment ? 'Y' : 'N',
      applyStatus: item.myApplicationStatus || '',
    }));
  };

  // 신청 내역 데이터 변환
  const transformApplicationsToRows = () => {
    if (!applicationsData?.items) return [];
    
    return applicationsData.items.map((item, index) => ({
      number: index + 1,
      applyYear: item.applicationYear,
      applySemester: item.applicationSemester === 'FIRST' ? '1학기' : 
                     item.applicationSemester === 'SECOND' ? '2학기' :
                     item.applicationSemester === 'SUMMER' ? '여름학기' : '겨울학기',
      scholarshipName: item.scholarshipName,
      applyDate: item.appliedDate,
      applyStatus: <span className="text-darkgreen font-bold">{item.status}</span>,
      failReason: item.rejectionReason || '',
    }));
  };

  const availableScholarshipRows = transformAvailableScholarshipsToRows();
  const applicationRows = transformApplicationsToRows();

  const semesterText = availableScholarshipsData 
    ? `${availableScholarshipsData.year} ${availableScholarshipsData.semester === 'FIRST' ? '1' : '2'}학기 신청 장학금`
    : '2025 1학기 신청 장학금';

  return (
    <div className="flex flex-col md:mx-auto md:max-w-350 py-4 gap-12">
      <section>
        <TitleSection title={semesterText} />
        <div className="overflow-x-auto">
          <ScholarshipTable
            columns={APPLY_SCHOLARSHIP_COLUMNS}
            rows={availableScholarshipRows}
            headerBgColor="bg-beige"
          />
        </div>
      </section>

      <section>
        <TitleSection title="신청 내역 (기간 1년)" />
        <div className="overflow-x-auto">
          <ScholarshipTable
            columns={APPLY_HISTORY_COLUMNS}
            rows={applicationRows}
            headerBgColor="bg-beige"
          />
        </div>
      </section>
    </div>
  );
}

export default ScholarshipApplication;
