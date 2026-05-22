import React from "react";
import CustomButton from "./CustomButton";

export default function VideoPromoSection() {
  return (
    <section className="aspect-video relative max-h-160 w-full overflow-hidden">
      <video autoPlay width="100%" height="auto" className="w-full">
        <source src={"/video.mp4"} type="video/mp4" />
        {/* Fallback text for browsers that don't support the video tag */}
        Sorry, your browser does not support embedded videos.
      </video>

      <div className="size-full absolute inset-0 bg-black/60 flex items-center justify-center flex-col">
        <h3 className="uppercase font-semibold text-white text-xs md:text-base lg:text-base">New arrivals</h3>

        <h2 className="font-spartan mt-0.5 md:mt-6 lg:mt-6 block text-3xl md:text-7xl lg:text-7xl font-semibold tracking-wider text-white">
          Autumn is Coming.
        </h2>
        <span className="block text-center tracking-wide md:mt-3.5 lg:mt-3.5 text-sm md:text-xl lg:text-xl text-white font-spartan">
          The 11 Biggest Autumn/Winter 2021 Trends
        </span>

        <CustomButton text="VIEW MORE" className="border-gray-300 hover:bg-white! hover:text-black! max-w-40! min-w-40!"/>
      </div>
    </section>
  );
}
