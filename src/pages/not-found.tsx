import { BiSad } from "react-icons/bi";

export function NotFound() {
    return (
        <main className="min-h-screen bg-linear-to-br from-green-400 to-green-600 dark:from-gray-900 dark:to-black flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
                    {/* Ícone de erro */}
                    <div className="flex justify-center mb-6">
                        <BiSad className="w-24 h-24 text-green-500 dark:text-green-400" />
                    </div>

                    {/* Código 404 */}
                    <h1 className="text-6xl md:text-8xl font-bold text-green-500 dark:text-green-400 mb-4">
                        404
                    </h1>

                    {/* Mensagem */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                        Página não encontrada
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Desculpe, a página que você está procurando não existe ou foi movida.
                    </p>
                </div>
            </div>
        </main>
    );
}