import { useEffect, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ExclusionConfirmation } from "../components/ui/exclusion-confirmation";
import { TransactionModal } from "../components/ui/transaction-modal";
import { useTransactions } from "../services/use-bank-account-transactions";
import { useBankAccountTypeTransactions } from "../services/use-bank-account-type-transactions";
import { useBankAccounts } from "../services/use-bank-accounts";
import { useBanks } from "../services/use-banks";
import { useDeleteTransaction } from "../services/use-delete-transaction";
import { useTransactionCategories } from "../services/use-transaction-categories";
import { useUserTransactions } from "../services/use-user-transactions";
import { useUserTransactionsByType } from "../services/use-user-transactions-by-type";

export function Transactions() {
  const userId = localStorage.getItem("userId");
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | null
  >(null);
  const [selectedTransactionTypeId, setSelectedTransactionTypeId] = useState<
    string | null
  >(null);

  // Busca transações de uma conta específica quando selectedBankAccountId não for 'all' e não houver filtro de tipo
  const {
    data: transactionsByAccount,
    isLoading: isLoadingByAccount,
    error: errorByAccount,
  } = useTransactions(
    selectedBankAccountId !== "all" && !selectedTransactionTypeId
      ? selectedBankAccountId
      : null
  );

  // Busca transações de uma conta específica filtradas por tipo
  const {
    data: transactionsByAccountType,
    isLoading: isLoadingByAccountType,
    error: errorByAccountType,
  } = useBankAccountTypeTransactions(
    selectedBankAccountId !== "all" && selectedTransactionTypeId
      ? selectedBankAccountId
      : null,
    selectedTransactionTypeId
  );

  // Busca todas as transações do usuário quando selectedBankAccountId for 'all' e não houver filtro de tipo
  const {
    data: transactionsByUser,
    isLoading: isLoadingByUser,
    error: errorByUser,
  } = useUserTransactions(
    selectedBankAccountId === "all" && !selectedTransactionTypeId
      ? userId
      : null
  );

  // Busca transações do usuário por tipo quando selectedBankAccountId for 'all' e houver filtro de tipo
  const {
    data: transactionsByType,
    isLoading: isLoadingByType,
    error: errorByType,
  } = useUserTransactionsByType(
    selectedBankAccountId === "all" && selectedTransactionTypeId
      ? userId
      : null,
    selectedTransactionTypeId
  );

  const { data: bankAccounts } = useBankAccounts(userId);
  const { data: transactionCategories } = useTransactionCategories();
  const { data: banks } = useBanks();
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(
    null
  );
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
  const transactions =
    selectedBankAccountId === "all"
      ? selectedTransactionTypeId
        ? transactionsByType
        : transactionsByUser
      : selectedTransactionTypeId
        ? transactionsByAccountType
        : transactionsByAccount;
  const isLoading =
    selectedBankAccountId === "all"
      ? selectedTransactionTypeId
        ? isLoadingByType
        : isLoadingByUser
      : selectedTransactionTypeId
        ? isLoadingByAccountType
        : isLoadingByAccount;
  const error =
    selectedBankAccountId === "all"
      ? selectedTransactionTypeId
        ? errorByType
        : errorByUser
      : selectedTransactionTypeId
        ? errorByAccountType
        : errorByAccount;

  // Seleciona "Todas" por padrão
  useEffect(() => {
    if (bankAccounts && bankAccounts.length > 0 && !selectedBankAccountId) {
      setSelectedBankAccountId("all");
    }
  }, [bankAccounts, selectedBankAccountId]);

  const handleDeleteClick = (transactionId: number) => {
    setTransactionToDelete(transactionId);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (transactionId: number) => {
    const transaction = transactions?.find((t) => t.id === transactionId);
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
          console.error("Erro ao excluir transação:", error);
          setIsDeleteModalOpen(false);
          setTransactionToDelete(null);
        },
      });
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("pt-BR");
  };

  // Ordena as transações por data (da mais recente para a mais antiga)
  const sortedTransactions = transactions?.slice().sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-100 p-4 pt-16 pb-20 dark:bg-black">
        <div className="mx-auto mt-8 max-w-6xl">
          <div>
            {!bankAccounts || bankAccounts.length === 0 ? (
              <div className="mt-8 rounded-lg border-2 border-yellow-400 bg-yellow-50 p-8 text-center dark:border-yellow-600 dark:bg-yellow-900/20">
                <div className="flex flex-col items-center gap-4">
                  <BsExclamationTriangle className="h-16 w-16 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-800 text-xl dark:text-gray-200">
                      Nenhuma conta bancária cadastrada
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Para gerenciar seus lançamentos, você precisa cadastrar
                      uma conta bancária primeiro.
                    </p>
                    <Link
                      className="inline-block rounded-lg bg-green-400 px-6 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-green-500 hover:shadow-md active:scale-95"
                      to="/bank-accounts"
                    >
                      Cadastrar Conta Bancária
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <div className="flex min-w-[200px] max-w-[300px] flex-1 flex-col gap-1.5">
                      <label
                        className="px-1 font-medium text-gray-700 text-sm dark:text-gray-300"
                        htmlFor="account-filter"
                      >
                        Conta Bancária
                      </label>
                      <select
                        className="cursor-pointer rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 shadow-sm transition-all hover:border-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-400 dark:hover:border-gray-500"
                        id="account-filter"
                        onChange={(e) =>
                          setSelectedBankAccountId(e.target.value)
                        }
                        value={selectedBankAccountId || ""}
                      >
                        <option value="all">Todas as contas</option>
                        {bankAccounts.map((account) => (
                          <option
                            key={account.id}
                            value={account.id.toString()}
                          >
                            {banks?.find((b) => b.id === account.bankId)?.name}{" "}
                            - {account.number}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex min-w-[180px] max-w-[250px] flex-1 flex-col gap-1.5">
                      <label
                        className="px-1 font-medium text-gray-700 text-sm dark:text-gray-300"
                        htmlFor="type-filter"
                      >
                        Tipo de Transação
                      </label>
                      <select
                        className="cursor-pointer rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 shadow-sm transition-all hover:border-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-400 dark:hover:border-gray-500"
                        id="type-filter"
                        onChange={(e) =>
                          setSelectedTransactionTypeId(e.target.value || null)
                        }
                        value={selectedTransactionTypeId || ""}
                      >
                        <option value="">Todos os tipos</option>
                        <option value="1">Receita</option>
                        <option value="4">Despesa</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="whitespace-nowrap rounded-lg bg-green-400 px-6 py-2.5 font-semibold text-white shadow-sm transition-all hover:cursor-pointer hover:bg-green-500 hover:shadow-md active:scale-95"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Novo Lançamento
                    <IoMdAddCircleOutline className="ml-2 inline-block h-5 w-5" />
                  </button>
                </div>

                {isLoading && (
                  <div className="mt-4 text-center dark:text-white">
                    Carregando transações...
                  </div>
                )}

                {error && (
                  <div className="mt-4 text-center text-red-500">
                    Erro ao carregar transações
                  </div>
                )}

                {transactions && transactions.length === 0 && (
                  <div className="mt-4 text-center dark:text-white">
                    Nenhuma transação encontrada
                  </div>
                )}

                {sortedTransactions?.map((transaction) => (
                  <div
                    className="mt-4 rounded border border-gray-300 p-4 dark:border-gray-500 dark:bg-gray-800"
                    key={transaction.id}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                          {/* imagem */}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg dark:text-white">
                            {transaction.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {transaction.description}
                          </p>
                          <p className="mt-1 text-gray-500 text-sm dark:text-gray-500">
                            {
                              transactionCategories?.find(
                                (c) =>
                                  c.id === transaction.transactionCategoryId
                              )?.name
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold text-lg ${transaction.transactionTypeId === 4 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                          >
                            {formatCurrency(transaction.value)}
                          </p>
                          <p className="text-gray-600 text-sm dark:text-gray-400">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="ml-8 flex gap-4">
                        <button
                          className="hover:cursor-pointer"
                          onClick={() => handleEditClick(transaction.id)}
                        >
                          <MdEdit className="inline-block h-6 w-6 dark:text-white" />
                        </button>
                        <button
                          className="hover:cursor-pointer"
                          onClick={() => handleDeleteClick(transaction.id)}
                        >
                          <FaRegTrashAlt className="inline-block h-5 w-5 dark:text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <TransactionModal
        isOpen={isCreateModalOpen}
        mode="create"
        onClose={() => setIsCreateModalOpen(false)}
        submitButtonText="Salvar Lançamento"
        title="Novo Lançamento"
      />

      <TransactionModal
        initialData={transactionToEdit || undefined}
        isOpen={isEditModalOpen}
        mode="edit"
        onClose={() => setIsEditModalOpen(false)}
        submitButtonText="Atualizar Lançamento"
        title="Editar Lançamento"
      />

      <ExclusionConfirmation
        isDeleting={isDeleting}
        isOpen={isDeleteModalOpen}
        message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Transação"
      />

      <Footer />
    </div>
  );
}