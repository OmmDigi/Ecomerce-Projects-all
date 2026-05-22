import { Minus } from "lucide-react";
import CustomCheckBox from "./CustomCheckBox";
import { ICategory, IServerRes } from "../types";
import { serverApi } from "../lib/serverApi";
import Link from "next/link";
import { getCategoriesServer } from "../lib/getCategoriesServer";

interface IProps {
  searchParams: any;
}

export default async function CategoryFilter({ searchParams }: IProps) {
  let cateogries: ICategory[] = [];

  try {
    const categoriesResponse = await getCategoriesServer();
    cateogries = categoriesResponse.data;
  } catch (error) {
    console.error(error);
    return (
      <p className="text-center font-semibold">
        Unable to process your request
      </p>
    );
  }

  return (
    <ul className="col-span-2 space-y-7">
      <li>
        <h3>
          <Link
            scroll={false}
            href={"?category=all"}
            className="flex items-center gap-2.5 flex-1"
          >
            <CustomCheckBox
              checked={searchParams.category == "all"}
              className="text-gray-500 mb-1"
            />
            <span className="font-spartan flex-1 font-semibold text-lg uppercase tracking-wide">
              All
            </span>
          </Link>
        </h3>
      </li>
      {cateogries.map((category) => (
        <li key={category.id}>
          <h3 className="flex items-center gap-2.5">
            <Link
              scroll={false}
              href={`?category=${category.slug}`}
              className="flex items-center gap-2.5 flex-1"
            >
              <CustomCheckBox
                checked={searchParams.category == category.slug}
                className="text-gray-500 mb-1"
              />
              <span className="font-spartan flex-1 font-semibold text-lg uppercase tracking-wide">
                {category.name}
              </span>
            </Link>

            {category.sub_categories.length != 0 ? (
              <Minus size={18} className="text-gray-500 mb-1" />
            ) : null}
          </h3>
          <ul className="ml-4 space-y-2.5 mt-2.5">
            {category.sub_categories.map((subcategory) => (
              <li key={subcategory.id}>
                <Link
                  scroll={false}
                  href={`?category=${searchParams.category}&sub-category=${subcategory.slug}`}
                  className="flex items-center gap-1.5"
                >
                  <CustomCheckBox
                    checked={searchParams["sub-category"] == subcategory.slug}
                    className="text-gray-500"
                  />
                  <span className="font-spartan flex-1 mt-1 text-gray-800 font-medium text-sm tracking-wide">
                    {subcategory.name}
                  </span>

                  <span className="text-sm text-gray-800 font-spartan">
                    {subcategory.id}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
