

import ProductsPage from "@/components/ProductsPage";
import React from "react";

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
