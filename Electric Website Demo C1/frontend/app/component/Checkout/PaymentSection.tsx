import { CreditCard, Banknote, LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  paymentMethod: "ONLINE" | "COD";
  setPaymentMethod: Dispatch<SetStateAction<"ONLINE" | "COD">>;
  isPending: boolean;
}

export function PaymentSection({
  paymentMethod,
  setPaymentMethod,
  isPending,
}: IProps) {
  return (
    <div>
      <h2 className="mb-2 font-semibold font-open text-xl">Payment</h2>
      <p className="text-sm text-gray-600 mb-4">
        All transactions are secure and encrypted.
      </p>

      {/* Payment Method Buttons */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          name="ONLINE"
          onClick={() => {
            if (isPending) return;
            setPaymentMethod("ONLINE");
          }}
          className={`w-full flex items-center justify-between px-4 py-3 border rounded transition-all ${
            paymentMethod === "ONLINE"
              ? "border-[#9bb18f] bg-[#f3f8f1]"
              : "border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "ONLINE"
                  ? "border-teal-600"
                  : "border-gray-400"
              }`}
            >
              {paymentMethod === "ONLINE" && (
                <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>
              )}
            </div>
            <span>Online Payment</span>
          </div>
          <CreditCard className="w-5 h-5 text-gray-400" />
        </button>

        <button
          type="button"
          name="COD"
          onClick={() => {
            if (isPending) return;
            setPaymentMethod("COD");
          }}
          className={`w-full flex items-center justify-between px-4 py-3 border rounded transition-all ${
            paymentMethod === "COD"
              ? "border-[#9bb18f] bg-[#f3f8f1]"
              : "border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "COD" ? "border-teal-600" : "border-gray-400"
              }`}
            >
              {paymentMethod === "COD" && (
                <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>
              )}
            </div>
            <span>Cash on Delivery</span>
          </div>
          <Banknote className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Complete Order Button */}
      <button
        disabled={isPending}
        className="w-full mt-6 px-6 py-3 flex items-center justify-center bg-[#9bb18f] font-semibold font-inter text-white rounded transition-colors"
      >
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Complete Order"
        )}
      </button>
    </div>
  );
}
