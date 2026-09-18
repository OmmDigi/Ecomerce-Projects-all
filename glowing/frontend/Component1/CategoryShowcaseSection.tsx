"use client";

import { Waypoints } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Skin Care",
    itemsCount: 4,
    image:
      "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-category-01.jpg",
    href: "/product",
  },
  {
    title: "Body Care",
    itemsCount: 4,
    image:
      "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-category-02.jpg",
    href: "/product",
  },
  {
    title: "Hair Care",
    itemsCount: 4,
    image:
      "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-category-03.jpg",
    href: "/product",
  },
];

export default function CategoryShowcaseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-5 md:py-10 bg-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={`transform transition-all duration-1000 ease-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Link
                href={category.href}
                className="w-full overflow-hidden relative block group"
                style={{ aspectRatio: "554/280" }}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>

                <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 sm:px-10 z-10">
                  <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2 transform transition-transform duration-500 group-hover:translate-x-2">
                    {category.title}
                  </h2>
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider transform transition-transform duration-500 group-hover:translate-x-2 delay-75">
                    {category.itemsCount} items
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
