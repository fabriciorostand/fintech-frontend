import { useEffect, useRef, useState } from "react";
import { useTransactions } from "../services/use-bank-account-transactions";
import { useBankAccountTypeTransactions } from "../services/use-bank-account-type-transactions";
import { useUserTransactions } from "../services/use-user-transactions";
import { useUserTransactionsByType } from "../services/use-user-transactions-by-type";

type UseTransactionFiltersProps = {
  userId: string | null;
  currentPage: number;
  pageSize: number;
  onFiltersChange?: () => void;
};

type PageInfo = {
  totalPages: number;
  totalElements: number;
};

type TransactionsResponse = {
  content: unknown[];
  page: PageInfo;
};

type UseTransactionFiltersReturn = {
  selectedBankAccountId: string | null;
  selectedTransactionTypeId: string | null;
  setSelectedBankAccountId: (id: string | null) => void;
  setSelectedTransactionTypeId: (id: string | null) => void;
  transactionsData: TransactionsResponse | undefined;
  isLoading: boolean;
  error: unknown;
};

export function useTransactionFilters({
  userId,
  currentPage,
  pageSize,
  onFiltersChange,
}: UseTransactionFiltersProps): UseTransactionFiltersReturn {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | null
  >(null);
  const [selectedTransactionTypeId, setSelectedTransactionTypeId] = useState<
    string | null
  >(null);

  // Busca transações de uma conta específica quando selectedBankAccountId não for 'all' e não houver filtro de tipo
  const {
    data: transactionsByAccount,
    isLoading: isLoadingByAccount,
    error: errorByAccount,
  } = useTransactions(
    selectedBankAccountId !== "all" && !selectedTransactionTypeId
      ? selectedBankAccountId
      : null,
    currentPage,
    pageSize
  );

  // Busca transações de uma conta específica filtradas por tipo
  const {
    data: transactionsByAccountType,
    isLoading: isLoadingByAccountType,
    error: errorByAccountType,
  } = useBankAccountTypeTransactions(
    selectedBankAccountId !== "all" && selectedTransactionTypeId
      ? selectedBankAccountId
      : null,
    selectedTransactionTypeId,
    currentPage,
    pageSize
  );

  // Busca todas as transações do usuário quando selectedBankAccountId for 'all' e não houver filtro de tipo
  const {
    data: transactionsByUser,
    isLoading: isLoadingByUser,
    error: errorByUser,
  } = useUserTransactions(
    selectedBankAccountId === "all" && !selectedTransactionTypeId
      ? userId
      : null,
    currentPage,
    pageSize
  );

  // Busca transações do usuário por tipo quando selectedBankAccountId for 'all' e houver filtro de tipo
  const {
    data: transactionsByType,
    isLoading: isLoadingByType,
    error: errorByType,
  } = useUserTransactionsByType(
    selectedBankAccountId === "all" && selectedTransactionTypeId
      ? userId
      : null,
    selectedTransactionTypeId,
    currentPage,
    pageSize
  );

  // Determina quais dados usar baseado no filtro selecionado
  const getTransactionsData = () => {
    if (selectedBankAccountId === "all") {
      return selectedTransactionTypeId
        ? transactionsByType
        : transactionsByUser;
    }
    return selectedTransactionTypeId
      ? transactionsByAccountType
      : transactionsByAccount;
  };

  const getIsLoading = () => {
    if (selectedBankAccountId === "all") {
      return selectedTransactionTypeId ? isLoadingByType : isLoadingByUser;
    }
    return selectedTransactionTypeId
      ? isLoadingByAccountType
      : isLoadingByAccount;
  };

  const getError = () => {
    if (selectedBankAccountId === "all") {
      return selectedTransactionTypeId ? errorByType : errorByUser;
    }
    return selectedTransactionTypeId ? errorByAccountType : errorByAccount;
  };

  const transactionsData = getTransactionsData();
  const isLoading = getIsLoading();
  const error = getError();

  // Rastreia alterações nos filtros para resetar paginação
  const isFirstRender = useRef(true);
  const prevFiltersRef = useRef({
    bankAccountId: selectedBankAccountId,
    transactionTypeId: selectedTransactionTypeId,
  });

  useEffect(() => {
    const filtersChanged =
      prevFiltersRef.current.bankAccountId !== selectedBankAccountId ||
      prevFiltersRef.current.transactionTypeId !== selectedTransactionTypeId;

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (filtersChanged) {
      onFiltersChange?.();
    }

    prevFiltersRef.current = {
      bankAccountId: selectedBankAccountId,
      transactionTypeId: selectedTransactionTypeId,
    };
  }, [selectedBankAccountId, selectedTransactionTypeId, onFiltersChange]);

  return {
    selectedBankAccountId,
    selectedTransactionTypeId,
    setSelectedBankAccountId,
    setSelectedTransactionTypeId,
    transactionsData,
    isLoading,
    error,
  };
}