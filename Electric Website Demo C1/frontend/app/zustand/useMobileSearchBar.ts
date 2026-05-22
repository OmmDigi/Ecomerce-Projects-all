import { create } from "zustand";

type MobileSearchBar = {
  isVisiable: boolean;
  setVisibility: (visiable: boolean) => void;
};

export const useMobileSearchBar = create<MobileSearchBar>((set) => ({
  isVisiable: false,
  setVisibility: (visiable) => set(() => ({ isVisiable: visiable })),
}));
