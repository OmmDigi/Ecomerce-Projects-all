"use client";

import { IProduct } from "@/app/types";
import { useCartSideBar } from "@/app/zustand/useCartSideBar";
import { useCurrentVarient } from "@/app/zustand/useCurrentVarient";
import { LoaderCircle, Minus, Plus, ShoppingCart } from "lucide-react";
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

  return (
    <div className="mb-6">
      {maxQuantity <= 0 ? null : (
        <>
          <div className="mb-3 text-sm font-medium text-[#1A1A1A]">
            Quantity
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded border border-[#E0E0E0]">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-4 py-2 text-[#666] hover:text-black"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="text-sm">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-4 py-2 text-[#666] hover:text-black"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {varientState == null && productState == null ? null : (
              <button
                disabled={isPending}
                onClick={manageCartHandler}
                className="flex disabled:opacity-40 items-center gap-2 rounded border border-black bg-white px-6 py-2 text-sm font-medium text-black hover:bg-gray-50"
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
                    <ShoppingCart className="size-4" />
                    Add To Cart
                  </>
                )}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
