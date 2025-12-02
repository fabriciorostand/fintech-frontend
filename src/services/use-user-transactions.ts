import { useQuery } from "@tanstack/react-query";
import type { GetTransactionsResponse } from "./types/get/get-transactions-response";

export function useUserTransactions(
  userId: string | null,
  page = 0,
  size = 20
) {
  return useQuery({
    queryKey: ["get-user-transactions", userId, page, size],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/transactions?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user transactions");
      }

      const result: GetTransactionsResponse = await response.json();
      return result;
    },
    enabled: !!userId,
  });
}