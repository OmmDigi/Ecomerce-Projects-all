"use client";

import { Check, Loader2, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Button from "./Button";
import { useCartSideBar } from "../zustand/useCartSideBar";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { CheckoutItem, useCheckout } from "../zustand/useCheckout";
import Link from "next/link";

export default function CartSideBar() {
  const {
    isVisiable,
    setVisibility,
    cartItems,
    removeCartItem,
    updateQuantity,
  } = useCartSideBar();
  const { insertCheckoutItem } = useCheckout();
  const [isPending, startTranition] = useTransition();

  const route = useRouter();

  const onCheckOutButtonClick = () => {
    startTranition(() => {
      // send to the checkout page first set the data to the zustand
      const itemsToCheckout: CheckoutItem[] = [];

      cartItems.forEach((item) => {
        if (item.varient !== null) {
          const varientAmount = parseFloat(item.varient.price);
          itemsToCheckout.push({
            image: item.image,
            item_id: `v_${item.varient.id}`,
            itemPrice: varientAmount,
            product_id: null,
            productName: item.product_name,
            selectedQuantity: item.quantity,
            totalAmount: item.quantity * varientAmount,
            varient_info: item.varient,
          });
        } else {
          const productAmount = parseFloat(item.price);
          itemsToCheckout.push({
            image: item.image,
            item_id: `p_${item.product_id}`,
            itemPrice: productAmount,
            product_id: null,
            productName: item.product_name,
            selectedQuantity: item.quantity,
            totalAmount: item.quantity * productAmount,
            varient_info: null,
          });
        }
      });

      insertCheckoutItem(itemsToCheckout);

      route.push("/checkout");

      setVisibility(false);
    });
  };

  const totalAmount = cartItems.reduce(
    (prev, current) =>
      prev +
      current.quantity * parseFloat(current.varient?.price ?? current.price),
    0
  );
  return (
    <aside
      onClick={() => setVisibility(false)}
      className={`${
        isVisiable ? "translate-x-0" : "translate-x-full"
      } fixed inset-0 w-full bg-black/30 z-100 flex items-start justify-end`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          isVisiable ? "translate-x-0" : "translate-x-full"
        } w-full md:w-96 lg:96 bg-white h-full flex items-start flex-col justify-start transition-all duration-500`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 w-full">
          <h2 className="font-bold font-open tracking-wider flex items-center gap-2.5">
            <Check size={15} strokeWidth={1} />
            <span className="md:text-sm lg:text-sm text-lg">
              Item added to your cart
            </span>
          </h2>

          <button
            onClick={() => setVisibility(false)}
            className="cursor-pointer"
          >
            <X size={25} strokeWidth={1} />
          </button>
        </div>

        {/* Cart Product List */}
        <div className="w-full h-[80%] overflow-y-auto pb-3.5">
          {cartItems.length === 0 ? (
            <span className="flex items-center justify-center flex-col">
              <h3 className="px-6 font-semibold text-center text-xl text-gray-800">
                No Cart Item Found
              </h3>
              <Link
                onClick={() => {
                  setVisibility(false);
                }}
                href={"/products"}
                className="underline decoration-black"
              >
                Shop now
              </Link>
            </span>
          ) : (
            <ul className="px-6 space-y-10">
              {cartItems.map((item) => (
                <li
                  key={`${item.product_id}-${item.varient?.id}`}
                  className="flex items-start gap-2.5"
                >
                  <div className="w-28 aspect-square">
                    <Image
                      src={item.varient?.images[0]?.image ?? item.image}
                      alt={
                        item.varient?.images[0]?.alt_tag ?? item.product_name
                      }
                      height={1280}
                      width={1280}
                    />
                  </div>

                  <div className="font-inter flex items-start justify-between flex-col gap-y-2">
                    <span className="text-[0.770rem] tracking-wider text-gray-400 uppercase">
                      {item.category}
                    </span>
                    <h2 className="font-semibold text-gray-700 text-sm line-clamp-1">
                      {item.product_name}
                    </h2>
                    {item.varient ? (
                      <span className="text-sm">
                        {/* <span className="font-semibold text-gray-600">Color:</span>{" "}
                    <span className="text-gray-500">Silver</span> */}
                        {item.varient?.sku}
                      </span>
                    ) : null}

                    <span className="text-sm">
                      Rs. {item.varient?.price ?? item.price}
                    </span>

                    <div className="flex items-center justify-between gap-2.5 mt-1.5">
                      <div className="p-1 border border-gray-200 rounded-full flex items-center gap-4 px-2.5">
                        <button
                          onClick={() => {
                            if(item.quantity <= 1) {
                              // remove it from the cart;
                              removeCartItem(
                                item.product_id,
                                item.varient?.id ?? null
                              );
                              return;
                            }
                            updateQuantity(
                              item.product_id,
                              item.varient?.id ?? null,
                              item.quantity - 1
                            );
                          }}
                          className="cursor-pointer"
                        >
                          <Minus strokeWidth={1.5} size={18} />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => {
                            updateQuantity(
                              item.product_id,
                              item.varient?.id ?? null,
                              item.quantity + 1
                            );
                          }}
                          className="cursor-pointer"
                        >
                          <Plus strokeWidth={1.5} size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          removeCartItem(
                            item.product_id,
                            item.varient?.id ?? null
                          );
                        }}
                        className="underline font-open text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="w-full shadow-2xl h-[20%] border-t border-t-gray-200">
          <span className="flex items-center justify-between px-6 pt-4">
            <h3 className="text-2xl font-bold font-open">Subtotal</h3>

            <span className="text-sm text-gray-600">Rs. {totalAmount}</span>
          </span>

          <div className="flex items-center gap-2.5 px-6 py-4">
            <Button
              onClick={() => {
                setVisibility(false);
                route.push("/products");
              }}
              className="border-black! text-sm! w-full!"
            >
              Shop More
            </Button>
            <Button
              disabled={isPending}
              onClick={onCheckOutButtonClick}
              varient="fill"
              className="bg-black! flex items-center justify-center text-white! text-sm! border-black! w-full!"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Checkout"
              )}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
