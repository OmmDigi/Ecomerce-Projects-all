import {  Heart, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { navItems } from "../constant";
import MobileMenuBtn from "./HelperComponent/MobileMenuBtn";
import MobileCartBtn from "./HelperComponent/MobileCartBtn";
import SearchBar from "./SearchBar";
import MobileSearchBtn from "./HelperComponent/MobileSearchBtn";
import Link from "next/link";

export function MainNav() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={"/"}>
            <Image src={"/logo-1.webp"} alt="Logo" height={80} width={90} />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex font-inter items-center gap-1 text-gray-700 hover:text-black transition-colors"
              >
                {item.name}
                {item.children.length != 0 ? (
                  <ChevronDown className="w-4 h-4" />
                ) : null}
              </Link>
            ))}
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <SearchBar className="hidden md:flex lg:flex" />

            {/* Icon Buttons */}
            <div className="flex items-center gap-4">
              <MobileSearchBtn />

              <button className="hidden md:block lg:block relative hover:text-gray-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

              <MobileCartBtn />

              <Link href={"/account"} className="hidden md:block lg:block hover:text-gray-600 transition-colors">
                <User className="w-5.3 h-5.3" />
              </Link>

              <MobileMenuBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
