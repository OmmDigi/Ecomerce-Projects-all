"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function TimeForYourselfSection() {
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
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column - Text and Icon */}
          <div className={`w-full md:w-5/12 flex flex-col items-start text-left transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`}>
            {/* Rotating Icon */}
            <div className="mb-8 relative w-[130px] h-[131px] animate-[spin_15s_linear_infinite]">
              <Image 
                src="https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/image-box-06.png" 
                alt="Because you need time for yourself"
                fill
                className="object-contain"
                sizes="130px"
              />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight max-w-[450px]">
              Because you need time for yourself.
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-[450px] leading-relaxed">
              Stop into our store to find the perfect plant for your home or office.Lorem ipsum dolor sit amet, consectetur adipi, scing seddo eiusmod temporincididun
            </p>
          </div>

          {/* Right Column - Two Image Boxes */}
          <div className="w-full md:w-7/12 flex flex-col sm:flex-row gap-8">
            
            {/* Box 1 */}
            <div 
              className={`w-full sm:w-1/2 flex flex-col group transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`}
              style={{ transitionDelay: '200ms' }}
            >
              <Link href="#" className="relative aspect-square overflow-hidden mb-6 block bg-gray-100">
                <Image 
                  src="https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/image-box-04.jpg"
                  alt="Find a store"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Link>
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <Link href="#" className="hover:text-gray-600 transition-colors">
                  Find a store
                </Link>
              </h4>
              <Link 
                href="#"
                className="inline-flex items-center gap-2 text-black font-semibold text-sm md:text-base uppercase tracking-wider pb-1 border-b-2 border-black transition-all hover:text-gray-600 hover:border-gray-600 w-fit group-hover:text-gray-600 group-hover:border-gray-600"
              >
                find now
                <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>

            {/* Box 2 */}
            <div 
              className={`w-full sm:w-1/2 flex flex-col group transform transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`}
              style={{ transitionDelay: '400ms' }}
            >
              <Link href="#" className="relative aspect-square overflow-hidden mb-6 block bg-gray-100">
                <Image 
                  src="https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/image-box-05.jpg"
                  alt="Skincare tips"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Link>
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                <Link href="#" className="hover:text-gray-600 transition-colors">
                  Skincare tips
                </Link>
              </h4>
              <Link 
                href="#"
                className="inline-flex items-center gap-2 text-black font-semibold text-sm md:text-base uppercase tracking-wider pb-1 border-b-2 border-black transition-all hover:text-gray-600 hover:border-gray-600 w-fit group-hover:text-gray-600 group-hover:border-gray-600"
              >
                learn more
                <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
