import { useQuery } from "@tanstack/react-query";
import type { GetBanksResponse } from "./types/get/get-banks-response";

export function useBanks() {
  return useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/banks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch banks");
      }

      const result: GetBanksResponse = await response.json();
      return result;
    },
  });
}