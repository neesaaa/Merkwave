"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { API_ENDPOINTS, getImageUrl as getImageUrlHelper } from "@/config/api";
interface BlogDetail {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn: string;
  detailedDescriptionAr: string;
  imageUrl: string;
  creator: string;
  blogDate: string;
}

interface BlogDetailQueryClientProps {
  locale: Locale;
}

export function BlogDetailQueryClient({ locale }: BlogDetailQueryClientProps) {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const isArabic = locale === "ar";

  useEffect(() => {
    if (!blogId) {
      setError("No blog ID provided");
      setLoading(false);
      return;
    }

    async function fetchBlog() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          API_ENDPOINTS.BLOGS.GET_BY_ID(Number(blogId)),
        );

        if (!response.ok) {
          throw new Error("Blog not found");
        }

        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [blogId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!blogId) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43]"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-300 text-lg">
            {isArabic ? "لم يتم تحديد معرف المقال" : "No blog ID provided"}
          </p>
          <Link
            href={`/${locale}/blogs`}
            className="inline-flex items-center mt-6 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft
              className={`w-5 h-5 ${isArabic ? "ml-2 rotate-180" : "mr-2"}`}
            />
            {isArabic ? "العودة للمقالات" : "Back to Blogs"}
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43]">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg">
            {isArabic ? "جاري تحميل المقال..." : "Loading blog..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43]"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-300 text-lg mb-6">
            {isArabic ? "لم يتم العثور على المقال" : "Blog post not found"}
          </p>
          <Link href={`/${locale}/blogs`}>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300">
              {isArabic ? "العودة إلى المقالات" : "Back to All Blogs"}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const title = isArabic ? blog.titleAr : blog.titleEn;
  const description = isArabic ? blog.descriptionAr : blog.descriptionEn;
  const content = isArabic
    ? blog.detailedDescriptionAr
    : blog.detailedDescriptionEn;

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43] ${isArabic ? "text-right" : "text-left"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div
          className={`flex items-center gap-2 text-sm text-gray-400 mb-8 ${isArabic ? "flex-row-reverse" : ""}`}
        >
          <Link
            href={`/${locale}`}
            className="hover:text-cyan-400 transition-colors"
          >
            {isArabic ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <Link
            href={`/${locale}/blogs`}
            className="hover:text-cyan-400 transition-colors"
          >
            {isArabic ? "المدونة" : "Blog"}
          </Link>
          <span>/</span>
          <span className="text-cyan-400 truncate max-w-xs">{title}</span>
        </div>

        <Link
          href={`/${locale}/blogs`}
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft
            className={`w-5 h-5 ${isArabic ? "ml-2 rotate-180" : "mr-2"}`}
          />
          {isArabic ? "العودة للمقالات" : "Back to Blogs"}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-400/15 via-pink-500/20 to-red-600/15 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>

            {/* Blog Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`flex flex-wrap gap-6 text-sm text-gray-400 mb-8 ${isArabic ? "flex-row-reverse" : ""}`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {blog.creator}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.blogDate)}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-300 text-lg leading-relaxed mb-8"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.imageUrl && (
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl overflow-hidden"
              >
                <div className="aspect-video relative">
                  <Image
                    src={getImageUrlHelper(blog.imageUrl)}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-8 lg:p-12"
            >
              <div
                className="prose prose-lg prose-invert max-w-none
                  prose-headings:text-cyan-400
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                  prose-strong:text-white
                  prose-ul:text-gray-300
                  prose-ol:text-gray-300
                  prose-blockquote:border-l-cyan-400 prose-blockquote:text-gray-300
                  prose-code:text-cyan-300 prose-code:bg-gray-800/50 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-600/40"
                dangerouslySetInnerHTML={{ __html: content || "" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to Blogs CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href={`/${locale}/blogs`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
              >
                <ArrowLeft
                  className={`${isArabic ? "ml-2 rotate-180" : "mr-2"} w-5 h-5`}
                />
                {isArabic ? "العودة إلى المقالات" : "Back to All Blogs"}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
