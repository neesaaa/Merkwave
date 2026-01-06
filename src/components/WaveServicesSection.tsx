"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Easing,
  PanInfo 
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  logo: { src: string; classes: string };
}

export default function WaveServicesSection({
  dict,
  lang,
}: WaveServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isArabic = lang === "ar";

  // Service logos mapping - optimized paths
  const serviceLogos = useMemo(
    () => [
      {
        src: "/digital.gif",
        classes: "w-32 h-32  object-contain",
      },
      {
        src: "/solutions.gif",
        classes: "w-32 h-32  object-contain",
      },
      {
        src: "/Media.gif",
        classes:
          "w-32 h-32 lg:w-48 lg:h-48 shadow-[0_0_30px_10px_rgba(0,213,197,0.4)] object-contain rounded-full",
      },
      {
        src: "/branding.gif",
        classes:
          "w-32 h-32  object-contain rounded-full shadow-[0_0_30px_10px_rgba(0,213,197,0.4)]",
      },
    ],
    []
  );

  // Memoize services array to prevent unnecessary recalculations
  const services = useMemo(
    () =>
      (dict.services.items as ServiceItem[]).map(
        (item, index): Service => ({
          id: index + 1,
          title: item.name,
          description: item.description,
          gradient: [
            "from-purple-500/20 via-pink-500/20 to-cyan-400/30",
            "from-blue-500/20 via-purple-500/20 to-pink-500/30",
            "from-green-500/20 via-blue-500/20 to-purple-500/30",
            "from-cyan-400/20 via-teal-500/20 to-emerald-500/30",
            "from-orange-500/20 via-red-500/20 to-pink-500/30",
            "from-indigo-500/20 via-purple-500/20 to-cyan-400/30",
          ][index % 6],
          slug:
            typeof item.slug === "string" ? item.slug : String(item.slug ?? ""),
          logo: serviceLogos[index % serviceLogos.length],
        })
      ),
    [dict.services.items, serviceLogos]
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  }, [services.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

const handleDragEnd = useCallback(
  (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) < swipeThreshold) return;

    const isSwipeRight = info.offset.x > 0;

    if (isArabic) {
            isSwipeRight ? prevSlide() : nextSlide();

    } else {
      isSwipeRight ? prevSlide() : nextSlide();
    }
  },
  [isArabic, nextSlide, prevSlide]
);



  const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);


useEffect(() => {
  if (services.length === 0) return;

  const interval = setInterval(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, 6000);

  return () => clearInterval(interval);
}, [services.length, activeIndex]);


useEffect(() => {
  if (!isDragging) return;

  const timeout = setTimeout(() => {
    setIsDragging(false);
  }, 1500); // iOS safety reset

  return () => clearTimeout(timeout);
}, [isDragging]);











  const visibleCards = useMemo(() => {
    const prevIndex = (activeIndex - 1 + services.length) % services.length;
    const nextIndex = (activeIndex + 1) % services.length;
    return [prevIndex, activeIndex, nextIndex];
  }, [activeIndex, services.length]);

    const cardVariants = useMemo(
    () => ({
      enter: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 300 : -300,
        scale: 0.5,
        rotateY: direction > 0 ? -60 : 60,
        rotateZ: direction > 0 ? -20 : 20,
      }),
      center: {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut" as Easing,
        },
      },
      side: {
        opacity: 0.6,
        x: 0,
        scale: 0.75,
        rotateY: 0,
        rotateZ: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut" as Easing,
        },
      },
      exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -300 : 300,
        scale: 0.5,
        rotateY: direction > 0 ? 60 : -60,
        rotateZ: direction > 0 ? 20 : -20,
        transition: {
          duration: 0.1,
        },
      }),
    }),
    [],
  )

  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 bg-[#0B192A] overflow-hidden"
      aria-labelledby="services-heading"
      onMouseEnter={!isTouchDevice ? () => setIsPaused(true) : undefined}
      onMouseLeave={!isTouchDevice ? () => setIsPaused(false) : undefined}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="
          absolute inset-0 pt-50 flex items-center justify-center 
          pointer-events-none z-0
        "
        aria-hidden="true"
      >
        <Image
          src="/Ellipse12.webp"
          alt=""
          width={400}
          height={400}
          className=" object-contain w-[1920px]  h-[auto]"
        />
      </div>

      <div className="container  mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 tracking-tight px-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent uppercase">
              {isArabic ? "موجاتنا من الخدمات" : "Our Waves of Service"}
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            {isArabic
              ? "في ميركويف، نحن لا نركب الموجة فقط، نحن نصنعها. استكشف خدماتنا المتخصصة المصممة لدفع عملك إلى الأمام."
              : "At MERKWAVE, we don't just ride the currents; we create them. Explore our specialized services designed to propel your business forward."}
          </p>
        </motion.div>

        <div className="relative bg-[#0B192A] max-w-full md:max-w-5xl lg:max-w-[1400px] mx-auto">
          <div className="relative rounded-2xl md:rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#0a1628]/40 via-[#0f1f2e]/30 to-[#0a1628]/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 shadow-[0_0_26px_0_rgba(1,225,231,1)] ">
            <button
              onClick={isArabic ? nextSlide : prevSlide}
              className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-15 lg:h-15 bg-[#01B4BA] hover:to-teal-400/40 backdrop-blur-xl rounded-full items-center justify-center transition-all duration-500 hover:scale-110 border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 will-change-transform"
              aria-label={isArabic ? "الشريحة السابقة" : "Previous slide"}
              type="button"
            >
              <ChevronLeft
                className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-100"
                strokeWidth={3}
                aria-hidden="true"
              />
            </button>

            <button
              onClick={isArabic ? prevSlide : nextSlide}
              className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-15 lg:h-15 bg-[#01B4BA] hover:to-teal-400/40 backdrop-blur-xl rounded-full items-center justify-center transition-all duration-500 hover:scale-110 border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 will-change-transform"
              aria-label={isArabic ? "الشريحة التالية" : "Next slide"}
              type="button"
            >
              <ChevronRight
                className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-100"
                strokeWidth={3}
                aria-hidden="true"
              />
            </button>

            <div
              className="relative overflow-visible py-8 md:py-12 lg:py-16 px-2 md:px-4"
              role="region"
              aria-live="polite"
            >
              <div className="md:hidden text-center mb-4">
                <p className="text-gray-400 text-xs flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  {isArabic ? "اسحب للتصفح" : "Swipe to browse"}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </p>
              </div>

              <div className="md:hidden">
                <AnimatePresence initial={false} mode="wait">
                  {services.map((service, index) => {
                    if (index !== activeIndex) return null;

                    return (
                      <motion.article
                        key={activeIndex}
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 1.5,
                            ease: "easeOut",
                          },
                        }}
                        exit={{
                          opacity: 0,
                          x: direction > 0 ? -100 : 100,
                          transition: {
                            duration: 0.4,
                            ease: "easeInOut",
                          },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ cursor: "grabbing", scale: 0.98 }}
                        className="relative backdrop-blur-xl rounded-xl overflow-hidden w-full max-w-xs mx-auto cursor-grab active:cursor-grabbing"
                        style={{
                          background: `linear-gradient(145deg, rgba(10, 22, 40, 0.95), rgba(15, 31, 46, 0.9))`,
                          minHeight: "420px",
                          perspective: 1500,
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-xl  border-2 border-cyan-600 pointer-events-none"
                          aria-hidden="true"
                        />
                      

                        <div className="relative  z-10 p-4 py-16 sm:p-5 h-full flex flex-col items-center justify-center gap-2">
                          <div className="mb-4 sm:mb-6 flex justify-center">
                            <div
                              className={`w-full h-full relative rounded-lg sm:rounded-xl   p-1 shadow-2xl  `}
                            >
                              <div className="w-full h-full bg-[#0a1628] rounded-lg  p-2 sm:p-3 flex items-center justify-center">
                                <Image
                                  src={service.logo.src || "/placeholder.svg"}
                                  alt={`${service.title} service icon`}
                                  width={100}
                                  height={100}
                                  className={service.logo.classes}
                                />
                              </div>
                            </div>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2 sm:mb-3 text-center line-clamp-2">
                            {service.title}
                          </h3>

                          <p className="text-gray-300 mb-12 md:mb-4 text-xs sm:text-sm leading-relaxed text-center flex-grow line-clamp-3 sm:line-clamp-none  ">
                            {service.description}
                          </p>
                          
                          <Link
                            href={{ pathname: `/${lang}/services/${service.slug}` }}
                            className="w-full px-3  sm:px-4 py-2 sm:py-3  text-xs sm:text-sm md:text-base leading-normal font-semibold text-center bg-gradient-to-r from-[#FFF200] to-[#FFD700] text-[#FF1A1A]!  rounded-lg hover:from-red-400 hover:to-red-700 hover:text-yellow-200! transition-all duration-300"
                          >
                            {isArabic ? "استكشف" : "Explore"}
                          </Link>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="hidden md:flex items-center justify-center gap-6 lg:gap-10 min-h-[420px] lg:min-h-[520px] relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                  <p className="text-gray-400 text-xs flex items-center gap-2 bg-gray-900/50 px-3 py-1 rounded-full backdrop-blur-sm border border-cyan-400/20">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                    {isArabic
                      ? "اسحب أو انقر على الأسهم"
                      : "Drag or use arrows"}
                  </p>
                </div>

                <motion.div
                  className="flex items-center justify-center gap-6 lg:gap-10 w-full cursor-grab active:cursor-grabbing select-none"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  style={{ perspective: 1200 }}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {visibleCards.map((cardIndex, position) => {
                      const service = services[cardIndex];
                      const isCenter = position === 1;

                      return (
                        <motion.article
                          key={`card-${cardIndex}`}
                          custom={direction}
                          initial="enter"
                          animate={isCenter ? "center" : "side"}
                          exit="exit"
                          variants={cardVariants}
                          className={`relative backdrop-blur-xl rounded-2xl shadow-[0_0px_26px_0_rgba(0,213,197,0.5)] lg:rounded-3xl overflow-hidden will-change-transform flex-shrink-0 ${
                            isCenter
                              ? "w-[260px] md:w-[250px] lg:w-[300px] xl:w-[400px] h-[420px] lg:h-[500px]"
                              : "w-[200px] md:w-[200px] lg:w-[250px] xl:w-[300px] h-[380px] lg:h-[440px]"
                          }`}
                          aria-hidden={!isCenter}
                        >
                          <div
                            className={`absolute inset-0 rounded-2xl lg:rounded-3xl pointer-events-none `}
                            aria-hidden="true"
                          />

                          {isCenter && !prefersReducedMotion && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 2,
                                ease: "easeInOut",
                              }}
                              aria-hidden="true"
                            />
                          )}

                          <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col ">
                            <div className=" lg:mb-6 flex justify-center w-full  ">
                              <Image
                                src={service.logo.src || "/placeholder.svg"}
                                alt={`${service.title} service icon`}
                                width={isCenter ? 90 : 70}
                                height={isCenter ? 90 : 70}
                                className={service.logo.classes}
                                priority={position === 1}
                                loading={position === 1 ? "eager" : "lazy"}
                              />
                            </div>

                            <h3
                              className={`font-bold pt-4 mb-3 lg:mb-4 text-center text-cyan-400  uppercase tracking-wider ${
                                isCenter
                                  ? "text-xl lg:text-2xl"
                                  : "text-lg lg:text-xl"
                              }`}
                            >
                              {service.title}
                            </h3>

                            <p
                              className={`text-gray-300 text-center leading-relaxed mb-4 lg:mb-6 flex-1 ${
                                isCenter
                                  ? "text-sm lg:text-base opacity-100"
                                  : "text-xs lg:text-sm opacity-70"
                              }`}
                            >
                              {service.description}
                            </p>

                            {isCenter && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className=""
                              >
                                <Link
                                  href={{ pathname: `/${lang}/services/${service.slug}` }}
                                  prefetch={true}
                                  aria-label={`${
                                    isArabic ? "استكشف خدمة" : "Explore"
                                  } ${service.title}`}
                                  onClick={(e) => e.stopPropagation()}
                                  onPointerDown={(e) => e.stopPropagation()}
                                  className="relative z-20"
                                >
                                  <button
                                    className="w-full py-3 lg:py-4  rounded-full text-xs lg:text-md font-bold  tracking-wider bg-gradient-to-r from-[#FFF200] to-[#FFD700] text-[#FF1A1A]   pointer-events-auto"
                                    type="button"
                                    onPointerDown={(e) => e.stopPropagation()}
                                  >
                                    {isArabic ? "استكشف" : "Explore"}
                                  </button>
                                </Link>
                              </motion.div>
                            )}
                          </div>
                        </motion.article>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            <nav
              className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8"
              aria-label={isArabic ? "تنقل الشرائح" : "Slide navigation"}
            >
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full will-change-transform ${
                    index === activeIndex
                      ? "w-10 md:w-14 h-2.5 md:h-3.5 bg-[#FFE100]   shadow-[0_10px_20px_2px_rgba(246,255,0,0.2)]"
                      : "w-2.5 md:w-3.5 h-2.5 md:h-3.5 bg-[#897902] hover:bg-red-400/60"
                  }`}
                  whileHover={{ scale: index === activeIndex ? 1.05 : 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`${
                    isArabic ? "انتقل إلى الشريحة" : "Go to slide"
                  } ${index + 1}: ${service.title}`}
                  aria-current={index === activeIndex ? "true" : "false"}
                  type="button"
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
