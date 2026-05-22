"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyholeOpen,
  Mail,
  PhoneCall,
  RectangleEllipsis,
  User,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postFetcher } from "@/app/lib/clientApi";
import { IServerRes } from "@/app/types";
import { AxiosError } from "axios";
import Input from "./Input";
// import { toast } from "react-toastify";

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
              //   toast.success(error.response?.data.message);
              alert(error.response?.data.message);
              route.push(`/auth/verify-otp?email=${formData.get("email")}`);
            } else {
              //   toast.error(error.response?.data.message);
              alert(error.response?.data.message);
            }
          },
          onSuccess(data) {
            // store token in local storage
            localStorage.setItem("token", data.data.refreshToken);
            // toast.success(data.message);
            alert(data.message);

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
            // toast.error(error.response?.data.message);
            alert(error.response?.data.message);
          },
          onSuccess(data) {
            // toast.success(data.message);
            alert(data.message);
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
            // toast.success(data.message);
            alert(data.message);
            route.push("/auth/login");
          },
          onError(error) {
            // toast.error(error.response?.data.message);
            alert(error.response?.data.message);
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
            alert(data.message);
            // toast.success(data.message);
            route.push(
              `/auth/verify-otp?email=${formData.get(
                "email"
              )}&verify-type=forgot-password-verify`
            );
          },
          onError(error) {
            alert(error.response?.data.message);
            // toast.error(error.response?.data.message);
          },
        }
      );
      return;
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full space-y-5"
    >
      {authtype == "signup" ? (
        <>
          <Input
            icon={<User size={18} strokeWidth={0.9} />}
            required
            name="name"
            placeholder="Name"
          />

          <Input
            icon={<PhoneCall size={18} strokeWidth={0.9} />}
            required
            name="phone_no"
            placeholder="Phone Number"
          />
        </>
      ) : null}

      <span className="block">
        {authtype === "verify-otp" ? null : (
          <Input
            required
            name="email"
            placeholder="Email"
            icon={<Mail size={18} strokeWidth={0.9} />}
            defaultValue={email ?? undefined}
          />
        )}

        {/* {authtype === "forgotpasswrod" ? (
          <p className="text-gray-600 font-open text-center text-sm mt-1.5">
            Enter your forgot account email
          </p>
        ) : null} */}

        {authtype === "verify-otp" ? (
          <>
            <Input
              icon={<RectangleEllipsis size={18} strokeWidth={0.9} />}
              required
              name="otp"
              placeholder="Otp"
            />
            {/* <p className="text-gray-600 font-open text-center text-sm mt-1.5">
              Enter the otp which we have sent to your this ({email}) email
            </p> */}
          </>
        ) : null}
      </span>

      {authtype === "forgotpasswrod" ? null : verifyType ===
          "forgot-password-verify" ||
        authtype === "login" ||
        authtype === "signup" ? (
        <div className="relative">
          <Input
            required
            name="password"
            icon={<LockKeyholeOpen size={18} strokeWidth={0.9} />}
            placeholder={
              verifyType === "forgot-password-verify"
                ? "Password"
                : "New Password"
            }
            type={passwordInputType}
          />

          {passwordInputType === "password" ? (
            <Eye
              onClick={() => setPasswordInputType("text")}
              className="absolute right-5 top-[0.95rem] cursor-pointer"
              size={18}
              strokeWidth={1}
            />
          ) : (
            <EyeOff
              onClick={() => setPasswordInputType("password")}
              className="absolute right-5 top-[0.95rem] cursor-pointer"
              size={18}
              strokeWidth={1}
            />
          )}
        </div>
      ) : null}

      <span className="flex items-start justify-center flex-col gap-y-2.5 *:font-spartan">
        {authtype == "login" ? (
          <>
            <Link
              href={"/auth/forgot-password"}
              className="text-sm flex items-center gap-1"
            >
              <Mail size={14} strokeWidth={1.2} className="mb-0.5 mr-1" />
              <span className="text-gray-400">Forgot your</span>{" "}
              <span className="text-blue-500 font-semibold">Password ?</span>
            </Link>
            <Link
              href={"/auth/signup"}
              className="block text-left font-inter text-sm"
            >
              <span className="text-gray-500">
                If you don't have an account, please
              </span>{" "}
              <span className="text-blue-500 font-semibold">Register Here</span>
            </Link>
          </>
        ) : authtype === "signup" ? (
          <Link
            href={"/auth/login"}
            className="block text-center font-inter text-sm"
          >
            <span className="text-gray-500">Already have account</span>
            {" ? "}
            <span className="text-blue-500 font-semibold">login here</span>
          </Link>
        ) : authtype === "forgotpasswrod" ? (
          <Link
            href={"/auth/login"}
            className="block text-center font-inter text-sm"
          >
            <span className="text-gray-500">Back to</span>{" "}
            <span className="text-blue-500 font-semibold">login</span>
          </Link>
        ) : authtype === "verify-otp" &&
          verifyType === "forgot-password-verify" ? (
          <Link
            href={`/auth/forgot-password?email=${email}`}
            className="block text-center underline mt-3.5 font-inter text-sm"
          >
            Wrong email? change it
          </Link>
        ) : null}

        <button
          disabled={isPending}
          className="bg-[#222222] min-w-32 px-8 mt-3 py-3 uppercase pt-4 text-sm font-spartan rounded-md shadow-md text-white! flex items-center justify-center"
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
        </button>
      </span>
    </form>
  );
}
