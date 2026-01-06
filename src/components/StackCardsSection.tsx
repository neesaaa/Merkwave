"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef,useState,useEffect } from "react";
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const [showCards, setShowCards] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) { // adjust threshold as needed
      setShowCards(true);
    } else {
      setShowCards(false); // optional: hide if scroll back up
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const shiftX = 40; // vw
const shiftY = 100; // vh

const cards: Card[] = [
  { x: `${0 }vw`,    y: `${-200 - shiftY}vh`, r: 0 },    // top
  { x: `${120 + shiftX}vw`,  y: `${-60 - shiftY}vh`,  r: 2 },   // top right
  { x: `${75 + shiftX}vw`,   y: `${160 + shiftY}vh`,  r: 4 },    // bottom right
  { x: `${-75 - shiftX}vw`,  y: `${160 + shiftY}vh`,  r: -4 },   // bottom left
  { x: `${-120 - shiftX}vw`, y: `${-60 - shiftY}vh`,  r: -2 },  // top left
];


  const createTransforms = (card: Card, scaleRange: [number, number]) => ({
    x: useTransform(scrollYProgress, [0, 1], [card.x, "0vw"]),
    y: useTransform(scrollYProgress, [0, 1], [card.y, "0vh"]),
    scale: useTransform(scrollYProgress, [0.7, 1], scaleRange),
  });

  const transforms = [
    createTransforms(cards[0], [1, 0.95]),
    createTransforms(cards[1], [1, 0.9]),
    createTransforms(cards[2], [1, 0.85]),
    createTransforms(cards[3], [1, 0.8]),
    createTransforms(cards[4], [1, 0.75]), 
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[300vh] bg-[#0B192A] overflow-clip ${isArabic ? "direction-rtl" : ""}`}
    >
      {/* Section Heading */}
      <div className="sticky top-0 h-screen w-full z-10 pointer-events-none flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center justify-center gap-2"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 0.2]),
          }}
        >
          <motion.h3 className="text-white text-4xl md:text-8xl font-bold whitespace-nowrap">
            {isArabic ? "بثقة أكثر من مليون عميل" : "My Section Heading"}
          </motion.h3>
          <motion.p className="text-xl text-center md:text-3xl font-medium">
            نقدم لك أول بنك رقمي سعودي متوافق مع أحكام الشريعة الإسلامية
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Space */}
      <div className="h-[200vh]" />

      {/* Cards Stack */}
      <div className="sticky top-0 h-screen z-20 flex items-center justify-center -mt-[200vh]">
        <div className="relative w-[240px] h-[360px] md:w-[360px] md:h-[480px]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              style={{
                x: transforms[i].x,
                y: transforms[i].y,
                scale: transforms[i].scale,
                rotate: card.r,
                zIndex: 10 - i,
              }}
              className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-400/30 to-blue-600/30 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <Image
                src={`/Why merk! (${i + 1}).webp`}
                alt={`Why merk ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
