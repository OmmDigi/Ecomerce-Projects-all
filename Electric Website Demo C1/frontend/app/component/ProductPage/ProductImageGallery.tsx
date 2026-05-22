"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProductImageGalleryProps {
  images: { image: string; alt: string | null }[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setSelectedImage(0);
  }, [images.length]);

  if (images.length === 0) return <p>No product image found</p>;

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

  return (
    <div className="bg-white p-6">
      {/* Main Image */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative mb-4 bg-gray-50 rounded overflow-hidden"
      >
        <div className="aspect-square flex items-center justify-center">
          <Image
            src={images[selectedImage]?.image ?? "/placeholder.svg"}
            alt={images[selectedImage]?.alt ?? ""}
            height={1280}
            width={1280}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        {/* <button
          className="absolute left-6 top-6 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
          aria-label="Fullscreen"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button> */}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`shrink-0 overflow-hidden rounded border-2 transition-all ${
              selectedImage === index ? "border-black" : "border-gray-200"
            }`}
          >
            <div className="h-20 w-20 bg-gray-50 flex items-center justify-center">
              <Image
                src={image.image}
                alt={image.alt ?? ""}
                className="max-h-full max-w-full object-contain"
                height={1280}
                width={1280}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
