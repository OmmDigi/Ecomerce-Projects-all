"use client";
import React, { useState } from "react";
import {
  Search,
  Heart,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import ShoppingCartSidebar from "../ui/shoppingCart";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/fetcher";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { wishlist } = useWishlistStore();

  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    data: category,
    error: errorCategory,
  } = useQuery({
    queryKey: ["All-category"],
    queryFn: () => getRequest(`/api/v1/products/category`),
  });

  // const menuItems = [
  //   {
  //     label: "Baby",
  //     submenu: ["Baby Clothing", "Baby Collections", "Shop by Size"],
  //   },
  //   {
  //     label: "Girls",
  //     submenu: ["Girls Clothing", "Girls Collections", "Shop by Size"],
  //   },
  //   {
  //     label: "Boys",
  //     submenu: ["Boys Clothing", "Boys Collections", "Shop by Size"],
  //   },
  //   {
  //     label: "Classes + Events",
  //     submenu: ["Virtual Events", "In-Person Events", "IG Live Events"],
  //   },
  //   // { label: "Services" },
  //   // { label: "Blog" },
  // ];

  console.log("categor1111y", category);

  const toggleSubmenu = (index: any) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={"/"}>
              <div className="flex-shrink-0 px-5">
                <img
                  src="/demo-baby1.svg"
                  className="w-full h-[35px] object-cover "
                  alt="Baby"
                />
                {/* <div className="text-2xl font-bold text-[#0a1e33]">DEBEBE</div> */}
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex lg:flex items-center space-x-8">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-[#0a1e33] py-2 text-sm font-bold transition-colors">
                <Link
                  key={"home"}
                  href={`/`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span>Home</span>
                </Link>
                {/* {item.submenu && <ChevronDown className="w-4 h-4" />} */}
              </button>

              {Array.isArray((category as any)?.data) &&
                (category as any).data.map((item: any, index: number) => (
                  <div key={index} className="relative group">
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-[#0a1e33] py-2 text-sm font-bold transition-colors">
                      <Link href={`/product?category=${item?.slug}`}>
                        <span>{item.name}</span>
                      </Link>
                    </button>

                    {Array.isArray(item?.sub_categories) &&
                      item.sub_categories.length > 1 && (
                        <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          <div className="py-2">
                            {item.sub_categories.map(
                              (subItem: any, subIndex: number) => (
                                <Link
                                  key={subIndex}
                                  href={`/product?category=${item.slug}&sub_category=${subItem.slug}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                ))}

              <button className="flex items-center space-x-1 text-gray-700 hover:text-[#0a1e33] py-2 text-sm font-bold transition-colors">
                <Link
                  key={"Product"}
                  href={`/product`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span> ALL Products</span>
                </Link>
                {/* {item.submenu && <ChevronDown className="w-4 h-4" />} */}
              </button>
            </div>

            {/* Desktop Icons */}

            <div className="flex items-center space-x-6">
              {/* <button className="text-gray-700 hover:text-[#0a1e33] transition-colors">
                <Search className="w-5 h-5" />
              </button> */}
              {/* <Link href={"/wishlist"}>
                <button className="text-gray-700 hover:text-[#0a1e33] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </Link> */}
              {/* wishlist  */}
              <Link
                key="1"
                href="/wishlist"
                className={`font-bold transition-colors relative group capitalize`}
              >
                <div className="flex text-gray-700 hover:text-[#0a1e33] transition-colors">
                  <Heart className="w-5 h-5 text-2xl" />
                  <p className="bg-[#e3694b] text-gray-50 rounded-[50%] ml-[-7] mt-[-7] text-xs h-5 w-5 p-0 flex justify-center items-center">
                    {wishlist.length}
                  </p>
                </div>
              </Link>
              <button className="relative text-gray-700 hover:text-[#0a1e33] transition-colors">
                {/* <ShoppingCart className="w-5 h-5" /> */}
                <ShoppingCartSidebar />
                {/* <span className="absolute -top-2 -right-2 bg-[#e3694b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  5
                </span> */}
              </button>
              <Link href="/account" className="cursor-pointer">
                <button className="text-gray-700 hover:text-[#0a1e33] transition-colors cursor-pointer">
                  <User className="w-5 h-5 cursor-pointer" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={"/"}>
              <div className="text-xl font-bold text-[#0a1e33]">DEBEBE</div>
            </Link>

            {/* Mobile Icons */}
            <div className="flex items-center space-x-4">
              <Link
                key="1"
                href="/wishlist"
                className={`font-bold transition-colors relative group capitalize`}
              >
                <div className="flex text-gray-700 hover:text-[#0a1e33] transition-colors">
                  <Heart className="w-5 h-5 text-2xl" />
                  <p className="bg-[#e3694b] text-gray-50 rounded-[50%] ml-[-7] mt-[-7] text-xs h-5 w-5 p-0 flex justify-center items-center">
                    {wishlist.length}
                  </p>
                </div>
              </Link>
              <button className="relative text-gray-700 hover:text-[#0a1e33] transition-colors">
                {/* <ShoppingCart className="w-5 h-5" /> */}
                <ShoppingCartSidebar />
                {/* <span className="absolute -top-2 -right-2 bg-[#e3694b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  5
                  </span> */}
              </button>
              <Link href="/account" className="cursor-pointer">
                <button className="text-gray-700 hover:text-[#0a1e33] transition-colors cursor-pointer">
                  <User className="w-5 h-5 cursor-pointer" />
                </button>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              {(category as any)?.data?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <Link href={`/product?category=${item.slug}`}>
                    <button
                      onClick={() =>
                        item.sub_categories && toggleSubmenu(index)
                      }
                      className="w-full flex items-center justify-between py-3 text-left text-gray-700 hover:text-[#0a1e33]"
                    >
                      <span className="font-medium">{item.name}</span>
                      {item.sub_categories && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeSubmenu === index ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  </Link>

                  {/* Mobile Submenu */}
                  {item.sub_categories && activeSubmenu === index && (
                    <div className="pl-4 pb-3 space-y-2">
                      {item.sub_categories.map(
                        (subItem: any, subIndex: number) => (
                          <Link
                            key={subIndex}
                            href={`/product?category=${item.slug}&sub_category=${subItem.slug}`}
                            className="block py-2 text-sm text-gray-600 hover:text-[#0a1e33]"
                          >
                            {subItem.slug}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
