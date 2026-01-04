'use client'

import Link from 'next/link'
import { Lightbulb, TrendingUp, Users } from 'lucide-react'
import { motion } from "framer-motion";


interface WhyMerkwaveSectionProps {
  dict: any;
  lang: string;
}

export default function WhyMerkwaveSection({ dict, lang }: WhyMerkwaveSectionProps) {
  const isArabic = lang === 'ar';

  const features = [
    {
      id: 1,
      icon: Lightbulb,
      title: isArabic ? 'إبداع مبتكر' : 'Creative Innovation',
      gradient: "from-rose-400 to-orange-400",
      ringGradient: "from-cyan-400/25 to-teal-400/25"
    },
    {
      id: 2,
      icon: TrendingUp,
      title: isArabic ? 'نمو مستدام' : 'Sustainable Growth',
      gradient: "from-teal-400 to-emerald-500",
      ringGradient: "from-cyan-400/25 to-teal-400/25"
    },
    {
      id: 3,
      icon: Users,
      title: isArabic ? 'فريق متميز' : 'Expert Team',
      gradient: "from-sky-500 to-indigo-700",
      ringGradient: "from-cyan-400/25 to-teal-400/25"
    }
  ]

  return (
    <section 
      className="relative py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Why.png')"
      }}
    >
      {/* Dark Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Gradient Orbs Background */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 via-teal-500/15 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-teal-400/15 via-cyan-500/20 to-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-400/15 via-teal-500/25 to-blue-600/15 rounded-full blur-2xl"></div>
      </div>

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center">
          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              {dict.about.title}
            </span>
          </h2>

          {/* Subheading */}
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8 drop-shadow-lg">
            {isArabic ? 'شريكك في النجاح الرقمي' : 'Your Partner in Digital Success'}
          </h3>

          {/* Philosophy Paragraph */}
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-white text-lg leading-relaxed drop-shadow-lg">
              {dict.about.body}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-4xl mx-auto">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon
              const isCenter = idx === 1
              
              return (
                <motion.div
                  key={feature.id}
                  className="flex flex-col items-center group cursor-pointer"
                    animate={{
                      y: ["0%", "-5%", "0%"], // move up then down
                    }}
                    transition={{
                      duration: 2,          // total animation duration
                      repeat: Infinity,     // loop forever
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: idx * 0.2,   // stagger effect if you have multiple cards
                    }}
                >
                  {/* Feature Circle - gradient chip with subtle ring and glow */}
                  <div className="relative mb-4">
                    {/* Ambient shadow */}
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${isCenter ? 'w-28 h-5' : 'w-24 h-4'} rounded-full bg-black/40 blur-lg opacity-60`}></div>
                    {/* Gradient ring */}
                    <div className={`${isCenter ? 'w-24 h-24 lg:w-32 lg:h-32' : 'w-24 h-24 lg:w-28 lg:h-28'} rounded-full p-[3px] bg-gradient-to-br ${feature.ringGradient} shadow-[0_10px_30px_rgba(0,0,0,0.35)] group-hover:scale-110 transition-transform duration-300`}> 
                      {/* Inner gradient fill */}
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center relative`}> 
                        {/* Soft top highlight */}
                        <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        <IconComponent className={`${isCenter ? 'w-14 h-14' : 'w-12 h-12'} text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Feature Title */}
                  <h4 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h4>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <Link href={`/${lang}/services`}>
              <button className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-cyan-400 to-teal-400  font-bold text-xl rounded-full shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105">
                {isArabic ? 'استكشف خدماتنا' : 'Explore Our Services'}
              </button>
            </Link>
          </div>

          {/* Footer Philosophy Text */}
          <div className="max-w-3xl mx-auto">
            <p className="text-white/80 text-sm leading-relaxed drop-shadow-lg">
              {isArabic 
                ? 'نحن نؤمن بأن النجاح الرقمي يبدأ بفهم عميق لأهدافك واحتياجاتك الفريدة'
                : 'We believe that digital success starts with a deep understanding of your unique goals and needs'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
