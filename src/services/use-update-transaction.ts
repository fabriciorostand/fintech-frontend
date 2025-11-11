import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TransactionResponse } from "./types/create/transaction-response";
import type { UpdateTransactionRequest } from "./types/update/update-transaction-request";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTransactionRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transactions/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      const result: TransactionResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      // Invalida todas as queries de transações
      queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["get-user-transactions"] });
      queryClient.invalidateQueries({
        queryKey: ["get-user-transactions-by-type"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-bank-account-type-transactions"],
      });
      // Invalida as contas bancárias para atualizar o saldo
      queryClient.invalidateQueries({ queryKey: ["get-bank-accounts"] });
    },
  });
}