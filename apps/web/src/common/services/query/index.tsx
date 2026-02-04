import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useStore } from '@/common/store';
import { asyncStoragePersister } from './persister';
import { searchResultKeys } from './keys';
import type { ResultResponseDto } from '../api/result/result.type';

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

/**
 * 검색 결과가 있으면 Zustand에 동기화합니다.
 */
function syncPersistedSearchResultToStore() {
  const data: ResultResponseDto | undefined = queryClient.getQueryData(searchResultKeys.current);

  if (data) {
    useStore.getState().setSearchResult(data);
  }
}

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
      onSuccess={syncPersistedSearchResultToStore}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
