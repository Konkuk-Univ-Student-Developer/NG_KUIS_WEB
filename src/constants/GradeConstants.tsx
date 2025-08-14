import TermGrade from '@/components/grade/TermGrade';
import TotalGrade from '@/components/grade/TotalGrade';

export const GRADE_TABS = [
  '정규학기 성적 조회',
  '계절학기 성적 조회',
  '전체 성적 조회',
];

export const TAB_COMPONENTS: { [key: string]: React.FC } = {
  '정규학기 성적 조회': TermGrade,
  '전체 성적 조회': TotalGrade,
};
