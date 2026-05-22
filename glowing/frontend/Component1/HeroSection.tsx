"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-start relative overflow-hidden -mt-20 pt-20  "
      style={{
        backgroundImage:
          "url(https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/bg-slider-01.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-start justify-center py-5">
          {/* Subtitle */}
          <div
            className="mb-4 animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-block text-lg font-semibold text-black tracking-widest uppercase">
              New Arrivals
            </span>
          </div>

          {/* Main Heading */}
          <div
            className="mb-10 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-5xl md:text-6xl font-semibol text-black leading-tight max-w-5xl ">
              Be your kind
            </p>
            <p className="text-5xl md:text-6xl  font-semibol text-black leading-tight max-w-5xl ">
              of beauty
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/shop"
              className="inline-block px-8 md:px-15 py-3 md:py-4 bg-white text-gray-900 font-semibold  hover:bg-gray-100 transition-all duration-300 ease-out shadow-lg hover:shadow-xl uppercase text-sm tracking-widest "
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
