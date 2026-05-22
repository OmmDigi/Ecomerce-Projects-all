import React from "react";
import { Cloud, MoveRight } from "lucide-react";
import Link from "next/link";

export default function BabyCollections() {
  return (
    <>
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            {/* Left Column - Empty on mobile (hidden) */}
            <div className="hidden md:block">
              {/* This column is intentionally empty as per original design */}
            </div>

            {/* Right Column - Content */}
            <div>
              {/* Subtitle */}
              <div className="animate-slideDown">
                <h6 className="text-xs uppercase tracking-widest  text-[#0a1e33] mb-2">
                  made with love
                </h6>
              </div>

              {/* Main Heading */}
              <div className="animate-fadeInSlow">
                <h2 className="text-2 md:text-3xl  font-bold text-slate-800 leading-tight">
                  Explore our
                  <br />
                  <span className="text-[#0a1e33] bg-clip-text  ">
                    collections
                  </span>
                </h2>
              </div>

              {/* Optional decorative element */}
              <div className="pt-1">
                <div className="w-20 h-1 bg-[] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-1">
          <div className="md:flex md:gap-40 items-center">
            {/* Left Column - Mix & Match Magic */}
            <div className="relative md:w-[40%] py-5">
              <div className="relative group cursor-pointer overflow-hidden rounded-sm shadow-xl">
                <img
                  src="https://debebe.vamtam.com/wp-content/uploads/2022/03/iStock-1097283418.jpg"
                  alt="Baby in colorful outfit"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="mt-6 text-center md:text-left">
                <h3 className="text-xs xl:text-xl font-bold text-slate-800 mb-4">
                  Mix & Match Magic
                </h3>
                <Link href={`/product`}>
                  <button className="inline-flex items-center gap-2  text-[#0a1e33]  rounded-full font-semibold transition-all duration-300  hover:scale-105">
                    Shop now
                    <MoveRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>

              {/* Decorative Cloud Icon */}
              {/* <div className="absolute -right-4 top-20 text-blue-200 opacity-50 animate-pulse">
                <Cloud className="w-24 h-24" />
              </div> */}
            </div>

            {/* Right Column - Cute & Comfy */}
            <div className="relative md:w-[70%] py-5">
              {/* Decorative Giraffe */}
              <div className="absolute bottom-[100] -left-8 z-10  hidden md:block transition-all duration-300 hover:scale-105 animate-bounceIn ">
                {/* <svg width="100" height="160" viewBox="0 0 138 221" fill="none">
                  <rect
                    x="50"
                    y="80"
                    width="38"
                    height="120"
                    fill="#F4A460"
                    rx="10"
                  />
                  <circle cx="69" cy="50" r="35" fill="#F4A460" />
                  <rect
                    x="52"
                    y="85"
                    width="8"
                    height="12"
                    fill="#8B4513"
                    rx="2"
                  />
                  <rect
                    x="78"
                    y="85"
                    width="8"
                    height="12"
                    fill="#8B4513"
                    rx="2"
                  />
                  <rect
                    x="60"
                    y="105"
                    width="8"
                    height="12"
                    fill="#8B4513"
                    rx="2"
                  />
                  <rect
                    x="70"
                    y="125"
                    width="8"
                    height="12"
                    fill="#8B4513"
                    rx="2"
                  />
                  <circle cx="62" cy="45" r="3" fill="#000" />
                  <circle cx="76" cy="45" r="3" fill="#000" />
                  <rect
                    x="40"
                    y="15"
                    width="12"
                    height="25"
                    fill="#F4A460"
                    rx="6"
                  />
                  <rect
                    x="86"
                    y="15"
                    width="12"
                    height="25"
                    fill="#F4A460"
                    rx="6"
                  />
                  <circle cx="46" cy="12" r="6" fill="#8B4513" />
                  <circle cx="92" cy="12" r="6" fill="#8B4513" />
                </svg> */}
                <img
                  src="/body/giraffe.svg"
                  alt="Lion illustration"
                  className="w-full h-auto "
                />
              </div>

              {/* Decorative Doodle */}
              <div className="absolute -bottom-4 -right-4 text-slate-800 opacity-20">
                <svg width="150" height="120" viewBox="0 0 187 164">
                  <path
                    d="M10,80 Q50,20 90,80 T170,80"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20,100 Q60,40 100,100 T180,100"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="45" cy="50" r="8" fill="currentColor" />
                  <circle cx="125" cy="50" r="6" fill="currentColor" />
                  <circle cx="85" cy="110" r="10" fill="currentColor" />
                </svg>
              </div>

              <div className="relative group cursor-pointer overflow-hidden rounded-sm shadow-xl">
                <img
                  src="https://debebe.vamtam.com/wp-content/uploads/2022/03/pexels-ksenia-chernaya-3951808.jpg"
                  alt="Baby relaxing comfortably"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="mt-6 text-center md:text-left">
                <h3 className="text-xs xl:text-xl font-bold text-slate-800 mb-4">
                  Cute & Comfy
                </h3>
                <Link href={`/product`}>
                  <button className="inline-flex items-center gap-2  text-[#0a1e33] font-semibold transition-all duration-300  hover:scale-105">
                    Shop now
                    <MoveRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
