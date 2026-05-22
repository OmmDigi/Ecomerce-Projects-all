import React from "react";

interface IProps extends React.ComponentProps<"button"> {
  varient?: "fill" | "non-fill";
}
export default function Button({ varient = "fill", ...props }: IProps) {
  return (
    <button
      {...props}
      className={`p-3 px-8 bg-transparent border border-white rounded-full cursor-pointer ${
        varient === "fill"
          ? "bg-white text-black"
          : "text-white hover:bg-white hover:text-black"
      } transition-all duration-300 text-4 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
