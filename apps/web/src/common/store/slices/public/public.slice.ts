import type { StateCreator } from 'zustand';
import { initialState } from './public.state';

import type { PublicState } from './public.state';

export const createPublicSlice: StateCreator<PublicState> = (set) => ({
  ...initialState,
  setSearchResult: (data) => set({ searchResult: data }),
  resetResult: () => set({ searchResult: null }),
});
