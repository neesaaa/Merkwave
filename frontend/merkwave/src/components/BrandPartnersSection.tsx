'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, Users, Building2, TrendingUp, ArrowRight } from 'lucide-react'
import { InteractiveCard } from '@/components/InteractiveCard';
import { useEffect, useState } from 'react'
import BlackHole from './BlackHole'
import StackCardsSection from './StackCardsSection'

interface BrandPartnersSectionProps {
  dict: any;
  lang: string;
}
const cyanShades = ["#003366", "#0066CC", "#00CCFF"];

export default function BrandPartnersSection({ dict, lang }: BrandPartnersSectionProps) {
  const isArabic = lang === 'ar';
  
  const clients = [
    {
      id: 'ion-core',
      name: '1ON CORE',
      logo: '/1ON CORE.png',
      industry: { en: 'Technology', ar: 'التكنولوجيا' },
      description: {
        en: 'Custom software platform with digital marketing',
        ar: 'منصة برمجيات مخصصة مع التسويق الرقمي'
      },
      project: {
        en: 'Digital Transformation Platform',
        ar: 'منصة التحول الرقمي'
      }
    },
    {
      id: 'boslat',
      name: 'Boslat',
      logo: '/Boslat.png',
      industry: { en: 'E-commerce', ar: 'التجارة الإلكترونية' },
      description: {
        en: 'Complete e-commerce solution with AI recommendations',
        ar: 'حل تجارة إلكترونية كامل مع توصيات الذكاء الاصطناعي'
      },
      project: {
        en: 'E-commerce Platform & Mobile App',
        ar: 'منصة التجارة الإلكترونية وتطبيق الهاتف'
      }
    },
    {
      id: 'makdouz',
      name: 'Makdouz',
      logo: '/Makdouz.png',
      industry: { en: 'Food & Beverage', ar: 'الأطعمة والمشروبات' },
      description: {
        en: 'Digital presence with online ordering system',
        ar: 'الحضور الرقمي مع نظام الطلب عبر الإنترنت'
      },
      project: {
        en: 'Restaurant Website & Ordering System',
        ar: 'موقع المطعم ونظام الطلب'
      }
    },
    {
      id: 'balance-box',
      name: 'Balance Box',
      logo: '/Balance-Box.png',
      industry: { en: 'Health & Wellness', ar: 'الصحة والعافية' },
      description: {
        en: 'AI-powered wellness platform with fitness tracking',
        ar: 'منصة العافية المدعومة بالذكاء الاصطناعي مع تتبع اللياقة'
      },
      project: {
        en: 'Wellness Platform & Mobile App',
        ar: 'منصة العافية وتطبيق الهاتف'
      }
    },
    {
      id: 'one-chemic',
      name: 'One Chemic',
      logo: '/One Chemic.png',
      industry: { en: 'Chemicals', ar: 'الكيماويات' },
      description: {
        en: 'Enterprise resource planning system',
        ar: 'نظام تخطيط موارد المؤسسة'
      },
      project: {
        en: 'ERP System & Corporate Website',
        ar: 'نظام ERP وموقع الشركات'
      }
    },
    {
      id: 'saudi-fit',
      name: 'Saudi Fit',
      logo: '/Saudi-Fit.png',
      industry: { en: 'Fitness', ar: 'اللياقة البدنية' },
      description: {
        en: 'Member management and booking system',
        ar: 'نظام إدارة الأعضاء والحجز'
      },
      project: {
        en: 'Gym Management System & App',
        ar: 'نظام إدارة الصالة الرياضية والتطبيق'
      }
    },
    {
      id: 'shemokh',
      name: 'Shemokh',
      logo: '/Shemokh.png',
      industry: { en: 'Services', ar: 'الخدمات' },
      description: {
        en: 'Dual-sided marketplace platform',
        ar: 'منصة سوق ثنائية الجانب'
      },
      project: {
        en: 'Service Marketplace Platform',
        ar: 'منصة سوق الخدمات'
      }
    }
  ]

  const stats = [
    {
      icon: Briefcase,
      value: '50+',
      label: { en: 'Projects Delivered', ar: 'مشروع منجز' },
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Users,
      value: '25+',
      label: { en: 'Happy Clients', ar: 'عميل راضٍ' },
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Building2,
      value: '8+',
      label: { en: 'Industries Served', ar: 'صناعة مخدومة' },
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: TrendingUp,
      value: '100%',
      label: { en: 'Client Satisfaction', ar: 'رضا العملاء' },
      color: 'from-pink-400 to-red-500'
    }
  ]

  const brandLogos = [
    { id: 1, name: "Boslat", src: "/Boslat.png", alt: "Boslat Brand Logo" },
    { id: 2, name: "Makdouz", src: "/Makdouz.png", alt: "Makdouz Brand Logo" },
    { id: 3, name: "Balance Box", src: "/Balance-Box.png", alt: "Balance Box Brand Logo" },
    { id: 4, name: "One Chemic", src: "/One Chemic.png", alt: "One Chemic Brand Logo" },
    { id: 5, name: "Shemokh", src: "/Shemokh.png", alt: "Shemokh Brand Logo" },
    { id: 6, name: "Saudi Fit", src: "/Saudi-Fit.png", alt: "Saudi Fit Brand Logo" },
    { id: 7, name: "1ON CORE", src: "/1ON CORE.png", alt: "1ON CORE Brand Logo" }
  ];


  return (
    <>
      {/* Original Logo Slider Section */}
      <section className="py-16 bg-[#0B192A]">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="text-center">
            {/* Section Heading */}
            <h3 className="text-2xl md:text-3xl font-bold mb-12">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {isArabic ? 'نقف شامخين مع شركائنا من العلامات التجارية المرموقة' : 'Standing Tall with Our Esteemed Brand Partners'}
              </span>
            </h3>
            {/* Infinite Loop Slider */}
            <div className="overflow-hidden relative">
              <div className="flex animate-infinite-scroll">
                {/* First set of logos */}
                {brandLogos.map((logo) => (
                  <div
                    key={`first-${logo.id}`}
                    className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={200}
                      height={80}
                      className="h-16 md:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        maxHeight: '80px',
                        width: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {brandLogos.map((logo) => (
                  <div
                    key={`second-${logo.id}`}
                    className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={200}
                      height={80}
                      className="h-16 md:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        maxHeight: '80px',
                        width: 'auto',
                        objectFit: 'contain'
                      }}
                    />
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
            animation: ${isArabic ? 'infinite-scroll-rtl' : 'infinite-scroll'} 30s linear infinite;
            width: max-content;
          }
          
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* New Professional Clients Section */}

    </>
  )
}
