import React from "react";

interface StatusCircleProps {
  status: "pass" | "non-pass";
  canGraduateEarly: boolean;
}

const StatusCircle: React.FC<StatusCircleProps> = ({
  status,
  canGraduateEarly,
}) => {
  const isPass = status === "pass";
  const circleBgColor = isPass ? "bg-blue" : "bg-danger";
  const displayText = isPass ? "PASS" : "FAIL";

  const subText = `조기졸업: ${canGraduateEarly ? "Y" : "N"}`;

  return (
    <div className="inline-flex flex-col items-center justify-center gap-1 md:gap-3">
      <div
        className={`
          flex flex-col items-center justify-center rounded-full
          h-18 w-18 p-6
          md:h-[148px] md:w-[148px] md:px-[46px] md:py-[30px]
          ${circleBgColor} 
        `}
      >
        <div
          className="text-center font-bold text-white
            text-lg leading-tight
            md:text-[28px] md:leading-[56px]"
        >
          {displayText}
        </div>
      </div>

      <div
        className="text-center text-darkgray
        text-xs leading-normal 
        md:text-base md:leading-loose"
      >
        {subText}
      </div>
    </div>
  );
};

export default StatusCircle;