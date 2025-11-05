import { useQuery } from "@tanstack/react-query";
import type { GetBankAccountsResponse } from "./types/get/get-bank-accounts-response";

export function useBankAccounts(userId: string | null) {
  return useQuery({
    queryKey: ['get-bank-accounts', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bank-accounts?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bank accounts');
      }

      const result: GetBankAccountsResponse = await response.json();
      return result;
    },
    enabled: !!userId,
  });
}