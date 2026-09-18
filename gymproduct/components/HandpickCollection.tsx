import Link from "next/link";

export default function HandpickCollection() {
  return (
    <section className="w-full mt-16">
      {/* First Banner */}
      <div className="flex flex-col md:flex-row items-stretch bg-black w-full">
        {/* Text Container */}
        <div className="flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center items-center md:items-end text-center md:text-right order-2 md:order-1">
          <h6 className="text-[#a6a6a6] text-sm font-bold tracking-widest uppercase mb-4">
            Handpick Collection
          </h6>
          <h3 className="text-[#e5e5e5] text-4xl md:text-5xl font-extrabold uppercase mb-6 tracking-wider">
            Gym Machine
          </h3>
          <p className="text-[#979797] text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            Lorem ipsum proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, nasce auci elit consequat ipsutissem niuis sed odio sit amet nibh vulputate cursus a sit pretium amet. Etiam rhoncus. Maecenas tempus, tellus eget condimentum varius gravida quam libero, sit amet adipiscing.
          </p>
          <div>
            <Link 
              href="/collections/all" 
              className="inline-block border-2 border-[#f04923] text-[#f04923] font-bold py-3 px-10 uppercase tracking-widest hover:bg-[#f04923] hover:text-white transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
        {/* Image Container */}
        <div className="flex-1 order-1 md:order-2">
          <Link href="/collections/all" className="block w-full h-full overflow-hidden group">
            <img 
              src="https://gymtek-store-demo.myshopify.com/cdn/shop/files/banner-v9-1.jpg?v=1614293410" 
              alt="Gym Machine" 
              className="w-full h-full object-cover min-h-[300px] md:min-h-full transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        </div>
      </div>

      {/* Second Banner */}
      <div className="flex flex-col md:flex-row items-stretch bg-black w-full">
        {/* Image Container */}
        <div className="flex-1 order-1 md:order-1">
          <Link href="/collections/all" className="block w-full h-full overflow-hidden group">
            <img 
              src="https://gymtek-store-demo.myshopify.com/cdn/shop/files/banner-v9-2.jpg?v=1614293410" 
              alt="Exercise Machine" 
              className="w-full h-full object-cover min-h-[300px] md:min-h-full transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        </div>
        {/* Text Container */}
        <div className="flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-2">
          <h6 className="text-[#979797] text-sm font-bold tracking-widest uppercase mb-4">
            Handpick Collection
          </h6>
          <h3 className="text-[#e5e5e5] text-4xl md:text-5xl font-extrabold uppercase mb-6 tracking-wider">
            Exercise Machine
          </h3>
          <p className="text-[#979797] text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            Lorem ipsum proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, nasce auci elit consequat ipsutissem niuis sed odio sit amet nibh vulputate cursus a sit pretium amet. Etiam rhoncus. Maecenas tempus, tellus eget condimentum varius gravida quam libero, sit amet adipiscing.
          </p>
          <div>
            <Link 
              href="/collections/all" 
              className="inline-block border-2 border-[#f04923] text-[#f04923] font-bold py-3 px-10 uppercase tracking-widest hover:bg-[#f04923] hover:text-white transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
