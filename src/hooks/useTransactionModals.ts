import { useState } from "react";

type TransactionToEdit = {
  id: number;
  name: string;
  description: string;
  bankAccountId: number;
  transactionTypeId: number;
  transactionCategoryId: number;
  value: number;
  date: string;
};

type UseTransactionModalsReturn = {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  transactionToDelete: number | null;
  transactionToEdit: TransactionToEdit | null;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (transaction: TransactionToEdit) => void;
  closeEditModal: () => void;
  openDeleteModal: (transactionId: number) => void;
  closeDeleteModal: () => void;
};

export function useTransactionModals(): UseTransactionModalsReturn {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(
    null
  );
  const [transactionToEdit, setTransactionToEdit] =
    useState<TransactionToEdit | null>(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (transaction: TransactionToEdit) => {
    setTransactionToEdit(transaction);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTransactionToEdit(null);
  };

  const openDeleteModal = (transactionId: number) => {
    setTransactionToDelete(transactionId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTransactionToDelete(null);
  };

  return {
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    transactionToDelete,
    transactionToEdit,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
  };
}