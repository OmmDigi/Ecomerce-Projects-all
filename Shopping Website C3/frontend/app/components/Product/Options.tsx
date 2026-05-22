"use client";

import { IProduct } from "@/app/types";
import { useCurrentVarient } from "@/app/zustand/useCurrentVarient";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import SetSearchParamsBtn from "../SetSearchParamsBtn";
import { LoaderCircle } from "lucide-react";

interface IProps {
  varient_options: {
    id: number;
    name: string;
    values: { id: number; value: string }[];
  }[];
  product: IProduct;
  slug: string;
}

export default function Options({ product, slug, varient_options }: IProps) {
  const searchParams = useSearchParams();
  const { setVarient } = useCurrentVarient();

  const [selectedOptions, setSelectedOptions] = useState<Record<
    string,
    string
  > | null>(null);

  const [isPending, startTransition] = useTransition();
  const whichItemClicked = useRef<number>(-1);

  const handleSelectOption = (name: string, value: string) => {
    setSelectedOptions((prev: any) => ({
      ...prev,
      [name.toLowerCase()]: value,
    }));
  };

  useEffect(() => {
    startTransition(() => {
      // first need to add selected options if the options already selected in the query params
      if (selectedOptions == null) {
        let tempSelectedOptions: Record<string, string> | null = null;
        searchParams.forEach((value, key) => {
          // get the value of key which is mathing with the option name(string) in lowercase
          const singleOption = varient_options.find(
            (item) => item.name.toLowerCase() == key
          );
          if (singleOption) {
            // now need to check which which value (number) is matching inside the single option
            const singleValue = singleOption.values.find(
              (valueItem) => valueItem.id == parseInt(value)
            );

            if (singleValue) {
              tempSelectedOptions = {
                ...tempSelectedOptions,
                [key]: singleValue.value,
              };
            }
          }
        });
        if (tempSelectedOptions == null) {
          setVarient(null);
        } else {
          setSelectedOptions(tempSelectedOptions);
        }
        return;
      }

      let varientItemindex = -1;
      const varient = product.variants.find((variant, index) =>
        variant.combination.every((value) => {
          if (Object.values(selectedOptions).includes(value)) {
            varientItemindex = index;
            return true;
          }
        })
      );

      if (varient && varientItemindex != -1) {
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set("varient-id", `${varient.id}-${varientItemindex}`);
        history.pushState(null, "", `?${newSearchParams.toString()}`);
        setVarient(varient);
      } else {
        setVarient(null);
      }
    });
  }, [selectedOptions, slug]);

  return (
    <section>
      <ul className="space-y-5">
        {varient_options.map((varient) => (
          <li key={varient.id}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                {varient.name}
                <span className="text-blue-600">
                  {/* {colors.find((c) => c.name === selectedColor)?.label} */}
                </span>
              </h3>
            </div>
            <div className="flex gap-3 flex-wrap">
              {varient.values.map((option) => {
                const queryKey = varient.name.toLowerCase();
                const currentSelectedOption = parseInt(
                  searchParams.get(queryKey)?.toString() ?? "-1"
                );
                return (
                  <SetSearchParamsBtn
                    key={option.id}
                    queryKey={queryKey}
                    queryValue={option.id.toString()}
                    onItemClick={() => {
                      whichItemClicked.current = option.id;
                      handleSelectOption(varient.name, option.value);
                    }}
                    aria-label={option.value}
                    className={`px-5 pb-2 pt-2.5 border border-gray-300 text-sm font-semibold transition-all duration-200 ${
                      option.id == currentSelectedOption
                        // ? "bg-[#fdda70] text-black border-[#fdda70] scale-105"
                        // : "border-[#fdda70] hover:border-[#fdda70] hover:bg-[#fdda70]"
                      ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    {isPending && whichItemClicked.current == option.id ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      option.value
                    )}
                  </SetSearchParamsBtn>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
