import { create } from "zustand";
import { IVarient } from "../types";

export type CheckoutItem = {
  item_id: string;
  product_id: number | null;
  varient_info: IVarient | null;
  image: string;
  selectedQuantity: number;
  totalAmount: number;
  productName: string;
  itemPrice: number;
};

export type ICheckOut = {
  items: CheckoutItem[];
  insertCheckoutItem: (item: CheckoutItem[]) => void;
  clear: () => void;
};

export const useCheckout = create<ICheckOut>((set) => {
  return {
    items: [],
    insertCheckoutItem: (item) =>
      set(() => ({
        items: item,
      })),
    clear: () => set(() => ({ items: [] })),
  };
});
