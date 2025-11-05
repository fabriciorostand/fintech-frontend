import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from './pages/index.tsx';
import { Signup } from './pages/signup.tsx';
import { Dashboard } from './pages/dashboard.tsx';
import { Transactions } from './pages/transactions.tsx';
import { BankAccounts } from './pages/bank-accounts.tsx';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Index />} index />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Transactions />} path="/transactions" />
          <Route element={<BankAccounts />} path="/bank-accounts" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}