import { useState } from 'react';

import TermGradeTableRow from './TermGradeTableRow';

export interface GradeItem {
  no: number;
  학수번호: string;
  과목번호: string;
  과목명: string;
  담당교수: string;
  학점: number;
  이수구분: string;
  등급: string;
  성적평가방법: string;
}

export interface DetailGrade {
  출석: { score: number; max: number };
  중간고사: { score: number; max: number };
  기말고사: { score: number; max: number };
  과제물: { score: number; max: number };
  프로젝트: { score: number; max: number };
  퀴즈: { score: number; max: number };
  발표: { score: number; max: number };
  토론: { score: number; max: number };
  기타5: { score: number; max: number };
}

const SAMPLE_GRADES: GradeItem[] = Array.from({ length: 6 }).map((_, i) => ({
  no: i + 1,
  학수번호: 'COAA8723',
  과목번호: '1114',
  과목명: '컴퓨터공학개론',
  담당교수: '김건국',
  학점: 3,
  이수구분: '전선',
  등급: 'A+',
  성적평가방법: '상대평가',
}));

const SAMPLE_DETAIL_GRADES: DetailGrade = {
  출석: { score: 100, max: 100 },
  중간고사: { score: 100, max: 100 },
  기말고사: { score: 100, max: 100 },
  과제물: { score: 100, max: 100 },
  프로젝트: { score: 100, max: 100 },
  퀴즈: { score: 0, max: 0 },
  발표: { score: 0, max: 0 },
  토론: { score: 0, max: 0 },
  기타5: { score: 0, max: 0 },
};

const TermGradeTable = () => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (rowNo: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowNo)) {
        newSet.delete(rowNo);
      } else {
        newSet.add(rowNo);
      }
      return newSet;
    });
  };

  return (
    <div className=" md:m-0 md:pb-13">
      <div className="bg-white rounded-[8px] border border-coolgray overflow-hidden">
        <div className="overflow-x-auto md:overflow-visible">
          {/* 테이블 헤더 */}
          <div className="bg-beige px-4 py-3 border-b border-coolgray min-w-max md:min-w-full">
            <div className="grid grid-cols-10 gap-2 text-mobile-small-bold md:text-desktop-small-bold text-black font-bold md:gap-1">
              <div className="min-w-[48px] md:min-w-0 text-center">No</div>
              <div className="min-w-[100px] md:min-w-0 text-center">학수번호</div>
              <div className="min-w-[90px] md:min-w-0 text-center">과목번호</div>
              <div className="min-w-[160px] md:min-w-0 text-center">과목명</div>
              <div className="min-w-[90px] md:min-w-0 text-center">담당교수</div>
              <div className="min-w-[60px] md:min-w-0 text-center">학점</div>
              <div className="min-w-[80px] md:min-w-0 text-center">이수구분</div>
              <div className="min-w-[60px] md:min-w-0 text-center">등급</div>
              <div className="min-w-[110px] md:min-w-0 text-center">성적평가방법</div>
              <div className="min-w-[110px] md:min-w-0 text-center">
                상세성적 보기
              </div>
            </div>
          </div>
          
          {/* 테이블 로우들 */}
          <div>
            {SAMPLE_GRADES.map((row, index) => (
              <TermGradeTableRow
                key={row.no}
                grade={row}
                detailGrade={SAMPLE_DETAIL_GRADES}
                isExpanded={expandedRows.has(row.no)}
                isLastRow={index === SAMPLE_GRADES.length - 1}
                onToggle={() => toggleRow(row.no)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermGradeTable;
