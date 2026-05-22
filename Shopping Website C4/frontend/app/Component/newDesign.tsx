"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Eye, Scale } from "lucide-react";
import { getRequest } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./trending/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// const products: Product[] = [
//   {
//     id: 1,
//     title: "Teapot",
//     price: 23.9,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
//     category: "All",
//     description:
//       "Regular fit, round neckline, short sleeves. Made of extra long staple pima cotton.",
//   },
//   {
//     id: 2,
//     title: "Miro Dining Table",
//     price: 35.9,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/29-home_default/brown-bear-printed-sweater.jpg",
//     category: "Furnitures",
//     description:
//       "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side.",
//   },
//   {
//     id: 3,
//     title: "Janus Table Lamp",
//     price: 29.0,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/35-home_default/the-best-is-yet-to-come-framed-poster.jpg",
//     category: "Lighting",
//     description: "Printed on rigid matt paper and smooth surface.",
//   },
//   {
//     id: 4,
//     title: "Discus Floor and Table",
//     price: 29.0,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/36-home_default/the-adventure-begins-framed-poster.jpg",
//     category: "Lighting",
//     description: "Printed on rigid matt finish and smooth surface.",
//   },
//   {
//     id: 5,
//     title: "UNA Chair",
//     price: 29.0,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
//     category: "Chairs",
//     description: "Printed on rigid paper with matt finish and smooth surface.",
//   },
//   {
//     id: 6,
//     title: "Studio Chair",
//     price: 11.9,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/36-home_default/the-adventure-begins-framed-poster.jpg",
//     category: "Furnitures",
//     description: "White Ceramic Mug, 325ml.",
//   },
//   {
//     id: 7,
//     title: "Nude",
//     price: 11.9,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/38-home_default/today-is-a-good-day-framed-poster.jpg",
//     category: "Furnitures",
//     description: "White Ceramic Mug. 325ml",
//   },
//   {
//     id: 8,
//     title: "Miro Dining Table",
//     price: 11.9,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/43-home_default/mug-the-best-is-yet-to-come.jpg",
//     category: "Decor",
//     description: "White Ceramic Mug. 325ml",
//   },
//   {
//     id: 9,
//     title: "Studio Chair",
//     price: 18.9,
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/36-home_default/the-adventure-begins-framed-poster.jpg",
//     category: "Chairs",
//     description:
//       "Cushion with removable cover and invisible zip on the back. 32x32cm",
//   },
// ];

// const categories = ["All", "Furnitures", "Chairs", "Lighting", "Decor"];

export default function NewDesign() {
  const [scrollPos, setScrollPos] = useState(0);

  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    data: categories,
    error: errorCategory,
  } = useQuery({
    queryKey: ["All-category"],
    queryFn: () => getRequest(`/api/v1/products/category`),
  });
  const [activeCategory, setActiveCategory] = useState(
    (categories as any)?.data?.[0]?.name || ""
  );

  const {
    isLoading,
    isError,
    data: products,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-products", activeCategory],
    queryFn: () => getRequest(`/api/v1/products?category=${activeCategory}`),
  });

  const filteredProducts = (products as any)?.data;
  console.log("filteredProductsfilteredProducts", products);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("product-scroll");
    if (container) {
      const scrollAmount = 300;
      const newPos =
        direction === "left"
          ? scrollPos - scrollAmount
          : scrollPos + scrollAmount;
      setScrollPos(newPos);
      container.scrollLeft = newPos;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">New Design</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10">
          {/* Left Column - Categories */}
          <div className="relative   overflow-hidden bg-gray-100 h-full  flex items-center justify-center md:sticky md:top-30 md:h-fit ">
            <div className="text-center group relative py-10 ">
              <div className="h-150 overflow-hidden   relative">
                <img
                  alt="apollotran.com"
                  src="https://apollotran.com/demo/at_auros/themes/at_auros/assets/img/modules/appagebuilder/icon/h1-bn-3.jpg"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out scale-110 group-hover:scale-130"
                />
              </div>

              <div className="relative z-10 -mt-[100px]  ">
                <h3
                  className="text-3xl font-semibold text-gray-800 hover:text-[#eb7126]
                  transition-transform duration-300 ease-in-out 
                hover:scale-110 cursor-pointer"
                >
                  Furnitures
                </h3>
                <p className="text-gray-600">4 items</p>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs and Products */}
          <div className="flex flex-col md:mt-[-70]">
            {/* Tabs */}
            <div className=" border-gray-200 mb-6">
              <nav className="flex gap-2 overflow-x-auto" role="tablist">
                {(categories as any)?.data?.map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat?.slug)} // or cat.name
                    className={`px-4 py-1 text-sm font-medium whitespace-nowrap
                      border-b-2 transition-all duration-300 ease-in-out
                      ${
                        activeCategory === cat.slug
                          ? "border-[#fad5be] border-b-6 text-black"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:border-[#fad5be] hover:border-b-6 hover:translate-y-[-2px]"
                      }`}
                    role="tab"
                    aria-selected={activeCategory === cat.slug}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Products Carousel */}
            <div className="relative">
              <div
                id="product-scroll"
                className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
                style={{ scrollBehavior: "smooth" }}
              >
                <div className="grid grid-cols-2 md:grid-cols-2 gap-10">
                  {filteredProducts
                    ?.slice(0, 4)
                    .map((item: any, index: number) => (
                      <div key={index}>
                        <ProductCard
                          product={item}
                          ids={item?.id}
                          image={item?.images?.[0]?.image}
                          hoverImage={item?.images?.[1]?.image}
                          colors={item?.colors}
                          name={item?.name}
                          price={item?.price}
                          slug={item?.slug}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Scroll Buttons */}
              {/* <button
                onClick={() => scroll("left")}
                className="absolute -left-4 top-1/3 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute -right-4 top-1/3 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
