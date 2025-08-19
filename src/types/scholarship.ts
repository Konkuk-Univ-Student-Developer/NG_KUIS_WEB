import React from 'react';

export type TableHeader = {
  content: React.ReactNode;
  widthClass: string;
};

export type TableCell = {
  content: React.ReactNode;
  widthClass: string;
  textColor?: string;
};

export interface TableProps {
  headers: TableHeader[];
  rows: TableCell[][];
  headerBgColor?: string;
}

export type RowData = {
  [key: string]: string | number | React.ReactNode;
  rowType?: 'accordion' | 'custom' | 'default';
  customRenderer?: React.ReactNode;
};

export interface ColumnConfig {
  id: string;
  label: string;
  desktop?: { widthClass: string; row: number };
  mobile?: { widthClass: string; table: number };
  render?: (value: unknown, row: RowData) => React.ReactNode;
}
