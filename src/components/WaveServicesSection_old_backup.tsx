'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface WaveServicesSectionProps {
  dict: any;
  lang: string;
}

interface ServiceItem {
  name: string;
  description: string;
  slug?: string | number | null;
}

interface Service {
  id: number;
  title: string;
  description: string;
  gradient: string;
  slug: string;
  logo: string;
}

export default function WaveServicesSection({ dict, lang }: WaveServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(1)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const isArabic = lang === 'ar'

  // Service logos mapping - optimized paths
  const serviceLogos = useMemo(() => [
    '/Software.png',
    '/Branding.png',
    '/Business.png',
    '/Media.png',
    '/Marketing.png',
    '/Outdoor.png'
  ], [])

  // Memoize services array to prevent unnecessary recalculations
  const services = useMemo(() => 
    (dict.services.items as ServiceItem[]).map((item, index): Service => ({
      id: index + 1,
      title: item.name,
      description: item.description,
      gradient: [
        "from-purple-500/20 via-pink-500/20 to-cyan-400/30",
        "from-blue-500/20 via-purple-500/20 to-pink-500/30", 
        "from-green-500/20 via-blue-500/20 to-purple-500/30",
        "from-cyan-400/20 via-teal-500/20 to-emerald-500/30",
        "from-orange-500/20 via-red-500/20 to-pink-500/30",
        "from-indigo-500/20 via-purple-500/20 to-cyan-400/30"
      ][index % 6],
      slug: typeof item.slug === 'string' ? item.slug : String(item.slug ?? ''),
      logo: serviceLogos[index % serviceLogos.length]
    })),
    [dict.services.items, serviceLogos]
  )

  // Optimized navigation handlers with useCallback
  const nextSlide = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % services.length)
  }, [services.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
  }, [services.length])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }, [activeIndex])

  // Auto-slide with pause on hover/focus
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return

    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, services.length, prefersReducedMotion])

  // Memoize visible cards calculation
  const visibleCards = useMemo(() => {
    const prevIndex = (activeIndex - 1 + services.length) % services.length
    const nextIndex = (activeIndex + 1) % services.length
    return [prevIndex, activeIndex, nextIndex]
  }, [activeIndex, services.length])

  // GPU-accelerated animation variants
  const cardVariants = useMemo(() => ({
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.7,
      x: direction > 0 ? 300 : -300,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: (isCenter: boolean) => ({
      opacity: isCenter ? 1 : 0.5,
      scale: isCenter ? 1 : 0.8,
      x: 0,
      rotateY: 0,
      zIndex: isCenter ? 20 : 10,
      filter: isCenter ? 'blur(0px)' : 'blur(1px)'
    }),
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.7,
      x: direction > 0 ? -300 : 300,
      rotateY: direction > 0 ? -45 : 45
    })
  }), [])

  const transition = useMemo(() => ({
    duration: prefersReducedMotion ? 0.3 : 0.7,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    layout: { duration: prefersReducedMotion ? 0.2 : 0.5 }
  }), [prefersReducedMotion])

  return (
    <section 
      className="relative py-32 bg-gradient-to-b from-[#0a1628] via-[#0f1f2e] to-[#0a1628] overflow-hidden"
      aria-labelledby="services-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      
      {/* Optimized Background Orbs - will-change for GPU acceleration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/10 via-teal-500/5 to-transparent rounded-full blur-3xl will-change-transform"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl will-change-transform"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 
            id="services-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent uppercase">
              {isArabic ? 'موجاتنا من الخدمات' : 'Our Waves of Service'}
            </span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {isArabic 
              ? 'في ميركويف، نحن لا نركب الموجة فقط، نحن نصنعها. استكشف خدماتنا المتخصصة المصممة لدفع عملك إلى الأمام.'
              : 'At MERKWAVE, we don\'t just ride the currents; we create them. Explore our specialized services designed to propel your business forward.'}
          </p>
        </motion.div>

        {/* Carousel Container with Border and Padding */}
        <div className="relative max-w-[1400px] mx-auto">
          {/* Outer Container with Border */}
          <div className="relative rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#0a1628]/40 via-[#0f1f2e]/30 to-[#0a1628]/40 backdrop-blur-sm p-8 md:p-12 shadow-2xl shadow-cyan-400/10">
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-teal-400/20 hover:from-cyan-400/50 hover:to-teal-400/40 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 will-change-transform"
              aria-label={isArabic ? 'الشريحة السابقة' : 'Previous slide'}
              type="button"
            >
              <ChevronLeft className="w-8 h-8 text-cyan-100" strokeWidth={3} aria-hidden="true" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-teal-400/20 hover:from-cyan-400/50 hover:to-teal-400/40 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 will-change-transform"
              aria-label={isArabic ? 'الشريحة التالية' : 'Next slide'}
              type="button"
            >
              <ChevronRight className="w-8 h-8 text-cyan-100" strokeWidth={3} aria-hidden="true" />
            </button>

            {/* Cards Container - Optimized for Performance */}
            <div className="relative overflow-visible py-16 px-4" role="region" aria-live="polite">
              <div className="flex items-center justify-center gap-10 min-h-[520px]">
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleCards.map((cardIndex, position) => {
                    const service = services[cardIndex]
                    const isCenter = position === 1

                    return (
                      <motion.article
                        key={`${service.id}-${cardIndex}`}
                        layout
                        custom={direction}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={cardVariants}
                        transition={transition}
                        whileHover={isCenter && !prefersReducedMotion ? { 
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        } : {}}
                        className={`relative backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 will-change-transform ${
                          isCenter 
                            ? 'w-[400px] h-[500px]' 
                            : 'w-[300px] h-[440px]'
                        }`}
                        style={{
                          background: `linear-gradient(145deg, rgba(10, 22, 40, 0.95), rgba(15, 31, 46, 0.9))`,
                          transformStyle: 'preserve-3d',
                          perspective: '1000px'
                        }}
                        aria-hidden={!isCenter}
                      >
                        {/* Glowing Border Effect */}
                        <div 
                          className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500 ${
                            isCenter 
                              ? 'border-2 border-cyan-400/60 shadow-2xl shadow-cyan-400/30' 
                              : 'border border-cyan-400/20 shadow-lg shadow-cyan-400/10'
                          }`}
                          aria-hidden="true"
                        />
                        
                        {/* Gradient Overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl pointer-events-none transition-opacity duration-500 ${
                            isCenter ? 'opacity-30' : 'opacity-20'
                          }`}
                          aria-hidden="true"
                        />
                        
                        {/* Shine Effect - Only on center card */}
                        {isCenter && !prefersReducedMotion && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut"
                            }}
                            aria-hidden="true"
                          />
                        )}
                        
                        {/* Card Content */}
                        <div className="relative z-10 p-8 h-full flex flex-col">
                          {/* Logo with Next.js Image Optimization */}
                          <motion.div 
                            className="mb-6 flex justify-center"
                            animate={isCenter && !prefersReducedMotion ? {
                              y: [0, -5, 0]
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <div className={`relative rounded-2xl bg-gradient-to-br ${service.gradient} p-1 shadow-2xl transition-all duration-500 ${
                              isCenter ? 'w-36 h-36 shadow-cyan-400/40' : 'w-28 h-28'
                            }`}>
                              <div className="w-full h-full bg-[#0a1628] rounded-2xl p-4 flex items-center justify-center backdrop-blur-sm">
                                <Image
                                  src={service.logo}
                                  alt={`${service.title} service icon`}
                                  width={isCenter ? 90 : 70}
                                  height={isCenter ? 90 : 70}
                                  className="object-contain transition-transform duration-500"
                                  priority={position === 1}
                                  loading={position === 1 ? "eager" : "lazy"}
                                  quality={85}
                                  sizes="(max-width: 768px) 70px, 90px"
                                />
                              </div>
                            </div>
                          </motion.div>

                          {/* Title */}
                          <h3 className={`font-bold mb-4 text-center bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent uppercase tracking-wider transition-all duration-500 ${
                            isCenter ? 'text-2xl' : 'text-xl'
                          }`}>
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className={`text-gray-300 text-center leading-relaxed mb-6 flex-1 transition-all duration-500 ${
                            isCenter ? 'text-base opacity-100' : 'text-sm opacity-70'
                          }`}>
                            {service.description}
                          </p>

                          {/* Explore Button with Prefetch */}
                          {isCenter && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                              className="mt-auto"
                            >
                              <Link 
                                href={`/${lang}/services/${service.slug}` as any}
                                prefetch={true}
                                aria-label={`${isArabic ? 'استكشف خدمة' : 'Explore'} ${service.title}`}
                              >
                                <motion.button 
                                  className="w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-cyan-400 to-teal-400 text-black shadow-lg shadow-cyan-400/30 will-change-transform"
                                  whileHover={!prefersReducedMotion ? { 
                                    scale: 1.05,
                                    boxShadow: '0 20px 40px rgba(34, 211, 238, 0.4)'
                                  } : {}}
                                  whileTap={{ scale: 0.98 }}
                                  type="button"
                                >
                                  {isArabic ? 'استكشف' : 'Explore'}
                                </motion.button>
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Pagination Dots */}
            <nav 
              className="flex justify-center gap-3 mt-8"
              aria-label={isArabic ? 'تنقل الشرائح' : 'Slide navigation'}
            >
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-500 rounded-full will-change-transform ${
                    index === activeIndex 
                      ? 'w-14 h-3.5 bg-gradient-to-r from-cyan-400 to-teal-400 shadow-lg shadow-cyan-400/50' 
                      : 'w-3.5 h-3.5 bg-gray-600/60 hover:bg-cyan-400/60 hover:scale-125'
                  }`}
                  whileHover={{ scale: index === activeIndex ? 1.05 : 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`${isArabic ? 'انتقل إلى الشريحة' : 'Go to slide'} ${index + 1}: ${service.title}`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                  type="button"
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
