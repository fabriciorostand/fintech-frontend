import { LoginForm } from "../components/login-form"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

export function Index() {
  const { isAuthenticated } = useAuth();

  // Se já estiver autenticado, redireciona para o dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="min-h-screen bg-green-500">
      <h1 className="text-5xl text-white text-center pt-20">Fintech</h1>
      <LoginForm />
    </main>
  )
}