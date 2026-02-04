"use client";
import { useEffect } from "react";

export default function MobileLogger() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      alert(
        `Global error caught:\n\nMessage: ${event.message}\nSource: ${event.filename}:${event.lineno}:${event.colno}\nStack: ${event.error?.stack}`
      );
      console.error("Global mobile error:", event);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", (event) => {
      alert(
        `Unhandled Promise Rejection:\n\n${JSON.stringify(event.reason, null, 2)}`
      );
      console.error("Unhandled rejection:", event);
    });

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  return null;
}
