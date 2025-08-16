import TotalTermGradeTableRow from './TotalTermGradeTableRow';
import type { TotalTermGradeItem } from '@/types/grade';

const SAMPLE_TOTALTERMGRADES: TotalTermGradeItem[] = Array.from({
  length: 6,
}).map(() => ({
  이수구분: '전선',
  학수번호: 'COAA8723',
  과목명: '컴퓨터공학개론',
  학점: 3,
  등급: 'A+',
  인정구분: '',
  삭제구분: '',
  삭제일자: '',
}));

const TotalTermGradeTable = () => {
  return (
    <div className=" md:m-0 md:pb-13">
      <div className="bg-white rounded-[8px] border border-coolgray overflow-hidden">
        <div className="overflow-x-auto md:overflow-visible">
          {/* 테이블 헤더 */}
          <div className="bg-beige px-4 py-3 border-b border-coolgray min-w-max md:min-w-full">
            <div className="grid grid-cols-8 gap-2 text-mobile-small-bold md:text-desktop-small-bold text-black font-bold md:gap-1">
              <div className="min-w-[80px] md:min-w-0 text-center">
                이수구분
              </div>
              <div className="min-w-[100px] md:min-w-0 text-center">
                학수번호
              </div>
              <div className="min-w-[160px] md:min-w-0 text-center">과목명</div>
              <div className="min-w-[60px] md:min-w-0 text-center">학점</div>
              <div className="min-w-[60px] md:min-w-0 text-center">등급</div>
              <div className="min-w-[110px] md:min-w-0 text-center">
                인정구분
              </div>
              <div className="min-w-[110px] md:min-w-0 text-center">
                삭제구분
              </div>
              <div className="min-w-[110px] md:min-w-0 text-center">
                삭제일자
              </div>
            </div>
          </div>

          {/* 테이블 로우들 */}
          <div>
            {SAMPLE_TOTALTERMGRADES.map((row, index) => (
              <TotalTermGradeTableRow
                key={index}
                grade={row}
                isLastRow={index === SAMPLE_TOTALTERMGRADES.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalTermGradeTable;
