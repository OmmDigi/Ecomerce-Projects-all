"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const features = [
  {
    id: 1,
    title: 'Guaranteed PURE',
    description: 'All Grace formulations adhere to strict purity standards and will never contain harsh or toxic ingredients',
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/image-box-01.png',
  },
  {
    id: 2,
    title: 'Completely Cruelty-Free',
    description: 'All Grace formulations adhere to strict purity standards and will never contain harsh or toxic ingredients',
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/image-box-02.png',
  },
  {
    id: 3,
    title: 'Ingredient Sourcing',
    description: 'All Grace formulations adhere to strict purity standards and will never contain harsh or toxic ingredients',
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/image-box-03.png',
  },
];

export default function WhyShopSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-10 md:py-16 bg-[#f8f8f8] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div 
          className={`text-center mb-10 md:mb-14 transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Shop with Glowing?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`flex flex-col items-center text-center transform transition-all duration-[1500ms] ease-out
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}
              `}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="mb-6 relative w-[102px] h-[118px] transition-transform duration-300 hover:-translate-y-2">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain"
                  sizes="102px"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
