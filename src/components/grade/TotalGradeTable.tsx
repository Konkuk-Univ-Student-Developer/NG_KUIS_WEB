import TotalGradeTableRow from './TotalGradeTableRow';
import type { TotalGradeItem } from '@/types/grade';

const SAMPLE_TOTAL_GRADES: TotalGradeItem[] = [
  {
    구분: '학점',
    전공: 36.0,
    교양: 0.0,
    다전공: 0.0,
    부전공: 0.0,
    연계전공: 0.0,
    교직: 0.0,
    기타: 0.0,
    총취득학점: 36.0,
    총신청학점: 36.0,
    총포기학점: 0.0,
    총FN학점: 0.0,
    만점: '',
  },
  {
    구분: '평점평균',
    전공: 4.5,
    교양: 0.0,
    다전공: 0.0,
    부전공: 0.0,
    연계전공: 0.0,
    교직: 0.0,
    기타: 0.0,
    총취득학점: 4.5,
    총신청학점: '',
    총포기학점: '',
    총FN학점: '',
    만점: 4.5,
  },
  {
    구분: '백분율',
    전공: 100.0,
    교양: 0.0,
    다전공: 0.0,
    부전공: 0.0,
    연계전공: 0.0,
    교직: 0.0,
    기타: 0.0,
    총취득학점: 100,
    총신청학점: '',
    총포기학점: '',
    총FN학점: '',
    만점: 100,
  },
  {
    구분: '전체석차',
    전공: '1/337',
    교양: '',
    다전공: '',
    부전공: '',
    연계전공: '',
    교직: '',
    기타: '',
    총취득학점: '',
    총신청학점: '',
    총포기학점: '',
    총FN학점: '',
    만점: '',
  },
];

const TotalGradeTable = () => {
  return (
    <div className="md:m-0 md:pb-13">
      <div className="bg-white rounded-[8px] border border-coolgray overflow-hidden">
        <div className="overflow-x-auto md:overflow-visible">
          {/* 테이블 헤더 */}
          <div className="bg-[#B0CDA6] px-4 py-3 border-b border-coolgray min-w-max md:min-w-full">
            <div className="flex gap-2 text-mobile-small-bold md:text-desktop-small-bold text-darkgreen font-bold md:gap-1">
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                구분
              </div>
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                전공
              </div>
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                교양
              </div>
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                다전공
              </div>
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                부전공
              </div>
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                연계전공
              </div>
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                교직
              </div>
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                기타
              </div>
              <div className="min-w-[100px] md:min-w-0 text-center flex-1">
                총취득학점
              </div>
              <div className="min-w-[100px] md:min-w-0 text-center flex-1">
                총신청학점
              </div>
              <div className="min-w-[100px] md:min-w-0 text-center flex-1">
                총포기학점
              </div>
              <div className="min-w-[100px] md:min-w-0 text-center flex-1">
                총F/N학점
              </div>
              <div className="min-w-[80px] md:min-w-0 text-center flex-1">
                만점
              </div>
            </div>
          </div>

          {/* 테이블 로우들 */}
          <div>
            {SAMPLE_TOTAL_GRADES.map((row, index) => (
              <TotalGradeTableRow
                key={index}
                grade={row}
                isLastRow={index === SAMPLE_TOTAL_GRADES.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalGradeTable;
