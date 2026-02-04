import { create } from 'zustand';
import type { PublicState } from './slices/public/public.state';
import { createPublicSlice } from './slices/public/public.slice';

export type StoreState = PublicState;

export const useStore = create<StoreState>()((...a) => ({
  ...createPublicSlice(...a),
}));
