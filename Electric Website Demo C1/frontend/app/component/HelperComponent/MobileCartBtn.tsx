"use client";

import { useCartSideBar } from "@/app/zustand/useCartSideBar";
import { ShoppingCart } from "lucide-react";

export default function MobileCartBtn() {
  const { setVisibility, cartItems} = useCartSideBar();

  return (
    <button
      onClick={() => setVisibility(true)}
      className="relative hover:text-gray-600 transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
        {cartItems.length}
      </span>
    </button>
  );
}
