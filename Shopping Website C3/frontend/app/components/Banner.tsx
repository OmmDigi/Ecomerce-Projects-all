"use client";

// import { useEffect, useRef, useState } from "react";

// // LEFT (models)
// import model1 from "@/public/assets/m1.webp";
// import model2 from "@/public/assets/m2.webp";
// import model3 from "@/public/assets/m3.webp";

// // RIGHT (products)
// import product1 from "@/public/assets/a1.webp";
// import product2 from "@/public/assets/a2.webp";
// import product3 from "@/public/assets/a3.webp";
// import CustomButton from "./CustomButton";

// // CENTER TEXT
// const SLIDES = [
//   {
//     title: "HOODIE WITH EMBROIDERED SLOGAN",
//     desc: "Regular fit hoodie made of soft jersey with decorative slogan embroidery to the front.",
//   },
//   {
//     title: "DENIM JACKET WITH DECORATIVE EMBROIDERY",
//     desc: "Oversized jacket with embroidered details. Relaxed design with dropped shoulders.",
//   },
//   {
//     title: "LIMITED EDITION COLLECTION",
//     desc: "Exclusive seasonal pieces available online and in selected stores.",
//   },
// ];

// const LEFT_IMAGES = [model1, model2, model3];
// const RIGHT_IMAGES = [product1, product3, product2];

// // const IMAGE_HEIGHT_DESKTOP = 600;
// // const IMAGE_HEIGHT_MOBILE = 240;
// const SPEED = 15;
// const PAUSE_TIME = 2000;

// export default function SplitVerticalHero() {
//   const leftRef = useRef<any>(null);
//   const rightRef = useRef<any>(null);
//   const frameRef = useRef<any>(null);
//   const offsetRef = useRef<any>(0);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [paused, setPaused] = useState(false);

//   const [imageHeightValue, setImageHeightValue] = useState<number>(-1);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 600) {
//         setImageHeightValue(240);
//       } else {
//         setImageHeightValue(600);
//       }
//     };

//     // run once on mount
//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [typeof window !== "undefined" ? window.innerWidth : typeof window]);

//   // duplicate images for seamless loop
//   const leftImages = [...LEFT_IMAGES, ...LEFT_IMAGES];
//   const rightImages = [...RIGHT_IMAGES, ...RIGHT_IMAGES];

//   const TOTAL_HEIGHT = LEFT_IMAGES.length * imageHeightValue;

//   useEffect(() => {
//     const animate = () => {
//       if (!paused) {
//         offsetRef.current += SPEED;

//         // 🔁 seamless loop reset
//         if (offsetRef.current >= TOTAL_HEIGHT) {
//           offsetRef.current = 0;
//         }

//         // 🧠 calculate nearest slide index
//         const currentIndex = Math.round(offsetRef.current / imageHeightValue);
//         const snappedOffset = currentIndex * imageHeightValue;

//         // ⏸ pause only when perfectly aligned
//         if (Math.abs(offsetRef.current - snappedOffset) < SPEED) {
//           offsetRef.current = snappedOffset;

//           setPaused(true);

//           setTimeout(() => {
//             setActiveIndex((prev) => (prev + 1) % SLIDES.length);
//             setPaused(false);
//           }, PAUSE_TIME);
//         }

//         // LEFT moves UP
//         if (leftRef.current) {
//           leftRef.current.style.transform = `translateY(-${offsetRef.current}px)`;
//         }

//         // RIGHT moves DOWN (mirrored)
//         if (rightRef.current) {
//           rightRef.current.style.transform = `translateY(${
//             offsetRef.current - TOTAL_HEIGHT
//           }px)`;
//         }
//       }

//       frameRef.current = requestAnimationFrame(animate);
//     };

//     frameRef.current = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(frameRef.current);
//   }, [paused, imageHeightValue]);

//   return (
//     <section
//       style={{ height: `${imageHeightValue}px` }}
//       className="relative w-full overflow-hidden"
//     >
//       {/* LEFT COLUMN */}
//       <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
//         <div ref={leftRef}>
//           {leftImages.map((img, i) => (
//             <div
//               key={i}
//               style={{ height: `${imageHeightValue}px` }}
//               className="overflow-hidden"
//             >
//               <img
//                 src={img.src}
//                 className="h-full w-full object-cover"
//                 alt=""
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT COLUMN */}
//       <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
//         <div ref={rightRef}>
//           {rightImages.map((img, i) => (
//             <div
//               key={i}
//               style={{ height: `${imageHeightValue}px` }}
//               className="overflow-hidden"
//             >
//               <img
//                 src={img.src}
//                 className="h-full w-full object-cover"
//                 alt=""
//               />
//             </div>
//           ))}
//         </div>
//       </div>

{
  /* CENTER CONTENT */
}
// <div className="relative z-10 h-full flex items-center justify-center">
//   <div className="bg-transparent px-10 py-8 text-center max-w-xl flex items-center justify-center flex-col">
//     <h2 className="text-2xl md:text-3xl font-spartan font-extrabold tracking-wider">
//       {SLIDES[activeIndex].title}
//     </h2>
//     <p className="mt-4 text-gray-600 font-spartan">
//       {SLIDES[activeIndex].desc}
//     </p>
//     <CustomButton text="Shop Now" />
//   </div>
// </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";

// LEFT (models)
import model1 from "@/public/assets/m1.webp";
import model2 from "@/public/assets/m2.webp";
import model3 from "@/public/assets/m3.webp";

// RIGHT (products)
import product1 from "@/public/assets/a1.webp";
import product2 from "@/public/assets/a2.webp";
import product3 from "@/public/assets/a3.webp";
import CustomButton from "./CustomButton";

const SLIDES = [
  {
    title: "HOODIE WITH EMBROIDERED SLOGAN",
    desc: "Regular fit hoodie made of soft jersey with decorative slogan embroidery to the front.",
  },
  {
    title: "DENIM JACKET WITH DECORATIVE",
    desc: "Oversized jacket with embroidered details. Relaxed design with dropped shoulders.",
  },
  {
    title: "LIMITED EDITION COLLECTION IT HAS",
    desc: "Exclusive seasonal pieces available online and in selected stores. decorative slogan embroidery",
  },
];

const LEFT_IMAGES = [model1, model2, model3];
const RIGHT_IMAGES = [product1, product3, product2];

const SPEED = 15;
const PAUSE_TIME = 2000;

export default function SplitVerticalHero() {
  const leftRef = useRef<any>(null);
  const rightRef = useRef<any>(null);
  const frameRef = useRef<any>(null);
  const offsetRef = useRef(0);
  const slideHeightRef = useRef(240);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const leftSlides = [...LEFT_IMAGES, ...LEFT_IMAGES];
  const rightSlides = [...RIGHT_IMAGES, ...RIGHT_IMAGES];

  // 🔹 Set slide height responsively
  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1024) slideHeightRef.current = 600;
      else if (window.innerWidth >= 768) slideHeightRef.current = 360;
      else slideHeightRef.current = 240;
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const animate = () => {
      const SLIDE_HEIGHT = slideHeightRef.current;
      const TOTAL_HEIGHT = LEFT_IMAGES.length * SLIDE_HEIGHT;

      if (!paused) {
        offsetRef.current += SPEED;

        if (offsetRef.current >= TOTAL_HEIGHT) {
          offsetRef.current = 0;
        }

        const index = Math.round(offsetRef.current / SLIDE_HEIGHT);
        const snap = index * SLIDE_HEIGHT;

        if (Math.abs(offsetRef.current - snap) < SPEED) {
          offsetRef.current = snap;
          setPaused(true);

          setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % SLIDES.length);
            setPaused(false);
          }, PAUSE_TIME);
        }

        leftRef.current.style.transform = `translateY(-${offsetRef.current}px)`;

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
    <section>
      <div className="relative w-full overflow-hidden h-[240px] h-[240px] md:h-[360px] lg:h-[600px]">
        {/* LEFT COLUMN */}
        <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
          <div ref={leftRef}>
            {leftSlides.map((img, i) => (
              <div key={i} className="h-[240px] md:h-[360px] lg:h-[600px]">
                <img
                  src={img.src}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          <div ref={rightRef}>
            {rightSlides.map((img, i) => (
              <div key={i} className="h-[240px] md:h-[360px] lg:h-[600px]">
                <img
                  src={img.src}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div className="hidden relative z-10 h-full md:flex lg:flex items-center justify-center">
          <div className="bg-transparent px-10 py-8 text-center max-w-xl flex items-center justify-center flex-col">
            <h2 className="text-2xl md:text-3xl font-spartan font-extrabold tracking-wider">
              {SLIDES[activeIndex].title}
            </h2>
            <p className="mt-4 text-gray-600 font-spartan">
              {SLIDES[activeIndex].desc}
            </p>
            <CustomButton text="Shop Now" />
          </div>
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="md:hidden lg:hidden relative z-10 h-full flex items-center justify-center">
        <div className="bg-transparent px-10 py-8 text-center max-w-xl flex items-center justify-center flex-col">
          <h2 className="text-2xl md:text-3xl font-spartan font-extrabold tracking-wider">
            {SLIDES[activeIndex].title}
          </h2>
          <p className="mt-4 text-gray-600 font-spartan">
            {SLIDES[activeIndex].desc}
          </p>
          <CustomButton text="Shop Now" />
        </div>
      </div>
    </section>
  );
}
