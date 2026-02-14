"use client";

import React, { useState } from "react";
import type { FormEvent } from "react";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tokenAtom, tokenTimestampAtom, isTokenExpired } from "@/atom/Auth";

import InputField from "@/components/InputField";
import { LOGIN_ENDPOINT } from "@/config/config";

const Page: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [token, setToken] = useAtom(tokenAtom);
  const [tokenTimestamp, setTokenTimestamp] = useAtom(tokenTimestampAtom);
  const router = useRouter();

  // Redirect to dashboard if already logged in and token not expired
  React.useEffect(() => {
    if (token) {
      if (isTokenExpired(tokenTimestamp)) {
        // Token expired, clear it
        setToken("");
        setTokenTimestamp(0);
      } else {
        router.replace("/dashboard");
      }
    }
  }, [token, tokenTimestamp, router, setToken, setTokenTimestamp]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries()) as {
      username: string;
      password: string;
    };

    // Backend expects PascalCase property names
    const data = {
      UserName: formEntries.username,
      Password: formEntries.password,
    };

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.message || "Login failed");
        return;
      }

      const result = await response.json();

      if (result.token) {
        // atomWithStorage handles localStorage automatically
        setToken(result.token);
        setTokenTimestamp(Date.now()); // Set timestamp for 60 minute expiry
        setError("");
        router.push("/dashboard");
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network or server error");
    }
  };

  return (
    <main
      className="w-screen h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
      style={{
        fontFamily: "Tajawal, sans-serif",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-pink-300/10 rounded-full blur-2xl"></div>

      <form
        onSubmit={handleLogin}
        className="relative flex flex-col items-center text-right justify-center w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20"
      >
        {/* Logo/Icon */}
        <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl mb-2 text-center font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          تسجيل الدخول
        </h2>
        <p className="text-gray-500 mb-6 sm:mb-8 text-center text-xs sm:text-sm">
          Welcome back! Please login to continue
        </p>

        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <InputField
          name="username"
          label="اسم المستخدم"
          type="text"
          placeholder="ادخل اسم المستخدم"
        />
        <InputField
          name="password"
          label="كلمة المرور"
          type="password"
          placeholder="ادخل كلمة المرور"
        />

        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          تسجيل الدخول
        </button>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="h-px w-12 bg-gray-300"></div>
          <span>Secure Login</span>
          <div className="h-px w-12 bg-gray-300"></div>
        </div>
      </form>
    </main>
  );
};

export default Page;
