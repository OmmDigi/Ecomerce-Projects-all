"use client";

import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import AOSProvider from "../ui/aosprovider";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";
import Link from "next/link";

export default function CasaProducts() {
  const { wishlist, toggleWishlist } = useWishlistStore();

  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectCategory, setSelectCategory] = useState("");
  const {
    data: categories,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useSWR("api/v1/products/category", getFetcher);

  const {
    data: allproducts,
    isLoading: loadngProducts,
    error: errorProduct,
  } = useSWR(
    `api/v1/products?${
      selectCategory ? `category=${selectCategory.toLowerCase()}` : ""
    }&limit=8`,
    getFetcher
  );

  const products = allproducts?.data
    ?.filter((item: any) => activeTab == item?.category_id)
    ?.slice(0, 8);

  const catagorySelect = (category: any) => {
    setActiveTab(category.id);
    setSelectCategory(category.name);
  };

  const { addToCart, cart, removeFromCart } = useCartStore();

  // const handleAdd = (product: any) => {
  //   const isInCart = cart.some((item) => item.id === product.id);
  //   if (isInCart) {
  //     removeFromCart(product.id);
  //   } else {
  //     addToCart(product);
  //   }
  // };

  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <AOSProvider>
      <div className="w-full bg-gradient-to-b from-pink-50 to-white py-8 md:p-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {" "}
          <h2 className="font-questrial text-3xl text-center md:text-4xl text-gray-800 mb-10 tracking-tight">
            TRIANKET AND CASA PRODUCT
          </h2>
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mb-12">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 text-sm font-medium font-questrial tracking-wider transition-all ${
                activeTab === "all"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-200"
              }`}
            >
              ALL
            </button>
            {categories?.data?.map((categorie: any, index: number) => (
              <button
                key={categorie.id}
                onClick={() => catagorySelect(categorie)}
                className={`px-6 py-2 text-sm font-medium font-questrial tracking-wider transition-all ${
                  activeTab === categorie.id
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-200"
                }`}
              >
                {categorie.name}
              </button>
            ))}
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3  md:px-10 md:gap-6">
            {(activeTab === "all" ? allproducts?.data : products)?.map(
              (product: any, index: number) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative">
                    {product.badge && (
                      <span className="absolute top-2 left-2  md:top-3 md:left-3 bg-[#d9667a] text-white text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10">
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition z-10"
                    >
                      <Heart
                        className={`w-3 h-3 md:w-5 md:h-5 ${
                          wishlist.some((item) => item.id === product.id)
                            ? "fill-[#f7889b] text-[#f7889b]"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    <Link href={`product/${product.slug}`}>
                      <img
                        src={product?.images?.[0]?.image}
                        alt={product.name}
                        className="w-full h-40 md:h-64  object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600">
                        {parseFloat(product?.rating ?? "0.0").toFixed(1)} (
                        {product?.total_ratings})
                      </span>
                    </div>
                    <h3 className="font-semibold  text-gray-800  line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className=" text-sm md:text-2xl font-bold text-[#f7889b]">
                        {product.price}
                      </span>
                      {product.compare_at_price && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.compare_at_price}
                        </span>
                      )}
                    </div>

                    <button
                      key={product.id}
                      // onClick={() => handleAdd(product)}
                      className={`w-full cursor-pointer py-2 rounded-lg flex items-center justify-center gap-2 transition
                        ${
                          cart.some((item) => item.id === product.id)
                            ? "bg-gray-400 text-white hover:bg-gray-500"
                            : "bg-[#d9667a] text-white hover:bg-[#b94b5e]"
                        }`}
                    >
                      <Link href={`product/${product.slug}`} className="w-full">
                        {/* <ShoppingCart className="w-4 h-4" /> */}
                        {/* {cart.some((item) => item.id === product.id)
                        ? "Item Added"
                        : "Add to Cart"} */}
                        {"View Product"}
                      </Link>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </AOSProvider>
  );
}
