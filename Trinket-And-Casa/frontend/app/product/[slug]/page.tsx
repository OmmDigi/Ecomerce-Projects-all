"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import useSWR from "swr";
import { getFetcher, postFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import { message } from "antd";
import { useIsLoggedIn } from "@/store/useUserStore";

export default function ProductDetailPage() {
  const isLoggedIn = useIsLoggedIn();
  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams<{ slug: string | undefined }>();

  const [mainImage, setMainImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const {
    addToCart,
    removeFromCart,
    updateQuantity,
    cart,
    isInCart,
    getItemQty,
  } = useCartStore();

  const {
    data: product,
    isLoading: loadingProducts,
    error: errorProduct,
  } = useSWR(`api/v1/products/${params?.slug}`, getFetcher);

  const {
    data: productReview,
    isLoading: loadingProductReview,
    error: errorProductReview,
    mutate: mutateProductReview,
  } = useSWR(
    `api/v1/products/reviews?product_id=${product?.data?.id}`,
    getFetcher
  );
  console.log("productReview", productReview);

  const { trigger: sendReating } = useSWRMutation(
    "api/v1/products/reviews",
    (url, { arg }) => postFetcher(url, arg)
  );

  // handle submit review
  const handleSubmitReview = async () => {
    const newReview = {
      stars: rating,
      message: comment,
      product_id: product?.data?.id,
    };
    // console.log("rating", rating, comment);

    try {
      const response = await sendReating(newReview as any);
      messageApi.open({
        type: "success",
        content: response.message,
      });
      mutateProductReview();
      setRating(1);
      setComment("");
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err.response.data.message,
      });
    }
  };

  // Set default main image once product loads
  useEffect(() => {
    if (product?.data?.images?.length > 0) {
      setMainImage(product.data.images[0].image);
    }
  }, [product]);

  // 🔥 Match Variant based on selected options
  useEffect(() => {
    if (product?.data?.variants) {
      const match = product.data.variants.find((v: any) =>
        v.combination.every((value: string) =>
          Object.values(selectedOptions).includes(value)
        )
      );
      setSelectedVariant(match || null);
    }
  }, [selectedOptions]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-black">Loading...</p>
      </div>
    );
  }

  const fullProduct = product.data;

  const allOptionsSelected = fullProduct.options?.every(
    (opt: any) => selectedOptions[opt.name]
  );
  const variantId = selectedVariant?.id || null;
  const itemAlreadyInCart = isInCart(fullProduct.id, variantId);
  const cartQuantity = getItemQty(fullProduct.id, variantId);
  const getAvailableStock = () => {
    if (selectedVariant) return Number(selectedVariant.quantity);
    return Number(fullProduct.available_quantity || 1);
  };
  const handleSelectOption = (name: string, value: string) => {
    setSelectedOptions((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    const variantId = selectedVariant?.id || null;

    // 🛑 Requires selecting all options when variants exist
    if (fullProduct.options?.length > 0 && !allOptionsSelected) {
      alert("Select all options first!");
      return;
    }

    // Check if item with same variant already exists
    const alreadyAdded = isInCart(fullProduct.id, variantId);

    if (alreadyAdded) {
      removeFromCart(fullProduct.id, variantId);
      return;
    }

    // 🔥 Build the final cart item with variant data
    const itemToAdd = {
      ...fullProduct,
      variant_id: variantId,
      price: selectedVariant?.price || fullProduct.price,
      compare_at_price:
        selectedVariant?.compareAtPrice || fullProduct.compare_at_price,
      stock: selectedVariant?.quantity || fullProduct.available_quantity,
      images:
        selectedVariant?.images?.length > 0
          ? selectedVariant.images
          : fullProduct.images,
      options: selectedOptions,
    };

    addToCart(itemToAdd, variantId, 1);
  };

  const trimMessage = (text: string, wordLimit: number = 4) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " •••";
  };

  const openModal = (img: string) => {
    setZoomImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setZoomImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-10 font-questrial">
      {contextHolder}
      <div className="container mx-auto px-4 flex flex-col  gap-12">
        <div className=" md:flex md:gap-10">
          {/* LEFT - Images */}
          <div className="lg:w-1/2 flex flex-col items-center md:sticky md:top-30 md:h-fit">
            <div
              className="w-full max-w-md border rounded-2xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => openModal(mainImage)}
            >
              <img
                src={
                  selectedVariant?.images?.[0]?.image
                    ? mainImage || selectedVariant.images[0].image
                    : mainImage
                }
                className="w-full h-[420px] object-cover"
              />
            </div>

            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {(selectedVariant?.images?.length
                ? selectedVariant.images
                : fullProduct.images
              ).map((img: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img.image)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    mainImage === img.image
                      ? "border-[#d9667a]"
                      : "border-gray-300"
                  }`}
                >
                  <img src={img.image} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - Product Info */}
          <div className="lg:w-1/2  space-y-6">
            <h1 className="text-xl font-bold">{fullProduct.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#f7889b]">
                ₹{selectedVariant?.price || fullProduct.price}
              </span>

              {fullProduct.compare_at_price && (
                <span className="line-through text-gray-400 text-lg">
                  ₹
                  {selectedVariant?.compareAtPrice ||
                    fullProduct.compare_at_price}
                </span>
              )}
              <div className="flex items-center gap-1">
                <span className="text-amber-500">★</span>
                <span className="text-sm text-gray-600">
                  {parseFloat(fullProduct?.rating ?? "0.0").toFixed(1)} (
                  {fullProduct?.total_ratings})
                </span>
              </div>
            </div>

            {/* Variant Options */}
            {fullProduct.options?.map((opt: any, index: number) => (
              <div key={opt.id}>
                <h3 className="font-semibold mb-2">Select {opt.name}</h3>

                <div className="flex gap-4 flex-wrap">
                  {opt.values.map((val: any) => (
                    <button
                      key={val.id}
                      onClick={() => handleSelectOption(opt.name, val.value)}
                      className={`px-4 py-2 rounded-lg border font-semibold ${
                        selectedOptions[opt.name] === val.value
                          ? "border-[#d9667a] text-[#d9667a]"
                          : "border-gray-300"
                      }`}
                    >
                      {val.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity + Add to Cart */}
            <div className="flex justify-between">
              <div>
                {itemAlreadyInCart && (
                  <div className="flex items-center gap-4">
                    <button
                      className="px-3 py-2 border rounded-lg"
                      onClick={() => {
                        if (cartQuantity > 1) {
                          updateQuantity(
                            fullProduct.id,
                            variantId,
                            cartQuantity - 1
                          );
                        }
                      }}
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">{cartQuantity}</span>

                    <button
                      className="px-3 py-2 border rounded-lg"
                      onClick={() => {
                        const stock = getAvailableStock();
                        if (cartQuantity < stock) {
                          updateQuantity(
                            fullProduct.id,
                            variantId,
                            cartQuantity + 1
                          );
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              <button
                disabled={!allOptionsSelected}
                onClick={handleAddToCart}
                className={`w-[50%] py-3 rounded-lg  text-white font-semibold ${
                  !allOptionsSelected
                    ? "bg-gray-300"
                    : itemAlreadyInCart
                    ? "bg-gray-500"
                    : "bg-[#d9667a]"
                }`}
              >
                {itemAlreadyInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Description</h1>
              <div
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{ __html: fullProduct.description }}
              />
            </div>
          </div>
        </div>

        {/* Reviews section  */}
        <div className="lg:flex gap-5">
          <div className="mt-10 lg:w-1/2 h-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>

            {/* Rating Stars */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    star <= rating ? "text-pink-400" : "text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* Comment Input */}
            <textarea
              disabled={!isLoggedIn}
              className="w-full border rounded-lg p-3 mb-4"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />

            <button
              disabled={!isLoggedIn}
              onClick={handleSubmitReview}
              className={`px-6 py-3 ${
                isLoggedIn ? "bg-[#d9667a]" : "bg-gray-300"
              }  text-white rounded-lg font-semibold cursor-pointer`}
            >
              Submit Review
            </button>
          </div>

          {/* Reviews Table */}
          {productReview?.data?.length > 0 && (
            <div className="mt-8 lg:w-1/2 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Rating</th>
                    <th className="py-2 text-left">Comment</th>
                    <th className="py-2 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {productReview?.data?.map((reating: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 font-semibold text-yellow-500">
                        {"★".repeat(reating.stars)}
                      </td>

                      <td
                        className="py-3 cursor-pointer hover:text-[#d9667a] transition"
                        onClick={() => {
                          setPopupMessage(reating.message);
                          setShowPopup(true);
                        }}
                      >
                        {trimMessage(reating.message, 4)}
                      </td>
                      <td className="py-3">{reating.created_at}</td>
                    </tr>
                  ))}
                </tbody>
                {showPopup && (
                  <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowPopup(false)}
                  >
                    <div
                      className="bg-white p-6 rounded-xl max-w-md w-[90%] shadow-lg relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="absolute top-3 right-3 text-gray-500"
                        onClick={() => setShowPopup(false)}
                      >
                        ✕
                      </button>

                      <h3 className="text-xl font-bold mb-3">Full Review</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {popupMessage}
                      </p>
                    </div>
                  </div>
                )}
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && zoomImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-2xl w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white p-2 rounded-full"
            >
              <X />
            </button>

            <img
              src={zoomImage}
              className="w-full object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
