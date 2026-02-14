"use client";

import { useCallback } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { tokenAtom, tokenTimestampAtom } from "@/atom/Auth";

export function useAuthFetch() {
  const [token, setToken] = useAtom(tokenAtom);
  const [, setTokenTimestamp] = useAtom(tokenTimestampAtom);
  const router = useRouter();

  const logout = useCallback(() => {
    setToken("");
    setTokenTimestamp(0);
    router.replace("/");
  }, [setToken, setTokenTimestamp, router]);

  const authFetch = useCallback(
    async (url: string, options: RequestInit = {}): Promise<Response> => {
      const headers = new Headers(options.headers);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        logout();
        throw new Error("Session expired. Please login again.");
      }

      return response;
    },
    [token, logout]
  );

  return { authFetch, token, logout };
}
