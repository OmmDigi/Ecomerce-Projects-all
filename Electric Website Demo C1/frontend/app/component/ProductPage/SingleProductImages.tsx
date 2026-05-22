"use client";

import { useCurrentVarient } from "@/app/zustand/useCurrentVarient";
import { ProductImageGallery } from "./ProductImageGallery";
import { IProduct } from "@/app/types";

interface IProps {
  product: IProduct;
}

export default function SingleProductImages({ product }: IProps) {
  const { varientState } = useCurrentVarient();

  return (
    <div className="lg:sticky md:sticky top-20 self-start">
      <ProductImageGallery
        images={
          varientState && varientState.images.length != 0
            ? varientState.images.map((item) => ({
                image: item.image,
                alt: item.alt_tag ,
              }))
            : product.images.map((item) => ({
                image: item.image,
                alt: item.alt_tag ?? "",
              }))
        }
      />
    </div>
  );
}
