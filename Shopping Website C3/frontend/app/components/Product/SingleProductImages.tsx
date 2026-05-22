"use client";

import { IProduct } from "@/app/types";
import { useCurrentVarient } from "@/app/zustand/useCurrentVarient";
import { ProductImageGallery } from "../ProductImageGallery";

interface IProps {
  product: IProduct;
  salePercent: string;
}

export default function SingleProductImages({ product, salePercent }: IProps) {
  const { varientState } = useCurrentVarient();

  return (
    <ProductImageGallery
      images={
        varientState !== null && varientState.images.length != 0
          ? varientState.images.map((item) => ({
              alt: item.alt_tag,
              image: item.image,
            }))
          : product.images.map((item) => ({
              image: item.image,
              alt: item.alt_tag,
            }))
      }
      salePercent={salePercent}
    />
  );
}
