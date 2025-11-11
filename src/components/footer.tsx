import { BsBarChartFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { LuSettings } from "react-icons/lu";
import { MdOutlineHome } from "react-icons/md";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 flex w-full bg-white text-center text-black shadow-[0_-2px_6px_rgba(0,0,0,0.1)] md:hidden dark:bg-gray-800 dark:text-white">
      {/* Home */}
      <Link
        className="flex flex-1 flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        to="/dashboard"
      >
        <MdOutlineHome className="h-5 w-5" />
        Início
      </Link>

      {/* Transactions */}
      <Link
        className="flex flex-1 flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        to="/transactions"
      >
        <GrTransaction className="h-5 w-5" />
        Lançamentos
      </Link>

      {/* Investments */}
      <Link
        className="flex flex-1 flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        to="/investments"
      >
        <BsBarChartFill className="h-5 w-5" />
        Investimentos
      </Link>

      {/* Configs */}
      <Link
        className="flex flex-1 flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        to="/configurations"
      >
        <LuSettings className="h-5 w-5" />
        Configurações
      </Link>
    </footer>
  );
}