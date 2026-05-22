import BuyNowButton from "@/app/components/Product/BuyNowButton";
import Description from "@/app/components/Product/Description";
import Options from "@/app/components/Product/Options";
import QuantitySection from "@/app/components/Product/QuantitySection";
import SingleProductImages from "@/app/components/Product/SingleProductImages";
import ReviewSection from "@/app/components/ReviewSection";
import ShareButton from "@/app/components/ShareButton";
import TotalStockText from "@/app/components/TotalStockText";
import { serverApi } from "@/app/lib/serverApi";
import { IProduct, IServerRes } from "@/app/types";
import { Package, Shield, Star, Truck } from "lucide-react";

interface IProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ "varient-id"?: string }>;
}

export default async function page({ params, searchParams }: IProps) {
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
    <div className="min-h-screen bg-liner-to-br from-gray-50 to-gray-100 *:font-spartan">
      <div className="container mx-auto px-5 pb-12 pt-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span className="hover:text-gray-700 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Essential Western Denim Shirt</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:p-10">
          {/* Left Side - Images */}
          <div className="md:sticky lg:sticky top-24 self-start">
            <SingleProductImages product={product} salePercent={salePercent} />
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                {/* <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart
                    size={24}
                    className={
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button> */}
              </div>

              {/* Rating */}
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={`${
                        star <= parseInt(product.rating)
                          ? "fill-yellow-400 text-yellow-400`"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.total_ratings ?? 0} reviews)
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800 underline font-medium">
                  Write a review
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline flex-wrap gap-3">
                <span className="text-4xl font-semibold text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  ₹{product.compare_at_price}
                </span>
                <span className="bg-green-100 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  -{salePercent}%
                </span>
              </div>
            </div>

            {/* Product Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  SKU
                </span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {product.sku_id}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Availability
                </span>
                <TotalStockText />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Category
                </span>
                <p className="text-sm text-gray-700 mt-1">
                  {product.category_slug}
                </p>
              </div>
            </div>

            {product.options.length > 0 ? (
              <Options
                varient_options={product.options}
                product={product}
                slug={slug}
              />
            ) : null}

            {/* Quantity and Add to Cart */}
            <QuantitySection product={product} />

            <BuyNowButton product={product} />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
              <div className="text-center">
                <Package className="mx-auto mb-2 text-blue-600" size={32} />
                <p className="text-xs font-semibold text-gray-900">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-500">On orders $50+</p>
              </div>
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-green-600" size={32} />
                <p className="text-xs font-semibold text-gray-900">
                  Fast Delivery
                </p>
                <p className="text-xs text-gray-500">3-10 business days</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-purple-600" size={32} />
                <p className="text-xs font-semibold text-gray-900">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="pt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">
                Guaranteed Safe Checkout
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                {[
                  "Visa",
                  "Mastercard",
                  "Amex",
                  "PayPal",
                  "Diners",
                  "Discover",
                ].map((method) => (
                  <div
                    key={method}
                    className="bg-white border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-400 transition-colors"
                  >
                    <span className="text-xs font-semibold text-gray-600">
                      {method}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4 pt-4 border-t-2 border-gray-100">
              <span className="text-sm font-bold text-gray-900">Share:</span>
              {/* <button className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-600">
                <Facebook size={20} />
              </button>
              <button className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-400">
                <Twitter size={20} />
              </button> */}
              {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                <Share2 size={20} />
              </button> */}
              <ShareButton productSlug={product.slug}/>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 p-0">
          <div className="border-b-2 border-gray-200">
            <div className="flex gap-8 overflow-x-auto">
              {["DESCRIPTION"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-4 text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    // activeTab === tab.toLowerCase()
                    //   ? "border-b-4 border-gray-900 text-gray-900"
                    //   : "text-gray-500 hover:text-gray-700"
                    "border-b-4 border-gray-900 text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            <Description description={product.description}/>
          </div>
        </div>

        <ReviewSection product = {product}/>
      </div>
    </div>
  );
}
