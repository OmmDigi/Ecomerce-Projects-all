"use client";

import {
  ORDER_CANCELLED,
  ORDER_CONFIRMED,
  ORDER_DELIVERED,
  ORDER_PENDING,
  ORDER_SHIPPED,
} from "@/app/constant";
import { postFetcher } from "@/app/lib/clientApi";
import { IServerRes, OrderItem } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

interface OrderCardProps {
  orderName: string;
  orderDate: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  isCancelable: boolean;
  isReplaceable: boolean;
  isReturnable: boolean;
  whenRefetchOrderNeeded?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  orderName,
  orderDate,
  status,
  items,
  totalAmount,
  paymentMethod,
  isCancelable,
  isReplaceable,
  isReturnable,
  whenRefetchOrderNeeded,
}) => {
  const whichBtnClicked = useRef<"cancel" | "return" | "replace">("cancel");

  const getStatusColor = (status: string) => {
    switch (status) {
      case ORDER_DELIVERED:
      case ORDER_CONFIRMED:
        return "bg-green-100 text-green-800";
      case ORDER_PENDING:
        return "bg-yellow-100 text-yellow-800";
      case ORDER_SHIPPED:
        return "bg-blue-100 text-blue-800";
      case ORDER_CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Refactor mutationFn to accept the URL and data
  const mutationFn = useCallback(
    async ({ url, formData }: { url: string; formData: any }) => {
      const response = await postFetcher(url, formData);
      return response;
    },
    []
  );
  const { mutate, isPending } = useMutation<
    IServerRes<any>,
    AxiosError<IServerRes>,
    { url: string; formData: any }
  >({
    mutationKey: ["mange order status"],
    mutationFn: mutationFn,
  });

  const manageOrderStatus = (type: "cancel" | "replace" | "return") => {
    let apiToHit = "";
    let dataToSend: object = {};
    if (type === "cancel") {
      whichBtnClicked.current = "cancel";
      if (!confirm("Are you sure you want to 'Cancel' this order ?")) {
        return;
      }

      apiToHit = "/api/v1/orders/cancel";
      dataToSend = { order_id: orderName };
    }

    if (type === "replace") {
      whichBtnClicked.current = "replace";
      if (!confirm("Are you sure you want to 'Replace' this order ?")) {
        return;
      }

      apiToHit = "/api/v1/orders/return";
      dataToSend = { order_id: orderName, type : "Replace" };
    }

    if (type === "return") {
      whichBtnClicked.current = "return";
      if (!confirm("Are you sure you want to 'Return' this order ?")) {
        return;
      }

      apiToHit = "/api/v1/orders/return";
      dataToSend = { order_id: orderName, type : "Return" };
    }

    mutate(
      { url: apiToHit, formData: dataToSend },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          whenRefetchOrderNeeded?.();
        },
        onError: (error) => {
          toast.error(error.response?.data.message ?? error.message);
        },
      }
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Order ID
              </p>
              <p className="text-sm font-semibold text-gray-900">
                #{orderName}
              </p>
            </div>
            <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Order Date
              </p>
              <p className="text-sm font-medium text-gray-900">{orderDate}</p>
            </div>
          </div>
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="px-6 py-4">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                <Image
                  src={item.images.image}
                  alt={item.product_name}
                  height={512}
                  width={512}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.product_name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-gray-900">
                  Rs. {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500">Payment:</p>
            <p className="text-sm font-medium text-gray-700">{paymentMethod}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-600">Total Amount:</p>
            <p className="text-lg font-bold text-gray-900">
              Rs. {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {isCancelable ? (
            <button
              onClick={() => manageOrderStatus("cancel")}
              className="flex items-center justify-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
            >
              {isPending && whichBtnClicked.current === "cancel" ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Cancel Order"
              )}
            </button>
          ) : null}

          {isReplaceable ? (
            <button
              onClick={() => manageOrderStatus("replace")}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
            >
              {isPending && whichBtnClicked.current === "replace" ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Replace Order"
              )}
            </button>
          ) : null}

          {isReturnable ? (
            <button
              onClick={() => manageOrderStatus("return")}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
            >
              {isPending && whichBtnClicked.current === "return" ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Return Order"
              )}
            </button>
          ) : null}

          <Link href={`?tab=track&order_number=${orderName}`} className="px-4 py-2 border bg-yellow-700 border-gray-300 text-white text-sm font-medium rounded hover:bg-yellow-600 transition-colors">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};
