"use client";

import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";

interface Collection {
  id: string;
  name: string;
  href: string;
  image: string;
}

interface ShopByCollectionsProps {
  title?: string;
  product?: Collection[];
}

const defaultCollections: Collection[] = [
  {
    id: "1",
    name: "Mother's Day Sale",
    href: "/product/mothers-day-sale",
    image:
      "https://varanchi.com/cdn/shop/files/Mothers_day_sale.jpg?v=1777458863&width=940",
  },
  {
    id: "2",
    name: "Wedding Collection",
    href: "/product/wedding-collection",
    image:
      "https://varanchi.com/cdn/shop/files/Wedding_Collection.jpg?v=1771406164&width=940",
  },
  {
    id: "3",
    name: "Festive Collection",
    href: "/product/festive-collection",
    image:
      "https://varanchi.com/cdn/shop/files/Festive_Collection_-_Diwali.jpg?v=1727667739&width=940",
  },
  {
    id: "4",
    name: "Summer Collection",
    href: "/product/summer-collection",
    image:
      "https://varanchi.com/cdn/shop/files/Summer_collection_2026.jpg?v=1771576337&width=940",
  },
];

export default function ShopByCollections({
  title = "Shop by product",
  product = defaultCollections,
}: ShopByCollectionsProps) {
  const {
    data: categories,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useSWR("api/v1/products/category", getFetcher);

  return (
    <section className="w-full bg-white py-6 md:py-6 lg:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
            {title}
          </h2>
        </div>

        {/* product Grid: 2 cols mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {product.map((collection, index) => {
            const apiCategory = categories?.data?.[index];
            const targetHref: any = `/product?category=${apiCategory?.slug}`


            return (
              <Link
                key={collection.id}
                href={targetHref}
                className="group/col block relative overflow-hidden rounded-lg"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.12}s both`,
                }}
              >
                {/* Image with 4:5 aspect ratio matching original --aspect-ratio: 0.8 */}
                <div
                  className="relative w-full overflow-hidden rounded-lg"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/col:scale-105"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
