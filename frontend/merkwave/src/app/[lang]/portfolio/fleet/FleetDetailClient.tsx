"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Box, CheckCircle2, ZoomIn, ChevronRight, Truck, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Locale } from "@/lib/i18n";
import { API_ENDPOINTS, getImageUrl, API_BASE_URL } from "@/config/api";

// Load the 3D viewer client-side only (no SSR — WebGL)
const FleetModelViewer = dynamic(
  () => import("@/components/FleetModelViewer").then((m) => m.FleetModelViewer),
  { ssr: false }
);

interface FleetFeature {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

interface FleetDetail {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn: string;
  detailedDescriptionAr: string;
  imageUrl: string;
  model3DUrl: string;
  features: FleetFeature[];
}

interface FleetDetailClientProps {
  locale: Locale;
}

/** Convert a relative API path like /fleet-models/xxx.glb to the full URL.
 *  Appends ?v=1 so a corrupted browser-cache entry (ERR_CACHE_READ_FAILURE)
 *  doesn't block subsequent loads by forcing a distinct cache key.
 */
function getModelUrl(path: string): string {
  if (!path) return "";
  const base = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  return base.includes("?") ? `${base}&v=1` : `${base}?v=1`;
}

export function FleetDetailClient({ locale }: FleetDetailClientProps) {
  const [fleet, setFleet] = useState<FleetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false); // toggle image lightbox

  const searchParams = useSearchParams();
  const fleetId = searchParams.get("id");
  const isArabic = locale === "ar";

  useEffect(() => {
    if (!fleetId) {
      setError("No fleet ID provided");
      setLoading(false);
      return;
    }
    async function fetchFleet() {
      try {
        const res = await fetch(API_ENDPOINTS.FLEET.GET_BY_ID(Number(fleetId)));
        if (!res.ok) throw new Error("Fleet not found");
        const data = await res.json();
        setFleet(data);
      } catch {
        setError("Failed to load fleet details");
      } finally {
        setLoading(false);
      }
    }
    fetchFleet();
  }, [fleetId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00FFFF] mx-auto mb-4" />
          <p className="text-slate-400">
            {isArabic ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !fleet) {
    return (
      <div
        className="min-h-screen bg-black flex flex-col items-center justify-center px-4"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <p className="text-gray-400 text-lg mb-6">
          {isArabic ? "لم يتم العثور على الشاحنة" : "Truck not found"}
        </p>
        <Link
          href={`/${locale}/portfolio` as any}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
        >
          <ArrowLeft className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
          {isArabic ? "العودة إلى الأسطول" : "Back to Fleet"}
        </Link>
      </div>
    );
  }

  const name = isArabic ? fleet.nameAr : fleet.nameEn;
  const description = isArabic ? fleet.descriptionAr : fleet.descriptionEn;
  const detailedDescription = isArabic
    ? fleet.detailedDescriptionAr
    : fleet.detailedDescriptionEn;
  const modelUrl = getModelUrl(fleet.model3DUrl);

  return (
    <div
      className="min-h-screen bg-black overflow-x-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ── Ambient background glows (fixed, pointer-events-none) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-cyan-400/8 rounded-full blur-[100px]" />
      </div>

      {/* ── Sticky breadcrumb nav ── */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href={`/${locale}/portfolio` as any}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FFFF] transition-colors text-sm font-medium shrink-0"
          >
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            <span className="hidden sm:inline">{isArabic ? "الأسطول" : "Fleet"}</span>
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 text-white/20 shrink-0 ${isArabic ? "rotate-180" : ""}`} />
          <span className="text-white/60 text-sm truncate">{name}</span>
        </div>
      </div>

      <div className="relative z-10">

        {/* ── Hero banner ── */}
        <section className="relative pt-14 pb-10 sm:pt-20 sm:pb-14 px-4 sm:px-6 overflow-hidden">
          {/* subtle grid bg */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(to right, #00FFFF 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-[#00FFFF] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                <Truck className="w-3.5 h-3.5" />
                {isArabic ? "تفاصيل الشاحنة" : "Truck Detail"}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-5">
                <span className="text-[#00FFFF]">{name}</span>
              </h1>

              {/* gradient divider */}
              <div className="w-20 h-1 bg-gradient-to-r from-[#00FFFF] to-blue-500 rounded-full mb-5" />

              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
                {description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Main content: image + 3D viewer ── */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-5 sm:gap-8">

              {/* Image Panel — always occupies the left column regardless of dir */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className={isArabic ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-1"}
              >
                <div className="relative group rounded-2xl overflow-hidden bg-[#060f1e] border border-white/5 hover:border-cyan-500/30 transition-colors duration-500">
                  <div
                    className="relative w-full aspect-video overflow-hidden cursor-zoom-in"
                    onClick={() => setShowImage(true)}
                  >
                    <Image
                      src={getImageUrl(fleet.imageUrl)}
                      alt={name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  {/* zoom hint */}
                  <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-white/50 text-xs">
                      <ZoomIn className="w-3.5 h-3.5" />
                      {isArabic ? "انقر للتكبير" : "Click to enlarge"}
                    </span>
                    <span className="bg-black/60 backdrop-blur-sm border border-white/10 text-white/50 text-xs px-3 py-1 rounded-full">
                      {isArabic ? "صورة الشاحنة" : "Truck Photo"}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 3D Viewer Panel — always occupies the right column regardless of dir */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className={isArabic ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2"}
              >
                <div className="relative rounded-2xl overflow-hidden bg-[#060f1e] border border-cyan-500/20 hover:border-cyan-400/40 transition-colors duration-500 aspect-video">
                  {/* corner glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
                  {/* header bar */}
                  <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 text-[#00FFFF] text-xs font-semibold tracking-wider uppercase">
                      <Box className="w-3.5 h-3.5" />
                      {isArabic ? "نموذج ثلاثي الأبعاد" : "3D Model"}
                    </span>
                    <span className="bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-widest">
                      LIVE
                    </span>
                  </div>

                  {modelUrl ? (
                    <>
                      <div className="w-full h-full">
                        <FleetModelViewer url={modelUrl} isArabic={isArabic} />
                      </div>
                      {/* controls hint */}
                      <div className="absolute bottom-3 end-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/40 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-full border border-white/10 pointer-events-none">
                        <Box className="w-3 h-3" />
                        {isArabic
                          ? "اسحب للتدوير • عجلة للتكبير"
                          : "Drag to rotate • Scroll to zoom"}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 gap-3">
                      <Box className="w-12 h-12 opacity-20" />
                      <span className="text-sm">
                        {isArabic ? "لا يوجد نموذج ثلاثي الأبعاد" : "No 3D model available"}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        {detailedDescription && (
          <section className="px-4 sm:px-6 pb-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  {isArabic ? "نظرة عامة" : "Overview"}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#00FFFF] to-blue-500 rounded-full mb-8" />
                <div className="bg-[#060f1e] border border-white/5 rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
                  {/* subtle inner glow */}
                  <div className="absolute top-0 start-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                  <p className="relative text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-line">
                    {detailedDescription}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── Features / Specs ── */}
        {fleet.features?.length > 0 && (
          <section className="px-4 sm:px-6 pb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  {isArabic ? "المواصفات والميزات" : "Specifications & Features"}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#00FFFF] to-blue-500 rounded-full" />
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {fleet.features.map((feat, i) => (
                  <motion.div
                    key={feat.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    viewport={{ once: true }}
                    className="group bg-[#060f1e] border border-cyan-500/10 rounded-xl p-5 sm:p-6
                               hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(0,255,255,0.08)]
                               transition-all duration-300 flex flex-col gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#00FFFF]" />
                      </span>
                      <h3 className="text-white font-semibold text-sm sm:text-base leading-snug group-hover:text-[#00FFFF] transition-colors">
                        {isArabic ? feat.titleAr : feat.titleEn}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed ps-11">
                      {isArabic ? feat.descriptionAr : feat.descriptionEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back CTA ── */}
        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#060f1e] to-[#030810] border border-cyan-500/15 rounded-2xl p-8 sm:p-12 text-center overflow-hidden"
            >
              {/* glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-24 bg-cyan-400/10 blur-3xl rounded-full" />
              </div>
              <h3 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                {isArabic ? "هل تريد معرفة المزيد؟" : "Want to know more?"}
              </h3>
              <p className="relative text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
                {isArabic
                  ? "تواصل مع فريقنا للحصول على مزيد من المعلومات حول أسطول شاحناتنا"
                  : "Contact our team for more information about our truck fleet and services"}
              </p>
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`/${locale}/contact` as any}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#F6FF00] text-black font-bold text-sm rounded-full hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-200"
                  >
                    {isArabic ? "تواصل معنا" : "Get in Touch"}
                    <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                  </motion.button>
                </Link>
                <Link href={`/${locale}/portfolio` as any}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3 border border-cyan-500/40 text-[#00FFFF] font-semibold text-sm rounded-full hover:bg-cyan-500/10 transition-all duration-200"
                  >
                    <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                    {isArabic ? "العودة إلى الأسطول" : "Back to Fleet"}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>{/* /relative z-10 */}

      {/* ── Image Lightbox ── */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setShowImage(false)}
          >
            {/* close button */}
            <button
              onClick={() => setShowImage(false)}
              className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl max-h-[88vh] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageUrl(fleet.imageUrl)}
                alt={name}
                fill
                sizes="100vw"
                className="object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
