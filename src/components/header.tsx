import { BsBarChartFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { MdNotificationsNone, MdOutlineHome } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useDropdown } from "../hooks/useDropdown";
import { useSidebar } from "../hooks/useSidebar";
import { Link } from "react-router-dom";
import { AiFillBank } from "react-icons/ai";

export function Header() {
    const { isOpen, toggleSidebar } = useSidebar();
    const {
        isOpen: isAvatarDropdownOpen,
        toggleDropdown: toggleAvatarDropdown,
        dropdownRef: avatarDropdownRef,
        buttonRef: avatarButtonRef,
    } = useDropdown();

    return (
        <header className="fixed top-0 left-0 w-full bg-green-400 dark:bg-gray-800 px-6 py-2 flex items-center justify-between shadow-md z-50">
            {/* Menu button */}
            <button
                onClick={toggleSidebar}
                className="hidden md:flex"
                aria-label="Toggle menu"
            >
                <IoIosMenu className="h-7 w-7 text-white cursor-pointer" />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-60 bg-green-400 dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4 flex items-center gap-3">
                    {/* Menu button in sidebar */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2"
                        aria-label="Close menu"
                    >
                        <IoIosMenu className="h-7 w-7 text-white cursor-pointer" />
                    </button>
                </div>

                <nav className="flex flex-col p-4 gap-4">
                    <Link to="/dashboard" className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-green-300 dark:hover:bg-gray-700 transition">
                        <MdOutlineHome className="h-5 w-5" />
                        Início
                    </Link>
                    <Link to="/transactions" className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-green-300 dark:hover:bg-gray-700 transition">
                        <GrTransaction className="h-5 w-5" />
                        Lançamentos
                    </Link>
                    <Link to="/investments" className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-green-300 dark:hover:bg-gray-700 transition">
                        <BsBarChartFill className="h-5 w-5" />
                        Investimentos
                    </Link>
                    <Link to="/bank-accounts" className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-green-300 dark:hover:bg-gray-700 transition">
                        <AiFillBank className="h-5 w-5" />
                        Contas Bancárias
                    </Link>
                    <Link to="/configurations" className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-green-300 dark:hover:bg-gray-700 transition">
                        <LuSettings className="h-5 w-5" />
                        Configurações
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                {/* Notification icon */}
                <div>
                    <MdNotificationsNone className="h-6 w-6 text-white cursor-pointer" />
                </div>

                {/* Account avatar */}
                <div className="relative">
                    <button
                        ref={avatarButtonRef}
                        onClick={toggleAvatarDropdown}
                        className="p-1"
                        aria-label="Menu do usuário"
                    >
                        <RxAvatar className="h-10 w-10 text-white cursor-pointer rounded-full" />
                    </button>

                    {/* Avatar Dropdown */}
                    {isAvatarDropdownOpen && (
                        <div
                            ref={avatarDropdownRef}
                            className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                        >
                            <a
                                href="profile.html"
                                className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Perfil
                            </a>
                            {/* Logout button */}
                            <button
                                id="logoutBtn"
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}