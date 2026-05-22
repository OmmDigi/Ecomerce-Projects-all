"use client";

import { useSearchParams } from "next/navigation";
import SetSearchParamsBtn from "../HelperComponent/SetSearchParamsBtn";
import { IProduct } from "@/app/types";
import { useEffect, useRef, useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { useCurrentVarient } from "@/app/zustand/useCurrentVarient";

interface IProps {
  varient_options: {
    id: number;
    name: string;
    values: { id: number; value: string }[];
  }[];
  product: IProduct;
  slug : string;
}

export default function Varients({ varient_options, product, slug }: IProps) {
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
        if(tempSelectedOptions == null) {
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
    <>
      {varient_options.map((varient) => (
        <div key={varient.id} className="mb-6">
          <div className="mb-3 text-sm font-medium text-[#1A1A1A]">
            {/* Color: <span className="capitalize">{selectedColor}</span> */}
            {varient.name}
          </div>
          <div className="flex gap-2 flex-wrap">
            {varient.values.map((option) => {
              const queryKey = varient.name.toLowerCase();
              const currentSelectedOption = parseInt(
                searchParams.get(queryKey)?.toString() ?? "-1"
              );
              return (
                <SetSearchParamsBtn
                  queryKey={queryKey}
                  queryValue={option.id.toString()}
                  onItemClick={() => {
                    whichItemClicked.current = option.id;
                    handleSelectOption(varient.name, option.value);
                  }}
                  key={option.id}
                  className={`rounded border px-6 py-2 text-sm font-medium transition-colors ${
                    option.id == currentSelectedOption
                      ? "border-black bg-black text-white"
                      : "border-[#E0E0E0] bg-white text-[#666] hover:border-black"
                  }`}
                  aria-label={option.value}
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
        </div>
      ))}
      {/*      
      <div className="mb-6">
        <div className="mb-3 text-sm font-medium text-[#1A1A1A]">
          Color: <span className="capitalize">{selectedColor}</span>
        </div>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`rounded border px-6 py-2 text-sm font-medium transition-colors ${
                selectedColor === color.name
                  ? "border-black bg-black text-white"
                  : "border-[#E0E0E0] bg-white text-[#666] hover:border-black"
              }`}
              // style={{ backgroundColor: color.color }}
              aria-label={color.label}
            >
              {color.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-3 text-sm font-medium text-[#1A1A1A]">
          Storage: {selectedStorage}
        </div>
        <div className="flex gap-2">
          {storageOptions.map((storage) => (
            <button
              key={storage}
              onClick={() => setSelectedStorage(storage)}
              className={`rounded border px-6 py-2 text-sm font-medium transition-colors ${
                selectedStorage === storage
                  ? "border-black bg-black text-white"
                  : "border-[#E0E0E0] bg-white text-[#666] hover:border-black"
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div> */}
    </>
  );
}
