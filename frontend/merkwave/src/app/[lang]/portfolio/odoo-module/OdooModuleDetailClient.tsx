"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Cpu,
  MessageCircle,
  Zap,
  Shield,
  FileText,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { API_ENDPOINTS, getImageUrl } from "@/config/api";

interface OdooModule {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn: string;
  detailedDescriptionAr: string;
  imageUrl: string;
}

interface OdooModuleDetailClientProps {
  locale: Locale;
}

export function OdooModuleDetailClient({
  locale,
}: OdooModuleDetailClientProps) {
  const [module, setModule] = useState<OdooModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const moduleId = searchParams.get("id");
  const isArabic = locale === "ar";

  useEffect(() => {
    if (!moduleId) {
      setError("No module ID provided");
      setLoading(false);
      return;
    }
    async function fetchModule() {
      try {
        const res = await fetch(
          API_ENDPOINTS.ODOO_MODULES.GET_BY_ID(Number(moduleId)),
        );
        if (!res.ok) throw new Error("Module not found");
        const data = await res.json();
        setModule(data);
      } catch {
        setError("Failed to load module details");
      } finally {
        setLoading(false);
      }
    }
    fetchModule();
  }, [moduleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4" />
          <p className="text-slate-400">
            {isArabic ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div
        className="min-h-screen bg-black flex flex-col items-center justify-center px-4"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <p className="text-gray-400 text-lg mb-6">
          {isArabic ? "لم يتم العثور على الوحدة" : "Module not found"}
        </p>
        <Link
          href={`/${locale}/portfolio` as any}
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
        >
          <ArrowLeft className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
          {isArabic ? "العودة" : "Back to Portfolio"}
        </Link>
      </div>
    );
  }

  const name = isArabic ? module.nameAr : module.nameEn;
  const description = isArabic ? module.descriptionAr : module.descriptionEn;
  const detailed = isArabic
    ? module.detailedDescriptionAr
    : module.detailedDescriptionEn;

  return (
    <div
      className="min-h-screen bg-black overflow-x-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-orange-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-yellow-400/6 rounded-full blur-[100px]" />
      </div>

      {/* Sticky breadcrumb */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href={`/${locale}/portfolio` as any}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium shrink-0"
          >
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            <span className="hidden sm:inline">
              {isArabic ? "حلول أودو" : "Odoo Solutions"}
            </span>
          </Link>
          <ChevronRight
            className={`w-3.5 h-3.5 text-white/20 shrink-0 ${isArabic ? "rotate-180" : ""}`}
          />
          <span className="text-white/60 text-sm truncate">{name}</span>
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="relative pt-14 pb-10 sm:pt-20 sm:pb-14 px-4 sm:px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#F6FF00 1px, transparent 1px), linear-gradient(to right, #F6FF00 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                <Cpu className="w-3.5 h-3.5" />
                {isArabic ? "وحدة أودو" : "Odoo Module"}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-5">
                <span className="text-[#F6FF00]">{name}</span>
              </h1>

              <div className="w-20 h-1 bg-gradient-to-r from-[#F6FF00] to-orange-400 rounded-full mb-5" />

              <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
                {description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Image + Info grid */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className={
                  isArabic ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-1"
                }
              >
                <div className="relative group rounded-2xl overflow-hidden bg-[#0d0d00] border border-yellow-500/15 hover:border-yellow-400/40 transition-colors duration-500">
                  <div className="relative w-full aspect-video overflow-hidden">
                    {module.imageUrl ? (
                      <Image
                        src={getImageUrl(module.imageUrl)}
                        alt={name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#111100]">
                        <Cpu className="w-24 h-24 text-yellow-400/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <span className="bg-black/60 backdrop-blur-sm border border-white/10 text-white/50 text-xs px-3 py-1 rounded-full">
                      {isArabic ? "صورة الوحدة" : "Module Preview"}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Quick facts */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className={
                  isArabic ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-2"
                }
              >
                <div className="h-full bg-[#0d0d00] border border-yellow-500/15 rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      {isArabic ? "نظرة سريعة" : "Quick Overview"}
                    </h2>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex items-start gap-4 p-4 bg-yellow-400/5 border border-yellow-400/10 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
                        <Cpu className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm mb-0.5">
                          {isArabic ? "النوع" : "Type"}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {isArabic
                            ? "وحدة أودو مُخصَّصة"
                            : "Custom Odoo Module"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-yellow-400/5 border border-yellow-400/10 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm mb-0.5">
                          {isArabic ? "الحالة" : "Status"}
                        </p>
                        <p className="text-yellow-400 text-xs font-semibold">
                          {isArabic ? "متاح الآن" : "Available Now"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-yellow-400/5 border border-yellow-400/10 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm mb-0.5">
                          {isArabic ? "التكامل" : "Integration"}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {isArabic
                            ? "متكامل مع منصة أودو الرئيسية"
                            : "Fully integrated with core Odoo platform"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA in sidebar */}
                  <Link href={`/${locale}/contact` as any}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F6FF00] text-black font-bold text-sm rounded-xl hover:bg-yellow-300 transition-all duration-200 shadow-lg shadow-yellow-400/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isArabic
                        ? "تواصل معنا لمعرفة المزيد"
                        : "Contact Us to Learn More"}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed description */}
        {detailed && (
          <section className="px-4 sm:px-6 pb-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {isArabic ? "نظرة تفصيلية" : "Detailed Overview"}
                  </h2>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#F6FF00] to-orange-400 rounded-full mb-8" />
                <div className="bg-[#0d0d00] border border-yellow-500/10 rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 start-0 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
                  <p className="relative text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-line">
                    {detailed}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#0d0d00] to-[#030300] border border-yellow-500/15 rounded-2xl p-8 sm:p-12 text-center overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-24 bg-yellow-400/8 blur-3xl rounded-full" />
              </div>
              <h3 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                {isArabic
                  ? "هل تريد تطبيق هذه الوحدة؟"
                  : "Ready to implement this module?"}
              </h3>
              <p className="relative text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
                {isArabic
                  ? "فريقنا من خبراء أودو مستعد لمساعدتك في التطبيق والتخصيص والتكامل"
                  : "Our Odoo experts are ready to help you implement, customize, and integrate this module into your business"}
              </p>
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`/${locale}/contact` as any}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#F6FF00] text-black font-bold text-sm rounded-full hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {isArabic ? "تواصل معنا" : "Get in Touch"}
                  </motion.button>
                </Link>
                <Link href={`/${locale}/portfolio` as any}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3 border border-yellow-500/40 text-yellow-400 font-semibold text-sm rounded-full hover:bg-yellow-500/10 transition-all duration-200"
                  >
                    <ArrowLeft
                      className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`}
                    />
                    {isArabic ? "العودة" : "Back to Portfolio"}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
