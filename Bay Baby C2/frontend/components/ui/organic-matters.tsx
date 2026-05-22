import React from "react";
import { ArrowRight } from "lucide-react";

export default function OrganicMatters() {
  return (
    <section className="min-h-screen bg-white flex items-stretch">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Column - Content */}
          <div className="bg-amber-50 flex items-center px-8 md:px-12 lg:px-16 py-16 lg:py-24">
            <div className="max-w-xl text-left">
              <h6 className="text-amber-800 uppercase tracking-widest text-xs md:text-sm font-medium mb-4">
                our story
              </h6>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Why organic matters
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                A baby's skin isn't just sensitive—it actually absorbs more of
                everything it touches. It's why we searched for a GOTS-certified
                organic cotton in its purest form. Conventional cotton is
                produced with a lot of chemicals, but ours is free of all the
                yuck.
              </p>

              <a
                href="/about/"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm md:text-base font-medium"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="min-h-[400px] lg:min-h-full">
            <img
              src="https://debebe.vamtam.com/wp-content/uploads/2022/03/iStock-987484566.jpg"
              alt="Organic cotton baby"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
