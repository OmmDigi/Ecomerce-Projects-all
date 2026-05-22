"use client";

import { getFetcher } from "@/app/lib/clientApi";
import { IProduct, IServerRes } from "@/app/types";
import { useSearchBar } from "@/app/zustand/useSearchBar";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function SearchBar() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { isVisiable, setVisibility } = useSearchBar();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Refactor mutationFn to accept the URL and data
  const mutationFn = useCallback(async ({ url }: { url: string }) => {
    const response = await getFetcher(url);
    return response;
  }, []);

  const { mutate, isPending } = useMutation<
    IServerRes<IProduct[]>,
    AxiosError<IServerRes>,
    { url: string }
  >({
    mutationKey: ["search-product"],
    mutationFn: mutationFn,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery == "") return;
    mutate(
      {
        url: `/api/v1/products?limit=6&search=${debouncedQuery}`,
      },
      {
        onSuccess(data) {
          setProducts(data.data);
        },
      }
    );
  }, [debouncedQuery]);

  return (
    <aside
      onClick={() => {
        setVisibility(false);
      }}
      className={`${
        isVisiable ? "visible opacity-100" : "invisible opacity-0"
      } duration-500 fixed z-50 *:font-spartan bg-black/50 inset-0 flex items-center gap-2.5 flex-col`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-w-80 md:max-w-96 lg:max-w-96 w-full ${
          isVisiable ? "translate-y-11" : "-translate-y-full"
        } transition-all duration-300`}
      >
        <div className="bg-white w-full rounded-md mt-10">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Search product..."
            className="outline-none w-full py-3 px-5"
          />
        </div>

        {products.length > 0 && query != "" ? (
          <ul className="bg-white w-full rounded-md mt-2.5 px-5 py-3">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  onClick={() => setVisibility(false)}
                  href={`/products/${product.slug}`}
                  className="flex items-center py-2 gap-1.5 border-b border-b-gray-200"
                >
                  <span className="block line-clamp-1 w-full font-normal">
                    {product.name}
                  </span>
                  <ArrowUpRight size={18} className="text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </aside>
  );
}
