"use client";

import { useCollapsible } from "./Collasable";

interface IProps {
  children: React.ReactNode;
}

export default function CollasableBody({ children }: IProps) {
  const { isCollasableOpen } = useCollapsible();
  return (
    <section
      className={`${
        isCollasableOpen ? "max-h-10000" : "max-h-0"
      } overflow-hidden`}
    >
      {children}
    </section>
  );
}
