"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, ShoppingBag, Menu, X, User } from "lucide-react";
import ShoppingCartSidebar from "./ShoppingCartSidebar";
import SearchBar from "./searchBar";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";

// Menu items structure
const menuItems = [
  { label: "Home", href: "/" },
  { label: "All Silk Sarees", href: "/product" },
];

const shopByMaterial = [
  { label: "Kanchipuram Silk", href: "/product/kanchipuram-silk" },
  { label: "Raw Silk", href: "/product/raw-silk" },
  { label: "Kora Silk", href: "/product/kora" },
  { label: "Tissue Silk", href: "/product/tissue-silk" },
  { label: "Tussar Silk", href: "/product/tussar-silk" },
  { label: "Katan Silk", href: "/product/katan-silk" },
  { label: "Chanderi Silk", href: "/product/chanderi-silks" },
  { label: "Chiniya Silk", href: "/product/chiniya-silk" },
  { label: "Mysore Silk", href: "/product/mysore-silk" },
  { label: "Crepe Silk", href: "/product/crepe-silk" },
  { label: "Kanchi Silk Cotton", href: "/product/kanchi-silk-cotton" },
  { label: "Silk Cotton", href: "/product/silk-cotton" },
  { label: "Silk Linen", href: "/product/silk-linen" },
  { label: "Muslin Silk", href: "/product/muslin-silk" },
  { label: "Poona Silk", href: "/product/poona-silk" },
  { label: "Dupion Silk", href: "/product/dupion" },
  { label: "Moonga Silk", href: "/product/moonga-silk" },
  { label: "Georgette Silk", href: "/product/georgette-silk" },
  { label: "Soft Silk", href: "/product/soft-silk" },
  { label: "Chiffon Silk", href: "/product/chiffon-silk" },
];

const shopByCollection = [
  { label: "Mega Festive Sale", href: "/product/mothers-day-sale" },
  { label: "Wedding Collection", href: "/product/wedding-collection" },
  { label: "Festive Collection", href: "/product/festive-collection" },
  { label: "Summer Collection", href: "/product/summer-collection" },
  { label: "Jamdani Collection", href: "/product/jamdhani-collection" },
  { label: "Favourites Restocked", href: "/product/restocked" },
];

// Mobile Menu Submenu Component with Enhanced Animation
const MobileSubmenu: React.FC<{
  label: string;
  items: Array<{ label: string; href: string }>;
  isOpen: boolean;
  onToggle: () => void;
  onItemClick?: () => void;
}> = ({ label, items, isOpen, onToggle, onItemClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-gray-900 font-semibold hover:bg-amber-50 transition-all duration-200 group"
      >
        <span className="flex items-center gap-2">
          <span className="w-1 h-4 bg-amber-600 rounded transition-all duration-300 group-hover:h-6"></span>
          {label}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Animated Submenu Items */}
      <div
        className={`overflow-hidden bg-gray-50 transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"
          }`}
      >
        <div className="flex flex-col py-2">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className="px-8 py-3 text-sm text-gray-700 hover:text-amber-600 hover:bg-white transition-all duration-200 font-medium group/item border-l-4 border-transparent hover:border-amber-600"
              style={{
                transitionDelay: isOpen ? `${index * 30}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const {
    data: categories,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useSWR("api/v1/products/category", getFetcher);

  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#053628] shadow-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-50 hover:text-amber-600 rounded-lg transition-all duration-200 relative group"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 transition-all duration-300 rotate-90" />
                ) : (
                  <Menu className="w-6 h-6 transition-all duration-300" />
                )}
              </div>
              <span className="absolute inset-0 bg-amber-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            </button>
          </div>

          {/* Logo - Centered on Mobile, Left on Desktop */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <Link
              href="/"
              className="flex items-center"
              onClick={closeMobileMenu}
            >
              <Image
                src="/varanchi_logo.png"
                alt="Varanchi"
                width={160}
                height={40}
                className=" h-10 md:h-18 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 ml-8 h-20">
            {menuItems.map((item) =>
              item.label === "All Silk Sarees" ? (
                <div key={item.href} className="group h-full flex items-center">
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-[15px] text-gray-50 font-semibold hover:text-amber-600 transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute left-0 top-20 w-full bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border-t-2 border-amber-600">
                    <div className="max-w-7xl mx-auto p-8">
                      {loadingCategory ? (
                        <div className="text-center py-8 text-gray-500">Loading categories...</div>
                      ) : errorCategory ? (
                        <div className="text-center py-8 text-red-500">Failed to load categories</div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                          {categories?.data?.map((category: any, index: number) => (
                            <Link
                              key={index}
                              href={`/product?category=${category.slug}`}
                              className="group/cat flex flex-col items-center gap-3"
                            >
                              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 group-hover/cat:border-amber-600 transition-all duration-300 shadow-sm group-hover/cat:shadow-md">
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/cat:scale-110"
                                  loading="lazy"
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-800 text-center group-hover/cat:text-amber-600 transition-colors">
                                {category.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-[15px] text-gray-50 font-semibold hover:text-amber-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            )}

            <Link
              href="/contact-us"
              className="px-4 py-2 text-[15px] text-gray-50 font-semibold hover:text-amber-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Right Section - Search & Cart */}
          <div className="flex items-center gap-4 lg:ml-auto">
            {/* Search */}
            {/* <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-50 hover:text-amber-600 rounded-lg transition-all duration-200 relative group"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
              <span className="absolute inset-0 bg-amber-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            </button> */}
            <SearchBar />

            {/* Cart */}
            {/* <Link
              href="/cart"
              className="relative p-2 text-gray-50 hover:text-amber-600 rounded-lg transition-all duration-200 group"
              aria-label={`Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute inset-0 bg-amber-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-amber-600 rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link> */}
            <div className="relative text-gray-700 hover:text-gray-900">
              <ShoppingCartSidebar />
            </div>
            <Link href="/account" className="cursor-pointer">
              <button className="text-gray-50 hover:text-gray-100 transition-colors cursor-pointer">
                <User className="w-5 h-5 cursor-pointer" />
              </button>
            </Link>
          </div>
        </div>

        {/* Search Bar - Desktop & Mobile */}
        {isSearchOpen && (
          <div className="pb-4 border-t border-gray-600 animate-in fade-in duration-200">
            <form className="flex gap-2">
              <input
                type="text"
                placeholder="Search for silk sarees..."
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Slide-out Menu - Enhanced */}
      {isMobileMenuOpen && (
        <>
          {/* Menu Overlay */}
          <div
            className="fixed inset-0 bg-black/30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
            onClick={closeMobileMenu}
            style={{ top: "80px", zIndex: 39 }}
            aria-hidden="true"
          />

          {/* Menu Drawer */}
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl animate-in slide-in-from-top duration-300 relative z-40 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-0 sm:px-0">
              {/* Main Menu Items */}
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block px-6 py-4 text-gray-900 font-semibold hover:bg-amber-50 border-b border-gray-200 transition-all duration-200 hover:pl-8 hover:text-amber-600"
                >
                  {item.label}
                </Link>
              ))}

              {/* Shop By Material Submenu */}
              <MobileSubmenu
                label="Shop By Material"
                items={shopByMaterial}
                isOpen={openSubmenu === "material"}
                onToggle={() => toggleSubmenu("material")}
                onItemClick={closeMobileMenu}
              />

              {/* Shop By Collection Submenu */}
              <MobileSubmenu
                label="Shop By Collection"
                items={shopByCollection}
                isOpen={openSubmenu === "collection"}
                onToggle={() => toggleSubmenu("collection")}
                onItemClick={closeMobileMenu}
              />

              {/* Contact Link */}
              <Link
                href="/contact-us"
                onClick={closeMobileMenu}
                className="block px-6 py-4 text-gray-900 font-semibold hover:bg-amber-50 border-b border-gray-200 transition-all duration-200 hover:pl-8 hover:text-amber-600"
              >
                Contact
              </Link>

              {/* Search in Mobile Menu */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <form className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
