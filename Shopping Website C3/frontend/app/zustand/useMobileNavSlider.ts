import { create } from "zustand";

type MobileNavSliderType = {
  isVisiable: boolean;
  setVisibility: (visiable: boolean) => void;
};

export const useMobileNavSlider = create<MobileNavSliderType>((set) => ({
  isVisiable: false,
  setVisibility: (visiable) => set(() => ({ isVisiable: visiable })),
}));
