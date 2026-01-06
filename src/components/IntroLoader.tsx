"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function IntroLoader() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    setIsMobile(window.innerWidth <= 768); // or your breakpoint

    // Scroll to top and auto-hide loader
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="fixed inset-0 w-full h-full z-[9999] flex items-center justify-center overflow-hidden bg-[#0B192A]"
    >
      <div className="fixed inset-0 overflow-hidden z-0">
        <motion.img
          src={isMobile ? "/mobile-01.webp" : "/circled-01.webp"}
          alt="Loading"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 * 2 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? "min-w-[300%] min-h-[300%]" : "min-w-[300%] min-h-[300%]"} object-cover`}
        />

        <motion.img
          src={"/transparent_logo.png"}
          alt="Logo"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 * 2 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain w-220"
        />
      </div>
    </motion.div>
  );
}
