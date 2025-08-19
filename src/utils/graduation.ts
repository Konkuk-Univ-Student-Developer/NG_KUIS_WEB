import type { RowData } from "@/types/graduation";

/**
 * @param id
 * @param row
 * @returns
 */
export const getStatusStyle = (id: string, row: RowData) => {
  switch (id) {
    case "result":
      switch (row.result) {
        case "합격":
          return "text-blue font-bold";
        case "불합":
          return "text-danger font-bold";
        default:
          return "text-black";
      }

    case "remaining":
      return Number(row.remaining) > 0 ? "text-danger" : "text-black";
    
    case "acquired":
      return Number(row.target) > Number(row.acquired)
        ? "text-danger"
        : "text-black";

    default:
      return undefined;
  }
};
