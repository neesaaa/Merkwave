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
    titleEn: "SOFTWARE WAVE",
    titleAr: "موجة البرمجيات",
    descriptionEn:
      "Custom software solutions that scale with your business and streamline operations.",
    descriptionAr: "حلول برمجية مخصصة تنمو مع عملك وتبسط العمليات.",
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
    id: "Branding",
    logo: "/Branding.png",
    titleEn: "BRANDING WAVE",
    titleAr: "موجة العلامة التجارية",
    descriptionEn:
      "Comprehensive brand strategies that make your business stand out and connect with customers.",
    descriptionAr:
      "استراتيجيات علامة تجارية شاملة تجعل عملك متميزًا وتتواصل مع العملاء.",
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
    id: "business",
    logo: "/Business.png",
    titleEn: "BUSINESS WAVE",
    titleAr: "موجة الأعمال",
    descriptionEn:
      "Data-driven digital marketing to grow awareness, leads, and revenue.",
    descriptionAr:
      "تسويق رقمي قائم على البيانات لتنمية الوعي والعملاء المحتملين والإيرادات.",
    // colors: {
    //   from: "from-cyan-500",
    //   to: "to-blue-500",
    //   border: "border-cyan-500/30",
    //   hoverBorder: "hover:border-cyan-500/60",
    //   iconBg: "bg-cyan-500/10",
    //   iconColor: "text-cyan-400",
    // },
        colors: {
      from: "from-pink-500",
      to: "to-orange-500",
      border: "border-pink-500/30",
      hoverBorder: "hover:border-pink-500/60",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400",
    },
  },
  {
    id: "commerce",
    logo: "/Marketing.png",
    titleEn: "COMMERCE WAVE",
    titleAr: "موجة التجارة",
    descriptionEn:
      "Ecommerce platforms designed to convert visitors into loyal customers.",
    descriptionAr:
      "منصات تجارة إلكترونية مصممة لتحويل الزوار إلى عملاء مخلصين.",
    colors: {
      from: "from-green-500",
      to: "to-teal-500",
      border: "border-green-500/30",
      hoverBorder: "hover:border-green-500/60",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
    },
  },
];

export default function ServicesClient({ dict, lang }: ServicesClientProps) {
  const isArabic = lang === "ar";

  return (
    <div
      className={`min-h-screen bg-[#020617] bg-[url('/mawgatna.webp')] bg-cover bg-center bg-no-repeat ${
        isArabic ? "font-arabic" : "font-sans"
      }`}
    >
      <section className="relative py-20 px-4  overflow-hidden ">
        <div className="absolute inset-0  rounded-xl"></div>
        <div
          className={`max-w-7xl mx-auto text-center relative  z-10 flex flex-col items-center justify-center ${
            isArabic ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="flex flex-col w-full text-center  items-center">
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
              className="opacity-100"
            >
              <motion.h1
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                  {isArabic ? "موجاتنا" : "OUR "}
                </span>
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                  {isArabic ? "" : "WAVES"}
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white text-lg md:text-xl max-w-3xl  leading-relaxed"
              >
                {isArabic
                  ? "في MerkWave، لا نركب التيارات فحسب - بل نخلقها. استكشف خدماتنا المتخصصة المصممة لدفع عملك إلى الأمام."
                  : "At MerkWave, we don't just ride the currents — we create them. Explore our specialized services designed to propel your business forward."}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      {/* Services Grid */}
      <section className="pt-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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
                  <Link
                    href={`/${lang}/services/${service.id}` as any}
                  >
                    <div
                      className={`
                  group relative overflow-hidden
                  bg-gradient-to-br from-gray-900 to-black
                  border ${service.colors.border} ${service.colors.hoverBorder}
                  rounded-3xl p-8 h-full
                  transition-all duration-500
                  hover:scale-[1.06]
                  hover:shadow-[0_0_60px_-10px_rgba(24,116,123,0.65)]
                  cursor-pointer
                `}
                    >
                      <div
                        className="
                    absolute inset-0 rounded-3xl
                    bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent
                    opacity-0 group-hover:opacity-100
                    translate-x-[-120%] group-hover:translate-x-[120%]
                    transition-all duration-1000
                    pointer-events-none
                  "
                      />

                      <div
                        className={`
                    absolute inset-0 rounded-3xl
                    bg-gradient-to-br ${service.colors.from} ${service.colors.to}
                    opacity-0 group-hover:opacity-10
                    transition-opacity duration-500
                    pointer-events-none
                  `}
                      />

                      <div
                        className={`
                    relative z-10
                    w-16 h-16 ${service.colors.iconBg} rounded-2xl
                    flex items-center justify-center mb-6
                    group-hover:scale-110 transition-transform duration-300
                  `}
                      >
                        <Image
                          src={service.logo}
                          alt={isArabic ? service.titleAr : service.titleEn}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="relative z-10 text-xl font-bold text-white mb-4 tracking-wide">
                        {isArabic ? service.titleAr : service.titleEn}
                      </h3>

                      {/* Description */}
                      <p className="relative z-10 text-gray-400 leading-relaxed mb-6">
                        {isArabic
                          ? service.descriptionAr
                          : service.descriptionEn}
                      </p>

                      {/* Explore */}
                      <div className="relative z-10 flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all duration-300">
                        <span>{isArabic ? "استكشاف" : "EXPLORE"}</span>
                        <ArrowRight
                          className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`}
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
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className=" p-12 md:p-16  text-center hover:border-cyan-500/50 transition-all duration-500"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isArabic
                ? "هل أنت مستعد للارتقاء بعملك إلى المستوى التالي؟"
                : "Ready to take your business to the next level?"}
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic
                ? "دعنا نناقش كيف يمكن لخدماتنا أن تساعد في تحقيق أهدافك."
                : "Let's discuss how our services can help achieve your goals."}
            </p>
            <Link href={`/${lang}/contact` as any} >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50"
              >
                {isArabic ? "ابدأ اليوم" : "Get Started Today"}
                <ArrowRight
                  className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
