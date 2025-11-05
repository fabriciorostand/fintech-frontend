import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: number) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      // Status 204 NO_CONTENT não tem corpo na resposta
      return null;
    },

    onSuccess: () => {
      // Invalida todas as queries que começam com 'get-transactions'
      queryClient.invalidateQueries({ 
        queryKey: ['get-transactions'],
        exact: false
      });
    },
  });
}