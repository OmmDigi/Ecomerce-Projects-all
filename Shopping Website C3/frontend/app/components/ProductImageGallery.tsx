"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProductImageGalleryProps {
  images: { image: string; alt: string | null }[];
  salePercent: string;
}

export function ProductImageGallery({
  images,
  salePercent,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goNext = () => {
    setSelectedImage((prev) => {
      if (prev >= images.length - 1) return 0;
      return prev + 1;
    });
  };

  const goPrev = () => {
    setSelectedImage((prev) => {
      if (prev <= 0) return images.length - 1;
      return prev - 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Define a minimum distance for a valid swipe

    if (distance > minSwipeDistance) {
      //swipe left
      goNext();
    } else if (distance < -minSwipeDistance) {
      //swipe right
      goPrev();
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    setSelectedImage(0);
  }, [images.length]);

  if (images.length === 0) return <p>No product image found</p>;

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 h-full">
      {/* Thumbnails */}
      <div className="pb-3 self-start w-full md:w-auto lg:w-auto flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible max-w-full">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`shrink-0 w-20 h-24 md:border lg:border border-gray-400 overflow-hidden transition-all duration-200 ${
              selectedImage === index
                ? "opacity-100 scale-105"
                : "opacity-50 scale-100"
            }`}
          >
            <Image
              src={img.image}
              alt={img.alt ?? ""}
              className="w-full h-full object-cover"
              height={1280}
              width={1280}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 group">
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative overflow-hidden bg-gray-100"
        >
          <Image
            src={images[selectedImage]?.image ?? "/placeholder.svg"}
            alt={images[selectedImage]?.alt ?? ""}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            height={1280}
            width={1280}
          />

          {/* Image Navigation */}
          <button
            onClick={() => {
              setSelectedImage((prev) =>
                prev > 0 ? prev - 1 : images.length - 1
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => {
              setSelectedImage((prev) =>
                prev < images.length - 1 ? prev + 1 : 0
              );
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>

          {/* Sale Badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{salePercent}%
          </div>
        </div>

        {/* Image Counter */}
        <div className="text-center mt-3 text-sm text-gray-600">
          {selectedImage + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
