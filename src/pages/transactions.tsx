import { useState } from "react";
import { Header } from "../components/header";
import { TransactionModal } from "../components/ui/transaction-modal";

export function Transactions() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="bg-gray-100 dark:bg-black flex-1 p-4 pt-16 pb-20">
                <button
                    onClick={handleOpenModal}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4"
                >
                    Novo Lançamento
                </button>

                <TransactionModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </main>
        </div>
    );
}