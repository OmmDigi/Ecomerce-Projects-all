"use client";

import { useCollapsible } from "./Collasable";

interface IProps {
  children: React.ReactNode;
}
export default function CollasableCloseBtn({ children }: IProps) {
  const { isCollasableOpen, toggleCollasable } = useCollapsible();

  return isCollasableOpen == true ? (
    <button onClick={() => toggleCollasable(false)}>{children}</button>
  ) : null;
}
