import ProductItem from "../component/ProductItem";
import { SlidersHorizontal } from "lucide-react";
import ProductFilters from "../component/ProductPage/ProductFilters";
import OpenProductFilterBtn from "../component/HelperComponent/OpenProductFilterBtn";
import FilterBySlider from "../component/ProductPage/FilterBySlider";
import React from "react";
import { IProduct, IServerRes } from "../types";
import { serverApi } from "../lib/serverApi";
import PaginitionButton from "../component/ProductPage/PaginitionButton";
import Link from "next/link";

interface IProps {
  searchParams: Promise<{
    category?: string;
    "sub-category"?: string;
    page?: string;
  }>;
}

export default async function ProductPageListing({ searchParams }: IProps) {
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
            <ProductFilters searchParams={queryParams} />
          </React.Suspense>
        }
      />
      <main className="min-h-screen">
        <div className="w-full py-10 bg-gray-100">
          <div className="container mx-auto px-4 space-y-3.5">
            <h3 className="text-3xl font-bold font-open tracking-wide">
              Products List
            </h3>
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm text-[#666]">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/products">Products</Link>
            </div>
          </div>
        </div>

        <div className="md:hidden lg:hidden container mx-auto px-4 mt-7 ">
          <OpenProductFilterBtn className="flex items-center gap-2.5 font-semibold">
            <SlidersHorizontal /> Filter by
          </OpenProductFilterBtn>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-10 container mx-auto px-4 my-7 md:my-12 lg:my-12">
          <div className="col-span-2 w-full h-full">
            {products.length === 0 ? (
              <p className="text-center font-semibold font-open text-2xl">
                No product found
              </p>
            ) : (
              <>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                  {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
                </ul>
                <PaginitionButton totalItems={products.length} maxLimit={9} />
              </>
            )}
          </div>

          <div className="w-full col-span-1 space-y-5 sticky top-20 self-start hidden md:block lg:block">
            <React.Suspense>
              <ProductFilters searchParams={queryParams} />
            </React.Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
