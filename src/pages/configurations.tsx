import { Link } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { RxAvatar } from "react-icons/rx";
import { MdNotificationsNone } from "react-icons/md";
import { useDarkMode } from "../hooks/useDarkMode";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { ExclusionConfirmation } from "../components/ui/exclusion-confirmation";

export function Configurations() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const {
        isDeleteModalOpen,
        isDeleting,
        handleDeleteClick,
        handleConfirmDelete,
        handleCloseModal,
    } = useDeleteAccount();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="g-gray-100 dark:bg-black flex flex-1 pt-14 pb-20 md:pb-0">
                {/* Configurations container */}
                <div className="md:hidden fixed top-14 left-0 w-full bg-white dark:bg-gray-800 shadow-sm z-40">
                    <h2 className="text-2xl text-center font-semibold text-gray-700 dark:text-white px-3 py-6 border-b border-gray-200 dark:border-gray-700">
                        Configurações
                    </h2>
                    <nav className="flex flex-row justify-around">
                        {/* Account preferences */}
                        <Link to="/configurations" className="flex items-center gap-2 px-3 py-2 rounded-lg text-green-500 dark:text-green-300 bg-green-100 dark:bg-gray-700 transition">
                            <RxAvatar className="h-6 w-6" />
                            Preferências da conta
                        </Link>

                        {/* Notifications */}
                        <Link to="" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            <MdNotificationsNone className="h-6 w-6" />
                            Notificações
                        </Link>
                    </nav>
                </div>

                {/* Configurations sidebar */}
                <aside className="w-60 bg-white dark:bg-gray-800 shadow-md p-4 hidden md:flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4 px-3 py-2">Configurações</h2>
                    <nav className="flex flex-col gap-2">
                        {/* Account preferences */}
                        <Link to="/configurations" className="flex items-center gap-2 px-3 py-2 rounded-lg text-green-500 dark:text-green-300 bg-green-100 dark:bg-gray-700 transition">
                            <RxAvatar className="h-6 w-6" />
                            Preferências da conta
                        </Link>

                        {/* Notifications */}
                        <Link to="" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            <MdNotificationsNone className="h-6 w-6" />
                            Notificações
                        </Link>
                    </nav>
                </aside>

                {/* Account preferences content */}
                <section className="flex-1 max-w-6xl mx-auto mt-32 md:mt-0 p-6">
                    {/* Display */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Exibição</h2>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-white">Modo escuro</span>
                            <button
                                type="button"
                                onClick={toggleDarkMode}
                                className="inline-flex items-center cursor-pointer"
                                aria-label="Toggle dark mode"
                            >
                                <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-green-400' : 'bg-gray-300'}`}>
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Account management */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Gerenciamento da conta</h2>
                        <p className="text-gray-600 dark:text-white mb-4">Ao excluir sua conta, todos os seus dados serão removidos permanentemente. Esta ação não pode ser desfeita.</p>
                        <button
                            onClick={handleDeleteClick}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDeleting ? 'Excluindo...' : 'Excluir conta'}
                        </button>
                    </div>
                </section>
            </main>

            <ExclusionConfirmation
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Excluir Conta"
                message="Tem certeza que deseja excluir sua conta? Todos os seus dados serão removidos permanentemente. Esta ação não pode ser desfeita."
                isDeleting={isDeleting}
            />

            <Footer />
        </div>
    )
}