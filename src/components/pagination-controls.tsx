type PaginationControlsProps = {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
  getPageRange: number[];
};

export function PaginationControls({
  currentPage,
  pageSize,
  totalElements,
  canGoPrevious,
  canGoNext,
  onPreviousPage,
  onNextPage,
  onPageChange,
  getPageRange,
}: PaginationControlsProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p className="text-gray-600 text-sm dark:text-gray-400">
        Mostrando {currentPage * pageSize + 1} -{" "}
        {Math.min((currentPage + 1) * pageSize, totalElements)} de{" "}
        {totalElements} transações
      </p>
      <div className="flex gap-2">
        <button
          className="rounded-lg border-2 border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          disabled={!canGoPrevious}
          onClick={onPreviousPage}
          type="button"
        >
          Anterior
        </button>
        <div className="flex items-center gap-2">
          {getPageRange.map((page, index, array) => (
            <div className="flex items-center gap-2" key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="text-gray-500 dark:text-gray-400">...</span>
              )}
              <button
                className={`h-10 w-10 rounded-lg border-2 font-medium transition-all ${
                  currentPage === page
                    ? "border-green-400 bg-green-400 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                }`}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page + 1}
              </button>
            </div>
          ))}
        </div>
        <button
          className="rounded-lg border-2 border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          disabled={!canGoNext}
          onClick={onNextPage}
          type="button"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}