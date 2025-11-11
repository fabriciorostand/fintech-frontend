import { AiFillBank } from "react-icons/ai";
import { BsBarChartFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { MdNotificationsNone, MdOutlineHome } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDropdown } from "../hooks/useDropdown";
import { useLogout } from "../hooks/useLogout";
import { useSidebar } from "../hooks/useSidebar";

export function Header() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { logout } = useLogout();
  const {
    isOpen: isAvatarDropdownOpen,
    toggleDropdown: toggleAvatarDropdown,
    dropdownRef: avatarDropdownRef,
    buttonRef: avatarButtonRef,
  } = useDropdown();

  return (
    <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-green-400 px-6 py-2 shadow-md dark:bg-gray-800">
      {/* Menu button */}
      <button
        aria-label="Toggle menu"
        className="hidden md:flex"
        onClick={toggleSidebar}
      >
        <IoIosMenu className="h-7 w-7 cursor-pointer text-white" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-60 transform bg-green-400 shadow-lg transition-transform duration-300 dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          {/* Menu button in sidebar */}
          <button
            aria-label="Close menu"
            className="p-2"
            onClick={toggleSidebar}
          >
            <IoIosMenu className="h-7 w-7 cursor-pointer text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4">
          <Link
            className="flex items-center gap-2 rounded-lg p-2 text-white transition hover:bg-green-300 dark:hover:bg-gray-700"
            to="/dashboard"
          >
            <MdOutlineHome className="h-5 w-5" />
            Início
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg p-2 text-white transition hover:bg-green-300 dark:hover:bg-gray-700"
            to="/transactions"
          >
            <GrTransaction className="h-5 w-5" />
            Lançamentos
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg p-2 text-white transition hover:bg-green-300 dark:hover:bg-gray-700"
            to="/investments"
          >
            <BsBarChartFill className="h-5 w-5" />
            Investimentos
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg p-2 text-white transition hover:bg-green-300 dark:hover:bg-gray-700"
            to="/bank-accounts"
          >
            <AiFillBank className="h-5 w-5" />
            Contas Bancárias
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg p-2 text-white transition hover:bg-green-300 dark:hover:bg-gray-700"
            to="/configurations"
          >
            <LuSettings className="h-5 w-5" />
            Configurações
          </Link>
        </nav>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Notification icon */}
        <div>
          <MdNotificationsNone className="h-6 w-6 cursor-pointer text-white" />
        </div>

        {/* Account avatar */}
        <div className="relative">
          <button
            aria-label="Menu do usuário"
            className="p-1"
            onClick={toggleAvatarDropdown}
            ref={avatarButtonRef}
          >
            <RxAvatar className="h-10 w-10 cursor-pointer rounded-full text-white" />
          </button>

          {/* Avatar Dropdown */}
          {isAvatarDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
              ref={avatarDropdownRef}
            >
              <a
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                href="profile.html"
              >
                Perfil
              </a>
              {/* Logout button */}
              <button
                className="w-full px-4 py-2 text-left text-gray-700 hover:cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={logout}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}