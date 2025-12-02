import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { useBankAccounts } from "../services/use-bank-accounts";
import { useTransactionCategories } from "../services/use-transaction-categories";
import { useUserTransactionsByType } from "../services/use-user-transactions-by-type";

export function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: bankAccounts, isLoading, isError } = useBankAccounts(userId);

  // Busca receitas (id do tipo: 1) e despesas (id do tipo: 4)
  const { data: incomeData } = useUserTransactionsByType(userId, "1", 0, 100);
  const { data: expenseData } = useUserTransactionsByType(userId, "4", 0, 100);
  const { data: transactionCategories } = useTransactionCategories();

  // Extrai o array de transações da resposta paginada
  const incomeTransactions = incomeData?.content;
  const expenseTransactions = expenseData?.content;

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const totalBalance =
    bankAccounts?.reduce((sum, account) => sum + account.balance, 0) ?? 0;
  const hasBankAccounts = bankAccounts && bankAccounts.length > 0;

  // Função para filtrar transações do mês atual
  const filterCurrentMonthTransactions = (
    transactions:
      | Array<{
          id: number;
          name: string;
          description: string;
          bankAccountId: number;
          transactionTypeId: number;
          transactionCategoryId: number;
          value: number;
          date: string;
        }>
      | undefined
  ) => {
    if (!transactions) {
      return [];
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
      .filter((transaction) => {
        const [year, month, day] = transaction.date.split("T")[0].split("-");
        const transactionDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day)
        );
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      })
      .sort((a, b) => {
        const [yearA, monthA, dayA] = a.date.split("T")[0].split("-");
        const [yearB, monthB, dayB] = b.date.split("T")[0].split("-");
        const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA));
        const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB));
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
  };

  // Função para formatar moeda
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  // Obter mês atual formatado
  const getCurrentMonthYear = () => {
    const now = new Date();
    const month = now
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "");
    const year = now.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)}/${year}`;
  };

  const currentMonthExpenses =
    filterCurrentMonthTransactions(expenseTransactions);
  const currentMonthIncomes =
    filterCurrentMonthTransactions(incomeTransactions);

  // Calcular total de despesas e receitas do mês
  const totalExpenses = currentMonthExpenses.reduce(
    (sum, t) => sum + t.value,
    0
  );
  const totalIncomes = currentMonthIncomes.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-100 p-4 pt-16 pb-20 dark:bg-black">
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-300 dark:border-gray-500 dark:bg-gray-800">
            <div className="flex items-center justify-between p-6">
              <div className="w-1 self-stretch bg-green-800" />
              <div className="ml-4 flex flex-1 flex-col">
                <h4 className="dark:text-white">Saldo geral</h4>
                <p className="mt-1 font-bold text-2xl dark:text-white">
                  {isLoading
                    ? "Carregando..."
                    : `R$ ${totalBalance.toFixed(2).replace(".", ",")}`}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <FaRegEyeSlash className="h-6 w-6 cursor-pointer dark:text-white" />
              </div>
            </div>
            <div className="p-6">
              <h2 className="mb-4 font-bold dark:text-white">Minhas contas</h2>

              {isLoading && (
                <p className="text-center dark:text-white">
                  Carregando contas...
                </p>
              )}

              {isError && (
                <p className="text-center dark:text-red-400">
                  Erro ao carregar contas
                </p>
              )}

              {!(isLoading || isError || hasBankAccounts) && (
                <Link
                  className="mt-8 block w-full rounded bg-green-400 px-4 py-2 text-center font-semibold text-white transition-colors hover:cursor-pointer hover:bg-green-500"
                  to="/bank-accounts"
                >
                  Adicionar conta
                </Link>
              )}

              {!(isLoading || isError) && hasBankAccounts && (
                <>
                  <div className="space-y-4">
                    {bankAccounts.map((account) => (
                      <div
                        className="flex items-center justify-between"
                        key={account.id}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                          {/* imagem */}
                        </div>
                        <h3 className="ml-4 flex-1 dark:text-white">
                          Conta {account.number}
                        </h3>
                        <div className="ml-auto">
                          <p className="font-semibold dark:text-white">
                            R$ {account.balance.toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    className="mt-8 block w-full rounded bg-green-400 px-4 py-2 text-center font-semibold text-white transition-colors hover:cursor-pointer hover:bg-green-500"
                    to="/bank-accounts"
                  >
                    Gerenciar contas
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-300 dark:border-gray-500 dark:bg-gray-800">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold dark:text-white">Receitas</h2>
                <p className="dark:text-white">{getCurrentMonthYear()}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold text-2xl text-green-600 dark:text-green-400">
                  {formatCurrency(totalIncomes)}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <h4 className="mb-4 font-semibold dark:text-white">
                Últimas receitas
              </h4>
              {currentMonthIncomes.length === 0 ? (
                <p className="py-4 text-center text-gray-500 text-sm dark:text-gray-400">
                  Nenhuma receita registrada este mês
                </p>
              ) : (
                <div className="space-y-3">
                  {currentMonthIncomes.map((transaction) => (
                    <div
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                      key={transaction.id}
                    >
                      <div className="flex flex-1 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                          {/* imagem */}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-semibold text-sm dark:text-white">
                            {transaction.name}
                          </h3>
                          <p className="text-gray-500 text-xs dark:text-gray-400">
                            {transactionCategories?.find(
                              (c) => c.id === transaction.transactionCategoryId
                            )?.name || "Categoria"}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 text-right">
                        <p className="font-semibold text-green-600 text-sm dark:text-green-400">
                          {formatCurrency(transaction.value)}
                        </p>
                        <p className="text-gray-500 text-xs dark:text-gray-400">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-300 dark:border-gray-500 dark:bg-gray-800">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold dark:text-white">Gastos</h2>
                <p className="dark:text-white">{getCurrentMonthYear()}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold text-2xl text-red-600 dark:text-red-400">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <h4 className="mb-4 font-semibold dark:text-white">
                Últimos gastos
              </h4>
              {currentMonthExpenses.length === 0 ? (
                <p className="py-4 text-center text-gray-500 text-sm dark:text-gray-400">
                  Nenhuma despesa registrada este mês
                </p>
              ) : (
                <div className="space-y-3">
                  {currentMonthExpenses.map((transaction) => (
                    <div
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                      key={transaction.id}
                    >
                      <div className="flex flex-1 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                          {/* imagem */}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-semibold text-sm dark:text-white">
                            {transaction.name}
                          </h3>
                          <p className="text-gray-500 text-xs dark:text-gray-400">
                            {transactionCategories?.find(
                              (c) => c.id === transaction.transactionCategoryId
                            )?.name || "Categoria"}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 text-right">
                        <p className="font-semibold text-red-600 text-sm dark:text-red-400">
                          {formatCurrency(transaction.value)}
                        </p>
                        <p className="text-gray-500 text-xs dark:text-gray-400">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
