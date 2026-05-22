"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  ChevronRight,
  Edit2,
  Save,
  X,
  Download,
  Loader2,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { getFetcher, postFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import { message } from "antd";

export default function ProfilePage() {
  const [messageApi, contextHolder] = message.useMessage();

  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [profileData, setProfileData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    address: "123, MG Road, Bangalore, Karnataka - 560001",
    dateOfBirth: "1995-06-15",
  });
  const [editData, setEditData] = useState({ ...profileData });

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: GetUserOrderList,
    isLoading: loadingGetUserOrderList,
    error: errorGetUserOrderList,
  } = useSWR("api/v1/users/orders", getFetcher);

  const {
    data: orderStatus,
    isLoading: loadingOrderStatus,
    error: errorOrderStatus,
    mutate: mutateOrderStatus,
  } = useSWR(
    selectedOrder?.order_number
      ? `api/v1/orders/track?order_number=${selectedOrder.order_number}`
      : null,
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  // cancel
  const { trigger: cancle, isMutating: cancleMutating } = useSWRMutation(
    "api/v1/orders/cancel",
    (url, { arg }) => postFetcher(url, arg),
  );
  // return
  const { trigger: returnd, isMutating: returnMutating } = useSWRMutation(
    "api/v1/orders/return",
    (url, { arg }) => postFetcher(url, arg),
  );
  // replace
  const { trigger: replace, isMutating: replaceMutating } = useSWRMutation(
    "api/v1/orders/return",
    (url, { arg }) => postFetcher(url, arg),
  );

  // 🔹 Read query param on page load
  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("orders"); // default
    }
  }, [searchParams]);

  //  cancle
  const cancleOrder = async (id: number) => {
    const order_id = { order_id: id };
    try {
      const response = await cancle(order_id as any);
      messageApi.open({
        type: "success",
        content: response.message,
      });
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err?.response?.data?.message
          ? err?.response?.data?.message
          : " Try Again",
      });
    }
  };
  // return
  const returnOrder = async (id: number) => {
    const payload = { order_id: id, type: "Return" };
    try {
      const response = await returnd(payload as any);
      messageApi.open({
        type: "success",
        content: response.message,
      });
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err?.response?.data?.message
          ? err?.response?.data?.message
          : " Try Again",
      });
    }
  };
  // replace
  const replaceOrder = async (id: number) => {
    const payload = { order_id: id, type: "Replace" };
    try {
      const response = await replace(payload as any);
      messageApi.open({
        type: "success",
        content: response.message,
      });
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err?.response?.data?.message
          ? err?.response?.data?.message
          : " Try Again",
      });
    }
  };

  // 🔹 Update URL without reload
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  // const trackingSteps = [
  //   { status: "Order Placed", date: "2024-10-15", completed: true },
  //   { status: "Order Confirmed", date: "2024-10-15", completed: true },
  //   { status: "Shipped", date: "2024-10-16", completed: true },
  //   { status: "Out for Delivery", date: "2024-10-18", completed: false },
  //   { status: "Delivered", date: "Expected by 2024-10-19", completed: false },
  // ];

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const downloadIvoice = (id: number) => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/invoice/${id}`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {contextHolder}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 space-y-2">
              {/* PROFILE */}
              {/* <button
                onClick={() => handleTabChange("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeTab === "profile"
                    ? "bg-[#d9667a] hover:bg-[#b94b5e] text-white"
                    : "hover:bg-pink-50 text-gray-700"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">My Profile</span>
              </button> */}

              {/* ORDERS */}
              <button
                onClick={() => handleTabChange("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeTab === "orders"
                    ? "bg-[#d9667a] hover:bg-[#b94b5e] text-white"
                    : "hover:bg-pink-50 text-gray-700"
                }`}
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">Order History</span>
              </button>

              {/* TRACKING */}
              {/* <button
                onClick={() => handleTabChange("tracking")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeTab === "tracking"
                    ? "bg-[#d9667a] hover:bg-[#b94b5e] text-white"
                    : "hover:bg-pink-50 text-gray-700"
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Track Order</span>
              </button> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {/* {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-2 py-2 bg-[#d9667a] hover:bg-[#b94b5e] text-white rounded-lg "
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                    
                    </div>
                  )}
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.name : profileData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={isEditing ? editData.email : profileData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={isEditing ? editData.phone : profileData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={
                        isEditing
                          ? editData.dateOfBirth
                          : profileData.dateOfBirth
                      }
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Address
                    </label>
                    <textarea
                      value={isEditing ? editData.address : profileData.address}
                      onChange={(e) =>
                        setEditData({ ...editData, address: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )} */}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order History
                </h2>
                <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {GetUserOrderList?.data?.length > 0 ? (
                    GetUserOrderList?.data?.map((order: any, index: number) => (
                      <div
                        key={index}
                        className="border rounded-xl p-2 shadow-sm bg-white hover:shadow-md transition"
                      >
                        {/* <p> Sl No - {index + 1}</p> */}
                        {/* Top Section */}
                        <div className="flex justify-between items-center ">
                          <div>
                            <p className="font-light text-xs">
                              Order #{order.order_number}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.order_date}
                            </p>
                            {/* download */}
                            {order?.invoice_avilable == true ? (
                              <button
                                onClick={() => downloadIvoice(order?.order_id)}
                                className="mt-2 flex justify-center items-center gap-1 px-2  py-0.5 rounded-full text-sm font-medium cursor-pointer bg-gray-300 text-yellow-700"
                              >
                                <>
                                  <p>Invoice</p>
                                  <Download className="w-4 h-4" />
                                </>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-medium 
                            ${
                              order.order_status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                            >
                              {order.order_status}
                            </div>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setActiveTab("tracking");

                                mutateOrderStatus();
                              }}
                              className="px-2 py-1 text-sm bg-[#d9667a] hover:bg-[#b94b5e] text-white rounded-lg "
                            >
                              Track Order
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 border-t pt-2 space-y-2">
                          {order.ordered_products.map(
                            (item: any, index: number) => (
                              <div key={index} className="flex gap-4">
                                {/* Product Image */}
                                <img
                                  src={item?.images?.image}
                                  alt={item?.product_name}
                                  className="w-20 h-20 rounded-lg object-cover border"
                                />

                                {/* Product Details */}
                                <div className="flex-1">
                                  <p className="font-medium line-clamp-2">
                                    {item.product_name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Variant:{" "}
                                    <span className="uppercase">
                                      {item.sku}
                                    </span>
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>

                        {/* Footer (Total Amount) */}
                        <div className="border-t mt-2 pt-2 flex justify-between items-center">
                          <p className="text-gray-600 text-sm">Total Amount</p>
                          <p className="text-lg font-semibold">
                            ₹ {order.total_amount}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : loadingGetUserOrderList ? (
                    <p className="text-center text-2xl">Loading ...</p>
                  ) : (
                    <p className="text-center"> You dont Have Any Order |</p>
                  )}
                </div>
              </div>
            )}

            {/* Tracking Tab */}
            {activeTab === "tracking" && selectedOrder && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <button
                  onClick={() => setActiveTab("orders")} // or your previous tab name
                  className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Track Your Order
                </h2>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-2 md:p-6 mb-8">
                  <div className="mg:flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">
                      Order ID: {selectedOrder?.order_number}
                    </h3>
                    <span className="text-sm text-gray-600">
                      Tracking ID: {selectedOrder?.tracking_id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-600">
                      {selectedOrder?.ordered_products?.[0]?.product_name}
                    </p>
                  </div>
                  <div className="flex justify-between gap-2 md:gap-5">
                    {/* cancle  */}
                    <button
                      onClick={() => {
                        cancleOrder(selectedOrder?.order_number);
                      }}
                      disabled={!selectedOrder?.is_cancelable || cancleMutating}
                      className={` cursor-pointer px-2 py-1 text-sm text-white rounded-lg flex items-center gap-2
                                 ${
                                   !selectedOrder?.is_cancelable ||
                                   cancleMutating
                                     ? "bg-gray-400 cursor-not-allowed"
                                     : "bg-[#d9667a] hover:bg-[#b94b5e]"
                                 }
                         `}
                    >
                      {cancleMutating && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}

                      {cancleMutating ? "Cancelling..." : "Cancel Order"}
                    </button>
                    {/* return  */}
                    <button
                      onClick={() => {
                        returnOrder(selectedOrder?.order_number);
                      }}
                      disabled={!selectedOrder?.is_returnable || returnMutating}
                      className={`cursor-pointer px-2 py-1 text-sm text-white rounded-lg flex items-center gap-2
                                 ${
                                   !selectedOrder?.is_returnable ||
                                   returnMutating
                                     ? "bg-gray-400 cursor-not-allowed"
                                     : "bg-[#d9667a] hover:bg-[#b94b5e]"
                                 }
                         `}
                    >
                      {returnMutating && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}

                      {returnMutating ? "Cancelling..." : "Return Order"}
                    </button>
                    {/* replace  */}
                    <button
                      onClick={() => {
                        replaceOrder(selectedOrder?.order_number);
                      }}
                      disabled={
                        !selectedOrder?.is_replaceable || replaceMutating
                      }
                      className={`cursor-pointer px-2 py-1 text-sm text-white rounded-lg flex items-center gap-2
                                 ${
                                   !selectedOrder?.is_replaceable ||
                                   replaceMutating
                                     ? "bg-gray-400 cursor-not-allowed"
                                     : "bg-[#d9667a] hover:bg-[#b94b5e]"
                                 }
                         `}
                    >
                      {replaceMutating && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}

                      {replaceMutating ? "Cancelling..." : "Replace Order"}
                    </button>
                  </div>
                </div>

                {/* Tracking Steps */}
                <div className="relative">
                  {orderStatus?.data?.map((step: any, idx: number) => (
                    <div key={idx} className="flex gap-4 mb-8 last:mb-0">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed
                              ? "bg-gradient-to-r from-pink-400 to-rose-400 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step.completed ? "✓" : idx + 1}
                        </div>
                        {idx < orderStatus?.data?.length - 1 ? (
                          <div
                            className={`w-0.5 h-16 ${
                              step.completed ? "bg-pink-400" : "bg-gray-200"
                            }`}
                          />
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="flex-1 pb-8">
                        <h4
                          className={`font-semibold ${
                            step.completed ? "text-gray-800" : "text-gray-400"
                          }`}
                        >
                          {step.status}
                        </h4>
                        <p className="text-sm text-gray-500">{step.date}</p>
                        {step.location ? (
                          <p className="text-sm text-gray-500">
                            {step.location}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
