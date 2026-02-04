"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface Card {
  x: string;
  y: string;
  r: number;
}

interface StackCardsSectionProps {
  isArabic?: boolean;
}

export default function StackCardsSection({ isArabic = false }: StackCardsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const totalSteps = 30; // more steps = smoother
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isMobile) {
        const step = Math.min(totalSteps - 1, Math.floor(latest * totalSteps));
        setCurrentStep(step);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);


  const shiftX = isMobile ? 20 : 40;
  const shiftY = isMobile ? 50 : 100;
  
  const cards: Card[] = [
    { x: `${0}vw`, y: `${-200 - shiftY}vh`, r: 0 },
    { x: `${120 + shiftX}vw`, y: `${-60 - shiftY}vh`, r: isMobile ? 1 : 2 },
    { x: `${75 + shiftX}vw`, y: `${160 + shiftY}vh`, r: isMobile ? 2 : 4 },
    { x: `${-75 - shiftX}vw`, y: `${160 + shiftY}vh`, r: isMobile ? -2 : -4 },
    { x: `${-120 - shiftX}vw`, y: `${-60 - shiftY}vh`, r: isMobile ? -1 : -2 },
  ];

  // Always call all hooks - no conditional hooks!
  const headingScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.3 : 0.2]);

  const x0 = useTransform(scrollYProgress, [0, 1], [cards[0].x, "0vw"]);
  const y0 = useTransform(scrollYProgress, [0, 1], [cards[0].y, "0vh"]);
  const scale0 = useTransform(scrollYProgress, [0.7, 1], [1, 0.95]);

  const x1 = useTransform(scrollYProgress, [0, 1], [cards[1].x, "0vw"]);
  const y1 = useTransform(scrollYProgress, [0, 1], [cards[1].y, "0vh"]);
  const scale1 = useTransform(scrollYProgress, [0.7, 1], [1, 0.9]);

  const x2 = useTransform(scrollYProgress, [0, 1], [cards[2].x, "0vw"]);
  const y2 = useTransform(scrollYProgress, [0, 1], [cards[2].y, "0vh"]);
  const scale2 = useTransform(scrollYProgress, [0.7, 1], [1, 0.85]);

  const x3 = useTransform(scrollYProgress, [0, 1], [cards[3].x, "0vw"]);
  const y3 = useTransform(scrollYProgress, [0, 1], [cards[3].y, "0vh"]);
  const scale3 = useTransform(scrollYProgress, [0.7, 1], [1, 0.8]);

  const x4 = useTransform(scrollYProgress, [0, 1], [cards[4].x, "0vw"]);
  const y4 = useTransform(scrollYProgress, [0, 1], [cards[4].y, "0vh"]);
  const scale4 = useTransform(scrollYProgress, [0.7, 1], [1, 0.75]);

  const transforms = [
    { x: x0, y: y0, scale: scale0 },
    { x: x1, y: y1, scale: scale1 },
    { x: x2, y: y2, scale: scale2 },
    { x: x3, y: y3, scale: scale3 },
    { x: x4, y: y4, scale: scale4 },
  ];

  // Calculate discrete positions for mobile
  const getMobileTransform = (index: number) => {
    const progress = Math.min(1, Math.max(0, currentStep / (totalSteps - 1))); // use currentStep only

    const card = cards[index];
    const scaleValues = [0.95, 0.9, 0.85, 0.8, 0.75];
    
    // Parse the starting position
    const startX = parseFloat(card.x);
    const startY = parseFloat(card.y);
    
    // Interpolate to 0
    const x = startX + (0 - startX) * progress;
    const y = startY + (0 - startY) * progress;
    const scale = 1 - (1 - scaleValues[index]) * Math.max(0, (progress - 0.7) / 0.3);
    const rotate = card.r * (1 - progress);
    
    return { x: `${x}vw`, y: `${y}vh`, scale, rotate };
  };

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[300vh] bg-[#0B192A] overflow-clip ${
        isArabic ? "direction-rtl" : ""
      }`}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      {/* Section Heading */}
      <div className="sticky top-0 h-screen w-full z-10 pointer-events-none flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center justify-center gap-2 px-4"
          style={isMobile ? undefined : { scale: headingScale }}
          animate={isMobile ? { scale: 1 - (currentStep / (totalSteps - 1)) * 0.7 } : undefined}
          transition={isMobile ? { duration: 0.3, ease: "easeOut" } : undefined}
        >
          <h1 className="text-white text-3xl md:text-8xl font-bold text-center w-full leading-[120%]">
            {isArabic ? "شريك واحد" : "One Partner"}
          </h1>
          <p className="text-lg md:text-3xl font-medium text-white/90 text-center max-w-5xl">
            {isArabic
              ? "تحول شامل لأعمالك، ندمج التقنية والهوية والاستراتيجية لهندسة نمو نجاحك"
              : "Total Business Transformation ,We integrate tech, branding, and strategy to engineer your growth"}
          </p>
        </motion.div>
      </div>

      {/* Scroll Space */}
      <div className="h-[200vh]" />

      {/* Cards Stack */}
      <div 
        className="sticky top-0 h-screen z-20 flex items-center justify-center -mt-[200vh]"
        style={{
          transform: "translateZ(0)",
        }}
      >
        <div className="relative w-[220px] h-[330px] md:w-[360px] md:h-[480px]">
          {cards.map((card, i) => {
            const mobileTransform = getMobileTransform(i);
            
            return (
              <motion.div
                key={i}
                // Use style transforms for desktop, animate for mobile
                style={
                  isMobile
                    ? {
                        zIndex: 10 - i,
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }
                    : {
                        x: shouldReduceMotion ? 0 : transforms[i].x,
                        y: shouldReduceMotion ? 0 : transforms[i].y,
                        scale: shouldReduceMotion ? 1 : transforms[i].scale,
                        rotate: shouldReduceMotion ? 0 : card.r,
                        zIndex: 10 - i,
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }
                }
                animate={
                  isMobile
                    ? {
                        x: mobileTransform.x,
                        y: mobileTransform.y,
                        scale: mobileTransform.scale,
                        rotate: mobileTransform.rotate,
                      }
                    : undefined
                }
                transition={
                  isMobile
                    ? { 
                        duration: 0.2, 
                        ease: "easeOut",
                      }
                    : undefined
                }
                className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl"
              >
                <div 
                  className={
                    isMobile 
                      ? "absolute inset-0 bg-cyan-500/15 border border-white/10" 
                      : "absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-white/10"
                  }
                />
                <Image
                  src={`/Why merk! (${i + 1}).webp`}
                  alt={`Why merk ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  quality={isMobile ? 70 : 85}
                  sizes="(max-width: 768px) 220px, 360px"
                  loading={i === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQAAA/9k="
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
