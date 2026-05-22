"use client";

import { getFetcher } from "@/app/lib/clientApi";
import { IServerRes } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TrackingStep {
  key: string;
  status: string;
  date: string;
  completed: boolean;
  location: string | null;
}

export const TrackOrder = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number");

  const [orderNumberToSearch, setOrderNumberToSearch] = useState<string | null>(
    null
  );

  const { data, error, isFetching } = useQuery<IServerRes<TrackingStep[]>>({
    queryKey: ["track-order", orderNumberToSearch],
    enabled: orderNumberToSearch != null,
    queryFn: () =>
      getFetcher(
        `/api/v1/orders/track?order_number=${orderNumberToSearch}`
      ),
  });

  useEffect(() => {
    if (orderNumber == null) {
      const enteredText = prompt("Please enter your order id");

      if (enteredText !== null && enteredText !== "") {
        setOrderNumberToSearch(enteredText.replace("#", ""));
      } else {
        alert("No text entered or canceled.");
      }
    } else {
      setOrderNumberToSearch(orderNumber);
    }
  }, [orderNumber]);

  //   const getIconForStatus = (key: string) => {
  //     switch (key) {
  //       case "PENDING":
  //         return (
  //           <svg
  //             className="w-5 h-5"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  //             />
  //           </svg>
  //         );
  //       case "CONFIRMED":
  //         return (
  //           <svg
  //             className="w-5 h-5"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
  //             />
  //           </svg>
  //         );
  //       case "PROCESSING":
  //         return (
  //           <svg
  //             className="w-5 h-5"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  //             />
  //           </svg>
  //         );
  //       case "SHIPPED":
  //         return (
  //           <svg
  //             className="w-5 h-5"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
  //             />
  //           </svg>
  //         );
  //       case "OUT_FOR_DELIVERY":
  //         return (
  //           <svg
  //             className="w-5 h-5"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
  //             />
  //           </svg>
  //         );
  //       case "DELIVERED":
  //         return (
  //           <svg
  //             className="w-5 h-5"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M5 13l4 4L19 7"
  //             />
  //           </svg>
  //         );
  //       default:
  //         return (
  //           <svg
  //             className="w-5 h-5"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  //             />
  //           </svg>
  //         );
  //     }
  //   };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Order Tracking</h2>
        <p className="text-sm text-gray-500 mt-1">Order ID: #{orderNumberToSearch}</p>
      </div>

      {/* Tracking Steps */}
      <div className="px-6 py-8">
        <div className="relative">
          {data?.data.map((step, index) => (
            <div key={step.key} className="relative pb-8 last:pb-0">
              {/* Connecting Line */}
              {index < data?.data.length - 1 && (
                <div
                  className={`absolute left-4 top-10 w-0.5 h-full -ml-px ${
                    step.completed ? "bg-black" : "bg-gray-300"
                  }`}
                />
              )}

              {/* Step Content */}
              <div className="relative flex items-start">
                {/* Icon Circle */}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step.completed
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {/* {getIconForStatus(step.key)} */}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                {/* Step Details */}
                <div className="ml-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`text-sm font-semibold ${
                          step.completed ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {step.status}
                      </h3>
                      {step.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {step.date}
                        </p>
                      )}
                      {step.location && (
                        <p className="text-xs text-gray-600 mt-1 flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {step.location}
                        </p>
                      )}
                    </div>

                    {step.completed && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <p>Need help? Contact our support team</p>
          <button className="text-black font-medium hover:underline">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
