import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserRequest } from "./types/create/create-user-request";
import type { CreateUserResponse } from "./types/create/create-user-response";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateUserResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
    },
  });
}