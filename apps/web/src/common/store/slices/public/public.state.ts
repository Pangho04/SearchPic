import type { ResultResponseDto } from '@/common/services/api/result/result.type';

export interface PublicState {
  searchResult: ResultResponseDto | null;
  setSearchResult: (data: ResultResponseDto | null) => void;
  resetResult: () => void;
}

export const initialState = {
  searchResult: null as ResultResponseDto | null,
};
