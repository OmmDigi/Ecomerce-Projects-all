"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAROUSEL_IMAGES = [
  {
    src: "https://varanchi.com/cdn/shop/files/Kanchi-desktop_ffb8ddaa-ae29-4753-822b-0a5aec10437c.jpg?v=1773035781&width=1600",
    alt: "Portrait 1",
  },
  {
    src: "https://varanchi.com/cdn/shop/files/Hero-Banner-Kanchi.jpg?v=1738316999&width=3840",
    alt: "Portrait 2",
  },
  {
    src: "https://varanchi.com/cdn/shop/files/Kanchi-desktop_ffb8ddaa-ae29-4753-822b-0a5aec10437c.jpg?v=1773035781&width=1600",
    alt: "Portrait 3",
  },
  {
    src: "https://varanchi.com/cdn/shop/files/Rawsilk-banner-new_24f7e313-85c2-4240-b906-453570ccfa36.png?v=1728882147&width=1200",
    alt: "Portrait 4",
  },
  {
    src: "https://varanchi.com/cdn/shop/files/Wedding_collectio_desktop_banner.jpg?v=1771579782&width=1200",
    alt: "Portrait 5",
  },
];

export default function Carousel3DCurved() {
  const [active, setActive] = useState(2);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const itemCount = CAROUSEL_IMAGES.length;

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoplay) return;

    autoplayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % itemCount);
    }, 2000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay, itemCount]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + itemCount) % itemCount);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 2000);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % itemCount);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 2000);
  };

  const getPosition = (index: number) => {
    let pos = index - active;
    if (pos > itemCount / 2) pos -= itemCount;
    if (pos < -itemCount / 2) pos += itemCount;
    return pos;
  };

  return (
    <div className=" hidden md:block w-full min-h-screen bg-white text-black  flex-col items-center justify-center px-4 py-2">
      {/* Header */}
      <div className="mb-2 text-center">
        <p className="text-black text-sm font-light tracking-widest mb-4">
          FEATURED COLLECTION
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-black mb-4">
          Curated Visual Stories
        </h1>
        <p className="text-gray-400 text-base max-w-2xl mx-auto">
          Experience our collection through stunning imagery and perspectives
        </p>
      </div>

      {/* 3D Curved Carousel Container */}
      <div className="relative w-full max-w-9xl h-[340px] mb-2">
        <div
          className="relative w-full h-full"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Carousel Items */}
          {CAROUSEL_IMAGES.map((image, index) => {
            const position = getPosition(index);
            const isActive = position === 0;
            const isAdjacent = Math.abs(position) === 1;
            const isFar = Math.abs(position) === 2;

            let zIndex = 10;
            let scale = 0.6;
            let opacity = 0.4;
            let translateX = 0;
            let translateZ = -200;
            let rotateY = 0;

            if (isActive) {
              zIndex = 30;
              scale = 1;
              opacity = 1;
              translateX = 0;
              translateZ = 0;
              rotateY = 0;
            } else if (position === 1) {
              zIndex = 20;
              scale = 0.8;
              opacity = 0.8;
              translateX = 200;
              translateZ = -100;
              rotateY = -25;
            } else if (position === -1) {
              zIndex = 20;
              scale = 0.8;
              opacity = 0.8;
              translateX = -200;
              translateZ = -100;
              rotateY = 25;
            } else if (position === 2) {
              zIndex = 5;
              scale = 0.7;
              opacity = 0.5;
              translateX = 400;
              translateZ = -200;
              rotateY = -35;
            } else if (position === -2) {
              zIndex = 5;
              scale = 0.7;
              opacity = 0.5;
              translateX = -400;
              translateZ = -200;
              rotateY = 35;
            }

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 h-[300px] w-[580px] rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  zIndex: zIndex,
                  opacity: opacity,
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}

          {/* Spotlight effect */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              transform: "translate(-50%, -50%)",
              width: "900px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
              zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 justify-center">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full border border-gray-600 text-black hover:border-gray-400 hover:bg-white/10 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Indicators */}
        <div className="flex gap-3">
          {CAROUSEL_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActive(index);
                setIsAutoplay(false);
                setTimeout(() => setIsAutoplay(true), 10000);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === active
                  ? "w-8 h-2 bg-gray-400"
                  : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full border border-gray-600 text-black hover:border-gray-400 hover:bg-white/10 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
