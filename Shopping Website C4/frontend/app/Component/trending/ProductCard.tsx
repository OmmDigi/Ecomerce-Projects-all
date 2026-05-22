"use client";
import { useState, useRef, useEffect } from "react";
import { Eye, ShoppingCart, Heart, Shuffle } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";

const ProductCard = ({
  product,
  ids,
  image,
  hoverImage,
  colors,
  name,
  price,
  slug,
}: any) => {
  const [loadingIcon, setLoadingIcon] = useState(null);
  const [currentImage, setCurrentImage] = useState(hoverImage);
  const imgRef = useRef(null);
  const { wishlist, toggleWishlist } = useWishlistStore();

  console.log("setLoadingIcon2222", wishlist);
  console.log("hoverImage111111", product);

  const handleIconClick = (type: any) => {
    setLoadingIcon(type);

    setTimeout(() => {
      setLoadingIcon(null);
      if (type === "wish") {
        // flyImageToCart();
        toggleWishlist(product);
      }
    }, 100);
  };

  const flyImageToCart = () => {
    const img: any = imgRef.current;
    const cart = document.getElementById("floating-cart");
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = img.cloneNode(true);
    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.transition = "all 0.8s ease-in-out";
    flyingImg.style.zIndex = 9999;
    flyingImg.style.borderRadius = "12px";

    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "30px";
      flyingImg.style.height = "30px";
      flyingImg.style.opacity = "0.5";
    });

    setTimeout(() => flyingImg.remove(), 900);
  };

  return (
    <div
      className="text-center group text-gray-800"
      onMouseEnter={() => hoverImage && setCurrentImage(hoverImage)}
      onMouseLeave={() => setCurrentImage(image)}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative bg-gray-100  overflow-hidden h-80">
        <Link href={`/product/${slug}`}>
          <img
            ref={imgRef}
            src={currentImage ? currentImage : image}
            alt={name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </Link>

        {/* COLOR VARIANTS (vertical, left side) */}
        {colors && (
          <div className="absolute top-6 left-4 flex flex-col gap-2 z-10">
            {colors.map((color: any, index: number) => (
              <button
                key={index}
                className="
                  w-4
                  h-4
                  rounded-full
                  border
                  border-transparent
                  hover:border-black
                  transition-colors
                  duration-200
                  "
                style={{ backgroundColor: color }}
                aria-label="color variant"
              />
            ))}
          </div>
        )}

        {/* ICONS */}

        <div
          onClick={() => flyImageToCart()}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0        group-hover:opacity-100 transition-opacity"
        >
          <IconButton onClick={() => handleIconClick("wish")}>
            {loadingIcon === "wish" ? (
              <Spinner />
            ) : (
              <Heart
                className={`w-3 h-3 md:w-5 md:h-5 ${
                  wishlist.some((w) => w?.id === product?.id)
                    ? "fill-[#e3694b] text-[#e3694b]"
                    : "text-gray-400"
                }`}
                size={16}
              />
            )}
          </IconButton>
        </div>

        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0        group-hover:opacity-100 transition-opacity">
          <IconButton onClick={() => handleIconClick("wish")}>
            {loadingIcon === "wish" ? (
              <Spinner />
            ) : (
              <Heart
                onClick={() => toggleWishlist(product)}
                className={`w-3 h-3 md:w-5 md:h-5 ${
                  wishlist.some((item) => item?.id == product.id)
                    ? "fill-[#e3694b] text-[#e3694b]"
                    : "text-gray-400"
                }`}
                size={16}
              />
            )}
          </IconButton>
        </div> */}
      </div>

      {/* PRODUCT INFO */}
      <h3 className="mt-4 text-base font-medium">{name}</h3>
      <p className="text-gray-600 text-sm">{price}</p>
    </div>
  );
};

const IconButton = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="
      w-10 h-10 rounded-full bg-white
      flex items-center justify-center
      shadow transition-all duration-300
      hover:-translate-y-1 hover:bg-gray-300
    "
  >
    {children}
  </button>
);

const Spinner = () => (
  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
);

export default ProductCard;
