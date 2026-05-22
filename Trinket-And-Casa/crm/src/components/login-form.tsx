import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import type { AxiosError } from "axios";
import type { IError, IResponse } from "@/types";

const doLogin = async (body: {
  email: string | undefined;
  password: string | undefined;
}) => {
  return await api.post("/api/v1/users/login", body);
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isPending, mutate } = useMutation({
    mutationFn: doLogin,
    onSuccess: (data) => {
      const successData = data.data as IResponse<{ refreshToken: string }>;
      localStorage.setItem("token", successData.data.refreshToken);
      toast.success("Login Successfull");
      window.location.href = "/";
    },
    onError: (error: AxiosError<IError>) => {
      toast.error(error.response?.data.message ?? "Unable to login");
    },
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    };

    mutate(payload);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="cursor-pointer"
                >
                  {isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Ask Admin To Get Id Password
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
