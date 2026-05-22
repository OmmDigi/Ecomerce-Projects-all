"use client";

import { User, X } from "lucide-react";
import Link from "next/link";
import { useUserAuth } from "@/app/zustand/useUserAuth";
import { useMobileNavSlider } from "@/app/zustand/useMobileNavSlider";
import { navItems } from "@/app/constant";

export default function MobileSidebar() {
  const { setVisibility, isVisiable } = useMobileNavSlider();

  const { isAuthanticated } = useUserAuth();

  return (
    <aside
      onClick={() => {
        setVisibility(false);
      }}
      className={`fixed top-0 bottom-0 min-h-screen min-w-full z-60 ${
        isVisiable ? "translate-x-0" : "translate-x-full"
      } transition-all duration-500 flex justify-end items-start`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full bg-white w-72 border-l border-gray-200 shadow-sm"
      >
        {/* <h1 className="relative font-open font-bold text-3xl leading-9 tracking-wider bg-gray-100 p-5">
          Elexy Shopify Theme
          <X
            onClick={() => setVisibility(false)}
            className="absolute top-5 right-6"
            size={30}
          />
        </h1> */}

        <div className="flex items-center justify-center min-h-40 text-black bg-[#ffe8a3]">
          <X onClick={() => setVisibility(false)} size={18} />
        </div>

        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                onClick={() => {
                  setVisibility(false);
                }}
                href={item.link}
                className="block px-5 py-3.5 font-spartan font-semibold border-b border-gray-300"
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li>
            <Link
              onClick={() => {
                setVisibility(false);
              }}
              href={isAuthanticated ? "/account" : "/auth/login"}
              className="px-5 py-3.5 font-inter font-spartan font-semibold border-b border-gray-300 flex items-center gap-1.5"
            >
              {/* <User />{" "} */}
              {isAuthanticated ? <span>Account</span> : <span>Log in</span>}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
