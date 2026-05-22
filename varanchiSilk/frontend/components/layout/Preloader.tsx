"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PreloaderScreen from "./PreloaderScreen";

const MIN_INITIAL_TIME = 350;
const ROUTE_SETTLE_TIME = 250;
const FALLBACK_HIDE_TIME = 700;

export default function Preloader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const hasMounted = useRef(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (fallbackTimer.current) {
      clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }

    if (routeTimer.current) {
      clearTimeout(routeTimer.current);
      routeTimer.current = null;
    }
  };

  useEffect(() => {
    const startedAt = Date.now();

    const hideAfterMinimumTime = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(MIN_INITIAL_TIME - elapsed, 0);
      routeTimer.current = setTimeout(() => setIsVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      hideAfterMinimumTime();
    } else {
      window.addEventListener("load", hideAfterMinimumTime, { once: true });
    }

    return () => {
      window.removeEventListener("load", hideAfterMinimumTime);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const handleRouteIntent = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor?.href || anchor.target === "_blank") {
        return;
      }

      const nextUrl = new URL(anchor.href);
      const currentUrl = new URL(window.location.href);

      if (
        nextUrl.origin !== currentUrl.origin ||
        nextUrl.href === currentUrl.href
      ) {
        return;
      }

      setIsVisible(true);
      clearTimers();
      fallbackTimer.current = setTimeout(
        () => setIsVisible(false),
        FALLBACK_HIDE_TIME,
      );
    };

    document.addEventListener("click", handleRouteIntent, true);
    return () => document.removeEventListener("click", handleRouteIntent, true);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    clearTimers();
    routeTimer.current = setTimeout(
      () => setIsVisible(false),
      ROUTE_SETTLE_TIME,
    );
  }, [pathname]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#053628]">
      <PreloaderScreen />
    </div>
  );
}
