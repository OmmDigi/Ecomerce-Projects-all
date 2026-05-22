"use client";

import { useMobileNavSlider } from "@/app/zustand/useMobileNavSlider";
import { Menu } from "lucide-react";

export default function MobileMenuBtn() {
  const { setVisibility } = useMobileNavSlider();
  return (
    <button onClick={() => setVisibility(true)} className="md:hidden lg:hidden">
      <Menu />
    </button>
  );
}
