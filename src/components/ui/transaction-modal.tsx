import { useState } from 'react'
import { FormLabel } from './form'
import { Input } from './input'
import { Button } from './button'
import { useTransactionTypes } from '../../services/use-transaction-types'

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
}

export function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [bankAccountId, setBankAccountId] = useState('')
    const [transactionTypeId, setTransactionTypeId] = useState('')
    const [transactionCategoryId, setTransactionCategoryId] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')

    const { data: transactionTypes, isLoading: isLoadingTransactionTypes } = useTransactionTypes()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

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
                    Novo Lançamento
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
                        />

                        <FormLabel className="mt-4 text-white">
                            Conta Bancária:
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder="Digite o ID da conta"
                            value={bankAccountId}
                            onChange={(e) => setBankAccountId(e.target.value)}
                            required
                        />

                        <FormLabel className="mt-4 text-white">
                            Tipo:
                        </FormLabel>
                        <select
                            className="bg-white border border-gray-300 p-2 rounded w-full max-w-md mx-auto block mt-1"
                            value={transactionTypeId}
                            onChange={(e) => setTransactionTypeId(e.target.value)}
                            required
                            disabled={isLoadingTransactionTypes}
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
                        <Input
                            type="text"
                            placeholder="Digite o ID da categoria"
                            value={transactionCategoryId}
                            onChange={(e) => setTransactionCategoryId(e.target.value)}
                            required
                        />

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
                        />

                        <FormLabel className="mt-4 text-white">
                            Data:
                        </FormLabel>
                        <Input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />

                        <Button type="submit">
                            Salvar Lançamento
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}