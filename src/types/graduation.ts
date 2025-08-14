import React from "react";

type TableHeader = {
  content: React.ReactNode;
  widthClass: string;
}

type TableCell ={
  content: React.ReactNode;
  widthClass: string;
  textColor?: string;
}

export interface TableProps {
  headers: TableHeader[];
  rows: TableCell[][];
  headerBgColor?: string;
}

export type RowData = {
  [key: string]: string | number | React.ReactNode;
  rowType?: "accordion" | "custom" | "default";
  customRenderer?: React.ReactNode;
};

export interface ColumnConfig {
  id: string;
  label: string;
  desktop?: { widthClass: string; row: number };
  mobile?: { widthClass: string; table: number };
  render?: (value: unknown, row: RowData) => React.ReactNode;
}

export interface ResponsiveListTableProps {
  columns: ColumnConfig[];
  rows: RowData[];
  headerBgColor?: string;
}

export interface MobileAccordionRowProps {
  rowData: RowData;
  mainColumns: ColumnConfig[];
  detailColumns: ColumnConfig[];
  headerBgColor?: string;
}