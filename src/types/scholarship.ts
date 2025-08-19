import React from 'react';

export type RowData = {
  [key: string]: string | number | React.ReactNode;
};

export interface ColumnConfig {
  id: string;
  label: string;
  desktop?: { widthClass: string; row: number };
}
