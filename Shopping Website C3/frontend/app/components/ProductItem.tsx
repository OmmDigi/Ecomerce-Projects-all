import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../types";

interface IProps {
  product : IProduct
}

export default function ProductItem({ product }: IProps) {
  const secoundImage = product.images?.[1];
  return (
    <Link href={"/products/" + product.slug} className="border-r-[0.2px] border-r-gray-300">
      <div className="w-full max-h-100 h-56 md:min-h-100 lg:min-h-100 aspect-9/16 relative group overflow-hidden">
        <Image
          className={`absolute size-full object-cover z-10 inset-0 ${secoundImage ? "group-hover:opacity-0 transition-all duration-500" : ""}`}
          src={product.images[0].image}
          alt={product.images[0].alt_tag ?? ""}
          height={1080}
          width={1920}
        />
        {
          secoundImage ? <Image
          className="absolute size-full z-0 object-cover inset-0 scale-100 group-hover:opacity-100 transition-all duration-3000 group-hover:scale-130 "
          src={secoundImage.image}
          alt={secoundImage.alt_tag ?? ""}
          height={1080}
          width={1920}
        /> : null
        }
        
      </div>

      <div className="py-10 px-7 bg-white space-y-3">
        <h2 className="font-semibold font-spartan text-sm tracking-wider hover:underline cursor-pointer">
          {product.name}
        </h2>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={14} fill={star <= parseInt(product.rating) ? "#000" : "#fff"} />
          ))}
        </div>

        <span className="font-spartan font-semibold text-sm">₹{product.price}</span>
      </div>
    </Link>
  );
}
