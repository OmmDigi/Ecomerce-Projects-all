import {
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductItem from "../components/ProductItem";
import CategoryFilter from "../components/CategoryFilter";
import FilterBySlider from "../components/ZustandComponents/FilterBySlider";
import OpenProductFilterBtn from "../components/zustandbtns/OpenProductFilterBtn";
import { serverApi } from "../lib/serverApi";
import { IProduct, IServerRes } from "../types";
import PaginitionButton from "../components/PaginitionButton";

interface IProps {
  searchParams: Promise<{
    category?: string;
    "sub-category"?: string;
    page?: string;
  }>;
}

export default async function page({ searchParams }: IProps) {
  const queryParams = await searchParams;

  const urlSearchParams = new URLSearchParams(queryParams);
  urlSearchParams.set("limit", "9");

  if (queryParams["sub-category"]) {
    urlSearchParams.set("sub_category", queryParams["sub-category"]);
  }

  let products = [];

  try {
    if (urlSearchParams.get("category") == "all") {
      urlSearchParams.delete("category");
    }
    const response = (
      await serverApi.get<IServerRes<IProduct[]>>(
        `/api/v1/products?${urlSearchParams.toString()}`
      )
    ).data;
    products = response.data;
  } catch (error) {
    console.log(error);
    return (
      <p className="text-center font-semibold">
        Unable to process your request
      </p>
    );
  }

  return (
    <>
      <FilterBySlider
        categoryComponent={
          <React.Suspense>
            <CategoryFilter searchParams={queryParams} />
          </React.Suspense>
        }
      />
      <main className="relative">
        <div className="absolute top-0 min-h-120 z-0">
          <div className="relative">
            <Image
              src={"/images/bg-breadcrumb_1920x.jpg"}
              alt=""
              width={1920}
              height={1920}
              className="w-full min-h-120 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 *:font-spartan flex flex-col items-center justify-center"></div>
          </div>
        </div>

        <section className="w-full relative z-10">
          <div className="min-h-72 *:font-spartan flex items-center justify-center flex-col gap-y-2">
            <h2 className="text-4xl font-bold text-white uppercase tracking-wider">
              Products
            </h2>

            <div className="flex items-center gap-3.5 *:font-light">
              <Link href={"/"} className="text-gray-100">
                Home
              </Link>
              <span className="text-gray-100">|</span>
              <Link href={"/products"} className="text-gray-100">
                Products
              </Link>
            </div>
          </div>

          {/* Product listing section */}

          <div className="bg-white container mx-0 md:mx-6 lg:mx-6 px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Category Listing */}
            <div className="col-span-1 sticky top-24 self-start hidden md:block lg:block">
              <h2 className="text-2xl font-bold mb-4 uppercase font-spartan tracking-wider">
                Filter By
              </h2>

              <React.Suspense>
                <CategoryFilter searchParams={queryParams} />
              </React.Suspense>
            </div>

            {/* Product Listing */}
            <div className="col-span-2">
              <OpenProductFilterBtn className="md:hidden lg:hidden flex items-center gap-2.5 mb-5">
                <SlidersHorizontal size={20} />
                <span className="font-semibold text-gray-800 font-spartan text-lg">
                  Filter
                </span>
              </OpenProductFilterBtn>
              <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductItem product={product} />
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-center gap-4 *:font-spartan *:text-sm">
                {/* <button className="flex items-center justify-center gap-1.5">
                  <ChevronLeft size={15} />
                  <span className="block mt-1 font-semibold">Previous</span>
                </button>
                <button className="flex items-center justify-center gap-1.5">
                  <span className="block mt-1 font-semibold">Next</span>
                  <ChevronLeft className="rotate-180" size={15} />
                </button> */}
                <PaginitionButton totalItems={products.length} maxLimit={9} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
