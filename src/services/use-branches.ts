import { useQuery } from "@tanstack/react-query";
import type { GetBranchesResponse } from "./types/get/get-branches-response";

export function useBranches() {
  return useQuery({
    queryKey: ["get-branches"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/branches`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch branches");
      }

      const result: GetBranchesResponse = await response.json();
      return result;
    },
  });
}