import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout: authLogout } = useAuth();

  const logout = () => {
    // Limpa os dados do localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    // Atualiza o estado de autenticação
    authLogout();

    // Limpa o cache de queries do React Query
    queryClient.clear();

    // Redireciona para a página de login
    navigate("/", { replace: true });
  };

  return { logout };
}