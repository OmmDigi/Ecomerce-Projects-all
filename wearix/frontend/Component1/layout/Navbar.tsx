"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import ScrollingText from "../UI/ScrollingText";
import ShoppingCartSidebar from "@/app/Component/trending/ShoppingCartSidebar";
import SearchBar from "@/app/Component/searchBar";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const shouldUseSolidBackground = !isHome || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        shouldUseSolidBackground ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="px-6 py-3.5 lg:px-[22px] lg:py-[10px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="block hover:opacity-80 transition-opacity"
            >
              {/* <Image
                src="https://framerusercontent.com/images/k3mQgskzRmcKKsc3Urx85y2azU.svg?width=67&height=23"
                alt="Logo"
                width={67}
                height={23}
                priority
              /> */}
              <h1
                className={`text-2xl font-bold ${
                  isScrolled || shouldUseSolidBackground
                    ? "text-black"
                    : "text-white"
                }`}
              >
                WEARIX
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-opacity ${
                  pathname === link.href
                    ? shouldUseSolidBackground
                      ? "text-black"
                      : "text-white"
                    : shouldUseSolidBackground
                      ? "text-black/80 hover:text-black"
                      : "text-white/80 hover:text-white"
                }`}
              >
                <ScrollingText
                  text={link.label}
                  className="text-lg font-bold"
                />
              </Link>
            ))}
          </div>

          {/* Right Section - Search and Shop Button */}
          <div className="flex items-center gap-4 ">
            {/* Search Bar */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`text-gray-700 hover:text-gray-900 cursor-pointer ${
                shouldUseSolidBackground ? " text-black" : "  text-white"
              }`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <div className=" cursor-pointer relative text-gray-700 hover:text-gray-900">
              <ShoppingCartSidebar
                shouldUseSolidBackground={shouldUseSolidBackground}
              />
            </div>

            {/* Profile and Cart Icons */}
            <div className="cursor-pointer hidden sm:flex items-center gap-4">
              <Link
                href="/account"
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  shouldUseSolidBackground
                    ? "bg-black/5 hover:bg-black/10 text-black"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <User size={20} strokeWidth={2} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden flex items-center justify-center w-10 h-10 transition-opacity hover:opacity-70 ${
                shouldUseSolidBackground ? "text-black" : "text-white"
              }`}
              aria-label="Open mobile menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 shadow-xl transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg text-black font-bold">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              className="text-gray-700 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-gray-900 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div
          className=" inset-0 z-40"
          onClick={() => setSearchOpen(false)} // 👈 CLOSE ON OUTSIDE CLICK
        >
          <div
            className="border-b border-gray-200 p-4 bg-white"
            onClick={(e) => e.stopPropagation()} // 👈 PREVENT SELF CLOSE
          >
            <div className="flex">
              <SearchBar />
              <X
                className="text-gray-800"
                onClick={() => setSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
