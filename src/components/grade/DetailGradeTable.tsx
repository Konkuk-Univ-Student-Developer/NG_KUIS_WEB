import {
  DETAIL_GRADE_COLUMNS,
  DETAIL_GRADE_ROWS,
  cellBaseClasses,
  headerTextClasses,
  valueTextClasses,
} from '@/constants/GradeConstants';

interface DetailGradeTableProps {
  isVisible: boolean;
}

function DetailGradeTable({ isVisible }: DetailGradeTableProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full px-3 md:px-6 py-4 md:py-6 bg-beige">
      <div
        className="flex flex-col rounded overflow-hidden border border-coolgray"
        style={{ 
          minWidth: '100%',
          maxWidth: '100%'
        }}
      >
        {/* Header */}
        <div className="flex bg-darkgreen">
          {DETAIL_GRADE_COLUMNS.map((column, index) => (
            <div
              key={index}
              className={`${cellBaseClasses} ${
                column.desktop?.widthClass || 'w-1/6'
              } ${index > 0 ? 'border-l border-coolgray' : ''}`}
            >
              <div className={`${headerTextClasses} text-white`}>
                {column.label}
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        {DETAIL_GRADE_ROWS.map((row, rowIndex) => {
          const isLastRow = rowIndex === DETAIL_GRADE_ROWS.length - 1;
          return (
            <div
              key={rowIndex}
              className={`flex border-t border-coolgray ${
                isLastRow ? 'bg-white' : 'bg-beige'
              }`}
            >
              {DETAIL_GRADE_COLUMNS.map((column, cellIndex) => {
                const content = row[column.id] || '';
                return (
                  <div
                    key={cellIndex}
                    className={`${cellBaseClasses} ${
                      column.desktop?.widthClass || 'w-1/6'
                    } ${cellIndex > 0 ? 'border-l border-coolgray' : ''}`}
                  >
                    <div className={valueTextClasses}>{content}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DetailGradeTable;
