import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";

export default function ClientReview() {
  return (
    <section className="bg-[#f5f3ee] relative w-full md:max-h-160 lg:max-h-160 max-h-max py-20">
      <div className="container px-4 mx-auto flex items-start md:flex-row lg:flex-row flex-col gap-10 size-full">
        <div>
          <span className="block space-y-4">
            <h2 className="text-xs uppercase font-spartan font-medium tracking-wide">
              WHAT CUSTOMER SAY ABOUT US
            </h2>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill="#000" strokeWidth={0.5} />
              ))}
            </div>
          </span>

          <p className="text-3xl font-spartan font-light tracking-wide leading-11 mt-14">
            Best purchase I’ve made this winter! The color and knitting are
            exquisite and it's so comfy! Went from NYC to Miami without ever
            taking it off. Super cute!!
          </p>

          <span className="inline-block mt-10 font-light font-spartan text-lg text-gray-600">
            — Christina M. / From Canada
          </span>
        </div>
        <Image
          className="md:size-120 lg:size-120 size-100"
          src={"/images/review_image1.webp"}
          alt="Client Review Image"
          height={1920}
          width={1920}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2.5 absolute bottom-8 left-10">
        <button>
          <ChevronRight className="rotate-180" />
        </button>

        <button>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
