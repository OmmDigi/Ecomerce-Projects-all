"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  EffectCreative,
  EffectCards,
  Parallax,
  Pagination,
  Navigation,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-flip";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const banners = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    title: "Elevate Your Workout",
  },
  {
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
    title: "Push Your Limits",
  },
];

const availableEffects = [
  "fade",
  "cube",
  "flip",
  "coverflow",
  "creative",
  "cards",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentEffect, setCurrentEffect] = useState("creative");

  // GSAP Custom Effects for text overlay
  useGSAP(
    () => {
      const target = ".swiper-slide-active .hero-text-content";

      // Hide off-screen text
      gsap.set(".swiper-slide:not(.swiper-slide-active) .hero-text-content", {
        opacity: 0,
      });

      const textAnimations = [
        () =>
          gsap.fromTo(
            target,
            { y: 50, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out",
            },
          ),
        () =>
          gsap.fromTo(
            target,
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.2,
              ease: "back.out(1.7)",
            },
          ),
        () =>
          gsap.fromTo(
            target,
            { rotationX: 90, opacity: 0, y: 50 },
            {
              rotationX: 0,
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: "expo.out",
            },
          ),
        () =>
          gsap.fromTo(
            target,
            { filter: "blur(10px)", opacity: 0, scale: 1.1 },
            {
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out",
            },
          ),
      ];

      const randomTextAnim =
        textAnimations[Math.floor(Math.random() * textAnimations.length)];
      randomTextAnim();
    },
    { dependencies: [currentEffect], scope: containerRef },
  );

  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.realIndex);
  };

  const handleTransitionEnd = (swiper: any) => {
    // Pick a new random effect from the real Swiper modules array
    let nextEffect =
      availableEffects[Math.floor(Math.random() * availableEffects.length)];
    // Ensure we always pick a different effect so the component remounts and triggers the text animation
    while (nextEffect === currentEffect) {
      nextEffect =
        availableEffects[Math.floor(Math.random() * availableEffects.length)];
    }
    setCurrentEffect(nextEffect);
  };

  return (
    <section
      className="relative h-screen bg-black overflow-hidden perspective-1000"
      ref={containerRef}
    >
      {/* 
        We use key={currentEffect} to safely swap out the core Swiper module physics.
        To fix the click issues from remounting, the navigation arrows and pagination 
        are placed OUTSIDE the Swiper component so they never unmount!
      */}
      <Swiper
        key={currentEffect}
        initialSlide={activeSlide}
        modules={[
          Autoplay,
          EffectFade,
          EffectCube,
          EffectFlip,
          EffectCoverflow,
          EffectCreative,
          EffectCards,
          Parallax,
          Pagination,
          Navigation,
        ]}
        effect={currentEffect as any}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        creativeEffect={{
          prev: { shadow: true, translate: ["-20%", 0, -1] },
          next: { translate: ["100%", 0, 0] },
        }}
        cardsEffect={{ slideShadows: true, perSlideOffset: 8 }}
        flipEffect={{ slideShadows: true }}
        loop={true}
        speed={1200}
        parallax={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionEnd={handleTransitionEnd}
        className="w-full h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide
            key={index}
            className="w-full h-full relative bg-black overflow-hidden"
          >
            <div
              className="absolute inset-0 w-full h-full"
              data-swiper-parallax="-20%"
            >
              <img
                src={banner.src}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/10"></div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
              <div
                className="max-w-4xl mx-auto flex flex-col items-center"
                data-swiper-parallax-y="-100"
              >
                <h1 className="hero-text-content opacity-0 text-3xl md:text-5xl font-bold mb-4 tracking-wide drop-shadow-xl text-white uppercase">
                  {banner.title}
                </h1>

                <div className="hero-text-content opacity-0">
                  <button className="px-10 py-4 text-lg font-bold bg-red-600 hover:bg-red-500 text-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:scale-105 uppercase tracking-wider">
                    Shop Collection
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* External Custom Navigation & Pagination Elements that NEVER unmount */}
      <div className="custom-prev absolute top-1/2 left-4 z-50 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white cursor-pointer hover:bg-red-600 transition-colors duration-300 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div className="custom-next absolute top-1/2 right-4 z-50 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white cursor-pointer hover:bg-red-600 transition-colors duration-300 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="custom-pagination absolute bottom-8 left-0 right-0 z-50 flex justify-center gap-2"></div>

      <style jsx global>{`
        /* Target the external pagination bullets */
        .custom-pagination .swiper-pagination-bullet {
          background-color: white !important;
          opacity: 0.5;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
          border-radius: 50%;
          cursor: pointer;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: #dc2626 !important;
          transform: scale(1.3);
        }
        /* Disable Swiper's native arrow icon injection since we use custom SVG */
        .swiper-button-disabled {
          opacity: 0.35 !important;
          cursor: auto !important;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
