import { useQuery } from "@tanstack/react-query";
import type { GetTransactionsResponse } from "./types/get/get-transactions-response";

export function useTransactions(bankAccountId: string | null) {
  return useQuery({
    queryKey: ["get-transactions", bankAccountId],
    queryFn: async () => {
      if (!bankAccountId) {
        throw new Error("Bank Account ID is required");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bank-accounts/${bankAccountId}/transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const result: GetTransactionsResponse = await response.json();
      return result;
    },
    enabled: !!bankAccountId,
  });
}