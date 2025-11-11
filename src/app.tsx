import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route.tsx";
import { AuthProvider } from "./contexts/auth-context.tsx";
import { ThemeProvider } from "./contexts/theme-context.tsx";
import { BankAccounts } from "./pages/bank-accounts.tsx";
import { Configurations } from "./pages/configurations.tsx";
import { Dashboard } from "./pages/dashboard.tsx";
import { Index } from "./pages/index.tsx";
import { Investments } from "./pages/investments.tsx";
import { NotFound } from "./pages/not-found.tsx";
import { Signup } from "./pages/signup.tsx";
import { Transactions } from "./pages/transactions.tsx";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Index />} index />
              <Route element={<Signup />} path="/signup" />
              <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>} path="/dashboard" />
              <Route element={<ProtectedRoute><Transactions /></ProtectedRoute>} path="/transactions" />
              <Route element={<ProtectedRoute><BankAccounts /></ProtectedRoute>} path="/bank-accounts" />
              <Route element={<ProtectedRoute><Investments /></ProtectedRoute>} path="/investments" />
              <Route element={<ProtectedRoute><Configurations /></ProtectedRoute>} path="/configurations" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}