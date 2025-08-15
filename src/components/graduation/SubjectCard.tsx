import type { SubjectRowData } from "@/types/graduation";
import InfoTag from "@/components/graduation/InfoTag";

function SubjectCard({
  courseYear,
  semester,
  gradeLevel,
  courseNumber,
  courseName,
  divisionLabel,
  credit,
  letterGrade
}: SubjectRowData) {

  const isShowDetails = courseYear && semester && gradeLevel;

  return (
    <div className="w-full mt-1 mb-1 px-3 py-4 bg-white rounded-2xl border border-gray-100 flex flex-col justify-start items-start gap-1">
      <div className="self-stretch flex justify-between items-start">
        {/* Left Section: Course Info */}
        <div className="flex flex-col justify-start items-start gap-1">
          <div className="text-gray-500 text-xs font-light">
            {courseNumber ?? "N/A"}
          </div>
          <div className="text-black text-base font-bold">
            {courseName ?? "Unnamed Course"}
          </div>
        </div>

        {/* Right Section: Tags */}
        <div className="flex justify-start items-center gap-2">
          <InfoTag label={divisionLabel ?? "-"} widthClass="w-[50px]" />
          <InfoTag label={`${credit ?? 0}학점`} widthClass="w-[58px]" />
          <InfoTag label={letterGrade ?? "-"} widthClass="w-[42px]" />
        </div>
      </div>
      {isShowDetails && (
        <div className="inline-flex justify-start items-center gap-2 text-gray-500 text-sm">
          <span>{courseYear}년</span>
          <span>{semester}</span>
          <span>{gradeLevel}</span>
        </div>
      )}
    </div>
  );
}

export default SubjectCard;