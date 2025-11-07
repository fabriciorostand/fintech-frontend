import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from './pages/index.tsx';
import { Signup } from './pages/signup.tsx';
import { Dashboard } from './pages/dashboard.tsx';
import { Transactions } from './pages/transactions.tsx';
import { BankAccounts } from './pages/bank-accounts.tsx';
import { Investments } from './pages/investments.tsx';
import { Configurations } from './pages/configurations.tsx';
import { NotFound } from './pages/not-found.tsx';
import { AuthProvider } from './contexts/auth-context.tsx';
import { ProtectedRoute } from './components/protected-route.tsx';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}