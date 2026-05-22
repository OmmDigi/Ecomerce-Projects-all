// import { ProductImageGallery } from "@/app/component/ProductPage/ProductImageGallery";
import { PaymentMethods } from "@/app/component/ProductPage/PaymentMethods";
import Varients from "@/app/component/ProductPage/Varients";
import QuantitySection from "@/app/component/ProductPage/QuantitySection";
import { FileText } from "lucide-react";
// import Link from "next/link";
import { serverApi } from "@/app/lib/serverApi";
import { IProduct, IServerRes, IVarient } from "@/app/types";
import TotalStockText from "@/app/component/ProductPage/TotalStockText";
import BuyNowButton from "@/app/component/ProductPage/BuyNowButton";
import SingleProductImages from "@/app/component/ProductPage/SingleProductImages";
import ProductRatingSection from "@/app/component/ProductPage/ProductRatingSection";

interface IProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ "varient-id"?: string }>;
}

export default async function App({ params, searchParams }: IProps) {
  const slug = (await params).slug;
  const queryParams = await searchParams;

  let product: IProduct | null = null;

  try {
    const data = (
      await serverApi.get<IServerRes<IProduct>>(`/api/v1/products/${slug}`)
    ).data;
    product = data.data;
  } catch (error) {
    console.log(error);
    return <p>Unable to find product info</p>;
  }

  if (product == null) return <p>Unable to find product info</p>;

  // calclute sale percent
  const salePercent = (
    100 -
    (parseFloat(product.price) / parseFloat(product.compare_at_price)) * 100
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-8 md:px-8 lg:px-16 font-open">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Product Image Gallery */}

          <SingleProductImages product={product}/>

          {/* Right: Product Details */}
          <div className="bg-white p-6 md:p-8">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm text-[#666]">
              <span>Home</span>
              <span>/</span>
              <span>{product.slug}</span>
            </div>

            {/* Product Title */}
            <h1 className="mb-4 text-2xl font-semibold text-[#1A1A1A]">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-3 flex items-center gap-3">
              <span className="text-2xl font-semibold text-[#1A1A1A]">
                Rs. {product.price}
              </span>
              <span className="text-lg text-[#999] line-through">
                Rs. {product.compare_at_price}
              </span>
              <span className="hidden md:block lg:block rounded bg-black px-2 py-1 text-xs font-semibold text-white">
                SALE {salePercent}%
              </span>
            </div>

            <span className="md:hidden lg:hidden inline-block mb-3 rounded bg-black px-2 py-1 text-xs font-semibold text-white">
              SALE {salePercent}%
            </span>

            {/* Rating */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-4 w-4"
                    fill={
                      star <= parseInt(product.rating) ? "#FFB800" : "#E0E0E0"
                    }
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#666]">
                ({product.total_ratings ?? 0})
              </span>
            </div>

            {/* Vendor */}
            <div className="mb-3 text-sm text-[#666]">
              <span className="font-medium">Category:</span>{" "}
              {product.category_slug}
            </div>

            {/* Stock */}
            <TotalStockText />

            <hr className="mb-6 border-[#E0E0E0]" />
            {product.options.length > 0 ? (
              <Varients varient_options={product.options} product={product} slug = {slug}/>
            ) : null}

            {/* Quantity */}
            <QuantitySection product = {product}/>

            {/* Buy It Now */}
            <BuyNowButton product={product}/>

            {/* Guaranteed safe checkout */}
            <div className="mb-4">
              <p className="mb-3 text-xs text-[#666]">
                Guaranteed safe checkout
              </p>
              <PaymentMethods />
            </div>

            <hr className="my-6 border-[#E0E0E0]" />

            {/* Links */}
            <div className="mb-6 flex gap-6 text-sm">
              <button className="underline hover:no-underline">
                Popup Text
              </button>
              <button className="underline hover:no-underline">
                Size Guide
              </button>
            </div>

            <hr className="my-6 border-[#E0E0E0]" />

            {/* Description Accordion */}
            <div className="border-b border-[#E0E0E0]">
              <button className="flex w-full items-center justify-between py-4 text-left">
                <div className="flex items-center gap-2">
                  <FileText className="size-5" />
                  <span className="font-medium">Description</span>
                </div>
              </button>

              <div className="pb-4 text-sm text-[#666]">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <ProductRatingSection product_id={product.id}/>
      </div>
    </div>
  );
}
