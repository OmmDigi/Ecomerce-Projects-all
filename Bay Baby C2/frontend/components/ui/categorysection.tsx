"use client";
import { getRequest } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const CategorySection = () => {
  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    data: category,
    error: errorCategory,
  } = useQuery({
    queryKey: ["All-category"],
    queryFn: () => getRequest(`/api/v1/products/category`),
  });

  return (
    <>
      <section className="w-full bg-[#ffffff] py-5 md:py-5 lg:py-5">
        <div className="container mx-auto px-4">
          <div className="w-full">
            <div className="text-start md:text-center">
              <h6 className="text-xs md:text-sm tracking-wider text-gray-600 mb-3 uppercase">
                de bebe
              </h6>
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-[#0A1E33]">
                Shop by category
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#ffffff] py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:px-50">
            {Array.isArray((category as any)?.data) &&
              (category as any)?.data?.map((category: any) => (
                <Link
                  href={`/product?category=${category?.slug}`}
                  className="block relative overflow-hidden group rounded-xl"
                  aria-label={`Visit product category ${category?.name}`}
                >
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "125%" }}
                  >
                    <img
                      src={category?.image}
                      alt={category?.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h2 className="text-sm md:text-2xl font-semibold mb-1">
                        {category?.name}
                      </h2>
                      {/* <span className="inline-block bg-white/90 text-[#0a1e33] px-3 py-1 rounded-full text-sm font-medium">
            {category.count} {category.count === 1 ? "item" : "items"}
          </span> */}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategorySection;
