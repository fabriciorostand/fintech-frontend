import { useQuery } from "@tanstack/react-query";
import type { GetTransactionsResponse } from "./types/get/get-transactions-response";

export function useBankAccountTypeTransactions(
  bankAccountId: string | null,
  transactionTypeId: string | null
) {
  return useQuery({
    queryKey: [
      "get-bank-account-type-transactions",
      bankAccountId,
      transactionTypeId,
    ],
    queryFn: async () => {
      if (!bankAccountId) {
        throw new Error("Bank Account ID is required");
      }

      if (!transactionTypeId) {
        throw new Error("Transaction Type ID is required");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bank-accounts/${bankAccountId}/transactions/transaction-types/${transactionTypeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bank account type transactions");
      }

      const result: GetTransactionsResponse = await response.json();
      return result;
    },
    enabled: !!bankAccountId && !!transactionTypeId,
  });
}