import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import SearchButton from "./zustandbtns/SearchButton";
import CartButton from "./zustandbtns/CartButton";
import HambargerMenuBtn from "./zustandbtns/HambargerMenuBtn";
import { navItems } from "../constant";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 font-spartan font-thin sticky top-0 self-start z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <nav className="hidden md:flex lg:flex items-center gap-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="text-gray-800 hover:text-gray-600 transition-colors text-[1rem] tracking-widest leading-5 font-normal"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="md:absolute lg:absolute md:left-1/2 lg:left-1/2 transform translate-x-0 md:-translate-x-1/2 lg:-translate-x-1/2">
            <Link href="/" className="text-4xl font-bold text-gray-900">
              Salehub
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center md:space-x-6 lg:space-x-6 space-x-3">
            {/* Search */}
            <SearchButton
              visibility={true}
              className="text-sm tracking-widest leading-5 font-normal flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors"
            >
              <Search className="md:size-4 lg:size-4 size-6 md:mb-0.5 lg:mb-0.5" />
              <span className="hidden md:block lg:block">Search</span>
            </SearchButton>

            <HambargerMenuBtn visibility = {true} className="md:hidden lg:hidden">
              <Menu />
            </HambargerMenuBtn>

            {/* Account */}
            <Link
              href="/account"
              className="md:inline-block lg:inline-block hidden text-gray-800 text-sm tracking-widest leading-5 font-normal hover:text-gray-600 transition-colors"
            >
              Account
            </Link>

            {/* Cart */}
            <CartButton visibility = {true} className="hidden md:flex lg:flex text-sm tracking-widest font-normal items-center justify-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors">
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="leading-5">My Cart</span>
            </CartButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
