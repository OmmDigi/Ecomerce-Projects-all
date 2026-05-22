import AuthForm from "@/app/component/Auth/AuthForm";
import React from "react";

export default function page() {
  return (
    <main className="min-h-screen space-y-10 flex items-center justify-start pt-16 flex-col">
      <h3 className="font-bold text-3xl font-open">Forgot Password</h3>

      <React.Suspense>
        <AuthForm authtype="forgotpasswrod" />
      </React.Suspense>
    </main>
  );
}
