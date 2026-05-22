"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";

interface AOSProviderProps {
  children: React.ReactNode;
}

export default function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1500, // animation duration in ms
        once: false, // whether animation should happen only once
      });
    }
  }, []);

  return <>{children}</>;
}
