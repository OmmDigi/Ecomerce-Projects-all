"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, GitCompare, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image1: string;
  image2: string;
  badge?: string;
  badgeColor?: string;
  isHot?: boolean;
  tabs: string[];
}

const products: Product[] = [
  {
    id: "1",
    name: "Shield Spray",
    category: "Hair Care",
    price: "$30.00 – $55.00",
    image1: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-06-3-400x533.jpg",
    image2: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-06-1-1-400x533.jpg",
    badge: "Hot",
    badgeColor: "bg-red-500",
    tabs: ["Best Sellers", "on sale"],
  },
  {
    id: "2",
    name: "Enriched Duo",
    category: "Body Care",
    price: "$18.00 – $90.00",
    image1: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-07-04-400x533.jpg",
    image2: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-07-1-1-400x533.jpg",
    badge: "Hot",
    badgeColor: "bg-red-500",
    tabs: ["Best Sellers", "new arrivals"],
  },
  {
    id: "3",
    name: "Enriched Hand Wash",
    category: "Body Care",
    price: "$90.00",
    image1: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-08-04-400x533.jpg",
    image2: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-08-1-1-400x533.jpg",
    badge: "Hot",
    badgeColor: "bg-red-500",
    tabs: ["Best Sellers", "new arrivals"],
  },
  {
    id: "4",
    name: "Perfecting Facial Oil",
    category: "Skin Care",
    price: "$20.00",
    image1: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-13-4-400x533.jpg",
    image2: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-13-1-1-400x533.jpg",
    tabs: ["new arrivals"],
  },
  {
    id: "5",
    name: "Shield Shampoo",
    category: "Hair Care",
    price: "$45.00",
    image1: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-12-3-400x533.jpg",
    image2: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-12-1-1-400x533.jpg",
    badge: "Hot",
    badgeColor: "bg-red-500",
    tabs: ["Best Sellers", "new arrivals"],
  },
  {
    id: "6",
    name: "Natural Coconut Cleansing Oil",
    category: "Body Care",
    price: "$15.00 – $20.00",
    image1: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-01-05-400x533.jpg",
    image2: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-01-1-1-400x533.jpg",
    badge: "Hot",
    badgeColor: "bg-red-500",
    tabs: ["new arrivals", "on sale"],
  },
  {
    id: "7",
    name: "Enriched Hand & Body Wash",
    category: "Body Care",
    price: "$19.00",
    originalPrice: "$25.00",
    image1: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-10-3-400x533.jpg",
    image2: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-10-1-1-400x533.jpg",
    badge: "-24%",
    badgeColor: "bg-gray-800",
    tabs: ["on sale", "Best Sellers"],
  },
  {
    id: "8",
    name: "Scalp Moisturizing Cream",
    category: "Hair Care",
    price: "$42.00 – $45.00",
    image1: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-02-3-400x533.jpg",
    image2: "https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/product-02-1-1-400x533.jpg",
    badge: "-7%",
    badgeColor: "bg-gray-800",
    isHot: true,
    tabs: ["on sale", "Best Sellers", "new arrivals"],
  },
];

const tabs = ["Best Sellers", "new arrivals", "on sale"];

function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col transform transition-all duration-[1500ms] ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={isHovered ? product.image2 : product.image1}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-500 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.badge && (
            <span className={`px-2 py-1 text-xs font-semibold tracking-wider text-white ${product.badgeColor} rounded uppercase`}>
              {product.badge}
            </span>
          )}
          {product.isHot && (
            <span className="px-2 py-1 text-xs font-semibold tracking-wider text-white bg-red-500 rounded uppercase">
              Hot
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} flex gap-2`}>
          <button className="flex-1 bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
            Add to Cart
          </button>
          <button className="w-[48px] h-[48px] shrink-0 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors" title="Add to Wishlist">
            <Heart size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col text-left">
        <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</span>
        <Link href="#" className="text-base font-medium text-gray-900 hover:text-gray-600 transition-colors mb-2">
          {product.name}
        </Link>
        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
          )}
          <span className="text-sm font-semibold text-gray-900">{product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const sectionRef = useRef<HTMLElement>(null);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (sectionRef.current) {
      // Small delay to allow any React state changes to render first
      setTimeout(() => {
        const targetElement = sectionRef.current;
        if (!targetElement) return;

        // Calculate offset (e.g., -80px if you have a sticky header)
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 800; // 800ms for a very smooth transition
        let start: number | null = null;

        // Easing function: easeInOutQuad
        const ease = (t: number, b: number, c: number, d: number) => {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);

          window.scrollTo(0, run);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }, 50);
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-5 md:py-5 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Featured Products
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-b md:border-b-0 border-gray-200 w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-sm sm:text-base font-medium uppercase tracking-wider pb-2 md:pb-0 transition-colors relative
                  ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-700"}
                `}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 md:-bottom-2 left-0 w-full h-[2px] bg-black"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.filter(p => p.tabs.includes(activeTab)).map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
