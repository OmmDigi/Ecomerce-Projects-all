"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useWishlistStore } from "@/store/useWishlistStore";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 - ₹500", min: 300, max: 500 },
  { label: "₹500 - ₹700", min: 500, max: 700 },
  { label: "Above ₹700", min: 700, max: Infinity },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function page() {
  const { wishlist, toggleWishlist } = useWishlistStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const categoryFromURL = searchParams?.get("category");

  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceValue, setPriceValue] = useState<number>(10000);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || "all"
  );
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const {
    data: categories,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useSWR("api/v1/products/category", getFetcher);

  // const apiURL = selectedSubCategory
  //   ? `/api/v1/products?category=${selectedCategory}&sub_category=${selectedSubCategory}`
  //   : selectedCategory && selectedCategory !== "all"
  //   ? `/api/v1/products?category=${selectedCategory}`
  //   : `/api/v1/products?limit=-1`;

  const {
    data: products,
    isLoading: loadngProducts,
    error: errorProduct,
  } = useSWR(
    `api/v1/products?limit=-1&${searchParams?.toString()}`,
    getFetcher
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    // CATEGORY PARAM
    if (selectedCategory && selectedCategory !== "all") {
      params.delete("tag");
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    // SUBCATEGORY PARAM
    if (selectedSubCategory) {
      params.delete("tag");
      params.set("sub_category", selectedSubCategory);
    } else {
      params.delete("sub_category");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const catFromURL = params.get("category");
    const subFromURL = params.get("subCategory");

    if (catFromURL) setSelectedCategory(catFromURL);
    if (subFromURL) setSelectedSubCategory(subFromURL);

    if (!catFromURL && !subFromURL) {
      setSelectedCategory("all");
      setSelectedSubCategory(null);
    }
  }, []);

  const minPrice = 0;
  const { addToCart, cart, removeFromCart } = useCartStore();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const handlePriceFilter = (value: any) => {
  //   console.log("Filter applied for price up to:", value);
  // };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filteredProducts = products?.data
    ?.filter((product: any) => {
      const categoryMatch =
        selectedCategory === "all" ||
        product.category_slug === selectedCategory;

      // const subCategoryMatch =
      //   !selectedSubCategory ||
      //   product.sub_category_slug === selectedSubCategory;

      const priceRangeMatch =
        product.price >= priceRanges[selectedPriceRange].min &&
        product.price <= priceRanges[selectedPriceRange].max;

      const priceValueMatch = product.price <= priceValue;

      const searchMatch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return (
        categoryMatch &&
        // subCategoryMatch &&
        priceRangeMatch &&
        priceValueMatch &&
        searchMatch
      );
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const selectedCatObj = categories?.data?.find(
    (c: any) => c.slug === selectedCategory
  );
  const categoryName = selectedCatObj?.name || "All Products";

  const hasSubCategories =
    selectedCatObj?.sub_categories && selectedCatObj.sub_categories.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 bg-[#d9667a] text-white px-6 py-3 rounded-lg hover:bg-[#b94b5e] transition"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3   rounded-lg text-white bg-[#d9667a] focus:ring-2 focus:ring-[#f7889b]  transition-all duration-500 ease-in-out hover:text-white"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className=" text-white hover:bg-[#d9667a]  transition-all duration-300"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`md:w-54 lg:w-64 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-white rounded-lg shadow-md p-2 sticky top-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedPriceRange(0);
                    setSearchQuery("");
                    setSortBy("featured");
                    setPriceValue(10000);
                    router.replace(pathname as any, { scroll: false });
                  }}
                  className="w-auto px-2 mt-2 bg-[#d9667a] text-white py-2 rounded-lg hover:bg-[#b94b5e] transition"
                >
                  Clear Filters
                </button>
                {showFilters && (
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* price filter  */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">
                  Price Range
                </h4>

                <div className="flex flex-col space-y-4">
                  {/* Slider Range */}
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 text-sm">₹{minPrice}</span>

                    <input
                      type="range"
                      min={0}
                      max={10000}
                      step={100}
                      value={priceValue}
                      onChange={(e) => setPriceValue(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#f7889b] transition-all duration-300 hover:accent-[#c4465b]"
                    />

                    <span className="text-gray-600 text-sm">₹{priceValue}</span>
                  </div>

                  {/* Filter Button */}
                  {/* <button
                    onClick={() => handlePriceFilter(priceValue)}
                    className="w-full bg-[#d9667a] hover:bg-[#b94b5e] text-white py-2 rounded-lg font-medium transition-all duration-300  "
                  >
                    Filter
                  </button> */}
                </div>
              </div>
              <hr className="border-t-2 border-[#f7889b] my-4" />

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  <button
                    // key={category?.slug}
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedSubCategory(null);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === "all"
                        ? "bg-[#d9667a] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {categories?.data?.map((category: any) => (
                    <div key={category.slug}>
                      {/* CATEGORY BUTTON */}
                      <button
                        onClick={() => {
                          const isSame = openCategory === category.slug;
                          setOpenCategory(isSame ? null : category.slug);
                          setSelectedCategory(category.slug);
                          setSelectedSubCategory(null);
                          scrollToTop();
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                          selectedCategory === category.slug
                            ? "bg-[#d9667a] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category?.name}
                      </button>

                      {/* SUB-CATEGORY DROPDOWN */}
                      {openCategory === category.slug && (
                        <div className="ml-4 mt-2 space-y-2">
                          {category.sub_categories?.length > 0 &&
                            category.sub_categories.map((sub: any) => (
                              <button
                                key={sub.slug}
                                onClick={() => {
                                  setSelectedSubCategory(sub.slug);
                                  scrollToTop();
                                }}
                                className={`w-full text-left px-3 py-2 rounded-md transition 
                        ${
                          selectedSubCategory === sub.slug
                            ? "bg-[#d9667a] text-white"
                            : "bg-gray-50 hover:bg-gray-200 text-gray-800"
                        }`}
                              >
                                {sub.name}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 md:mt-[-60]">
            {/* Sub Categories Round List */}
            {!hasSubCategories && (
              <div className="w-full h-16 md:w-full md:h-30 flex justify-center items-center text-4xl text-center">
                <p>{categoryName}</p>
              </div>
            )}
            {/* {categoryName} */}
            {selectedCategory !== "all" &&
              categories?.data?.find((c: any) => c.slug === selectedCategory)
                ?.sub_categories?.length > 0 && (
                <div className="flex justify-center gap-4 md:gap-10 overflow-x-auto py-2  bg-pink-50 ">
                  {categories.data
                    .find((c: any) => c.slug === selectedCategory)
                    .sub_categories.map((sub: any) => (
                      <button
                        key={sub.slug}
                        onClick={() => {
                          setSelectedSubCategory(sub.slug);
                          scrollToTop();
                        }}
                        className="flex flex-col items-center min-w-[80px]"
                      >
                        <div
                          className={`w-16 h-16 md:w-25 md:h-25 rounded-full overflow-hidden border-2 flex items-center justify-center transition shadow-2xl
                            ${
                              selectedSubCategory === sub.slug
                                ? "border-[#d9667a]"
                                : "border-gray-300"
                            }`}
                        >
                          <img
                            src={sub.image || "/placeholder.png"}
                            alt={sub.name}
                            className="w-full h-full object-cover shadow-2xl"
                          />
                        </div>
                        <p
                          className={`mt-2 text-xs text-center font-medium ${
                            selectedSubCategory === sub.slug
                              ? "text-[#d9667a]"
                              : "text-gray-700"
                          }`}
                        >
                          {sub.name}
                        </p>
                      </button>
                    ))}
                </div>
              )}

            <div className="mb-4 text-gray-600">
              Showing {filteredProducts?.length} of {products?.data?.length}{" "}
              products
            </div>

            {filteredProducts?.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-500">No products found</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts?.map((product: any) => (
                  <div
                    key={product.id}
                    className=" bg-white  cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative">
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-[#d9667a] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
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
                      <Link href={`/product/${product.slug}`}>
                        <img
                          src={product.images[0]?.image}
                          alt={product.name}
                          title={product.name}
                          className="w-full  h-40 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                    <div className="p-4">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600">
                            {parseFloat(product?.rating ?? "0.0").toFixed(1)} (
                            {product?.total_ratings})
                          </span>
                        </div>
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
                      </Link>
                      <button
                        key={product.id}
                        // onClick={() => handleAdd(product)}
                        className={`w-full cursor-pointer py-2  rounded-lg flex items-center justify-center gap-2 transition
                                  ${
                                    cart.some((item) => item.id === product.id)
                                      ? "bg-gray-400 text-white hover:bg-gray-500"
                                      : "bg-[#d9667a] text-white hover:bg-[#b94b5e]"
                                  }`}
                      >
                        <Link
                          href={`product/${product.slug}`}
                          className="w-full"
                        >
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
          </main>
        </div>
      </div>
    </div>
  );
}
