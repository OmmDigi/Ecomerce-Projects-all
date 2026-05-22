"use client";

import { AxiosError } from "axios";
import { IServerRes } from "../types";
import { useMutation } from "@tanstack/react-query";
import { postFetcher } from "../lib/clientApi";
import { useCallback, useState } from "react";
import { Loader2, Star } from "lucide-react";

interface IProps {
  product_id: number;
}

export default function SubmitReviewForm({ product_id }: IProps) {
  const [reviewText, setReviewText] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

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
          //   toast.success(d.message);
        },
        onError(e) {
          //   toast.error(e.response?.data.message ?? e.message);
          alert(e.response?.data.message ?? e.message);
        },
      }
    );
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700 mb-2">
          Your Rating
        </label>
        {renderStars(userRating, true)}
      </div>

      <form className="space-y-4">
        <textarea
          className="mt-6 w-full h-40 border border-neutral-200 rounded-lg p-4"
          placeholder="Write a review"
          onChange={(e) => setReviewText(e.target.value)}
          value={reviewText}
        />
        <button
          disabled={isPending}
          onClick={handleSubmitReview}
          className="rounded disabled:opacity-55 disabled:cursor-none bg-black border border-black px-4 py-2 text-sm font-medium hover:bg-black text-white"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </>
  );
}
