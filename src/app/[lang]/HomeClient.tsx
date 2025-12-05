"use client"; // CRITICAL: Marks this file as a Client Component

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import WaveServicesSection from "../../components/WaveServicesSection";
import WhyMerkwaveSection from "../../components/WhyMerkwaveSection";
import BrandPartnersSection from "../../components/BrandPartnersSection";
import ClientTestimonials from "../../components/ClientTestimonials";

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

      {/* CTA Section (Localized) */}
      <section 
        className={`py-20 bg-gradient-to-r from-cyan-900/80 via-cyan-800/60 to-cyan-900/80 text-white text-center mx-4 md:mx-8 rounded-3xl backdrop-blur-sm border border-cyan-400/20 shadow-2xl flex items-center justify-center`}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-0">
            {dict.home.heroTitle}
          </h2>
          <p className="mb-0 max-w-2xl text-center">
            {dict.home.heroSubtitle}
          </p>
          <Link href={`/${lang}/contact`} className="inline-block mt-4">
            <motion.div 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full cursor-pointer mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <div className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center p-2 ${isArabic ? 'ml-4 mr-0' : 'mr-4'}`}>
              <svg
                viewBox="0 0 100 100"
                className="w-8 h-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="25" cy="25" r="20" fill="#1B4F72" opacity="0.9" />
                <circle cx="75" cy="25" r="20" fill="#E74C3C" opacity="0.9" />
                <circle cx="25" cy="75" r="20" fill="#F1C40F" opacity="0.9" />
                <circle cx="75" cy="75" r="20" fill="#16A085" opacity="0.9" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">
              {dict.home.ctaButton}
            </span>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Testimonials (Localized) */}
      <section 
        className="py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Our clients (1)_page-0001.jpg')" }}
      >
        {/* Light overlay for better text readability while keeping background clear */}
        <div className="absolute inset-0 bg-black/30" />
        
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${textDirClass} relative z-10`} dir={isArabic ? 'rtl' : 'ltr'}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
              {dict.home.clientExperiencesTitle}
            </h2>
            <p className="text-white max-w-2xl mx-auto text-lg font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
              {dict.home.clientExperiencesSubtitle}
            </p>
          </motion.div>

          <ClientTestimonials lang={lang} dict={dict} />
        </div>
      </section>

      {/* Newsletter (Localized) */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${textDirClass}`} dir={isArabic ? 'rtl' : 'ltr'}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Mail className="h-16 w-16 mx-auto mb-6 text-cyan-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {dict.home.newsletterTitle}
            </h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
              {dict.home.newsletterSubtitle}
            </p>

            <div className={`max-w-md mx-auto flex gap-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
              <input
                type="email"
                placeholder={dict.home.emailPlaceholder}
                className="flex-1 px-6 py-4 rounded-lg bg-gray-800 text-white border border-cyan-400/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <button className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-semibold rounded-lg hover:scale-105 transition-all duration-300">
                {dict.home.activateButton}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
     
    </div>
  );
}
