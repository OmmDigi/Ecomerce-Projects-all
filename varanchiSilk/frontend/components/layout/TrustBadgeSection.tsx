"use client";

import React, { useEffect, useState } from "react";

interface TrustBadgeSectionProps {
  desktopImageUrl?: string;
  mobileImageUrl?: string;
  alt?: string;
}

export default function TrustBadgeSection({
  desktopImageUrl = "trust_badge.svg",
  mobileImageUrl = "trust_badge.svg",
  alt = "Trust Badges",
}: TrustBadgeSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("trust-badge-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trust-badge-section"
      className="relative w-full overflow-hidden
       bg-gradient-to-b from-white via-gray-50 to-white py-2 md:py-5"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-40" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content wrapper */}
        <div className="flex items-center justify-center">
          {/* Image container with animation */}
          <div
            className={`w-full max-w-9xl transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-8"
            }`}
          >
            <picture className="block w-full h-auto">
              {/* Mobile image */}
              <source
                media="(max-width: 767px)"
                srcSet={mobileImageUrl}
                type="image/svg+xml"
              />

              {/* Desktop image */}
              <img
                src={desktopImageUrl}
                alt={alt}
                className="w-full h-50 object-contain drop-shadow-sm hover:drop-shadow-md transition-shadow duration-300"
                loading="lazy"
                fetchPriority="low"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
    </section>
  );
}
