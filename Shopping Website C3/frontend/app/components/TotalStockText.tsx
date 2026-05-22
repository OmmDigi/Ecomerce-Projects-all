"use client";

import { useCurrentVarient } from "../zustand/useCurrentVarient";

export default function TotalStockText() {
  const { varientState, productState } = useCurrentVarient();

  return varientState != null ? (
    <p className="text-sm font-medium text-green-600 mt-1">
      ✓ In Stock ({varientState.quantity} items)
    </p>
  ) : productState !== null ? (
    <p className="text-sm font-medium text-green-600 mt-1">
      ✓ In Stock ({productState.quantity} items)
    </p>
  ) : (
    <p className="text-sm font-medium text-yellow-600 mt-1">
      ⚠️ Please choose product varient
    </p>
  );
}
