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
import { useMergedLectureData } from '@/api/hooks/lecture/useLecturePlan';
import { useCourseDetail } from '@/api/hooks/course/useCourseDetail';
import type { CourseDetailResponse } from '@/types/courseDetail';

// 섹션 스타일 상수 (DetailLecture 전용)
const styles = {
  section: {
    title: "text-[#036B3F] text-lg md:text-2xl font-semibold font-['Noto_Sans'] leading-7",
    wrapper: "flex flex-col gap-5 md:gap-6 md:mt-9"
  }
};

const DetailLecture: React.FC = () => {
  const { courseNumber } = useParams<{ courseNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [showError, setShowError] = useState(false);
  const [expandedEvaluationItems, setExpandedEvaluationItems] = useState<Set<string>>(new Set());

  // Media query for responsive behavior (md breakpoint: 768px)
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  // Get course data and semester from navigation state
  const courseData = location.state?.courseData as CourseData | undefined;
  const semester = location.state?.semester as string | undefined;

  // Log navigation data for debugging
  React.useEffect(() => {
    console.log('🔍 DetailLecture Component Loaded:', {
      urlCourseNumber: courseNumber,
      semester: semester,
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
  }, [courseData, courseNumber, semester]);

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

  // Use API hook for course details
  const { data: apiData, loading, error } = useCourseDetail(effectiveCourseNumber);

  // Convert API data to LectureDetail format
  const fetchedData = apiData ? convertApiDataToLectureDetail(apiData) : null;

  // Convert API response to LectureDetail format
  function convertApiDataToLectureDetail(data: CourseDetailResponse): Partial<LectureDetail> {
    return {
      subjectCode: data.subjectInfo?.sbjt_id,
      subjectName: data.subjectInfo?.subject_name,
      subjectNameEng: data.subjectInfo?.subject_name_eng,
      description: data.subjectInfo?.goal,
      evaluationItems: data.evaluation?.map(item => ({
        item: item.item_name,
        weight: `${item.ratio}%`,
        maxScore: item.full_score,
        isPublic: item.is_public === '공개',
        description: 'Checked with e-campus system'
      })),
      textbooks: data.books?.map((book, index) => ({
        id: index + 1,
        type: book.type,
        name: book.title,
        author: book.author,
        link: `${book.publisher}${book.year ? `, ${book.year}` : ''}`
      })),
      assignments: data.assignments?.map((assignment, index) => ({
        id: index + 1,
        type: assignment.method || '과제',
        name: assignment.title,
        dueDate: assignment.due_date
      })),
      weeklyPlans: data.weeklyPlans?.map(plan => ({
        week: plan.week,
        dateRange: plan.period,
        topic: plan.topic,
        instructor: plan.instructor || courseData?.professor || '담당교수',
        activities: plan.content,
        type: plan.type || '이론',
        schedule: plan.activity || ''
      }))
    };
  }

  // Log fetched data
  React.useEffect(() => {
    if (apiData) {
      console.log('📚 Course Detail Data Successfully Fetched from API:', {
        subjectName: apiData.subjectInfo?.subject_name,
        subjectId: apiData.subjectInfo?.sbjt_id,
        evaluationItems: apiData.evaluation?.length || 0,
        textbooks: apiData.books?.length || 0,
        assignments: apiData.assignments?.length || 0,
        weeklyPlans: apiData.weeklyPlans?.length || 0
      });
    }
  }, [apiData]);

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
        value: competencyGoals.coreCompetencyGoal || '성실성, 소통역량, 창의역량, 종합적사고력, 주도성, 글로벌시민의식',
        rowSpan: 1
      },
      {
        label: '수강신청 유의사항',
        value: lectureData.prerequisites && lectureData.prerequisites.length > 0
          ? lectureData.prerequisites.join(', ')
          : '-'
      },
      {
        label: '주 전공역량',
        value: competencyGoals.mainCompetency || '자기주도학습능력'
      },
      {
        label: '주 전공역량 정의',
        value: competencyGoals.mainCompetencyDefinition || '스스로 학습할 수 있는 역량'
      },
      {
        label: '보조 전공역량1',
        value: competencyGoals.subCompetency1 || '종합적사고력'
      },
      {
        label: '보조 전공역량1 정의',
        value: competencyGoals.subCompetency1Definition || '다양한 관점에서 문제를 분석하는 역량'
      },
      {
        label: '보조 전공역량2',
        value: competencyGoals.subCompetency2 || '성실성'
      },
      {
        label: '보조 전공역량2 정의',
        value: competencyGoals.subCompetency2Definition || '꾸준히 노력하며 학습하는 역량'
      },
      {
        label: '역량기반 교육목표',
        value: competencyGoals.competencyBasedGoal || 'Understand the basics of major subjects',
        rowSpan: 1
      },
      {
        label: '직무역량',
        value: (competencyGoals.jobCompetencies &&
          competencyGoals.jobCompetencies.length > 0 &&
          competencyGoals.jobCompetencies.some(item => item.trim()))
          ? competencyGoals.jobCompetencies
          : ['문제해결능력', '기술역량'],
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
        {isTablet ? (
          <DesktopBasicInfoTables lectureData={lectureData} courseData={courseData} variant="desktop" />
        ) : (
          <>
            <BasicInfoTable data={[mapCourseData(lectureData)]} type="courseInfo" variant="mobile" />
            <BasicInfoTable data={[mapEnrollmentData(lectureData)]} type="enrollment" variant="mobile" />
          </>
        )}
        {renderTags()}
      </div>
      {isTablet ? (
        renderChartsAndProfessor()
      ) : (
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
        <Badge key={index} label={tag} variant="default" size={isTablet ? "xl" : "md"} />
      )) || (
          <>
            {!isTablet && lectureData.department && <Badge label={lectureData.department} variant="default" size="md" />}
            {!isTablet && courseData?.method && <Badge label={courseData.method} variant="default" size="md" />}
          </>
        )}
    </div>
  );

  const renderChartsAndProfessor = () => {
    if (isDesktop) {
      // 1440px 이상: 3-column layout (B러닝 + 핵심역량(2칸) + 교수정보)
      return (
        <div className="grid grid-cols-4 gap-4">
          <BLearningChart />
          <div className="col-span-2">
            <CoreCompetencyChart />
          </div>
          <div className="grid grid-cols-1">
            <div className="p-6 bg-white rounded-[20px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] border border-gray-100">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-black text-base font-normal font-['Noto_Sans'] mb-1">
                    담당교수 정보
                  </div>
                  <div className="text-black text-xl font-semibold font-['Noto_Sans'] leading-10 mb-4">
                    {lectureData.professorInfo?.name || lectureData.professor}
                  </div>
                </div>
                <div className="px-4 py-3 bg-beige rounded-2xl">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-5">
                        이메일
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-5">
                        {lectureData.professorInfo?.email || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-5">
                        연락처
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-5">
                        {lectureData.professorInfo?.phone || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-5">
                        상담 가능 시간
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-5">
                        {lectureData.professorInfo?.consultationHours || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (isTablet) {
      // 768px-1439px: 2-column charts + separate professor info below
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <BLearningChart />
            <div className="col-span-2">
              <CoreCompetencyChart />
            </div>
          </div>
          {renderProfessorInfo()}
        </div>
      );
    } else {
      // Mobile: 2-column charts
      return (
        <div className="grid grid-cols-2 gap-4">
          <BLearningChart />
          <CoreCompetencyChart />
        </div>
      );
    }
  };

  const renderProfessorInfo = () => (
    <div className="grid grid-cols-1">
      <div className={`${isTablet ? 'p-6' : 'p-4'} bg-white rounded-[20px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] border border-gray-100`}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className={`text-black ${isTablet ? 'text-base' : 'text-xs'} font-normal font-['Noto_Sans'] mb-1`}>
              담당교수 정보
            </div>
            <div className={`text-black ${isTablet ? 'text-xl' : 'text-sm'} font-semibold font-['Noto_Sans'] ${isTablet ? 'leading-10' : 'leading-none'} mb-4`}>
              {lectureData.professorInfo?.name || lectureData.professor}
            </div>
          </div>
          <div className={`${isTablet ? 'px-4 py-3' : 'px-3 py-2'} bg-beige rounded-2xl`}>
            <div className={`space-y-${isTablet ? '3' : '2'}`}>
              <div className="flex justify-between">
                <span className={`text-gray-500 ${isTablet ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isTablet ? 'leading-5' : 'leading-none'}`}>
                  이메일
                </span>
                <span className={`text-black ${isTablet ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isTablet ? 'leading-5' : 'leading-none'}`}>
                  {lectureData.professorInfo?.email || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-gray-500 ${isTablet ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isTablet ? 'leading-5' : 'leading-none'}`}>
                  연락처
                </span>
                <span className={`text-black ${isTablet ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isTablet ? 'leading-5' : 'leading-none'}`}>
                  {lectureData.professorInfo?.phone || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-gray-500 ${isTablet ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isTablet ? 'leading-5' : 'leading-none'}`}>
                  상담 가능 시간
                </span>
                <span className={`text-black ${isTablet ? 'text-sm' : 'text-sm'} font-normal font-['Noto_Sans'] ${isTablet ? 'leading-5' : 'leading-none'}`}>
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
        variant={isTablet ? 'desktop' : 'mobile'}
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
        variant={isTablet ? 'desktop' : 'mobile'}
      />
    </div>
  );

  const renderTextbookSection = () => (
    <div className={styles.section.wrapper}>
      <h2 className={styles.section.title}>교재명</h2>
      <StandardTable
        data={lectureData.textbooks || []}
        type="textbooks"
        variant={isTablet ? 'desktop' : 'mobile'}
      />
    </div>
  );

  const renderAssignmentSection = () => (
    <div className={styles.section.wrapper}>
      <h2 className={styles.section.title}>과제명</h2>
      <StandardTable
        data={lectureData.assignments || []}
        type="assignments"
        variant={isTablet ? 'desktop' : 'mobile'}
      />
    </div>
  );


  return (
    <div className={`w-full min-h-screen ${isTablet ? 'px-24 py-12' : 'p-6'}`}>
      <div className={`${isTablet ? 'w-full' : 'max-w-7xl'} mx-auto flex flex-col gap-5 bg-white rounded-lg`}>
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
        {isTablet ? (
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