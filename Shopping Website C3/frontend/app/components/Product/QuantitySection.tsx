"use client";

import { IProduct } from "@/app/types";
import { useCartSideBar } from "@/app/zustand/useCartSideBar";
import { useCurrentVarient } from "@/app/zustand/useCurrentVarient";
import { LoaderCircle, Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface IProps {
  product: IProduct;
}

export default function QuantitySection({ product }: IProps) {
  const searchParams = useSearchParams();

  const [quantity, setQuantity] = useState(1);

  const { varientState, productState } = useCurrentVarient();
  const [isPending, startTransition] = useTransition();
  const { addCartItem, isExist, removeCartItem, getItemQty, updateQuantity } =
    useCartSideBar();
  const maxQuantity = varientState?.quantity ?? productState?.quantity ?? 0;

  const [isExistInCart, setIsExistInCart] = useState(false);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= maxQuantity) {
      if (isExistInCart) {
        updateQuantity(product.id, varientState?.id ?? null, value);
      }

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("quantity", value.toString());
      history.replaceState(null, "", "?" + searchParams.toString());
    }
  };

  useEffect(() => {
    const searchQuantity = searchParams.get("quantity");

    const quantityFromCart = getItemQty(product.id, varientState?.id ?? null);

    if (searchQuantity) {
      const searchQuan = parseInt(searchQuantity);
      if (searchQuan > maxQuantity) {
        setQuantity(1);
        handleQuantityChange(1);
      } else {
        setQuantity(searchQuan);
      }
    } else {
      setQuantity(quantityFromCart);
    }

    if (isExist(product.id, varientState?.id ?? null)) {
      setIsExistInCart(true);
    } else {
      setIsExistInCart(false);
    }
  }, [searchParams.toString(), varientState, productState]);

  const manageCartHandler = () => {
    startTransition(() => {
      if (isExistInCart) {
        removeCartItem(product.id, varientState?.id ?? null);
        setIsExistInCart(false);
      } else {
        const searchQuantity = searchParams.get("quantity");
        addCartItem({
          category: product.category_slug,
          image: varientState?.images[0]?.image ?? product.images[0].image,
          price: varientState?.price ?? product.price,
          product_id: product.id,
          varient: varientState,
          product_name: product.name,
          quantity: parseInt(searchQuantity ?? "1"),
        });
        setIsExistInCart(true);
      }
    });
  };

  return maxQuantity <= 0 ? null : (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
            Quantity
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 overflow-hidden w-32">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-3 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>

              <span className="w-full text-center font-semibold focus:outline-none">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            {varientState == null && productState == null ? null : (
              <button
                disabled={isPending}
                onClick={manageCartHandler}
                className="flex items-center gap-2 text-sm border font-semibold border-gray-300 px-6 py-3"
              >
                {isPending ? (
                  <LoaderCircle className="animate-spin" size={20} />
                ) : isExistInCart ? (
                  <>
                    <Minus className="size-4" />
                    Remove
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} className="mb-1" />
                    Add To Cart
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Buy now button */}
      {/* <Link
        href={"/checkout"}
        className="w-full block bg-gray-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5"
      >
        <span className="flex items-center justify-center gap-2">
          <ShoppingBag size={18} className="mb-1" /> Buy Now
        </span>
      </Link> */}
    </div>
  );
}
