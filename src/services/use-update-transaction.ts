import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTransactionResponse } from "./types/update/update-transaction-response";
import type { UpdateTransactionRequest } from "./types/update/update-transaction-request";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTransactionRequest) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      const result: UpdateTransactionResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transactions'] });
    },
  });
}