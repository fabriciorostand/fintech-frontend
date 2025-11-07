import { Button } from './button'

interface ExclusionConfirmationProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    isDeleting?: boolean
}

export function ExclusionConfirmation({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isDeleting = false
}: ExclusionConfirmationProps) {
    if (!isOpen) return null

    const handleConfirm = () => {
        onConfirm()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg shadow-xl w-full max-w-md p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white transition-colors duration-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-400 hover:cursor-pointer"
                    type="button"
                    disabled={isDeleting}
                    aria-label="Fechar"
                >
                    &times;
                </button>

                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-white text-2xl font-bold text-center">
                        {title}
                    </h2>
                </div>

                <div className="text-white text-center mb-8 text-lg">
                    <p>{message}</p>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="bg-white text-gray-800 p-3 rounded w-full hover:bg-gray-200 transition-colors duration-200 font-medium hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="bg-red-600 bg-opacity-20 text-white p-3 rounded w-full hover:bg-red-500 duration-200 font-medium hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? 'Excluindo...' : 'Confirmar Exclusão'}
                    </Button>
                </div>
            </div>
        </div>
    )
}