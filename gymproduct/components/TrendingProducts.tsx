import Link from "next/link";

const products = [
  {
    id: 1,
    title: "Commercial Ellipticals & Cross-Trainers",
    price: "$610.00",
    image:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro31.jpg?v=1586858198",
    hoverImage:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro35.jpg?v=1586858198",
    slug: "commercial-ellipticals-cross-trainers",
  },
  {
    id: 2,
    title: "Pro Boardshorts",
    price: "$29.00",
    image:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro60.jpg?v=1586317302",
    hoverImage:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro61.jpg?v=1586317302",
    slug: "pro-boardshorts",
  },
  {
    id: 3,
    title: "Vesey Leggings V2",
    price: "$302.00",
    oldPrice: "$500.00",
    sale: "-40%",
    image:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro48.jpg?v=1586317317",
    hoverImage:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro50.jpg?v=1586317317",
    slug: "vesey-leggings-v2",
    soldOut: true,
  },
  {
    id: 4,
    title: "Sneaker",
    price: "$432.00",
    image:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/sp1.jpg?v=1586338120",
    hoverImage:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/sp3.jpg?v=1586338121",
    slug: "commercial-indoor-cycling-bike",
  },
  {
    id: 5,
    title: "LifeFitness Multi-Adjustable Bench",
    price: "$265.00",
    image:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro4.jpg?v=1586317349",
    hoverImage:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro30.jpg?v=1586317349",
    slug: "lifefitness-multi-adjustable-bench",
  },
  {
    id: 6,
    title: "Dual adjustable pulley",
    price: "$570.00",
    image:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro27.jpg?v=1586317333",
    hoverImage:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro38.jpg?v=1586317333",
    slug: "dual-adjustable-pulley",
  },
  {
    id: 7,
    title: "Enamel Coated Cast Iron Kettlebell",
    price: "$120.00",
    image:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/2.jpg?v=1586854907",
    hoverImage:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/1.jpg?v=1586854907",
    slug: "enamel-coated-cast-iron-kettlebell",
  },
  {
    id: 8,
    title: "Essential Tee",
    price: "$35.00",
    image:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro63.jpg?v=1586317298",
    hoverImage:
      "https://gymtek-store-demo.myshopify.com/cdn/shop/products/pro65.jpg?v=1586317298",
    slug: "essential-tee",
  },
];

// SVG Icons
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default function TrendingProducts() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-extrabold uppercase tracking-widest text-gray-900 relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[3px] after:bg-[#f04923]">
          Trending
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-white">
            <div className="relative aspect-[7/7] overflow-hidden mb-4 rounded-sm bg-gray-100">
              <Link
                href={`/products/${product.slug}`}
                className="block w-full h-full"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                />
                <img
                  src={product.hoverImage}
                  alt={product.title}
                  className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                />
              </Link>

              {/* Labels */}
              {product.sale && (
                <div className="absolute top-3 right-3 bg-[#e62263] text-white text-[10px] md:text-xs font-bold px-2 py-1 uppercase rounded-sm z-10 shadow-sm">
                  {product.sale}
                </div>
              )}

              {/* Sold Out Label */}
              {product.soldOut && !product.sale && (
                <div className="absolute top-3 right-3 bg-black text-white text-[10px] md:text-xs font-bold px-2 py-1 uppercase rounded-sm z-10 shadow-sm">
                  Sold Out
                </div>
              )}

              {/* Actions (Hover) */}
              <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-10">
                <button className="w-9 h-9 md:w-10 md:h-10 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:bg-[#f04923] hover:text-white transition-colors duration-300">
                  <HeartIcon />
                </button>
                <button className="w-9 h-9 md:w-10 md:h-10 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:bg-[#f04923] hover:text-white transition-colors duration-300 delay-75">
                  <EyeIcon />
                </button>
              </div>

              {/* Add to Cart button at bottom */}
              <div className="absolute bottom-0 left-0 w-full p-0 md:p-3 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10 hidden md:block">
                <button className="w-full bg-black text-white font-bold py-3 uppercase text-xs tracking-wider hover:bg-[#f04923] transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg">
                  <ShoppingBagIcon />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="text-center px-1">
              <h4 className="text-xs md:text-sm font-semibold text-gray-800 hover:text-[#f04923] transition-colors duration-300 mb-1.5 uppercase truncate tracking-wide">
                <Link href={`/products/${product.slug}`}>{product.title}</Link>
              </h4>
              <div className="flex justify-center items-center gap-2 text-sm md:text-base">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
                <span className="text-[#f04923] font-bold">
                  {product.price}
                </span>
              </div>
            </div>

            {/* Mobile quick add button */}
            <button className="md:hidden mt-3 w-full border border-gray-200 text-gray-800 font-bold py-2 uppercase text-[10px] tracking-wider hover:border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
              <ShoppingBagIcon />
              Add
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
