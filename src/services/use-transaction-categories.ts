import { useQuery } from "@tanstack/react-query";
import type { GetTransactionCategoriesResponse } from "./types/get/get-transaction-categories-response";

export function useTransactionCategories() {
  return useQuery({
    queryKey: ["transaction-categories"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transaction-categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transaction categories");
      }

      const result: GetTransactionCategoriesResponse = await response.json();
      return result;
    },
  });
}