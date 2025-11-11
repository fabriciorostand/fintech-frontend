import { Button } from "./button";

interface ExclusionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting?: boolean;
}

export function ExclusionConfirmation({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting = false,
}: ExclusionConfirmationProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-linear-to-br from-green-500 to-green-600 p-8 shadow-xl">
        <button
          aria-label="Fechar"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full font-bold text-2xl text-white transition-colors duration-200 hover:cursor-pointer hover:bg-green-400"
          disabled={isDeleting}
          onClick={onClose}
          type="button"
        >
          &times;
        </button>

        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-center font-bold text-2xl text-white">{title}</h2>
        </div>

        <div className="mb-8 text-center text-lg text-white">
          <p>{message}</p>
        </div>

        <div className="flex gap-4">
          <Button
            className="w-full rounded bg-white p-3 font-medium text-gray-800 transition-colors duration-200 hover:cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDeleting}
            onClick={onClose}
            type="button"
          >
            Cancelar
          </Button>
          <Button
            className="w-full rounded bg-red-600 bg-opacity-20 p-3 font-medium text-white duration-200 hover:cursor-pointer hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDeleting}
            onClick={handleConfirm}
            type="button"
          >
            {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
          </Button>
        </div>
      </div>
    </div>
  );
}