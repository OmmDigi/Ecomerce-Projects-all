"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  maxLimit ? : number;
  totalItems : number
}

export default function PaginitionButton({ totalItems, maxLimit = 10 } : IProps) {
  const route = useRouter();
  // const searchParams = useSearchParams();
  return (
    <div className="flex items-center justify-center gap-3.5 pt-6">
      <button
        onClick={() => {
          const urlSearchParams = new URLSearchParams(window.location.search);
          const page = parseInt(urlSearchParams.get("page")?.toString() ?? "1");
          if(page <= 1) return;
          urlSearchParams.set("page", `${page - 1}`);
          route.push(`?${urlSearchParams.toString()}`);
        }}
        className="p-3 bg-black rounded-full text-white"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => {
          const urlSearchParams = new URLSearchParams(window.location.search);
          const page = parseInt(urlSearchParams.get("page")?.toString() ?? "1");
          urlSearchParams.set("page", `${page + 1}`);
          route.push(`?${urlSearchParams.toString()}`);
        }}
        className="p-3 bg-black rounded-full text-white"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
