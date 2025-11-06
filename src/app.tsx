import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from './pages/index.tsx';
import { Signup } from './pages/signup.tsx';
import { Dashboard } from './pages/dashboard.tsx';
import { Transactions } from './pages/transactions.tsx';
import { BankAccounts } from './pages/bank-accounts.tsx';
import { Investments } from './pages/investments.tsx';
import { Configurations } from './pages/configurations.tsx';

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
          <Route element={<Investments />} path="/investments" />
          <Route element={<Configurations />} path="/configurations" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}