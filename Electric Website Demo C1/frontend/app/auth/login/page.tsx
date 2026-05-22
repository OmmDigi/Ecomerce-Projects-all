import AuthForm from "../../component/Auth/AuthForm";
import React from "react";

export default function page() {
  return (
    <main className="min-h-screen space-y-10 flex items-center justify-start pt-16 flex-col">
      <h3 className="font-bold text-3xl font-open">Login</h3>

      <React.Suspense>
        <AuthForm authtype="login" />
      </React.Suspense>
    </main>
  );
}
