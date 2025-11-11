import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../services/use-delete-user";
import { useAuth } from "./useAuth";

export function useDeleteAccount() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      deleteUser(Number(userId), {
        onSuccess: () => {
          // Limpa os dados do localStorage
          localStorage.removeItem("userId");
          localStorage.removeItem("token");

          // Atualiza o estado de autenticação
          logout();

          // Redireciona para a página inicial
          navigate("/", { replace: true });
          setIsDeleteModalOpen(false);
        },
        onError: (error) => {
          console.error("Erro ao excluir usuário:", error);
          setIsDeleteModalOpen(false);
        },
      });
    }
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    isDeleteModalOpen,
    isDeleting,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseModal,
  };
}