'use client'

import Link from 'next/link'
import { ArrowRight, Building2, Users, Briefcase, TrendingUp } from 'lucide-react'

interface OurClientsSectionProps {
  dict: any;
  lang: string;
}

export default function OurClientsSection({ dict, lang }: OurClientsSectionProps) {
  const isArabic = lang === 'ar';

  const stats = [
    {
      icon: Briefcase,
      number: "50+",
      label: isArabic ? 'مشروع منجز' : 'Completed Projects',
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      number: "25+",
      label: isArabic ? 'عميل سعيد' : 'Happy Clients',
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Building2,
      number: "8+",
      label: isArabic ? 'قطاعات متنوعة' : 'Industries Served',
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: TrendingUp,
      number: "100%",
      label: isArabic ? 'رضا العملاء' : 'Client Satisfaction',
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const clients = [
    { name: "1ON CORE", industry: isArabic ? "التكنولوجيا" : "Technology" },
    { name: "Boslat", industry: isArabic ? "التجارة الإلكترونية" : "E-commerce" },
    { name: "Makdouz", industry: isArabic ? "الأغذية والمشروبات" : "Food & Beverage" },
    { name: "One Chemic", industry: isArabic ? "الكيماويات" : "Chemicals" },
    { name: "Saudi-Fit", industry: isArabic ? "اللياقة البدنية" : "Fitness" },
    { name: "Shemokh", industry: isArabic ? "الخدمات" : "Services" },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 via-cyan-500/10 to-teal-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tr from-purple-400/10 via-indigo-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`mb-16`} dir={isArabic ? 'rtl' : 'ltr'}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              {isArabic ? 'عملاؤنا' : 'OUR CLIENTS'}
            </span>
          </h2>
          <p className="text-gray-200 text-xl max-w-3xl mx-auto mb-6 text-center">
            {isArabic 
              ? 'موثوق به من قبل شركات مبتكرة عبر قطاعات متنوعة'
              : 'Trusted by innovative companies across diverse industries'}
          </p>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto text-center">
            {isArabic 
              ? 'نحن فخورون بالعمل مع شركات تفكر في المستقبل وتقدر الجودة والابتكار والنتائج'
              : 'We\'re proud to work with forward-thinking businesses that value quality, innovation, and results.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="relative bg-[#0a1628]/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-6 hover:border-cyan-400/60 hover:bg-[#0a1628]/80 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-400/10">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-16">
          {clients.map((client, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative bg-[#0a1628]/40 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-8 hover:border-cyan-400/60 hover:bg-[#0a1628]/70 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-400/10 group-hover:scale-105">
                
                {/* Client Logo Placeholder */}
                <div className="flex items-center justify-center h-20 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600/30 to-gray-700/30 rounded-xl flex items-center justify-center group-hover:from-cyan-400/20 group-hover:to-blue-400/20 transition-all duration-300">
                    <Building2 className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                </div>

                {/* Client Info */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {client.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {client.industry}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-8">
            <p className="text-gray-200 text-lg mb-6">
              {isArabic ? 'هل أنت مستعد للانضمام إلى عائلة عملائنا الناجحين؟' : 'Ready to join our family of successful clients?'}
            </p>
            <Link href={`/${lang}/portfolio`}>
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-105">
                {isArabic ? 'عرض جميع المشاريع' : 'View All Projects'}
                <ArrowRight className={`ml-2 w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
