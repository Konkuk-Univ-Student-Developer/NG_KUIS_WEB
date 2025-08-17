import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, Loader2 } from 'lucide-react';
import { BLearningChart, CoreCompetencyChart } from '@/components/detail_lecture/charts';
import { TitleSection, Badge, RoundedTable, ExpandableTable, VerticalTable, tableStyles, getCellClass } from '@/components/commons';
import SearchIcon from "@/assets/icon/ic_search.svg?react";
import { LECTURE_DETAILS } from '@/constants/DetailLectureConstants';
import { DownloadIcon } from '@/assets/icon';
import type { CourseData } from '@/constants/TimetableConstants';
import { useLecturePlan, useMergedLectureData } from '@/api/hooks/lecture/useLecturePlan';

// 섹션 스타일 상수 (DetailLecture 전용)
const styles = {
  section: {
    title: "text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none",
    wrapper: "flex flex-col gap-5"
  }
};

const DetailLecture: React.FC = () => {
  const { courseNumber } = useParams<{ courseNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [showError, setShowError] = useState(false);
  const [expandedEvaluationItems, setExpandedEvaluationItems] = useState<Set<string>>(new Set());

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


  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 bg-white rounded-lg">
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

        {/* Basic Information Section */}
        <div className={styles.section.wrapper}>
          <div className="flex justify-between items-center">
            <h2 className={styles.section.title}>
              기본 정보
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {/* First Table */}
            <RoundedTable
              headers={['학년', '학수번호', '이수구분', '과목번호', '학점']}
              data={[{
                grade: lectureData.grade || '-',
                courseCode: lectureData.courseCode || '-',
                category: lectureData.category || lectureData.classification || '-',
                courseNumber: lectureData.courseNumber || '-',
                credit: lectureData.credit || 3
              }]}
              columns={['grade', 'courseCode', 'category', 'courseNumber', 'credit']}
            />

            {/* Second Table */}
            <RoundedTable
              headers={['현재인원', '학부인원', '대학생인원', '제한인원']}
              data={[{
                enrolled: lectureData.enrolled || 0,
                undergraduateEnrolled: lectureData.undergraduateEnrolled || 0,
                graduateEnrolled: lectureData.graduateEnrolled || 0,
                capacity: lectureData.capacity || 0
              }]}
              columns={['enrolled', 'undergraduateEnrolled', 'graduateEnrolled', 'capacity']}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {lectureData.tags?.map((tag, index) => (
                <Badge key={index} label={tag} variant="default" size="md" />
              )) || (
                  <>
                    {lectureData.department && <Badge label={lectureData.department} variant="default" size="md" />}
                    {courseData?.method && <Badge label={courseData.method} variant="default" size="md" />}
                  </>
                )}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* B-Learning Chart */}
            <BLearningChart data={lectureData.chartData?.bLearning} />

            {/* Core Competency Chart */}
            <CoreCompetencyChart data={lectureData.chartData?.coreCompetency} />
          </div>

          {/* Professor Info Card */}
          <div className="grid grid-cols-1">
            <div className="p-4 bg-white rounded-[20px] shadow-[0px_3px_8px_-1px_rgba(50,50,71,0.05)] border border-gray-100">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-black text-[10px] font-normal font-['Noto_Sans'] mb-1">
                    담당교수 정보
                  </div>
                  <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none mb-4">
                    {lectureData.professorInfo?.name || lectureData.professor}
                  </div>
                </div>
                <div className="px-3 py-2 bg-beige rounded-2xl">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        이메일
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                        {lectureData.professorInfo?.email || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        연락처
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                        {lectureData.professorInfo?.phone || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        상담 가능 시간
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                        {lectureData.professorInfo?.consultationHours || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Competency and Goals Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            강의 역량 및 목표
          </h2>
          <VerticalTable
            rows={[
              {
                label: '핵심역량 강의목표',
                value: lectureData.competencyGoals?.coreCompetencyGoal || '스스로 학습할 수 있는 능력',
                rowSpan: 1
              },
              {
                label: '주 전공역량',
                value: lectureData.competencyGoals?.mainCompetency || '대규모 SW의 협동 개발 능력 (상)'
              },
              {
                label: '주 전공역량 정의',
                value: lectureData.competencyGoals?.mainCompetencyDefinition || '스스로 학습할 수 있는 역량'
              },
              {
                label: '보조 전공역량1',
                value: lectureData.competencyGoals?.subCompetency1 || '대규모 SW의 협동 개발 능력 (상)'
              },
              {
                label: '보조 전공역량1 정의',
                value: lectureData.competencyGoals?.subCompetency1Definition || '스스로 학습할 수 있는 역량'
              },
              {
                label: '보조 전공역량2',
                value: lectureData.competencyGoals?.subCompetency2 || '대규모 SW의 협동 개발 능력 (상)'
              },
              {
                label: '보조 전공역량2 정의',
                value: lectureData.competencyGoals?.subCompetency2Definition || '스스로 학습할 수 있는 역량'
              },
              {
                label: '역량기반 교육목표',
                value: lectureData.competencyGoals?.competencyBasedGoal || '대규모 SW의 협동 개발 능력 (상)',
                rowSpan: 1
              },
              {
                label: '직무역량',
                value: lectureData.competencyGoals?.jobCompetencies || ['문제해결능력', '기술능력'],
                isCheckList: true
              }
            ]}
          />
        </div>

        {/* Evaluation Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            성적평가항목
          </h2>
          <ExpandableTable
            headers={['항목', '비중', '만점', '공개여부', '설명']}
            data={
              lectureData.evaluationItems && lectureData.evaluationItems.length > 0
                ? lectureData.evaluationItems
                : [
                  { item: '출석률', weight: '10%', maxScore: '10', isPublic: true, description: 'Checked with e-campus system' },
                  { item: '중간', weight: '30%', maxScore: '30', isPublic: true, description: 'Checked with e-campus system' },
                  { item: '기말', weight: '30%', maxScore: '30', isPublic: true, description: 'Checked with e-campus system' },
                  { item: '과제물', weight: '30%', maxScore: '30', isPublic: true, description: 'Checked with e-campus system' }
                ]
            }
            expandedRows={expandedEvaluationItems}
            onToggleExpand={toggleEvaluationItem}
            getRowKey={(row) => row.item}
            getExpandContent={(row) => row.description}
            renderRow={(row, rowIdx, totalRows, isExpanded) => (
              <>
                <td className={getCellClass('bodyBold', 0, 5, rowIdx === totalRows - 1)}>
                  {row.item}
                </td>
                <td className={getCellClass('body', 1, 5, rowIdx === totalRows - 1)}>
                  {row.weight}
                </td>
                <td className={getCellClass('body', 2, 5, rowIdx === totalRows - 1)}>
                  {row.maxScore}
                </td>
                <td className={`${getCellClass('body', 3, 5, rowIdx === totalRows - 1).replace('text-black text-sm font-normal font-[\'Noto_Sans\'] leading-none', '').trim()}`}>
                  {row.isPublic && <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />}
                </td>
                <td className={`${rowIdx === totalRows - 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center`}>
                  {row.description ? (
                    <ChevronDown className={`${tableStyles.evaluation.chevron} ${isExpanded ? 'rotate-180' : ''}`} />
                  ) : (
                    <ChevronDown className={tableStyles.evaluation.chevronDisabled} />
                  )}
                </td>
              </>
            )}
          />
        </div>

        {/* Textbook Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            교재명
          </h2>
          <RoundedTable
            headers={['번호', '교재구분', '교재명', '저자', '링크']}
            data={
              lectureData.textbooks && lectureData.textbooks.length > 0
                ? lectureData.textbooks
                : [1, 2, 3, 4].map(num => ({ index: num, type: '-', name: '-', author: '-', link: '-' }))
            }
            columns={['index', 'type', 'name', 'author', 'link']}
          />
        </div>

        {/* Assignment Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            과제명
          </h2>
          <RoundedTable
            headers={['번호', '구분', '과제명', '제출시기']}
            data={
              lectureData.assignments && lectureData.assignments.length > 0
                ? lectureData.assignments
                : [{ index: 1, type: '-', name: '-', dueDate: '-' }]
            }
            columns={['index', 'type', 'name', 'dueDate']}
          />
        </div>

        {/* Weekly Schedule Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            주별 강의계획
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lectureData.weeklyPlans && lectureData.weeklyPlans.length > 0 ? (
              lectureData.weeklyPlans.map((plan) => (
                <div key={plan.week} className="p-4 bg-beige rounded-[20px] flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                        week{plan.week} {plan.dateRange && `(${plan.dateRange})`}
                      </div>
                      <div className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                        {plan.topic}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        담당 교강사 : {plan.instructor}
                      </div>
                      <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        학습 활동 : {plan.activities}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <Badge variant="white-gray" size="md">
                      {plan.type}
                    </Badge>
                    {plan.schedule && (
                      <Badge variant="white-gray" size="md">
                        {plan.schedule}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: 16 }, (_, i) => i + 1).map((week) => (
                <div key={week} className="p-4 bg-beige rounded-[20px] flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                        week{week}
                      </div>
                      <div className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                        강의 내용
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        담당 교강사 : {lectureData.professor || '-'}
                      </div>
                      <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        학습 활동 : -
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <Badge variant="white-gray" size="md">
                      이론
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLecture;