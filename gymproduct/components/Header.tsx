"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-100 dark:bg-gray-800 shadow-md py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <div>
          <Link href="/" className={`text-2xl font-extrabold tracking-wide transition-colors duration-300 ${
            isScrolled ? 'text-gray-900 dark:text-gray-50' : 'text-white'
          }`}>
            GYM<span className="text-red-500">GEAR</span>
          </Link>
        </div>
        <nav className="flex gap-8">
          <Link href="/equipment" className={`font-medium transition-colors duration-200 text-base ${
            isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-red-500' : 'text-gray-200 hover:text-white'
          }`}>Equipment</Link>
          <Link href="/accessories" className={`font-medium transition-colors duration-200 text-base ${
            isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-red-500' : 'text-gray-200 hover:text-white'
          }`}>Accessories</Link>
          <Link href="/apparel" className={`font-medium transition-colors duration-200 text-base ${
            isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-red-500' : 'text-gray-200 hover:text-white'
          }`}>Apparel</Link>
          <Link href="/about" className={`font-medium transition-colors duration-200 text-base ${
            isScrolled ? 'text-gray-600 dark:text-gray-300 hover:text-red-500' : 'text-gray-200 hover:text-white'
          }`}>About Us</Link>
        </nav>
        <div className="flex items-center">
          <button className="bg-red-500 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-[0_4px_6px_-1px_rgba(239,68,68,0.4)] hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-[0_6px_8px_-1px_rgba(239,68,68,0.5)]">
            Cart (0)
          </button>
        </div>
      </div>
    </header>
  );
}
