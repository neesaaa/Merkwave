'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
  Mail,
  MapPin,
  Phone
} from 'lucide-react'
import { ChevronRight } from 'lucide-react'

interface SocialLink {
  icon: React.ElementType
  href: string
  color: string
  label: string
}

export default function Footer({ lang }: { lang: string }) {
  const isRTL = lang === 'ar'
  const isArabic = lang === 'ar'

  // Services
  const services = [
    { name: isArabic ? 'إدارة وسائل التواصل الاجتماعي' : 'Social Media Management', href: `/${lang}/services/business` as const },
    { name: isArabic ? 'التجارة الإلكترونية' : 'Ecommerce', href: `/${lang}/services/commerce` as const },
    { name: isArabic ? 'تطوير تطبيقات الويب' : 'Web App Development', href: `/${lang}/services/software` as const },
    { name: isArabic ? 'العلامة التجارية' : 'Branding', href: `/${lang}/services/branding` as const },
  ]

  const company = [
    { name: isArabic ? 'من نحن' : 'About Us', href: `/${lang}/about` as const },
    { name: isArabic ? 'الأعمال' : 'Portfolio', href: `/${lang}/portfolio` as const },
    { name: isArabic ? 'المدونة' : 'Blog', href: `/${lang}/blogs` as const },
    { name: isArabic ? 'اتصل بنا' : 'Contact', href: `/${lang}/contact` as const },
  ]

  const contactInfo = {
    address: isArabic ? 'هليوبوليس، القاهرة، مصر' : 'Heliopolis, Cairo, Egypt',
    phone: '+02 010233 18036',
    email: 'info@merkwave.com'
  }

interface SocialLink {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  href: string
  color: string
  label: string
}

const socialLinks: SocialLink[] = [
  { icon: Facebook, href: 'https://facebook.com/merkwave', color: 'hover:text-blue-500', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/merkwave', color: 'hover:text-pink-500', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/merkwave', color: 'hover:text-blue-500', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/201023318036', color: 'hover:text-green-500', label: 'WhatsApp' },
  { icon: Youtube, href: 'https://youtube.com/@merkwave', color: 'hover:text-red-500', label: 'YouTube' }
]


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
    }
  }

  return (
    <footer className="relative bg-[#0a0e17] overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -right-10 w-[28rem] h-[28rem] bg-[conic-gradient(at_20%_20%,rgba(34,211,238,.08),transparent_30%)] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-10 w-[26rem] h-[26rem] bg-[conic-gradient(at_80%_80%,rgba(16,185,129,.08),transparent_30%)] rounded-full blur-3xl"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800/60">
          <motion.div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? 'text-right' : 'text-left'}`}
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Brand + Socials */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white text-2xl font-bold mb-4">MerkWave</h3>
              <p className="text-gray-400 text-sm leading-6 mb-6">
                {isArabic
                  ? 'ميرك ويف وكالة تسويق رقمي ديناميكية مقرها مصر، مكرسة لتمكين الشركات الصغيرة والمتوسطة بحلول ويب مبتكرة وتطبيقات جوال جذابة واستراتيجيات تسويق تحقق النتائج. نصنع تجارب رقمية تتفاعل وتحول.'
                  : 'MerkWave is a dynamic digital marketing agency based in Egypt, dedicated to empowering SMBs with innovative web solutions, captivating mobile apps, and result-driven marketing strategies. We craft digital experiences that resonate and convert.'}
              </p>
              <div className={`flex  ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'} gap-4 flex-wrap`}>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={`social-${index}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:bg-gray-700/70`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Our Services */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white text-xl font-bold mb-6">
                {isArabic ? 'خدماتنا' : 'Our Services'}
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={`service-${index}`}>
                    <Link 
                      href={service.href as any}
                      className="inline-flex items-center gap-2 text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm"
                    >
                      <ChevronRight className="w-4 h-4 text-emerald-300/80" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company + Legal */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white text-xl font-bold mb-6">
                {isArabic ? 'الشركة' : 'Company'}
              </h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={`company-${index}`}>
                    <Link 
                      href={item.href}
                      className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="text-white text-sm font-bold mt-8 mb-4">
                {isArabic ? 'القانوني' : 'Legal'}
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className={`flex items-center gap-2 ${isRTL ? 'flex-row' : ''}`}>
                  <ChevronRight className="w-4 h-4 text-rose-300/80" />
                  <span>{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
                </li>
                <li className={`flex items-center gap-2 ${isRTL ? 'flex-row' : ''}`}>
                  <ChevronRight className="w-4 h-4 text-rose-300/80" />
                  <span>{isArabic ? 'شروط الخدمة' : 'Terms of Service'}</span>
                </li>
                <li className={`flex items-center gap-2 ${isRTL ? 'flex-row' : ''}`}>
                  <ChevronRight className="w-4 h-4 text-rose-300/80" />
                  <span>{isArabic ? 'خريطة الموقع' : 'Sitemap'}</span>
                </li>
              </ul>
            </motion.div>

            {/* Contact Us + Stay Updated */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white text-xl font-bold mb-6">
                {isArabic ? 'اتصل بنا' : 'Contact Us'}
              </h3>
              <address className="space-y-4 text-sm mb-6 not-italic">
                <p className={`text-gray-300 flex items-start gap-3 ${isRTL ? 'flex-row ' : ''}`}>
                  <MapPin className="w-4 h-4 mt-0.5 text-cyan-400" />
                  <span>{contactInfo.address}</span>
                </p>
                <p className={`text-gray-300 flex items-start gap-3 ${isRTL ? 'flex-row' : ''}`}>
                  <Phone className={`w-4 h-4 mt-0.5 text-cyan-400 `} />
                  <a
                    dir="ltr"
                    href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    {contactInfo.phone}
                  </a>

                </p>
                <p className={`text-gray-300 flex items-start gap-3 ${isRTL ? 'flex-row ' : ''}`}>
                  <Mail className="w-4 h-4 mt-0.5 text-cyan-400" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    {contactInfo.email}
                  </a>
                </p>
              </address>

              {/* Stay Updated */}
              <div className="mt-10">
                <h4 className="text-white text-sm font-bold mb-4">
                  {isArabic ? 'ابق على اطلاع' : 'Stay Updated'}
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  {isArabic 
                    ? 'اشترك في نشرتنا الإخبارية للحصول على أحدث الرؤى والتحديثات.'
                    : 'Subscribe to our newsletter for the latest insights and updates.'}
                </p>
                <form className={`flex ${isRTL ? 'flex-row-reverse' : ''} gap-3`} onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    required
                    placeholder={isArabic ? 'عنوان بريدك الإلكتروني' : 'Your email address'}
                    className="flex-1 px-4 py-3 rounded-md bg-[#0f1625] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/30"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-md bg-gradient-to-r from-orange-400 to-red-700 text-black font-semibold hover:brightness-95"
                  >
                    {isArabic ? 'اشترك' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* Copyright Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 pt-8 border-t border-gray-800"
          >
            <div className={`flex flex-col md:flex-row items-center ${isRTL ? 'md:space-x-reverse' : ''} md:justify-between gap-4 text-sm text-gray-400`}>
              <p className="text-center md:text-start">
                {isArabic 
                  ? '© 2025 MerkWave. صُنع بشغف في مصر.'
                  : '© 2025 MerkWave. Crafted with passion in Egypt.'}
              </p>
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link href={`/${lang}/about`} className="hover:text-cyan-400">
                  {isArabic ? 'من نحن' : 'About'}
                </Link>
                <span className="text-gray-600">•</span>
                <Link href={`/${lang}/contact`} className="hover:text-cyan-400">
                  {isArabic ? 'اتصل بنا' : 'Contact'}
                </Link>
                <span className="text-gray-600">•</span>
                <Link href={`/${lang}/blogs`} className="hover:text-cyan-400">
                  {isArabic ? 'المدونة' : 'Blog'}
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </footer>
  )
}
