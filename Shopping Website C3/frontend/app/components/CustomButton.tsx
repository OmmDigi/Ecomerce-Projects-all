import { MoveRight } from "lucide-react";

interface IProps extends React.ComponentProps<"button"> {
  text: string;
}

export default function CustomButton({ text, className, ...props }: IProps) {
  return (
    <button
      {...props}
      className={`flex group hover:bg-black hover:text-white transition-all duration-500 items-center justify-center gap-x-2.5 text-sm uppercase py-3 pt-4 max-w-50 min-w-50 bg-white border border-black font-bold mt-4 font-spartan ${className}`}
    >
      {text}
      <MoveRight
        className="mb-1 -ml-8 opacity-0 group-hover:ml-0 group-hover:opacity-100 transition-all duration-700"
        size={18}
      />
    </button>
  );
}
