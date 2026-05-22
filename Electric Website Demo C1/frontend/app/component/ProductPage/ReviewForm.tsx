"use client";

import { postFetcher } from "@/app/lib/clientApi";
import { IServerRes } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2, Star } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function ReviewForm({ product_id }: { product_id: number }) {
  const [showReviewForm] = useState<boolean>(true);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            strokeWidth={1}
            className={`w-5 h-5 ${
              interactive ? "cursor-pointer transition-colors" : ""
            } ${
              star <= (interactive ? hoverRating || userRating : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && setUserRating(star)}
          />
        ))}
      </div>
    );
  };

  // Refactor mutationFn to accept the URL and data
  const mutationFn = useCallback(
    async ({ url, formData }: { url: string; formData: any }) => {
      const response = await postFetcher(url, formData);
      return response;
    },
    []
  );
  const { mutate, isPending } = useMutation<
    IServerRes<any>,
    AxiosError<IServerRes>,
    { url: string; formData: any }
  >({
    mutationKey: ["manage-review"],
    mutationFn: mutationFn,
  });

  const handleSubmitReview = () => {
    if (userRating === 0) {
      alert("Please select a rating");
      return;
    }

    mutate(
      {
        url: "/api/v1/products/reviews",
        formData: {
          stars: userRating,
          message: reviewText,
          product_id,
        },
      },
      {
        onSuccess(d) {
          setUserRating(0);
          setReviewText("");
          alert("Thank you for your review. now we will review it");
          toast.success(d.message);
        },
        onError(e) {
          toast.error(e.response?.data.message ?? e.message);
        },
      }
    );
  };

  return (
    <>
      {/* Review Form */}
      {showReviewForm && (
        <div className="mt-6 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Share Your Experience
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            {renderStars(userRating, true)}
          </div>

          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="review"
              rows={4}
              value={reviewText}
              maxLength={500}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              placeholder="Tell us about your experience with this product..."
            />
          </div>

          <div className="flex gap-3">
            <button
              disabled={isPending}
              onClick={handleSubmitReview}
              className="px-6 py-2 disabled:opacity-55 disabled:cursor-none bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Submit Review"
              )}
            </button>
            {/* <button
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button> */}
          </div>
        </div>
      )}
    </>
  );
}
