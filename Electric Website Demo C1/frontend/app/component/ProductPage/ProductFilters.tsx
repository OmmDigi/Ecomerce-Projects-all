import { Collapsible } from "../HelperComponent/Collasable";
import CollasableOpenBtn from "../HelperComponent/CollasableOpenBtn";
import { ChevronDown } from "lucide-react";
import CollasableCloseBtn from "../HelperComponent/CollasableCloseBtn";
import CustomCheckBox from "./CustomCheckBox";
import CollasableBody from "../HelperComponent/CollasableBody";
import { serverApi } from "@/app/lib/serverApi";
import { ICategory, IServerRes } from "@/app/types";
import Link from "next/link";

interface IProps {
  searchParams: any;
}

export default async function ProductFilters({ searchParams }: IProps) {
  let cateogries: ICategory[] = [];

  try {
    const response = (
      await serverApi.get<IServerRes<ICategory[]>>("/api/v1/products/category")
    ).data;
    cateogries = response.data;
  } catch (error) {
    console.log(error);
    return (
      <p className="text-center font-semibold">
        Unable to process your request
      </p>
    );
  }

  const subCategories =
    cateogries.find((item) => item.slug == searchParams.category)
      ?.sub_categories ?? [];

  return (
    <>
      <Collapsible defaultValue={true}>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-[#bb976c] font-400 text-xl tracking-wider font-inter">
              Category
            </h3>
            <CollasableOpenBtn>
              <ChevronDown className="text-[#bb976c]" size={18} />
            </CollasableOpenBtn>
            <CollasableCloseBtn>
              <ChevronDown className="text-[#bb976c] rotate-180" size={18} />
            </CollasableCloseBtn>
          </div>

          <CollasableBody>
            <ul className="mt-3 space-y-3.5 ml-1">
              <li>
                <Link href={"?category=all"}>
                  <CustomCheckBox
                    className="flex items-center gap-3.5 font-inter text-gray-600"
                    checked={searchParams.category === "all"}
                  >
                    <span className="text-sm">All</span>
                  </CustomCheckBox>
                </Link>
              </li>
              {cateogries.map((category) => (
                <li key={category.id}>
                  <Link href={`?category=${category.slug}`}>
                    <CustomCheckBox
                      className="flex items-center gap-3.5 font-inter text-gray-600"
                      checked={searchParams.category === category.slug}
                    >
                      <span className="text-sm">{category.name}</span>
                    </CustomCheckBox>
                  </Link>
                </li>
              ))}
            </ul>
          </CollasableBody>
        </div>
      </Collapsible>

      {subCategories.length !== 0 ? (
        <Collapsible defaultValue={true}>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-[#bb976c] font-400 text-xl tracking-wider font-inter">
                Sub Category
              </h3>
              <CollasableOpenBtn>
                <ChevronDown className="text-[#bb976c]" size={18} />
              </CollasableOpenBtn>
              <CollasableCloseBtn>
                <ChevronDown className="text-[#bb976c] rotate-180" size={18} />
              </CollasableCloseBtn>
            </div>

            <CollasableBody>
              <ul className="mt-3 space-y-3.5 ml-1">
                {subCategories.map((subCategory) => (
                  <li key={subCategory.id}>
                    <Link href={`?category=${searchParams.category}&sub-category=${subCategory.slug}`}>
                      <CustomCheckBox checked={searchParams["sub-category"] === subCategory.slug} className="flex items-center gap-3.5 font-inter text-gray-600">
                        <span className="text-sm">{subCategory.name}</span>
                      </CustomCheckBox>
                    </Link>
                  </li>
                ))}
              </ul>
            </CollasableBody>
          </div>
        </Collapsible>
      ) : null}
    </>
  );
}
