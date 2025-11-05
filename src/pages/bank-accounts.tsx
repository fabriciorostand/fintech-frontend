import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useBankAccounts } from "../services/use-bank-accounts";
import { useBanks } from "../services/use-banks";
import { useBranches } from "../services/use-branches";
import { useDeleteBankAccount } from "../services/use-delete-bank-account";
import { BankAccountsModal } from "../components/ui/bank-accounts-modal";
import { ExclusionConfirmation } from "../components/ui/exclusion-confirmation";

export function BankAccounts() {
    const userId = localStorage.getItem('userId');
    const { data: bankAccounts, isLoading, error } = useBankAccounts(userId);
    const { data: banks } = useBanks();
    const { data: branches } = useBranches();
    const { mutate: deleteBankAccount, isPending: isDeleting } = useDeleteBankAccount();
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
        const account = bankAccounts?.find(acc => acc.id === accountId);
        if (account) {
            const branch = branches?.find(b => b.id === account.branchId);
            setAccountToEdit({
                id: account.id,
                userId: account.userId,
                branchId: account.branchId,
                bankId: account.bankId,
                number: account.number,
                balance: account.balance,
                branchNumber: branch?.number || '',
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
                    console.error('Erro ao excluir conta:', error);
                    setIsDeleteModalOpen(false);
                    setAccountToDelete(null);
                }
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="bg-gray-100 dark:bg-black flex-1 p-4 pt-16 pb-20">
                <div className="max-w-6xl mx-auto mt-8">
                    <div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded font-semibold transition-colors hover:cursor-pointer"
                            >
                                Adicionar conta
                                <IoMdAddCircleOutline className="h-5 w-5 inline-block ml-2" />
                            </button>
                        </div>

                        {isLoading && (
                            <div className="text-center mt-4 dark:text-white">
                                Carregando contas...
                            </div>
                        )}

                        {error && (
                            <div className="text-center mt-4 text-red-500">
                                Erro ao carregar contas bancárias
                            </div>
                        )}

                        {bankAccounts && bankAccounts.length === 0 && (
                            <div className="text-center mt-4 dark:text-white">
                                Nenhuma conta bancária encontrada
                            </div>
                        )}

                        {bankAccounts?.map((account) => (
                            <div key={account.id} className="dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded p-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full w-12 h-12 bg-gray-300 dark:bg-gray-600 flex items-center justify-center shrink-0">
                                            {/* imagem */}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg dark:text-white">
                                                Conta {account.number}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Agência: {branches?.find(b => b.id === account.branchId)?.number} | Banco: {banks?.find(b => b.id === account.bankId)?.number}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleEditClick(account.id)}
                                            className="hover:cursor-pointer"
                                        >
                                            <MdEdit className="h-6 w-6 inline-block dark:text-white" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(account.id)}
                                            disabled={isDeleting}
                                            className="hover:cursor-pointer"
                                        >
                                            <FaRegTrashAlt className="h-5 w-5 inline-block dark:text-white" />
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
                onClose={() => setIsCreateModalOpen(false)}
                mode="create"
                title="Nova Conta Bancária"
                submitButtonText="Salvar Conta"
                showBalanceField={true}
            />

            <BankAccountsModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                mode="edit"
                title="Editar Conta Bancária"
                submitButtonText="Atualizar Conta"
                showBalanceField={false}
                initialData={accountToEdit || undefined}
            />

            <ExclusionConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Excluir Conta Bancária"
                message="Tem certeza que deseja excluir esta conta bancária? Esta ação não pode ser desfeita."
                isDeleting={isDeleting}
            />

            <Footer />
        </div>
    );
}