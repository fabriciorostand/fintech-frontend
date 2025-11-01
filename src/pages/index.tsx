import { LoginForm } from "../components/login-form"

export function Index() {
  return (
    <main className="min-h-screen bg-green-500">
      <h1 className="text-5xl text-white text-center pt-20">Fintech</h1>
      <LoginForm />
    </main>
  )
}