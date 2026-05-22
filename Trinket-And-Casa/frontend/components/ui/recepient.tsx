"use client";
import { getFetcher } from "@/lib/fetcher";
import Link from "next/link";
import useSWR from "swr";

const ShopByRecipient = () => {
  const {
    data: recipient,
    isLoading: loadingRecipient,
    error: errorRecipient,
  } = useSWR("api/v1/products/recipient", getFetcher);

  return recipient?.data?.length > 0 ? (
    <section className="w-full py-2 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-questrial text-3xl text-center md:text-4xl text-gray-800 mb-10 tracking-tight">
          SHOP BY RECIPIENT
        </h2>

        <div
          className={`grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5  gap-4 h-80 md:h-90 `}
        >
          {recipient?.data?.map((item: any, index: number) => (
            <Link
              key={index}
              href={`product?tag=${item.tag_name}`}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.tag_name}
                className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <span className="absolute bottom-3 left-3 text-white font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.tag_name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default ShopByRecipient;
