"use client";

import { Check } from "lucide-react";
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
        className={`size-4 rounded-[5px] border border-gray-800overflow-hidden`}
      >
        {isChecked ? (
          <div className="size-full bg-black flex items-center justify-center">
            <Check size={18} className="text-white" />
          </div>
        ) : null}
      </div>

      {children}
    </button>
  );
}
