import type { SubjectRowData } from "@/types/graduation";
import React from "react";

const InfoTag: React.FC<{ label: string | number; widthClass: string }> = ({
  label,
  widthClass,
}) => (
  <div
    className={`relative flex justify-center items-center px-3 py-2 ${widthClass}`}
  >
    <div className="absolute inset-0 bg-[#eef0e4] rounded-xl z-0"></div>
    <span className="relative z-10 text-center text-black text-sm font-semibold leading-tight">
      {label}
    </span>
  </div>
);

function SubjectCard({
  courseCode,
  courseName,
  classification,
  credits,
  grade,
  year,
  semester,
  gradeLevel,
}: SubjectRowData) {
  const showDetails = year && semester && gradeLevel;

  return (
    <div className="w-full mt-1 mb-1 px-3 py-4 bg-white rounded-2xl border border-gray-100 flex flex-col justify-start items-start gap-1">
      <div className="self-stretch flex justify-between items-start">
        {/* Left Section: Course Info */}
        <div className="flex flex-col justify-start items-start gap-1">
          <div className="text-gray-500 text-xs font-light">
            {courseCode ?? "N/A"}
          </div>
          <div className="text-black text-base font-bold">
            {courseName ?? "Unnamed Course"}
          </div>
        </div>

        {/* Right Section: Tags */}
        <div className="flex justify-start items-center gap-2">
          <InfoTag label={classification ?? "-"} widthClass="w-[50px]" />
          <InfoTag label={`${credits ?? 0}학점`} widthClass="w-[58px]" />
          <InfoTag label={grade ?? "-"} widthClass="w-[42px]" />
        </div>
      </div>
      {showDetails && (
        <div className="inline-flex justify-start items-center gap-2 text-gray-500 text-sm">
          <span>{year}년</span>
          <span>{semester}</span>
          <span>{gradeLevel}학년</span>
        </div>
      )}
    </div>
  );
}

export default SubjectCard;