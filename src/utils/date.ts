type DateFormatVariant = "full" | "short";

export const formatDate = (
  dateString: string,
  variant: DateFormatVariant = "full"
): string => {
  const datePart = dateString.split(" ")[0].replace(/-/g, ".");

  if (variant === "short") {
    return datePart.slice(5);
  }

  return datePart;
};
