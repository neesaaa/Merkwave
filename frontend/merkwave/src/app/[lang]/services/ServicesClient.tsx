"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Silk from "./Silk";
import React, { useMemo, useRef } from "react";
import { InteractiveCard } from "@/components/InteractiveCard";

interface ServicesClientProps {
  dict: any;
  lang: string;
}

const services = [
  {
    id: "software",
    logo: "/Software.png",
    titleEn: "SOFTWARE SERVICES",
    titleAr: "خدمات البرمجيات",
    descriptionEn:
      "Official Odoo Partner & Custom Tech. We build the digital backbone of your business with high-performance ERP solutions and custom software.",
    descriptionAr:
      "شريك أودو الرسمي والحلول التقنية. نبني العمود الفقري الرقمي لعملك من خلال حلول ERP عالية الأداء وبرمجيات مخصصة.",
    pillar: {
      en: "INNOVATE",
      ar: "ابتكار",
    },
    colors: {
      from: "from-cyan-500",
      to: "to-blue-500",
      border: "border-cyan-500/30",
      hoverBorder: "hover:border-cyan-500/60",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
  },
  {
    id: "branding",
    logo: "/Branding.png",
    titleEn: "BRANDING SERVICES",
    titleAr: "خدمات العلامة التجارية",
    descriptionEn:
      "Iconic visual identities. We craft brands that resonate and leave a lasting impact, ensuring you stand out in any market.",
    descriptionAr:
      "هويات بصرية أيقونية. نصمم علامات تجارية تترك أثراً دائماً، مما يضمن تميزك في أي سوق.",
    pillar: {
      en: "ELEVATE",
      ar: "ارتقاء",
    },
    colors: {
      from: "from-amber-400",
      to: "to-yellow-500",
      border: "border-amber-400/30",
      hoverBorder: "hover:border-amber-400/60",
      iconBg: "bg-amber-400/10",
      iconColor: "text-amber-300",
    },
  },
  {
    id: "commerce",

    logo: "/Business.png",
    titleEn: "MARKETING SERVICES",
    titleAr: "خدمات التسويق",
    descriptionEn:
      "Data-driven growth. Strategic marketing campaigns designed to increase your reach, engagement, and ROI.",
    descriptionAr:
      "نمو قائم على البيانات. حملات تسويقية استراتيجية مصممة لزيادة انتشارك، وتفاعلك، وعائد استثمارك.",
    pillar: {
      en: "ELEVATE",
      ar: "ارتقاء",
    },
    colors: {
      from: "from-green-500",
      to: "to-teal-500",
      border: "border-green-500/30",
      hoverBorder: "hover:border-green-500/60",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
    },
  },
  {
    id: "business",

    logo: "/Marketing.png",
    titleEn: "BUSINESS DEVELOPMENT",
    titleAr: "تطوير الأعمال",
    descriptionEn:
      "Strategic scaling. We optimize your operations and sales strategies to help you dominate your industry in Egypt and KSA.",
    descriptionAr:
      "توسع استراتيجي. نقوم بتحسين عملياتك واستراتيجيات المبيعات لمساعدتك على السيادة في مجالك داخل مصر والسعودية.",
    pillar: {
      en: "DOMINATE",
      ar: "سيادة",
    },

    colors: {
      from: "from-pink-500",
      to: "to-orange-500",
      border: "border-pink-500/30",
      hoverBorder: "hover:border-pink-500/60",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400",
    },
  },
];

export default function ServicesClient({ dict, lang }: ServicesClientProps) {
  const isArabic = lang === "ar";

  return (
    <div
      className={`min-h-screen bg-[#020617] bg-[url('/mawgatna.webp')] bg-cover bg-center bg-no-repeat `}
    >
      <section className="relative py-20 px-4  overflow-hidden ">
        <div className="absolute inset-0  rounded-xl"></div>
        <div
          className={`max-w-7xl mx-auto text-center relative  z-10 flex flex-col items-center justify-center ${
            isArabic ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="flex flex-col  w-full text-center  items-center">
            <motion.div
              initial={{ y: 30 }}
              animate={{
                y: [0, -12, 0],
                x: [0, 6, 0],
                rotate: [0, 0.8, 0],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="opacity-100 flex flex-col items-center justify-center "
            >
              <motion.h1
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                  {isArabic ? "هندسة نجاحك" : "Engineering Your Success"}
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white text-lg md:text-md max-w-4xl text-center  leading-relaxed"
              >
                {isArabic
                  ? 'نحن لا نقدم مجرد خدمات، بل نبني محركات للنمو. من خلال إطار عملنا "ابتكار، ارتقاء، سيادة"، نحول عملك إلى قائد في السوق'
                  : ' We don\'t just provide services; we build growth engines. Through our "Innovate, Elevate, Dominate" framework, we transform your business into a market leader.'}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-10 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/${lang}/services/${service.id}` as any}>
                    <div
                      className={`
                  group relative overflow-hidden
                  bg-gradient-to-br from-gray-900 to-black
                  border ${service.colors.border} ${service.colors.hoverBorder}
                  rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 h-full
                  transition-all duration-500
                  hover:scale-[1.02] sm:hover:scale-[1.06]
                  hover:shadow-[0_0_60px_-10px_rgba(24,116,123,0.65)]
                  cursor-pointer
                `}
                    >
                      <div
                        className="
                    absolute inset-0 rounded-2xl sm:rounded-3xl
                    bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent
                    opacity-0 group-hover:opacity-100
                    translate-x-[-120%] group-hover:translate-x-[120%]
                    transition-all duration-1000
                    pointer-events-none
                  "
                      />

                      <div
                        className={`
                    absolute inset-0 rounded-2xl sm:rounded-3xl
                    bg-gradient-to-br ${service.colors.from} ${service.colors.to}
                    opacity-0 group-hover:opacity-10
                    transition-opacity duration-500
                    pointer-events-none
                  `}
                      />

                      <div
                        className={`
                    relative z-10
                    w-12 h-12 sm:w-16 sm:h-16 ${service.colors.iconBg} rounded-xl sm:rounded-2xl
                    flex items-center justify-center mb-4 sm:mb-6
                    group-hover:scale-110 transition-transform duration-300
                  `}
                      >
                        <Image
                          src={service.logo}
                          alt={isArabic ? service.titleAr : service.titleEn}
                          width={48}
                          height={48}
                          className="object-contain w-8 h-8 sm:w-12 sm:h-12"
                        />
                      </div>
                      {/* Pillar Badge */}
                      <div className="relative z-10 mb-3 sm:mb-4">
                        <span
                          className={`
      inline-block px-3 sm:px-4 py-1 text-xs sm:text-sm font-bold tracking-widest
      rounded-full uppercase
      bg-gradient-to-r ${service.colors.from} ${service.colors.to}
      text-white shadow-md
    `}
                        >
                          {isArabic ? service.pillar.ar : service.pillar.en}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="relative z-10 text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 tracking-wide">
                        {isArabic ? service.titleAr : service.titleEn}
                      </h3>

                      {/* Description */}
                      <p className="relative z-10 text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                        {isArabic
                          ? service.descriptionAr
                          : service.descriptionEn}
                      </p>

                      {/* Explore */}
                      <div className="relative z-10 flex items-center gap-2 text-cyan-400 text-sm sm:text-base font-semibold group-hover:gap-4 transition-all duration-300">
                        <span>{isArabic ? "استكشاف" : "EXPLORE"}</span>
                        <ArrowRight
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${isArabic ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 md:p-16 text-center hover:border-cyan-500/50 transition-all duration-500"
          >
            <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
              {isArabic
                ? "هل أنت مستعد للابتكار، الارتقاء، والسيادة؟"
                : "Ready to Innovate, Elevate, and Dominate?"}
            </h2>
            <Link href={`/${lang}/contact` as any}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-xs sm:text-sm md:text-base lg:text-lg gap-2 sm:gap-3 px-4 sm:px-6 md:px-10 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50"
              >
                {isArabic ? "ابدأ مشروعك اليوم" : "Start Your Project Today"}
                <ArrowRight
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isArabic ? "rotate-180" : ""}`}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
