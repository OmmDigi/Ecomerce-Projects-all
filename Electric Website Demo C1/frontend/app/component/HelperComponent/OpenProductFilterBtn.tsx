"use client";

import { useProductFilterSlider } from "@/app/zustand/useProductFilterSlider";

export default function OpenProductFilterBtn({
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { setVisibility } = useProductFilterSlider();
  return (
    <button {...props} onClick={() => setVisibility(true)}>
      {children}
    </button>
  );
}
