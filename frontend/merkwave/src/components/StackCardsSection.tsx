"use client";
import { motion, useScroll, useReducedMotion } from "framer-motion";
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

export default function StackCardsSection({
  isArabic = false,
}: StackCardsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // Discrete steps for BOTH mobile and desktop — reduces re-renders from
  // every scroll pixel down to N buckets, improving performance on all devices.
  const totalSteps = 50;
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const step = Math.min(totalSteps - 1, Math.floor(latest * totalSteps));
      setCurrentStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const shiftX = isMobile ? 20 : 40;
  const shiftY = isMobile ? 50 : 100;

  const cards: Card[] = [
    { x: `${0}vw`, y: `${-200 - shiftY}vh`, r: 0 },
    { x: `${120 + shiftX}vw`, y: `${-60 - shiftY}vh`, r: isMobile ? 1 : 2 },
    { x: `${75 + shiftX}vw`, y: `${160 + shiftY}vh`, r: isMobile ? 2 : 4 },
    { x: `${-75 - shiftX}vw`, y: `${160 + shiftY}vh`, r: isMobile ? -2 : -4 },
    { x: `${-120 - shiftX}vw`, y: `${-60 - shiftY}vh`, r: isMobile ? -1 : -2 },
  ];

  // Discrete transform for all devices
  const getTransform = (index: number) => {
    const progress = Math.min(1, Math.max(0, currentStep / (totalSteps - 1)));
    const card = cards[index];
    const scaleValues = [0.95, 0.9, 0.85, 0.8, 0.75];

    const startX = parseFloat(card.x);
    const startY = parseFloat(card.y);

    const x = startX + (0 - startX) * progress;
    const y = startY + (0 - startY) * progress;
    const scale =
      1 - (1 - scaleValues[index]) * Math.max(0, (progress - 0.7) / 0.3);
    const rotate = card.r * (1 - progress);

    return { x: `${x}vw`, y: `${y}vh`, scale, rotate };
  };

  // Heading scale: mirrors original behaviour (desktop → 0.2, mobile → 0.3)
  const headingProgress = Math.min(
    1,
    Math.max(0, currentStep / (totalSteps - 1)),
  );
  const headingScaleTarget = isMobile
    ? 1 - headingProgress * 0.7
    : 1 - headingProgress * 0.8;

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
          animate={{ scale: shouldReduceMotion ? 1 : headingScaleTarget }}
          transition={{ duration: 0.15, ease: "easeOut" }}
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
            const transform = getTransform(i);

            return (
              <motion.div
                key={i}
                style={{
                  zIndex: 10 - i,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                animate={
                  shouldReduceMotion
                    ? { x: 0, y: 0, scale: 1, rotate: 0 }
                    : {
                        x: transform.x,
                        y: transform.y,
                        scale: transform.scale,
                        rotate: transform.rotate,
                      }
                }
                transition={{ duration: 0.15, ease: "easeOut" }}
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
