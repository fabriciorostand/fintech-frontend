import { FaRegEyeSlash } from "react-icons/fa6";
import { Header } from "../components/header"

export function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="bg-gray-100 dark:bg-black flex-1 p-4 pt-16 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-6 mt-4">
          <div className="dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-xl">
            <div className="flex items-center justify-between p-6">
              <div className="w-1 bg-green-800 self-stretch" />
              <div className="flex flex-col flex-1 ml-4">
                <h4 className="dark:text-white">Saldo geral</h4>
                <p className="dark:text-white text-2xl font-bold mt-1">R$ 10.000,00</p>
              </div>
              <div className="flex items-center justify-center">
                <FaRegEyeSlash className="h-6 w-6 dark:text-white cursor-pointer" />
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-bold dark:text-white mb-4">Minhas contas</h2>
              <div className="flex items-center justify-between">
                <div className="rounded-full w-12 h-12 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  {/* imagem */}
                </div>
                <h3 className="dark:text-white ml-4 flex-1">Nubank</h3>
                <div className="ml-auto">
                  <p className="dark:text-white font-semibold">R$ 5.000,00</p>
                </div>
              </div>
              <button className="w-full bg-green-400 mt-8 px-4 py-2 rounded">Gerenciar contas</button>
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
    </div>
  );
}