type DateFormatVariant = "full" | "short";

// 날짜 형식을 'YYYY-MM-DD'에서 'MM.DD' 또는 'YYYY-MM-DD'로 변환하는 함수
export const formatDate = (
  dateString: string,
  variant: DateFormatVariant = "full"
): string => {
  const parts = dateString.split("-");
  if (parts.length < 3) {
    console.error("Invalid date format. Expected 'YYYY-MM-DD'.");
    return dateString;
  }

  const [, month, day] = parts;

  if (variant === "short") {
    return `${month}.${day}`;
  }

  return dateString.replace(/-/g, ".");
};
