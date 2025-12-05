'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Zap, TrendingUp, Globe, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

// Define the expected props structure for localization
interface HeroSectionProps {
  dict: any; // Dictionary object passed from the Server Component
  lang: string; // Current locale (e.g., 'en' or 'ar')
}

export default function HeroSection({ dict, lang }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)
  const isArabic = lang === 'ar';

  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Dynamic text direction classes
  const textDirClass = isArabic ? 'text-right' : 'text-left';
  const lgTextDirClass = isArabic ? 'lg:text-right' : 'lg:text-left';

  return (
    <section className={`relative min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f2e] to-[#0a1628] overflow-hidden flex items-center`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1f2e] to-[#0a1628]"></div>
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-br from-cyan-400/10 via-teal-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div 
            className={`${textDirClass} ${lgTextDirClass}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div 
              className={`inline-flex items-center px-5 py-2.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 backdrop-blur-sm mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className={`w-4 h-4 text-cyan-400 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">
                {isArabic ? 'حلول رقمية ذكية' : 'Smart Digital Solutions'}
              </span>
            </motion.div>

            {/* Main headline with gradient */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {isArabic ? (
                <>
                  <span className="text-white">تمكين </span>
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                    أعمالك
                  </span>
                  <br />
                  <span className="text-white">بحلول </span>
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                    رقمية ذكية
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">Empowering Your </span>
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                    Business
                  </span>
                  <br />
                  <span className="text-white">with Smart </span>
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                    Digital Solutions
                  </span>
                </>
              )}
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              className={`text-gray-300 text-base md:text-lg lg:text-xl mb-10 max-w-2xl leading-relaxed`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {isArabic 
                ? 'نساعد الشركات الصغيرة والمتوسطة على النمو من خلال التسويق الرقمي الإبداعي، وتطوير البرمجيات المخصصة، والاستشارات الاستراتيجية.'
                : 'We help SMBs grow with creative digital marketing, bespoke software development, and strategic consulting.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'sm:justify-end lg:justify-start' : 'sm:justify-start'} items-start`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link href={`/${lang}/contact`}>
                <motion.button
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-bold text-base rounded-full shadow-lg shadow-cyan-400/30 overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 211, 238, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={isArabic ? 'ml-2' : 'mr-2'}>
                    {isArabic ? 'ابدأ الآن' : 'Get Started'}
                  </span>
                  <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 ${isArabic ? 'rotate-180' : ''}`} />
                </motion.button>
              </Link>
              
              <Link href={`/${lang}/services`}>
                <motion.button
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-cyan-400/40 text-cyan-400 font-semibold text-base rounded-full hover:bg-cyan-400/10 hover:border-cyan-400 backdrop-blur-sm transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isArabic ? 'استكشف الخدمات' : 'View Our Work'}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right illustration */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative z-10">
              {/* Central glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl scale-150"></div>
              
              {/* Floating icons container */}
              <div className="relative w-full h-96 lg:h-[500px]">
                {/* Central node */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 30px rgba(34,211,238,0.5)',
                      '0 0 50px rgba(34,211,238,0.7)',
                      '0 0 30px rgba(34,211,238,0.5)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-10 h-10 text-black" />
                </motion.div>

                {/* Floating elements */}
                {mounted && (
                  <>
                    {/* Growth icon */}
                    <motion.div 
                      className="absolute top-16 right-20 w-16 h-16 bg-[#0a1628]/80 backdrop-blur-md border-2 border-cyan-400/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-400/20"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <TrendingUp className="w-8 h-8 text-cyan-400" />
                    </motion.div>

                    {/* Globe icon */}
                    <motion.div 
                      className="absolute bottom-20 left-16 w-14 h-14 bg-[#0a1628]/80 backdrop-blur-md border-2 border-teal-400/30 rounded-xl flex items-center justify-center shadow-lg shadow-teal-400/20"
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, -3, 0]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Globe className="w-7 h-7 text-teal-400" />
                    </motion.div>

                    {/* Additional floating elements */}
                    <motion.div 
                      className="absolute top-32 left-12 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-lg backdrop-blur-sm border border-cyan-400/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute bottom-32 right-12 w-10 h-10 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full backdrop-blur-sm border border-teal-400/20"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M 200 120 Q 300 200 250 250 T 150 350"
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M 150 100 Q 200 180 300 200 T 350 320"
                        stroke="url(#lineGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      />
                    </svg>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
