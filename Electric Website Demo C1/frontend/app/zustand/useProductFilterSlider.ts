import { create } from "zustand";

type ProductFilterTyeps = {
  isVisiable: boolean;
  setVisibility: (visiable: boolean) => void;
};

export const useProductFilterSlider = create<ProductFilterTyeps>((set) => ({
  isVisiable: false,
  setVisibility: (visiable) => set(() => ({ isVisiable: visiable })),
}));
