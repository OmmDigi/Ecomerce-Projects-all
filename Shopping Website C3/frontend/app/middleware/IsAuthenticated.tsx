"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IsAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      route.push("/auth/login");
      return;
    }

    setIsChecking(false);
  }, []);

  return <>{isChecking ? <p>Loading...</p> : children}</>;
}
