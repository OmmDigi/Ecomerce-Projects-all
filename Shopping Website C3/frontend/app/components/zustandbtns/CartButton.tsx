"use client";

import { useCartSideBar } from "@/app/zustand/useCartSideBar";

interface IProps extends React.ComponentProps<"button"> {
  visibility: boolean;
}

export default function CartButton({ children, visibility, ...props }: IProps) {
  const { setVisibility, cartItems } = useCartSideBar();
  return (
    <>
      <button {...props} onClick={() => setVisibility(visibility)} className={`relative ${props.className}`}>
        {children}
        <span className="bg-[#ffe8a2] absolute -top-1.5 -right-3.5 md:block lg:block text-black text-xs font-semibold rounded-full size-5 flex items-center justify-center">
          <span className="inline-block pt-1 pl-0.5">{cartItems.length}</span>
        </span>
      </button>
    </>
  );
}
