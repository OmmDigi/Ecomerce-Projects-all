"use client";

import { X } from "lucide-react";
import SearchBar from "./SearchBar";
import { useMobileSearchBar } from "../zustand/useMobileSearchBar";

export default function MobileSearchSidebar() {
  const { isVisiable, setVisibility } = useMobileSearchBar();
  return (
    <aside
      className={`${
        isVisiable ? "translate-y-0" : "-translate-y-[120%]"
      } md:hidden lg:hidden fixed z-100 w-full transition-all duration-500`}
    >
      <div className="min-h-96 w-full bg-white relative p-5 border-b border-b-gray-200 shadow-sm">
        <SearchBar className="w-full py-3.5! border-black!" />
        <div className="absolute -bottom-5 right-0 left-0 flex items-center justify-center">
          <button
            onClick={() => setVisibility(false)}
            className="flex items-center justify-center p-3 bg-gray-100 rounded-full"
          >
            <X />
          </button>
        </div>
      </div>
    </aside>
  );
}
