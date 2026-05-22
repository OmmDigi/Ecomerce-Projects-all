"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const MarqueeBanner = ({ color, colorText }: any) => {
  const [entry, setEntry] = useState(false);
  const text =
    "4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours";

  return (
    <section className="w-full bg-black text-ambar-400  overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <div
          // style={{ backgroundColor: color }}
          onMouseEnter={() => setEntry(true)}
          onMouseLeave={() => setEntry(false)}
          className={`w-full bg-[#d9667a] flex items-center space-x-4 overflow-hidden`}
        >
          <Marquee
            speed={entry ? 0 : 60}
            direction="left"
            className="relative overflow-hidden flex-1"
          >
            <ul className="flex whitespace-nowrap animate-marquee p-0 md:p-1 gap-12 text-xl ">
              <li
                style={{ color: colorText }}
                className="text-[#fbe25e]  font-questrial"
              >
                4L + Happy Customers | Gifts For Her @ 50% OFF | Ships in 24
                hours
              </li>
              <li
                style={{ color: colorText }}
                className="text-[#fbe25e]  font-questrial"
              >
                4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24
                hours
              </li>
              <li
                style={{ color: colorText }}
                className="text-[#fbe25e] font-questrial"
              >
                4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24
                hours
              </li>
            </ul>
          </Marquee>
        </div>
      </div>
      {/* <div className="relative flex whitespace-nowrap mt-10">
        <div className="w-full bg-gray-800 flex items-center space-x-4 overflow-hidden">
          <Marquee
            speed={20}
            direction="right"
            className="relative overflow-hidden flex-1"
          >
            <ul className="flex whitespace-nowrap animate-marquee p-1 gap-12">
              <li className="text-gray-100 text-xl font-questrial">
                4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24
                hours
              </li>
              <li className="text-gray-100 text-xl font-questrial">
                4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24
                hours
              </li>
              <li className="text-gray-100 text-xl font-questrial">
                4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24
                hours
              </li>
            </ul>
          </Marquee>
        </div>
      </div> */}
    </section>
  );
};

export default MarqueeBanner;
