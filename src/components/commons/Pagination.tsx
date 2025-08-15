import React from 'react';
import { PrevArrowIcon, PrevDoubleArrowIcon, NextArrowIcon, NextDoubleArrowIcon } from "@/assets/icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // 항상 첫/마지막 페이지는 고정 노출, 가운데 숫자와 ... 만 가변
  const renderPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`flex items-center justify-center min-w-[28px] h-[34px] transition-colors cursor-pointer ${page === currentPage
        ? 'text-darkgreen font-bold text-lg'
        : 'text-black hover:text-darkgreen font-normal text-lg'
        }`}
    >
      {page}
    </button>
  );

  return (
    <div className={`flex items-center justify-center gap-0 py-5 ${className}`}>
      {/* First Page */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 transition-colors cursor-pointer ${currentPage === 1
          ? 'text-lightgray'
          : 'text-black hover:text-darkgreen'
          }`}
      >
        <PrevDoubleArrowIcon
          className="w-5 h-5"
          aria-label="First Page"
        />
      </button>

      {/* Previous Page */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 transition-colors cursor-pointer ${currentPage === 1
          ? 'text-lightgray'
          : 'text-black hover:text-darkgreen'
          }`}
      >
        <PrevArrowIcon
          className="w-5 h-5"
          aria-label="Previous Page"
        />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center">
        {totalPages <= 4 ? (
          // 전체 페이지 수가 작으면 모두 노출
          Array.from({ length: totalPages }, (_, i) => renderPageButton(i + 1))
        ) : (
          <>
            {/* 처음 구간: 1 2 3 ... 10 */}
            {currentPage <= 3 && (
              <>
                {renderPageButton(1)}
                {renderPageButton(2)}
                {renderPageButton(3)}
                <div className="flex items-center justify-center w-[20px] h-[34px] text-black text-lg font-normal">...</div>
                {renderPageButton(totalPages)}
              </>
            )}

            {/* 중간 구간: 1 ... 4 ... 10 */}
            {currentPage > 3 && currentPage < totalPages - 2 && (
              <>
                {renderPageButton(1)}
                <div className="flex items-center justify-center w-[20px] h-[34px] text-black text-lg font-normal">...</div>
                {renderPageButton(currentPage - 1)}
                {renderPageButton(currentPage)}
                {renderPageButton(currentPage + 1)}
                <div className="flex items-center justify-center w-[20px] h-[34px] text-black text-lg font-normal">...</div>
                {renderPageButton(totalPages)}
              </>
            )}

            {/* 마지막 구간: 1 ... 8 9 10 */}
            {currentPage >= totalPages - 2 && (
              <>
                {renderPageButton(1)}
                <div className="flex items-center justify-center w-[20px] h-[34px] text-black text-lg font-normal">...</div>
                {renderPageButton(totalPages - 2)}
                {renderPageButton(totalPages - 1)}
                {renderPageButton(totalPages)}
              </>
            )}
          </>
        )}
      </div>

      {/* Next Page */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 transition-colors cursor-pointer ${currentPage === totalPages
          ? 'text-lightgray'
          : 'text-black hover:text-darkgreen'
          }`}
      >
        <NextArrowIcon
          className="w-5 h-5"
          aria-label="Next Page"
        />
      </button>

      {/* Last Page */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 transition-colors cursor-pointer ${currentPage === totalPages
          ? 'text-lightgray'
          : 'text-black hover:text-darkgreen'
          }`}
      >
        <NextDoubleArrowIcon
          className="w-5 h-5"
          aria-label="Last Page"
        />
      </button>
    </div>
  );
};

export default Pagination;
