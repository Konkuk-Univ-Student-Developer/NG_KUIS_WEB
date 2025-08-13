import { useState } from 'react';
import Tab from '@/components/commons/Tab';
import useMediaQuery from '@/hooks/useMediaQuery';
import ArrowDownIcon from '@/assets/icon/ic_arrow_down.svg?react';
import ArrowUpIcon from '@/assets/icon/ic_arrow_up.svg?react'; // 추가된 import

type GradeItem = {
  no: number;
  학수번호: string;
  과목번호: string;
  과목명: string;
  담당교수: string;
  학점: number;
  이수구분: string;
  등급: string;
  성적평가방법: string;
};

type DetailGrade = {
  출석: { score: number; max: number };
  중간고사: { score: number; max: number };
  기말고사: { score: number; max: number };
  과제물: { score: number; max: number };
  프로젝트: { score: number; max: number };
  퀴즈: { score: number; max: number };
  발표: { score: number; max: number };
  토론: { score: number; max: number };
  기타5: { score: number; max: number };
};

const GRADE_TABS = [
  '정규학기 성적 조회',
  '계절학기 성적 조회',
  '전체 성적 조회',
];

const SAMPLE_GRADES: GradeItem[] = Array.from({ length: 6 }).map((_, i) => ({
  no: i + 1,
  학수번호: 'COAA8723',
  과목번호: '1114',
  과목명: '컴퓨터공학개론',
  담당교수: '김건국',
  학점: 3,
  이수구분: '전선',
  등급: 'A+',
  성적평가방법: '상대평가',
}));

const SAMPLE_DETAIL_GRADES: DetailGrade = {
  출석: { score: 100, max: 100 },
  중간고사: { score: 100, max: 100 },
  기말고사: { score: 100, max: 100 },
  과제물: { score: 100, max: 100 },
  프로젝트: { score: 100, max: 100 },
  퀴즈: { score: 0, max: 0 },
  발표: { score: 0, max: 0 },
  토론: { score: 0, max: 0 },
  기타5: { score: 0, max: 0 },
};

const Grade = () => {
  const [activeTab, setActiveTab] = useState(GRADE_TABS[0]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set()); // 추가된 state: 펼쳐진 행 관리
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const tabVariant = isDesktop ? 'fit' : 'full';

  const avgGpa = 4.5;
  const gpaScale = 4.5;
  const earnedCredits = 18;
  const attemptedCredits = 18;
  const academicWarning = 'N';
  const honors = 'Y';

  const toggleRow = (rowNo: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowNo)) {
        newSet.delete(rowNo);
      } else {
        newSet.add(rowNo);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col gap-6 md:mx-auto md:max-w-350 md:block md:px-16 lg:px-24 md:py-13">
      {/* Title은 냅두기*/}
      <h2 className="text-xl font-bold leading-[1.4] text-darkgreen mt-2 ml-5 md:m-0 md:pb-18 md:text-center md:text-4xl md:font-bold md:leading-[2.0]">
        성적 조회
      </h2>

      {/* Tabs */}
      <div className="mx-4 md:m-0 md:pb-18">
        <Tab
          tabs={GRADE_TABS}
          activeTab={activeTab}
          variant={tabVariant}
          onTabClick={setActiveTab}
        />
      </div>

      {/* Summary and Term Title Row */}
      <div className="mx-4 md:m-0 md:flex md:gap-30 md:pb-18 md:items-end">
        {/* Term Title */}
        <div className="md:flex-1">
          <h3 className="text-darkgreen text-lg font-bold leading-[1.4] tracking-[-0.36px] md:text-2xl md:leading-[2.0]">
            2025년 1학기
          </h3>
        </div>

        {/* Summary */}
        <div className="mt-4 md:mt-0 md:flex-1">
          <div className="rounded-[15px] bg-beige p-4 md:rounded-[20px] md:py-6 md:px-8">
            <div className="grid grid-cols-3 md:gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-darkgray text-sm md:text-base">
                  평점 평균
                </span>
                <div className="flex items-end gap-1">
                  <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                    {avgGpa}
                  </span>
                  <span className="text-darkgray text-base md:text-lg">
                    / {gpaScale}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-darkgray text-sm md:text-base">
                  취득학점 / 신청학점
                </span>
                <div className="flex items-end gap-1">
                  <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                    {earnedCredits}
                  </span>
                  <span className="text-darkgray text-base md:text-lg">
                    / {attemptedCredits}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-darkgray text-sm md:text-base">
                  학사경고 / 우등구분
                </span>
                <div className="flex items-end gap-2">
                  <span className="text-darkgreen font-bold text-2xl md:text-3xl">
                    {academicWarning}
                  </span>
                  <span className="text-darkgray text-base md:text-lg">
                    / {honors}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="mx-4 md:m-0 md:pb-13">
        <div className="bg-white rounded-[8px] border border-lightgray overflow-hidden">
          <div className="overflow-x-auto md:overflow-visible">
            {/* Header */}
            <div className="bg-beige px-4 py-3 border-b border-lightgray min-w-max md:min-w-full">
              <div className="grid grid-cols-10 gap-2 text-mobile-small-bold text-black font-bold md:gap-1">
                <div className="min-w-[48px] md:min-w-0 text-center">No</div>
                <div className="min-w-[100px] md:min-w-0 text-center">
                  학수번호
                </div>
                <div className="min-w-[90px] md:min-w-0 text-center">
                  과목번호
                </div>
                <div className="min-w-[160px] md:min-w-0 text-center">
                  과목명
                </div>
                <div className="min-w-[90px] md:min-w-0 text-center">
                  담당교수
                </div>
                <div className="min-w-[60px] md:min-w-0 text-center">학점</div>
                <div className="min-w-[80px] md:min-w-0 text-center">
                  이수구분
                </div>
                <div className="min-w-[60px] md:min-w-0 text-center">등급</div>
                <div className="min-w-[110px] md:min-w-0 text-center">
                  성적평가방법
                </div>
                <div className="min-w-[110px] md:min-w-0 text-center">
                  상세성적 보기
                </div>
              </div>
            </div>

            {/* Body */}
            <div>
              {SAMPLE_GRADES.map((row) => (
                <div key={row.no}>
                  {/* 기본 행 */}
                  <div
                    className={`px-4 py-3 hover:bg-beige/50 transition-colors min-w-max md:min-w-full ${
                      !expandedRows.has(row.no)
                        ? 'border-b border-lightgray'
                        : ''
                    }`}
                  >
                    <div className="grid grid-cols-10 gap-2 text-mobile-small md:gap-1">
                      <div className="text-black font-medium min-w-[48px] md:min-w-0 text-center">
                        {row.no}
                      </div>
                      <div className="text-black font-medium min-w-[100px] md:min-w-0 text-center">
                        {row.학수번호}
                      </div>
                      <div className="text-black font-medium min-w-[90px] md:min-w-0 text-center">
                        {row.과목번호}
                      </div>
                      <div className="text-black font-medium min-w-[160px] md:min-w-0 text-center">
                        {row.과목명}
                      </div>
                      <div className="text-black font-medium min-w-[90px] md:min-w-0 text-center">
                        {row.담당교수}
                      </div>
                      <div className="text-black font-medium min-w-[60px] md:min-w-0 text-center">
                        {row.학점}
                      </div>
                      <div className="text-black font-medium min-w-[80px] md:min-w-0 text-center">
                        {row.이수구분}
                      </div>
                      <div className="text-black font-medium min-w-[60px] md:min-w-0 text-center">
                        {row.등급}
                      </div>
                      <div className="text-black font-medium min-w-[110px] md:min-w-0 text-center">
                        {row.성적평가방법}
                      </div>
                      <div className="min-w-[110px] md:min-w-0 text-center">
                        {expandedRows.has(row.no) ? (
                          <ArrowUpIcon
                            className="w-6 h-6 text-darkgreen cursor-pointer hover:opacity-70 mx-auto"
                            onClick={() => toggleRow(row.no)}
                          />
                        ) : (
                          <ArrowDownIcon
                            className="w-6 h-6 text-darkgreen cursor-pointer hover:opacity-70 mx-auto"
                            onClick={() => toggleRow(row.no)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Detail Grades Table */}
                  {expandedRows.has(row.no) && (
                    <div className="border-b border-lightgray bg-gray-50 min-w-[1704px] md:min-w-full">
                      <div className="p-4 md:p-6">
                        <div className="bg-white rounded-lg overflow-hidden border border-lightgray">
                          <div className="bg-darkgreen text-white px-4 py-2 min-w-max md:min-w-full">
                            <div className="grid grid-cols-9 gap-2 text-mobile-small-bold font-bold text-center">
                              <div className="min-w-[90px] md:min-w-0">
                                출석
                              </div>
                              <div className="min-w-[90px] md:min-w-0">
                                중간고사
                              </div>
                              <div className="min-w-[90px] md:min-w-0">
                                기말고사
                              </div>
                              <div className="min-w-[90px] md:min-w-0">
                                과제물
                              </div>
                              <div className="min-w-[90px] md:min-w-0">
                                프로젝트
                              </div>
                              <div className="min-w-[90px] md:min-w-0">
                                퀴즈
                              </div>
                              <div className="min-w-[90px] md:min-w-0">
                                발표
                              </div>
                              <div className="min-w-[90px] md:min-w-0">
                                토론
                              </div>
                              <div className="min-w-[90px] md:min-w-0">
                                기타5
                              </div>
                            </div>
                          </div>

                          {/* Body : 만점기준 */}
                          <div className="bg-beige px-4 py-2 border-b border-lightgray min-w-max md:min-w-full">
                            <div className="grid grid-cols-9 gap-2 text-mobile-small text-center">
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.출석.max}점
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.중간고사.max}점
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.기말고사.max}점
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.과제물.max}점
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.프로젝트.max}점
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.퀴즈.max}점
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.발표.max}점
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.토론.max}점
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.기타5.max}점
                              </div>
                            </div>
                          </div>
                          {/* Body : 학생점수 */}
                          <div className="bg-white px-4 py-2  min-w-max md:min-w-full">
                            <div className="grid grid-cols-9 gap-2 text-mobile-small text-center">
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.출석.score}
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.중간고사.score}
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.기말고사.score}
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.과제물.score}
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.프로젝트.score}
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.퀴즈.score}
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.발표.score}
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.토론.score}
                              </div>
                              <div className="text-black min-w-[90px] md:min-w-0">
                                {SAMPLE_DETAIL_GRADES.기타5.score}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade;
