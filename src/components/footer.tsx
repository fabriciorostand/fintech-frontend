import { BsBarChartFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { LuSettings } from "react-icons/lu";
import { MdOutlineHome } from "react-icons/md";
import { Link } from "react-router";

export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full flex bg-white dark:bg-gray-800 text-black dark:text-white text-center shadow-[0_-2px_6px_rgba(0,0,0,0.1)] md:hidden">
            {/* Home */}
            <Link to="/dashboard" className="flex flex-1 flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <MdOutlineHome />
                Início
            </Link>

            {/* Transactions */}
            <Link to="/transactions" className="flex flex-1 flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <GrTransaction />
                Lançamentos
            </Link>

            {/* Investments */}
            <Link to="/investments" className="flex flex-1 flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <BsBarChartFill />
                Investimentos
            </Link>

            {/* Configs */}
            <Link to="/configurations" className="flex flex-1 flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <LuSettings />
                Configurações
            </Link>
        </footer>
    )
}