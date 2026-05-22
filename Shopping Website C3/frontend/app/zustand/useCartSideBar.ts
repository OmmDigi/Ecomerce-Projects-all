import { create } from "zustand";
import { IVarient } from "../types";

export type CartItemType = {
  product_id: number;
  product_name: string;
  category: string;
  image: string;
  varient: IVarient | null;
  price: string;
  quantity: number;
};

type CartSideTypes = {
  isVisiable: boolean;
  setVisibility: (visiable: boolean) => void;

  cartItems: CartItemType[];
  addCartItem: (item: CartItemType) => void;
  removeCartItem: (product_id: number, varient_id: number | null) => void;
  isExist: (product_id: number, varient_id: number | null) => boolean;
  getItemQty: (product_id: number, varient_id: number | null) => number;
  updateQuantity: (
    product_id: number,
    varient_id: number | null,
    quantity: number
  ) => void;
};

export const useCartSideBar = create<CartSideTypes>((set, get) => ({
  isVisiable: false,
  setVisibility: (visiable) => set(() => ({ isVisiable: visiable })),
  cartItems:
    typeof window != "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
  addCartItem: (cartItem: CartItemType) =>
    set((state) => {
      const exists = state.cartItems.find((item) => {
        if (cartItem.varient != null) {
          return item.varient?.id == cartItem.varient.id;
        } else {
          return item.product_id == cartItem.product_id;
        }
      });

      const newArray = [...state.cartItems];

      if (!exists) {
        // new item just add it
        newArray.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(newArray));
      return {
        ...state,
        cartItems: newArray,
      };
    }),

  removeCartItem: (product_id: number, varient_id: number | null) =>
    set((state) => {
      const filterItemToSet = state.cartItems.filter((item) => {
        if (varient_id != null) {
          return varient_id != item.varient?.id;
        } else {
          return product_id != item.product_id;
        }
      });

      localStorage.setItem("cart", JSON.stringify(filterItemToSet));

      return {
        ...state,
        cartItems: filterItemToSet,
      };
    }),

  isExist: (product_id: number, varient_id: number | null) =>
    get().cartItems.some(
      (item) =>
        item.product_id == product_id && item.varient?.id == varient_id
    ),

  // 🔢 GET ITEM QUANTITY
  getItemQty: (product_id, varient_id) => {
    const item = get().cartItems.find(
      (i) => i.product_id == product_id && i.varient?.id == varient_id
    );
    return item ? item.quantity : 1;
  },
  // 🔄 UPDATE QUANTITY
  updateQuantity: (product_id, varient_id, quantity) =>
    set((state) => {
      const newCart = state.cartItems.map((item) =>
        item.product_id == product_id && item.varient?.id == varient_id
          ? { ...item, quantity }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cartItems: newCart };
    }),
}));


