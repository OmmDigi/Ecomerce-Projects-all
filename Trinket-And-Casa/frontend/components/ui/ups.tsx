import React from "react";

const features = [
  {
    img: "https://niluscollection.com/cdn/shop/files/image_e8fa815c-f2c6-4aef-a330-7b8d9b056865.png?v=1759735747",
    text: "7 Day Exchange",
    width: 66,
  },
  {
    img: "/images/whyChooseUs/whychoosecar.png",
    text: "3-5 Days Delivery",
    width: 64,
  },
  {
    img: "https://niluscollection.com/cdn/shop/files/image_2.png?v=1759735874",
    text: "100% Premium Quality",
    width: 66,
  },
  {
    img: "https://niluscollection.com/cdn/shop/files/image_1.png?v=1759735874",
    text: "Trusted By 5L+ Customers Since 2018",
    width: 66,
  },
];

const FeatureSection = () => {
  return (
    <div className=" bg-white">
      <h2
        className="font-questrial text-3xl text-center md:text-4xl text-gray-800
       mt-[-100] md:mt-0 mb-5 md:mb-10 tracking-tight"
      >
        WHY CHOOSE US
      </h2>
      <section className="w-full bg-[#d9667a] py-6 border-t border-gray-200  ">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3 text-left sm:text-left"
            >
              <img
                src={item.img}
                alt={item.text}
                width={item.width}
                height={item.width}
                className="object-contain mx-auto sm:mx-0 h-10 w-10 md:h-15 md:w-15"
                loading="lazy"
              />
              <p className="text-[#ffffff] text-base font-medium font-questrial">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeatureSection;
