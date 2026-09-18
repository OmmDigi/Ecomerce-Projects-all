"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart, User, Search, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const isHomePage = pathname === "/";
  const isSolid = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 0);

      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transform-gpu transition-all   duration-300 ease-in-out ${isSolid ? "bg-white shadow-2xl border-gray-200" : "bg-transparent"} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`text-2xl font-bold transition ${isSolid ? "text-gray-900" : "text-white"}`}
            >
              <div className="w-full md:w-3/3 flex justify-center order-1 md:order-2 mb-4 md:mb-0">
                <Image
                  src="https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/logo-126x47.png"
                  alt="Glowing Logo"
                  width={126}
                  height={47}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden text-xl uppercase md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-bold transition pb-1 ${pathname === "/"
                ? isSolid
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-white border-b-2 border-white"
                : isSolid
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
                }`}
            >
              Home
            </Link>
            <Link
              href="/product"
              className={`font-bold transition pb-1 ${pathname === "/product"
                ? isSolid
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-white border-b-2 border-white"
                : isSolid
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
                }`}
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className={`font-bold transition pb-1 ${pathname === "/blog"
                ? isSolid
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-white border-b-2 border-white"
                : isSolid
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
                }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`font-bold transition pb-1 ${pathname === "/about"
                ? isSolid
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-white border-b-2 border-white"
                : isSolid
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
                }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`font-bold transition pb-1 ${pathname === "/contact"
                ? isSolid
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-white border-b-2 border-white"
                : isSolid
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
                }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              className={`transition ${isSolid ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            >
              <Search size={20} />
            </button>
            <Link
              href="/account"
              className={`transition ${isSolid ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            >
              <User size={20} />
            </Link>
            <Link
              href="/wishlist"
              className={`transition relative ${isSolid ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            >
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              href="/cart"
              className={`transition relative ${isSolid ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition ${isSolid ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-white border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 font-bold"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-700 hover:text-gray-900 font-bold"
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-gray-900 font-bold"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 font-bold"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 font-bold"
              >
                Contact Us
              </Link>
            </nav>
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 mt-4">
              <button className="text-gray-700 hover:text-gray-900">
                <Search size={20} />
              </button>
              <Link
                href="/my-account"
                className="text-gray-700 hover:text-gray-900"
              >
                <User size={20} />
              </Link>
              <Link
                href="/wishlist"
                className="text-gray-700 hover:text-gray-900 relative"
              >
                <Heart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-gray-900 relative"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
