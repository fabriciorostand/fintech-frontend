import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Header } from "../components/header"
import { Footer } from "../components/footer";
import { useBankAccounts } from "../services/use-bank-accounts";
import { Link } from "react-router-dom";

export function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: bankAccounts, isLoading, isError } = useBankAccounts(userId);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  const totalBalance = bankAccounts?.reduce((sum, account) => sum + account.balance, 0) ?? 0;
  const hasBankAccounts = bankAccounts && bankAccounts.length > 0;

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
                  <Link to="/bank-accounts" className="block w-full bg-green-400 hover:bg-green-500 hover:cursor-pointer mt-8 px-4 py-2 rounded font-semibold text-center transition-colors">
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
                <p className="dark:text-white">Nov/2025</p>
              </div>
            </div>
            <div className="p-6">
              {/* Gráfico de gastos */}
              <div>
                {/* Legenda do gráfico */}
              </div>
            </div>
            <div className="">
              <h4 className="dark:text-white">Últimos gastos</h4>
              {/* Lista de gastos recentes */}
            </div>
          </div>

          <div className="dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold dark:text-white">Receitas</h2>
                <p className="dark:text-white">Nov/2025</p>
              </div>
            </div>
            <div className="p-6">
              {/* Gráfico de gastos */}
              <div>
                {/* Legenda do gráfico */}
              </div>
            </div>
            <div className="">
              <h4 className="dark:text-white">Últimas receitas</h4>
              {/* Lista de receitas recentes */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}