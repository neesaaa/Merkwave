"use client"; // CRITICAL: Marks this file as a Client Component

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import WaveServicesSection from "../../components/WaveServicesSection";
import WhyMerkwaveSection from "../../components/WhyMerkwaveSection";
import BrandPartnersSection from "../../components/BrandPartnersSection";
import ClientTestimonials from "../../components/ClientTestimonials";
import StackCardsSection from "@/components/StackCardsSection";

// --- TYPE DECLARATIONS ---
interface LocalizedComponentProps {
  dict: any; 
  lang: string;
}

export default function LocalizedHomeContent({ dict, lang }: LocalizedComponentProps) {
  
  const isArabic = lang === 'ar';
  const textDirClass = isArabic ? 'text-right' : 'text-left';

  return (
    <div className={`bg-black ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Hero Section */}
      <HeroSection dict={dict} lang={lang} />

      {/* Wave Services Section */}
      <WaveServicesSection dict={dict} lang={lang} />

      {/* Why Merkwave Section */}
      <WhyMerkwaveSection dict={dict} lang={lang} />

      {/* Brand Partners Section */}
      <BrandPartnersSection dict={dict} lang={lang} />

      <StackCardsSection isArabic={lang === "ar"} />



      {/* Testimonials (Localized) */}
      <section 
        className="py-20 relative overflow-hidden bg-cover bg-center bg-[#0B192A]"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-cyan-500/40 rounded-full blur-3xl"></div>
          <div className="absolute top-32 -right-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-teal-400/25 rounded-full blur-3xl"></div>
        </div>
              {/* Light overlay for better text readability while keeping background clear */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${textDirClass} relative z-10`} dir={isArabic ? 'rtl' : 'ltr'}>
          <ClientTestimonials lang={lang} dict={dict} />
        </div>
      </section>

      {/* Newsletter (Localized) */}
      <section className="py-20 bg-gradient-to-r max-w-screen from-gray-900 via-black to-gray-900">
        
        <div className={`container mx-auto  px-4 sm:px-6 lg:px-8 ${textDirClass}`} dir={isArabic ? 'rtl' : 'ltr'}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center flex flex-col items-center justify-center w-full"
          >
            <Mail className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6">
              {dict.home.newsletterTitle}
            </h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
              {dict.home.newsletterSubtitle}
            </p>

            <div
              className={`w-full max-w-md sm:max-w-lg mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4`}
            >
              <input
                type="email"
                placeholder={dict.home.emailPlaceholder}
                className="flex-1 px-4 py-4 rounded-lg bg-gray-800 text-white border border-cyan-400/30 shadow-[0_0px_26px_0_rgba(0,213,197,0.5)] focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <button className="px-4 py-4 bg-gradient-to-r from-orange-400 to-red-700 text-black font-semibold rounded-lg hover:scale-105 transition-all duration-300">
                {dict.home.activateButton}
              </button>
            </div>

          </motion.div>
        </div>
      </section>
     
    </div>
  );
}
