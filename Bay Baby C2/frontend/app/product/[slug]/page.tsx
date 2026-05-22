"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Share2, ShoppingCart, Heart, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/fetcher";
import { useCartStore } from "@/store/useCartStore";

const ProductPage = () => {
  const [mainImage, setMainImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [expandedTab, setExpandedTab] = useState<number | null>(null);
  const params = useParams<{ slug: string | undefined }>();

  const {
    addToCart,
    removeFromCart,
    updateQuantity,
    cart,
    isInCart,
    getItemQty,
  } = useCartStore();

  const {
    isLoading: isLoadingSingleProduct,
    isError: isErrorSingleProduct,
    data: product,
    error: errorSingleProduct,
    refetch,
  } = useQuery({
    queryKey: ["All-category", params?.slug],
    queryFn: () => getRequest(`/api/v1/products/${params?.slug}`),
  });

  useEffect(() => {
    if ((product as any)?.data?.images?.length > 0) {
      setMainImage((product as any).data.images[0].image);
    }
  }, [product]);

  // 🔥 Match Variant based on selected options
  useEffect(() => {
    if ((product as any)?.data?.variants) {
      const match = (product as any)?.data?.variants.find((v: any) =>
        v.combination.every((value: string) =>
          Object.values(selectedOptions).includes(value)
        )
      );
      setSelectedVariant(match || null);
    }
  }, [selectedOptions]);

  const fullProduct = (product as any)?.data;

  useEffect(() => {
    if (selectedVariant?.images?.length > 0) {
      setMainImage(selectedVariant.images[0].image);
    } else if (fullProduct?.images?.length > 0) {
      setMainImage(fullProduct.images[0].image);
    }
  }, [selectedVariant, fullProduct]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-black">Loading...</p>
      </div>
    );
  }

  const allOptionsSelected = fullProduct?.options?.every(
    (opt: any) => selectedOptions[opt.name]
  );
  const variantId = selectedVariant?.id || null;
  const itemAlreadyInCart = isInCart(fullProduct?.id, variantId);
  const cartQuantity = getItemQty(fullProduct?.id, variantId);

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
      sku: selectedVariant?.sku,
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

  const openModal = (img: string) => {
    setZoomImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setZoomImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Grid */}
        <div className=" gap-12 mb-12">
          {/* Images Section */}
          <div className=" md:flex md:gap-10">
            {/* LEFT - Images */}

            <div className="md:w-1/2 flex flex-col items-center md:sticky md:top-30 md:h-fit">
              <div
                className="w-full max-w-md border rounded-2xl overflow-hidden shadow-md cursor-pointer"
                onClick={() => openModal(mainImage)}
              >
                {mainImage && (
                  <img
                    src={mainImage}
                    className="w-full h-[420px] object-cover"
                    alt="Product Image"
                  />
                )}
              </div>

              <div className="flex gap-3 mt-4 flex-wrap justify-center">
                {(selectedVariant?.images?.length
                  ? selectedVariant.images
                  : fullProduct?.images
                )?.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img.image)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      mainImage === img.image
                        ? "border-[#d9667a]"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={img.image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT - Product Info */}
            <div className="md:w-1/2  space-y-6 text-gray-800">
              <h1 className="text-xl font-bold">{fullProduct?.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#e3694b]">
                  ₹{selectedVariant?.price || fullProduct?.price}
                </span>

                {fullProduct?.compare_at_price && (
                  <span className="line-through text-gray-400 text-lg">
                    ₹
                    {selectedVariant?.compareAtPrice ||
                      fullProduct?.compare_at_price}
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
              {fullProduct?.options?.map((opt: any, index: number) => (
                <div key={opt.id}>
                  <h3 className="font-semibold mb-2 text-gray-800">
                    Select {opt.name}
                  </h3>

                  <div className="flex gap-4 flex-wrap">
                    {opt.values.map((val: any) => (
                      <button
                        key={val.id}
                        onClick={() => handleSelectOption(opt.name, val.value)}
                        className={`px-4 py-2 rounded-lg border font-semibold ${
                          selectedOptions[opt.name] === val.value
                            ? "border-[#e3694b] text-[#e3694b]"
                            : "border-gray-300"
                        }`}
                      >
                        {val.value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-gray-800">
                <span className=" font-bold text-[#e3694b]">
                  {selectedVariant?.quantity && (
                    <div>Total Stock - {selectedVariant?.quantity}</div>
                  )}
                </span>
              </div>

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
                {!fullProduct?.quantity || selectedVariant?.quantity > 0 ? (
                  <button
                    disabled={!allOptionsSelected}
                    onClick={handleAddToCart}
                    className={`w-[50%] py-3 rounded-lg text-white font-semibold ${
                      !allOptionsSelected
                        ? "bg-gray-300"
                        : itemAlreadyInCart
                        ? "bg-gray-500"
                        : "bg-[#e3694b] border-2 border-dotted hover:bg-gray-800"
                    }`}
                  >
                    {itemAlreadyInCart
                      ? "Remove from Cart"
                      : !allOptionsSelected
                      ? " Select a varient"
                      : "Add to Cart"}
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="w-[50%] py-3 rounded-lg  text-white font-semibold bg-gray-500"
                  >
                    {"No Product Avilable"}
                  </button>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Description</h1>
                <div
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{ __html: fullProduct?.description }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Details Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setExpandedTab(expandedTab === 1 ? null : 1)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="text-lg font-semibold text-gray-900">
                Details
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition ${
                  expandedTab === 1 ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedTab === 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-4">
                <div>
                  <p className="text-gray-700 mb-3">
                    Whole pajamas made of soft organic cotton long-sleeved
                    jersey.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Composition
                      </h4>
                      <p className="text-gray-600">100% cotton</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Durable materials
                      </h4>
                      <p className="text-gray-600">
                        Outer part: Organic cotton 100%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shipping & Returns Section */}
          <div>
            <button
              onClick={() => setExpandedTab(expandedTab === 2 ? null : 2)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="text-lg font-semibold text-gray-900">
                Shipping & Returns
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition ${
                  expandedTab === 2 ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedTab === 2 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-4">
                <p className="text-gray-700">
                  Free Standard Shipping with any online purchase of $50
                  (merchandise subtotal excludes store pick up items;
                  merchandise subtotal is calculated before sales tax, before
                  gift wrap charges, and after any discounts or coupons). Truck
                  delivery and shipping surcharges on over-sized or extremely
                  heavy items will still apply (these charges are indicated on
                  the appropriate product information pages and will be
                  displayed in the shipping subtotal of your order). Orders
                  typically arrive within 3-6 business days. Items shipped
                  directly from the vendor or to Alaska and Hawaii have longer
                  delivery lead times. This offer does not apply to Alaska,
                  Hawaii, Puerto Rico or Business Direct orders.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Table */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional information
          </h3>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium text-gray-900">Brand</td>
                <td className="py-3 text-gray-600">H&M</td>
              </tr>
            </tbody>
          </table>
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
};

export default ProductPage;
