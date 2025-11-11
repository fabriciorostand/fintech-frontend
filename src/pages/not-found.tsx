import { BiSad } from "react-icons/bi";

export function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-400 to-green-600 p-4 dark:from-gray-900 dark:to-black">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-12 dark:bg-gray-800">
          {/* Ícone de erro */}
          <div className="mb-6 flex justify-center">
            <BiSad className="h-24 w-24 text-green-500 dark:text-green-400" />
          </div>

          {/* Código 404 */}
          <h1 className="mb-4 font-bold text-6xl text-green-500 md:text-8xl dark:text-green-400">
            404
          </h1>

          {/* Mensagem */}
          <h2 className="mb-4 font-semibold text-2xl text-gray-800 md:text-3xl dark:text-white">
            Página não encontrada
          </h2>

          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Desculpe, a página que você está procurando não existe ou foi
            movida.
          </p>
        </div>
      </div>
    </main>
  );
}