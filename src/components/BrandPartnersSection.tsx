'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, Users, Building2, TrendingUp, ArrowRight } from 'lucide-react'

interface BrandPartnersSectionProps {
  dict: any;
  lang: string;
}

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
      <section className="py-16 bg-[#0f1a1e]">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="text-center">
            {/* Section Heading */}
            <h2 className="text-2xl md:text-3xl font-bold mb-12">
              <span className="bg-gradient-to-r from-[#00e0c6] to-cyan-400 bg-clip-text text-transparent">
                {isArabic ? 'نقف شامخين مع شركائنا من العلامات التجارية المرموقة' : 'Standing Tall with Our Esteemed Brand Partners'}
              </span>
            </h2>

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
      <section className="py-20 bg-gradient-to-b from-[#0a1628] via-[#0f1f2e] to-[#0a1628] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10`} dir={isArabic ? 'rtl' : 'ltr'}>
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {isArabic ? 'عملاؤنا الناجحون' : 'Our Success Stories'}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {isArabic 
              ? 'نفخر بشراكتنا مع العلامات التجارية الرائدة وتحقيق نتائج استثنائية' 
              : 'Proud partnerships with leading brands achieving exceptional results'}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-[#0a1628]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-2.5 flex items-center justify-center`}>
                <stat.icon className="w-full h-full text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label[isArabic ? 'ar' : 'en']}</div>
            </motion.div>
          ))}
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={`/${lang}/clients/${client.id}`} className="block">
                <div className="group bg-[#0a1628]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 h-full cursor-pointer">
                  {/* Logo */}
                  <div className="relative h-20 mb-6 flex items-center justify-center">
                    <Image
                      src={client.logo}
                      alt={`${client.name} Logo`}
                      width={160}
                      height={80}
                      className="object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Client Name */}
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">{client.name}</h3>
                  
                  {/* Industry Badge */}
                  <div className="flex justify-center mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm">
                      {client.industry[isArabic ? 'ar' : 'en']}
                    </span>
                  </div>
                  
                  {/* Project Title */}
                  <div className="mb-3">
                    <p className="text-white font-semibold text-center text-lg">
                      {client.project[isArabic ? 'ar' : 'en']}
                    </p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-center mb-6 text-sm leading-relaxed">
                    {client.description[isArabic ? 'ar' : 'en']}
                  </p>
                  
                  {/* View Project Link */}
                  <div className={`flex items-center justify-center gap-2 text-cyan-400 group-hover:gap-4 transition-all duration-300 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-semibold">
                      {isArabic ? 'عرض المشروع' : 'View Project'}
                    </span>
                    <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isArabic ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 mb-6">
            {isArabic 
              ? 'هل تريد أن تكون قصة نجاحنا التالية؟' 
              : 'Want to be our next success story?'}
          </p>
          <Link href={`/${lang}/contact`}>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {isArabic ? 'ابدأ مشروعك' : 'Start Your Project'}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  )
}
