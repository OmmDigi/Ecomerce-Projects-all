import Link from "next/link";

export default function CategoryBanners() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Women's Sports */}
        <div className="relative group overflow-hidden shadow-lg cursor-pointer h-[250px] md:h-[350px]">
          <Link href="/collections/all" className="block w-full h-full">
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
              <img
                src="https://gymtek-store-demo.myshopify.com/cdn/shop/files/banner-v4-1.jpg?v=1614294998"
                alt="Women's sports"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
              <h3 className="text-4xl md:text-5xl font-extrabold text-white uppercase mb-4 tracking-wide drop-shadow-md transform transition-transform duration-500 group-hover:-translate-y-2">
                Women's Sports
              </h3>
              <span className="inline-block text-lg font-bold text-gray-100 uppercase tracking-widest relative w-fit transition-colors duration-300 group-hover:text-[#f04923] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-gray-100 after:transition-colors after:duration-300 group-hover:after:bg-[#f04923]">
                Collection Sale
              </span>
            </div>
          </Link>
        </div>

        {/* Men's Sports */}
        <div className="relative group overflow-hidden shadow-lg cursor-pointer h-[250px] md:h-[350px]">
          <Link href="/collections/all" className="block w-full h-full">
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
              <img
                src="https://gymtek-store-demo.myshopify.com/cdn/shop/files/banner-v4-2.jpg?v=1614294998"
                alt="Men's sports"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
              <h3 className="text-4xl md:text-5xl font-extrabold text-white uppercase mb-4 tracking-wide drop-shadow-md transform transition-transform duration-500 group-hover:-translate-y-2">
                Men's Sports
              </h3>
              <span className="inline-block text-lg font-bold text-gray-100 uppercase tracking-widest relative w-fit transition-colors duration-300 group-hover:text-[#f04923] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-gray-100 after:transition-colors after:duration-300 group-hover:after:bg-[#f04923]">
                Collection New
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
