import React from "react";
import Button from "./Button";
import ProductList from "./ProductList";

export default function BestSellingProducts() {
  return (
    <section className="container mx-auto px-4 space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2.5">
          <h2 className="font-bold text-4xl font-open">Highly Recommended</h2>
          <h3 className="text-gray-800 font-300 text-6 leading-[1.7] tracking-[.4px] font-sans">
            Electronics products continue to drive innovation and shape the
            <br /> way we live, work, and interact with our environment.
          </h3>
        </div>

        <Button
          varient="non-fill"
          className="border-black! text-black! hover:text-white! hover:bg-black! px-10"
        >
          View All
        </Button>
      </div>

      <ProductList />
    </section>
  );
}
