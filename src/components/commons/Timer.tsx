import React, { useState, useEffect } from "react";

const INITIAL_TIME_IN_SECONDS = 120 * 60;

const SessionTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(INITIAL_TIME_IN_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const handleExtendSession = () => {
    setSeconds(INITIAL_TIME_IN_SECONDS);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="relative h-10 w-[132px] text-xs">
      <div
        onClick={handleExtendSession}
        className="absolute px-6 top-0 z-10 flex h-full w-full items-center justify-start rounded-full bg-darkgreen text-white font-semibold transition hover:brightness-90"
      >
        연장
      </div>
      <div className="absolute right-0 top-0 z-20 flex h-full w-20 items-center justify-center rounded-full bg-beige text-darkgreen font-semibold">
        {`${minutes}분 ${String(remainingSeconds).padStart(2, "0")}초`}
      </div>
    </div>
  );
};

export default SessionTimer;
