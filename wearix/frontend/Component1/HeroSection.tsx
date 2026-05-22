"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ScrollingText from "./UI/ScrollingText";

const heroImages = [
  {
    id: 1,
    src: "/hero/hero1.avif",
    label: "Urban",
    opacity: 0.7,
  },
  {
    id: 2,
    src: "/hero/hero2.webp",
    label: "Latest",
    opacity: 0.7,
  },
  {
    id: 3,
    src: "/hero/hero3.avif ",
    label: "Premium",
    opacity: 0.7,
  },
  {
    id: 4,
    src: "/hero/hero4.avif",
    label: "Arctic",
    opacity: 1,
  },
  {
    id: 5,
    src: "/hero/hero5.avif",
    label: "Casual",
    opacity: 0.7,
  },
  {
    id: 6,
    src: "/hero/hero6.avif",
    label: "Iconic",
    opacity: 0.7,
  },
  {
    id: 7,
    src: "/hero/hero7.avif",
    label: "Unique",
    opacity: 0.7,
  },
];

export default function HeroSection() {
  const [activeImageId, setActiveImageId] = useState<any>(4);

  return (
    <header className="relative  w-full h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${
            activeImageId
              ? heroImages.find((img) => img.id === activeImageId)?.src
              : heroImages[0].src
          }`}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Gradient Mask with Blur */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)",
          // backdropFilter: "blur(50px)",
          mask: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 64.1442%)",
          WebkitMask:
            "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 64.1442%)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center px-6 md:px-12 ">
        {/* Tag */}
        <div className="hidden  mb-8 md:flex items-center gap-3 bg-white/15 backdrop-blur-[5px] rounded-full px-4 py-2 border border-white/20">
          <div className="px-4 py-1.5 bg-white rounded-full">
            <p className="text-xs md:text-sm font-medium text-black">Soft</p>
          </div>
          <p className="text-sm md:text-base font-medium text-white/80">
            Warm Winter Layers
          </p>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block">Premium</span>{" "}
            <span className="inline-block">wear</span>{" "}
            <span className="inline-block">for</span>{" "}
            <span className="inline-block">modern</span>{" "}
            <span className="inline-block">living</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            Discover our new range of soft clothes made for your daily look and
            your best days with the finest fabrics.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/"
            className="px-8 py-3 bg-white text-black rounded-full font-medium text-sm md:text-base  "
          >
            <ScrollingText
              text=" See all collections"
              className="text-lg font-bold"
            />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-white/15 backdrop-blur-[5px] text-white rounded-full font-medium text-sm md:text-base hover:bg-white/25 transition-all duration-300 border border-white/20"
          >
            <ScrollingText text=" Contact us" className="text-lg font-bold" />
          </Link>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-4 md:px-6 ">
        <div className="flex gap-3 md:gap-4 overflow-x-auto justify-center p-4 scrollbar-hide">
          {heroImages.map((image) => (
            <button
              key={image.id}
              onClick={() => setActiveImageId(image.id)}
              className={`flex-shrink-0 relative transition-all duration-300 ${
                activeImageId === image.id
                  ? "opacity-100 scale-135"
                  : "opacity-70 scale-95"
              }`}
            >
              <div className="relative w-22 h-20 md:w-20 md:h-20  overflow-hidden border border-white">
                <Image
                  src={image.src}
                  alt={image.label}
                  fill
                  className="object-cover"
                />
                {/* Inner Shadow */}
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow: "inset 10px 10px 20px rgba(255, 255, 255, 0.45)",
                  }}
                ></div>

                {/* Outer Shadow */}
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow: "inset 10px 10px 40px rgba(255, 255, 255, 0.25)",
                  }}
                ></div>

                {/* Bottom Fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 54.4144%)",
                  }}
                ></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </header>
  );
}
