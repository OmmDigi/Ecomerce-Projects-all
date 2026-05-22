"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Slide {
  id: string;
  title: string;
  highlightText: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  desktopImage: string;
  mobileImage: string;
  position: "left" | "right";
  titleColor: string;
  highlightColor: string;
}

const slides: Slide[] = [
  {
    id: "timeless-silks",
    title: "Timeless",
    highlightText: "Silks",
    description:
      "Meticulously curated silk sarees from the finest weaving regions across India.",
    buttonText: "Shop all sarees",
    buttonLink: "/product",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Hero-Banner-Kanchi.jpg?v=1738316999&width=3840",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/600x_480_New_Mobile_Banner_Kanchi-2.jpg?v=1772774586",
    position: "left",
    titleColor: "#FFFFFF",
    highlightColor: "#E2C47A",
  },
  {
    id: "store-open",
    title: "Store Now",
    highlightText: "Open",
    description: "Experience true craftsmanship in person",
    buttonText: "Locate store",
    buttonLink: "/contact-us",
    desktopImage:
      "https://varanchi.com/cdn/shop/files/Store_interior_-_Desktop-v2.jpg?v=1773034009",
    mobileImage:
      "https://varanchi.com/cdn/shop/files/Store_interior_-_mobile-v2.jpg?v=1773034008",
    position: "right",
    titleColor: "#FFFFFF",
    highlightColor: "#053527",
  },
];

export default function Herosection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play slides every 4 seconds
  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlay(!isAutoPlay);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAutoPlay]);

  // Handle manual navigation
  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAutoPlay();
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    pauseAutoPlay();
  }, []);

  const pauseAutoPlay = () => {
    setIsAutoPlay(false);

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      setIsAutoPlay(true);
    }, 6000);
  };

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const slide = slides[currentSlide];

  return (
    <section
      className="md:relative w-full overflow-hidden"
      style={{ height: "88vh" }}
      role="region"
      aria-label="Hero carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          role="tabpanel"
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image with Ken Burns Effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div
              className={`w-full h-full transition-transform duration-[8000ms] ease-out ${index === currentSlide ? "scale-105" : "scale-100"
                }`}
            >
              <picture>
                <source media="(max-width: 767px)" srcSet={s.mobileImage} />
                <img
                  src={s.desktopImage}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  loading={index === currentSlide ? "eager" : "lazy"}
                />
              </picture>
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-end">
            <div className="w-full">
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20">
                <div
                  className={`flex flex-col ${s.position === "left"
                    ? "items-start text-left"
                    : "items-end text-right"
                    }`}
                >
                  {/* Title */}
                  <div
                    className={`transform transition-all duration-1000 ${index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                      }`}
                  >
                    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                      <span style={{ color: s.titleColor }} className="block">
                        {s.title}
                      </span>
                      <span
                        style={{ color: s.highlightColor }}
                        className="block italic font-serif text-4xl sm:text-5xl lg:text-6xl font-light"
                      >
                        {s.highlightText}
                      </span>
                    </h1>
                  </div>

                  {/* Description */}
                  <div
                    className={`transform transition-all duration-1000 delay-200 ${index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                      }`}
                  >
                    <p className="text-white text-base sm:text-lg lg:text-xl mb-8 max-w-md font-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* Button */}
                  <div
                    className={`transform transition-all duration-1000 delay-300 ${index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                      }`}
                  >
                    <Link
                      href={s.buttonLink}
                      className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold text-sm sm:text-base rounded-md hover:bg-amber-50 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      {s.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-6 sm:px-8 lg:px-12 pointer-events-none">
        <button
          onClick={goToPrevious}
          className="pointer-events-auto p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
          title="Previous (← Arrow Key)"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        <button
          onClick={goToNext}
          className="pointer-events-auto p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
          title="Next (→ Arrow Key)"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Control Bar */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
          {/* Dot Indicators */}
          <div
            className="flex gap-3"
            role="tablist"
            aria-label="Slide indicators"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${index === currentSlide
                  ? "bg-white w-8 h-3"
                  : "bg-white/40 hover:bg-white/60 w-3 h-3"
                  }`}
              />
            ))}
          </div>

          {/* Play/Pause & Counter */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-all duration-300"
              aria-label={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
              title="Toggle autoplay (Space)"
            >
              {isAutoPlay ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>

            <span className="text-white/70 text-xs font-medium tabular-nums">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>

      {/* Skip Link */}
      <a
        href="#main-content"
        className="absolute top-0 left-0 z-50 px-6 py-3 bg-gray-900 text-white font-medium rounded-b-md transform -translate-y-full focus:translate-y-0 transition-transform duration-300"
      >
        Skip to main content
      </a>
    </section>
  );
}
