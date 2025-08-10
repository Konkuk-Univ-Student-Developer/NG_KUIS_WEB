import React, { useState, useEffect } from "react";
import { SESSION_DURATION_SECONDS } from "@/constants/TimerConstants";
import { formatTime } from "@/utils/timer";

const SessionTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(SESSION_DURATION_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const handleExtendSession = () => {
    setSeconds(SESSION_DURATION_SECONDS);
  };

  return (
    <div className="relative h-10 w-[132px] text-xs">
      <div
        onClick={handleExtendSession}
        className="absolute px-6 top-0 z-10 flex h-full w-full items-center justify-start rounded-full bg-darkgreen text-white font-semibold transition hover:brightness-90"
      >
        연장
      </div>
      <div className="absolute right-0 top-0 z-20 flex h-full w-20 items-center justify-center rounded-full bg-beige font-semibold text-darkgreen">
        {formatTime(seconds)}
      </div>
    </div>
  );
};

export default SessionTimer;
