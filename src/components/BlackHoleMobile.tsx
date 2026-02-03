"use client";
import { motion } from "framer-motion";

const COLORS = ["#02F7FF", "#00FF88", "#FFD700", "#FF4D4D", "#9B5CFF"];

export default function BlackHoleMobile({ lang = "ar" }: { lang?: string }) {
  return (
    <div className="relative w-full h-[100dvh] bg-[#0B192A] overflow-hidden flex items-center justify-center">
      {/* COLORFUL FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => {
          const color = COLORS[i % COLORS.length];
          return (
            <motion.span
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 12px ${color}`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* GLOW RING */}
      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(2,247,255,0.25), transparent 65%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* CTA BUTTON */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: [1, 1.08, 1],
          boxShadow: [
            "0 0 20px #02F7FF",
            "0 0 40px #FF4D4D",
            "0 0 20px #9B5CFF",
          ],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          z-10 px-8 py-4 rounded-full 
          font-bold text-white text-lg
          bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600
          border border-white/30 cursor-pointer
        "
        onClick={() => {
          const formSection = document.getElementById("contact-form");
          if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {lang === "ar" ? "اضغط وابدأ مشروعك" : "Click and Start Your Project"}
      </motion.div>
    </div>
  );
}
