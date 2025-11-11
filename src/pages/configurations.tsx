import { MdNotificationsNone } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ExclusionConfirmation } from "../components/ui/exclusion-confirmation";
import { useDarkMode } from "../hooks/useDarkMode";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

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
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="g-gray-100 flex flex-1 pt-14 pb-20 md:pb-0 dark:bg-black">
        {/* Configurations container */}
        <div className="fixed top-14 left-0 z-40 w-full bg-white shadow-sm md:hidden dark:bg-gray-800">
          <h2 className="border-gray-200 border-b px-3 py-6 text-center font-semibold text-2xl text-gray-700 dark:border-gray-700 dark:text-white">
            Configurações
          </h2>
          <nav className="flex flex-row justify-around">
            {/* Account preferences */}
            <Link
              className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-green-500 transition dark:bg-gray-700 dark:text-green-300"
              to="/configurations"
            >
              <RxAvatar className="h-6 w-6" />
              Preferências da conta
            </Link>

            {/* Notifications */}
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              to=""
            >
              <MdNotificationsNone className="h-6 w-6" />
              Notificações
            </Link>
          </nav>
        </div>

        {/* Configurations sidebar */}
        <aside className="hidden w-60 flex-col bg-white p-4 shadow-md md:flex dark:bg-gray-800">
          <h2 className="mb-4 px-3 py-2 font-semibold text-gray-700 text-xl dark:text-white">
            Configurações
          </h2>
          <nav className="flex flex-col gap-2">
            {/* Account preferences */}
            <Link
              className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-green-500 transition dark:bg-gray-700 dark:text-green-300"
              to="/configurations"
            >
              <RxAvatar className="h-6 w-6" />
              Preferências da conta
            </Link>

            {/* Notifications */}
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              to=""
            >
              <MdNotificationsNone className="h-6 w-6" />
              Notificações
            </Link>
          </nav>
        </aside>

        {/* Account preferences content */}
        <section className="mx-auto mt-32 max-w-6xl flex-1 p-6 md:mt-0">
          {/* Display */}
          <div className="mb-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 font-semibold text-gray-700 text-lg dark:text-white">
              Exibição
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-white">Modo escuro</span>
              <button
                aria-label="Toggle dark mode"
                className="inline-flex cursor-pointer items-center"
                onClick={toggleDarkMode}
                type="button"
              >
                <div
                  className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${isDarkMode ? "bg-green-400" : "bg-gray-300"}`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${isDarkMode ? "translate-x-5" : "translate-x-0"}`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Account management */}
          <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 font-semibold text-gray-700 text-lg dark:text-white">
              Gerenciamento da conta
            </h2>
            <p className="mb-4 text-gray-600 dark:text-white">
              Ao excluir sua conta, todos os seus dados serão removidos
              permanentemente. Esta ação não pode ser desfeita.
            </p>
            <button
              className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:cursor-pointer hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isDeleting}
              onClick={handleDeleteClick}
            >
              {isDeleting ? "Excluindo..." : "Excluir conta"}
            </button>
          </div>
        </section>
      </main>

      <ExclusionConfirmation
        isDeleting={isDeleting}
        isOpen={isDeleteModalOpen}
        message="Tem certeza que deseja excluir sua conta? Todos os seus dados serão removidos permanentemente. Esta ação não pode ser desfeita."
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Excluir Conta"
      />

      <Footer />
    </div>
  );
}