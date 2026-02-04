import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { asyncStoragePersister } from './persister';

const staleTime = 5 * 60 * 1000; // 5분
const gcTime = 1000 * 60 * 60 * 24; // 24시간
const persistMaxAge = 1000 * 60 * 60 * 24; // 24시간

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime,
      gcTime,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: persistMaxAge,
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
