import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ICategory, IProduct, IServerRes } from "../types";
import { getCategoriesServer } from "../lib/getCategoriesServer";
import { serverApi } from "../lib/serverApi";
import ProductItem from "./ProductItem";

interface IProps {
  categoryIndex: number;
  searchParams: Promise<any>;
}

export const dynamic = "force-dynamic";

export default async function CategorySection({
  categoryIndex,
  searchParams,
}: IProps) {
  let cateogries: ICategory[] = [];

  try {
    const categoriesResponse = await getCategoriesServer();
    cateogries = categoriesResponse.data;
  } catch (error) {
    console.log("Category getting error");
    console.log(error);
    return (
      <p className="text-center font-semibold">
        Unable to process your request
      </p>
    );
  }

  if (!cateogries[categoryIndex]) return null;

  // seach products accoding to the current category
  const queryParams = await searchParams;

  const urlSearchParams = new URLSearchParams(queryParams);
  urlSearchParams.set("limit", "8");
  urlSearchParams.set("category", cateogries[categoryIndex].slug);

  if (queryParams["sub-category"] && cateogries[categoryIndex].slug == queryParams.category) {
    urlSearchParams.set("sub_category", queryParams["sub-category"]);
  }

  let products = [];

  try {
    if (urlSearchParams.get("category") == "all") {
      urlSearchParams.delete("category");
    }
    const response = (
      await serverApi.get<IServerRes<IProduct[]>>(
        `/api/v1/products?${urlSearchParams.toString()}`
      )
    ).data;
    products = response.data;
  } catch (error) {
    console.log("Product getting error");
    console.log(error);
    return (
      <p className="text-center font-semibold">
        Unable to get product list
      </p>
    );
  }

  return cateogries.length == 0 ? (
    <p className="text-lg text-gray-700 text-center font-spartan">
      No category found!
    </p>
  ) : (
    <section>
      {/* Header Desktop*/}
      <div className="hidden md:grid lg:grid grid-cols-3 gap-x-16 container px-4 mx-auto py-6">
        <ul className="flex items-center gap-x-10">
          {cateogries[categoryIndex].sub_categories
            .slice(0, 4)
            .map((sc, index) => (
              <li key={index}>
                <Link
                  scroll={false}
                  href={`?category=${cateogries[categoryIndex].slug}&sub-category=${sc.slug}`}
                  className={`uppercase text-black ${
                    sc.slug == queryParams["sub-category"]
                      ? "opacity-100"
                      : "opacity-60"
                  } font-medium text-xs tracking-wider font-spartan`}
                >
                  {sc.name}
                </Link>
              </li>
            ))}
        </ul>

        <h2 className="text-3xl text-center font-bold font-spartan flex-1 uppercase">
          {cateogries[categoryIndex].name}
        </h2>

        <Link
          href={`/products?category=${cateogries[categoryIndex].slug}`}
          className="inline-flex justify-end items-center gap-3.5"
        >
          <div className="h-[0.0350rem] w-11 bg-black"></div>
          <span className="font-semibold text-xs hover:underline inline-block mt-1 font-spartan tracking-wider">
            VIEW ALL COLLECTION
          </span>
        </Link>
      </div>

      {/* Header Mobile */}
      <div className="block md:hidden lg:hidden container px-4 mx-auto py-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold font-spartan flex-1 uppercase">
            {cateogries[categoryIndex].name}
          </h2>

          <Link
            scroll={false}
            href={`/products?category=${cateogries[categoryIndex].slug}`}
            className="inline-flex items-center gap-3.5"
          >
            <span className="font-semibold flex items-center gap-1.5 underline text-xs hover:underline mt-1 font-spartan tracking-wider">
              View More
              <ChevronRight size={16} />
            </span>
          </Link>
        </div>

        <ul className="flex items-center gap-x-3 py-3 overflow-x-scroll overflow-y-visible">
          {cateogries[categoryIndex].sub_categories
            .slice(0, 4)
            .map((sc, index) => (
              <li key={index}>
                <Link
                  scroll={false}
                  href={`?category=${cateogries[categoryIndex].slug}&sub-category=${sc.slug}`}
                  className={`uppercase text-black ${
                    sc.slug == queryParams["sub-category"] ? "opacity-100 bg-black text-white" : "opacity-60"
                  } font-medium border p-2 pt-3 text-xs tracking-wider font-spartan text-nowrap`}
                >
                  {sc.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
