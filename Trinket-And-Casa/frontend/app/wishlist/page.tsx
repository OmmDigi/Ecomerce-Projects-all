"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const { addToCart, cart } = useCartStore();
  console.log("wishlist", wishlist);

  return (
    <div className="w-full bg-gradient-to-b from-pink-50 to-white py-16 px-4 md:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-questrial text-3xl text-center md:text-4xl text-gray-800 mb-10 tracking-tight">
          Your Wishlist <span className="animate-pulse">❤️</span>
        </h2>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <Heart className="w-12 h-12 text-gray-400" />
            <p className="text-xl font-questrial text-gray-600">
              Your wishlist is empty.
            </p>
            <Link
              href="/product"
              className="px-6 py-3 bg-[#d9667a] text-white rounded-lg font-semibold cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
            {wishlist.map((product: any) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
              >
                <div className="relative">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition z-10"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>

                  <Link href={`/product/${product.slug}`}>
                    <img
                      src={product?.images?.[0]?.image}
                      alt={product.name}
                      className="w-full h-40 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-[#f7889b]">
                      ₹{product.price}
                    </span>
                    {product.compare_at_price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.compare_at_price}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
