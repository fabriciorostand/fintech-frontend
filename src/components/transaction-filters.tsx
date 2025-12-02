type BankAccount = {
  id: number;
  number: string;
  bankId: number;
  [key: string]: unknown;
};

type Bank = {
  id: number;
  name: string;
  [key: string]: unknown;
};

type TransactionFiltersProps = {
  selectedBankAccountId: string | null;
  selectedTransactionTypeId: string | null;
  onBankAccountChange: (value: string) => void;
  onTransactionTypeChange: (value: string | null) => void;
  onCreateClick: () => void;
  bankAccounts: BankAccount[];
  banks: Bank[];
};

export function TransactionFilters({
  selectedBankAccountId,
  selectedTransactionTypeId,
  onBankAccountChange,
  onTransactionTypeChange,
  onCreateClick,
  bankAccounts,
  banks,
}: TransactionFiltersProps) {
  return (
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
            onChange={(e) => onBankAccountChange(e.target.value)}
            value={selectedBankAccountId || ""}
          >
            <option value="all">Todas as contas</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id.toString()}>
                {banks?.find((b) => b.id === account.bankId)?.name} -{" "}
                {account.number}
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
            onChange={(e) => onTransactionTypeChange(e.target.value || null)}
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
        onClick={onCreateClick}
        type="button"
      >
        Novo Lançamento
        <span className="ml-2 inline-block">+</span>
      </button>
    </div>
  );
}