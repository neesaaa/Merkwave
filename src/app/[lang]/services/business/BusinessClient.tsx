"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search, Share2, Edit, Mail, BarChart3, Target, TrendingUp, Users } from "lucide-react";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

export default function BusinessClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';

  const digitalMarketingServices = [
    {
      icon: Search,
      title: isArabic ? 'تحسين SEO وSEM' : 'SEO & SEM Optimization',
      description: isArabic ? 'عزز ظهورك وادفع حركة المرور العضوية من خلال خبرة تحسين محركات البحث والتسويق.' : 'Boost your visibility and drive organic traffic with expert search engine optimization and marketing.',
      features: [
        isArabic ? 'البحث وتحليل الكلمات المفتاحية' : 'Keyword Research & Analysis',
        isArabic ? 'تحسين SEO على الصفحة' : 'On-Page SEO Optimization',
        isArabic ? 'تدقيق SEO التقني' : 'Technical SEO Audits',
      ],
      color: 'cyan',
    },
    {
      icon: Share2,
      title: isArabic ? 'إدارة وسائل التواصل الاجتماعي الاستراتيجية' : 'Strategic Social Media Management',
      description: isArabic ? 'بناء مشاركة مجتمعية قوية وولاء للعلامة التجارية عبر منصات التواصل الاجتماعي الرئيسية.' : 'Build strong community engagement and brand loyalty across major social platforms.',
      features: [
        isArabic ? 'تطوير استراتيجية المحتوى' : 'Content Strategy Development',
        isArabic ? 'إدارة متعددة المنصات' : 'Multi-Platform Management',
        isArabic ? 'مشاركة المجتمع' : 'Community Engagement',
      ],
      color: 'pink',
    },
    {
      icon: Edit,
      title: isArabic ? 'إنشاء محتوى جذاب' : 'Engaging Content Creation',
      description: isArabic ? 'من المقالات المقنعة إلى الفيديوهات الفيروسية، نصنع محتوى يجذب ويحول.' : 'From compelling articles to viral videos, we create content that captivates and converts.',
      features: [
        isArabic ? 'كتابة المدونات والمقالات' : 'Blog Writing & Articles',
        isArabic ? 'إنتاج محتوى الفيديو' : 'Video Content Production',
        isArabic ? 'التصميم الجرافيكي' : 'Graphic Design',
      ],
      color: 'yellow',
    },
    {
      icon: Mail,
      title: isArabic ? 'حملات البريد الإلكتروني المستهدفة' : 'Targeted Email Campaigns',
      description: isArabic ? 'رعاية العملاء المحتملين ودفع المبيعات باستراتيجيات التسويق عبر البريد الإلكتروني الشخصية والفعالة.' : 'Nurture leads and drive sales with personalized and effective email marketing strategies.',
      features: [
        isArabic ? 'إعداد أتمتة البريد الإلكتروني' : 'Email Automation Setup',
        isArabic ? 'اختبار A/B وتحسين' : 'A/B Testing & Optimization',
        isArabic ? 'استراتيجيات التجزئة' : 'Segmentation Strategies',
      ],
      color: 'purple',
    },
    {
      icon: BarChart3,
      title: isArabic ? 'تحليلات البيانات وإعداد التقارير' : 'Data Analytics & Reporting',
      description: isArabic ? 'احصل على رؤى قابلة للتنفيذ من بيانات التسويق الخاصة بك لتحسين الأداء بشكل مستمر.' : 'Gain actionable insights from your marketing data to continuously optimize performance.',
      features: [
        isArabic ? 'إعداد Google Analytics' : 'Google Analytics Setup',
        isArabic ? 'إنشاء لوحة معلومات مخصصة' : 'Custom Dashboard Creation',
        isArabic ? 'إعداد تقارير الأداء' : 'Performance Reporting',
      ],
      color: 'blue',
    },
    {
      icon: Target,
      title: isArabic ? 'إعلانات الدفع بالنقرة (PPC)' : 'Pay-Per-Click (PPC) Advertising',
      description: isArabic ? 'عظّم عائد الاستثمار مع حملات إعلانية مدفوعة مستهدفة ومحسنة بدقة.' : 'Maximize your ROI with precisely targeted and optimized paid advertising campaigns.',
      features: [
        isArabic ? 'إدارة إعلانات Google' : 'Google Ads Management',
        isArabic ? 'تحسين إعلانات Facebook' : 'Facebook Ads Optimization',
        isArabic ? 'تحسين الميزانية' : 'Budget Optimization',
      ],
      color: 'orange',
    },
    {
      icon: TrendingUp,
      title: isArabic ? 'تحسين معدل التحويل (CRO)' : 'Conversion Rate Optimization (CRO)',
      description: isArabic ? 'حوّل المزيد من الزوار إلى عملاء بتحسينات استراتيجية للموقع وصفحات الهبوط.' : 'Turn more visitors into customers with strategic website and landing page optimizations.',
      features: [
        isArabic ? 'تحسين صفحة الهبوط' : 'Landing Page Optimization',
        isArabic ? 'تنفيذ اختبار A/B' : 'A/B Testing Implementation',
        isArabic ? 'تحليل تجربة المستخدم' : 'User Experience Analysis',
      ],
      color: 'emerald',
    },
    {
      icon: Users,
      title: isArabic ? 'التسويق عبر المؤثرين' : 'Influencer Marketing',
      description: isArabic ? 'استفد من قوة قادة الرأي لتوسيع نطاق علامتك التجارية ومصداقيتها.' : 'Leverage the power of key opinion leaders to expand your brand\'s reach and credibility.',
      features: [
        isArabic ? 'تحديد المؤثرين' : 'Influencer Identification',
        isArabic ? 'استراتيجية الحملة' : 'Campaign Strategy',
        isArabic ? 'تتبع الأداء' : 'Performance Tracking',
      ],
      color: 'pink',
    },
  ];

  const marketingTools = [
    { 
      name: 'Google Analytics', 
      description: isArabic ? 'تتبع حركة المرور على الموقع وسلوك المستخدم.' : 'Track website traffic and user behavior.',
      color: 'cyan'
    },
    { 
      name: 'Google Search Console', 
      description: isArabic ? 'تحسين ظهور محرك البحث والفهرسة.' : 'Optimize search engine visibility and indexing.',
      color: 'cyan'
    },
    { 
      name: 'Google Ads', 
      description: isArabic ? 'إدارة حملات البحث والعرض الإعلانية.' : 'Manage search and display advertising campaigns.',
      color: 'cyan'
    },
    { 
      name: 'Meta Ads Manager', 
      description: isArabic ? 'تشغيل وتحسين الإعلانات على Facebook/Instagram.' : 'Run and optimize ads on Facebook/Instagram.',
      color: 'blue'
    },
    { 
      name: 'Mailchimp / HubSpot', 
      description: isArabic ? 'أتمتة البريد الإلكتروني وتكاملات CRM.' : 'Email automation and CRM integrations.',
      color: 'purple'
    },
    { 
      name: 'SEMrush / Ahrefs', 
      description: isArabic ? 'أدوات شاملة لتحسين محركات البحث والمحتوى والمنافسين.' : 'Comprehensive SEO, content, and competitor tools.',
      color: 'emerald'
    },
    { 
      name: 'Hootsuite / Buffer', 
      description: isArabic ? 'جدولة وإدارة وسائل التواصل الاجتماعي.' : 'Scheduling and social media management.',
      color: 'pink'
    },
    { 
      name: 'Data Studio / Looker', 
      description: isArabic ? 'إنشاء لوحات معلومات وتقارير غنية.' : 'Create dashboards and rich reports.',
      color: 'blue'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; icon: string; accent: string; gradient: string }> = {
      cyan: { border: 'border-cyan-400/20', icon: 'text-cyan-400', accent: 'bg-cyan-400/10', gradient: 'from-cyan-400 to-blue-400' },
      emerald: { border: 'border-emerald-400/20', icon: 'text-emerald-400', accent: 'bg-emerald-400/10', gradient: 'from-emerald-400 to-teal-400' },
      purple: { border: 'border-purple-400/20', icon: 'text-purple-400', accent: 'bg-purple-400/10', gradient: 'from-purple-400 to-pink-400' },
      orange: { border: 'border-orange-400/20', icon: 'text-orange-400', accent: 'bg-orange-400/10', gradient: 'from-orange-400 to-red-400' },
      yellow: { border: 'border-yellow-400/20', icon: 'text-yellow-400', accent: 'bg-yellow-400/10', gradient: 'from-yellow-400 to-orange-400' },
      pink: { border: 'border-pink-400/20', icon: 'text-pink-400', accent: 'bg-pink-400/10', gradient: 'from-pink-400 to-purple-400' },
      blue: { border: 'border-blue-400/20', icon: 'text-blue-400', accent: 'bg-blue-400/10', gradient: 'from-blue-400 to-cyan-400' },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-[#0f1729] via-[#0a1220] to-[#050a15] ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-[96%] relative z-10">
          {/* Back Link */}
          <div className="flex justify-center mb-8">
            <Link 
              href={`/${lang}`}
              className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors ${isArabic ? 'flex-row-reverse' : ''}`}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center text-center" dir={isArabic ? 'rtl' : 'ltr'}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 w-full text-center"
            >
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block text-center">
                {isArabic ? 'موجة الأعمال' : 'BUSINESS WAVE'}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mb-8 text-center"
            >
              {isArabic 
                ? 'نهندس تطبيقات ويب مبتكرة وقابلة للتوسع وآمنة مصممة خصيصًا لاحتياجات عملك، مع التركيز على تجارب مستخدم استثنائية ووظائف قوية.'
                : 'We engineer innovative, scalable, and secure web applications tailored to your business needs, focusing on exceptional user experiences and robust functionality.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link href={`/${lang}/contact`}>
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-emerald-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic ? 'ابدأ مشروع الويب الخاص بك' : 'Start Your Web Project'} →
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Marketing Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center mb-12"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {isArabic ? 'حلول التسويق الرقمي' : 'Digital Marketing Solutions'}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              {isArabic 
                ? 'في المشهد الحديث، التواجد الرقمي القوي ليس اختياريًا. إنه كيفية الوصول إلى جمهورك وإشراكه وتحويله بفعالية.'
                : 'In the modern landscape, a strong digital presence is not optional. It\'s how you reach, engage, and convert your audience effectively.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalMarketingServices.map((service, index) => {
              const Icon = service.icon;
              const colors = getColorClasses(service.color);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group p-6 rounded-xl border ${colors.border} bg-[#0f1729]/60 backdrop-blur-sm hover:bg-[#1a2332] transition-all duration-300`}
                >
                  <div className={`w-14 h-14 rounded-lg ${colors.accent} flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3" dir={isArabic ? 'rtl' : 'ltr'}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4" dir={isArabic ? 'rtl' : 'ltr'}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300 text-xs" dir={isArabic ? 'rtl' : 'ltr'}>
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.accent} ${isArabic ? 'ml-2' : 'mr-2'}`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marketing Tools Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-[#0a0f1e]/50 to-transparent">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center mb-12"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="text-white block text-center">{isArabic ? 'حلولنا ' : 'Our Advanced '}</span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent block text-center">
                {isArabic ? 'للتسويق الرقمي المتقدمة' : 'Digital Marketing Solutions'}
              </span>
            </h2>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {marketingTools.map((tool, index) => {
              const colors = getColorClasses(tool.color);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  className={`p-5 rounded-xl border ${colors.border} bg-[#0a1220]/80 backdrop-blur-sm hover:bg-[#0f1729] transition-all duration-300`}
                >
                  <h4 className="text-base font-bold text-white mb-2" dir={isArabic ? 'rtl' : 'ltr'}>{tool.name}</h4>
                  <p className="text-xs text-gray-400 mb-3" dir={isArabic ? 'rtl' : 'ltr'}>{tool.description}</p>
                  <div className={`h-1 w-full bg-gradient-to-r ${colors.gradient} rounded-full`}></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent backdrop-blur-sm flex flex-col items-center justify-center text-center"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block text-center">
                {isArabic ? 'هل أنت مستعد لتحويل تواجدك على الإنترنت؟' : 'Ready to Transform Your Online Presence?'}
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl text-center">
              {isArabic 
                ? 'دعنا نناقش مشروعك ونحول رؤيتك إلى حقيقة من خلال حل ويب قوي.'
                : 'Let\'s discuss your project and bring your vision to life with a powerful web solution.'}
            </p>
            <Link href={`/${lang}/contact`}>
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-emerald-400/30 transition-all duration-300 hover:scale-105">
                {isArabic ? 'ابدأ مشروع الويب الخاص بك' : 'Start Your Web Project'} →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
