'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>Página inicial</main>;
    </QueryClientProvider>
  );
}
