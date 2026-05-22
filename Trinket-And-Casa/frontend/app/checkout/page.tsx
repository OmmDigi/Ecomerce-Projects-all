"use client";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Tag,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { getFetcher, postFetcher } from "@/lib/fetcher";
import { message } from "antd";
import useSWR from "swr";
import confetti from "canvas-confetti";

type ShippingDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type Coupon = {
  discount: number;
  type: "percentage" | "fixed";
  minOrder: number;
};

const CheckoutPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const [messageApi, contextHolder] = message.useMessage();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [showCouponError, setShowCouponError] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "COD">(
    "ONLINE"
  );
  const [discount, setDiscount] = useState<any>({});
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [showCouponList, setShowCouponList] = useState(false);
  const couponRef = useRef<any>(null);

  const {
    data: couponDiscount,
    isLoading: loadngCouponDiscount,
    error: errorCouponDiscount,
  } = useSWR("api/v1/discount", getFetcher);
  const availableCoupons = couponDiscount?.data || []; // from SWR API response

  console.log("availableCoupons", availableCoupons);

  const { trigger: create } = useSWRMutation(
    "api/v1/discount/validate",
    (url, { arg }) => postFetcher(url, arg)
  );

  const { trigger: place_order, isMutating } = useSWRMutation(
    "api/v1/orders/place-order",
    (url, { arg }) => postFetcher(url, arg)
  );
  // -------------------------------
  // 🔥 UPDATE VARIANT QUANTITY
  // -------------------------------
  const changeQty = (item: any, diff: number) => {
    const newQty = Math.max(1, item.quantity + diff);
    updateQuantity(item.id, item.variantId, newQty);
  };

  // -------------------------------
  // 🔥 REMOVE SPECIFIC VARIANT
  // -------------------------------
  const deleteItem = (item: any) => {
    removeFromCart(item.id, item.variantId);
  };

  // -------------------------------
  // 🔥 SUBTOTAL
  // -------------------------------
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // -------------------------------
  // 🔥 APPLY COUPON
  // -------------------------------

  const normal: any[] = [];
  const variant: any[] = [];
  cart.forEach((item) => {
    if (item.variantId === null) {
      // normal product
      normal.push({
        id: item.id,
        quantity: item.quantity,
      });
    } else {
      // variant product
      variant.push({
        id: item.variantId,
        quantity: item.quantity,
      });
    }
  });

  const formData = {
    product_ids: normal,
    varient_ids: variant,
    code: couponCode,
  };
  const applyCoupon = async () => {
    try {
      const response = await create(formData as any);
      setDiscount(response);
      setShowCouponError(false);
      setAppliedCoupon(true);
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 },
      });
      messageApi.open({
        type: "success",
        content: response.message,
      });
      // setCouponCode("");
    } catch (error: any) {
      setShowCouponError(true);
      messageApi.open({
        type: "error",
        content: error.response?.data?.message
          ? error.response?.data?.message
          : " try again ",
      });
    }
  };

  // const discountAmount = appliedCoupon
  //   ? appliedCoupon.type === "percentage"
  //     ? (subtotal * appliedCoupon.discount) / 100
  //     : appliedCoupon.discount
  //   : 0;

  const discountAmount =
    discount?.data?.subTotal - discount?.data?.priceAfterDiscount;

  const afterDiscount = subtotal - (discountAmount ? discountAmount : 0);
  const gstAmount = (afterDiscount * 3) / 100;
  const shippingCharge = subtotal > 1000 ? 0 : 100;
  const totalAmount = afterDiscount + shippingCharge;

  // -------------------------------
  // 🔥 SHIPPING INPUT HANDLER
  // -------------------------------
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const orderPlace = async () => {
    const orderData: Record<string, any> = {
      shippingDetails: shippingDetails,
      paymentMethod: paymentMethod,
    };

    if (formData.code != "") {
      orderData["product"] = formData;
    } else {
      orderData["product"] = {
        product_ids: normal,
        varient_ids: variant,
      };
    }

    try {
      const response = await place_order(orderData as any);
      messageApi.open({
        type: "success",
        content: response.message,
      });
      setCouponCode("");
      if (response?.data?.gatewayUrl) {
        // setPaymentUrl(response?.data?.gatewayUrl);
        window.location.href = `${response?.data?.gatewayUrl}`;
      } else {
        window.location.href = "/profile?tab=orders";
      }
    } catch (error: any) {
      // setShowCouponError(true);
      messageApi.open({
        type: "error",
        content: error.response?.data?.message
          ? error.response?.data?.message
          : " try again ",
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (couponRef.current && !couponRef?.current?.contains(event.target)) {
        setShowCouponList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 font-questrial">
      {contextHolder}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <h1 className="text-3xl text-gray-800 mb-1">Checkout</h1>
        <p className="text-gray-600 mb-4">Complete your purchase</p>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-2">
            {/* SHIPPING DETAILS */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100">
              <div className="flex items-center mb-6 space-x-3">
                <MapPin className="text-rose-600" />
                <h2 className="text-xl font-semibold">Shipping Details</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {/* Fields */}
                {["fullName", "email", "phone"].map((name) => (
                  <div
                    key={name}
                    className={name === "fullName" ? "md:col-span-2" : ""}
                  >
                    <label className="text-sm text-gray-700 capitalize mb-1 block">
                      {name.replace(/([A-Z])/g, " $1")} *
                    </label>
                    <input
                      name={name}
                      value={(shippingDetails as any)[name]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder={name}
                    />
                  </div>
                ))}

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-700 mb-1 block">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Full address"
                  />
                </div>

                {/* City / State / Pincode / Country */}
                {["city", "state", "pincode", "country"].map((name) => (
                  <div key={name}>
                    <label className="block text-sm text-gray-700 mb-1 capitalize">
                      {name} *
                    </label>
                    <input
                      name={name}
                      disabled={name === "country"}
                      value={(shippingDetails as any)[name]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* PAYMENT SECTION */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100">
              <div className="flex items-center mb-4 space-x-3">
                <CreditCard className="text-rose-600" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              <div className="flex justify-around text-rose-600 gap-10">
                {["ONLINE", "COD"].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center p-4 border-2 rounded-lg mb-3 cursor-pointer ${
                      paymentMethod === method
                        ? "border-[#d9667a] bg-rose-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "ONLINE" | "COD")
                      }
                    />
                    <span className="ml-3">
                      {method === "ONLINE" && "💳 Pay Online"}
                      {method === "COD" && "💵 Cash on Delivery"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100 sticky top-24">
              <div className="flex items-center space-x-3 mb-4">
                <ShoppingBag className="text-rose-600" />
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              {/* CART LIST */}
              <div className="space-y-4 max-h-72 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.variantId}`}
                    className="p-3 bg-rose-50 rounded-lg flex gap-3"
                  >
                    <img
                      src={item.product?.images?.[0]?.image}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-gray-500">
                        Variant: {item.variantId}
                      </p>

                      <p className="font-bold text-rose-600 mt-1">
                        ₹{item.product.price}
                      </p>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => changeQty(item, -1)}
                          className="w-6 h-6 border rounded-full bg-white flex items-center justify-center"
                        >
                          <Minus className="w-3" />
                        </button>

                        <span className="text-sm">{item.quantity}</span>

                        <button
                          onClick={() => changeQty(item, 1)}
                          className="w-6 h-6 border rounded-full bg-white flex items-center justify-center"
                        >
                          <Plus className="w-3" />
                        </button>

                        <button
                          onClick={() => deleteItem(item)}
                          className="ml-auto text-red-500"
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* COUPON */}
              <div className="mt-5 relative" ref={couponRef}>
                <label className="flex items-center gap-2 text-sm mb-2">
                  <Tag className="w-4 text-rose-600" />
                  Apply Coupon
                </label>

                {/* INPUT + APPLY BUTTON */}
                <div className="flex gap-2 relative">
                  <input
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                    }}
                    onFocus={() => {
                      setShowCouponList(true), setAppliedCoupon(false);
                    }}
                    className="border rounded-lg px-3 py-2 flex-1"
                    placeholder="Enter or select coupon"
                  />

                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-[#d9667a] hover:bg-[#b94b5e] text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>

                {/* ▼ DROPDOWN LIST BELOW INPUT */}
                {showCouponList && availableCoupons?.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-md z-20 max-h-40 overflow-y-auto">
                    {availableCoupons.map((c: any) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setCouponCode(c.code);
                          setShowCouponList(false);
                          // setAppliedCoupon(c);
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                      >
                        <div className=" flex justify-between">
                          <div>
                            <div className="font-semibold">{c.code}</div>
                            <div className="text-xs text-gray-500">
                              {c.title}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">
                              Discount -{" "}
                              <span className="font-semibold">
                                {c.value} {c.type == "percentage" ? "%" : "Rs"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {showCouponError && (
                  <p className="text-red-500 text-xs mt-1">
                    Invalid or minimum amount not met.
                  </p>
                )}

                {/* SUCCESS MESSAGE */}
                {appliedCoupon && (
                  <p className="text-green-600 text-xs mt-1">Coupon Applied</p>
                )}
              </div>

              {/* TOTALS */}
              <div className="mt-6 border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 ? (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>₹{discountAmount.toFixed(2)}</span>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex justify-center text-gray-600 ">
                  <p>
                    GST <span className="text-orange-700">(3%)</span> Is added
                    with every Product
                  </p>
                  {/* <span>₹{gstAmount.toFixed(2)}</span> */}
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span className="text-rose-600">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={orderPlace}
                disabled={isMutating}
                className={`w-full mt-5 rounded-lg py-3 text-white 
                  ${
                    isMutating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#d9667a] hover:bg-[#b94b5e]"
                  }`}
              >
                {isMutating ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </div>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {paymentUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full rounded-xl shadow-xl overflow-hidden relative">
          
            <button
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setPaymentUrl(null)}
            >
              ✕
            </button>

            <iframe src={paymentUrl} className="w-full h-full" />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CheckoutPage;
