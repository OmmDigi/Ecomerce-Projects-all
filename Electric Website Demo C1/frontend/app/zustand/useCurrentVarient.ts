import { create } from "zustand";
import { IVarient } from "../types";

type CurrentVarient = {
  varientState: IVarient | null;
  productState: { id: number; quantity: number } | null;
  setVarient: (varient: IVarient | null) => void;
  setProduct: (product: { id: number; quantity: number } | null) => void;
};

export const useCurrentVarient = create<CurrentVarient>((set) => ({
  varientState: null,
  productState: null,
  setVarient(varient) {
    return set(() => ({  varientState: varient, productState : null }));
  },
  setProduct(product) {
    return set(() => ({  productState: product, varientState : null }));
  },
}));
