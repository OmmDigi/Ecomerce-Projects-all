// "use client";
// import React, { JSX, useState } from "react";
// import {
//   ChevronDown,
//   Grid3x3,
//   List,
//   Heart,
//   BarChart3,
//   Eye,
// } from "lucide-react";
// import Link from "next/link";
// import ProductCard from "../Component/trending/ProductCard";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   altImage: string;
//   description: string;
//   colors?: string[];
//   isPack?: boolean;
// }

// interface FilterState {
//   category: string[];
//   priceRange: [number, number];
//   manufacturer: string[];
//   size: string[];
//   color: string[];
//   dimension: string[];
// }

// const products = [
//   {
//     id: 1,
//     name: "Teapot",
//     price: "$23.90",
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
//     hoverImage:
//       "https://apollotran.b-cdn.net/demo/at_auros/29-home_default/brown-bear-printed-sweater.jpg",
//     colors: ["#ffffff", "#434A54"],
//   },
//   {
//     id: 2,
//     name: "Miro Dining Table",
//     price: "$35.90",
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/35-home_default/the-best-is-yet-to-come-framed-poster.jpg",
//     hoverImage:
//       "https://apollotran.b-cdn.net/demo/at_auros/36-home_default/the-adventure-begins-framed-poster.jpg",
//   },
//   {
//     id: 3,
//     name: "Janus Table Lamp",
//     price: "$29.00",
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
//     hoverImage:
//       "https://apollotran.b-cdn.net/demo/at_auros/36-home_default/the-adventure-begins-framed-poster.jpg",
//   },
//   {
//     id: 4,
//     name: "Discus Floor And Table",
//     price: "$29.00",
//     image:
//       "https://apollotran.b-cdn.net/demo/at_auros/38-home_default/today-is-a-good-day-framed-poster.jpg",
//     hoverImage:
//       "https://apollotran.b-cdn.net/demo/at_auros/43-home_default/mug-the-best-is-yet-to-come.jpg",
//   },
// ];

// const manufacturers = [
//   { id: 1, name: "Studio Design", count: 2 },
//   { id: 2, name: "Graphic Corner", count: 2 },
//   { id: 3, name: "Brand 1", count: 0 },
//   { id: 4, name: "Brand 2", count: 0 },
//   { id: 5, name: "Brand 3", count: 0 },
// ];

// export default function Product() {
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [sortBy, setSortBy] = useState("relevance");
//   const [filters, setFilters] = useState<FilterState>({
//     category: [],
//     priceRange: [21, 36],
//     manufacturer: [],
//     size: [],
//     color: [],
//     dimension: [],
//   });
//   const [expandedFilters, setExpandedFilters] = useState({
//     categories: true,
//     price: true,
//     manufacturers: true,
//     size: true,
//     color: true,
//     dimension: true,
//   });

//   const handleFilterChange = (
//     filterType: keyof FilterState,
//     value: string | [number, number]
//   ) => {
//     setFilters((prev) => ({ ...prev, [filterType]: value }));
//   };

//   const toggleFilterSection = (section: string) => {
//     setExpandedFilters((prev) => ({
//       ...prev,
//       [section]: !prev[section as keyof typeof prev],
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4">
//           <nav className="flex gap-2 text-sm text-gray-600">
//             <Link href="/" className="hover:text-gray-900">
//               Home
//             </Link>
//             <span>/</span>
//             <span className="text-gray-900 font-medium">Stools</span>
//           </nav>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar Filters */}
//           <div className="hidden lg:block">
//             <div className="bg-white rounded-lg p-6 sticky top-8">
//               <h3 className="font-bold text-lg mb-6">Filter by</h3>

//               {/* Categories */}
//               <div className="mb-6 pb-6 border-b">
//                 <button
//                   onClick={() => toggleFilterSection("categories")}
//                   className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 mb-4"
//                 >
//                   Categories
//                   <ChevronDown
//                     size={18}
//                     className={`transform transition ${
//                       expandedFilters.categories ? "" : "-rotate-90"
//                     }`}
//                   />
//                 </button>
//                 {expandedFilters.categories && (
//                   <div className="space-y-2">
//                     {["Men", "Women"].map((cat) => (
//                       <label
//                         key={cat}
//                         className="flex items-center gap-2 cursor-pointer"
//                       >
//                         <input type="checkbox" className="w-4 h-4 rounded" />
//                         <span className="text-sm text-gray-700">{cat}</span>
//                         <span className="text-xs text-gray-400 ml-auto">1</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Price Range */}
//               <div className="mb-6 pb-6 border-b">
//                 <button
//                   onClick={() => toggleFilterSection("price")}
//                   className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 mb-4"
//                 >
//                   Price
//                   <ChevronDown
//                     size={18}
//                     className={`transform transition ${
//                       expandedFilters.price ? "" : "-rotate-90"
//                     }`}
//                   />
//                 </button>
//                 {expandedFilters.price && (
//                   <div className="space-y-4">
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         value={filters.priceRange[0]}
//                         onChange={(e) =>
//                           handleFilterChange("priceRange", [
//                             parseInt(e.target.value),
//                             filters.priceRange[1],
//                           ])
//                         }
//                         className="w-20 px-2 py-1 border rounded text-sm"
//                       />
//                       <span className="text-gray-400">-</span>
//                       <input
//                         type="number"
//                         value={filters.priceRange[1]}
//                         onChange={(e) =>
//                           handleFilterChange("priceRange", [
//                             filters.priceRange[0],
//                             parseInt(e.target.value),
//                           ])
//                         }
//                         className="w-20 px-2 py-1 border rounded text-sm"
//                       />
//                     </div>
//                     <div className="flex items-center justify-between text-sm text-gray-600">
//                       <span>${filters.priceRange[0]}</span>
//                       <span>${filters.priceRange[1]}</span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Manufacturers */}
//               <div className="mb-6 pb-6 border-b">
//                 <button
//                   onClick={() => toggleFilterSection("manufacturers")}
//                   className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 mb-4"
//                 >
//                   Manufacturers
//                   <ChevronDown
//                     size={18}
//                     className={`transform transition ${
//                       expandedFilters.manufacturers ? "" : "-rotate-90"
//                     }`}
//                   />
//                 </button>
//                 {expandedFilters.manufacturers && (
//                   <div className="space-y-2">
//                     {manufacturers.map((mfg) => (
//                       <label
//                         key={mfg.id}
//                         className="flex items-center gap-2 cursor-pointer"
//                       >
//                         <input
//                           type="checkbox"
//                           className="w-4 h-4 rounded"
//                           disabled={mfg.count === 0}
//                         />
//                         <span
//                           className={`text-sm ${
//                             mfg.count === 0 ? "text-gray-300" : "text-gray-700"
//                           }`}
//                         >
//                           {mfg.name}
//                         </span>
//                         <span className="text-xs text-gray-400 ml-auto">
//                           {mfg.count}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Size */}
//               <div className="mb-6 pb-6 border-b">
//                 <button
//                   onClick={() => toggleFilterSection("size")}
//                   className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 mb-4"
//                 >
//                   Size
//                   <ChevronDown
//                     size={18}
//                     className={`transform transition ${
//                       expandedFilters.size ? "" : "-rotate-90"
//                     }`}
//                   />
//                 </button>
//                 {expandedFilters.size && (
//                   <div className="space-y-2">
//                     {["S", "M", "L", "XL"].map((size) => (
//                       <label
//                         key={size}
//                         className="flex items-center gap-2 cursor-pointer"
//                       >
//                         <input type="checkbox" className="w-4 h-4 rounded" />
//                         <span className="text-sm text-gray-700">{size}</span>
//                         <span className="text-xs text-gray-400 ml-auto">1</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Color */}
//               <div className="mb-6 pb-6 border-b">
//                 <button
//                   onClick={() => toggleFilterSection("color")}
//                   className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 mb-4"
//                 >
//                   Color
//                   <ChevronDown
//                     size={18}
//                     className={`transform transition ${
//                       expandedFilters.color ? "" : "-rotate-90"
//                     }`}
//                   />
//                 </button>
//                 {expandedFilters.color && (
//                   <div className="space-y-2">
//                     {[
//                       { name: "White", hex: "#ffffff" },
//                       { name: "Black", hex: "#434A54" },
//                     ].map((color) => (
//                       <label
//                         key={color.name}
//                         className="flex items-center gap-2 cursor-pointer"
//                       >
//                         <input type="checkbox" className="w-4 h-4 rounded" />
//                         <div
//                           className="w-5 h-5 rounded border border-gray-300"
//                           style={{ backgroundColor: color.hex }}
//                           title={color.name}
//                         />
//                         <span className="text-sm text-gray-700">
//                           {color.name}
//                         </span>
//                         <span className="text-xs text-gray-400 ml-auto">1</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Dimension */}
//               <div>
//                 <button
//                   onClick={() => toggleFilterSection("dimension")}
//                   className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 mb-4"
//                 >
//                   Dimension
//                   <ChevronDown
//                     size={18}
//                     className={`transform transition ${
//                       expandedFilters.dimension ? "" : "-rotate-90"
//                     }`}
//                   />
//                 </button>
//                 {expandedFilters.dimension && (
//                   <div className="space-y-2">
//                     {["40x60cm", "60x90cm", "80x120cm"].map((dim) => (
//                       <label
//                         key={dim}
//                         className="flex items-center gap-2 cursor-pointer"
//                       >
//                         <input type="checkbox" className="w-4 h-4 rounded" />
//                         <span className="text-sm text-gray-700">{dim}</span>
//                         <span className="text-xs text-gray-400 ml-auto">2</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Category Header */}
//             <div className="bg-white rounded-lg p-6 mb-6">
//               <h1 className="text-3xl font-bold mb-4">Stools</h1>
//               <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                 Discover our favorites fashionable discoveries, a selection of
//                 cool items to integrate in your wardrobe. Compose a unique style
//                 with personality which matches your own.
//               </p>
//               <img
//                 src="https://apollotran.b-cdn.net/demo/at_auros/c/3-category_default/stools.jpg"
//                 alt="Stools"
//                 className="w-full h-48 object-cover rounded"
//               />
//             </div>

//             {/* Products Header */}
//             <div className="bg-white rounded-lg p-6 mb-6">
//               <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                 <p className="text-gray-600 text-sm">
//                   There are <span className="font-semibold">4 products</span>.
//                 </p>

//                 <div className="flex items-center gap-4">
//                   <span className="text-sm text-gray-600 hidden md:inline">
//                     Sort by:
//                   </span>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="relevance">Relevance</option>
//                     <option value="new">New products first</option>
//                     <option value="name-asc">Name, A to Z</option>
//                     <option value="name-desc">Name, Z to A</option>
//                     <option value="price-asc">Price, low to high</option>
//                     <option value="price-desc">Price, high to low</option>
//                     <option value="stock">In stock</option>
//                     <option value="random">Random</option>
//                   </select>
//                 </div>

//                 <div className="flex gap-2 hidden md:flex">
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`p-2 rounded ${
//                       viewMode === "grid"
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                     title="Grid view"
//                   >
//                     <Grid3x3 size={20} />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`p-2 rounded ${
//                       viewMode === "list"
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                     title="List view"
//                   >
//                     <List size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             <div
//               className={`grid gap-6 ${
//                 viewMode === "grid"
//                   ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//                   : "grid-cols-1"
//               }`}
//             >
//               {products.map((item) => (
//                 <ProductCard
//                   key={item.id}
//                   image={item.image}
//                   hoverImage={item.hoverImage}
//                   colors={item.colors}
//                   name={item.name}
//                   price={item.price}
//                 />
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="mt-8 text-center text-gray-600 text-sm">
//               Showing 1-4 of 4 item(s)
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import ProductsPage from "../Component/productPage";

export default function ProductsPageComponent() {
  // paging + filter + sort states

  return (
    <>
      <React.Suspense>
        <ProductsPage />
      </React.Suspense>
    </>
  );
}
