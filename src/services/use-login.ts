import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequest } from "./types/login-request";
import type { LoginResponse } from "./types/login-response";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: LoginResponse = await response.json();

      // Tratar erro 401 ou resposta de falha
      if (!response.ok || !result.success) {
        const message = result.message ?? 'Email ou senha inválidos!';
        throw new Error(message);
      }

      // Armazenar userId e userName no localStorage
      if (result.userId !== null) {
        try {
          localStorage.setItem('userId', result.userId.toString());
        } catch {
          // ignore storage errors
        }
      }
      if (result.userName) {
        try {
          localStorage.setItem('userName', result.userName);
        } catch {
          // ignore
        }
      }

      return result;
    },

    onSuccess: () => {
      // invalidate any user-related queries
      queryClient.invalidateQueries({ queryKey: ['get-current-user'] });
    },
  });
}