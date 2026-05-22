"use client";

import { X } from "lucide-react";
import React from "react";
import { useProductFilterSlider } from "@/app/zustand/useProductFilterSlider";

interface IProps {
  categoryComponent: React.ReactNode;
}

export default function FilterBySlider({ categoryComponent }: IProps) {
  const { isVisiable, setVisibility } = useProductFilterSlider();
  return (
    <aside
      onClick={() => {
        setVisibility(false);
      }}
      className={`fixed top-0 bottom-0 min-h-screen min-w-full z-60 ${
        isVisiable ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-500 flex justify-start items-start`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full bg-white w-87 border-r border-r-gray-200 shadow-2xl"
      >
        <h1 className="relative font-open font-bold text-3xl leading-9 tracking-wider bg-gray-100 p-5">
          Filter
          <X
            onClick={() => setVisibility(false)}
            className="absolute top-5 right-6"
            size={30}
          />
        </h1>

        <div className="p-5 space-y-5">
          {categoryComponent}

          <div className="flex items-center justify-end mr-4">
            <button className="border-black! text-black! py-1.5">Apply</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
