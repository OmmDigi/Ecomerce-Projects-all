"use client";

import { useEffect, useState } from "react";
interface IProps {
  onChange?: (check: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  queryKey?: string;
  queryValue?: string;
  checked?: boolean;
}

export default function CustomCheckBox({
  onChange,
  children,
  className,
  queryKey,
  queryValue,
  checked = false,
}: IProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <button
      onClick={() => {
        if (queryKey != undefined && queryValue != undefined) {
          const searchParams = new URLSearchParams(window.location.search);
          if (isChecked == false) {
            searchParams.set(queryKey, queryValue);
          } else {
            searchParams.delete(queryKey);
          }

          history.pushState(null, "", `?${searchParams.toString()}`);
        }

        if (checked === undefined) {
          setIsChecked(!isChecked);
          onChange?.(!isChecked);
        }
      }}
      className={className}
    >
      <div
        className={`size-4.5 rounded-[5px] border-2 ${
          isChecked ? "border-[#bb976c]" : "border-gray-400"
        } overflow-hidden p-px`}
      >
        {isChecked ? (
          <div className="size-full bg-[#bb976c] rounded-full"></div>
        ) : null}
      </div>

      {children}
    </button>
  );
}
