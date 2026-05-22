// components/CouponSection.tsx
"use client";

import { getFetcher } from "@/lib/fetcher";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaCopy,
  FaCheck,
  FaGem,
  FaStar,
  FaHeart,
  FaCrown,
} from "react-icons/fa";
import useSWR from "swr";

interface Coupon {
  id: string;
  code: string;
  discount: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  expiryDate: string;
  minPurchase?: string;
}

const CouponSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const {
    data: discount,
    isLoading: loadngDiscount,
    error: errorDiscount,
  } = useSWR("api/v1/discount", getFetcher);
  console.log("discount", discount);

  const copyToClipboard = async (code: string, id: string) => {
    // Check if we are in a browser environment

    try {
      // await navigator.clipboard.writeText(code);
      console.log("Successfully copied to clipboard!");
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      // Log the exact error object here to be sure:
      console.error(err);
      alert("Failed to copy text. Permissions issue?");
    }
  };

  return discount?.data?.length > 0 ? (
    <section className="w-full bg-gradient-to-b from-pink-50 to-white  py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {discount?.data?.length > 0 ? (
          <div className="text-center mb-12">
            <h2 className="font-questrial text-3xl text-center md:text-4xl text-gray-800 mb-10 tracking-tight">
              EXCLUSIVE OFFER'S
            </h2>
            <p className="text-lg font-questrial text-gray-600 max-w-2xl mx-auto">
              Unlock special savings on our exquisite jewelry collection. Copy
              the code and apply at checkout!
            </p>
          </div>
        ) : null}

        {/* Coupon Cards Grid */}
        {discount?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {discount?.data?.map((coupon: any, i: any) => (
              <div
                data-aos={i % 2 === 0 ? "fade-up" : "fade-up"}
                key={coupon.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform "
              >
                {/* Decorative Border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${coupon.gradient}`}
                />

                {/* Card Content */}
                <div className="p-6">
                  {/* Icon and Discount */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-right">
                      <span
                        className={`text-2xl font-bold bg-gradient-to-r ${coupon.gradient} bg-clip-text text-transparent`}
                      >
                        {coupon.discount}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <h3 className="text-gray-800 font-semibold text-2xl mb-2">
                    {coupon.title}
                  </h3>

                  {/* Min Purchase */}
                  {coupon.min_amount_to_select > 0 && (
                    <p className="text-xs text-gray-500 mb-3">
                      Min. purchase: {coupon.min_amount_to_select}
                    </p>
                  )}

                  {/* Coupon Code Box */}
                  <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-4 border-2 border-dashed border-gray-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Coupon Code
                        </p>
                        <p className="text-xl font-bold text-gray-800 tracking-wider font-mono">
                          {coupon.code}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(coupon.code, coupon.id)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          coupon.id
                            ? "bg-green-500 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-200"
                        } shadow-md`}
                        aria-label="Copy coupon code"
                      >
                        {copiedId == coupon.id ? (
                          <FaCheck className="text-lg" />
                        ) : (
                          <FaCopy className="text-lg" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expiry Date */}
                  <p className="text-xs text-gray-500 text-center">
                    Valid until {coupon.expire_at}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${coupon.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          {discount?.data?.length > 0 ? (
            <p className="text-gray-600 mb-4 font-questrial">
              Have a coupon code? Apply it at checkout for instant savings!
            </p>
          ) : null}
          {discount?.data?.length > 0 ? (
            <Link href="/product">
              <button className="px-8 py-3 bg-[#d9667a] hover:bg-[#b94b5e] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                Shop Now
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  ) : null;
};

export default CouponSection;
