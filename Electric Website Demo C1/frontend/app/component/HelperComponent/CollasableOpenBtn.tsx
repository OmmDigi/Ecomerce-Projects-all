"use client";

import { useCollapsible } from "./Collasable";

interface IProps {
  children: React.ReactNode;
}
export default function CollasableOpenBtn({ children }: IProps) {
  const { isCollasableOpen, toggleCollasable } = useCollapsible();

  return isCollasableOpen == false ? (
    <button onClick={() => toggleCollasable(true)}>{children}</button>
  ) : null;
}
