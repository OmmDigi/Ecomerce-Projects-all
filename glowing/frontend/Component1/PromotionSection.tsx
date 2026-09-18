"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromotionSection() {
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
    <section ref={sectionRef} className="w-full py-5 md:py-5 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Image Column */}
          <div className={`w-full md:w-1/2 flex justify-center md:justify-start transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`}>
            <div className="relative w-full max-w-[720px] aspect-[720/681]">
              <Image
                src="https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/promotion.png"
                alt="Get The Skin You Want To Feel"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left">
            <div 
              className={`transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-4 block">
                promotion
              </span>
            </div>
            
            <div 
              className={`transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
              style={{ transitionDelay: '350ms' }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Get The Skin You Want To Feel
              </h2>
            </div>
            
            <div 
              className={`transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
              style={{ transitionDelay: '500ms' }}
            >
              <p className="text-gray-600 text-base text-fit md:text-sm mb-10 max-w-[500px] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipi, scing seddo eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipi, scing seddo eiusmod temporincididunt ut labore et dolore.
              </p>
            </div>
            
            <div 
              className={`transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
              style={{ transitionDelay: '900ms' }}
            >
              <Link
                href="#"
                className="group inline-flex items-center gap-2 text-black font-semibold text-base tracking-wider pb-1 border-b-2 border-black transition-all hover:text-gray-600 hover:border-gray-600 uppercase"
              >
                Shop collection
                <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
