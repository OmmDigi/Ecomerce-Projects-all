"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  href: string;
  image: string;
  price: number;
  isSoldOut?: boolean;
  description?: string;
}



interface FeaturedCollectionProps {
  title?: string;
  collectionUrl?: string;
  product?: Product[];
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Blush Rose Lehariya Brocade Pure Tissue Kora Silk Saree",
    href: "/product/blush-rose-lehariya-brocade-pure-tissue-kora-silk-saree",
    image:
      "https://varanchi.com/cdn/shop/files/VaranchiKoratissuecoralC900SilkSaree1_3544a3f8-39da-40f4-896b-e2f9def9d444.jpg?v=1777530546&width=600",
    price: 8100,
    isSoldOut: true,
  },
  {
    id: "2",
    name: "Light Purple Lehariya Brocade Pure Tissue Kora Silk Saree",
    href: "/product/light-purple-lehariya-brocade-pure-tissue-kora-silk-saree",
    image:
      "https://varanchi.com/cdn/shop/files/VaranchiKoratissuepurpleC902SilkSaree1.jpg?v=1777531200&width=600",
    price: 8100,
    isSoldOut: true,
  },
  {
    id: "3",
    name: "Sky Blue Lehariya Brocade Pure Tissue Kora Silk Saree",
    href: "/product/sky-blue-lehariya-brocade-pure-tissue-kora-silk-saree",
    image:
      "https://varanchi.com/cdn/shop/files/VaranchiKoratissueturquoiseblueC901SilkSaree1.jpg?v=1777531515&width=600",
    price: 8100,
    isSoldOut: true,
  },
  {
    id: "4",
    name: "Deep Mustard Yellow Jamdani Pure Tussar Silk Handloom Saree",
    href: "/product/deep-mustard-yellow-jamdani-pure-tussar-silk-handloom-saree",
    image:
      "https://varanchi.com/cdn/shop/files/VaranchiTussarMustardYellowD808SilkSaree1.jpg?v=1777541033&width=600",
    price: 15900,
    isSoldOut: true,
  },
  {
    id: "5",
    name: "Magenta Stripes Pure Kanchipuram Silk Cotton Handloom Saree",
    href: "/product/magenta-stripes-pure-kanchipuram-silk-cotton-handloom-saree",
    image:
      "https://varanchi.com/cdn/shop/files/VaranchiKorapurplewithsmallbutteE194SilkSaree1.jpg?v=1777541591&width=600",
    price: 8500,
    isSoldOut: false,
  },
  {
    id: "6",
    name: "Sunset Orange Stripes Pure Kanchipuram Silk Cotton Handloom Saree",
    href: "/product/sunset-orange-stripes-pure-kanchipuram-silk-cotton-handloom-saree",
    image:
      "https://varanchi.com/cdn/shop/files/VaranchiKanchiSICORustOrangeE044SilkSaree1.jpg?v=1777541841&width=600",
    price: 8500,
    isSoldOut: false,
  },
];

/* ─────────────────────────────────────────────
   Product Card — hover effects only on the
   individual card being hovered
   ───────────────────────────────────────────── */
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={product.href} className="group/card block relative">
      <div className="relative w-full h-72 md:h-72  aspect-square overflow-hidden rounded-lg transition-all duration-300 group-hover/card:shadow-2xl group-hover/card:-translate-y-2 ">

        <div
          className="relative overflow-hidden rounded-lg bg-[#ececea] 
                aspect-[4/4]"
        >
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
            />
          </div>
        </div>

        {product.isSoldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-gray-900">
                Sold Out
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-lg" />
      </div>

      <div
        className="p-4  transition-all duration-300 group-hover/card:bg-gray-50 -mx-0 
       bg-[#f2ead8]"
      >
        <h3 className="text-sm md:text-sm text-center font-semibold text-gray-900 line-clamp-2 group-hover/card:text-amber-700 transition-colors duration-300">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center text-center justify-center ">
          <div className="text-sm font-bold  text-gray-900 group-hover/card:text-amber-700 transition-colors duration-300 ">
            ₹ {product.price.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ─────────────────────────────────────────────
   Desktop Infinite Carousel
   – Shows 4 columns, slides 1 item at a time.
   – Clones VISIBLE_COUNT items at each end so
     the loop is seamless.
   – After every CSS transition ends we check
     if we're on a clone boundary and instantly
     jump to the real set (no transition).
   ───────────────────────────────────────────── */
const VISIBLE_COUNT = 4; // columns shown at once
const SLIDE_COUNT = 1; // items to advance per click
const GAP_PX = 24; // gap-6

const DesktopCarousel: React.FC<{ product: Product[] }> = ({ product }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(VISIBLE_COUNT); // start after leading clones
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const totalReal = product.length;

  // Clone: [last VISIBLE_COUNT items] + [all items] + [first VISIBLE_COUNT items]
  const clonedProducts = [
    ...product.slice(-VISIBLE_COUNT),
    ...product,
    ...product.slice(0, VISIBLE_COUNT),
  ];

  // Measure item width from container
  const measureItemWidth = useCallback(() => {
    if (!trackRef.current) return;
    const container = trackRef.current.parentElement;
    if (!container) return;
    const containerWidth = container.clientWidth;
    // 4 items + 3 gaps
    const w = (containerWidth - GAP_PX * (VISIBLE_COUNT - 1)) / VISIBLE_COUNT;
    setItemWidth(w);
  }, []);

  useEffect(() => {
    measureItemWidth();
    window.addEventListener("resize", measureItemWidth);
    return () => window.removeEventListener("resize", measureItemWidth);
  }, [measureItemWidth]);

  // Compute translateX
  const getTranslateX = useCallback(
    (idx: number) => {
      if (itemWidth === 0) return 0;
      return -(idx * (itemWidth + GAP_PX));
    },
    [itemWidth],
  );

  // After transition ends, snap to the real range if on a clone
  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false);

    setCurrentIndex((prev) => {
      if (prev >= VISIBLE_COUNT + totalReal) {
        // Went past the trailing clones → jump to equivalent real position
        setTransitionEnabled(false);
        return prev - totalReal;
      }
      if (prev < VISIBLE_COUNT) {
        // Went before the leading clones → jump to equivalent real position
        setTransitionEnabled(false);
        return prev + totalReal;
      }
      return prev;
    });
  }, [totalReal]);

  // Re-enable transition on next frame after a snap
  useEffect(() => {
    if (!transitionEnabled) {
      // Force reflow then re-enable
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  }, [transitionEnabled]);

  const slide = (direction: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTransitionEnabled(true);
    setCurrentIndex((prev) =>
      direction === "right" ? prev + SLIDE_COUNT : prev - SLIDE_COUNT,
    );
  };

  // Mouse drag for horizontal scroll feel
  const dragState = useRef({ isDragging: false, startX: 0, startTranslate: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (isAnimating) return;
    isDragging.current = true;
    dragState.current.isDragging = true;
    dragState.current.startX = e.clientX;
    dragState.current.startTranslate = getTranslateX(currentIndex);
    setTransitionEnabled(false);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging) return;
    const diff = e.clientX - dragState.current.startX;
    setDragOffset(diff);
  };

  const onPointerUp = () => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    isDragging.current = false;
    const threshold = itemWidth * 0.25;

    if (Math.abs(dragOffset) > threshold) {
      // Snap to next/prev page
      setTransitionEnabled(true);
      if (dragOffset < 0) {
        slide("right");
      } else {
        slide("left");
      }
    } else {
      setTransitionEnabled(true);
    }
    setDragOffset(0);
  };

  const translateX = getTranslateX(currentIndex) + dragOffset;

  return (
    <div className="relative">
      {/* Track container – overflow hidden */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex select-none"
          style={{
            gap: `${GAP_PX}px`,
            transform: `translateX(${translateX}px)`,
            transition:
              transitionEnabled && !dragState.current.isDragging
                ? "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "none",
            cursor: dragState.current.isDragging ? "grabbing" : "grab",
          }}
          onTransitionEnd={handleTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {clonedProducts.map((product, index) => (
            <div
              key={`${product.id}-clone-${index}`}
              className="flex-shrink-0"
              style={{ width: itemWidth > 0 ? `${itemWidth}px` : "25%" }}
              onDragStart={(e) => e.preventDefault()}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => slide("left")}
        disabled={isAnimating}
        className="absolute -left-14 top-36 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 text-gray-900 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group/btn"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-5 h-5 group-hover/btn:-translate-x-0.5 transition-transform duration-300" />
      </button>

      <button
        onClick={() => slide("right")}
        disabled={isAnimating}
        className="absolute -right-14 top-36 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 text-gray-900 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group/btn"
        aria-label="Next product"
      >
        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Mobile Horizontal Scroll
   ───────────────────────────────────────────── */
const MobileScroll: React.FC<{ product: Product[] }> = ({ product }) => {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {product.map((product) => (
        <div
          key={product.id}
          className="flex-shrink-0  snap-start w-52 md:w-full"
        >
          <ProductCard product={product} />
        </div>
      ))}

      {/* Inline style to hide WebKit scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Section
   ───────────────────────────────────────────── */
export default function FeaturedCollectionSection2({
  title = "All Silk Sarees",
  collectionUrl = "/product/all-collection",
  product = defaultProducts,
}: FeaturedCollectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    data: categories,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useSWR("api/v1/products/category", getFetcher);

  const firstCategorySlug = categories?.data?.[1]?.slug;

  const {
    data: productsData,
    isLoading: loadingProducts,
  } = useSWR(
    firstCategorySlug ? `api/v1/products?limit=10&category=${firstCategorySlug}` : null,
    getFetcher
  );

  const fetchedProducts = productsData?.data?.map((p: any) => ({
    id: p._id,
    name: p.name,
    href: `/product/${p.slug}`,
    image: p.images?.[0]?.image || "",
    price: p.price,
    isSoldOut: p.stock === 0,
  }));

  const productsToShow = fetchedProducts?.length > 0 ? fetchedProducts : product;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    setMounted(true);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-full bg-white py-3 md:py-5 lg:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
                {categories?.data?.[1]?.name || title}
              </h2>
            </div>
          </div>
        </div>

        {/* product */}
        {mounted &&
          (loadingProducts || loadingCategory ? (
            <div className="py-20 text-center text-gray-500">Loading products...</div>
          ) : isMobile ? (
            <MobileScroll product={productsToShow} />
          ) : (
            <DesktopCarousel product={productsToShow} />
          ))}

        {/* View All */}
        <div className="mt-12 flex justify-center">
          <Link
            href={firstCategorySlug ? `/product?category=${firstCategorySlug}` : collectionUrl}
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 group"
          >
            View All {categories?.data?.[0]?.name || "Sarees"}
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
