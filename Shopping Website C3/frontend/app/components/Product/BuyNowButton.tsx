"use client";

import { IProduct } from "@/app/types";
import { useCheckout } from "@/app/zustand/useCheckout";
import { useCurrentVarient } from "@/app/zustand/useCurrentVarient";
import { Link, LoaderCircle, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface IProps {
  product: IProduct;
}

export default function BuyNowButton({ product }: IProps) {
  const searchParams = useSearchParams();
  const route = useRouter();

  const { varientState, productState, setProduct } = useCurrentVarient();
  const { insertCheckoutItem } = useCheckout();
  const [isPending, startTranition] = useTransition();

  const [errorMsg, setErrorMsg] = useState<string | undefined | null>(
    product.variants.length != 0 && varientState == null
      ? "Please choose variant first"
      : null
  );

  useEffect(() => {
    if (product.variants.length != 0 && varientState == null) {
      setErrorMsg("Please choose variant first");
    } else {
      setErrorMsg(null);
    }

    // if no product varient than set the product info
    // for varient set, you can check <Varients /> component
    if (productState == null && product.variants.length == 0) {
      setProduct({ id: product.id, quantity: product.available_quantity });
    }
  }, [
    searchParams.toString(),
    product.variants.length,
    varientState,
    productState,
  ]);

  const onCheckoutBtnClick = () => {
    startTranition(() => {
      // send to the checkout page first set the data to the zustand
      const selectedQuantity = parseInt(
        searchParams.get("quantity")?.toString() ?? "1"
      );
      if (varientState != null) {
        insertCheckoutItem([
          {
            item_id: `v_${varientState.id}`,
            image: varientState.images[0]?.image ?? product.images[0].image,
            product_id: null,
            selectedQuantity,
            totalAmount: selectedQuantity * parseFloat(varientState.price),
            varient_info: varientState,
            productName: product.name,
            itemPrice: parseFloat(varientState.price),
          },
        ]);
      } else if (productState != null) {
        insertCheckoutItem([
          {
            item_id: `p_${productState.id}`,
            image: product.images[0].image,
            product_id: productState.id,
            selectedQuantity,
            totalAmount: selectedQuantity * parseFloat(product.price),
            varient_info: null,
            productName: product.name,
            itemPrice: parseFloat(product.price),
          },
        ]);
      }

      route.push("/checkout");
    });
  };

  return varientState?.quantity == 0 ? null : (
    <span className="block space-y-2.5 mb-6">
      <button
        onClick={onCheckoutBtnClick}
        disabled={typeof errorMsg === "string" || isPending}
        className="w-full flex items-center justify-center disabled:opacity-30 bg-gray-900 text-white font-bold pt-3.5 pb-3 px-6 transition-all duration-200 transform hover:-translate-y-0.5"
      >
        {isPending ? (
          <LoaderCircle className="animate-spin" size={22} />
        ) : (
          <span className="flex items-center justify-center gap-2">
            <ShoppingBag size={18} className="mb-1" /> Buy Now
          </span>
        )}
      </button>
      {errorMsg ? (
        <p
          id="choose-varient-err-lbl"
          className="text-center text-sm font-medium text-[#D4183D]"
        >
          {errorMsg}
        </p>
      ) : null}
    </span>
  );
}
