"use client";

import { MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CustomButton from "./CustomButton";

import m1 from "@/public/images/m1.webp";
import m2 from "@/public/images/m2.webp";
import m3 from "@/public/images/m3.webp";

import a1 from "@/public/images/a1.webp";
import a2 from "@/public/images/a2.webp";
import a3 from "@/public/images/a3.webp";

const SLIDES = [
  {
    title: "HOODIE WITH EMBROIDERED SLOGAN",
    desc: "Regular fit hoodie made of soft jersey with decorative slogan embroidery to the front.",
  },
  {
    title: "DENIM JACKET WITH DECORATIVE EMBROIDERY",
    desc: "Oversized jacket with embroidered details. Relaxed design with dropped shoulders.",
  },
  {
    title: "LIMITED EDITION COLLECTION",
    desc: "Exclusive seasonal pieces available online and in selected stores.",
  },
];

const LEFT_IMAGES = [m1, m2, m3];
const RIGHT_IMAGES = [a1, a3, a2];

const IMAGE_HEIGHT = 600;
const SPEED = 15;
const PAUSE_TIME = 2000;

export default function SplitVerticalHero() {
  const leftRef = useRef<any>(null);
  const rightRef = useRef<any>(null);
  const frameRef = useRef<any>(null);
  const offsetRef = useRef<any>(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // duplicate images for seamless loop
  const leftImages = [...LEFT_IMAGES, ...LEFT_IMAGES];
  const rightImages = [...RIGHT_IMAGES, ...RIGHT_IMAGES];

  const TOTAL_HEIGHT = LEFT_IMAGES.length * IMAGE_HEIGHT;

  useEffect(() => {
    const animate = () => {
      if (!paused) {
        offsetRef.current += SPEED;

        // 🔁 Seamless reset
        if (offsetRef.current >= TOTAL_HEIGHT) {
          offsetRef.current = 0;
        }

        // ⏸ Pause exactly when aligned
        if (offsetRef.current % IMAGE_HEIGHT < SPEED) {
          setPaused(true);

          setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % SLIDES.length);
            setPaused(false);
          }, PAUSE_TIME);
        }

        // LEFT moves UP
        leftRef.current.style.transform = `translateY(-${offsetRef.current}px)`;

        // RIGHT moves DOWN but offset corrected
        rightRef.current.style.transform = `translateY(${
          offsetRef.current - TOTAL_HEIGHT
        }px)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [paused]);

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* LEFT COLUMN */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
        <div ref={leftRef} className="ease-out">
          {leftImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              className="h-[600px] w-full object-cover"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
        <div ref={rightRef} className="ease-out">
          {rightImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              className="h-[600px] w-full object-cover"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* CENTER CONTENT */}
      {/* <div className="relative z-10 h-full flex items-center justify-center">
        <div className="bg-transparent px-10 py-8 text-center max-w-xl flex items-center justify-center flex-col">
          <h2 className="text-2xl md:text-3xl font-spartan font-extrabold tracking-wider">
            {SLIDES[activeIndex].title}
          </h2>
          <p className="mt-4 text-gray-600 font-spartan">
            {SLIDES[activeIndex].desc}
          </p>
          <CustomButton text="Shop Now" />
        </div>
      </div> */}
    </section>
  );
}
