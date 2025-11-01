import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from './pages/index.tsx';
import { Signup } from './pages/signup.tsx';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Index />} index />
          <Route element={<Signup />} path="/signup" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}