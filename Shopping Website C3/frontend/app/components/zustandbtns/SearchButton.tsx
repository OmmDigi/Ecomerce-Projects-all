"use client";

import { useSearchBar } from "@/app/zustand/useSearchBar";

interface IProps extends React.ComponentProps<"button"> {
  visibility: boolean;
}

export default function SearchButton({
  children,
  visibility,
  ...props
}: IProps) {
  const { setVisibility } = useSearchBar();
  return (
    <button {...props} onClick={() => setVisibility(visibility)}>
      {children}
    </button>
  );
}
