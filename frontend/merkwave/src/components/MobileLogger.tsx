"use client";
import { useEffect } from "react";

// Development-only debug component — not mounted in any layout.
// To re-enable during debugging, temporarily add <MobileLogger /> back
// into [lang]/layout.tsx and open the page on a mobile device.
export default function MobileLogger() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const handleError = (event: ErrorEvent) => {
      console.error("[MobileLogger] Global error:", event);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("[MobileLogger] Unhandled rejection:", event.reason);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
