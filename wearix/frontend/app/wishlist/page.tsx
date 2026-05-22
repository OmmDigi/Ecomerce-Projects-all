"use client";
import React, { useState } from "react";
import { X, Heart } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  dateAdded: string;
  inStock: boolean;
  variationId?: number;
  productId?: number;
  sku?: string;
  url: string;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 15993,
      name: "2-piece Set Light Green",
      price: 24.99,
      image:
        "https://debebe.vamtam.com/wp-content/uploads/2022/06/1-2-420x525.webp",
      dateAdded: "December 8, 2025",
      inStock: true,
      variationId: 15993,
      productId: 12425,
      sku: "5123/8672",
      url: "/product/2-piece-set-light-green",
    },
    {
      id: 15993,
      name: "2-piece Set Light Green",
      price: 24.99,
      image:
        "https://debebe.vamtam.com/wp-content/uploads/2022/06/1-2-420x525.webp",
      dateAdded: "December 8, 2025",
      inStock: true,
      variationId: 15993,
      productId: 12425,
      sku: "5123/8672",
      url: "/product/2-piece-set-light-green",
    },
  ]);

  const { wishlist, toggleWishlist } = useWishlistStore();
  console.log("wishlist", wishlist);

  const addToCart = (item: WishlistItem) => {
    console.log("Adding to cart:", item);
    // Add your cart logic here
  };

  const EmptyWishlist = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 146 160"
          width="146"
          className="text-gray-900"
        >
          <path
            d="M118.9 0a4.9 4.9 0 0 1 4.895 4.682l.005.218v110.91a.9.9 0 0 1-1.793.112l-.007-.113V4.9a3.1 3.1 0 0 0-2.924-3.095L118.9 1.8H4.9a3.1 3.1 0 0 0-3.095 2.924L1.8 4.9v136.045C1.8 150.363 9.431 158 18.841 158h.004l.1-.01.44-.063.507-.086c.495-.09 1.033-.203 1.604-.345 2.04-.505 4.078-1.254 5.973-2.288 5.355-2.922 8.531-7.49 8.531-14.165V135.9a2.9 2.9 0 0 1 2.9-2.9h104a2.9 2.9 0 0 1 2.9 2.9v5.143c0 10.36-8.465 18.757-18.9 18.757H18.841C8.55 159.8.184 151.54.003 141.284L0 140.945V4.9A4.9 4.9 0 0 1 4.682.005L4.9 0h114Zm24 134.8h-104a1.1 1.1 0 0 0-1.1 1.1v5.143c0 7.388-3.574 12.529-9.469 15.745-.743.405-1.503.77-2.276 1.094l-.292.118H126.9c9.336 0 16.924-7.422 17.097-16.635l.003-.322V135.9a1.1 1.1 0 0 0-1.1-1.1ZM94.9 93a.9.9 0 0 1 .113 1.793l-.113.007h-65a.9.9 0 0 1-.113-1.793L29.9 93h65Zm0-28a.9.9 0 0 1 .113 1.793l-.113.007h-65a.9.9 0 0 1-.113-1.793L29.9 65h65ZM62.587 27.434a7.661 7.661 0 0 1 7.606-2.167c3.318.897 5.618 3.886 5.607 7.294a7.442 7.442 0 0 1-2.494 5.553L63.041 48.532a.9.9 0 0 1-1.281 0L51.168 37.826a7.49 7.49 0 0 1-1.694-7.89c1.02-2.73 3.536-4.633 6.462-4.893a7.654 7.654 0 0 1 6.415 2.55l.046.054Zm7.136-.43c-2.536-.685-5.221.396-6.55 2.634a.9.9 0 0 1-1.546.002 5.837 5.837 0 0 0-5.532-2.805c-2.237.198-4.158 1.652-4.935 3.731a5.69 5.69 0 0 0 1.289 5.994l9.949 10.059 9.672-9.812a5.688 5.688 0 0 0 1.923-3.98l.007-.27c.008-2.591-1.743-4.868-4.277-5.553ZM93.9 36.5a.9.9 0 0 1 .113 1.793l-.113.007h-14a.9.9 0 0 1-.113-1.793l.113-.007h14Zm-50-1a.9.9 0 0 1 .113 1.793l-.113.007h-14a.9.9 0 0 1-.113-1.793l.113-.007h14Z"
            fill="currentColor"
            fillRule="nonzero"
          />
        </svg>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-600 text-lg mb-4">
          There are no products on the wishlist!
        </p>
        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
          <Heart className="w-4 h-4" />
          Look for the heart to save favorites while you shop.
        </p>
      </div>

      <Link href={"/product"}>
        <button className="px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">
          Start Shopping
        </button>
      </Link>
    </div>
  );

  if (wishlist?.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <EmptyWishlist />
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl text-center mx-auto px-4 py-12">
          <h1 className="text-4xl font-light text-gray-900">Wishlist</h1>
        </div>
      </section>
      <div className="min-h-screen bg-white">
        {/* Wishlist Stats */}
        <div className=" p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-1">
                {wishlist.length}
              </div>
              <div className="text-sm text-gray-600">Items in Wishlist</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-1">
                ₹
                {wishlist
                  .reduce((sum, item) => sum + Number(item.price), 0)
                  .toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 mb-1">
                {wishlist.filter((item) => item.available_quantity).length}
              </div>
              <div className="text-sm text-gray-600">Available Items</div>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        {/* <div className="mt-8 flex flex-wrap gap-4 justify-between items-center px-40">
          <button
            onClick={() => setWishlistItems([])}
            className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            Clear Wishlist
          </button>

          <div className="flex gap-4">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-gray-400 hover:bg-gray-50 transition-colors">
              Share Wishlist
            </button>
          </div>
        </div> */}

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="pb-4 text-left text-sm font-medium text-gray-500 w-12"></th>
                  <th className="pb-4 text-left text-sm font-medium text-gray-500 w-32">
                    Product
                  </th>
                  <th className="pb-4 text-left text-sm font-medium text-gray-500">
                    Details
                  </th>
                  <th className="pb-4 text-left text-sm font-medium text-gray-500 w-48">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* Remove Button */}
                    <td className="py-6 pr-4">
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors group"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                      </button>
                    </td>

                    {/* Product Image */}
                    <td className="py-6 pr-4">
                      <Link href={`/product/${item.slug}`} className="block">
                        <img
                          src={item.images?.[0]?.image}
                          alt={item.name}
                          className="w-24 h-30 object-cover rounded hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    </td>

                    {/* Product Info */}
                    <td className="py-6 pr-4">
                      <div className="space-y-2">
                        <Link
                          href={`/product/${item.slug}`}
                          className="text-base font-medium text-gray-900 hover:text-pink-600 transition-colors block"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-900 text-lg font-medium">
                            ₹{Number(item.price).toFixed(2)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.dateAdded}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-6">
                      <div className="space-y-3">
                        {item.available_quantity ? (
                          <>
                            <div className="text-sm text-green-600 font-medium">
                              In Stock
                            </div>
                            <button
                              onClick={() => addToCart(item as any)}
                              className=" px-6 py-2  bg-[#000000] hover:bg-gray-800 text-white text-sm font-medium rounded  transition-colors  border-dotted border-2 w-[90%] "
                              //                      className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100
                              //    bg-[#000000] hover:bg-gray-800 text-white text-sm font-bold rounded px-4 py-2
                              //    transition-all duration-800 group-hover:translate-y-0
                              //    translate-y-3 border-dotted border-2 w-[90%] "
                            >
                              Add to cart
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="text-sm text-red-600 font-medium">
                              Out of Stock
                            </div>
                            <button
                              disabled
                              className="w-full px-6 py-2 bg-gray-200 text-gray-500 text-sm font-medium rounded cursor-not-allowed"
                            >
                              Add to cart
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
