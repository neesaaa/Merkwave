'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface ServicesClientProps {
  dict: any
  lang: string
}

const services = [
  {
    id: 'software',
    logo: '/Software.png',
    titleEn: 'SOFTWARE WAVE',
    titleAr: 'موجة البرمجيات',
    descriptionEn: 'Custom software solutions that scale with your business and streamline operations.',
    descriptionAr: 'حلول برمجية مخصصة تنمو مع عملك وتبسط العمليات.',
    colors: {
      from: 'from-purple-500',
      to: 'to-pink-500',
      border: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-500/60',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
    }
  },
  {
    id: 'branding',
    logo: '/Branding.png',
    titleEn: 'BRANDING WAVE',
    titleAr: 'موجة العلامة التجارية',
    descriptionEn: 'Comprehensive brand strategies that make your business stand out and connect with customers.',
    descriptionAr: 'استراتيجيات علامة تجارية شاملة تجعل عملك متميزًا وتتواصل مع العملاء.',
    colors: {
      from: 'from-pink-500',
      to: 'to-orange-500',
      border: 'border-pink-500/30',
      hoverBorder: 'hover:border-pink-500/60',
      iconBg: 'bg-pink-500/10',
      iconColor: 'text-pink-400',
    }
  },
  {
    id: 'business',
    logo: '/Business.png',
    titleEn: 'BUSINESS WAVE',
    titleAr: 'موجة الأعمال',
    descriptionEn: 'Data-driven digital marketing to grow awareness, leads, and revenue.',
    descriptionAr: 'تسويق رقمي قائم على البيانات لتنمية الوعي والعملاء المحتملين والإيرادات.',
    colors: {
      from: 'from-cyan-500',
      to: 'to-blue-500',
      border: 'border-cyan-500/30',
      hoverBorder: 'hover:border-cyan-500/60',
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-400',
    }
  },
  {
    id: 'mobile',
    logo: '/Outdoor.png',
    titleEn: 'MOBILE WAVE',
    titleAr: 'موجة الموبايل',
    descriptionEn: 'Mobile experiences that engage users with intuitive, performant apps.',
    descriptionAr: 'تجارب موبايل جذابة مع تطبيقات بديهية وعالية الأداء.',
    colors: {
      from: 'from-orange-500',
      to: 'to-red-500',
      border: 'border-orange-500/30',
      hoverBorder: 'hover:border-orange-500/60',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
    }
  },
  {
    id: 'commerce',
    logo: '/Marketing.png',
    titleEn: 'COMMERCE WAVE',
    titleAr: 'موجة التجارة',
    descriptionEn: 'Ecommerce platforms designed to convert visitors into loyal customers.',
    descriptionAr: 'منصات تجارة إلكترونية مصممة لتحويل الزوار إلى عملاء مخلصين.',
    colors: {
      from: 'from-green-500',
      to: 'to-teal-500',
      border: 'border-green-500/30',
      hoverBorder: 'hover:border-green-500/60',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-400',
    }
  },
  {
    id: 'seo',
    logo: '/Media.png',
    titleEn: 'SEO WAVE',
    titleAr: 'موجة السيو',
    descriptionEn: 'Proven SEO strategies to improve visibility and organic growth.',
    descriptionAr: 'استراتيجيات سيو مثبتة لتحسين الظهور والنمو العضوي.',
    colors: {
      from: 'from-yellow-500',
      to: 'to-orange-500',
      border: 'border-yellow-500/30',
      hoverBorder: 'hover:border-yellow-500/60',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400',
    }
  },
]

export default function ServicesClient({ dict, lang }: ServicesClientProps) {
  const isArabic = lang === 'ar'

  return (
    <div className={`min-h-screen bg-black ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-white">{isArabic ? 'موجاتنا' : 'OUR '}</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {isArabic ? '' : 'WAVES'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {isArabic
              ? 'في MerkWave، لا نركب التيارات فحسب - بل نخلقها. استكشف خدماتنا المتخصصة المصممة لدفع عملك إلى الأمام.'
              : "At MerkWave, we don't just ride the currents — we create them. Explore our specialized services designed to propel your business forward."}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/${lang}/services/${service.id}` as any}>
                    <div className={`
                      group relative bg-gradient-to-br from-gray-900 to-black 
                      border ${service.colors.border} ${service.colors.hoverBorder}
                      rounded-3xl p-8 h-full
                      transition-all duration-500
                      hover:scale-105 hover:shadow-2xl
                      cursor-pointer
                    `}>
                      {/* Logo Image */}
                      <div className={`
                        w-16 h-16 ${service.colors.iconBg} rounded-2xl
                        flex items-center justify-center mb-6
                        group-hover:scale-110 transition-transform duration-300
                        overflow-hidden
                      `}>
                        <Image 
                          src={service.logo} 
                          alt={isArabic ? service.titleAr : service.titleEn}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-4 tracking-wide">
                        {isArabic ? service.titleAr : service.titleEn}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 leading-relaxed mb-6">
                        {isArabic ? service.descriptionAr : service.descriptionEn}
                      </p>

                      {/* Explore Button */}
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all duration-300">
                        <span>{isArabic ? 'استكشاف' : 'EXPLORE'}</span>
                        <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
                      </div>

                      {/* Gradient Overlay on Hover */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-br ${service.colors.from} ${service.colors.to}
                        opacity-0 group-hover:opacity-5 rounded-3xl
                        transition-opacity duration-500 pointer-events-none
                      `}></div>
                    </div>
                  </Link>
                </motion.div>
              )
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
            className="border-2 border-cyan-500/30 rounded-3xl p-12 md:p-16 bg-gradient-to-br from-cyan-900/5 to-blue-900/5 text-center hover:border-cyan-500/50 transition-all duration-500"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isArabic ? 'هل أنت مستعد للارتقاء بعملك إلى المستوى التالي؟' : 'Ready to take your business to the next level?'}
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic
                ? 'دعنا نناقش كيف يمكن لخدماتنا أن تساعد في تحقيق أهدافك.'
                : "Let's discuss how our services can help achieve your goals."}
            </p>
            <Link href={`/${lang}/contact`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50"
              >
                {isArabic ? 'ابدأ اليوم' : 'Get Started Today'}
                <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
