import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTransactionRequest } from "./types/create/create-transaction-request";
import type { TransactionResponse } from "./types/create/transaction-response";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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