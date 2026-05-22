import Image from "next/image";
import Link from "next/link";
import { IServerRes, ITags } from "../types";
import { serverApi } from "../lib/serverApi";

// const tags = [
//   {
//     id: 1,
//     img: "/tags/demo-4-banner-1.png",
//     heading: "Mini Fan",
//   },
//   {
//     id: 2,
//     img: "/tags/banner-h2-m-2-image.png",
//     heading: "VR Product",
//   },
//   {
//     id: 3,
//     img: "/tags/banner-h2-m-3-image.png",
//     heading: "CC Camera",
//   },
//   {
//     id: 4,
//     img: "/tags/banner-h2-m-4-image.png",
//     heading: "Smartphone",
//   },
//   {
//     id: 5,
//     img: "/tags/banner-h2-m-5-image.png",
//     heading: "Camera",
//   },
// ];
export const dynamic = "force-dynamic";

export default async function TagsSection() {
  let tags: ITags[] = [];

  try {
    const response = (
      await serverApi.get<IServerRes<ITags[]>>(
        "/api/v1/products/recipient?limit="
      )
    ).data;
    tags = response.data;
  } catch (error) {
    return <p>Unable to fetch tags list</p>;
  }

  return tags.length == 0 ? null : (
    <section className="container mx-auto px-4 space-y-12">
      <div className="flex items-center justify-center flex-col gap-y-2.5">
        <h2 className="font-bold text-3xl md:text-4xl lg:text-4xl font-open">
          Choose your Choice
        </h2>
        <h3 className="text-gray-800 text-center font-300 text-[1.10rem] md:text-lg lg:text-lg leading-[1.6] tracking-[.3px] font-sans">
          Smartwatches provide quick access to notifications, calls, messages,
          and
          <br />
          apps right on your wrist, reducing the constantly check your phone.
        </h3>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-8">
        {tags.map((item) => (
          <li key={item.id}>
            <Link
              href={`/products?tag=${item.tag_name}`}
              className="block overflow-hidden aspect-9/16 rounded-3xl relative hover:-translate-y-2 duration-300 transition-transform"
            >
              <Image
                src={item.image}
                alt=""
                height={1080}
                width={1920}
                className="size-full object-cover object-center"
              />

              <div className="absolute bottom-2.5 text-white px-7">
                <h2 className="line-clamp-1 font-semibold font-open">
                  {item.tag_name}
                </h2>
                <span className="underline text-sm">Buy Now</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
