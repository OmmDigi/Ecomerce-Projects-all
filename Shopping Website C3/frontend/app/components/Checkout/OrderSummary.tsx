"use client";

import { CheckoutItem } from "@/app/zustand/useCheckout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  items: CheckoutItem[];
}

export function OrderSummary({ items }: IProps) {
  const subTotal = items.reduce(
    (prev, current) => prev + current.totalAmount,
    0
  );
  const shippingCharge = subTotal < 1000 ? 100.0 : 0.0;
  const totalAmount = subTotal + shippingCharge;
  const route = useRouter();

  // useEffect(() => {
  //   if (items.length === 0) {
  //     alert("Please choose a product first");
  //     route.push("/products");
  //   }
  // }, []);
  return (
    <div className="space-y-6">
      {/* Product Item */}
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.item_id} className="flex gap-4">
            <div className="relative shrink-0">
              <Image
                height={512}
                width={512}
                src={item.varient_info?.images[0]?.image ?? item.image}
                alt="Maoni Microwave Oven"
                className="w-16 h-16 rounded border border-gray-300 object-cover bg-white"
              />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs">
                {item.selectedQuantity}
              </div>
            </div>
            <div className="flex-1 flex justify-between">
              <div>
                <h3 className="text-sm">{item.productName}</h3>
                {item.varient_info ? (
                  <p className="text-xs text-gray-500">
                    {item.varient_info?.sku}
                  </p>
                ) : null}
              </div>
              <div className="text-sm">₹{item.itemPrice}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary Details */}
      <div className="space-y-3 pt-4 border-t border-gray-300">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{subTotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="text-gray-500 text-xs">₹{shippingCharge}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between pt-4 border-t border-gray-300">
        <span>Total</span>
        <div className="text-right">
          <span className="text-xs text-gray-500 mr-2">INR</span>
          <span className="text-lg">₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
