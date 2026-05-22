import { Star } from "lucide-react";
import { IProduct, IReview, IServerRes } from "../types";
import { serverApi } from "../lib/serverApi";
import PaginitionButton from "./PaginitionButton";
import SubmitReviewForm from "./SubmitReviewForm";

const reviews = [
  {
    id: 1,
    name: "James K.",
    date: "2 days ago",
    stars: 5,
    title: "Perfect classic shirt",
    body: "True to size, great quality denim. Already ordered a second one.",
  },
  {
    id: 2,
    name: "Sarah M.",
    date: "1 week ago",
    stars: 4,
    title: "Nice but runs slightly large",
    body: "Love the wash, however I recommend sizing down if you prefer a slimmer fit.",
  },
  {
    id: 3,
    name: "Carlos R.",
    date: "2 weeks ago",
    stars: 5,
    title: "Worth every penny",
    body: "Heavyweight denim, solid stitching. This will last for years.",
  },
];

interface IProps {
  product: IProduct;
}

export default async function ReviewSection({ product }: IProps) {
  let reviews: IReview[] = [];

  try {
    const response = (
      await serverApi.get<IServerRes<IReview[]>>(
        `/api/v1/products/reviews?product_id=${product.id}`
      )
    ).data;
    reviews = response.data;
  } catch (error) {
    return <p>Unable to fetch reviews</p>;
  }

  return (
    <section className="mt-16 border-t border-neutral-200 pt-10">
      <SubmitReviewForm product_id={product.id} />

      {/* Rating bars */}
      {/* <div className="mt-6 grid max-w-xl gap-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <span className="w-12">{stars} star</span>
            <div className="h-2 flex-1 rounded-full bg-neutral-200">
              <div
                className="h-2 rounded-full bg-yellow-400"
                style={{
                  width:
                    stars === 5
                      ? "80%"
                      : stars === 4
                      ? "15%"
                      : stars === 3
                      ? "3%"
                      : "1%",
                }}
              />
            </div>
            <span className="w-10 text-neutral-500">
              {stars === 5
                ? "102"
                : stars === 4
                ? "19"
                : stars === 3
                ? "4"
                : "1"}
            </span>
          </div>
        ))}
      </div> */}

      {/* Individual reviews */}
      <h2 className="text-2xl font-semibold mt-6">Customer Reviews</h2>

      <div className="space-y-8">
        {reviews.length == 0 ? (
          <p className="text-gray-600 font-spartan">No reviews found</p>
        ) : (
          reviews.map((r) => (
            <article key={r.id} className="border-b border-neutral-200 pb-6 mt-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{r.user_name}</p>
                  <p className="text-sm text-neutral-500">{r.created_at}</p>
                </div>
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <Star
                      key={star}
                      size={15}
                      className={`${
                        star <= parseInt(product.rating)
                          ? "fill-yellow-400 text-yellow-400`"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* <h3 className="mt-3 font-medium">{r.use}</h3> */}
              <p className="mt-2 text-neutral-700">{r.message}</p>
              {/* <div className="mt-3 flex gap-4 text-sm">
              <button className="text-neutral-500 hover:underline">
                Helpful
              </button>
              <button className="text-neutral-500 hover:underline">
                Report
              </button>
            </div> */}
            </article>
          ))
        )}
      </div>

      {/* Load more */}
      {/* <div className="mt-8 text-center">
        <button className="rounded border border-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white">
          Load more reviews
        </button>
      </div> */}

      <PaginitionButton maxLimit={10} totalItems={reviews.length} />
    </section>
  );
}
