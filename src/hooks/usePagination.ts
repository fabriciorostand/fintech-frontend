import { useState } from "react";

type UsePaginationProps = {
  pageSize?: number;
};

type UsePaginationReturn = {
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  resetPage: () => void;
  canGoNext: (totalPages: number) => boolean;
  canGoPrevious: () => boolean;
  getPageRange: (totalPages: number) => number[];
};

export function usePagination({
  pageSize = 10,
}: UsePaginationProps = {}): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const resetPage = () => {
    setCurrentPage(0);
  };

  const canGoNext = (totalPages: number) => currentPage < totalPages - 1;

  const canGoPrevious = () => currentPage > 0;

  const getPageRange = (totalPages: number) =>
    Array.from({ length: totalPages }, (_, i) => i).filter(
      (page) =>
        page === 0 ||
        page === totalPages - 1 ||
        Math.abs(page - currentPage) <= 1
    );

  return {
    currentPage,
    pageSize,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    resetPage,
    canGoNext,
    canGoPrevious,
    getPageRange,
  };
}