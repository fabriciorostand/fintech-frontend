import { useMutation } from "@tanstack/react-query";
import type { RegisterRequest } from "./types/register-request";
import type { RegisterResponse } from "./types/register-response";

export function useCreateUser() {
  

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: RegisterResponse = await response.json();

      return result;
    },
  });
}