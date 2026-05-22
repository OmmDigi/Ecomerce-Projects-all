import AuthForm from "@/app/components/AuthForm";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      {/* <Input
        icon={<Mail size={18} strokeWidth={0.8}/>}
        placeholder="Email"
        className=""
      /> */}

      <div className="w-full px-4 container mx-auto md:min-w-104 md:max-w-104 lg:min-w-104 lg:max-w-104">
        <h2 className="font-semibold text-xl font-spartan uppercase">Forgot Password</h2>
        <div className="min-w-full h-px overflow-hidden bg-gray-200 mt-0.5">
          <div className="h-full w-[40%] bg-gray-700"></div>
        </div>

        <p className="text-gray-400 mt-2.5 mb-3 font-spartan">Enter your forgot account email:</p>

        <React.Suspense>
          <AuthForm authtype="forgotpasswrod" />
        </React.Suspense>
      </div>
    </div>
  );
}
