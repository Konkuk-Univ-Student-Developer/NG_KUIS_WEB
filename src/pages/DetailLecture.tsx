import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { BLearningChart, CoreCompetencyChart } from '@/components/detail_lecture/charts';
import { TitleSection, Badge } from '@/components/commons';
import SearchIcon from "@/assets/icon/ic_search.svg?react";
import { LECTURE_DETAILS } from '@/constants/DetailLectureConstants';
import { DownloadIcon } from '@/assets/icon';
import type { CourseData } from '@/constants/TimetableConstants';
import { useLecturePlan, useMergedLectureData } from '@/api/hooks/lecture/useLecturePlan';


const DetailLecture: React.FC = () => {
  const { courseCode } = useParams<{ courseCode: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [showError, setShowError] = useState(false);

  // Get course data from navigation state
  const courseData = location.state?.courseData as CourseData | undefined;

  // Log navigation data for debugging
  React.useEffect(() => {
    console.log('🔍 DetailLecture Component Loaded:', {
      urlCourseCode: courseCode,
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
  }, [courseData, courseCode]);

  // Get default lecture data from constants
  // Use courseCode from courseData or URL parameter
  const defaultLectureData = LECTURE_DETAILS[courseCode || courseData?.courseCode || 'BBAB12012'] || LECTURE_DETAILS['BBAB12012'];

  // Fetch lecture plan from KUPIS
  // Note: We need year from courseData or default to current year
  const currentYear = new Date().getFullYear().toString();
  
  // Log the parameters being sent to useLecturePlan
  const lecturePlanParams = courseData ? {
    year: currentYear, // TODO: Get actual year from courseData or filters
    courseCode: courseData.courseCode,
    courseNumber: courseData.courseNumber
  } : undefined;
  
  React.useEffect(() => {
    console.log('📤 Lecture Plan Parameters:', {
      hasParams: !!lecturePlanParams,
      params: lecturePlanParams
    });
  }, [lecturePlanParams?.year, lecturePlanParams?.courseCode, lecturePlanParams?.courseNumber]);
  
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
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none">
              기본 정보
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {/* First Table */}
            <div className="overflow-hidden rounded-lg overflow-x-auto border border-zinc-400">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-beige">
                    <th className="border-r border-b border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      학년
                    </th>
                    <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      학수번호
                    </th>
                    <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      이수구분
                    </th>
                    <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      과목번호
                    </th>
                    <th className="border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      학점
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-r  border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.grade || '-'}
                    </td>
                    <td className="border-r  border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.courseCode || '-'}
                    </td>
                    <td className="border-r border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.category || lectureData.classification || '-'}
                    </td>
                    <td className="border-r border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.courseNumber || lectureData.subjectNumber || '-'}
                    </td>
                    <td className="px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.credit || 3}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Second Table */}
            <div className="overflow-hidden rounded-lg overflow-x-auto border border-zinc-400">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-beige">
                    <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      현재인원
                    </th>
                    <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      학부인원
                    </th>
                    <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      대학생인원
                    </th>
                    <th className="border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      제한인원
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-r  border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.enrolled || 0}
                    </td>
                    <td className="border-r  border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.undergraduateEnrolled || 0}
                    </td>
                    <td className="border-r  border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.graduateEnrolled || 0}
                    </td>
                    <td className=" border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {lectureData.capacity || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* B-Learning Chart */}
            <BLearningChart data={lectureData.chartData?.bLearning} />

            {/* Core Competency Chart */}
            <CoreCompetencyChart data={lectureData.chartData?.coreCompetency} />

            {/* Professor Info Card */}
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
        <div className="flex flex-col gap-5">
          <h2 className="text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none">
            강의 역량 및 목표
          </h2>
          <div className="overflow-hidden rounded-lg overflow-x-auto border border-zinc-400">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle" rowSpan={1}>
                    핵심역량<br />강의목표
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.coreCompetencyGoal || '스스로 학습할 수 있는 능력'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    주 전공역량
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.mainCompetency || '대규모 SW의 협동 개발 능력 (상)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    주 전공역량<br />정의
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.mainCompetencyDefinition || '스스로 학습 어쩌고'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    보조<br />전공역량1
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.subCompetency1 || '대규모 SW의 협동 개발 능력 (상)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    보조<br />전공역량1 정의
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.subCompetency1Definition || '스스로 학습 어쩌고'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    보조<br />전공역량2
                  </td>
                  <td className=" border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.subCompetency2 || '대규모 SW의 협동 개발 능력 (상)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    보조<br />전공역량2 정의
                  </td>
                  <td className=" border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.subCompetency2Definition || '스스로 학습 어쩌고'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-b border-zinc-400 bg-beige px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    역량기반<br />교육목표
                  </td>
                  <td className="border-b border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    {lectureData.competencyGoals?.competencyBasedGoal || '대규모 SW의 협동 개발 능력 (상)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-zinc-400 bg-beige px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
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
        <div className="flex flex-col gap-5">
          <h2 className="text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none">
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
                <tr className="bg-white">
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    출석률
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border-b border-zinc-400 px-3 py-2 text-center">
                    <ChevronDown className="w-3 h-2 text-[#036B3F] mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="border-b border-gray-500 bg-beige px-2 py-1">
                    <div className="bg-white border border-gray-500 rounded px-2 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      Checked with e-campus system
                    </div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    중간
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className=" border-b border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    기말
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className=" border-b border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    과제물
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border-b border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    퀴즈
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border-b border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    발표
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border-b border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-r border-b border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    프로젝트
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border-b border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    토론
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border-r border-b border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border-b border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-r border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    기타5
                  </td>
                  <td className="border-r border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    0%
                  </td>
                  <td className="border-r border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    0
                  </td>
                  <td className="border-r border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className=" px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Textbook Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none">
            교재명
          </h2>
          <div className="overflow-hidden rounded-lg overflow-x-auto border border-zinc-400">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-beige">
                  <th className="border-r border-b border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    번호
                  </th>
                  <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    교재구분
                  </th>
                  <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    교재명
                  </th>
                  <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    저자
                  </th>
                  <th className="border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    링크
                  </th>
                </tr>
              </thead>
              <tbody>
                {lectureData.textbooks && lectureData.textbooks.length > 0 ? (
                  lectureData.textbooks.map((book, index, arr) => (
                    <tr key={index} className="bg-white">
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {index + 1}
                      </td>
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {book.type}
                      </td>
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {book.name}
                      </td>
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {book.author}
                      </td>
                      <td className={`${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {book.link || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  [1, 2, 3, 4].map((num, index, arr) => (
                    <tr key={num} className="bg-white">
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {num}
                      </td>
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        -
                      </td>
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        -
                      </td>
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        -
                      </td>
                      <td className={`${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        -
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assignment Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none">
            과제명
          </h2>
          <div className="overflow-hidden rounded-lg overflow-x-auto border border-zinc-400">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-beige">
                  <th className="border-r border-b border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    번호
                  </th>
                  <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    구분
                  </th>
                  <th className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    과제명
                  </th>
                  <th className="border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    제출시기
                  </th>
                </tr>
              </thead>
              <tbody>
                {lectureData.assignments && lectureData.assignments.length > 0 ? (
                  lectureData.assignments.map((assignment, index, arr) => (
                    <tr key={index} className="bg-white">
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {index + 1}
                      </td>
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {assignment.type}
                      </td>
                      <td className={`border-r ${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {assignment.name}
                      </td>
                      <td className={`${arr.length === index + 1 ? '' : 'border-b'} border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none`}>
                        {assignment.dueDate}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white">
                    <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      1
                    </td>
                    <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      -
                    </td>
                    <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      -
                    </td>
                    <td className="border-r border-b border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      -
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Schedule Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none">
            주별 강의계획
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {lectureData.weeklyPlans && lectureData.weeklyPlans.length > 0 ? (
              lectureData.weeklyPlans.slice(0, 6).map((plan) => (
                <div key={plan.week} className="px-3 py-4 bg-beige rounded-[20px] flex flex-col gap-5">
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
              [1, 2, 3].map((week) => (
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