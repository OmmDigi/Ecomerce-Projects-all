import Link from "next/link";
import React from "react";

export default function CommunityBlogSection() {
  return (
    <section className="w-full py-14 md:py-20 bg-white">
      <div className="container mx-auto px-0">
        {/* GRID */}
        <div className="md:flex">
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-[9/12] relative mt-10 lg:mt-20 px-4 ">
            {/* Heading */}
            <h2 className="text-xl md:text-3xl font-semibold text-gray-900 leading-snug mb-3 text-start">
              Join our online community
            </h2>

            {/* Description */}
            <p className="text-sm  text-gray-700 leading-relaxed mb-3 max-w-md text-start">
              We're at your side during your pregnancy and beyond. With online
              and in-person classes like I'm pregnant – Time to prep! you'll
              learn everything you need to know as your family grows.
            </p>

            {/* Link */}
            <Link
              href="#"
              className="inline-block text-start text-gray-900 text-sm md:text-base  font-medium    mb-4 hover:text-gray-700 hover:border-gray-700"
            >
              See class schedule
            </Link>

            {/* PREGNANT WOMAN IMAGE */}
            <div className=" mt-6   ">
              {/* CLOUD ICON */}

              <img
                src="https://debebe.vamtam.com/wp-content/uploads/2022/03/iStock-1286477496-1280x645.jpg"
                alt="Pregnant woman holding baby shoes"
                className="rounded-sm w-full object-cover h-[320px] md:h-[380px] lg:h-[420px]"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col relative px-4 lg:px-0">
            {/* BABY IMAGE — LOWERED MORE & SHIFTED RIGHT */}
            <div className="  lg:ml-44 mt-20 md:mt-28 lg:mt-32">
              {/* DASHED DECORATION */}
              {/* <img
                src="/dashed-line.svg"
                alt="Decorative dash pattern"
                className="absolute -top-10 -left-12 w-28 md:w-32 opacity-80 rotate-[39deg]"
              /> */}

              <img
                src="https://debebe.vamtam.com/wp-content/uploads/2022/03/iStock-1175501454.jpg"
                alt="Child sleeping with teddy bear"
                className="rounded-sm w-full object-cover shadow-md h-[360px] md:h-[420px] lg:h-[480px]"
                loading="lazy"
              />
            </div>

            {/* BLOG TITLE — ALIGNED WITH BABY IMAGE LEFT EDGE */}
            <h3 className="text-xl md:text-3xl  font-semibold text-gray-900 mt-6 md:mt-8 lg:mt-10 ml-20 md:ml-32 lg:ml-44">
              Bedtime stories from our blog
            </h3>

            {/* EXPLORE LINK */}
            <a
              href="#"
              className="inline-block text-gray-900 text-sm md:text-base font-medium mt-1 md:mt-2 ml-20 md:ml-32 lg:ml-44  hover:text-gray-700 hover:border-gray-700 transition-all duration-300"
            >
              Explore more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
