import { useQuery } from "@tanstack/react-query";
import type { GetTransactionsResponse } from "./types/get/get-transactions-response";

export function useTransactions(
  bankAccountId: string | null,
  page = 0,
  size = 20
) {
  return useQuery({
    queryKey: ["get-transactions", bankAccountId, page, size],
    queryFn: async () => {
      if (!bankAccountId) {
        throw new Error("Bank Account ID is required");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bank-accounts/${bankAccountId}/transactions?page=${page}&size=${size}`,
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