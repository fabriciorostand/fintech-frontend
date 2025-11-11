import { Header } from "../components/header";

export function Investments() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-gray-100 p-4 pt-16 pb-20 dark:bg-black">
        <h1 className="text-center text-2xl dark:text-white">Em breve</h1>
      </main>
    </div>
  );
}