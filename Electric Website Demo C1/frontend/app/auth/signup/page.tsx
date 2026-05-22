import React from "react";
import AuthForm from "../../component/Auth/AuthForm";

export default function page() {
  return (
    <main className="min-h-screen space-y-10 flex items-center justify-start pt-16 flex-col">
      <h3 className="font-bold text-3xl font-open">Signup</h3>

      <React.Suspense>
        <AuthForm authtype="signup" />
      </React.Suspense>
    </main>
  );
}
