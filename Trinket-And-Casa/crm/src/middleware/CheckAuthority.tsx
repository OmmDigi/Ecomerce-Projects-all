import { Button } from "@/components/ui/button";
import type { IError, IResponse } from "@/types";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

const checkIsLogin = async () => {
  return (await api.get("/api/v1/users/is-login")).data;
};

interface IProps {
  children: React.ReactNode;
}
export default function CheckAuthority({ children }: IProps) {
  const { isPending, error } = useQuery<IResponse<null>, AxiosError<IError>>({
    queryKey: ["check-is-login"],
    queryFn: checkIsLogin,
  });

  if (isPending)
    return (
      <div className="size-full flex items-center justify-center flex-col pt-20 gap-y-1.5">
        <div className="bg-gray-100 p-2.5 rounded-md">
          <LoaderCircle className="animate-spin" />
        </div>
        <h2 className="font-semibold text-xl">Processing your request</h2>
        <p className="text-gray-600 text-sm">
          Please wait while we process your request. Do not refresh the page.
        </p>
      </div>
    );

  if (error) {
    if (error.status === 401) {
      return (
        <div className="flex items-center justify-center flex-col gap-y-2.5 pt-20">
          <h2>Unauthorized</h2>
          <Link to="/login">
            <Button className="cursor-pointer">Login</Button>
          </Link>
        </div>
      );
    }

    return <p className="text-center pt-14 text-lg">Something Went Wrong</p>;
  }

  return children;
}
