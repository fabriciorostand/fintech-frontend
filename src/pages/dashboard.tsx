import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Header } from "../components/header"
import { Footer } from "../components/footer";
import { useBankAccounts } from "../services/use-bank-accounts";
import { useUserTransactionsByType } from "../services/use-user-transactions-by-type";
import { useTransactionCategories } from "../services/use-transaction-categories";
import { Link } from "react-router-dom";

export function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: bankAccounts, isLoading, isError } = useBankAccounts(userId);

  // Busca receitas (tipo 1) e despesas (tipo 4)
  const { data: incomeTransactions } = useUserTransactionsByType(userId, '1');
  const { data: expenseTransactions } = useUserTransactionsByType(userId, '4');
  const { data: transactionCategories } = useTransactionCategories();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  const totalBalance = bankAccounts?.reduce((sum, account) => sum + account.balance, 0) ?? 0;
  const hasBankAccounts = bankAccounts && bankAccounts.length > 0;

  // Função para filtrar transações do mês atual
  const filterCurrentMonthTransactions = (transactions: Array<{
    id: number;
    name: string;
    description: string;
    bankAccountId: number;
    transactionTypeId: number;
    transactionCategoryId: number;
    value: number;
    date: string;
  }> | undefined) => {
    if (!transactions) return [];

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  // Função para formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  // Obter mês atual formatado
  const getCurrentMonthYear = () => {
    const now = new Date();
    const month = now.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    const year = now.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)}/${year}`;
  };

  const currentMonthExpenses = filterCurrentMonthTransactions(expenseTransactions);
  const currentMonthIncomes = filterCurrentMonthTransactions(incomeTransactions);

  // Calcular total de despesas e receitas do mês
  const totalExpenses = currentMonthExpenses.reduce((sum, t) => sum + t.value, 0);
  const totalIncomes = currentMonthIncomes.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="bg-gray-100 dark:bg-black flex-1 p-4 pt-16 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-6 mt-8">
          <div className="dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-xl">
            <div className="flex items-center justify-between p-6">
              <div className="w-1 bg-green-800 self-stretch" />
              <div className="flex flex-col flex-1 ml-4">
                <h4 className="dark:text-white">Saldo geral</h4>
                <p className="dark:text-white text-2xl font-bold mt-1">
                  {isLoading ? 'Carregando...' : `R$ ${totalBalance.toFixed(2).replace('.', ',')}`}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <FaRegEyeSlash className="h-6 w-6 dark:text-white cursor-pointer" />
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-bold dark:text-white mb-4">Minhas contas</h2>

              {isLoading && (
                <p className="dark:text-white text-center">Carregando contas...</p>
              )}

              {isError && (
                <p className="dark:text-red-400 text-center">Erro ao carregar contas</p>
              )}

              {!isLoading && !isError && !hasBankAccounts && (
                <Link to="/bank-accounts" className="block w-full bg-green-400 hover:bg-green-500 hover:cursor-pointer mt-8 px-4 py-2 rounded font-semibold text-center transition-colors">
                  Adicionar conta
                </Link>
              )}

              {!isLoading && !isError && hasBankAccounts && (
                <>
                  <div className="space-y-4">
                    {bankAccounts.map((account) => (
                      <div key={account.id} className="flex items-center justify-between">
                        <div className="rounded-full w-12 h-12 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          {/* imagem */}
                        </div>
                        <h3 className="dark:text-white ml-4 flex-1">Conta {account.number}</h3>
                        <div className="ml-auto">
                          <p className="dark:text-white font-semibold">
                            R$ {account.balance.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/bank-accounts" className="block w-full bg-green-400 hover:bg-green-500 hover:cursor-pointer mt-8 px-4 py-2 rounded font-semibold text-white text-center transition-colors">
                    Gerenciar contas
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold dark:text-white">Gastos</h2>
                <p className="dark:text-white">{getCurrentMonthYear()}</p>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <h4 className="dark:text-white font-semibold mb-4">Últimos gastos</h4>
              {currentMonthExpenses.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  Nenhuma despesa registrada este mês
                </p>
              ) : (
                <div className="space-y-3">
                  {currentMonthExpenses.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-600 flex items-center justify-center shrink-0">
                          {/* imagem */}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm dark:text-white truncate">
                            {transaction.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {transactionCategories?.find(c => c.id === transaction.transactionCategoryId)?.name || 'Categoria'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <p className="font-semibold text-sm text-red-600 dark:text-red-400">
                          {formatCurrency(transaction.value)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold dark:text-white">Receitas</h2>
                <p className="dark:text-white">{getCurrentMonthYear()}</p>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalIncomes)}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <h4 className="dark:text-white font-semibold mb-4">Últimas receitas</h4>
              {currentMonthIncomes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  Nenhuma receita registrada este mês
                </p>
              ) : (
                <div className="space-y-3">
                  {currentMonthIncomes.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-600 flex items-center justify-center shrink-0">
                          {/* imagem */}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm dark:text-white truncate">
                            {transaction.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {transactionCategories?.find(c => c.id === transaction.transactionCategoryId)?.name || 'Categoria'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <p className="font-semibold text-sm text-green-600 dark:text-green-400">
                          {formatCurrency(transaction.value)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
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