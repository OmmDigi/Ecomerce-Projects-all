import React from "react";
import { Instagram } from "lucide-react";

const images = [
  "https://bucket.useifsapp.com/posts/niluscollection_official/3743205147589861779.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3741033208934919235.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3742481474188809485.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3754800722651228145.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3754094935222098331.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3753356990702446506.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3752653350782221896.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3751178101128809744.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3750987987152877180.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3750453598690030727.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3749728652435221609.jpg",
  "https://bucket.useifsapp.com/posts/niluscollection_official/3749544049539933157.jpg",
];

const InstagramGrid = () => {
  return (
    <div id="instafeed" className="py-4 md:py-3 px-4 bg-white ">
      <h2 className="font-questrial text-3xl text-center md:text-4xl text-gray-800 mb-0 tracking-tight">
        SOCIAL MEDIA POST
      </h2>
      <script src="https://elfsightcdn.com/platform.js" async></script>{" "}
      <div
        className="elfsight-app-30c191d4-8b00-42c3-ad7a-aa1425fc970a "
        data-elfsight-app-lazy
      ></div>
      {/* <div
        className="
          grid gap-2
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-6
        "
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="
              relative w-full h-0 pb-[133%]
              overflow-hidden cursor-pointer
              group
            "
          >
            <img
              src={src}
              alt={`Instagram image ${index + 1}`}
              loading="lazy"
              className="
                absolute top-0 left-0 w-full h-full
                object-cover transition-transform
                duration-500 ease-in-out
                group-hover:scale-110
              "
            />
            <div className="absolute inset-0 from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <span className="absolute bottom-1/2 left-3/7  text-white font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Instagram size={40} />
            </span>{" "}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default InstagramGrid;
