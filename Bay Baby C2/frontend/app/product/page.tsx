import React from "react";
import ProductsPage from "@/components/ui/product";

export default function ProductsPageComponent() {
  // paging + filter + sort states

  return (
    <>
      <React.Suspense>
        <ProductsPage />
      </React.Suspense>
    </>
  );
}
