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
  const [isDragging, setIsDragging] = useState(false)
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

  // Handle drag end
  const handleDragEnd = useCallback((event: any, info: any) => {
    setIsDragging(false)
    const swipeThreshold = 50
    const swipeVelocity = 500 // Velocity threshold
    
    // Check both offset and velocity for more responsive swiping
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocity) {
      // In RTL (Arabic), swipe directions are reversed
      const swipeRight = info.offset.x > 0 || info.velocity.x > 0
      
      if (isArabic) {
        // RTL: Swipe right -> next, Swipe left -> previous
        if (swipeRight) {
          nextSlide()
        } else {
          prevSlide()
        }
      } else {
        // LTR: Swipe right -> previous, Swipe left -> next
        if (swipeRight) {
          prevSlide()
        } else {
          nextSlide()
        }
      }
    }
  }, [nextSlide, prevSlide, isArabic])

  // Auto-slide with pause on hover/focus
  useEffect(() => {
    if (isPaused || prefersReducedMotion || isDragging) return

    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, services.length, prefersReducedMotion, isDragging])

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
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotateY: 0,
      zIndex: 20,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    side: {
      opacity: 0.5,
      scale: 0.8,
      x: 0,
      rotateY: 0,
      zIndex: 10,
      filter: 'blur(1px)',
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.7,
      x: direction > 0 ? -300 : 300,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    })
  }), [prefersReducedMotion])

  return (
    <section 
      className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0a1628] via-[#0f1f2e] to-[#0a1628] overflow-hidden"
      aria-labelledby="services-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      
      {/* Optimized Background Orbs - Responsive sizes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[300px] md:w-[400px] lg:w-[500px] h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-cyan-400/10 via-teal-500/5 to-transparent rounded-full blur-3xl will-change-transform"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[350px] md:w-[500px] lg:w-[600px] h-[350px] md:h-[500px] lg:h-[600px] bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl will-change-transform"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Section Header - Responsive */}
        <motion.div 
          className="text-center mb-12 md:mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 tracking-tight px-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent uppercase">
              {isArabic ? 'موجاتنا من الخدمات' : 'Our Waves of Service'}
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            {isArabic 
              ? 'في ميركويف، نحن لا نركب الموجة فقط، نحن نصنعها. استكشف خدماتنا المتخصصة المصممة لدفع عملك إلى الأمام.'
              : 'At MERKWAVE, we don\'t just ride the currents; we create them. Explore our specialized services designed to propel your business forward.'}
          </p>
        </motion.div>

        {/* Carousel Container - Responsive */}
        <div className="relative max-w-full md:max-w-5xl lg:max-w-[1400px] mx-auto">
          {/* Outer Container with Border - Responsive padding */}
          <div className="relative rounded-2xl md:rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#0a1628]/40 via-[#0f1f2e]/30 to-[#0a1628]/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl shadow-cyan-400/10">
            
            {/* Navigation Arrows - Hidden on Mobile, visible on tablet+ */}
            <button
              onClick={isArabic ? nextSlide : prevSlide}
              className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-400/30 to-teal-400/20 hover:from-cyan-400/50 hover:to-teal-400/40 backdrop-blur-xl rounded-full items-center justify-center transition-all duration-500 hover:scale-110 border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 will-change-transform"
              aria-label={isArabic ? 'الشريحة السابقة' : 'Previous slide'}
              type="button"
            >
              <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-100" strokeWidth={3} aria-hidden="true" />
            </button>

            <button
              onClick={isArabic ? prevSlide : nextSlide}
              className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-400/30 to-teal-400/20 hover:from-cyan-400/50 hover:to-teal-400/40 backdrop-blur-xl rounded-full items-center justify-center transition-all duration-500 hover:scale-110 border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 will-change-transform"
              aria-label={isArabic ? 'الشريحة التالية' : 'Next slide'}
              type="button"
            >
              <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-100" strokeWidth={3} aria-hidden="true" />
            </button>

            {/* Cards Container - Responsive layout */}
            <div className="relative overflow-visible py-8 md:py-12 lg:py-16 px-2 md:px-4" role="region" aria-live="polite">
              
              {/* Drag Hint - Mobile */}
              <div className="md:hidden text-center mb-4">
                <p className="text-gray-400 text-xs flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  {isArabic ? 'اسحب للتصفح' : 'Swipe to browse'}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </p>
              </div>

              {/* Mobile: Single Card View */}
              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  {services.map((service, index) => {
                    if (index !== activeIndex) return null

                    return (
                      <motion.article
                        key={service.id}
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: {
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          x: direction > 0 ? -100 : 100,
                          transition: {
                            duration: 0.2
                          }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ cursor: 'grabbing', scale: 0.98 }}
                        className="relative backdrop-blur-xl rounded-2xl overflow-hidden w-full max-w-sm mx-auto cursor-grab active:cursor-grabbing"
                        style={{
                          background: `linear-gradient(145deg, rgba(10, 22, 40, 0.95), rgba(15, 31, 46, 0.9))`,
                          minHeight: '480px'
                        }}
                      >
                        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/60 shadow-2xl shadow-cyan-400/30 pointer-events-none" aria-hidden="true" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 rounded-2xl pointer-events-none`} aria-hidden="true" />
                        
                        <div className="relative z-10 p-6 h-full flex flex-col">
                          <div className="mb-6 flex justify-center">
                            <div className={`relative rounded-2xl bg-gradient-to-br ${service.gradient} p-1 shadow-2xl w-32 h-32`}>
                              <div className="w-full h-full bg-[#0a1628] rounded-2xl p-4 flex items-center justify-center">
                                <Image
                                  src={service.logo}
                                  alt={`${service.title} service icon`}
                                  width={80}
                                  height={80}
                                  className="object-contain"
                                  priority
                                  quality={85}
                                />
                              </div>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent uppercase tracking-wider">
                            {service.title}
                          </h3>

                          <p className="text-gray-300 text-center leading-relaxed mb-6 flex-1 text-sm">
                            {service.description}
                          </p>

                          <Link 
                            href={`/${lang}/services/${service.slug}` as any}
                            prefetch={true}
                            aria-label={`${isArabic ? 'استكشف خدمة' : 'Explore'} ${service.title}`}
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="relative z-20"
                          >
                            <button 
                              className="w-full py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-teal-400 text-black shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-shadow pointer-events-auto"
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                            >
                              {isArabic ? 'استكشف' : 'Explore'}
                            </button>
                          </Link>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Tablet & Desktop: Multi-Card Carousel */}
              <div className="hidden md:flex items-center justify-center gap-6 lg:gap-10 min-h-[420px] lg:min-h-[520px] relative">
                {/* Drag Hint - Desktop */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                  <p className="text-gray-400 text-xs flex items-center gap-2 bg-gray-900/50 px-3 py-1 rounded-full backdrop-blur-sm border border-cyan-400/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    {isArabic ? 'اسحب أو انقر على الأسهم' : 'Drag or use arrows'}
                  </p>
                </div>
                
                <motion.div
                  className="flex items-center justify-center gap-6 lg:gap-10 w-full cursor-grab active:cursor-grabbing select-none"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ cursor: 'grabbing' }}
                >
                  <AnimatePresence initial={false} mode="sync">
                    {visibleCards.map((cardIndex, position) => {
                      const service = services[cardIndex]
                      const isCenter = position === 1

                      return (
                        <motion.article
                          key={`${service.id}-${cardIndex}`}
                          custom={direction}
                          initial="enter"
                          animate={isCenter ? "center" : "side"}
                          exit="exit"
                          variants={cardVariants}
                          whileHover={isCenter && !prefersReducedMotion && !isDragging ? { 
                            scale: 1.05,
                            transition: { duration: 0.3 }
                          } : {}}
                          className={`relative backdrop-blur-xl rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500 will-change-transform pointer-events-none ${
                            isCenter 
                              ? 'w-[280px] lg:w-[400px] h-[420px] lg:h-[500px]' 
                              : 'w-[220px] lg:w-[300px] h-[380px] lg:h-[440px]'
                          }`}
                          style={{
                            background: `linear-gradient(145deg, rgba(10, 22, 40, 0.95), rgba(15, 31, 46, 0.9))`,
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                          aria-hidden={!isCenter}
                        >
                        <div 
                          className={`absolute inset-0 rounded-2xl lg:rounded-3xl pointer-events-none transition-all duration-500 ${
                            isCenter 
                              ? 'border-2 border-cyan-400/60 shadow-2xl shadow-cyan-400/30' 
                              : 'border border-cyan-400/20 shadow-lg shadow-cyan-400/10'
                          }`}
                          aria-hidden="true"
                        />
                        
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl lg:rounded-3xl pointer-events-none transition-opacity duration-500 ${
                            isCenter ? 'opacity-30' : 'opacity-20'
                          }`}
                          aria-hidden="true"
                        />
                        
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
                        
                        <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                          <motion.div 
                            className="mb-4 lg:mb-6 flex justify-center"
                            animate={isCenter && !prefersReducedMotion ? { y: [0, -5, 0] } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <div className={`relative rounded-xl lg:rounded-2xl bg-gradient-to-br ${service.gradient} p-1 shadow-2xl transition-all duration-500 ${
                              isCenter ? 'w-28 lg:w-36 h-28 lg:h-36 shadow-cyan-400/40' : 'w-20 lg:w-28 h-20 lg:h-28'
                            }`}>
                              <div className="w-full h-full bg-[#0a1628] rounded-xl lg:rounded-2xl p-3 lg:p-4 flex items-center justify-center backdrop-blur-sm">
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

                          <h3 className={`font-bold mb-3 lg:mb-4 text-center bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent uppercase tracking-wider transition-all duration-500 ${
                            isCenter ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
                          }`}>
                            {service.title}
                          </h3>

                          <p className={`text-gray-300 text-center leading-relaxed mb-4 lg:mb-6 flex-1 transition-all duration-500 ${
                            isCenter ? 'text-sm lg:text-base opacity-100' : 'text-xs lg:text-sm opacity-70'
                          }`}>
                            {service.description}
                          </p>

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
                                onClick={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                                className="relative z-20"
                              >
                                <motion.button 
                                  className="w-full py-3 lg:py-4 rounded-full text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-cyan-400 to-teal-400 text-black shadow-lg shadow-cyan-400/30 will-change-transform pointer-events-auto"
                                  whileHover={!prefersReducedMotion ? { 
                                    scale: 1.05,
                                    boxShadow: '0 20px 40px rgba(34, 211, 238, 0.4)'
                                  } : {}}
                                  whileTap={{ scale: 0.98 }}
                                  type="button"
                                  onPointerDown={(e) => e.stopPropagation()}
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
                </motion.div>
              </div>
            </div>

            {/* Pagination Dots - Responsive sizing */}
            <nav 
              className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8"
              aria-label={isArabic ? 'تنقل الشرائح' : 'Slide navigation'}
            >
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-500 rounded-full will-change-transform ${
                    index === activeIndex 
                      ? 'w-10 md:w-14 h-2.5 md:h-3.5 bg-gradient-to-r from-cyan-400 to-teal-400 shadow-lg shadow-cyan-400/50' 
                      : 'w-2.5 md:w-3.5 h-2.5 md:h-3.5 bg-gray-600/60 hover:bg-cyan-400/60 hover:scale-125'
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
