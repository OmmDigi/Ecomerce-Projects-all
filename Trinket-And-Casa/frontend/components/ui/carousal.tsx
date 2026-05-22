"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";
import Link from "next/link";

export default function CoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: products,
    isLoading: loadngProducts,
    error: errorProduct,
  } = useSWR("/api/v1/products?limit=7", getFetcher);

  console.log("products123", products);

  const slides = [
    {
      title: "Festive Wear",
      buttonText: "Shop now",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    },
    {
      title: "Office Wear",
      buttonText: "Shop now",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop",
    },
    {
      title: "Casual Wear",
      buttonText: "Shop now",
      image:
        "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=600&h=800&fit=crop",
    },
    {
      title: "Evening Glam",
      buttonText: "Shop now",
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    },
    {
      title: "Party Wear",
      buttonText: "Shop Now",
      image:
        "https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=600&h=800&fit=crop",
    },
    {
      title: "Date Night",
      buttonText: "Shop now",
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
    },
    {
      title: "Wedding Wear",
      buttonText: "Shop now",
      image:
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=800&fit=crop",
    },
  ];

  // --- Infinity Loop Functions ---
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  // --- Keyboard Control ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // --- Mouse & Touch Drag Handling ---
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragDelta(x - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    if (dragDelta > 100) handlePrev();
    else if (dragDelta < -100) handleNext();
    setIsDragging(false);
    setDragDelta(0);
  };

  const getSlideTransform = (index: number) => {
    const total = slides.length;
    const diff = (index - activeIndex + total) % total;
    let position = diff > total / 2 ? diff - total : diff;

    const baseX = 280;
    const baseZ = 400;

    if (position === 0)
      return {
        transform: "translate(-50%, -50%) translateX(0) rotateY(0deg) scale(1)",
        zIndex: 10,
        opacity: 1,
      };
    if (position === 1)
      return {
        transform: `translate(-50%, -50%) translateX(${baseX}px) translateZ(-${baseZ}px) rotateY(-25deg) scale(0.85)`,
        zIndex: 5,
        opacity: 0.9,
      };
    if (position === -1)
      return {
        transform: `translate(-50%, -50%) translateX(-${baseX}px) translateZ(-${baseZ}px) rotateY(25deg) scale(0.85)`,
        zIndex: 5,
        opacity: 0.9,
      };

    // For farther slides
    const absPos = Math.abs(position);
    return {
      transform: `translate(-50%, -50%) translateX(${
        position > 0 ? baseX + (absPos - 1) * 100 : -baseX - (absPos - 1) * 100
      }px) translateZ(-${baseZ + (absPos - 1) * 200}px) rotateY(${
        position > 0 ? -25 : 25
      }deg) scale(0.7)`,
      zIndex: 1,
      opacity: 0.4,
    };
  };

  return (
    <div className="w-full min-h-screen bg-white from-slate-900 to-slate-900 mt-0 md:mt-0 flex flex-col items-center justify-center p-2">
      <h2 className="font-questrial text-3xl text-center md:text-4xl text-gray-800  mb-[-50] md:mb-0 tracking-tight">
        FEATURED PRODUCTS
      </h2>
      <div className="w-full max-w-2xl md:max-w-7xl  select-none">
        <div
          ref={containerRef}
          className="relative w-full h-[600px] overflow-hidden"
          style={{ perspective: "8000px" }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {products?.data?.map((slide: any, index: number) => {
            const styles = getSlideTransform(index);
            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 w-[400px] h-[450px] transition-all duration-700 ease-out"
                style={{
                  ...styles,
                  transform: `${styles.transform} translateX(${
                    dragDelta / 10
                  }px)`,
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={slide.images?.[0]?.image}
                    alt={slide?.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute bottom-0 left-10 md:left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-white text-xl w-50 md:w-full font-bold mb-2">
                      {slide?.name}
                    </h3>
                    <Link href={`product/${slide?.slug}`} className="w-full">
                      <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Prev / Next Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-gray-400 backdrop-blur-md hover:gray-600 text-white p-2 md:p-4 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-gray-400 backdrop-blur-md hover:bg-gray-600 text-white p-2 md:p-4 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {/* {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 700);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
