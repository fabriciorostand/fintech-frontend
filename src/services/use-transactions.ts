import { useQuery } from "@tanstack/react-query";
import type { GetTransactionsResponse } from "./types/get/get-transactions-response";

export function useTransactions(userId: string | null) {
  return useQuery({
    queryKey: ['get-transactions', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const result: GetTransactionsResponse = await response.json();
      return result;
    },
    enabled: !!userId,
  });
}