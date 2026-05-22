"use client";
import { getRequest } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function BestSellersHeader() {
  
  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    data: category,
    error: errorCategory,
  } = useQuery({
    queryKey: ["All-category"],
    queryFn: () => getRequest(`/api/v1/products/category`),
  });

  
  const [activeTab, setActiveTab] = useState((category as any)?.data?.[0]?.name || ""  );

  const {
    isLoading,
    isError,
    data: products,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-products", activeTab],
    queryFn: () => getRequest(`/api/v1/products?category=${activeTab}`),
  });

  function ProductCard({ product }: any) {
    return (
      <div className="group relative">
        <Link href={`/product/${product.slug}`} className="block">
          {/* Product Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
            {product.onSale && (
              <span
                className="absolute top-3 left-3 bg-[#e3694b] text-white text-xs font-semibold
              px-4 py-4 rounded-full z-10"
              >
                Sale!
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                New!
              </span>
            )}
            <img
              src={product?.images?.[0].image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <button
              className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100
               bg-[#e3694b] hover:bg-gray-800 text-white text-sm font-bold rounded px-4 py-2
               transition-all duration-800 group-hover:translate-y-0
               translate-y-3 border-dotted border-2 w-[90%] "
            >
              Select options
            </button>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="text-sm md:text-base font-medium text-[#0a1e33] line-clamp-2 group-hover:text-gray-600 transition-colors">
              {product?.data?.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              {product?.data?.price ? (
                <>
                  <span className="text-gray-400 line-through text-sm">
                    ${product?.data?.price.toFixed(2)}
                  </span>
                  <span className="text-[#0a1e33] font-semibold">
                    ${product?.data?.price.toFixed(2)}
                  </span>
                </>
              ) : product?.data?.compare_at_price ? (
                <>
                  <span className="text-[#0a1e33] font-semibold">
                    ${product?.data?.compare_at_price?.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    - ${product?.data?.compare_at_price?.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-[#0a1e33] font-semibold">
                  {/* ${product.price.toFixed(2)} */}
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        {/* <button className="mt-3 w-full py-2 px-4 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors duration-300">
          Select options
        </button> */}
      </div>
    );
  }

  return (
    <>
      <section className="w-full bg-white py-8 md:py-1">
        <div className="container mx-auto px-4">
          <div className="flex justify-between gap-4 items-center">
            {/* Left Column - Headings */}
            <div className="flex flex-col space-y-2">
              <h6 className="text-xs md:text-sm uppercase tracking-wider text-gray-500 font-medium">
                our faves
              </h6>
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-[#0a1e33]">
                Best sellers
              </h2>
            </div>

            {/* Right Column - Button */}
            <div className="flex justify-end md:justify-end">
              <a
                href="/shop/"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 hover:shadow-lg"
              >
                <span>View all</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-8 md:py-12 mt-[-60] md:mt-[-100] bg-white">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex justify-center border-b border-gray-200 mb-8">
            {(category as any)?.data?.slice(0, 4).map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.slug)}
                className={`px-6 py-3 text-sm md:text-base font-medium transition-colors duration-300 border-b-2 ${
                  activeTab === tab.slug
                    ? "border-gray-900 text-[#0a1e33]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(products as any)?.data
              ?.slice(0, 4)
              .map((product: any, index: number) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
