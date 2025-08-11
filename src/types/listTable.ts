import React from "react";

export interface ListTableField {
  id: string;
  label: string;
  value: React.ReactNode[];

  // 웹(desktop)/태블릿
  desktop: {
    row: number; // 몇 번째 행에 위치하는지
    widthClass: string; // 너비 클래스
  };
  
  // 모바일
  mobile: {
    table: number; // 몇 번째 테이블에 위치하는지
    widthClass: string; // 너비 클래스
  };

  fontcolor?: string; // 글자 색상 (선택적)
}
