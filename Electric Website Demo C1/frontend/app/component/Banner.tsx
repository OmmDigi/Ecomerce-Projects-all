"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import Button from "./Button";

const BANNER_INFO = [
  {
    id: 1,
    image: "/banners/banner_1_edit.jpg",
    mbImg: "/banners/banner-1-mobile.webp",
    tagline: "LET’S BE SMARTER",
    header: (
      <>
        Enjoy your daily <br /> life Smart way...
      </>
    ),
    description: (
      <>
        Smartwatches provide quick access to notifications, calls, messages, and{" "}
        <br />
        apps right on your wrist, reducing the constantly check your phone.
      </>
    ),
    btn1: {
      text: "Per-Order",
      link: "#",
    },
    btn2: {
      text: "View More",
      link: "#",
    },
  },
  {
    id: 2,
    image: "/banners/banner_2_edit.jpg",
    mbImg: "/banners/banner_2_edit.jpg",
    tagline: "DISCOUNT UPTO 75%, HURRY UP!",
    header: (
      <>
        Next generation <br /> Virtual reality
      </>
    ),
    description: (
      <>
        VR is the most quick access to notifications, calls, messages, <br />
        apps right on your wrist, reducing the constantly check.
      </>
    ),
    btn1: {
      text: "Buy Now",
      link: "#",
    },
    btn2: {
      text: "View More",
      link: "#",
    },
  },
];

export default function Banner() {
  const [currentBannerItem, setCurrentBannerItem] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goNext = () => {
    setCurrentBannerItem((prev) => {
      if (prev >= BANNER_INFO.length - 1) return 0;
      return prev + 1;
    });
  };

  const goPrev = () => {
    setCurrentBannerItem((prev) => {
      if (prev <= 0) return BANNER_INFO.length - 1;
      return prev - 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLUListElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Define a minimum distance for a valid swipe

    if (distance > minSwipeDistance) {
      //swipe left
      goNext();
    } else if (distance < -minSwipeDistance) {
      //swipe right
      goPrev();
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="w-full overflow-hidden relative bg-amber-500">
      <ul
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative min-h-162 md:min-h-130 lg:min-h-130"
      >
        {BANNER_INFO.map((item, index) => (
          <li
            key={item.id}
            className={`absolute inset-0 ${
              index == currentBannerItem ? "opacity-100" : "opacity-0"
            } transition-all duration-700`}
          >
            <div className="relative">
              <span className="hidden md:block lg:block">
                <Image
                  className="size-full"
                  src={item.image}
                  alt="Banner 1"
                  height={1920}
                  width={1080}
                />
              </span>

              <span className="relative md:hidden lg:hidden">
                <Image
                  className="w-full h-72 object-cover"
                  src={item.mbImg}
                  alt="Banner 1"
                  height={1920}
                  width={1080}
                />

                {/* Mobile Slider buttons */}
                <div className="md:hidden lg:hidden flex absolute left-0 h-full top-0 bottom-0 items-center justify-center text-white">
                  <button
                    onClick={goPrev}
                    className="size-14 cursor-pointer active:scale-95 bg-[#00000085] flex items-center justify-center"
                  >
                    <ChevronLeft />
                  </button>
                </div>
                <div className="md:hidden lg:hidden flex absolute right-0 h-full top-0 bottom-0 items-center justify-center text-white">
                  <button
                    onClick={goNext}
                    className="size-14 cursor-pointer active:scale-95 bg-[#00000085] flex items-center justify-center"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </span>

              <div className="py-7 bg-gray-900 md:bg-transparent lg:bg-transparent md:py-0 lg:pt-0 md:absolute lg:absolute md:inset-0 lg:inset-0 flex flex-col justify-center gap-y-2.5 container mx-auto px-4">
                <p
                  className={`text-[#b4976c] font-sans font-400 tracking-[4px] text-sm text-center md:text-left lg:text-left md:text-lg lg:text-lg leading-1 ${
                    index == currentBannerItem
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1.5"
                  } transition-all duration-1200`}
                >
                  {item.tagline}
                </p>

                <h2
                  className={`font-open text-3xl leading-11 text-center font-bold text-white md:text-left lg:text-left md:leading-[4.9rem] lg:leading-[4.9rem] md:text-[3.8rem] lg:text-[3.8rem] md:tracking-[4px] lg:tracking-[4px] ${
                    index == currentBannerItem
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  } transition-all duration-1200 ease-in-out`}
                >
                  {item.header}
                </h2>

                <p
                  className={`text-white text-lg text-center md:text-left lg:text-left leading-[1.6] tracking-[.3px] font-sans ${
                    index == currentBannerItem
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } transition-all duration-2000`}
                >
                  {item.description}
                </p>

                {/* Action buttons */}
                <div
                  className={`flex items-center justify-center md:justify-start lg:justify-start gap-3 font-sans font-[450] mt-5 *:cursor-pointer  ${
                    index == currentBannerItem
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } transition-all duration-2000`}
                >
                  <Button>{item.btn1.text}</Button>

                  <Button varient="non-fill">{item.btn2.text}</Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Slider buttons */}
      <div className="hidden md:flex absolute left-0 h-full top-0 bottom-0 items-center justify-center text-white">
        <button
          onClick={goPrev}
          className="size-14 cursor-pointer active:scale-95 bg-[#00000085] flex items-center justify-center"
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="hidden md:flex absolute right-0 h-full top-0 bottom-0 items-center justify-center text-white">
        <button
          onClick={goNext}
          className="size-14 cursor-pointer active:scale-95 bg-[#00000085] flex items-center justify-center"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
