import { Header } from "../components/header";

export function Investments() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="bg-gray-100 dark:bg-black flex-1 p-4 pt-16 pb-20 flex items-center justify-center">
        <h1 className="dark:text-white text-2xl text-center">Em breve</h1>
      </main>
    </div>
  )
}