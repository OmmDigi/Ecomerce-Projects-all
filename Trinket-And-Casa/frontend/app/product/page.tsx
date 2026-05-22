import ProductPage from "@/pages/ProductPage";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProductPage />
    </Suspense>
  );
}

export default page;
