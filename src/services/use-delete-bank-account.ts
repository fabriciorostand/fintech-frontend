import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBankAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bankAccountId: number) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bank-accounts/${bankAccountId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete bank account');
      }

      // Status 204 NO_CONTENT não tem corpo na resposta
      return null;
    },

    onSuccess: () => {
      // Invalida todas as queries que começam com 'get-bank-accounts'
      queryClient.invalidateQueries({ 
        queryKey: ['get-bank-accounts'],
        exact: false
      });
    },
  });
}