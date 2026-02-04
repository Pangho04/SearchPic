import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/common/store';
import { getResult } from '../api/result/result.client';
import { searchResultKeys } from './keys';

interface UseSearchResultQueryOptions {
  /** false면 조회를 수행하지 않음 (조회 이력 없이 /result 진입 시 사용) */
  enabled?: boolean;
}

function useSearchResultQuery(options: UseSearchResultQueryOptions = {}) {
  const { enabled = true } = options;
  const setSearchResult = useStore((s) => s.setSearchResult);

  const query = useQuery({
    queryKey: [...searchResultKeys.current],
    queryFn: () => getResult('0'),
    enabled,
  });

  /**
   * @when Result Qeury 요청 시
   * @expcet indexedDB 복원값 혹은 API 응답값을 Zustand에 동기화합니다.
   * @clear -
   */
  useEffect(() => {
    if (query.data !== undefined) {
      setSearchResult(query.data);
    }
  }, [query.data, setSearchResult]);

  return query;
}

export default useSearchResultQuery;
