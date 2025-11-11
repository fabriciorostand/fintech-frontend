import { useEffect, useState } from "react";
import { useBanks } from "../../services/use-banks";
import { useCreateBankAccount } from "../../services/use-create-bank-account";
import { useCreateBranch } from "../../services/use-create-branch";
import { useUpdateBankAccount } from "../../services/use-update-bank-account";
import { useUpdateBranch } from "../../services/use-update-branch";
import { Button } from "./button";
import { FormLabel } from "./form";
import { Input } from "./input";

interface BankAccountData {
  id: number;
  userId: number;
  branchId: number;
  bankId: number;
  number: string;
  balance: number;
  branchNumber: string;
}

interface BankAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  title: string;
  submitButtonText: string;
  initialData?: BankAccountData;
  showBalanceField?: boolean;
}

export function BankAccountsModal({
  isOpen,
  onClose,
  mode,
  title,
  submitButtonText,
  initialData,
  showBalanceField = true,
}: BankAccountsModalProps) {
  const [bankId, setBankId] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: banks, isLoading: isLoadingBanks } = useBanks();
  const createBranch = useCreateBranch();
  const createBankAccount = useCreateBankAccount();
  const updateBankAccount = useUpdateBankAccount();
  const updateBranch = useUpdateBranch();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setBankId(String(initialData.bankId));
      setBranchNumber(initialData.branchNumber);
      setAccountNumber(initialData.number);
      setBalance(String(initialData.balance));
    } else {
      setBankId("");
      setBranchNumber("");
      setAccountNumber("");
      setBalance("");
    }
  }, [mode, initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Usuário não autenticado");
        setIsSubmitting(false);
        return;
      }

      if (mode === "create") {
        // Primeiro cria a agência
        const branchResponse = await createBranch.mutateAsync({
          bankId: Number(bankId),
          number: branchNumber,
        });

        // Depois cria a conta bancária usando o ID da agência criada
        await createBankAccount.mutateAsync({
          userId: Number(userId),
          branchId: branchResponse.id,
          bankId: Number(bankId),
          number: accountNumber,
          balance: Number(balance),
        });
      } else if (mode === "edit" && initialData) {
        // Atualiza a agência
        await updateBranch.mutateAsync({
          id: initialData.branchId,
          bankId: Number(bankId),
          number: branchNumber,
        });

        // Atualiza a conta bancária
        await updateBankAccount.mutateAsync({
          id: initialData.id,
          userId: Number(userId),
          branchId: initialData.branchId,
          bankId: Number(bankId),
          number: accountNumber,
          balance: Number(balance),
        });
      }

      // Limpar o formulário
      setBankId("");
      setBranchNumber("");
      setAccountNumber("");
      setBalance("");

      // Fechar o modal
      onClose();
    } catch (error) {
      console.error(
        `Erro ao ${mode === "create" ? "criar" : "atualizar"} conta bancária:`,
        error
      );
      alert(
        `Erro ao ${mode === "create" ? "criar" : "atualizar"} conta bancária`
      );
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
          {title}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="relative mx-auto w-full">
            <FormLabel className="text-white">Banco:</FormLabel>
            <select
              className="mx-auto mt-1 block w-full max-w-md rounded border border-gray-300 bg-white p-2"
              disabled={isLoadingBanks || isSubmitting}
              onChange={(e) => setBankId(e.target.value)}
              required
              value={bankId}
            >
              <option value="">
                {isLoadingBanks ? "Carregando..." : "Selecione um banco"}
              </option>
              {banks?.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name} - {bank.number}
                </option>
              ))}
            </select>

            <FormLabel className="mt-4 text-white">Agência:</FormLabel>
            <Input
              disabled={isSubmitting}
              onChange={(e) => setBranchNumber(e.target.value)}
              placeholder="Digite o número da agência"
              required
              type="text"
              value={branchNumber}
            />

            <FormLabel className="mt-4 text-white">Número da Conta:</FormLabel>
            <Input
              disabled={isSubmitting}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Digite o número da conta"
              required
              type="text"
              value={accountNumber}
            />

            {showBalanceField && (
              <>
                <FormLabel className="mt-4 text-white">Saldo Atual:</FormLabel>
                <Input
                  disabled={isSubmitting}
                  min="0"
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="Digite o saldo inicial"
                  required
                  step="0.01"
                  type="number"
                  value={balance}
                />
              </>
            )}

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Salvando..." : submitButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}