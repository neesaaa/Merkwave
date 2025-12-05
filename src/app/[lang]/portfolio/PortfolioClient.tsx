'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface LocalizedComponentProps {
  dict: any
  lang: string
}

interface Project {
  id: number
  slug: string
  titleEn: string
  titleAr: string
  client_id: number | null
  client_name: string
  project_date: string
  category: string
  featured: number
  imageUrl: string
  demoUrl: string
  codeUrl: string | null
}

const categoryColors: Record<string, string> = {
  WEB_DEVELOPMENT: 'bg-cyan-500',
  MOBILE_DEVELOPMENT: 'bg-blue-500',
  DESKTOP_APPLICATION: 'bg-purple-500',
  ECOMMERCE: 'bg-green-500',
  BRANDING: 'bg-pink-500',
  SEO: 'bg-yellow-500',
  SOCIAL_MEDIA: 'bg-orange-500',
  MEDIA_PRODUCTION: 'bg-red-500',
  DIGITAL_MARKETING: 'bg-indigo-500',
  PHOTOGRAPHY: 'bg-teal-500',
}

const categoryLabels: Record<string, { en: string; ar: string }> = {
  ALL: { en: 'All Projects', ar: 'جميع المشاريع' },
  WEB_DEVELOPMENT: { en: 'Web Development', ar: 'تطوير الويب' },
  MOBILE_DEVELOPMENT: { en: 'Mobile Apps', ar: 'تطبيقات الموبايل' },
  DESKTOP_APPLICATION: { en: 'Desktop Apps', ar: 'تطبيقات سطح المكتب' },
  ECOMMERCE: { en: 'E-Commerce', ar: 'التجارة الإلكترونية' },
  BRANDING: { en: 'Branding', ar: 'العلامة التجارية' },
  SEO: { en: 'SEO', ar: 'تحسين محركات البحث' },
  SOCIAL_MEDIA: { en: 'Social Media', ar: 'وسائل التواصل' },
  MEDIA_PRODUCTION: { en: 'Media Production', ar: 'الإنتاج الإعلامي' },
  DIGITAL_MARKETING: { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
  PHOTOGRAPHY: { en: 'Photography', ar: 'التصوير الفوتوغرافي' },
}

export default function PortfolioClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar'
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('https://merkwave.com/api/projects/get_all.php')
        const data = await response.json()
        
        if (data.status === 'success') {
          setProjects(data.data)
          setFilteredProjects(data.data)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'ALL') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory))
    }
  }, [selectedCategory, projects])

  // Get unique categories from projects
  const categories = ['ALL', ...Array.from(new Set(projects.map(p => p.category)))]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Back to Home */}
      <div className="py-6 px-4 max-w-7xl mx-auto">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-300"
        >
          <ArrowLeft className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
          <span>{isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {isArabic ? 'المشاريع' : 'Portfolio'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-200 text-xl max-w-3xl mx-auto"
          >
            {isArabic
              ? 'مشاريعنا المختارة ودراسات الحالة.'
              : 'Our selected projects and case studies.'}
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50'
                    : 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/70 border border-gray-600/30'
                }`}
              >
                {categoryLabels[category]?.[isArabic ? 'ar' : 'en'] || category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-white text-xl py-20">
              {isArabic ? 'جاري التحميل...' : 'Loading...'}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-gray-300 text-xl py-20">
              {isArabic ? 'لا توجد مشاريع في هذه الفئة' : 'No projects in this category'}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-[#0d1b2a] rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 h-full flex flex-col">
                    {/* Project Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={isArabic ? project.titleAr : project.titleEn}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Client Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 rounded-full ${categoryColors[project.category] || 'bg-gray-500'}`} />
                        <span className="text-gray-400 text-sm">{project.client_name}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-cyan-400 mb-3 line-clamp-2 flex-1">
                        {isArabic ? project.titleAr : project.titleEn}
                      </h3>

                      {/* View Project Link */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                        <Link
                          href={`/${lang}/portfolio/projects?slug=${project.slug}`}
                          className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 transition-colors duration-300"
                        >
                          {isArabic ? 'عرض المشروع' : 'View project'}
                          <ExternalLink size={16} />
                        </Link>
                        <span className="text-gray-500 text-sm">
                          {formatDate(project.project_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-2 border-cyan-500/40 rounded-3xl p-12 md:p-16 bg-gradient-to-br from-cyan-900/10 to-teal-900/10 backdrop-blur-sm text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
              {isArabic ? 'هل أنت مستعد لبدء مشروع؟' : 'Ready To Start A Project?'}
            </h2>
            <p className="text-gray-200 text-xl mb-10 max-w-3xl mx-auto">
              {isArabic
                ? 'رؤيتك، خبرتنا. دعنا نصنع شيئًا رائعًا معًا.'
                : "Your vision, our expertise. Let's create something remarkable together."}
            </p>
            <Link href={`/${lang}/contact`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full transition-all duration-300 shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60"
              >
                {isArabic ? 'احصل على عرض أسعار' : 'Get a Quote'}
                <ExternalLink size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
