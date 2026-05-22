"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  Truck,
  Box,
  MessageCircle,
  Cpu,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import Galaxy from "@/components/Galaxy";
import { API_ENDPOINTS, getImageUrl } from "@/config/api";

interface FleetFeature {
  id: number;
  titleEn: string;
  titleAr: string;
}

interface Fleet {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  model3DUrl: string;
  features: FleetFeature[];
}

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

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

type ActiveTab = "fleet" | "odoo";

export default function PortfolioClient({
  dict,
  lang,
}: LocalizedComponentProps) {
  const isArabic = lang === "ar";
  const [activeTab, setActiveTab] = useState<ActiveTab>("fleet");
  const [fleet, setFleet] = useState<Fleet[]>([]);
  const [odooModules, setOdooModules] = useState<OdooModule[]>([]);
  const [fleetLoading, setFleetLoading] = useState(true);
  const [odooLoading, setOdooLoading] = useState(true);

  useEffect(() => {
    async function fetchFleet() {
      try {
        const res = await fetch(API_ENDPOINTS.FLEET.GET_ALL);
        const data = await res.json();
        setFleet(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching fleet:", err);
        setFleet([]);
      } finally {
        setFleetLoading(false);
      }
    }
    async function fetchOdoo() {
      try {
        const res = await fetch(API_ENDPOINTS.ODOO_MODULES.GET_ALL);
        const data = await res.json();
        setOdooModules(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching odoo modules:", err);
        setOdooModules([]);
      } finally {
        setOdooLoading(false);
      }
    }
    fetchFleet();
    fetchOdoo();
  }, []);

  const loading = activeTab === "fleet" ? fleetLoading : odooLoading;

  return (
    <div
      className="min-h-screen relative bg-[url(/mawgatna.webp)] md:bg-fixed bg-cover bg-center"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden text-center">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Galaxy
              mouseRepulsion={false}
              mouseInteraction={false}
              density={2}
              glowIntensity={0.5}
              saturation={12}
              hueShift={200}
            />
          </div>

          <div className="max-w-7xl w-full mx-auto z-50 mb-6 px-4">
            <Link
              href={`/${lang}` as any}
              className="inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-300"
            >
              <ArrowLeft
                className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`}
              />
              <span>{isArabic ? "العودة إلى الرئيسية" : "Back to Home"}</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-50 px-4 max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold px-5 py-2 rounded-full mb-6 tracking-widest uppercase"
            >
              <Star className="w-3.5 h-3.5" />
              {isArabic
                ? "ميرك ويف للحلول المتكاملة"
                : "Merkwave Integrated Solutions"}
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="text-[#00FFFF]">
                {activeTab === "fleet"
                  ? isArabic
                    ? "أسطول الشاحنات"
                    : "Our Truck Fleet"
                  : isArabic
                    ? "حلول أودو"
                    : "Odoo Solutions"}
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
              {activeTab === "fleet"
                ? isArabic
                  ? "نمتلك أفضل أسطول شاحنات مجهز بأحدث التقنيات لتنفيذ أصعب عمليات النقل واللوجستيات — نبني، نُسلِّم، ونُميل نحو الامتياز."
                  : "We own and operate the finest truck fleet equipped with cutting-edge technology for the most demanding logistics operations — we build, deliver, and drive excellence."
                : isArabic
                  ? "نُقدِّم حلول أودو المتكاملة لتحويل أعمالك — من إدارة المخزون إلى المحاسبة والمبيعات بنظام واحد موحَّد."
                  : "We deliver comprehensive Odoo solutions to transform your business — from inventory to accounting and sales in one unified system."}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-10">
              {activeTab === "fleet" ? (
                <>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    {isArabic ? "معتمدة دولياً" : "Internationally Certified"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-cyan-400" />
                    {fleet.length > 0 ? fleet.length : "—"}{" "}
                    {isArabic ? "شاحنة" : "Trucks"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    {isArabic ? "متاح على مدار الساعة" : "24/7 Available"}
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    {isArabic ? "شريك أودو معتمد" : "Certified Odoo Partner"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Box className="w-4 h-4 text-cyan-400" />
                    {odooModules.length > 0 ? odooModules.length : "—"}{" "}
                    {isArabic ? "وحدة" : "Modules"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    {isArabic ? "تكامل كامل" : "Full Integration"}
                  </span>
                </>
              )}
            </div>

            {/* ── Switch Toggle ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1.5 gap-1"
            >
              <button
                onClick={() => setActiveTab("fleet")}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "fleet"
                    ? "bg-[#00FFFF] text-black shadow-lg shadow-cyan-400/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Truck className="w-4 h-4" />
                {isArabic ? "الأسطول" : "Fleet"}
              </button>
              <button
                onClick={() => setActiveTab("odoo")}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "odoo"
                    ? "bg-[#F6FF00] text-black shadow-lg shadow-yellow-400/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Cpu className="w-4 h-4" />
                {isArabic ? "أودو" : "Odoo"}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-20 z-50 flex flex-col items-center gap-2"
          >
            <span className="text-gray-300 text-sm tracking-widest uppercase">
              {isArabic ? "اكتشف المزيد" : "Scroll to explore"}
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-cyan-400 to-transparent mx-auto" />
          </motion.div>
        </section>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          {activeTab === "fleet" ? (
            <motion.div
              key="fleet"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Fleet section heading */}
              <section className="pt-20 px-4">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
                  >
                    <div>
                      <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                        <Truck className="w-3.5 h-3.5" />
                        {isArabic ? "أسطول الشاحنات" : "Truck Fleet"}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                        {isArabic ? "قائمة الأسطول" : "Fleet Catalogue"}
                      </h2>
                      <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
                        {isArabic
                          ? "كل شاحنة مصممة بدقة هندسية عالية وجاهزة لأصعب عمليات النقل واللوجستيات. نفخر بأسطول يجمع بين الموثوقية والأداء الاستثنائي."
                          : "Every truck is engineered with precision and ready for the most demanding logistics operations. We take pride in a fleet that unites reliability and exceptional performance."}
                      </p>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full md:mb-3 shrink-0" />
                  </motion.div>

                  {fleetLoading ? (
                    <div className="flex justify-center items-center py-32">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400" />
                    </div>
                  ) : fleet.length === 0 ? (
                    <div className="text-center text-gray-400 text-xl py-32">
                      {isArabic
                        ? "لا توجد شاحنات متاحة حالياً"
                        : "No trucks available at the moment"}
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                      {fleet.map((vessel, index) => (
                        <motion.article
                          key={vessel.id}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="bg-[#060f1e] border border-cyan-500/15 rounded-2xl overflow-hidden hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(0,255,255,0.12)] transition-all duration-500 h-full flex flex-col">
                            {/* Image */}
                            <Link
                              href={
                                `/${lang}/portfolio/fleet?id=${vessel.id}` as any
                              }
                            >
                              <div className="relative h-56 overflow-hidden bg-[#0a1628] cursor-pointer">
                                <Image
                                  src={getImageUrl(vessel.imageUrl)}
                                  alt={isArabic ? vessel.nameAr : vessel.nameEn}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e] via-[#060f1e]/20 to-transparent" />
                                {vessel.model3DUrl && (
                                  <span className="absolute top-3 end-3 bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/40 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full">
                                    3D
                                  </span>
                                )}
                                {vessel.features?.length > 0 && (
                                  <span className="absolute bottom-3 start-3 bg-black/60 backdrop-blur-sm text-gray-300 text-xs px-3 py-1 rounded-full border border-white/10">
                                    {vessel.features.length}&nbsp;
                                    {isArabic
                                      ? "ميزة"
                                      : vessel.features.length === 1
                                        ? "feature"
                                        : "features"}
                                  </span>
                                )}
                              </div>
                            </Link>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                              <Link
                                href={
                                  `/${lang}/portfolio/fleet?id=${vessel.id}` as any
                                }
                              >
                                <h3 className="text-xl font-bold text-cyan-300 mb-2 line-clamp-2 group-hover:text-cyan-200 transition-colors cursor-pointer">
                                  {isArabic ? vessel.nameAr : vessel.nameEn}
                                </h3>
                              </Link>
                              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                                {isArabic
                                  ? vessel.descriptionAr
                                  : vessel.descriptionEn}
                              </p>

                              {/* Metadata */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 bg-cyan-900/30 border border-cyan-800/40 text-cyan-400 text-xs px-3 py-1 rounded-full">
                                  <Truck className="w-3 h-3" />
                                  {isArabic ? "شاحنة" : "Truck"}
                                </span>
                                {vessel.model3DUrl && (
                                  <span className="inline-flex items-center gap-1.5 bg-blue-900/30 border border-blue-800/40 text-blue-400 text-xs px-3 py-1 rounded-full">
                                    <Box className="w-3 h-3" />
                                    {isArabic ? "نموذج 3D" : "3D Model"}
                                  </span>
                                )}
                                {vessel.features?.length > 0 && (
                                  <span className="inline-flex items-center gap-1.5 bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 text-xs px-3 py-1 rounded-full">
                                    <Shield className="w-3 h-3" />
                                    {vessel.features.length}{" "}
                                    {isArabic ? "ميزة" : "Features"}
                                  </span>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                                <Link
                                  href={
                                    `/${lang}/portfolio/fleet?id=${vessel.id}` as any
                                  }
                                  className="flex-1"
                                >
                                  <button className="w-full inline-flex items-center justify-center gap-1.5 text-cyan-400 text-sm font-semibold hover:text-cyan-200 transition-colors">
                                    {isArabic ? "عرض التفاصيل" : "View Details"}
                                    <ChevronRight
                                      className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isArabic ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                </Link>
                                <Link href={`/${lang}/contact` as any}>
                                  <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F6FF00] text-black text-xs font-bold rounded-full hover:bg-yellow-300 hover:shadow-md hover:shadow-yellow-400/20 transition-all duration-200 shrink-0">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    {isArabic ? "تواصل معنا" : "Contact Us"}
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="odoo"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Odoo section heading */}
              <section className="pt-20 px-4">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
                  >
                    <div>
                      <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                        <Cpu className="w-3.5 h-3.5" />
                        {isArabic ? "حلول أودو" : "Odoo Solutions"}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                        {isArabic ? "وحدات أودو" : "Odoo Modules"}
                      </h2>
                      <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
                        {isArabic
                          ? "نُقدِّم حزمة متكاملة من وحدات أودو المُخصَّصة لاحتياجات عملك — تحكم كامل، تكامل سلس، ونتائج قابلة للقياس."
                          : "We deliver a complete suite of customized Odoo modules tailored to your business — full control, seamless integration, and measurable results."}
                      </p>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full md:mb-3 shrink-0" />
                  </motion.div>

                  {odooLoading ? (
                    <div className="flex justify-center items-center py-32">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400" />
                    </div>
                  ) : odooModules.length === 0 ? (
                    <div className="text-center text-gray-400 text-xl py-32">
                      {isArabic
                        ? "لا توجد وحدات متاحة حالياً"
                        : "No modules available at the moment"}
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                      {odooModules.map((mod, index) => (
                        <motion.article
                          key={mod.id}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="bg-[#0d0d00] border border-yellow-500/15 rounded-2xl overflow-hidden hover:border-yellow-400/50 hover:shadow-[0_0_30px_rgba(246,255,0,0.08)] transition-all duration-500 h-full flex flex-col">
                            {/* Image */}
                            <Link
                              href={
                                `/${lang}/portfolio/odoo-module?id=${mod.id}` as any
                              }
                            >
                              <div className="relative h-52 overflow-hidden bg-[#111100] cursor-pointer">
                                {mod.imageUrl ? (
                                  <Image
                                    src={getImageUrl(mod.imageUrl)}
                                    alt={isArabic ? mod.nameAr : mod.nameEn}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                  />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <Cpu className="w-20 h-20 text-yellow-400/20" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d00] via-transparent to-transparent" />
                                <span className="absolute top-3 end-3 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/40 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full">
                                  Odoo
                                </span>
                              </div>
                            </Link>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                              <Link
                                href={
                                  `/${lang}/portfolio/odoo-module?id=${mod.id}` as any
                                }
                              >
                                <h3 className="text-xl font-bold text-yellow-300 mb-2 line-clamp-2 group-hover:text-yellow-200 transition-colors cursor-pointer">
                                  {isArabic ? mod.nameAr : mod.nameEn}
                                </h3>
                              </Link>
                              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                                {isArabic
                                  ? mod.descriptionAr
                                  : mod.descriptionEn}
                              </p>

                              {/* Metadata */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 bg-yellow-900/30 border border-yellow-800/40 text-yellow-400 text-xs px-3 py-1 rounded-full">
                                  <Cpu className="w-3 h-3" />
                                  {isArabic ? "وحدة أودو" : "Odoo Module"}
                                </span>
                                {mod.detailedDescriptionEn && (
                                  <span className="inline-flex items-center gap-1.5 bg-orange-900/30 border border-orange-800/40 text-orange-400 text-xs px-3 py-1 rounded-full">
                                    <Zap className="w-3 h-3" />
                                    {isArabic ? "وصف مفصّل" : "Detailed Docs"}
                                  </span>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                                <Link
                                  href={
                                    `/${lang}/portfolio/odoo-module?id=${mod.id}` as any
                                  }
                                  className="flex-1"
                                >
                                  <button className="w-full inline-flex items-center justify-center gap-1.5 text-yellow-400 text-sm font-semibold hover:text-yellow-200 transition-colors">
                                    {isArabic ? "عرض التفاصيل" : "View Details"}
                                    <ChevronRight
                                      className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isArabic ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                </Link>
                                <Link href={`/${lang}/contact` as any}>
                                  <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F6FF00] text-black text-xs font-bold rounded-full hover:bg-yellow-300 hover:shadow-md hover:shadow-yellow-400/20 transition-all duration-200 shrink-0">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    {isArabic ? "تواصل معنا" : "Contact Us"}
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA ── */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#060f1e] to-[#030810] border border-cyan-500/15 rounded-3xl p-10 sm:p-16 overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-cyan-400/8 blur-3xl rounded-full pointer-events-none" />
              <h2 className="relative text-3xl md:text-5xl font-bold text-white mb-4">
                {isArabic ? "هل تريد معرفة المزيد؟" : "Ready to Work Together?"}
              </h2>
              <p className="relative text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                {isArabic
                  ? "سواء كنت تبحث عن شاحنة متخصصة أو حل أودو مُخصَّص — فريقنا مستعد لمساعدتك."
                  : "Whether you need a specialized truck or a custom Odoo solution — our team is ready to help you succeed."}
              </p>
              <Link href={`/${lang}/contact` as any}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative inline-flex items-center gap-3 px-10 py-5 bg-[#F6FF00] text-black font-bold text-base rounded-full shadow-xl shadow-yellow-400/20 hover:bg-yellow-300 hover:shadow-yellow-400/40 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isArabic ? "تواصل معنا الآن" : "Contact Us Now"}
                  <ChevronRight
                    className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
