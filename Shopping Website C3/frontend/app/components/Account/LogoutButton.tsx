"use client";

import { useUserAuth } from "@/app/zustand/useUserAuth";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function LogoutButton({
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { doLogout } = useUserAuth();
  const route = useRouter();
  return (
    <button
      onClick={() => {
        if (!confirm("Are you sure you want to logout ?")) return;
        doLogout();
        toast.success("Logout Completed");
        route.replace("/auth/login")
      }}
      {...props}
    >
      {children}
    </button>
  );
}
