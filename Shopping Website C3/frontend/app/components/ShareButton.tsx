"use client";

import { Share } from "lucide-react";

interface IProps {
  productSlug: string;
}
export default function ShareButton({ productSlug }: IProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard
          // .writeText(`${location.protocol}//${location.hostname}/products/${productSlug}`)
          .writeText(location.href.toString())
          .then(() => {
            // toast.success("Share link successfully copied!");
            alert("Share link successfully copied!");
          })
          .catch((e) => {
            // toast.error("Unable to copy share link");
            alert("Unable to copy share link");
          });
      }}
      className="bg-white p-2 rounded-full cursor-pointer"
    >
      <Share strokeWidth={1} size={18} />
    </button>
  );
}
