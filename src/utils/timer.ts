/**
 * 초(seconds)를 'X분 XX초' 형식의 문자열로 변환합니다.
 * @param totalSeconds 변환할 총 시간(초)
 * @returns "X분 XX초" 형식의 문자열
 */
export const formatTime = (totalSeconds: number): string => {
  const safeSeconds = Math.max(0, totalSeconds);

  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${minutes}분 ${formattedSeconds}초`;
};
