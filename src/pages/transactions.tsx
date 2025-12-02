import { useEffect } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NoBankAccountsWarning } from "../components/no-bank-accounts-warning";
import { PaginationControls } from "../components/pagination-controls";
import { TransactionFilters } from "../components/transaction-filters";
import { TransactionItem } from "../components/transaction-item";
import { ExclusionConfirmation } from "../components/ui/exclusion-confirmation";
import { TransactionModal } from "../components/ui/transaction-modal";
import { usePagination } from "../hooks/usePagination";
import { useTransactionFilters } from "../hooks/useTransactionFilters";
import { useTransactionModals } from "../hooks/useTransactionModals";
import { useBankAccounts } from "../services/use-bank-accounts";
import { useBanks } from "../services/use-banks";
import { useDeleteTransaction } from "../services/use-delete-transaction";
import { useTransactionCategories } from "../services/use-transaction-categories";

type TransactionData = {
  id: number;
  name: string;
  description: string;
  bankAccountId: number;
  transactionTypeId: number;
  transactionCategoryId: number;
  value: number;
  date: string;
};

export function Transactions() {
  const userId = localStorage.getItem("userId");

  const {
    currentPage,
    pageSize,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    resetPage,
    canGoNext,
    canGoPrevious,
    getPageRange,
  } = usePagination({ pageSize: 10 });

  const {
    selectedBankAccountId,
    selectedTransactionTypeId,
    setSelectedBankAccountId,
    setSelectedTransactionTypeId,
    transactionsData,
    isLoading,
    error,
  } = useTransactionFilters({
    userId,
    currentPage,
    pageSize,
    onFiltersChange: resetPage,
  });

  const { data: bankAccounts } = useBankAccounts(userId);
  const { data: transactionCategories } = useTransactionCategories();
  const { data: banks } = useBanks();
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction();

  const {
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    transactionToDelete,
    transactionToEdit,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
  } = useTransactionModals();

  const transactions = transactionsData?.content as
    | TransactionData[]
    | undefined;
  const totalPages = transactionsData?.page.totalPages || 0;
  const totalElements = transactionsData?.page.totalElements || 0;

  // Seleciona "Todas" por padrão
  useEffect(() => {
    if (bankAccounts && bankAccounts.length > 0 && !selectedBankAccountId) {
      setSelectedBankAccountId("all");
    }
  }, [bankAccounts, selectedBankAccountId, setSelectedBankAccountId]);

  const handleEditClick = (transactionId: number) => {
    const transaction = transactions?.find((t) => t.id === transactionId);
    if (transaction) {
      openEditModal({
        id: transaction.id,
        name: transaction.name,
        description: transaction.description,
        bankAccountId: transaction.bankAccountId,
        transactionTypeId: transaction.transactionTypeId,
        transactionCategoryId: transaction.transactionCategoryId,
        value: transaction.value,
        date: transaction.date,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (transactionToDelete !== null) {
      deleteTransaction(transactionToDelete, {
        onSuccess: closeDeleteModal,
        onError: (deleteError) => {
          console.error("Erro ao excluir transação:", deleteError);
          closeDeleteModal();
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-100 p-4 pt-16 pb-20 dark:bg-black">
        <div className="mx-auto mt-8 max-w-6xl">
          <div>
            {!bankAccounts || bankAccounts.length === 0 ? (
              <NoBankAccountsWarning />
            ) : (
              <div>
                <TransactionFilters
                  bankAccounts={bankAccounts}
                  banks={banks || []}
                  onBankAccountChange={setSelectedBankAccountId}
                  onCreateClick={openCreateModal}
                  onTransactionTypeChange={setSelectedTransactionTypeId}
                  selectedBankAccountId={selectedBankAccountId}
                  selectedTransactionTypeId={selectedTransactionTypeId}
                />

                {isLoading && (
                  <div className="mt-4 text-center dark:text-white">
                    Carregando transações...
                  </div>
                )}

                {!!error && (
                  <div className="mt-4 text-center text-red-500">
                    Erro ao carregar transações
                  </div>
                )}

                {transactions && transactions.length === 0 && (
                  <div className="mt-4 text-center dark:text-white">
                    Nenhuma transação encontrada
                  </div>
                )}

                {transactions?.map((transaction) => (
                  <TransactionItem
                    categoryName={
                      transactionCategories?.find(
                        (c) => c.id === transaction.transactionCategoryId
                      )?.name
                    }
                    key={transaction.id}
                    onDelete={openDeleteModal}
                    onEdit={handleEditClick}
                    transaction={transaction}
                  />
                ))}

                {transactions && transactions.length > 0 && (
                  <PaginationControls
                    canGoNext={canGoNext(totalPages)}
                    canGoPrevious={canGoPrevious()}
                    currentPage={currentPage}
                    getPageRange={getPageRange(totalPages)}
                    onNextPage={goToNextPage}
                    onPageChange={setCurrentPage}
                    onPreviousPage={goToPreviousPage}
                    pageSize={pageSize}
                    totalElements={totalElements}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <TransactionModal
        isOpen={isCreateModalOpen}
        mode="create"
        onClose={closeCreateModal}
        submitButtonText="Salvar Lançamento"
        title="Novo Lançamento"
      />

      <TransactionModal
        initialData={transactionToEdit || undefined}
        isOpen={isEditModalOpen}
        mode="edit"
        onClose={closeEditModal}
        submitButtonText="Atualizar Lançamento"
        title="Editar Lançamento"
      />

      <ExclusionConfirmation
        isDeleting={isDeleting}
        isOpen={isDeleteModalOpen}
        message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Excluir Transação"
      />

      <Footer />
    </div>
  );
}
