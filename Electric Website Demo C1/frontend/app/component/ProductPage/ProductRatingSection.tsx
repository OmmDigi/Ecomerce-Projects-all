import { Star } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { serverApi } from "@/app/lib/serverApi";
import { IServerRes } from "@/app/types";

interface IProps {
  product_id: number;
}

interface IReview {
  id: number;
  user_id: number;
  stars: number;
  message: string;
  status: number;
  created_at: string;
  product_id: number;
  user_name: string;
  product_name: string;
}

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
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const ProductRatingSection = async ({ product_id }: IProps) => {
  let reviews: IReview[] = [];

  try {
    const response = (
      await serverApi.get<IServerRes<IReview[]>>(
        `/api/v1/products/reviews?product_id=${product_id}`
      )
    ).data;
    reviews = response.data;
  } catch (error) {
    return <p>Unable to fetch reviews</p>;
  }

  return (
    <div className="w-full mx-auto py-8 font-open">
      {/* Rating Overview */}
      <div className="bg-white p-4 md:p-6 lg:p-6 mb-6">
        {/* <h2 className="text-2xl font-bold text-gray-900 mb-6 font-open">
          Customer Reviews
        </h2> */}

        <ReviewForm product_id={product_id} />

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-8 mt-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white px-3">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {review.user_name}
                      </span>
                      {/* {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )} */}
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.stars)}
                      <span className="text-sm text-gray-600">
                        {review.created_at}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 text-[0.9rem]">
                  {review.message}
                </p>

                {/* <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div> */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No review found!</p>
        )}
      </div>
    </div>
  );
};

export default ProductRatingSection;
