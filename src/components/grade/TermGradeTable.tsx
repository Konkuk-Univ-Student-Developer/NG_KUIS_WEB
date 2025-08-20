import {
  TERM_GRADE_COLUMNS,
  TERM_GRADE_ROWS,
} from '@/constants/GradeConstants';
import GradeTable from './GradeTable';

function TermGradeTable() {
  return (
    <GradeTable
      columns={TERM_GRADE_COLUMNS}
      rows={TERM_GRADE_ROWS}
      headerBgColor="bg-beige"
    />
  );
}

export default TermGradeTable;
