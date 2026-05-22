"use client";

import { useCurrentVarient } from "@/app/zustand/useCurrentVarient";

export default function TotalStockText() {
  const { varientState, productState } = useCurrentVarient();

  return varientState != null ? (
    <div className="mb-6 text-sm font-medium text-[#D4183D]">
      {varientState.quantity == 0 ? (
        "Out of stock!"
      ) : (
        <>Only {varientState.quantity} items in stock!</>
      )}
    </div>
  ) : productState !== null ? (
    <div className="mb-6 text-sm font-medium text-[#D4183D]">
      {productState.quantity == 0 ? (
        "Out of stock!"
      ) : (
        <>Only {productState.quantity} items in stock!</>
      )}
    </div>
  ) : null;
}
