"use client";

import { getFetcher } from "@/app/lib/clientApi";
import { IServerRes, IUserOrderList } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { OrderCard } from "./OrderCard";
import { Loader2 } from "lucide-react";

export default function OrderTab() {
  // fetch orders list

  const { data, isFetching, error, refetch } = useQuery<
    IServerRes<IUserOrderList[]>
  >({
    queryKey: ["get-user-orders"],
    queryFn: () => getFetcher(`/api/v1/users/orders`),
  });

  return (
    <section className="space-y-3.5 min-h-screen">
      <h2 className="text-2xl font-open font-bold">Order history</h2>
      {data?.data.length === 0 ? (
        <h3>You haven't placed any orders yet.</h3>
      ) : isFetching ? (
        <span className="mt-6 flex items-center gap-2.5">
          <Loader2 size={18} className="animate-spin" />
          Loading orders..
        </span>
      ) : error ? (
        <span className="mt-6 flex items-center gap-2.5">
          <span className="text-red-600">Error : {error?.message}</span>
        </span>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {data?.data.map((item) => (
            <li key={item.order_id}>
              <OrderCard
                items={item.ordered_products}
                orderDate={item.order_date}
                orderName={item.order_number}
                paymentMethod={item.payment_method}
                status={item.order_status as any}
                totalAmount={parseFloat(item.total_amount)}
                isCancelable={item.is_cancelable}
                isReplaceable={item.is_replaceable}
                isReturnable={item.is_returnable}
                whenRefetchOrderNeeded={() => {
                  refetch();
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
