"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart, User, Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

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
      className={`sticky top-0 z-50 transform-gpu transition-all duration-300 ease-in-out ${isScrolled ? "bg-white  border-gray-200" : "bg-transparent"} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`text-2xl font-bold transition ${isScrolled ? "text-gray-900" : "text-white"}`}
            >
              Glowing
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition pb-1 ${
                pathname === "/"
                  ? isScrolled
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-white border-b-2 border-white"
                  : isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`font-medium transition pb-1 ${
                pathname === "/shop"
                  ? isScrolled
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-white border-b-2 border-white"
                  : isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className={`font-medium transition pb-1 ${
                pathname === "/blog"
                  ? isScrolled
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-white border-b-2 border-white"
                  : isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`font-medium transition pb-1 ${
                pathname === "/about"
                  ? isScrolled
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-white border-b-2 border-white"
                  : isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition pb-1 ${
                pathname === "/contact"
                  ? isScrolled
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-white border-b-2 border-white"
                  : isScrolled
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
              className={`transition ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            >
              <Search size={20} />
            </button>
            <Link
              href="/my-account"
              className={`transition ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            >
              <User size={20} />
            </Link>
            <Link
              href="/wishlist"
              className={`transition relative ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            >
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              href="/cart"
              className={`transition relative ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-gray-200"}`}
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
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 font-medium"
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
