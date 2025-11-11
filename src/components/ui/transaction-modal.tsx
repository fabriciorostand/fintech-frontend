import { useEffect, useState } from "react";
import { useBankAccounts } from "../../services/use-bank-accounts";
import { useBanks } from "../../services/use-banks";
import { useCreateTransaction } from "../../services/use-create-transaction";
import { useTransactionCategories } from "../../services/use-transaction-categories";
import { useTransactionTypes } from "../../services/use-transaction-types";
import { useUpdateTransaction } from "../../services/use-update-transaction";
import { Button } from "./button";
import { FormLabel } from "./form";
import { Input } from "./input";

interface TransactionData {
  id: number;
  name: string;
  description: string;
  bankAccountId: number;
  transactionTypeId: number;
  transactionCategoryId: number;
  value: number;
  date: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  title?: string;
  submitButtonText?: string;
  initialData?: TransactionData;
}

export function TransactionModal({
  isOpen,
  onClose,
  mode = "create",
  title,
  submitButtonText,
  initialData,
}: TransactionModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [bankAccountId, setBankAccountId] = useState("");
  const [transactionTypeId, setTransactionTypeId] = useState("");
  const [transactionCategoryId, setTransactionCategoryId] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: transactionTypes, isLoading: isLoadingTransactionTypes } =
    useTransactionTypes();
  const { data: bankAccounts, isLoading: isLoadingBankAccounts } =
    useBankAccounts(userId);
  const {
    data: transactionCategories,
    isLoading: isLoadingTransactionCategories,
  } = useTransactionCategories();
  const { data: banks } = useBanks();
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setNome(initialData.name);
      setDescricao(initialData.description);
      setBankAccountId(String(initialData.bankAccountId));
      setTransactionTypeId(String(initialData.transactionTypeId));
      setTransactionCategoryId(String(initialData.transactionCategoryId));
      setValor(String(initialData.value));
      setData(initialData.date);
    } else {
      setNome("");
      setDescricao("");
      setBankAccountId("");
      setTransactionTypeId("");
      setTransactionCategoryId("");
      setValor("");
      setData("");
    }
  }, [mode, initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === "create") {
        await createTransaction.mutateAsync({
          name: nome,
          description: descricao,
          bankAccountId: Number(bankAccountId),
          transactionTypeId: Number(transactionTypeId),
          transactionCategoryId: Number(transactionCategoryId),
          value: Number(valor),
          date: data,
        });
      } else if (mode === "edit" && initialData) {
        await updateTransaction.mutateAsync({
          id: initialData.id,
          name: nome,
          description: descricao,
          bankAccountId: Number(bankAccountId),
          transactionTypeId: Number(transactionTypeId),
          transactionCategoryId: Number(transactionCategoryId),
          value: Number(valor),
          date: data,
        });
      }

      // Limpar o formulário
      setNome("");
      setDescricao("");
      setBankAccountId("");
      setTransactionTypeId("");
      setTransactionCategoryId("");
      setValor("");
      setData("");

      // Fechar o modal
      onClose();
    } catch (error) {
      console.error(
        `Erro ao ${mode === "create" ? "criar" : "atualizar"} lançamento:`,
        error
      );
      alert(`Erro ao ${mode === "create" ? "criar" : "atualizar"} lançamento`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-linear-to-br from-green-500 to-green-600 p-6 shadow-xl">
        <button
          className="absolute top-4 right-4 font-bold text-2xl text-white hover:text-gray-200"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>

        <h2 className="mb-6 text-center font-bold text-2xl text-white">
          {title ||
            (mode === "create" ? "Novo Lançamento" : "Editar Lançamento")}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="relative mx-auto w-full">
            <FormLabel className="text-white">Nome:</FormLabel>
            <Input
              disabled={isSubmitting}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome"
              required
              type="text"
              value={nome}
            />

            <FormLabel className="mt-4 text-white">Descrição:</FormLabel>
            <textarea
              className="mx-auto mt-1 block w-full max-w-md resize-none rounded border border-gray-300 bg-white p-2"
              disabled={isSubmitting}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
              required
              rows={3}
              value={descricao}
            />

            <FormLabel className="mt-4 text-white">Conta Bancária:</FormLabel>
            <select
              className="mx-auto mt-1 block w-full max-w-md rounded border border-gray-300 bg-white p-2"
              disabled={isLoadingBankAccounts || isSubmitting}
              onChange={(e) => setBankAccountId(e.target.value)}
              required
              value={bankAccountId}
            >
              <option value="">
                {isLoadingBankAccounts
                  ? "Carregando..."
                  : "Selecione uma conta"}
              </option>
              {bankAccounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {banks?.find((b) => b.id === account.bankId)?.name} -{" "}
                  {account.number}
                </option>
              ))}
            </select>

            <FormLabel className="mt-4 text-white">Tipo:</FormLabel>
            <select
              className="mx-auto mt-1 block w-full max-w-md rounded border border-gray-300 bg-white p-2"
              disabled={isLoadingTransactionTypes || isSubmitting}
              onChange={(e) => setTransactionTypeId(e.target.value)}
              required
              value={transactionTypeId}
            >
              <option value="">
                {isLoadingTransactionTypes
                  ? "Carregando..."
                  : "Selecione um tipo"}
              </option>
              {transactionTypes
                ?.filter((type) => type.id === 1 || type.id === 4)
                .map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>

            <FormLabel className="mt-4 text-white">Categoria:</FormLabel>
            <select
              className="mx-auto mt-1 block w-full max-w-md rounded border border-gray-300 bg-white p-2"
              disabled={isLoadingTransactionCategories || isSubmitting}
              onChange={(e) => setTransactionCategoryId(e.target.value)}
              required
              value={transactionCategoryId}
            >
              <option value="">
                {isLoadingTransactionCategories
                  ? "Carregando..."
                  : "Selecione uma categoria"}
              </option>
              {transactionCategories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <FormLabel className="mt-4 text-white">Valor:</FormLabel>
            <Input
              disabled={isSubmitting}
              min="0"
              onChange={(e) => setValor(e.target.value)}
              placeholder="Digite o valor"
              required
              step="0.01"
              type="number"
              value={valor}
            />

            <FormLabel className="mt-4 text-white">Data:</FormLabel>
            <Input
              disabled={isSubmitting}
              onChange={(e) => setData(e.target.value)}
              required
              type="date"
              value={data}
            />

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting
                ? "Salvando..."
                : submitButtonText ||
                  (mode === "create"
                    ? "Salvar Lançamento"
                    : "Atualizar Lançamento")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}