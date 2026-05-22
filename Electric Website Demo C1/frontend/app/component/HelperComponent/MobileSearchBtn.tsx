"use client";

import { useMobileSearchBar } from "@/app/zustand/useMobileSearchBar";
import { Search } from "lucide-react";

export default function MobileSearchBtn() {
  const { setVisibility } = useMobileSearchBar();
  return (
    <button onClick={() => setVisibility(true)} className="md:hidden lg:hidden">
      <Search size={23} />
    </button>
  );
}
