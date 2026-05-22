"use client";

import FloatingLabelInput from "../HelperComponent/FloatingLabelInput";
import Button from "../Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postFetcher } from "@/app/lib/clientApi";
import { AxiosError } from "axios";
import { IServerRes } from "@/app/types";
import { toast } from "react-toastify";

interface IProps {
  authtype: "login" | "signup" | "forgotpasswrod" | "verify-otp";
}

export default function AuthForm({ authtype }: IProps) {
  const searchParams = useSearchParams();
  const route = useRouter();

  const email = searchParams.get("email");
  const verifyType = searchParams.get("verify-type");

  const [passwordInputType, setPasswordInputType] = useState<
    "text" | "password"
  >("password");

  // Refactor mutationFn to accept the URL and data
  const mutationFn = useCallback(
    async ({ url, formData }: { url: string; formData: any }) => {
      const response = await postFetcher(url, formData);
      return response;
    },
    []
  );
  const { mutate, isPending } = useMutation<
    IServerRes<any>,
    AxiosError<IServerRes>,
    { url: string; formData: any }
  >({
    mutationKey: ["auth", authtype],
    mutationFn: mutationFn,
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (authtype === "login") {
      mutate(
        {
          url: "/api/v1/users/login",
          formData: {
            email: formData.get("email"),
            password: formData.get("password"),
          },
        },
        {
          onError(error) {
            if (error.status == 301) {
              toast.success(error.response?.data.message);
              route.push(`/auth/verify-otp?email=${formData.get("email")}`);
            } else {
              toast.error(error.response?.data.message);
            }
          },
          onSuccess(data) {
            // store token in local storage
            localStorage.setItem("token", data.data.refreshToken);
            toast.success(data.message);

            // check any redirect url avilable to not if not redirect him to home page else the redirect url
            const redirectUrl = searchParams.get("redirect-url");
            if (!redirectUrl) {
              route.push("/");
            } else {
              route.push(redirectUrl);
            }
          },
        }
      );
      return;
    }

    if (authtype === "signup") {
      mutate(
        {
          url: "/api/v1/users/signup",
          formData: {
            name: formData.get("name"),
            email: formData.get("email"),
            phone_no: formData.get("phone_no"),
            password: formData.get("password"),
          },
        },
        {
          onError(error) {
            toast.error(error.response?.data.message);
          },
          onSuccess(data) {
            toast.success(data.message);
            route.push(`/auth/verify-otp?email=${formData.get("email")}`);
          },
        }
      );
      return;
    }

    if (authtype === "verify-otp") {
      const payloadToSend: Record<string, string | FormDataEntryValue | null> =
        { otp: formData.get("otp"), email: email };
      if (verifyType == "forgot-password-verify") {
        payloadToSend["password"] = formData.get("password");
      }
      mutate(
        {
          url: "/api/v1/users/verify-otp",
          formData: payloadToSend,
        },
        {
          onSuccess(data) {
            toast.success(data.message);
            route.push("/auth/login");
          },
          onError(error) {
            toast.error(error.response?.data.message);
          },
        }
      );
      return;
    }

    if (authtype === "forgotpasswrod") {
      mutate(
        {
          url: "/api/v1/users/send-otp",
          formData: { email: formData.get("email") },
        },
        {
          onSuccess(data) {
            toast.success(data.message);
            route.push(
              `/auth/verify-otp?email=${formData.get(
                "email"
              )}&verify-type=forgot-password-verify`
            );
          },
          onError(error) {
            toast.error(error.response?.data.message);
          },
        }
      );
      return;
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="min-w-[90%] max-w-[90%] md:min-w-104 md:max-w-104 lg:min-w-104 lg:max-w-104 space-y-5"
    >
      {authtype == "signup" ? (
        <>
          <FloatingLabelInput
            required
            name="name"
            label="Full Name"
            className="border-gray-400 focus:border-gray-400 rounded-full! px-8!"
            labelClassName="px-5!"
          />
          <FloatingLabelInput
            required
            name="phone_no"
            label="Phone Number"
            className="border-gray-400 focus:border-gray-400 rounded-full! px-8!"
            labelClassName="px-5!"
          />
        </>
      ) : null}

      <span className="block">
        {authtype === "verify-otp" ? null : (
          <FloatingLabelInput
            required
            name="email"
            label="Email"
            className="border-gray-400 focus:border-gray-400 rounded-full! px-8!"
            labelClassName="px-5!"
            defaultValue={email ?? undefined}
          />
        )}

        {authtype === "forgotpasswrod" ? (
          <p className="text-gray-600 font-open text-center text-sm mt-1.5">
            Enter your forgot account email
          </p>
        ) : null}

        {authtype === "verify-otp" ? (
          <>
            <FloatingLabelInput
              required
              name="otp"
              label="Otp"
              className="border-gray-400 focus:border-gray-400 rounded-full! px-8!"
              labelClassName="px-5!"
            />
            <p className="text-gray-600 font-open text-center text-sm mt-1.5">
              Enter the otp which we have sent to your this ({email}) email
            </p>
          </>
        ) : null}
      </span>

      {authtype === "forgotpasswrod" ? null : verifyType ===
          "forgot-password-verify" ||
        authtype === "login" ||
        authtype === "signup" ? (
        <div className="relative">
          <FloatingLabelInput
            required
            name="password"
            label={
              verifyType === "forgot-password-verify"
                ? "Password"
                : "New Password"
            }
            type={passwordInputType}
            className="border-gray-400 focus:border-gray-400 rounded-full! pl-8! pr-12!"
            labelClassName="px-5!"
          />

          {passwordInputType === "password" ? (
            <Eye
              onClick={() => setPasswordInputType("text")}
              className="absolute right-5 top-[1.19rem] cursor-pointer"
              size={18}
              strokeWidth={1}
            />
          ) : (
            <EyeOff
              onClick={() => setPasswordInputType("password")}
              className="absolute right-5 top-[1.19rem] cursor-pointer"
              size={18}
              strokeWidth={1}
            />
          )}
        </div>
      ) : null}

      <span className="flex items-center justify-center flex-col gap-y-2.5">
        <Button
          disabled={isPending}
          className="bg-black! text-white! w-full flex items-center justify-center"
        >
          {isPending ? (
            <LoaderCircle
              size={19}
              strokeWidth={1.5}
              className="animate-spin"
            />
          ) : (
            <>
              {authtype === "login"
                ? "Login"
                : authtype === "signup"
                ? "Create Account"
                : authtype === "forgotpasswrod"
                ? "Send otp"
                : "Verify otp"}
            </>
          )}
        </Button>
        {authtype == "login" ? (
          <>
            <Link
              href={"/auth/signup"}
              className="block text-center underline mt-3.5 font-inter text-sm"
            >
              New customer? Sign up for an account
            </Link>

            <Link
              href={"/auth/forgot-password"}
              className="underline block text-sm"
            >
              Forgot your password?
            </Link>
          </>
        ) : authtype === "signup" ? (
          <Link
            href={"/auth/login"}
            className="block text-center underline mt-3.5 font-inter text-sm"
          >
            Already have account ? login here
          </Link>
        ) : authtype === "forgotpasswrod" ? (
          <Link
            href={"/auth/login"}
            className="block text-center underline mt-3.5 font-inter text-sm"
          >
            Back to login
          </Link>
        ) : authtype === "verify-otp" && verifyType === "forgot-password-verify" ? (
          <Link
            href={`/auth/forgot-password?email=${email}`}
            className="block text-center underline mt-3.5 font-inter text-sm"
          >
            Wrong email? change it
          </Link>
        ) : null}
      </span>
    </form>
  );
}
