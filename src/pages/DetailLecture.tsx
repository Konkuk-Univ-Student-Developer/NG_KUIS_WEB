import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, Loader2 } from 'lucide-react';
import { BLearningChart, CoreCompetencyChart } from '@/components/detail_lecture/charts';
import { TitleSection, Badge } from '@/components/commons';
import SearchIcon from "@/assets/icon/ic_search.svg?react";
import { LECTURE_DETAILS } from '@/constants/DetailLectureConstants';
import { DownloadIcon } from '@/assets/icon';
import type { CourseData } from '@/constants/TimetableConstants';
import { useLecturePlan, useMergedLectureData } from '@/api/hooks/lecture/useLecturePlan';

// 공통 스타일 상수
const styles = {
  table: {
    wrapper: "overflow-hidden rounded-lg overflow-x-auto border border-zinc-400",
    base: "w-full border-collapse",
    headerRow: "bg-beige",
    bodyRow: "bg-white"
  },
  cell: {
    headerBase: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
    bodyBase: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none",
    firstHeader: "border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
    bodyBold: "border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none"
  },
  section: {
    title: "text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none",
    wrapper: "flex flex-col gap-5"
  },
  evaluation: {
    expandRow: "bg-white cursor-pointer hover:bg-gray-50",
    chevron: "w-4 h-4 text-[#036B3F] mx-auto transition-transform duration-300",
    chevronDisabled: "w-4 h-4 text-gray-400 mx-auto",
    expandedContent: "bg-white border border-gray-500 rounded px-2 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none transition-all duration-300 ease-in-out"
  }
};

// 헬퍼 함수: 테두리 클래스 생성
const getCellClass = (type: 'header' | 'body' | 'bodyBold', index: number, total: number, isLastRow: boolean = false) => {
  let baseClass = '';
  if (type === 'header') {
    baseClass = index === 0 ? styles.cell.firstHeader : styles.cell.headerBase;
  } else if (type === 'bodyBold') {
    baseClass = styles.cell.bodyBold;
  } else {
    baseClass = styles.cell.bodyBase;
  }
  
  const borderRight = index < total - 1 ? 'border-r' : '';
  const borderBottom = !isLastRow ? 'border-b' : '';
  
  return `${baseClass} ${borderRight} ${borderBottom}`.trim();
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

  // SimpleTable 컴포넌트: 기본 정보, 교재, 과제 테이블용
  const SimpleTable = ({ headers, data, renderCell }: {
    headers: string[];
    data: any[];
    renderCell: (row: any, rowIdx: number, totalRows: number) => React.ReactNode;
  }) => (
    <div className={styles.table.wrapper}>
      <table className={styles.table.base}>
        <thead>
          <tr className={styles.table.headerRow}>
            {headers.map((header, idx) => (
              <th key={idx} className={getCellClass('header', idx, headers.length)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className={styles.table.bodyRow}>
              {renderCell(row, rowIdx, data.length)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
            <SimpleTable
              headers={['학년', '학수번호', '이수구분', '과목번호', '학점']}
              data={[{
                grade: lectureData.grade || '-',
                courseCode: lectureData.courseCode || '-',
                category: lectureData.category || lectureData.classification || '-',
                courseNumber: lectureData.courseNumber || '-',
                credit: lectureData.credit || 3
              }]}
              renderCell={(row, rowIdx, totalRows) => (
                <>
                  <td className={getCellClass('body', 0, 5, true)}>
                    {row.grade}
                  </td>
                  <td className={getCellClass('body', 1, 5, true)}>
                    {row.courseCode}
                  </td>
                  <td className={getCellClass('body', 2, 5, true)}>
                    {row.category}
                  </td>
                  <td className={getCellClass('body', 3, 5, true)}>
                    {row.courseNumber}
                  </td>
                  <td className={getCellClass('body', 4, 5, true)}>
                    {row.credit}
                  </td>
                </>
              )}
            />

            {/* Second Table */}
            <SimpleTable
              headers={['현재인원', '학부인원', '대학생인원', '제한인원']}
              data={[{
                enrolled: lectureData.enrolled || 0,
                undergraduateEnrolled: lectureData.undergraduateEnrolled || 0,
                graduateEnrolled: lectureData.graduateEnrolled || 0,
                capacity: lectureData.capacity || 0
              }]}
              renderCell={(row, rowIdx, totalRows) => (
                <>
                  <td className={getCellClass('body', 0, 4, true)}>
                    {row.enrolled}
                  </td>
                  <td className={getCellClass('body', 1, 4, true)}>
                    {row.undergraduateEnrolled}
                  </td>
                  <td className={getCellClass('body', 2, 4, true)}>
                    {row.graduateEnrolled}
                  </td>
                  <td className={getCellClass('body', 3, 4, true)}>
                    {row.capacity}
                  </td>
                </>
              )}
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
          <div className="overflow-hidden rounded-lg overflow-x-auto border border-zinc-400">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle whitespace-normal" style={{ wordBreak: 'keep-all' }} rowSpan={1}>
                    핵심역량 강의목표
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.coreCompetencyGoal || '스스로 학습할 수 있는 능력'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none whitespace-normal" style={{ wordBreak: 'keep-all' }}>
                    주 전공역량
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.mainCompetency || '대규모 SW의 협동 개발 능력 (상)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle whitespace-normal" style={{ wordBreak: 'keep-all' }}>
                    주 전공역량 정의
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.mainCompetencyDefinition || '스스로 학습할 수 있는 역량'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle whitespace-normal" style={{ wordBreak: 'keep-all' }}>
                    보조 전공역량1
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.subCompetency1 || '대규모 SW의 협동 개발 능력 (상)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle whitespace-normal" style={{ wordBreak: 'keep-all' }}>
                    보조 전공역량1 정의
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.subCompetency1Definition || '스스로 학습할 수 있는 역량'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle whitespace-normal" style={{ wordBreak: 'keep-all' }}>
                    보조 전공역량2
                  </td>
                  <td className=" border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.subCompetency2 || '대규모 SW의 협동 개발 능력 (상)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle whitespace-normal" style={{ wordBreak: 'keep-all' }}>
                    보조 전공역량2 정의
                  </td>
                  <td className=" border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.subCompetency2Definition || '스스로 학습할 수 있는 역량'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle whitespace-normal" style={{ wordBreak: 'keep-all' }}>
                    역량기반 교육목표
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.competencyBasedGoal || '대규모 SW의 협동 개발 능력 (상)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-zinc-400 bg-beige px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none whitespace-normal" style={{ wordBreak: 'keep-all' }}>
                    직무역량
                  </td>
                  <td className="bg-white px-3 py-2">
                    <div className="flex flex-col gap-1">
                      {(lectureData.competencyGoals?.jobCompetencies || ['문제해결능력', '기술능력']).map((comp, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-zinc-400" />
                          <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                            {comp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Evaluation Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            성적평가항목
          </h2>
          <div className="overflow-hidden rounded-lg overflow-x-auto border border-zinc-400">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-beige">
                  <th className="border-r border-b border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    항목
                  </th>
                  <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    비중
                  </th>
                  <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    만점
                  </th>
                  <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    공개여부
                  </th>
                  <th className="border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    설명
                  </th>
                </tr>
              </thead>
              <tbody>
                {lectureData.evaluationItems && lectureData.evaluationItems.length > 0 ? (
                  lectureData.evaluationItems.map((evalItem, index, arr) => (
                    <React.Fragment key={evalItem.item}>
                      <tr
                        className={styles.evaluation.expandRow}
                        onClick={() => evalItem.description && toggleEvaluationItem(evalItem.item)}
                      >
                        <td className={getCellClass('bodyBold', 0, 5, index === arr.length - 1)}>
                          {evalItem.item}
                        </td>
                        <td className={getCellClass('body', 1, 5, index === arr.length - 1)}>
                          {evalItem.weight}
                        </td>
                        <td className={getCellClass('body', 2, 5, index === arr.length - 1)}>
                          {evalItem.maxScore}
                        </td>
                        <td className={`${getCellClass('body', 3, 5, index === arr.length - 1).replace(styles.cell.bodyBase, '').trim()} border-zinc-400 px-3 py-2 text-center`}>
                          {evalItem.isPublic && <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />}
                        </td>
                        <td className={`${index === arr.length - 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center`}>
                          {evalItem.description ? (
                            <ChevronDown className={`${styles.evaluation.chevron} ${expandedEvaluationItems.has(evalItem.item) ? 'rotate-180' : ''}`} />
                          ) : (
                            <ChevronDown className={styles.evaluation.chevronDisabled} />
                          )}
                        </td>
                      </tr>
                      {expandedEvaluationItems.has(evalItem.item) && evalItem.description && (
                        <tr className="animate-fadeIn">
                          <td colSpan={5} className={`${index === arr.length - 1 ? '' : 'border-b'} border-gray-500 bg-beige px-2 py-1`}>
                            <div className={styles.evaluation.expandedContent}>
                              {evalItem.description}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  // 기본값 표시
                  <>
                    <tr className={styles.evaluation.expandRow} onClick={() => toggleEvaluationItem('출석률')}>
                      <td className={getCellClass('bodyBold', 0, 5, false)}>
                        출석률
                      </td>
                      <td className={getCellClass('body', 1, 5, false)}>
                        10%
                      </td>
                      <td className={getCellClass('body', 2, 5, false)}>
                        10
                      </td>
                      <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                        <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                      </td>
                      <td className="border-b border-zinc-400 px-3 py-2 text-center">
                        <ChevronDown className={`${styles.evaluation.chevron} ${expandedEvaluationItems.has('출석률') ? 'rotate-180' : ''}`} />
                      </td>
                    </tr>
                    {expandedEvaluationItems.has('출석률') && (
                      <tr className="animate-fadeIn">
                        <td colSpan={5} className="border-b border-gray-500 bg-beige px-2 py-1">
                          <div className={styles.evaluation.expandedContent}>
                            Checked with e-campus system
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr className={styles.evaluation.expandRow} onClick={() => toggleEvaluationItem('중간')}>
                      <td className={getCellClass('bodyBold', 0, 5, false)}>
                        중간
                      </td>
                      <td className={getCellClass('body', 1, 5, false)}>
                        30%
                      </td>
                      <td className={getCellClass('body', 2, 5, false)}>
                        30
                      </td>
                      <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                        <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                      </td>
                      <td className="border-b border-zinc-400 px-3 py-2 text-center">
                        <ChevronDown className={`${styles.evaluation.chevron} ${expandedEvaluationItems.has('중간') ? 'rotate-180' : ''}`} />
                      </td>
                    </tr>
                    {expandedEvaluationItems.has('중간') && (
                      <tr className="animate-fadeIn">
                        <td colSpan={5} className="border-b border-gray-500 bg-beige px-2 py-1">
                          <div className={styles.evaluation.expandedContent}>
                            Checked with e-campus system
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr className={styles.evaluation.expandRow} onClick={() => toggleEvaluationItem('기말')}>
                      <td className={getCellClass('bodyBold', 0, 5, false)}>
                        기말
                      </td>
                      <td className={getCellClass('body', 1, 5, false)}>
                        30%
                      </td>
                      <td className={getCellClass('body', 2, 5, false)}>
                        30
                      </td>
                      <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                        <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                      </td>
                      <td className="border-b border-zinc-400 px-3 py-2 text-center">
                        <ChevronDown className={`${styles.evaluation.chevron} ${expandedEvaluationItems.has('기말') ? 'rotate-180' : ''}`} />
                      </td>
                    </tr>
                    {expandedEvaluationItems.has('기말') && (
                      <tr className="animate-fadeIn">
                        <td colSpan={5} className="border-b border-gray-500 bg-beige px-2 py-1">
                          <div className={styles.evaluation.expandedContent}>
                            Checked with e-campus system
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr className={styles.evaluation.expandRow} onClick={() => toggleEvaluationItem('과제물')}>
                      <td className={getCellClass('bodyBold', 0, 5, true)}>
                        과제물
                      </td>
                      <td className={getCellClass('body', 1, 5, true)}>
                        30%
                      </td>
                      <td className={getCellClass('body', 2, 5, true)}>
                        30
                      </td>
                      <td className="border-r border-zinc-400 px-3 py-2 text-center">
                        <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <ChevronDown className={`${styles.evaluation.chevron} ${expandedEvaluationItems.has('과제물') ? 'rotate-180' : ''}`} />
                      </td>
                    </tr>
                    {expandedEvaluationItems.has('과제물') && (
                      <tr className="animate-fadeIn">
                        <td colSpan={5} className="bg-beige px-2 py-1">
                          <div className={styles.evaluation.expandedContent}>
                            Checked with e-campus system
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Textbook Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            교재명
          </h2>
          <SimpleTable
            headers={['번호', '교재구분', '교재명', '저자', '링크']}
            data={
              lectureData.textbooks && lectureData.textbooks.length > 0
                ? lectureData.textbooks
                : [1, 2, 3, 4].map(num => ({ num, type: '-', name: '-', author: '-', link: '-' }))
            }
            renderCell={(book, rowIdx, totalRows) => {
              const isLastRow = rowIdx === totalRows - 1;
              if (lectureData.textbooks && lectureData.textbooks.length > 0) {
                return (
                  <>
                    <td className={getCellClass('body', 0, 5, isLastRow)}>
                      {rowIdx + 1}
                    </td>
                    <td className={getCellClass('body', 1, 5, isLastRow)}>
                      {book.type}
                    </td>
                    <td className={getCellClass('body', 2, 5, isLastRow)}>
                      {book.name}
                    </td>
                    <td className={getCellClass('body', 3, 5, isLastRow)}>
                      {book.author}
                    </td>
                    <td className={getCellClass('body', 4, 5, isLastRow)}>
                      {book.link || '-'}
                    </td>
                  </>
                );
              } else {
                return (
                  <>
                    <td className={getCellClass('body', 0, 5, isLastRow)}>
                      {book.num}
                    </td>
                    <td className={getCellClass('body', 1, 5, isLastRow)}>
                      -
                    </td>
                    <td className={getCellClass('body', 2, 5, isLastRow)}>
                      -
                    </td>
                    <td className={getCellClass('body', 3, 5, isLastRow)}>
                      -
                    </td>
                    <td className={getCellClass('body', 4, 5, isLastRow)}>
                      -
                    </td>
                  </>
                );
              }
            }}
          />
        </div>

        {/* Assignment Section */}
        <div className={styles.section.wrapper}>
          <h2 className={styles.section.title}>
            과제명
          </h2>
          <SimpleTable
            headers={['번호', '구분', '과제명', '제출시기']}
            data={
              lectureData.assignments && lectureData.assignments.length > 0
                ? lectureData.assignments
                : [{ num: 1, type: '-', name: '-', dueDate: '-' }]
            }
            renderCell={(assignment, rowIdx, totalRows) => {
              const isLastRow = rowIdx === totalRows - 1;
              if (lectureData.assignments && lectureData.assignments.length > 0) {
                return (
                  <>
                    <td className={getCellClass('body', 0, 4, isLastRow)}>
                      {rowIdx + 1}
                    </td>
                    <td className={getCellClass('body', 1, 4, isLastRow)}>
                      {assignment.type}
                    </td>
                    <td className={getCellClass('body', 2, 4, isLastRow)}>
                      {assignment.name}
                    </td>
                    <td className={getCellClass('body', 3, 4, isLastRow)}>
                      {assignment.dueDate}
                    </td>
                  </>
                );
              } else {
                return (
                  <>
                    <td className={getCellClass('body', 0, 4, true)}>
                      1
                    </td>
                    <td className={getCellClass('body', 1, 4, true)}>
                      -
                    </td>
                    <td className={getCellClass('body', 2, 4, true)}>
                      -
                    </td>
                    <td className={getCellClass('body', 3, 4, true)}>
                      -
                    </td>
                  </>
                );
              }
            }}
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
                <div key={week} className="px-3 py-4 bg-beige rounded-[20px] flex flex-col gap-5">
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