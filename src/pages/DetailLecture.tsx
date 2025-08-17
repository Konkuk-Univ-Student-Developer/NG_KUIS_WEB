import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen, Check, ChevronUp, ChevronDown } from 'lucide-react';

const DetailLecture: React.FC = () => {
  const { subjectCode } = useParams<{ subjectCode: string }>();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 bg-white rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-6 h-6 relative hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 absolute left-[4px] top-[4px] text-gray-500" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-[#036B3F] text-lg font-bold font-['Noto_Sans'] leading-relaxed">
              강의계획서 조회
            </h1>
          </div>
          <div className="w-6 h-6" />
        </div>

        {/* Course Title Section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
              분산시스템및컴퓨팅
            </div>
            <div className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
              DISTRIBUTED SYSTEM & COMPUTING
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5">
            <button className="h-8 px-4 bg-[#036B3F] rounded-[10px] flex items-center gap-2 hover:bg-[#025830] transition-colors">
              <BookOpen className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold font-['Noto_Sans'] leading-none">
                과목해설
              </span>
            </button>
            <button className="h-8 px-4 bg-stone-200 rounded-[10px] flex items-center gap-2 hover:bg-stone-300 transition-colors">
              <Download className="w-3.5 h-4 text-black" />
              <span className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                다운로드
              </span>
            </button>
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
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-stone-200">
                    <th className="border border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      학년
                    </th>
                    <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      학수번호
                    </th>
                    <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      이수구분
                    </th>
                    <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      과목번호
                    </th>
                    <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      학점
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      4
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      BBAB12012
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      전선
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      3143
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      3.0
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Second Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-stone-200">
                    <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      현재인원
                    </th>
                    <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      학부인원
                    </th>
                    <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      대학생인원
                    </th>
                    <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      제한인원
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      45
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      45
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      0
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      46
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <div className="px-4 py-1 bg-stone-200 rounded-[10px]">
                <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                  컴퓨터공학부
                </span>
              </div>
              <div className="px-4 py-1 bg-stone-200 rounded-[10px]">
                <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                  캡스톤(A/B/F제)
                </span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* B-Learning Chart */}
            <div className="p-4 bg-white rounded-2xl shadow-[0px_3px_8px_-1px_rgba(50,50,71,0.05)] border border-gray-100">
              <div className="text-gray-900 text-[10px] font-bold font-['Noto_Sans'] mb-4">
                B러닝(녹화+대면)
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-20 h-20">
                  <div className="absolute w-20 h-20 bg-[#61A7DD]/60 rounded-full" />
                  <div className="absolute w-20 h-20 bg-[#F6DB00]/60 rounded-full mix-blend-multiply" />
                  <div className="absolute w-20 h-20 bg-[#036B3F]/60 rounded-full mix-blend-multiply" />
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#61A7DD]/60 rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        8주
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      대면
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#F6DB00]/60 rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        4주
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      녹화
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#036B3F]/60 rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        4주
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      실시간
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Competency Chart */}
            <div className="p-4 bg-white rounded-2xl shadow-[0px_3px_8px_-1px_rgba(50,50,71,0.05)] border border-gray-100">
              <div className="text-gray-900 text-[10px] font-bold font-['Noto_Sans'] mb-4">
                핵심역량
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-20 h-20">
                  <div className="absolute w-20 h-20 bg-[#61A7DD]/60 rounded-full" />
                  <div className="absolute w-20 h-20 bg-[#F6DB00]/60 rounded-full mix-blend-multiply" />
                  <div className="absolute w-20 h-20 bg-[#036B3F]/60 rounded-full mix-blend-multiply" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#61A7DD] rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        30%
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      성실성
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#036B3F] rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        0%
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      소통역량
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#F6DB00]/60 rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        0%
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      창의역량
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        50%
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      종합적사고력
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-zinc-400/70 rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        20%
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      주도성
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#C283C6] rounded-full" />
                      <span className="text-zinc-800 text-xs font-semibold font-['Inter'] leading-none">
                        0%
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-normal font-['Inter']">
                      글로벌시민의식
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professor Info Card */}
            <div className="p-4 bg-white rounded-[20px] shadow-[0px_3px_8px_-1px_rgba(50,50,71,0.05)] border border-gray-100">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-black text-[10px] font-normal font-['Noto_Sans'] mb-1">
                    담당교수 정보
                  </div>
                  <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none mb-4">
                    임민규 교수
                  </div>
                </div>
                <div className="px-3 py-2 bg-stone-200 rounded-2xl">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        이메일
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                        mingu@konkuk.ac.kr
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        연락처
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                        010-1111-2222
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                        상담 가능 시간
                      </span>
                      <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                        -
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle" rowSpan={1}>
                    핵심역량<br />강의목표
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    스스로 학습 어쩌고
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    주 전공역량
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    대규모 SW의 협동 개발 능력 (상)
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    주 전공역량<br />정의
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    스스로 학습 어쩌고
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    보조<br />전공역량1
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    대규모 SW의 협동 개발 능력 (상)
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    보조<br />전공역량1 정의
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    스스로 학습 어쩌고
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    보조<br />전공역량2
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    대규모 SW의 협동 개발 능력 (상)
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-3 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    보조<br />전공역량2 정의
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    스스로 학습 어쩌고
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] align-middle">
                    역량기반<br />교육목표
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2 text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    대규모 SW의 협동 개발 능력 (상)
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-400 bg-stone-200 px-2 py-4 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    직무역량
                  </td>
                  <td className="border border-zinc-400 bg-white px-3 py-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                          문제해결능력
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                          기술능력
                        </span>
                      </div>
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-200">
                  <th className="border border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    항목
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    비중
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    만점
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    공개여부
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    설명
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    출석률
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <ChevronDown className="w-3 h-2 text-[#036B3F] mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="border border-gray-500 bg-stone-200 px-2 py-1">
                    <div className="bg-white border border-gray-500 rounded px-2 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      Checked with e-campus system
                    </div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    중간
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    기말
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    과제물
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    퀴즈
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    발표
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    프로젝트
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    토론
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <ChevronUp className="w-3 h-2 text-gray-500 mx-auto rotate-90" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    기타5
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    0%
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    0
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center">
                    <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" />
                  </td>
                  <td className="border border-zinc-400 px-3 py-2"></td>
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-200">
                  <th className="border border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    번호
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    교재구분
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    교재명
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    저자
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    링크
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((num) => (
                  <tr key={num} className="bg-white">
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      {num}
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      10
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      10
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      10
                    </td>
                    <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      10
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assignment Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-[#036B3F] text-sm font-semibold font-['Noto_Sans'] leading-none">
            과제명
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-200">
                  <th className="border border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    번호
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    구분
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    과제명
                  </th>
                  <th className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                    제출시기
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    1
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                  <td className="border border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                    10
                  </td>
                </tr>
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
            {[1, 2, 3].map((week) => (
              <div key={week} className="px-3 py-4 bg-stone-200 rounded-[20px] flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="text-black text-sm font-semibold font-['Noto_Sans'] leading-none">
                      week{week} (0408-0414)
                    </div>
                    <div className="text-black text-sm font-normal font-['Noto_Sans'] leading-none">
                      3. Processes : Servers, code migration
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                      담당 교강사 : 임민규
                    </div>
                    <div className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                      학습 활동 : Implement project progress assignment
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className="px-4 py-1 bg-white rounded-[10px]">
                    <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                      Theory
                    </span>
                  </div>
                  <div className="px-4 py-1 bg-white rounded-[10px]">
                    <span className="text-gray-500 text-sm font-normal font-['Noto_Sans'] leading-none">
                      월01-04(녹화강의), 수01-04(신공1201)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLecture;