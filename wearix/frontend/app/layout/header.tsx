"use client";
import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import ShoppingCartSidebar from "../Component/trending/ShoppingCartSidebar";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/fetcher";
import SearchBar from "../Component/searchBar";

interface MenuItem {
  title: string;
  url: string;
  children?: MenuItem[];
  type?: "mega" | "dropdown";
  megaContent?: {
    columns: Array<{
      title?: string;
      links?: Array<{ title: string; url: string }>;
      products?: Array<{
        name: string;
        price: string;
        image: string;
        url: string;
      }>;
      image?: string;
    }>;
  };
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(11);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    data: category,
    error: errorCategory,
  } = useQuery({
    queryKey: ["All-category"],
    queryFn: () => getRequest(`/api/v1/products/category`),
  });
  const menuItems: MenuItem[] = [
    {
      title: "Home",
      url: "/",
      type: "dropdown",
    },

    {
      title: "Product",
      url: "/product",
      type: "mega",
      megaContent: {
        columns: [
          {
            title: "Product New",
            products: [
              {
                name: "Teapot",
                price: "$23.90",
                image:
                  "https://images.unsplash.com/photo-1594225298081-f43a9d3a6e50?w=100&h=100&fit=crop",
                url: "/product/1",
              },
              {
                name: "Miro Dining Table",
                price: "$35.90",
                image:
                  "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=100&h=100&fit=crop",
                url: "/product/1",
              },
              {
                name: "Discus Floor and Table",
                price: "$29.00",
                image:
                  "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop",
                url: "/product/1",
              },
            ],
          },
          {
            title: "Product Feature",
            products: [
              {
                name: "UNA Chair",
                price: "$29.00",
                image:
                  "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=100&h=100&fit=crop",
                url: "/product/1",
              },
              {
                name: "Studio Chair",
                price: "$11.90",
                image:
                  "https://images.unsplash.com/photo-1503602642458-232111445657?w=100&h=100&fit=crop",
                url: "/product/1",
              },
              {
                name: "Nude",
                price: "$11.90",
                image:
                  "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=100&h=100&fit=crop",
                url: "/product/1",
              },
            ],
          },
          {
            title: "Product Special",
            products: [
              {
                name: "Orbit Table Lamp One",
                price: "$9.00",
                image:
                  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=100&h=100&fit=crop",
                url: "/product/1",
              },
              {
                name: "Mega Table Lamp",
                price: "$9.00",
                image:
                  "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=100&h=100&fit=crop",
                url: "/product/1",
              },
              {
                name: "Maple Light Marble",
                price: "$12.90",
                image:
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
                url: "/product/1",
              },
            ],
          },
        ],
      },
    },
    {
      title: "About Us",
      url: "#",
    },
    // {
    //   title: "Santa",
    //   url: "/santa",
    //   type: "dropdown",
    // },
  ];

  useEffect(() => {
    if (!searchOpen) return;

    // const close = () => setSearchOpen(false);

    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [searchOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-51">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto px-4 md:px-10">
          <div className="flex justify-between items-center pt-4">
            {/* Logo */}

            <div className="w-40 lg:w-38">
              <a href="/" className="block">
                <img src="/logo.jpg" alt="At Auros" className="w-full h-auto" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.url}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-900 hover:text-gray-600 py-2"
                  >
                    <span>{item.title}</span>
                    {(item.children || item.megaContent) && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.type === "dropdown" &&
                    item.children &&
                    activeDropdown === item.title && (
                      <div className="absolute left-0 top-full mt-0 w-48 bg-white shadow-lg border border-gray-200 py-2">
                        {item.children.map((child, childIndex) => (
                          <a
                            key={childIndex}
                            href={child.url}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}

                  {/* Mega Menu */}
                  {item.type === "mega" && activeDropdown === item.title && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-screen max-w-6xl bg-white shadow-lg border border-gray-200 p-8 z-51">
                      <div className="grid grid-cols-5 gap-8">
                        {(category as any)?.data?.map((category: any) => (
                          <div key={category.id} className="space-y-4">
                            {/* Category Image */}
                            <Link href={`/product?category=${category.slug}`}>
                              <img
                                src={category.image}
                                alt={category.alt_tag || category.name}
                                className="w-full h-25 object-cover rounded-lg hover:opacity-90 transition"
                              />
                            </Link>

                            {/* Category Title */}
                            <h3 className="font-semibold text-sm text-gray-900">
                              {category.name}
                            </h3>

                            {/* Sub Categories */}
                            {category.sub_categories?.length > 0 && (
                              <ul className="space-y-2">
                                {category.sub_categories.map((sub: any) => (
                                  <li key={sub.id}>
                                    <a
                                      href={`/product?category=${category.slug}&sub=${sub.slug}`}
                                      className="text-sm text-gray-600 hover:text-gray-900 transition"
                                    >
                                      {sub.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-700 hover:text-gray-900 "
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <div className="relative text-gray-700 hover:text-gray-900">
                <ShoppingCartSidebar />
              </div>

              {/* User */}
              <Link href="/account" className="cursor-pointer">
                <button className="text-gray-700 hover:text-[#0a1e33] transition-colors cursor-pointer">
                  <User className="w-5 h-5 cursor-pointer" />
                </button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-700 hover:text-gray-900"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
          {/* Desktop Search Bar */}\
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.url}
                  className="block py-2 text-sm font-medium text-gray-900 hover:text-gray-600"
                >
                  {item.title}
                </a>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
