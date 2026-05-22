"use client";

import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, Loader, Search } from "lucide-react";
import { getFetcher } from "../lib/clientApi";
import { IProduct, IServerRes } from "../types";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useMobileSearchBar } from "../zustand/useMobileSearchBar";

interface IProps {
  className?: string;
}

export default function SearchBar({ className }: IProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { setVisibility } = useMobileSearchBar()

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
    <section className="w-full relative">
      <div
        className={`flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 w-64 ${className}`}
      >
        <Search className="w-4 h-4 text-gray-400" />
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search our store"
          className="flex-1 text-sm outline-none bg-transparent"
        />
      </div>

      {products.length != 0 && debouncedQuery != "" ? (
        <ul className="w-full mt-1.5 absolute bg-white z-50 text-sm font-open rounded-b-xl overflow-hidden">
          {isPending ? (
            <span className="flex items-center justify-center py-2.5">
              <Loader className="animate-spin" size={18} />
            </span>
          ) : (
            products.map((product) => (
              <li key={product.id}>
                <Link
                  onClick={() => {
                    setVisibility(false);
                    setQuery("");
                  }}
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-between gap-1.5 w-full p-3 cursor-pointer border-b border-b-gray-300"
                >
                  <span>{product.name}</span>
                  <ArrowUpRight size={18} />
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </section>
  );
}
