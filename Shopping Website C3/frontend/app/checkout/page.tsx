"use client";

import { useState, useTransition } from "react";
import { useCheckout } from "../zustand/useCheckout";
import { clientApi } from "../lib/clientApi";
import { IServerRes } from "../types";
import { AxiosError } from "axios";
import { ContactSection } from "../components/Checkout/ContactSection";
import { DeliverySection } from "../components/Checkout/DeliverySection";
import { PaymentSection } from "../components/Checkout/PaymentSection";
import { OrderSummary } from "../components/Checkout/OrderSummary";

export default function CheckOutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "COD">(
    "ONLINE"
  );

  const { items } = useCheckout();

  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = (formData: FormData) => {
    const payload: Record<string, any> = {
      shippingDetails: {
        fullName: `${formData.get("first-name")} ${formData.get("last-name")}`,
      },
      paymentMethod: paymentMethod,
      product: {
        product_ids: [], // {id : number, quantity : number}
        varient_ids: [], // {id : number, quantity : number}
      },
    };

    formData.forEach((value, key) => {
      if (key == "first-name" || key == "last-name") {
        return;
      }
      payload.shippingDetails[key] = value.toString();
    });

    items.forEach((item) => {
      if (item.varient_info !== null) {
        // set the varient array in payload object
        payload.product.varient_ids.push({
          id: item.varient_info.id,
          quantity: item.selectedQuantity,
        });
      } else {
        // set the product array in payload object
        payload.product.product_ids.push({
          id: item.product_id,
          quantity: item.selectedQuantity,
        });
      }
    });

    startTransition(async () => {
      try {
        const data = (
          await clientApi.post<IServerRes<{ gatewayUrl: string }>>(
            "/api/v1/orders/place-order",
            payload
          )
        ).data;
        // toast.success(data.message);
        alert(data.message);
        if (paymentMethod === "ONLINE") {
          window.open(data.data.gatewayUrl);
        }
      } catch (error) {
        const err = error as AxiosError<IServerRes>;
        // toast.error(err.response?.data.message);
        alert(err.response?.data.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white container mx-auto px-4">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(new FormData(e.currentTarget));
            }}
            className="space-y-8 *:font-spartan"
          >
            <ContactSection />
            <DeliverySection />
            <PaymentSection
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isPending={isPending}
            />

            <div className="mt-6">
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Privacy policy
              </a>
            </div>
          </form>

          {/* Right Column - Order Summary */}
          <div className="lg:bg-gray-50 lg:p-8 sticky top-20 self-start *:font-spartan">
            <OrderSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
