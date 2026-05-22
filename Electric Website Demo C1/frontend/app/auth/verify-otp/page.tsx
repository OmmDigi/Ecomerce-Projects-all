import AuthForm from "@/app/component/Auth/AuthForm";
import React from "react";

interface IProps {
  searchParams: Promise<{
    email: string;
    ["verify-type"]: "signup-verify" | "forgot-password-verify";
  }>;
}
export default async function page({ searchParams }: IProps) {
  const type = await (await searchParams)["verify-type"];
  return (
    <main className="min-h-screen space-y-10 flex items-center justify-start pt-16 flex-col">
      <h3 className="font-bold text-3xl font-open">
        {type === "forgot-password-verify"
          ? "Verify Otp & Change Password"
          : "Verify Otp"}
      </h3>

      <React.Suspense>
        <AuthForm authtype="verify-otp" />
      </React.Suspense>
    </main>
  );
}
