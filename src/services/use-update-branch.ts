import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateBranchResponse } from "./types/update/update-branch-response";
import type { UpdateBranchRequest } from "./types/update/update-branch-request";

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

      const result: UpdateBranchResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-branches'] });
    },
  });
}