"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";
import { useEffect, useState } from "react";

interface BrandPartnersSectionProps {
  dict: any;
  lang: string;
}
const cyanShades = ["#003366", "#0066CC", "#00CCFF"];

interface BrandLogo {
  id: number;
  name: string;
  altText: string;
  imageUrl: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5070";

const FALLBACK_LOGOS: BrandLogo[] = [
  { id: 1, name: "Boslat", altText: "Boslat Brand Logo", imageUrl: "" },
  { id: 2, name: "Makdouz", altText: "Makdouz Brand Logo", imageUrl: "" },
  {
    id: 3,
    name: "Balance Box",
    altText: "Balance Box Brand Logo",
    imageUrl: "",
  },
  { id: 4, name: "One Chemic", altText: "One Chemic Brand Logo", imageUrl: "" },
  { id: 5, name: "Shemokh", altText: "Shemokh Brand Logo", imageUrl: "" },
  { id: 6, name: "Saudi Fit", altText: "Saudi Fit Brand Logo", imageUrl: "" },
  { id: 7, name: "1ON CORE", altText: "1ON CORE Brand Logo", imageUrl: "" },
];

// Map brand names to local static images for fallback display
const STATIC_LOGO_MAP: Record<string, string> = {
  Boslat: "/Boslat.png",
  Makdouz: "/Makdouz.png",
  "Balance Box": "/Balance-Box.png",
  "One Chemic": "/One Chemic.png",
  Shemokh: "/Shemokh.png",
  "Saudi Fit": "/Saudi-Fit.png",
  "1ON CORE": "/1ON CORE.png",
};

function getLogoSrc(logo: BrandLogo): string {
  if (logo.imageUrl) return `${API_URL}${logo.imageUrl}`;
  return STATIC_LOGO_MAP[logo.name] ?? "";
}

export default function BrandPartnersSection({
  dict,
  lang,
}: BrandPartnersSectionProps) {
  const isArabic = lang === "ar";
  const [brandLogos, setBrandLogos] = useState<BrandLogo[]>([]);
  const [logosLoading, setLogosLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/api/brandlogos`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json() as Promise<BrandLogo[]>;
      })
      .then((data) => {
        if (!cancelled) setBrandLogos(data.length > 0 ? data : FALLBACK_LOGOS);
      })
      .catch(() => {
        if (!cancelled) setBrandLogos(FALLBACK_LOGOS);
      })
      .finally(() => {
        if (!cancelled) setLogosLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const clients = [
    {
      id: "ion-core",
      name: "1ON CORE",
      logo: "/1ON CORE.png",
      industry: { en: "Technology", ar: "التكنولوجيا" },
      description: {
        en: "Custom software platform with digital marketing",
        ar: "منصة برمجيات مخصصة مع التسويق الرقمي",
      },
      project: {
        en: "Digital Transformation Platform",
        ar: "منصة التحول الرقمي",
      },
    },
    {
      id: "boslat",
      name: "Boslat",
      logo: "/Boslat.png",
      industry: { en: "E-commerce", ar: "التجارة الإلكترونية" },
      description: {
        en: "Complete e-commerce solution with AI recommendations",
        ar: "حل تجارة إلكترونية كامل مع توصيات الذكاء الاصطناعي",
      },
      project: {
        en: "E-commerce Platform & Mobile App",
        ar: "منصة التجارة الإلكترونية وتطبيق الهاتف",
      },
    },
    {
      id: "makdouz",
      name: "Makdouz",
      logo: "/Makdouz.png",
      industry: { en: "Food & Beverage", ar: "الأطعمة والمشروبات" },
      description: {
        en: "Digital presence with online ordering system",
        ar: "الحضور الرقمي مع نظام الطلب عبر الإنترنت",
      },
      project: {
        en: "Restaurant Website & Ordering System",
        ar: "موقع المطعم ونظام الطلب",
      },
    },
    {
      id: "balance-box",
      name: "Balance Box",
      logo: "/Balance-Box.png",
      industry: { en: "Health & Wellness", ar: "الصحة والعافية" },
      description: {
        en: "AI-powered wellness platform with fitness tracking",
        ar: "منصة العافية المدعومة بالذكاء الاصطناعي مع تتبع اللياقة",
      },
      project: {
        en: "Wellness Platform & Mobile App",
        ar: "منصة العافية وتطبيق الهاتف",
      },
    },
    {
      id: "one-chemic",
      name: "One Chemic",
      logo: "/One Chemic.png",
      industry: { en: "Chemicals", ar: "الكيماويات" },
      description: {
        en: "Enterprise resource planning system",
        ar: "نظام تخطيط موارد المؤسسة",
      },
      project: {
        en: "ERP System & Corporate Website",
        ar: "نظام ERP وموقع الشركات",
      },
    },
    {
      id: "saudi-fit",
      name: "Saudi Fit",
      logo: "/Saudi-Fit.png",
      industry: { en: "Fitness", ar: "اللياقة البدنية" },
      description: {
        en: "Member management and booking system",
        ar: "نظام إدارة الأعضاء والحجز",
      },
      project: {
        en: "Gym Management System & App",
        ar: "نظام إدارة الصالة الرياضية والتطبيق",
      },
    },
    {
      id: "shemokh",
      name: "Shemokh",
      logo: "/Shemokh.png",
      industry: { en: "Services", ar: "الخدمات" },
      description: {
        en: "Dual-sided marketplace platform",
        ar: "منصة سوق ثنائية الجانب",
      },
      project: {
        en: "Service Marketplace Platform",
        ar: "منصة سوق الخدمات",
      },
    },
  ];

  const stats = [
    {
      icon: Briefcase,
      value: "50+",
      label: { en: "Projects Delivered", ar: "مشروع منجز" },
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: Users,
      value: "25+",
      label: { en: "Happy Clients", ar: "عميل راضٍ" },
      color: "from-blue-400 to-purple-500",
    },
    {
      icon: Building2,
      value: "8+",
      label: { en: "Industries Served", ar: "صناعة مخدومة" },
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: TrendingUp,
      value: "100%",
      label: { en: "Client Satisfaction", ar: "رضا العملاء" },
      color: "from-pink-400 to-red-500",
    },
  ];

  const brandLogosDisplay = logosLoading ? [] : brandLogos;

  return (
    <>
      {/* Original Logo Slider Section */}
      <section className="py-16 bg-[#0B192A]">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? "text-right" : "text-left"}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="text-center">
            {/* Section Heading */}
            <h3 className="text-2xl md:text-3xl font-bold mb-12">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {isArabic
                  ? "نقف شامخين مع شركائنا من العلامات التجارية المرموقة"
                  : "Standing Tall with Our Esteemed Brand Partners"}
              </span>
            </h3>
            {/* Infinite Loop Slider */}
            <div className="overflow-hidden relative">
              <div className="flex animate-infinite-scroll">
                {/* First set of logos */}
                {brandLogosDisplay.map((logo) => (
                  <div
                    key={`first-${logo.id}`}
                    className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center hover:scale-105 transition-transform duration-300"
                  >
                    {getLogoSrc(logo) ? (
                      <Image
                        src={getLogoSrc(logo)}
                        alt={logo.altText || logo.name}
                        width={200}
                        height={80}
                        className="h-16 md:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          maxHeight: "80px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                        unoptimized
                      />
                    ) : (
                      <span className="text-gray-400 text-sm font-medium px-2">
                        {logo.name}
                      </span>
                    )}
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {brandLogosDisplay.map((logo) => (
                  <div
                    key={`second-${logo.id}`}
                    className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center hover:scale-105 transition-transform duration-300"
                  >
                    {getLogoSrc(logo) ? (
                      <Image
                        src={getLogoSrc(logo)}
                        alt={logo.altText || logo.name}
                        width={200}
                        height={80}
                        className="h-16 md:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          maxHeight: "80px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                        unoptimized
                      />
                    ) : (
                      <span className="text-gray-400 text-sm font-medium px-2">
                        {logo.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CSS for infinite scroll animation */}
        <style jsx global>{`
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes infinite-scroll-rtl {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(50%);
            }
          }

          .animate-infinite-scroll {
            animation: ${isArabic ? "infinite-scroll-rtl" : "infinite-scroll"}
              30s linear infinite;
            width: max-content;
          }

          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* New Professional Clients Section */}
    </>
  );
}
