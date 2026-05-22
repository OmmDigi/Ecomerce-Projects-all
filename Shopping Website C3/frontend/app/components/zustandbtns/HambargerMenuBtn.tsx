"use client";

import { useMobileNavSlider } from "@/app/zustand/useMobileNavSlider";

interface IProps extends React.ComponentProps<"button"> {
  visibility: boolean;
}

export default function HambargerMenuBtn({
  children,
  visibility,
  ...props
}: IProps) {
  const { setVisibility } = useMobileNavSlider();
  return (
    <button {...props} onClick={() => setVisibility(visibility)}>
      {children}
    </button>
  );
}
