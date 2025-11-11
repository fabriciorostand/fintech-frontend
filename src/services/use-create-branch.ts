import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BranchResponse } from "./types/create/branch-response";
import type { CreateBranchRequest } from "./types/create/create-branch-request";

export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBranchRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/branches`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: BranchResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-branches"] });
    },
  });
}