import { create } from "zustand";

type TSearchBar = {
  isVisiable: boolean;
  setVisibility: (isVisiable: boolean) => void;
};

export const useSearchBar = create<TSearchBar>((set) => ({
  isVisiable: false,
  setVisibility: (isVisiable) => set(() => ({ isVisiable })),
}));
