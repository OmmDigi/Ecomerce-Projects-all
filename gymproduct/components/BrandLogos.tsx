"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const brands = [
  "https://gymtek-store-demo.myshopify.com/cdn/shop/files/brandlogo1.png?v=1614293413",
  "https://gymtek-store-demo.myshopify.com/cdn/shop/files/brandlogo2.png?v=1614293413",
  "https://gymtek-store-demo.myshopify.com/cdn/shop/files/brandlogo3.png?v=1614293413",
  "https://gymtek-store-demo.myshopify.com/cdn/shop/files/brandlogo4.png?v=1614293413",
  "https://gymtek-store-demo.myshopify.com/cdn/shop/files/brandlogo5.png?v=1614293413",
  "https://gymtek-store-demo.myshopify.com/cdn/shop/files/brandlogo6.png?v=1614293413",
];

export default function BrandLogos() {
  return (
    <section className="w-full py-12 md:py-16 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          speed={3000} // Smooth continuous effect
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
          // The CSS needed for smooth continuous marquee-like scroll:
          // .swiper-wrapper { transition-timing-function: linear !important; }
          className="brand-swiper !ease-linear"
          style={{ transitionTimingFunction: 'linear' } as any}
        >
          {/* Double the array for smoother looping if there are few items */}
          {[...brands, ...brands].map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center px-4 py-6 cursor-pointer">
                <Link href="/collections/all">
                  <img
                    src={logo}
                    alt={`Brand ${index + 1}`}
                    className="max-w-full h-auto opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .brand-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}
