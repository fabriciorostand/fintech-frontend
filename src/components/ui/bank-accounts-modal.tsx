import { useState, useEffect } from 'react'
import { FormLabel } from './form'
import { Input } from './input'
import { Button } from './button'
import { useBanks } from '../../services/use-banks'
import { useCreateBranch } from '../../services/use-create-branch'
import { useCreateBankAccount } from '../../services/use-create-bank-account'
import { useUpdateBankAccount } from '../../services/use-update-bank-account'
import { useUpdateBranch } from '../../services/use-update-branch'

interface BankAccountData {
    id: number
    userId: number
    branchId: number
    bankId: number
    number: string
    balance: number
    branchNumber: string
}

interface BankAccountsModalProps {
    isOpen: boolean
    onClose: () => void
    mode: 'create' | 'edit'
    title: string
    submitButtonText: string
    initialData?: BankAccountData
    showBalanceField?: boolean
}

export function BankAccountsModal({
    isOpen,
    onClose,
    mode,
    title,
    submitButtonText,
    initialData,
    showBalanceField = true
}: BankAccountsModalProps) {
    const [bankId, setBankId] = useState('')
    const [branchNumber, setBranchNumber] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [balance, setBalance] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: banks, isLoading: isLoadingBanks } = useBanks()
    const createBranch = useCreateBranch()
    const createBankAccount = useCreateBankAccount()
    const updateBankAccount = useUpdateBankAccount()
    const updateBranch = useUpdateBranch()

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setBankId(String(initialData.bankId))
            setBranchNumber(initialData.branchNumber)
            setAccountNumber(initialData.number)
            setBalance(String(initialData.balance))
        } else {
            setBankId('')
            setBranchNumber('')
            setAccountNumber('')
            setBalance('')
        }
    }, [mode, initialData, isOpen])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const userId = localStorage.getItem('userId')
            if (!userId) {
                alert('Usuário não autenticado')
                setIsSubmitting(false)
                return
            }

            if (mode === 'create') {
                // Primeiro cria a agência
                const branchResponse = await createBranch.mutateAsync({
                    bankId: Number(bankId),
                    number: branchNumber,
                })

                // Depois cria a conta bancária usando o ID da agência criada
                await createBankAccount.mutateAsync({
                    userId: Number(userId),
                    branchId: branchResponse.id,
                    bankId: Number(bankId),
                    number: accountNumber,
                    balance: Number(balance),
                })
            } else if (mode === 'edit' && initialData) {
                // Atualiza a agência
                await updateBranch.mutateAsync({
                    id: initialData.branchId,
                    bankId: Number(bankId),
                    number: branchNumber,
                })

                // Atualiza a conta bancária
                await updateBankAccount.mutateAsync({
                    id: initialData.id,
                    userId: Number(userId),
                    branchId: initialData.branchId,
                    bankId: Number(bankId),
                    number: accountNumber,
                    balance: Number(balance),
                })
            }

            // Limpar o formulário
            setBankId('')
            setBranchNumber('')
            setAccountNumber('')
            setBalance('')

            // Fechar o modal
            onClose()
        } catch (error) {
            console.error(`Erro ao ${mode === 'create' ? 'criar' : 'atualizar'} conta bancária:`, error)
            alert(`Erro ao ${mode === 'create' ? 'criar' : 'atualizar'} conta bancária`)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
                    type="button"
                >
                    &times;
                </button>

                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    {title}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="relative w-full mx-auto">
                        <FormLabel className="text-white">
                            Banco:
                        </FormLabel>
                        <select
                            className="bg-white border border-gray-300 p-2 rounded w-full max-w-md mx-auto block mt-1"
                            value={bankId}
                            onChange={(e) => setBankId(e.target.value)}
                            required
                            disabled={isLoadingBanks || isSubmitting}
                        >
                            <option value="">
                                {isLoadingBanks ? 'Carregando...' : 'Selecione um banco'}
                            </option>
                            {banks?.map((bank) => (
                                <option key={bank.id} value={bank.id}>
                                    {bank.name} - {bank.number}
                                </option>
                            ))}
                        </select>

                        <FormLabel className="mt-4 text-white">
                            Agência:
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder="Digite o número da agência"
                            value={branchNumber}
                            onChange={(e) => setBranchNumber(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />

                        <FormLabel className="mt-4 text-white">
                            Número da Conta:
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder="Digite o número da conta"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />

                        {showBalanceField && (
                            <>
                                <FormLabel className="mt-4 text-white">
                                    Saldo Atual:
                                </FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Digite o saldo inicial"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    step="0.01"
                                    min="0"
                                    required
                                    disabled={isSubmitting}
                                />
                            </>
                        )}

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : submitButtonText}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}