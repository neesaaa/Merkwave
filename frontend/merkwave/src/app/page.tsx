"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/ar/");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-slate-700">
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-500">Merkwave</p>
        <h1 className="text-2xl font-semibold">Redirecting to the Arabic site…</h1>
        <p className="text-sm text-slate-500">
          If you are not redirected automatically,{" "}
          <a
            className="font-medium text-blue-600 underline underline-offset-4"
            href="/ar/"
          >
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

