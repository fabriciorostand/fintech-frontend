import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { BankAccountsModal } from "../components/ui/bank-accounts-modal";
import { ExclusionConfirmation } from "../components/ui/exclusion-confirmation";
import { useBankAccounts } from "../services/use-bank-accounts";
import { useBanks } from "../services/use-banks";
import { useBranches } from "../services/use-branches";
import { useDeleteBankAccount } from "../services/use-delete-bank-account";

export function BankAccounts() {
  const userId = localStorage.getItem("userId");
  const { data: bankAccounts, isLoading, error } = useBankAccounts(userId);
  const { data: banks } = useBanks();
  const { data: branches } = useBranches();
  const { mutate: deleteBankAccount, isPending: isDeleting } =
    useDeleteBankAccount();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);
  const [accountToEdit, setAccountToEdit] = useState<{
    id: number;
    userId: number;
    branchId: number;
    bankId: number;
    number: string;
    balance: number;
    branchNumber: string;
  } | null>(null);

  const handleDeleteClick = (accountId: number) => {
    setAccountToDelete(accountId);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (accountId: number) => {
    const account = bankAccounts?.find((acc) => acc.id === accountId);
    if (account) {
      const branch = branches?.find((b) => b.id === account.branchId);
      setAccountToEdit({
        id: account.id,
        userId: account.userId,
        branchId: account.branchId,
        bankId: account.bankId,
        number: account.number,
        balance: account.balance,
        branchNumber: branch?.number || "",
      });
      setIsEditModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (accountToDelete !== null) {
      deleteBankAccount(accountToDelete, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setAccountToDelete(null);
        },
        onError: (error) => {
          console.error("Erro ao excluir conta:", error);
          setIsDeleteModalOpen(false);
          setAccountToDelete(null);
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-100 p-4 pt-16 pb-20 dark:bg-black">
        <div className="mx-auto mt-8 max-w-6xl">
          <div>
            <div className="flex justify-end">
              <button
                className="rounded bg-green-400 px-4 py-2 font-semibold text-white transition-colors hover:cursor-pointer hover:bg-green-500"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Adicionar conta
                <IoMdAddCircleOutline className="ml-2 inline-block h-5 w-5" />
              </button>
            </div>

            {isLoading && (
              <div className="mt-4 text-center dark:text-white">
                Carregando contas...
              </div>
            )}

            {error && (
              <div className="mt-4 text-center text-red-500">
                Erro ao carregar contas bancárias
              </div>
            )}

            {bankAccounts && bankAccounts.length === 0 && (
              <div className="mt-4 text-center dark:text-white">
                Nenhuma conta bancária encontrada
              </div>
            )}

            {bankAccounts?.map((account) => (
              <div
                className="mt-4 rounded border border-gray-300 p-4 dark:border-gray-500 dark:bg-gray-800"
                key={account.id}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                      {/* imagem */}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg dark:text-white">
                        Conta {account.number}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Agência:{" "}
                        {
                          branches?.find((b) => b.id === account.branchId)
                            ?.number
                        }{" "}
                        | Banco:{" "}
                        {banks?.find((b) => b.id === account.bankId)?.number}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="hover:cursor-pointer"
                      onClick={() => handleEditClick(account.id)}
                    >
                      <MdEdit className="inline-block h-6 w-6 dark:text-white" />
                    </button>
                    <button
                      className="hover:cursor-pointer"
                      disabled={isDeleting}
                      onClick={() => handleDeleteClick(account.id)}
                    >
                      <FaRegTrashAlt className="inline-block h-5 w-5 dark:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BankAccountsModal
        isOpen={isCreateModalOpen}
        mode="create"
        onClose={() => setIsCreateModalOpen(false)}
        showBalanceField={true}
        submitButtonText="Salvar Conta"
        title="Nova Conta Bancária"
      />

      <BankAccountsModal
        initialData={accountToEdit || undefined}
        isOpen={isEditModalOpen}
        mode="edit"
        onClose={() => setIsEditModalOpen(false)}
        showBalanceField={false}
        submitButtonText="Atualizar Conta"
        title="Editar Conta Bancária"
      />

      <ExclusionConfirmation
        isDeleting={isDeleting}
        isOpen={isDeleteModalOpen}
        message="Tem certeza que deseja excluir esta conta bancária? Esta ação não pode ser desfeita."
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Conta Bancária"
      />

      <Footer />
    </div>
  );
}