import { Navigate } from "react-router-dom";
import { LoginForm } from "../components/login-form";
import { useAuth } from "../hooks/useAuth";

export function Index() {
  const { isAuthenticated } = useAuth();

  // Se já estiver autenticado, redireciona para o dashboard
  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <main className="min-h-screen bg-green-500">
      <h1 className="pt-20 text-center text-5xl text-white">Fintech</h1>
      <LoginForm />
    </main>
  );
}