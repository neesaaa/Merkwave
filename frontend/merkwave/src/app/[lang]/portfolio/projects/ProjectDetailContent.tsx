"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { ProjectApiResponse, Project } from "@/types/project";

interface ProjectDetailContentProps {
  lang: string;
}

export default function ProjectDetailContent({
  lang,
}: ProjectDetailContentProps) {
  const locale = lang as Locale;
  const isArabic = locale === "ar";

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const dict = getDictionary(locale);

  useEffect(() => {
    if (!slug) {
      setError("No project slug provided");
      setLoading(false);
      return;
    }

    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://merkwave.com/api/projects/get_detail.php?slug=${encodeURIComponent(slug)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data: ProjectApiResponse = await response.json();

      if (data.status === "success" && data.data) {
        const projectItem = Array.isArray(data.data) ? data.data[0] : data.data;
        if (projectItem) {
          setProject(projectItem as Project);
        } else {
          setError("Project not found");
        }
      } else {
        setError("Project not found");
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2027] to-[#203a43]">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-slate-300 text-lg">
              {locale === "ar"
                ? "لم يتم تحديد معرف المشروع"
                : "No project slug provided"}
            </p>
            <Link
              href={`/${lang}/portfolio` as any}
              className="inline-block mt-6 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {locale === "ar" ? "العودة إلى المحفظة" : "Back to Portfolio"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2027] to-[#203a43]">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-6"></div>
            <p className="text-slate-300 text-lg">
              {locale === "ar" ? "جاري تحميل المشروع..." : "Loading project..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2027] to-[#203a43]">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-slate-300 text-lg mb-6">
              {locale === "ar"
                ? "لم يتم العثور على المشروع"
                : "Project not found"}
            </p>
            <button
              onClick={fetchProject}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
            >
              {locale === "ar" ? "إعادة المحاولة" : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const title = locale === "ar" ? project.titleAr : project.titleEn;
  const description =
    locale === "ar" ? project.descriptionAr : project.descriptionEn;
  const challenge =
    locale === "ar" ? project.challenge_ar : project.challenge_en;
  const solution = locale === "ar" ? project.solution_ar : project.solution_en;

  // Parse JSON arrays
  const technologies =
    project.technologiesEn && project.technologiesAr
      ? locale === "ar"
        ? JSON.parse(project.technologiesAr || "[]")
        : JSON.parse(project.technologiesEn || "[]")
      : [];

  const keyFeatures =
    project.key_features_en && project.key_features_ar
      ? locale === "ar"
        ? JSON.parse(project.key_features_ar || "[]")
        : JSON.parse(project.key_features_en || "[]")
      : [];

  const resultsAchieved =
    project.results_achieved_en && project.results_achieved_ar
      ? locale === "ar"
        ? JSON.parse(project.results_achieved_ar || "[]")
        : JSON.parse(project.results_achieved_en || "[]")
      : [];

  // Parse gallery images
  const galleryImages = project.gallery_images
    ? JSON.parse(project.gallery_images)
    : [];

  const handleGalleryNavigation = (direction: "next" | "prev") => {
    if (!galleryImages.length) return;

    if (direction === "next") {
      setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    } else {
      setActiveGalleryIndex(
        (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
      );
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43] ${isArabic ? "text-right" : "text-left"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div
          className={`flex items-center space-x-2 text-sm text-gray-400 mb-8 ${isArabic ? "flex-row-reverse space-x-reverse" : ""}`}
        >
          <Link
            href={`/${lang}` as any}
            className="hover:text-cyan-400 transition-colors"
          >
            {dict.navigation.home}
          </Link>
          <span>/</span>
          <Link
            href={`/${lang}/portfolio` as any}
            className="hover:text-cyan-400 transition-colors"
          >
            {dict.navigation.portfolio}
          </Link>
          <span>/</span>
          <span className="text-cyan-400">{title}</span>
        </div>

        <Link
          href={`/${lang}/portfolio` as any}
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft
            className={`w-5 h-5 ${isArabic ? "ml-2 rotate-180" : "mr-2"}`}
          />
          {locale === "ar" ? "العودة إلى المحفظة" : "Back to Portfolio"}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-400/15 via-pink-500/20 to-red-600/15 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {project.category && (
              <div className="mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium">
                  {project.category.replace(/_/g, " ")}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {description && (
              <div
                className="text-gray-200 text-xl mb-8 max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            <div
              className={`flex flex-wrap justify-center gap-6 text-sm text-gray-400 ${isArabic ? "flex-row-reverse" : ""}`}
            >
              {project.client_name && (
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  {project.client_name}
                </div>
              )}
              {project.project_date && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {locale === "ar" ? "تاريخ الإكمال" : "Completed"}:{" "}
                  {new Date(project.project_date).toLocaleDateString(
                    locale === "ar" ? "ar-EG" : "en-US",
                    { year: "numeric", month: "long" },
                  )}
                </div>
              )}
              {project.featured && (
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-yellow-400">
                    {locale === "ar" ? "مشروع مميز" : "Featured"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      {galleryImages.length > 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {locale === "ar" ? "معرض المشروع" : "Project Gallery"}
            </h2>

            <div className="relative max-w-4xl mx-auto">
              <div className="relative bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl overflow-hidden">
                {/* Main Gallery Image */}
                <div className="relative h-96">
                  <Image
                    src={galleryImages[activeGalleryIndex]}
                    alt={`${title} - Image ${activeGalleryIndex + 1}`}
                    fill
                    className="object-cover"
                  />

                  {/* Gallery Navigation */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() => handleGalleryNavigation("prev")}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      <button
                        onClick={() => handleGalleryNavigation("next")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>

                      <span className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {activeGalleryIndex + 1} / {galleryImages.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Gallery Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="p-4 flex justify-center space-x-2">
                    {galleryImages.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveGalleryIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeGalleryIndex
                            ? "bg-cyan-400"
                            : "bg-gray-600 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Featured Image (if no gallery) */
        project.imageUrl && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative max-w-4xl mx-auto">
                <div className="relative bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl overflow-hidden p-2">
                  <div className="aspect-video relative rounded-xl overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      )}

      {/* Project Details Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Challenge */}
            {challenge && (
              <div className="bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  {locale === "ar" ? "التحدي" : "The Challenge"}
                </h3>
                <div
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: challenge }}
                />
              </div>
            )}

            {/* Solution */}
            {solution && (
              <div className="bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  {locale === "ar" ? "الحل" : "Our Solution"}
                </h3>
                <div
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: solution }}
                />
              </div>
            )}

            {/* Results */}
            {resultsAchieved.length > 0 && (
              <div className="bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  {locale === "ar" ? "النتائج المحققة" : "Results Achieved"}
                </h3>
                <ul className="space-y-3">
                  {resultsAchieved.map((result: string, index: number) => (
                    <li
                      key={index}
                      className={`flex items-start ${isArabic ? "flex-row-reverse text-right" : ""}`}
                    >
                      <CheckCircle
                        className={`w-5 h-5 text-green-400 ${isArabic ? "ml-3" : "mr-3"} mt-0.5 flex-shrink-0`}
                      />
                      <span className="text-gray-300">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features */}
            {keyFeatures.length > 0 && (
              <div className="bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  {locale === "ar" ? "المميزات الرئيسية" : "Key Features"}
                </h3>
                <ul className="space-y-3">
                  {keyFeatures.map((feature: string, index: number) => (
                    <li
                      key={index}
                      className={`flex items-start ${isArabic ? "flex-row-reverse text-right" : ""}`}
                    >
                      <CheckCircle
                        className={`w-5 h-5 text-yellow-400 ${isArabic ? "ml-3" : "mr-3"} mt-0.5 flex-shrink-0`}
                      />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mt-12 bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-8 max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">
                {locale === "ar" ? "التقنيات المستخدمة" : "Technologies Used"}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Link */}
          {project.demoUrl && (
            <div className="text-center mt-12">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                <span>
                  {locale === "ar" ? "زيارة المشروع" : "Visit Project"}
                </span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {locale === "ar"
                  ? "لديك مشروع مماثل؟"
                  : "Have a Similar Project?"}
              </span>
            </h2>
            <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
              {locale === "ar"
                ? "دعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك الرقمية"
                : "Ready to bring your vision to life? Let's discuss your project."}
            </p>
            <Link href={`/${lang}/contact` as any}>
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-105">
                {locale === "ar" ? "تواصل معنا" : "Get In Touch"}
                <ExternalLink
                  className={`${isArabic ? "mr-2" : "ml-2"} w-5 h-5`}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
