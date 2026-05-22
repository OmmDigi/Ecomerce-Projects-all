import Link from "next/link";
import { Star } from "lucide-react";
import ProductBanner from "./ProductBanner";
import { IProduct } from "../types";
import ShareButton from "./ProductPage/ShareButton";

interface IProps {
  product: IProduct;
}

export default function ProductItem({ product }: IProps) {
  return (
    <li className="shadow-lg rounded-2xl">
      <Link href={`/products/${product.slug}`}>
        <div className="bg-gray-100 aspect-square h-48 md:h-72 lg:h-72 rounded-lg overflow-hidden w-full relative">
          {product.images.length > 0 ? (
            <ProductBanner
              images={product.images.map((item) => ({
                image: item.image,
                alt_tag: item.alt_tag ?? undefined,
              }))}
            />
          ) : null}

          <div className="absolute top-3.5 right-3.5 flex items-center gap-2.5">
            {/* <button className="bg-white p-2 rounded-full cursor-pointer">
              <Heart strokeWidth={1} size={18} />
            </button> */}
            <ShareButton productSlug={product.slug} />
          </div>
        </div>

        <div className="px-6 space-y-2 py-7">
          <h2 className="font-open font-bold line-clamp-2">{product.name}</h2>
          <p className="flex items-start md:items-center lg:items-center gap-x-2.5 font-sans flex-col md:flex-row lg:flex-row">
            <span>Rs. {product.price}</span>
            <span className="line-through text-gray-400">
              Rs. {product.compare_at_price}
            </span>
          </p>

          <div className="flex justify-between flex-col-reverse md:items-center lg:items-center md:flex-row lg:flex-row">
            <button className="hidden md:inline-flex lg:inline-flex font-semibold font-open text-sm border mt-1.5  border-gray-800 px-5 py-1.5 rounded-md items-center gap-1.5">
              View Product
            </button>

            <button className="md:hidden lg:hidden font-semibold font-open text-sm text-center border mt-1.5  border-gray-800 px-5 py-1.5 rounded-md inline-flex items-center justify-center gap-1.5">
              View
            </button>

            <div className="flex items-center gap-1 font-inter font-300">
              <Star strokeWidth={1.2} size={12} fill="#000000" />
              <span className="text-sm">
                {parseFloat(product.rating).toFixed(1)}{" "}
                <span className="text-xs">({product.total_ratings})</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
