import {
  TOTAL_GRADE_COLUMNS,
  TOTAL_GRADE_ROWS,
  cellBaseClasses,
  headerTextClasses,
  valueTextClasses,
} from '@/constants/GradeConstants';

function TotalGradeTable() {
  return (
    <div className="overflow-x-auto w-full">
      <div
        className="flex flex-col rounded overflow-hidden border border-coolgray"
        style={{ minWidth: '800px' }}
      >
        {/* Header */}
        <div className="flex bg-[#B0CDA6]">
          {TOTAL_GRADE_COLUMNS.map((column, index) => (
            <div
              key={index}
              className={`${cellBaseClasses} ${
                column.desktop?.widthClass || 'w-1/6'
              } ${index > 0 ? 'border-l border-coolgray' : ''}`}
            >
              <div className={`${headerTextClasses} text-darkgreen font-bold`}>
                {column.label}
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        {TOTAL_GRADE_ROWS.map((row, rowIndex) => {
          const isLastRow = rowIndex === TOTAL_GRADE_ROWS.length - 1;
          return (
            <div key={rowIndex} className={`flex border-t border-coolgray`}>
              {TOTAL_GRADE_COLUMNS.map((column, cellIndex) => {
                const content = row[column.id] || '';
                const isCategoryColumn = column.id === 'category';
                const isMajorColumn = column.id === 'major';

                // 전체석차 행에서 전공 열 이후의 컬럼들은 숨김
                if (isLastRow && !isCategoryColumn && !isMajorColumn) {
                  return null;
                }

                return (
                  <div
                    key={cellIndex}
                    className={`${cellBaseClasses} ${
                      column.desktop?.widthClass || 'w-1/6'
                    } ${
                      cellIndex > 0 && !(isLastRow && isCategoryColumn)
                        ? 'border-l border-coolgray'
                        : ''
                    } ${isCategoryColumn ? 'bg-[#B0CDA6]' : 'bg-white'}`}
                  >
                    <div
                      className={`${valueTextClasses} ${
                        isCategoryColumn ? 'text-darkgreen font-bold' : ''
                      } ${
                        isLastRow && isMajorColumn ? 'text-darkgreen font-bold' : ''
                      }`}
                    >
                      {content}
                    </div>
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

export default TotalGradeTable;
