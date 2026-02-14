"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Galaxy from "@/components/Galaxy";
import { Filter } from "lucide-react";
import { API_ENDPOINTS, getImageUrl as getImageUrlHelper } from "@/config/api";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

interface Project {
  id: number;
  slug: string;
  titleEn: string;
  titleAr: string;
  clientName: string;
  projectDate: string;
  category: string;
  categoryAr: string;
  imageUrl: string;
  demoUrl: string;
}

const categoryColors: Record<string, string> = {
  WEB_DEVELOPMENT: "bg-cyan-500",
  MOBILE_DEVELOPMENT: "bg-blue-500",
  DESKTOP_APPLICATION: "bg-purple-500",
  ECOMMERCE: "bg-green-500",
  BRANDING: "bg-pink-500",
  SEO: "bg-yellow-500",
  SOCIAL_MEDIA: "bg-orange-500",
  MEDIA_PRODUCTION: "bg-red-500",
  DIGITAL_MARKETING: "bg-indigo-500",
  PHOTOGRAPHY: "bg-teal-500",
};

export default function PortfolioClient({
  dict,
  lang,
}: LocalizedComponentProps) {
  const isArabic = lang === "ar";
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(API_ENDPOINTS.PROJECTS.GET_ALL);
        const data = await response.json();

        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === "ALL") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === selectedCategory),
      );
    }
  }, [selectedCategory, projects]);

  // Build category map from projects (category -> categoryAr)
  const categoryMap = projects.reduce(
    (acc, project) => {
      if (!acc[project.category]) {
        acc[project.category] = project.categoryAr;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  // Get unique categories from projects
  const categories = [
    "ALL",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  // Get category label based on language
  const getCategoryLabel = (category: string) => {
    if (category === "ALL") {
      return isArabic ? "جميع المشاريع" : "All Projects";
    }
    if (isArabic) {
      return categoryMap[category] || category;
    }
    // Format English category names (e.g., "WEB_DEVELOPMENT" -> "Web Development")
    return category
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`min-h-screen relative bg-[url(/mawgatna.webp)] md:bg-fixed bg-cover bg-center`}
    >
      <div className="absolute inset-0 bg-black/50  pointer-events-none"></div>
      <div className="relative  z-10">
        {/* Hero Section */}
        <section className="text-center   ">
          <div className=" mx-auto w-full relative flex flex-col items-center justify-center realtive min-h-screen bg-black ">
            <div className="absolute inset-0 z-1  h-full w-full overflow-hidden  pointer-events-none">
              <Galaxy
                mouseRepulsion={false}
                mouseInteraction={false}
                density={2}
                glowIntensity={0.5}
                saturation={12}
                hueShift={50}
              />
            </div>

            <div className="  max-w-7xl w-full mx-auto z-50 overflow-hidden mb-4">
              <Link
                href={`/${lang}`}
                className="inline-flex items-center hover:scale-105  gap-2 text-white hover:text-cyan-400 transition-colors duration-300 z-50"
              >
                <ArrowLeft
                  className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`}
                />
                <span>{isArabic ? "العودة إلى الرئيسية" : "Back to Home"}</span>
              </Link>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-8xl font-bold mb-6 z-50"
            >
              <span className="text-[#00FFFF] ">
                {isArabic ? "المشاريع" : "Portfolio"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-200 text-base sm:text-xl z-50 max-w-3xl mx-auto"
            >
              {isArabic
                ? "مشاريعنا المختارة ودراسات الحالة."
                : "Our selected projects and case studies."}
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}

        <section className="py-8 px-4 pt-25 ">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 ">
            <h3 className="text-xl md:text-4xl  text-[#F6FF00] text-center ">
              {isArabic
                ? "ابحث عما يخص مشروعك الخاص"
                : "Search for what matters to your project"}
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 z-10"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#F6FF00] text-black shadow-lg shadow-yellow-400/50"
                      : "bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 border border-gray-600/30"
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center text-white text-xl py-20">
                {isArabic ? "جاري التحميل..." : "Loading..."}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center text-gray-300 text-xl py-20">
                {isArabic
                  ? "لا توجد مشاريع في هذه الفئة"
                  : "No projects in this category"}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative "
                  >
                    <div className="bg-[#0d1b2a] hover:shadow-[0_0_10px_rgba(7,234,230,0.6)] hover:scale-105 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 h-full flex flex-col">
                      {/* Project Image */}
                      <div className="relative h-48 bg-gray-200 overflow-hidden ">
                        <Image
                          src={getImageUrlHelper(project.imageUrl)}
                          alt={isArabic ? project.titleAr : project.titleEn}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Project Info */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Client Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`w-2 h-2 rounded-full ${categoryColors[project.category] || "bg-gray-500"}`}
                          />
                          <span className="text-gray-400 text-sm">
                            {project.clientName}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-cyan-400 mb-3 line-clamp-2 flex-1">
                          {isArabic ? project.titleAr : project.titleEn}
                        </h3>

                        {/* View Project Link */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50 gap-4">
                          {project.demoUrl ? (
                            <a
                              href={
                                project.demoUrl.startsWith("http")
                                  ? project.demoUrl
                                  : `https://${project.demoUrl}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-around gap-1 transition-colors duration-300"
                            >
                              {isArabic ? "عرض المشروع" : "View project"}
                              <ExternalLink size={16} />
                            </a>
                          ) : (
                            <Link
                              href={`/${lang}/portfolio/projects?slug=${project.slug}`}
                              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-around gap-1 transition-colors duration-300"
                            >
                              {isArabic ? "عرض المشروع" : "View project"}
                              <ExternalLink size={16} />
                            </Link>
                          )}
                          <span className="text-gray-500 text-sm">
                            {formatDate(project.projectDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 z-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className=" rounded-3xl p-1 sm:p-3 md:p-16   text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-6 z-20">
                {isArabic
                  ? "هل أنت مستعد لبدء مشروع؟"
                  : "Ready To Start A Project?"}
              </h2>
              <p className="text-gray-200 text-md sm:text-xl mb-10 max-w-3xl mx-auto z-10">
                {isArabic
                  ? "رؤيتك، خبرتنا. دعنا نصنع شيئًا رائعًا معًا."
                  : "Your vision, our expertise. Let's create something remarkable together."}
              </p>
              <Link href={`/${lang}/contact` as any}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-2 py-3 gap-1 md:gap-3 md:px-10 md:py-5 bg-gradient-to-r from-orange-400 to-red-700 text-black font-bold text-sm sm:text-lg rounded-full transition-all duration-300 shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60"
                >
                  {isArabic ? "احصل على عرض أسعار" : "Get a Quote"}
                  <ExternalLink size={20} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
