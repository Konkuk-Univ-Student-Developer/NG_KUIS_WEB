import FirstPageIcon from "@/assets/icon/ic_first_page.svg?react";
import LastPageIcon from "@/assets/icon/ic_last_page.svg?react";
import NextPageIcon from "@/assets/icon/ic_next_page.svg?react";
import PrevPageIcon from "@/assets/icon/ic_prev_page.svg?react";

interface PaginationProps {
  currentPage: number; // 현재 페이지 (1부터 시작)
  totalPages: number; // 전체 페이지 수
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 표시할 페이지 번호 목록을 계산하는 로직
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // 한 번에 보여줄 최대 페이지 번호 개수

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage < 3) {
        endPage = maxPagesToShow;
      }
      if (currentPage > totalPages - 2) {
        startPage = totalPages - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 1) {
    return null; // 페이지가 하나 이하면 페이지네이션을 표시하지 않음
  }

  return (
    <nav className="flex items-center justify-center gap-2 md:gap-4 my-8">
      {/* 맨 처음 페이지로 */}
      <button
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
        className="disabled:opacity-50"
      >
        <FirstPageIcon />
      </button>
      {/* 이전 페이지로 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="disabled:opacity-50"
      >
        <PrevPageIcon />
      </button>

      {/* 페이지 번호들 */}
      {pageNumbers[0] > 1 && (
        <>
          <PageButton page={1} onPageChange={onPageChange} />
          {pageNumbers[0] > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <PageButton
          key={page}
          page={page}
          isActive={currentPage === page}
          onPageChange={onPageChange}
        />
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <PageButton page={totalPages} onPageChange={onPageChange} />
        </>
      )}

      {/* 다음 페이지로 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="disabled:opacity-50"
      >
        <NextPageIcon />
      </button>
      {/* 맨 끝 페이지로 */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage}
        className="disabled:opacity-50"
      >
        <LastPageIcon />
      </button>
    </nav>
  );
};

// 페이지 번호 버튼 컴포넌트
const PageButton = ({
  page,
  isActive,
  onPageChange,
}: {
  page: number;
  isActive?: boolean;
  onPageChange: (page: number) => void;
}) => (
  <button
    onClick={() => onPageChange(page)}
    className={`w-8 h-8 flex items-center justify-center text-base rounded
      ${
        isActive
          ? "font-bold text-darkgreen"
          : "font-normal text-black hover:bg-gray-100"
      }`}
  >
    {page}
  </button>
);

export default Pagination;
