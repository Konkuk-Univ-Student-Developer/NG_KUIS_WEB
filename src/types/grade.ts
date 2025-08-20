import React from 'react';

export type RowData = {
  [key: string]: string | number | React.ReactNode;
};

export interface ColumnConfig {
  id: string;
  label: string;
  desktop?: { widthClass: string; row: number };
}

// 성적 요약 카드 타입 정의
export interface GradeSummaryCard {
  title: string;
  value: number | string;
  unit?: string;
  isHighlighted?: boolean;
}

export interface GradeSummaryData {
  cards: GradeSummaryCard[];
}
