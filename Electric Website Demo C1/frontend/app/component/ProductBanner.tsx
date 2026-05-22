import Image from "next/image";

interface IProps {
  images: { image: string; alt_tag?: string }[];
}
export default function ProductBanner({ images }: IProps) {
  return (
    <ul className="relative group size-full">
      {images.length === 0 ? null : images.length === 1 ? (
        <li>
          <Image
            src={images[0].image}
            className="size-full object-cover"
            alt={images[0].alt_tag ?? "Image"}
            height={1280}
            width={1280}
          />
        </li>
      ) : (
        <>
          <li>
            <Image
              src={images[0].image}
              className="size-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500 absolute"
              alt={images[0].alt_tag ?? "Image"}
              height={1280}
              width={1280}
            />
          </li>
          <li>
            <Image
              src={images[1].image}
              className="size-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute"
              alt={images[1].alt_tag ?? "Image"}
              height={1280}
              width={1280}
            />
          </li>
        </>
      )}
    </ul>
  );
}
