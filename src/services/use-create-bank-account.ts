import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBankAccountResponse } from "./types/create/bank-account-response";
import type { CreateBankAccountRequest } from "./types/create/create-bank-account-request";

export function useCreateBankAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBankAccountRequest) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bank-accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: CreateBankAccountResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-bank-accounts'] });
    },
  });
}