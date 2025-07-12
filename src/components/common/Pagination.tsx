import React from 'react';

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

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 3;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // 현재 페이지 기준으로 주변 페이지들 표시
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages, currentPage + 1);

      // 시작점 조정
      if (end - start < maxVisible - 1) {
        if (start === 1) {
          end = Math.min(totalPages, start + maxVisible - 1);
        } else if (end === totalPages) {
          start = Math.max(1, end - maxVisible + 1);
        }
      }

      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex justify-center items-center gap-2 py-4 ${className}`}>
      {/* First Page */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`p-2 transition-colors ${currentPage === 1
            ? 'text-lightgray cursor-not-allowed'
            : 'text-darkgray hover:text-darkgreen'
          }`}
      >
        <span className="text-mobile-small font-bold">≪</span>
      </button>

      {/* Previous Page */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 transition-colors ${currentPage === 1
            ? 'text-lightgray cursor-not-allowed'
            : 'text-darkgray hover:text-darkgreen'
          }`}
      >
        <span className="text-mobile-small font-bold">‹</span>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-[4px] transition-colors ${page === currentPage
                ? 'bg-darkgreen text-white'
                : 'text-darkgray hover:bg-beige'
              }`}
          >
            <span className="text-mobile-small font-medium">{page}</span>
          </button>
        ))}

        {/* Show ellipsis and last page if needed */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            <span className="px-2 text-darkgray text-mobile-small">...</span>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-1 text-darkgray hover:bg-beige rounded-[4px] transition-colors"
            >
              <span className="text-mobile-small font-medium">{totalPages}</span>
            </button>
          </>
        )}
      </div>

      {/* Next Page */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 transition-colors ${currentPage === totalPages
            ? 'text-lightgray cursor-not-allowed'
            : 'text-darkgray hover:text-darkgreen'
          }`}
      >
        <span className="text-mobile-small font-bold">›</span>
      </button>

      {/* Last Page */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`p-2 transition-colors ${currentPage === totalPages
            ? 'text-lightgray cursor-not-allowed'
            : 'text-darkgray hover:text-darkgreen'
          }`}
      >
        <span className="text-mobile-small font-bold">≫</span>
      </button>
    </div>
  );
};

export default Pagination;
