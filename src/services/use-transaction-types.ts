import { useQuery } from "@tanstack/react-query";
import type { GetTransactionTypesResponse } from "./types/get/get-transaction-types-response";

export function useTransactionTypes() {
  return useQuery({
    queryKey: ['transaction-types'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transaction-types`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transaction types');
      }

      const result: GetTransactionTypesResponse = await response.json();
      return result;
    },
  });
}