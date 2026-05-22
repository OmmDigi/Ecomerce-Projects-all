import Link from "next/link";
import { serverApi } from "../lib/serverApi";
import { IProduct, IServerRes } from "../types";
import Button from "./Button";
import ProductItem from "./ProductItem";
import React from "react";

interface IProps {
  heading: React.ReactNode | string;
  subtext: React.ReactNode | string;
  viewMoreLink: string;
  filter?: {
    limit?: string;
  };
}

export const dynamic = "force-dynamic";

export default async function ProductListingPage({
  heading,
  subtext,
  viewMoreLink,
  filter,
}: IProps) {
  // get the best selling products add some other filters
  let products: IProduct[] = [];

  const searchParams = new URLSearchParams(filter)

  try {
    const response = (
      await serverApi.get<IServerRes<IProduct[]>>(
        `/api/v1/products?${searchParams.toString()}`
      )
    ).data;
    products = response.data;
  } catch (error) {
    return <p>Unable to fetch products list</p>;
  }

  return (
    <section className="container mx-auto px-4 space-y-12">
      <div className="flex items-start justify-between flex-col md:flex-row">
        <div className="space-y-2.5">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-4xl font-open">
            {heading}
          </h2>
          <h3 className="text-gray-800 font-300 text-6 leading-[1.7] tracking-[.4px] font-sans">
            {subtext}
          </h3>
        </div>

        <Link href={viewMoreLink}>
          <Button className="border-black! text-black! hover:text-white! hover:bg-black! px-10 mt-5">
            View All
          </Button>
        </Link>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}
