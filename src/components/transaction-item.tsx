import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { formatCurrency, formatDate } from "../utils/formatters";

type Transaction = {
  id: number;
  name: string;
  description: string;
  transactionTypeId: number;
  transactionCategoryId: number;
  value: number;
  date: string;
  bankAccountId?: number;
  userId?: number;
};

type TransactionItemProps = {
  transaction: Transaction;
  categoryName: string | undefined;
  onEdit: (transactionId: number) => void;
  onDelete: (transactionId: number) => void;
};

export function TransactionItem({
  transaction,
  categoryName,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  return (
    <div className="mt-4 rounded border border-gray-300 p-4 dark:border-gray-500 dark:bg-gray-800">
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
              {categoryName}
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
            onClick={() => onEdit(transaction.id)}
            type="button"
          >
            <MdEdit className="inline-block h-6 w-6 dark:text-white" />
          </button>
          <button
            className="hover:cursor-pointer"
            onClick={() => onDelete(transaction.id)}
            type="button"
          >
            <FaRegTrashAlt className="inline-block h-5 w-5 dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}