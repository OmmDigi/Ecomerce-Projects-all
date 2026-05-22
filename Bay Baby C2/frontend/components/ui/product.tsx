"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Heart } from "lucide-react";
import Link from "next/link";
import { getRequest } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

interface Product {
  id: string | number;
  price: number | string;
  [key: string]: any;
}

interface SortOption {
  label: string;
  value: "" | "low-to-high" | "high-to-low";
}

const ProductsPage = () => {
  // paging + filter + sort states
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState<number>(10000); // slider max filter
  const [minPrice] = useState<number>(0); // you can make this adjustable if you like
  const [sortBy, setSortBy] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [expandedFilters, setExpandedFilters] = useState<{
    [key: string]: boolean;
  }>({ category: true, price: true });

  // selected category/subcategory states (slug or name whichever is present)
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  const { wishlist, toggleWishlist } = useWishlistStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log("searchParams", wishlist);

  // ---------- SORT OPTIONS ----------
  const sortOptions: SortOption[] = [
    { label: "Select", value: "" },
    { label: "Sort by price: low to high", value: "low-to-high" },
    { label: "Sort by price: high to low", value: "high-to-low" },
  ];

  // Categories query (unchanged)
  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    data: category,
    error: errorCategory,
  } = useQuery({
    queryKey: ["All-category"],
    queryFn: () => getRequest(`/api/v1/products/category`),
  });

  const buildProductsUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    if (selectedSubCategory) {
      params.set("sub_category", selectedSubCategory);
    }
    if (!selectedCategory && !selectedSubCategory) {
      params.set("page", String(currentPage));
    }
    const query = params.toString();
    return `/api/v1/products${query ? `?${query}` : ""}`;
  };

  const {
    isLoading,
    isError,
    data: products,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "all-products",
      currentPage,
      selectedCategory,
      selectedSubCategory,
      searchParams.toString(),
    ],
    queryFn: () => getRequest(buildProductsUrl()),
  });

  // Apply client-side price filtering + sorting whenever products (from server) change or filters change
  useEffect(() => {
    const original: Product[] = (products as any)?.data ?? [];
    // apply price filter
    let filtered = original.filter((p) => {
      // handle if price is string
      const priceNum = Number(p.price ?? 0);
      return priceNum >= minPrice && priceNum <= maxPrice;
    });

    // apply sort
    switch (sortBy) {
      case "Sort by price: low to high":
        filtered = filtered
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "Sort by price: high to low":
        filtered = filtered
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        // keep original ordering
        break;
    }
    setSortedProducts(filtered);
  }, [products, maxPrice, sortBy, minPrice]);

  // On mount: read URL search params and set selectedCategory/subCategory accordingly
  useEffect(() => {
    const cat = searchParams?.get("category") ?? "";
    const sub = searchParams?.get("sub_category") ?? "";
    if (cat) setSelectedCategory(cat);
    if (sub) setSelectedSubCategory(sub);
    // If URL contains category/sub_category, we should load that data immediately.
    // Because our query depends on selectedCategory/selectedSubCategory, it will refetch automatically.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading / Error UI
  if (isLoading && isLoadingCategory) {
    return <div className="bg-white">Loading...</div>;
  }

  if (isError && isErrorCategory) {
    return <div className="bg-white">Error: {(error as any)?.message}</div>;
  }

  const toggleFilter = (filterId: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const renderStars = (rating: number) => {
    const percentage = (rating / 5) * 100;
    return (
      <div className="flex items-center text-sm mb-2">
        <div className="relative">
          <div className="flex text-gray-300">{"★".repeat(5)}</div>
          <div
            className="absolute top-0 left-0 overflow-hidden flex text-yellow-400"
            style={{ width: `${percentage}%` }}
          >
            {"★".repeat(5)}
          </div>
        </div>
      </div>
    );
  };

  // Helpers to extract slug or name from category object
  const getOptionKey = (opt: any) => opt?.slug ?? opt?.name ?? opt?.id;

  // When user clicks a category option
  const handleCategorySelect = (option: any) => {
    const key = getOptionKey(option);
    // toggle behavior: if clicking same category, unselect
    const newCategory = selectedCategory === key ? "" : String(key);
    setSelectedCategory(newCategory);
    // reset subcategory if category changed/deselected
    if (selectedCategory !== newCategory) {
      setSelectedSubCategory("");
    }
    // update URL search params
    const params = new URLSearchParams();
    if (newCategory) params.set("category", newCategory);
    router.push(`${window.location.pathname}?${params.toString()}`);
    // set to page 1
    setCurrentPage(1);
  };

  // When user clicks a subcategory option
  const handleSubCategorySelect = (child: any, parentCategory?: any) => {
    const subKey = getOptionKey(child);
    const catKey = parentCategory
      ? getOptionKey(parentCategory)
      : selectedCategory;
    // If the parent category isn't selected, set it too.
    const newCategory = catKey ? String(catKey) : "";
    const newSub = selectedSubCategory === subKey ? "" : String(subKey);

    setSelectedCategory(newCategory);
    setSelectedSubCategory(newSub);

    const params = new URLSearchParams();
    if (newCategory) params.set("category", newCategory);
    if (newSub) params.set("sub_category", newSub);

    router.push(`${window.location.pathname}?${params.toString()}`);
    setCurrentPage(1);
  };

  const FilterSection = ({
    title,
    options,
    filterId,
  }: {
    title: string;
    options: any;
    filterId: string;
  }) => {
    const isExpanded = expandedFilters[filterId];

    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => toggleFilter(filterId)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <ChevronDown
            className={`w-4 h-4 text-gray-800 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {isExpanded && options && (
          <ul className="mt-3 space-y-2">
            {options?.data?.length > 0 &&
              options.data.map((option: any) => {
                const optKey = getOptionKey(option);
                const isCategoryChecked =
                  String(selectedCategory) === String(optKey);

                return (
                  <li key={optKey}>
                    <label
                      className="flex items-center cursor-pointer group"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategorySelect(option);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isCategoryChecked}
                        readOnly
                        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                        {option.name}
                      </span>
                    </label>

                    {option.sub_categories &&
                      option.sub_categories.length > 0 && (
                        <ul className="ml-6 mt-2 space-y-2">
                          {option.sub_categories.map((child: any) => {
                            const childKey = getOptionKey(child);
                            const isSubChecked =
                              String(selectedSubCategory) === String(childKey);

                            return (
                              <li key={childKey}>
                                <label
                                  className="flex items-center cursor-pointer group"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSubCategorySelect(child, option);
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSubChecked}
                                    readOnly
                                    className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                                  />
                                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                                    {child.name}
                                  </span>
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    );
  };

  // Sort apply function (updates sortBy; sorting applied client-side via effect)
  const applySorting = (option: SortOption) => {
    setSortBy(option.label || "Select");
    setShowSortMenu(false);
  };

  // Clear all filters handler
  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());

    setSelectedCategory("");
    setSelectedSubCategory("");
    setMaxPrice(10000); // reset
    setSortBy("");
    setCurrentPage(1);
    // setSortedProducts([]);
    params.delete("sub_category");
    params.delete("category");

    // refetchProducts();
    router.push(window.location.pathname);
    // refetch (will request paginated page)
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-gray-700">
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{selectedCategory}</span>
          {selectedSubCategory && <span className="mx-2">/</span>}
          <span className="text-gray-900">{selectedSubCategory}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            {/* Clear All Button */}
            <button
              onClick={handleClearAll}
              className="w-full mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded transition-colors"
            >
              Clear all
            </button>

            {/* Price Range */}
            <div className="border-b border-gray-200 py-4">
              <button
                onClick={() => toggleFilter("price")}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <h3 className="text-sm font-medium text-gray-900">
                  Price range
                </h3>
                <ChevronDown
                  className={`w-4 h-4 transition-transform text-gray-900 ${
                    expandedFilters["price"] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFilters["price"] && (
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#e3694b] transition-all duration-300 hover:accent-[#e3694b]"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="text-gray-600 text-sm">₹{minPrice}</span>
                    <span className="text-gray-600 text-sm">₹{maxPrice}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <FilterSection
              title="Category"
              options={category}
              filterId="category"
            />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="md:flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing {sortedProducts?.length ?? 0} of{" "}
                {(products as any)?.total ??
                  (products as any)?.data?.length ??
                  0}{" "}
                results
              </p>

              {/* Sort Dropdown */}
              <div className="flex justify-end mb-6">
                <div ref={dropdownRef} className="relative w-56">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex justify-between items-center gap-2 px-4 py-2 border border-gray-300 rounded w-full text-gray-800 z-10"
                  >
                    <span className="text-sm">{sortBy || "Select"}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform text-gray-800 ${
                        showSortMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showSortMenu && (
                    <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded shadow z-10">
                      {sortOptions.map((option: any) => (
                        <div
                          key={option.value}
                          role="button"
                          onClick={() => applySorting(option)}
                          className="px-4 py-2 text-sm hover:bg-gray-100 text-gray-800 cursor-pointer"
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {sortedProducts?.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                  No products found
                </div>
              )}

              {sortedProducts?.map((product: any) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] mb-3 overflow-hidden bg-gray-100">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition z-9"
                    >
                      <Heart
                        className={`w-3 h-3 md:w-5 md:h-5 ${
                          wishlist.some((item) => item.id === product.id)
                            ? "fill-[#e3694b] text-[#e3694b]"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-[#e3694b] text-white text-xs font-medium px-3 py-3 rounded-full z-10">
                        New!
                      </span>
                    )}
                    <Link href={`/product/${product?.slug}`}>
                      <img
                        src={product?.images?.[0]?.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0  group-hover:opacity-100 bg-[#e3694b] hover:bg-gray-800 text-white text-sm font-bold rounded px-4 py-2 transition-all duration-800 group-hover:translate-y-0 translate-y-3 border-dotted border-2 w-[90%]">
                        Select options
                      </button>
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>
                    {product.rating && renderStars(product.rating)}
                    <p className="text-lg font-medium text-gray-900 mb-3">
                      ₹{Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination (only when no category/subcategory filter present) */}
            {!selectedCategory && !selectedSubCategory && (
              <nav className="flex justify-center items-center gap-2">
                <button
                  onClick={() => {
                    scrollToTop();
                    if (currentPage > 1) {
                      setCurrentPage((p) => p - 1);
                    }
                  }}
                  className={`w-10 h-10 flex items-center justify-center border text-gray-800 border-gray-300 
                  hover:border-gray-400 rounded transition-colors 
                  ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  ←
                </button>
                <p className="text-gray-800">{currentPage}</p>
                <button
                  onClick={() => {
                    if ((products as any)?.data?.length === 10) {
                      setCurrentPage((p) => p + 1);
                      scrollToTop();
                    }
                  }}
                  className={`w-10 h-10 flex items-center justify-center border text-gray-800 border-gray-300 
                    hover:border-gray-400 rounded transition-colors
                    ${
                      (products as any)?.data?.length < 10
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                >
                  →
                </button>
              </nav>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
