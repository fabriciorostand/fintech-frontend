import { useState, useEffect } from 'react'
import { FormLabel } from './form'
import { Input } from './input'
import { Button } from './button'
import { useTransactionTypes } from '../../services/use-transaction-types'
import { useBankAccounts } from '../../services/use-bank-accounts'
import { useTransactionCategories } from '../../services/use-transaction-categories'
import { useCreateTransaction } from '../../services/use-create-transaction'
import { useUpdateTransaction } from '../../services/use-update-transaction'
import { useBanks } from '../../services/use-banks'

interface TransactionData {
    id: number
    name: string
    description: string
    bankAccountId: number
    transactionTypeId: number
    transactionCategoryId: number
    value: number
    date: string
}

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    mode?: 'create' | 'edit'
    title?: string
    submitButtonText?: string
    initialData?: TransactionData
}

export function TransactionModal({
    isOpen,
    onClose,
    mode = 'create',
    title,
    submitButtonText,
    initialData
}: TransactionModalProps) {
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [bankAccountId, setBankAccountId] = useState('')
    const [transactionTypeId, setTransactionTypeId] = useState('')
    const [transactionCategoryId, setTransactionCategoryId] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')
    const [userId, setUserId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: transactionTypes, isLoading: isLoadingTransactionTypes } = useTransactionTypes()
    const { data: bankAccounts, isLoading: isLoadingBankAccounts } = useBankAccounts(userId)
    const { data: transactionCategories, isLoading: isLoadingTransactionCategories } = useTransactionCategories()
    const { data: banks } = useBanks()
    const createTransaction = useCreateTransaction()
    const updateTransaction = useUpdateTransaction()

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId')
        setUserId(storedUserId)
    }, [])

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setNome(initialData.name)
            setDescricao(initialData.description)
            setBankAccountId(String(initialData.bankAccountId))
            setTransactionTypeId(String(initialData.transactionTypeId))
            setTransactionCategoryId(String(initialData.transactionCategoryId))
            setValor(String(initialData.value))
            setData(initialData.date)
        } else {
            setNome('')
            setDescricao('')
            setBankAccountId('')
            setTransactionTypeId('')
            setTransactionCategoryId('')
            setValor('')
            setData('')
        }
    }, [mode, initialData, isOpen])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            if (mode === 'create') {
                await createTransaction.mutateAsync({
                    name: nome,
                    description: descricao,
                    bankAccountId: Number(bankAccountId),
                    transactionTypeId: Number(transactionTypeId),
                    transactionCategoryId: Number(transactionCategoryId),
                    value: Number(valor),
                    date: data,
                })
            } else if (mode === 'edit' && initialData) {
                await updateTransaction.mutateAsync({
                    id: initialData.id,
                    name: nome,
                    description: descricao,
                    bankAccountId: Number(bankAccountId),
                    transactionTypeId: Number(transactionTypeId),
                    transactionCategoryId: Number(transactionCategoryId),
                    value: Number(valor),
                    date: data,
                })
            }

            // Limpar o formulário
            setNome('')
            setDescricao('')
            setBankAccountId('')
            setTransactionTypeId('')
            setTransactionCategoryId('')
            setValor('')
            setData('')

            // Fechar o modal
            onClose()
        } catch (error) {
            console.error(`Erro ao ${mode === 'create' ? 'criar' : 'atualizar'} lançamento:`, error)
            alert(`Erro ao ${mode === 'create' ? 'criar' : 'atualizar'} lançamento`)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-linear-to-br from-green-500 to-blue-500 rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
                    type="button"
                >
                    &times;
                </button>

                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    {title || (mode === 'create' ? 'Novo Lançamento' : 'Editar Lançamento')}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="relative w-full mx-auto">
                        <FormLabel className="text-white">
                            Nome:
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder="Digite o nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />

                        <FormLabel className="mt-4 text-white">
                            Descrição:
                        </FormLabel>
                        <textarea
                            className="bg-white border border-gray-300 p-2 rounded w-full max-w-md mx-auto block mt-1 resize-none"
                            placeholder="Digite a descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            rows={3}
                            required
                            disabled={isSubmitting}
                        />

                        <FormLabel className="mt-4 text-white">
                            Conta Bancária:
                        </FormLabel>
                        <select
                            className="bg-white border border-gray-300 p-2 rounded w-full max-w-md mx-auto block mt-1"
                            value={bankAccountId}
                            onChange={(e) => setBankAccountId(e.target.value)}
                            required
                            disabled={isLoadingBankAccounts || isSubmitting}
                        >
                            <option value="">
                                {isLoadingBankAccounts ? 'Carregando...' : 'Selecione uma conta'}
                            </option>
                            {bankAccounts?.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {banks?.find(b => b.id === account.bankId)?.name} - {account.number}
                                </option>
                            ))}
                        </select>

                        <FormLabel className="mt-4 text-white">
                            Tipo:
                        </FormLabel>
                        <select
                            className="bg-white border border-gray-300 p-2 rounded w-full max-w-md mx-auto block mt-1"
                            value={transactionTypeId}
                            onChange={(e) => setTransactionTypeId(e.target.value)}
                            required
                            disabled={isLoadingTransactionTypes || isSubmitting}
                        >
                            <option value="">
                                {isLoadingTransactionTypes ? 'Carregando...' : 'Selecione um tipo'}
                            </option>
                            {transactionTypes?.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>

                        <FormLabel className="mt-4 text-white">
                            Categoria:
                        </FormLabel>
                        <select
                            className="bg-white border border-gray-300 p-2 rounded w-full max-w-md mx-auto block mt-1"
                            value={transactionCategoryId}
                            onChange={(e) => setTransactionCategoryId(e.target.value)}
                            required
                            disabled={isLoadingTransactionCategories || isSubmitting}
                        >
                            <option value="">
                                {isLoadingTransactionCategories ? 'Carregando...' : 'Selecione uma categoria'}
                            </option>
                            {transactionCategories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <FormLabel className="mt-4 text-white">
                            Valor:
                        </FormLabel>
                        <Input
                            type="number"
                            placeholder="Digite o valor"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            step="0.01"
                            min="0"
                            required
                            disabled={isSubmitting}
                        />

                        <FormLabel className="mt-4 text-white">
                            Data:
                        </FormLabel>
                        <Input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : (submitButtonText || (mode === 'create' ? 'Salvar Lançamento' : 'Atualizar Lançamento'))}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}