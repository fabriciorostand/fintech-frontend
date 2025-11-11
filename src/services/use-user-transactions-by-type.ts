import { useQuery } from "@tanstack/react-query";
import type { GetTransactionsResponse } from "./types/get/get-transactions-response";

export function useUserTransactionsByType(
  userId: string | null,
  transactionTypeId: string | null
) {
  return useQuery({
    queryKey: ["get-user-transactions-by-type", userId, transactionTypeId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      if (!transactionTypeId) {
        throw new Error("Transaction Type ID is required");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/transactions/transaction-types/${transactionTypeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user transactions by type");
      }

      const result: GetTransactionsResponse = await response.json();
      return result;
    },
    enabled: !!userId && !!transactionTypeId,
  });
}