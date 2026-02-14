"use client";

import React from "react";
import { useRouter } from "next/navigation";

const DashboardHome: React.FC = () => {
  const router = useRouter();

  return (
    <div className="text-center py-8 sm:py-12 px-4">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Select an option below to manage your content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/dashboard/projects")}
          className="group relative p-6 sm:p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 sm:group-hover:w-40 sm:group-hover:h-40 transition-all"></div>
          <div className="relative">
            <div className="mb-3 sm:mb-4 inline-block p-3 sm:p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
              Projects
            </h2>
            <p className="text-blue-100 text-sm sm:text-base">
              Manage your projects
            </p>
          </div>
        </button>

        <button
          onClick={() => router.push("/dashboard/blogs")}
          className="group relative p-6 sm:p-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 sm:group-hover:w-40 sm:group-hover:h-40 transition-all"></div>
          <div className="relative">
            <div className="mb-3 sm:mb-4 inline-block p-3 sm:p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
              Blogs
            </h2>
            <p className="text-pink-100 text-sm sm:text-base">
              Manage your blog posts
            </p>
          </div>
        </button>

        <button
          onClick={() => router.push("/dashboard/clients")}
          className="group relative p-6 sm:p-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden sm:col-span-2 lg:col-span-1"
        >
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 sm:group-hover:w-40 sm:group-hover:h-40 transition-all"></div>
          <div className="relative">
            <div className="mb-3 sm:mb-4 inline-block p-3 sm:p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
              Clients
            </h2>
            <p className="text-teal-100 text-sm sm:text-base">
              View client inquiries
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
