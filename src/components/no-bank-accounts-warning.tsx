import { BsExclamationTriangle } from "react-icons/bs";
import { Link } from "react-router";

export function NoBankAccountsWarning() {
  return (
    <div className="mt-8 rounded-lg border-2 border-yellow-400 bg-yellow-50 p-8 text-center dark:border-yellow-600 dark:bg-yellow-900/20">
      <div className="flex flex-col items-center gap-4">
        <BsExclamationTriangle className="h-16 w-16 text-yellow-600 dark:text-yellow-400" />
        <div>
          <h3 className="mb-2 font-semibold text-gray-800 text-xl dark:text-gray-200">
            Nenhuma conta bancária cadastrada
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Para gerenciar seus lançamentos, você precisa cadastrar uma conta
            bancária primeiro.
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
  );
}