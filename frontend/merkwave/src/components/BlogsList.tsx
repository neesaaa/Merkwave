"use client";

import { useEffect, useState } from "react";
import { Locale } from "@/lib/i18n";
import { BlogsApiResponse, BlogListItem } from "@/types/blog";
import { BlogCard } from "@/components/BlogCard";
import { API_ENDPOINTS } from "@/config/api";

interface BlogsListProps {
  locale: Locale;
  initialBlogs?: BlogListItem[];
}

export function BlogsList({ locale, initialBlogs = [] }: BlogsListProps) {
  const [blogs, setBlogs] = useState<BlogListItem[]>(initialBlogs);
  const [loading, setLoading] = useState(initialBlogs.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if we don't have initial blogs (static generation scenario)
    if (initialBlogs.length === 0) {
      fetchBlogs();
    }
  }, [initialBlogs.length]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINTS.BLOGS.GET_ALL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">
          {locale === "ar" ? "جاري تحميل المقالات..." : "Loading blogs..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg mb-4">
          {locale === "ar"
            ? "حدث خطأ في تحميل المقالات"
            : "Error loading blogs"}
        </p>
        <button
          onClick={fetchBlogs}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {locale === "ar" ? "إعادة المحاولة" : "Try Again"}
        </button>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">
          {locale === "ar"
            ? "لا توجد مقالات متاحة حالياً"
            : "No blogs available at the moment"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} locale={locale} />
      ))}
    </div>
  );
}
