"use client";

import { getFetcher } from "@/lib/fetcher";
import Link from "next/link";
import useSWR from "swr";

export default function CasaPurposeGrid() {
  const {
    data: categories,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useSWR("api/v1/products/category", getFetcher);

  return (
    <div className="w-full bg-white py-5 px-2">
      <div className="max-w-9xl mx-auto">
        {/* Category Grid */}
        {/* <div data-aos="fade-up"></div> */}
        <div
          data-aos="fade-up"
          className={`grid grid-cols-3 md:grid-cols-5  items-center gap-4 md:gap-20 mx-3 md:mx-10 xl:mx-50 `}
        >
          {categories?.data?.map((category: any, index: number) => (
            <Link
              key={index}
              href={`product?category=${category.slug}`}
              className="group flex flex-col items-center gap-1"
            >
              {/* Image Container with Border */}
              <div className="w-[80%] md:w-full aspect-square relative rounded-[50%] md:rounded-[15%] border-[1.5px] border-gray-300 p-0 overflow-hidden transition-all duration-300 hover:border-gray-400 hover:shadow-lg">
                <div className="w-full h-full rounded-[15%] overflow-hidden bg-white">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Category Name */}
              <p className="text-sm md:text-base font-bold font-questrial  text-gray-900 text-center transition-colors duration-300 group-hover:text-gray-600">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
