import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTransactionCategoryRequest } from "./types/create/create-transaction-category-request";
import type { CreateTransactionCategoryResponse } from "./types/create/create-transaction-category-response";

export function useCreateTransactionCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionCategoryRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transaction-categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateTransactionCategoryResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-transaction-categories"],
      });
    },
  });
}