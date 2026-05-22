import Image from "next/image";
import { ICategory, IServerRes } from "../types";
import { serverApi } from "../lib/serverApi";
import Link from "next/link";

// const CATEGORY_LIST = [
//   {
//     id: 1,
//     name: "Accessories",
//     subtext: "6 Items",
//     image: "/category/cat1.webp",
//   },
//   {
//     id: 2,
//     name: "Home Appliances",
//     subtext: "1 Item",
//     image: "/category/cat2.webp",
//   },
//   {
//     id: 3,
//     name: "Kitchen Appliances",
//     subtext: "10 Items",
//     image: "/category/cat3.webp",
//   },
//   {
//     id: 4,
//     name: "PC & Laptop",
//     subtext: "6 Items",
//     image: "/category/cat4.webp",
//   },
//   {
//     id: 5,
//     name: "Phone & Tablet",
//     subtext: "11 Items",
//     image: "/category/cat5.webp",
//   },
// ];
export const dynamic = "force-dynamic";

export default async function CategoryListing() {
  let categories: ICategory[] = [];

  try {
    const response = (
      await serverApi.get<IServerRes<ICategory[]>>(
        "/api/v1/products/category?limit=5"
      )
    ).data;
    categories = response.data;
  } catch (error) {
    return <p>Unable to load categories list</p>;
  }

  return (
    <section className="container mx-auto px-4">
      <div className="space-y-11">
        <div className="flex items-center justify-center flex-col gap-y-4 md:gap-y-2.5 lg:gap-y-2.5">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-4xl font-open text-center md:text-left lg:text-left">
            Choose your Category
          </h2>
          <h3 className="text-gray-800 text-center font-300 text-[1.10rem] md:text-lg lg:text-lg leading-[1.6] tracking-[.3px] font-sans">
            Smartwatches provide quick access to notifications, calls, messages,
            and
            <br />
            apps right on your wrist, reducing the constantly check your phone.
          </h3>
        </div>

        <ul className="grid grid-cols-2 gap-7 md:gap-0 lg:gap-0 md:grid-cols-5 lg:grid-cols-5 w-full">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                className="flex items-center justify-center flex-col"
                href={`/products?category=${category.slug}`}
              >
                <div className="overflow-hidden rounded-3xl size-40 md:size-50 lg:size-50">
                  <Image
                    className="size-full object-cover"
                    src={category.image}
                    alt="Cat 1"
                    height={300}
                    width={300}
                  />
                </div>
                <h2 className="font-bold font-open mt-2.5">{category.name}</h2>
                {/* <h3 className="font-inter text-gray-700 text-sm mt-1">
                {category.id}
              </h3> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
