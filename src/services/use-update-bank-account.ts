import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateBankAccountRequest } from "./types/update/update-bank-account-request";
import type { BankAccountResponse } from "./types/create/bank-account-response";

export function useUpdateBankAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateBankAccountRequest) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bank-accounts/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update bank account');
      }

      const result: BankAccountResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-bank-accounts'] });
    },
  });
}