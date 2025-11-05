import { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTransactions } from "../services/use-bank-account-transactions";
import { useBankAccounts } from "../services/use-bank-accounts";
import { useTransactionCategories } from "../services/use-transaction-categories";
import { TransactionModal } from "../components/ui/transaction-modal";
import { ExclusionConfirmation } from "../components/ui/exclusion-confirmation";
import { useBanks } from "../services/use-banks";
import { useDeleteTransaction } from "../services/use-delete-transaction";
import { useUserTransactions } from "../services/use-user-transactions";
import { useUserTransactionsByType } from "../services/use-user-transactions-by-type";
import { useBankAccountTypeTransactions } from "../services/use-bank-account-type-transactions";

export function Transactions() {
    const userId = localStorage.getItem('userId');
    const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);
    const [selectedTransactionTypeId, setSelectedTransactionTypeId] = useState<string | null>(null);

    // Busca transações de uma conta específica quando selectedBankAccountId não for 'all' e não houver filtro de tipo
    const { data: transactionsByAccount, isLoading: isLoadingByAccount, error: errorByAccount } = useTransactions(
        selectedBankAccountId !== 'all' && !selectedTransactionTypeId ? selectedBankAccountId : null
    );

    // Busca transações de uma conta específica filtradas por tipo
    const { data: transactionsByAccountType, isLoading: isLoadingByAccountType, error: errorByAccountType } = useBankAccountTypeTransactions(
        selectedBankAccountId !== 'all' && selectedTransactionTypeId ? selectedBankAccountId : null,
        selectedTransactionTypeId
    );

    // Busca todas as transações do usuário quando selectedBankAccountId for 'all' e não houver filtro de tipo
    const { data: transactionsByUser, isLoading: isLoadingByUser, error: errorByUser } = useUserTransactions(
        selectedBankAccountId === 'all' && !selectedTransactionTypeId ? userId : null
    );

    // Busca transações do usuário por tipo quando selectedBankAccountId for 'all' e houver filtro de tipo
    const { data: transactionsByType, isLoading: isLoadingByType, error: errorByType } = useUserTransactionsByType(
        selectedBankAccountId === 'all' && selectedTransactionTypeId ? userId : null,
        selectedTransactionTypeId
    );

    const { data: bankAccounts } = useBankAccounts(userId);
    const { data: transactionCategories } = useTransactionCategories();
    const { data: banks } = useBanks();
    const { mutate: deleteTransaction, isPending: isDeleting } = useDeleteTransaction();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);
    const [transactionToEdit, setTransactionToEdit] = useState<{
        id: number;
        name: string;
        description: string;
        bankAccountId: number;
        transactionTypeId: number;
        transactionCategoryId: number;
        value: number;
        date: string;
    } | null>(null);

    // Determina quais dados usar baseado no filtro selecionado
    const transactions = selectedBankAccountId === 'all'
        ? (selectedTransactionTypeId ? transactionsByType : transactionsByUser)
        : (selectedTransactionTypeId ? transactionsByAccountType : transactionsByAccount);
    const isLoading = selectedBankAccountId === 'all'
        ? (selectedTransactionTypeId ? isLoadingByType : isLoadingByUser)
        : (selectedTransactionTypeId ? isLoadingByAccountType : isLoadingByAccount);
    const error = selectedBankAccountId === 'all'
        ? (selectedTransactionTypeId ? errorByType : errorByUser)
        : (selectedTransactionTypeId ? errorByAccountType : errorByAccount);

    // Seleciona "Todas" por padrão
    useEffect(() => {
        if (bankAccounts && bankAccounts.length > 0 && !selectedBankAccountId) {
            setSelectedBankAccountId('all');
        }
    }, [bankAccounts, selectedBankAccountId]);

    const handleDeleteClick = (transactionId: number) => {
        setTransactionToDelete(transactionId);
        setIsDeleteModalOpen(true);
    };

    const handleEditClick = (transactionId: number) => {
        const transaction = transactions?.find(t => t.id === transactionId);
        if (transaction) {
            setTransactionToEdit({
                id: transaction.id,
                name: transaction.name,
                description: transaction.description,
                bankAccountId: transaction.bankAccountId,
                transactionTypeId: transaction.transactionTypeId,
                transactionCategoryId: transaction.transactionCategoryId,
                value: transaction.value,
                date: transaction.date,
            });
            setIsEditModalOpen(true);
        }
    };

    const handleConfirmDelete = () => {
        if (transactionToDelete !== null) {
            deleteTransaction(transactionToDelete, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setTransactionToDelete(null);
                },
                onError: (error) => {
                    console.error('Erro ao excluir transação:', error);
                    setIsDeleteModalOpen(false);
                    setTransactionToDelete(null);
                }
            });
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString('pt-BR');
    };

    // Ordena as transações por data (da mais recente para a mais antiga)
    const sortedTransactions = transactions?.slice().sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="bg-gray-100 dark:bg-black flex-1 p-4 pt-16 pb-20">
                <div className="max-w-6xl mx-auto mt-8">
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
                            <div className="flex flex-col sm:flex-row gap-3 flex-1">
                                {bankAccounts && bankAccounts.length > 0 && (
                                    <div className="flex flex-col gap-1.5 flex-1 min-w-[200px] max-w-[300px]">
                                        <label
                                            htmlFor="account-filter"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1"
                                        >
                                            Conta Bancária
                                        </label>
                                        <select
                                            id="account-filter"
                                            value={selectedBankAccountId || ''}
                                            onChange={(e) => setSelectedBankAccountId(e.target.value)}
                                            className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 dark:text-white focus:border-green-400 dark:focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer shadow-sm"
                                        >
                                            <option value="all">Todas as contas</option>
                                            {bankAccounts.map((account) => (
                                                <option key={account.id} value={account.id.toString()}>
                                                    {banks?.find(b => b.id === account.bankId)?.name} - {account.number}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="flex flex-col gap-1.5 flex-1 min-w-[180px] max-w-[250px]">
                                    <label
                                        htmlFor="type-filter"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1"
                                    >
                                        Tipo de Transação
                                    </label>
                                    <select
                                        id="type-filter"
                                        value={selectedTransactionTypeId || ''}
                                        onChange={(e) => setSelectedTransactionTypeId(e.target.value || null)}
                                        className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 dark:text-white focus:border-green-400 dark:focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer shadow-sm"
                                    >
                                        <option value="">Todos os tipos</option>
                                        <option value="1">Receita</option>
                                        <option value="4">Despesa</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-green-400 hover:bg-green-500 px-6 py-2.5 rounded-lg font-semibold transition-all hover:cursor-pointer shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
                            >
                                Novo Lançamento
                                <IoMdAddCircleOutline className="h-5 w-5 inline-block ml-2" />
                            </button>
                        </div>

                        {isLoading && (
                            <div className="text-center mt-4 dark:text-white">
                                Carregando transações...
                            </div>
                        )}

                        {error && (
                            <div className="text-center mt-4 text-red-500">
                                Erro ao carregar transações
                            </div>
                        )}

                        {transactions && transactions.length === 0 && (
                            <div className="text-center mt-4 dark:text-white">
                                Nenhuma transação encontrada
                            </div>
                        )}

                        {sortedTransactions?.map((transaction) => (
                            <div key={transaction.id} className="dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded p-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="rounded-full w-12 h-12 bg-gray-300 dark:bg-gray-600 flex items-center justify-center shrink-0">
                                            {/* imagem */}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg dark:text-white">
                                                {transaction.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {transaction.description}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                                {transactionCategories?.find(c => c.id === transaction.transactionCategoryId)?.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold text-lg ${transaction.transactionTypeId === 4 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                                {formatCurrency(transaction.value)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(transaction.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 ml-8">
                                        <button
                                            onClick={() => handleEditClick(transaction.id)}
                                            className="hover:cursor-pointer"
                                        >
                                            <MdEdit className="h-6 w-6 inline-block dark:text-white" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(transaction.id)}
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

            <TransactionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                mode="create"
                title="Novo Lançamento"
                submitButtonText="Salvar Lançamento"
            />

            <TransactionModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                mode="edit"
                title="Editar Lançamento"
                submitButtonText="Atualizar Lançamento"
                initialData={transactionToEdit || undefined}
            />

            <ExclusionConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Excluir Transação"
                message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
                isDeleting={isDeleting}
            />

            <Footer />
        </div>
    );
}