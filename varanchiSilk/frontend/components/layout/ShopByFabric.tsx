"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";

interface FabricCard {
  id: string;
  name: string;
  description: string;
  href: string;
  desktopImage: string;
  mobileImage: string;
  badge?: string;
  badgeColor?: string;
  isFeatured?: boolean;
}

const fabrics: FabricCard[] = [
  {
    id: "kanchipuram",
    name: "Kanchipuram Silk",
    description: "A legacy in silk",
    href: "/product/kanchipuram-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Kanchi-desktop_ffb8ddaa-ae29-4753-822b-0a5aec10437c.jpg?v=1773035781&width=1600",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Kanchi-mobile.jpg?v=1773035346&width=600",
    badge: "New collection",
    badgeColor: "#ae8d4a",
    isFeatured: true,
  },
  {
    id: "raw-silk",
    name: "Raw Silk",
    description: "Luxuriously Textured",
    href: "/product/raw-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Raw-desktop_v2_6da49c89-f17e-4e08-b956-783582dfe39b.jpg?v=1773134487&width=1600",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Raw-mobilev2.jpg?v=1773047274&width=600",
    badge: "Popular",
    badgeColor: "#ae8d4a",
    isFeatured: true,
  },
  {
    id: "kora-silk",
    name: "Kora Silk",
    description: "Light, Airy, Delicate",
    href: "/product/kora",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Kora-desktop.jpg?v=1773036086&width=1600",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Kora-mobile.jpg?v=1773036086&width=600",
    badge: "Popular",
    badgeColor: "#ae8d4a",
    isFeatured: true,
  },
  {
    id: "tissue-silk",
    name: "Tissue Silk",
    description: "",
    href: "/product/tissue-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Tissue.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Tissue.png?v=1772790552&width=300",
  },
  {
    id: "tussar-silk",
    name: "Tussar Silk",
    description: "",
    href: "/product/tussar-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Tussar.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Tussar.png?v=1772790552&width=300",
  },
  {
    id: "soft-silk",
    name: "Soft Silk",
    description: "",
    href: "/product/soft-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Soft.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Soft.png?v=1772790552&width=400",
  },
  {
    id: "katan-silk",
    name: "Katan Silk",
    description: "",
    href: "/product/katan-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Katan.png?v=1772790553&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Katan.png?v=1772790553&width=400",
  },
  {
    id: "chanderi-silk",
    name: "Chanderi Silk",
    description: "",
    href: "/product/chanderi-silks",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Chanderi.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Chanderi.png?v=1772790552&width=400",
  },
  {
    id: "chiniya-silk",
    name: "Chiniya Silk",
    description: "",
    href: "/product/chiniya-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Chiniya.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Chiniya.png?v=1772790552&width=400",
  },
  {
    id: "mysore-silk",
    name: "Mysore Silk",
    description: "",
    href: "/product/mysore-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Mysore.png?v=1772790553&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Mysore.png?v=1772790553&width=400",
  },
  {
    id: "crepe-silk",
    name: "Crepe Silk",
    description: "",
    href: "/product/crepe-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Crepe.png?v=1772790553&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Crepe.png?v=1772790553&width=400",
  },
  {
    id: "kanchi-silk-cotton",
    name: "Kanchi Silk Cotton",
    description: "",
    href: "/product/kanchi-silk-cotton",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Kanchi_sico.png?v=1777347855&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Kanchi_sico.png?v=1777347855&width=400",
  },
  {
    id: "silk-cotton",
    name: "Silk Cotton",
    description: "",
    href: "/product/silk-cotton",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Silk_Cotton_c473180b-2572-41d1-ab92-6769cbef1e2f.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Silk_Cotton_c473180b-2572-41d1-ab92-6769cbef1e2f.png?v=1772790552&width=400",
  },
  {
    id: "silk-linen",
    name: "Silk Linen",
    description: "",
    href: "/product/silk-linen",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Silk_Linen.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Silk_Linen.png?v=1772790552&width=400",
  },
  {
    id: "muslin-silk",
    name: "Muslin Silk",
    description: "",
    href: "/product/muslin-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Muslin.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Muslin.png?v=1772790552&width=400",
  },
  {
    id: "poona-silk",
    name: "Poona Silk",
    description: "",
    href: "/product/poona-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Poona.png?v=1772791215&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Poona.png?v=1772791215&width=400",
  },
  {
    id: "dupion-silk",
    name: "Dupion Silk",
    description: "",
    href: "/product/dupion",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Dupion.png?v=1772790553&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Dupion.png?v=1772790553&width=400",
  },
  {
    id: "moonga-silk",
    name: "Moonga Silk",
    description: "",
    href: "/product/moonga-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Moonga.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Moonga.png?v=1772790552&width=400",
  },
  {
    id: "georgette-silk",
    name: "Georgette Silk",
    description: "",
    href: "/product/georgette-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Georgette.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Georgette.png?v=1772790552&width=400",
  },
  {
    id: "chiffon-silk",
    name: "Chiffon Silk",
    description: "",
    href: "/product/chiffon-silk",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Chiffon.png?v=1772790552&width=400",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Chiffon.png?v=1772790552&width=400",
  },
];

interface FabricCardProps {
  fabric: FabricCard;
  className?: string;
  isFeatured?: boolean;
}

const FabricCardComponent: React.FC<FabricCardProps> = ({
  fabric,
  className = "",
  isFeatured = false,
}) => {
  const targetHref = fabric.href.includes("?category=")
    ? fabric.href
    : fabric.href.replace("/product/", "/product?category=");

  return (
    <Link
      href={targetHref}
      className={`group relative overflow-hidden rounded-lg transition-all 
        duration-300 hover:shadow-lg ${className}`}
    >
      {/* Background Image */}
      <picture>
        <source media="(max-width: 768px)" srcSet={fabric.mobileImage} />
        <img
          src={fabric.desktopImage}
          alt={fabric.name}
          className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-500"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 opacity-100 transition-opacity duration-300" />

      {/* Badge */}
      {fabric.badge && (
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium"
          style={{ backgroundColor: fabric.badgeColor }}
        >
          {fabric.badge}
        </div>
      )}

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className=" text-[10px] md:text-lg mb-1">{fabric.name}</h3>
        {fabric.description && (
          <p className="text-sm text-white/80">{fabric.description}</p>
        )}
      </div>
    </Link>
  );
};

// Responsive Carousel Component
interface CarouselProps {
  items: FabricCard[];
}

const FabricCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevClick = () => {
    if (scrollContainerRef.current) {
      const itemWidth =
        scrollContainerRef.current.offsetWidth / (isMobile ? 3 : 6);
      scrollContainerRef.current.scrollBy({
        left: -itemWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNextClick = () => {
    if (scrollContainerRef.current) {
      const itemWidth =
        scrollContainerRef.current.offsetWidth / (isMobile ? 3 : 6);
      scrollContainerRef.current.scrollBy({
        left: itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Carousel Container */}
      <div className="relative">
        {/* Horizontal Scroll Container - Hide Scrollbar */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-4 overflow-x-auto scroll-smooth"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
        >
          {/* Hide scrollbar for Chrome, Safari, Opera */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {items.map((fabric) => (
            <div
              key={fabric.id}
              className="flex-shrink-0"
              style={{
                width: isMobile
                  ? "calc(33.333% - 6px)"
                  : "calc(16.666% - 10px)",
              }}
            >
              <div className="h-36 md:h-48">
                <FabricCardComponent fabric={fabric} className="h-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <>
          <button
            onClick={handlePrevClick}
            className="absolute left-10 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 text-gray-900 flex items-center justify-center"
            aria-label="Previous fabrics"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button
            onClick={handleNextClick}
            className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 text-gray-900 flex items-center justify-center"
            aria-label="Next fabrics"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </>
      </div>

      {/* Scroll Hint */}
      <p className="text-center text-xs md:text-sm text-gray-500">
        {isMobile
          ? "Swipe or tap arrows to browse"
          : "Scroll or click arrows to browse"}
      </p>
    </div>
  );
};

export default function ShopByFabric() {
  const {
    data: categories,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useSWR("api/v1/products/category", getFetcher);

  const apiCards = categories?.data?.map((cat: any) => ({
    id: cat._id || cat.slug,
    name: cat.name,
    description: "",
    href: `/product?category=${cat.slug}`,
    desktopImage: cat.image,
    mobileImage: cat.image,
  })) || [];

  return (
    <section className="py-6 md:py-12 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Shop by Fabric
          </h2>
          <p className="text-gray-600 text-lg">19 Silk Fabrics</p>
        </div>

        {/* Featured Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 md:mb-4">
          {/* Large Featured Card */}
          <div className="md:col-span-2 md:row-span-2 h-128 md:h-92">
            <FabricCardComponent fabric={apiCards[0] || fabrics[0]} className="h-full" />
          </div>

          {/* Small Featured Cards */}
          <div className="h-64 md:h-44 md:col-span-2 ">
            <FabricCardComponent fabric={apiCards[1] || fabrics[1]} className="h-full" />
          </div>
          <div className="h-64 md:h-44 md:col-span-2">
            <FabricCardComponent fabric={apiCards[2] || fabrics[2]} className="h-full" />
          </div>

          {/* Bottom Small Cards */}
          {/* <div className="h-64 md:h-44 md:col-span-2">
            <FabricCardComponent fabric={fabrics[1]} className="h-full" />
          </div> */}
          {/* <div className="h-64 md:h-44">
            <FabricCardComponent fabric={fabrics[2]} className="h-full" />
          </div> */}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-600 font-medium">More Fabrics</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Carousel Section */}
        {loadingCategory ? (
          <div className="py-10 text-center text-gray-500">Loading categories...</div>
        ) : errorCategory ? (
          <div className="py-10 text-center text-red-500">Failed to load categories.</div>
        ) : (
          <FabricCarousel items={apiCards} />
        )}

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/product/all-fabrics"
            className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-md hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            View All Fabrics
          </Link>
        </div>
      </div>
    </section>
  );
}
