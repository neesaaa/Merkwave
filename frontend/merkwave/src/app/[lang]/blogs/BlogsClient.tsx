"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { API_ENDPOINTS, getImageUrl as getImageUrlHelper } from "@/config/api";
interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

interface BlogPost {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  creator: string;
  blogDate: string;
}

export default function BlogsClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === "ar";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5070";

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/placeholder.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${API_BASE_URL}${imageUrl}`;
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main
      className={`min-h-screen bg-[#020617] bg-[url('/mawgatna.webp')] md:bg-fixed bg-cover bg-center`}
    >
      {/* Hero Section */}
      <section className="py-20 px-1 sm:px-4">
        <div className="felx flex-col text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl p-3 md:p-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {isArabic ? "مدونتنا" : "Our Blog"}
              </span>
            </h1>
            <p className="text-white text-lg mx-auto">
              {isArabic
                ? "ابق على اطلاع بأحدث الاتجاهات والرؤى والنصائح في التسويق الرقمي وتطوير الويب ونمو الأعمال."
                : "Stay updated with the latest trends, insights, and tips in digital marketing, web development, and business growth."}
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          <p className="text-gray-400 mt-4">
            {isArabic ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            {isArabic
              ? "لا توجد مقالات متاحة حالياً"
              : "No blogs available at the moment"}
          </p>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 border border-cyan-500/20 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black"
              >
                <div className="relative h-[300px] lg:h-auto">
                  <Image
                    src={getImageUrlHelper(posts[0].imageUrl)}
                    alt={isArabic ? posts[0].titleAr : posts[0].titleEn}
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className="p-4 sm:p-8 flex flex-col justify-center"
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                    {isArabic ? posts[0].titleAr : posts[0].titleEn}
                  </h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {isArabic ? posts[0].descriptionAr : posts[0].descriptionEn}
                  </p>
                  <div
                    className={`flex items-center gap-4 text-sm text-gray-500 mb-6 ${isArabic ? "flex-row-reverse" : ""}`}
                  >
                    <span>
                      {isArabic ? "بواسطة" : "By"} {posts[0].creator}
                    </span>
                    <span>•</span>
                    <span>{formatDate(posts[0].blogDate)}</span>
                  </div>
                  <Link
                    href={`/${lang}/blogs/blogdetail?id=${posts[0].id}` as any}
                    className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:gap-4 transition-all duration-300"
                  >
                    {isArabic ? "اقرأ المزيد" : "Read More"}
                    <ArrowRight
                      className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`}
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* All Articles */}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h3
                className="text-3xl font-bold text-left mb-8"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {isArabic ? "جميع المقالات" : "All Articles"}
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(1).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group border border-gray-700/50 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getImageUrlHelper(post.imageUrl)}
                        alt={isArabic ? post.titleAr : post.titleEn}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6" dir={isArabic ? "rtl" : "ltr"}>
                      <h4 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {isArabic ? post.titleAr : post.titleEn}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {isArabic ? post.descriptionAr : post.descriptionEn}
                      </p>
                      <div
                        className={`flex items-center gap-3 text-xs text-gray-500 mb-4 ${isArabic ? "flex-row-reverse" : ""}`}
                      >
                        <span>
                          {isArabic ? "بواسطة" : "By"} {post.creator}
                        </span>
                        <span>•</span>
                        <span>{formatDate(post.blogDate)}</span>
                      </div>
                      <Link
                        href={`/${lang}/blogs/blogdetail?id=${post.id}` as any}
                        className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:gap-4 transition-all duration-300"
                      >
                        {isArabic ? "اقرأ المزيد" : "Read More"}
                        <ArrowRight
                          className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`}
                        />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="rounded-3xl p-12 text-center hover:border-cyan-500/50 transition-all duration-500"
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {isArabic ? "ابق على اطلاع" : "Stay Updated"}
                  </span>
                </h3>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  {isArabic
                    ? "اشترك في نشرتنا الإخبارية للحصول على أحدث الرؤى والتحديثات."
                    : "Subscribe to our newsletter for the latest insights and updates."}
                </p>
                <Link href={`/${lang}/contact` as any}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/50"
                  >
                    {isArabic ? "اشترك الآن" : "Subscribe Now"}
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
