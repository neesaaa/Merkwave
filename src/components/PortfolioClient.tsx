'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, ArrowRight, Building2 } from 'lucide-react'
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/content/dictionary";
import { ProjectsList } from '@/components/ProjectsList';

interface PortfolioClientProps {
  dict: Dictionary;
  locale: Locale;
}

export default function PortfolioClient({ dict, locale }: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const isArabic = locale === 'ar';

  // Category filters based on database enum
  const filters = [
    { key: 'all', labelEn: 'All Projects', labelAr: 'جميع المشاريع' },
    { key: 'WEB_DEVELOPMENT', labelEn: 'Web Development', labelAr: 'تطوير المواقع' },
    { key: 'MOBILE_DEVELOPMENT', labelEn: 'Mobile Apps', labelAr: 'تطبيقات الجوال' },
    { key: 'DESKTOP_APPLICATION', labelEn: 'Desktop Apps', labelAr: 'تطبيقات سطح المكتب' },
    { key: 'DIGITAL_MARKETING', labelEn: 'Digital Marketing', labelAr: 'التسويق الرقمي' },
    { key: 'BRANDING', labelEn: 'Branding', labelAr: 'الهوية التجارية' },
    { key: 'ECOMMERCE', labelEn: 'E-Commerce', labelAr: 'التجارة الإلكترونية' },
    { key: 'SEO', labelEn: 'SEO', labelAr: 'تحسين محركات البحث' },
    { key: 'SOCIAL_MEDIA', labelEn: 'Social Media', labelAr: 'وسائل التواصل' },
    { key: 'MEDIA_PRODUCTION', labelEn: 'Media Production', labelAr: 'الإنتاج الإعلامي' },
    { key: 'PHOTOGRAPHY', labelEn: 'Photography', labelAr: 'التصوير الفوتوغرافي' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2027] to-[#203a43] ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Navigation Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href={`/${locale}`} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
          <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 via-orange-500/15 to-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-400/15 via-teal-500/20 to-blue-600/15 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                {dict.pages?.portfolio?.title ?? dict.navigation.portfolio}
              </span>
            </h1>
            <p className="text-gray-200 text-xl max-w-4xl mx-auto leading-relaxed">
              {dict.pages?.portfolio?.body || (isArabic ? 'استكشف مشاريعنا المتنوعة عبر مختلف التقنيات والصناعات.' : 'Explore our diverse portfolio of successful projects across different technologies and industries.')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/25'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                }`}
              >
                {isArabic ? filter.labelAr : filter.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Projects List Component with custom styling wrapper */}
          <div className="projects-grid-wrapper">
            <ProjectsList locale={locale} categoryFilter={activeFilter} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                {isArabic ? 'هل أنت مستعد لبدء مشروع؟' : 'Ready To Start A Project?'}
              </span>
            </h2>
            <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic ? 'رؤيتك، خبرتنا. دعنا نصنع شيئًا رائعًا معًا.' : 'Your vision, our expertise. Let\'s create something remarkable together.'}
            </p>
            <Link href={`/${locale}/contact`}>
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300">
                {isArabic ? 'احصل على عرض سعر' : 'Get a Quote'}
                <ArrowRight className={`${isArabic ? 'mr-2 rotate-180' : 'ml-2'} w-5 h-5`} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Styles for ProjectsList to match design */}
      <style jsx global>{`
        .projects-grid-wrapper .grid {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        
        .projects-grid-wrapper article {
          background: rgba(10, 22, 40, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(156, 163, 175, 0.4);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.5s;
        }
        
        .projects-grid-wrapper article:hover {
          border-color: rgba(250, 204, 21, 0.6);
          background: rgba(10, 22, 40, 0.8);
          box-shadow: 0 20px 25px -5px rgba(250, 204, 21, 0.1);
        }
        
        .projects-grid-wrapper article h2 {
          color: white;
          transition: color 0.3s;
        }
        
        .projects-grid-wrapper article:hover h2 {
          color: rgb(250, 204, 21);
        }
        
        .projects-grid-wrapper article p {
          color: rgb(156, 163, 175);
        }
        
        .projects-grid-wrapper article a {
          color: rgb(34, 211, 238);
        }
        
        .projects-grid-wrapper article a:hover {
          color: rgb(6, 182, 212);
        }
        
        .projects-grid-wrapper .animate-spin {
          border-color: rgb(34, 211, 238);
        }
        
        .projects-grid-wrapper .text-slate-600,
        .projects-grid-wrapper .text-slate-700 {
          color: rgb(209, 213, 219);
        }
      `}</style>
    </div>
  )
}
