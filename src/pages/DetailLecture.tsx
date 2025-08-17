import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { BLearningChart, CoreCompetencyChart, WeeklyPlanCard, DefaultWeeklyPlanCard } from '@/components/detail_lecture';
import { TitleSection, Badge, BasicInfoTable, DesktopBasicInfoTables, StandardTable, EvaluationTable, VerticalTable } from '@/components/commons';
import useMediaQuery from '@/hooks/useMediaQuery';
import SearchIcon from "@/assets/icon/ic_search.svg?react";
import { LECTURE_DETAILS } from '@/constants/DetailLectureConstants';
import { DownloadIcon } from '@/assets/icon';
import type { CourseData } from '@/constants/TimetableConstants';
import type { LectureDetail, CompetencyGoals } from '@/constants/DetailLectureConstants';
import { useLecturePlan, useMergedLectureData } from '@/api/hooks/lecture/useLecturePlan';

// 섹션 스타일 상수 (DetailLecture 전용)
const styles = {
  section: {
    title: "text-[#036B3F] text-lg font-semibold font-['Noto_Sans'] leading-7",
    wrapper: "flex flex-col gap-5"
  }
};

const DetailLecture: React.FC = () => {
  const { courseNumber } = useParams<{ courseNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [showError, setShowError] = useState(false);
  const [expandedEvaluationItems, setExpandedEvaluationItems] = useState<Set<string>>(new Set());

  // Media query for responsive behavior (md breakpoint: 768px)
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Get course data from navigation state
  const courseData = location.state?.courseData as CourseData | undefined;

  // Log navigation data for debugging
  React.useEffect(() => {
    console.log('🔍 DetailLecture Component Loaded:', {
      urlCourseNumber: courseNumber,
      hasCourseData: !!courseData,
      courseDataDetails: courseData ? {
        courseCode: courseData.courseCode,
        courseNumber: courseData.courseNumber,
        courseName: courseData.courseName,
        professor: courseData.professor,
        grade: courseData.grade,
        credit: courseData.credit,
        method: courseData.method,
        schedule: courseData.schedule,
        fullData: courseData
      } : null
    });
  }, [courseData, courseNumber]);

  // Fetch lecture plan from KUPIS
  // Note: We need year from courseData or default to current year
  const currentYear = new Date().getFullYear().toString();

  // Priority: courseData.courseNumber > URL courseNumber parameter
  const effectiveCourseNumber = courseData?.courseNumber || courseNumber || '';

  console.log('🔑 Course Number Resolution:', {
    fromCourseData: courseData?.courseNumber,
    fromURL: courseNumber,
    effective: effectiveCourseNumber,
    hasEffectiveNumber: !!effectiveCourseNumber
  });

  // Get default lecture data from constants
  // Try multiple keys: courseNumber first, then courseCode, then default
  const getDefaultLectureData = () => {
    // Try with courseNumber first
    if (effectiveCourseNumber && LECTURE_DETAILS[effectiveCourseNumber]) {
      console.log('📚 Found lecture data with courseNumber:', effectiveCourseNumber);
      return LECTURE_DETAILS[effectiveCourseNumber];
    }

    // Try with courseCode if available
    if (courseData?.courseCode && LECTURE_DETAILS[courseData.courseCode]) {
      console.log('📚 Found lecture data with courseCode:', courseData.courseCode);
      return LECTURE_DETAILS[courseData.courseCode];
    }

    // Fallback to default
    console.log('📚 Using default lecture data (BBAB55841)');
    return LECTURE_DETAILS['BBAB55841'] || {};
  };

  const defaultLectureData = getDefaultLectureData();

  // Only create params if we have a valid courseNumber
  const lecturePlanParams = React.useMemo(() => {
    if (!effectiveCourseNumber) {
      console.log('⚠️ No effective course number available');
      return undefined;
    }

    const params = {
      year: currentYear,
      courseNumber: effectiveCourseNumber
    };

    console.log('📤 Creating Lecture Plan Parameters:', params);
    return params;
  }, [effectiveCourseNumber, currentYear]);

  React.useEffect(() => {
    console.log('📊 Lecture Plan Hook Input:', {
      hasParams: !!lecturePlanParams,
      params: lecturePlanParams,
      willFetch: !!(lecturePlanParams?.year && lecturePlanParams?.courseNumber)
    });
  }, [lecturePlanParams]);

  const { data: fetchedData, loading, error } = useLecturePlan(lecturePlanParams);

  // Log fetched data
  React.useEffect(() => {
    if (fetchedData && Object.keys(fetchedData).length > 0) {
      console.log('📚 Lecture Plan Data Successfully Fetched from KUPIS:', {
        subjectName: fetchedData.subjectName,
        courseCode: fetchedData.courseCode,
        courseNumber: fetchedData.courseNumber,
        professor: fetchedData.professor,
        evaluationItems: fetchedData.evaluationItems?.length || 0,
        textbooks: fetchedData.textbooks?.length || 0,
        weeklyPlans: fetchedData.weeklyPlans?.length || 0,
        fullData: fetchedData
      });
    }
  }, [fetchedData]);

  // Merge all data sources
  const lectureData = useMergedLectureData(fetchedData, courseData, defaultLectureData);

  // Log merged data
  React.useEffect(() => {
    console.log('🔀 Final Merged Lecture Data:', {
      subjectName: lectureData.subjectName,
      courseCode: lectureData.courseCode,
      grade: lectureData.grade,
      credit: lectureData.credit,
      source: {
        hasFetchedData: !!fetchedData && Object.keys(fetchedData).length > 0,
        hasCourseData: !!courseData,
        usingDefault: !fetchedData || Object.keys(fetchedData).length === 0
      }
    });
  }, [lectureData, fetchedData, courseData]);

  // Show error message if fetch failed
  React.useEffect(() => {
    if (error && !showError) {
      console.error('❌ Failed to fetch lecture plan:', error);
      setShowError(true);
      // Auto-hide error after 5 seconds
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, showError]);

  // Toggle function for evaluation items
  const toggleEvaluationItem = (itemName: string) => {
    setExpandedEvaluationItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  // 데이터 매핑 함수들
  const mapCourseData = (lectureData: LectureDetail) => ({
    grade: lectureData.grade || '-',
    courseCode: lectureData.courseCode || '-',
    category: lectureData.category || lectureData.classification || '-',
    courseNumber: lectureData.courseNumber || '-',
    credit: lectureData.credit || 3
  });

  const mapEnrollmentData = (lectureData: LectureDetail) => ({
    enrolled: lectureData.enrolled || 0,
    undergraduateEnrolled: lectureData.undergraduateEnrolled || 0,
    graduateEnrolled: lectureData.graduateEnrolled || 0,
    capacity: lectureData.capacity || 0
  });

  const mapCompetencyRows = (lectureData: LectureDetail) => {
    const competencyGoals: Partial<CompetencyGoals> = lectureData.competencyGoals || {};
    return [
      {
        label: '핵심역량 강의목표',
        value: competencyGoals.coreCompetencyGoal || '스스로 학습할 수 있는 능력',
        rowSpan: 1
      },
      {
        label: '주 전공역량',
        value: competencyGoals.mainCompetency || '대규모 SW의 협동 개발 능력 (상)'
      },
      {
        label: '주 전공역량 정의',
        value: competencyGoals.mainCompetencyDefinition || '스스로 학습할 수 있는 역량'
      },
      {
        label: '보조 전공역량1',
        value: competencyGoals.subCompetency1 || '대규모 SW의 협동 개발 능력 (상)'
      },
      {
        label: '보조 전공역량1 정의',
        value: competencyGoals.subCompetency1Definition || '스스로 학습할 수 있는 역량'
      },
      {
        label: '보조 전공역량2',
        value: competencyGoals.subCompetency2 || '대규모 SW의 협동 개발 능력 (상)'
      },
      {
        label: '보조 전공역량2 정의',
        value: competencyGoals.subCompetency2Definition || '스스로 학습할 수 있는 역량'
      },
      {
        label: '역량기반 교육목표',
        value: competencyGoals.competencyBasedGoal || '대규모 SW의 협동 개발 능력 (상)',
        rowSpan: 1
      },
      {
        label: '직무역량',
        value: competencyGoals.jobCompetencies || ['문제해결능력', '기술능력'],
        isCheckList: true
      }
    ];
  };

  // 섹션 렌더링 함수들
  const renderBasicInfoSection = () => (
    <div className={styles.section.wrapper}>
      <div className="flex justify-between items-center">
        <h2 className={styles.section.title}>기본 정보</h2>
      </div>
      <div className="flex flex-col gap-3">
        {isDesktop ? (
          <DesktopBasicInfoTables lectureData={lectureData} variant="desktop" />
        ) : (
          <>
            <BasicInfoTable data={[mapCourseData(lectureData)]} type="courseInfo" variant="mobile" />
            <BasicInfoTable data={[mapEnrollmentData(lectureData)]} type="enrollment" variant="mobile" />
          </>
        )}
        {renderTags()}
      </div>
      {isDesktop ? renderChartsAndProfessor() : (
        <>
          {renderChartsAndProfessor()}
          {renderProfessorInfo()}
        </>
      )}
    </div>
  );

  const renderTags = () => (
    <div className="flex flex-wrap gap-2">
      {lectureData.tags?.map((tag: string, index: number) => (
        <Badge key={index} label={tag} variant="default" size={isDesktop ? "xl" : "md"} />
      )) || (
          <>
            {lectureData.department && <Badge label={lectureData.department} variant="default" size={isDesktop ? "xl" : "md"} />}
            {courseData?.method && <Badge label={courseData.method} variant="default" size={isDesktop ? "xl" : "md"} />}
          </>
        )}
    </div>
  );

  const renderChartsAndProfessor = () => (
    <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
      <BLearningChart />
      <CoreCompetencyChart />
      {isDesktop && (
        <div className="grid grid-cols-1">
          <div className={`${isDesktop ? 'p-6' : 'p-4'} bg-white rounded-[20px] shadow-[0px_3px_8px_-1px_rgba(50,50,71,0.05)] border border-gray-100`}>
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className={`text-black ${isDesktop ? 'text-base' : 'text-xs'} font-normal font-['Noto_Sans'] mb-1`}>
                  담당교수 정보
                </div>
                <div className={`text-black ${isDesktop ? 'text-xl' : 'text-sm'} font-semibold font-['Noto_Sans'] ${isDesktop ? 'leading-10' : 'leading-none'} mb-4`}>
                  {lectureData.professorInfo?.name || lectureData.professor}
                </div>
              </div>
              <div className={`${isDesktop ? 'px-4 py-3' : 'px-3 py-2'} bg-beige rounded-2xl`}>
                <div className={`space-y-${isDesktop ? '3' : '2'}`}>
                  <div className="flex justify-between">
                    <span className={`text-gray-500 ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                      이메일
                    </span>
                    <span className={`text-black ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                      {lectureData.professorInfo?.email || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-500 ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                      연락처
                    </span>
                    <span className={`text-black ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                      {lectureData.professorInfo?.phone || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-gray-500 ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                      상담 가능 시간
                    </span>
                    <span className={`text-black ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                      {lectureData.professorInfo?.consultationHours || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfessorInfo = () => (
    <div className="grid grid-cols-1">
      <div className={`${isDesktop ? 'p-6' : 'p-4'} bg-white rounded-[20px] shadow-[0px_3px_8px_-1px_rgba(50,50,71,0.05)] border border-gray-100`}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className={`text-black ${isDesktop ? 'text-base' : 'text-xs'} font-normal font-['Noto_Sans'] mb-1`}>
              담당교수 정보
            </div>
            <div className={`text-black ${isDesktop ? 'text-xl' : 'text-sm'} font-semibold font-['Noto_Sans'] ${isDesktop ? 'leading-10' : 'leading-none'} mb-4`}>
              {lectureData.professorInfo?.name || lectureData.professor}
            </div>
          </div>
          <div className={`${isDesktop ? 'px-4 py-3' : 'px-3 py-2'} bg-beige rounded-2xl`}>
            <div className={`space-y-${isDesktop ? '3' : '2'}`}>
              <div className="flex justify-between">
                <span className={`text-gray-500 ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                  이메일
                </span>
                <span className={`text-black ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                  {lectureData.professorInfo?.email || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-gray-500 ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                  연락처
                </span>
                <span className={`text-black ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                  {lectureData.professorInfo?.phone || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-gray-500 ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                  상담 가능 시간
                </span>
                <span className={`text-black ${isDesktop ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isDesktop ? 'leading-5' : 'leading-none'}`}>
                  {lectureData.professorInfo?.consultationHours || '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompetencySection = () => (
    <div className={styles.section.wrapper}>
      <h2 className={styles.section.title}>강의 역량 및 목표</h2>
      <VerticalTable
        rows={mapCompetencyRows(lectureData)}
        variant={isDesktop ? 'desktop' : 'mobile'}
      />
    </div>
  );

  const renderEvaluationSection = () => (
    <div className={styles.section.wrapper}>
      <h2 className={styles.section.title}>성적평가항목</h2>
      <EvaluationTable
        data={lectureData.evaluationItems || []}
        expandedRows={expandedEvaluationItems}
        onToggleExpand={toggleEvaluationItem}
        variant={isDesktop ? 'desktop' : 'mobile'}
      />
    </div>
  );

  const renderTextbookSection = () => (
    <div className={styles.section.wrapper}>
      <h2 className={styles.section.title}>교재명</h2>
      <StandardTable
        data={lectureData.textbooks || []}
        type="textbooks"
        variant={isDesktop ? 'desktop' : 'mobile'}
      />
    </div>
  );

  const renderAssignmentSection = () => (
    <div className={styles.section.wrapper}>
      <h2 className={styles.section.title}>과제명</h2>
      <StandardTable
        data={lectureData.assignments || []}
        type="assignments"
        variant={isDesktop ? 'desktop' : 'mobile'}
      />
    </div>
  );


  return (
    <div className={`w-full min-h-screen ${isDesktop ? 'px-24 py-12' : 'p-6'}`}>
      <div className={`${isDesktop ? 'w-full' : 'max-w-7xl'} mx-auto flex flex-col gap-5 bg-white rounded-lg`}>
        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
            <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-600" />
            <span className="text-blue-600">강의계획서를 불러오는 중...</span>
          </div>
        )}

        {/* Error Message */}
        {showError && error && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              강의계획서를 불러올 수 없습니다. 기본 정보를 표시합니다.
            </p>
          </div>
        )}
        {/* Header */}
        <TitleSection
          title="강의계획서 조회"
          icon={<ArrowLeft />}
          onClick={() => navigate(-1)}
          iconPosition="left"
        />

        {/* Course Title Section */}
        {isDesktop ? (
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="inline-flex flex-col justify-center items-start">
              <div className="text-center justify-center text-black text-3xl font-bold font-['Noto_Sans'] leading-[56px]">
                {lectureData.subjectName}
              </div>
              <div className="justify-center text-black text-2xl font-normal font-['Noto_Sans'] leading-[48px]">
                {lectureData.subjectNameEng || lectureData.subjectName}
              </div>
            </div>
            <div className="self-stretch py-1 flex justify-center items-end gap-4">
              <button className="w-32 h-12 relative bg-emerald-800 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-emerald-900 transition-colors">
                <SearchIcon className="w-5 h-5 text-white" fill='#ffffff' />
                <span className="text-white text-lg font-bold font-['Noto_Sans']">과목해설</span>
              </button>
              <button className="w-32 h-12 relative bg-stone-200 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-stone-300 transition-colors">
                <DownloadIcon className="w-5 h-5 text-black" />
                <span className="text-black text-lg font-bold font-['Noto_Sans']">다운로드</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                {lectureData.subjectName}
              </div>
              <div className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                {lectureData.subjectNameEng || lectureData.subjectName}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1.5">
              <Badge
                as="button"
                variant="primary"
                size="lg"
                icon={<SearchIcon className="w-4 h-4 text-white" fill='#ffffff' />}
                onClick={() => console.log('과목해설 클릭')}
                hover="hover:bg-[#025830]"
                className="h-8"
              >
                과목해설
              </Badge>
              <Badge
                as="button"
                variant="beige"
                size="lg"
                icon={<DownloadIcon className="w-4 h-4 text-black" />}
                onClick={() => console.log('다운로드 클릭')}
                hover="hover:bg-beige/80"
                className="h-8"
              >
                다운로드
              </Badge>
            </div>
          </div>
        )}

        {/* Basic Information Section */}
        {renderBasicInfoSection()}


        {/* Competency and Goals Section */}
        {renderCompetencySection()}

        {/* Evaluation Section */}
        {renderEvaluationSection()}

        {/* Textbook Section */}
        {renderTextbookSection()}

        {/* Assignment Section */}
        {renderAssignmentSection()}

        {/* Weekly Schedule Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            주별 강의계획
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lectureData.weeklyPlans && lectureData.weeklyPlans.length > 0 ? (
              lectureData.weeklyPlans.map((plan) => (
                <WeeklyPlanCard
                  key={plan.week}
                  plan={plan}
                  fallbackProfessor={lectureData.professor}
                />
              ))
            ) : (
              Array.from({ length: 16 }, (_, i) => i + 1).map((week) => (
                <DefaultWeeklyPlanCard
                  key={week}
                  week={week}
                  fallbackProfessor={lectureData.professor}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLecture;