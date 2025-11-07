import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequest } from "./types/login-request";
import type { LoginResponse } from "./types/login-response";
import { useAuth } from "../hooks/useAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const { login } = useAuth();

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

      // Armazenar userId e userName no localStorage e atualizar o contexto de autenticação
      if (result.userId !== null && result.userName) {
        try {
          const userIdStr = result.userId.toString();
          localStorage.setItem('userId', userIdStr);
          localStorage.setItem('userName', result.userName);
          
          // Atualiza o estado de autenticação
          login(userIdStr, result.userName);
        } catch {
          // ignore storage errors
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