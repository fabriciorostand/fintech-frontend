import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateBranchRequest } from "./types/update/update-branch-request";
import type { BranchResponse } from "./types/create/branch-response";

export function useUpdateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateBranchRequest) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/branches/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update branch');
      }

      const result: BranchResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-branches'] });
    },
  });
}