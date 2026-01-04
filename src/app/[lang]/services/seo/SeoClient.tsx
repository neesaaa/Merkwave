"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, Link2, Wrench, Search, MapPin, Edit3, ShoppingCart, BarChart3, AlertTriangle } from "lucide-react";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

export default function SeoClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';

  const seoServices = [
    {
      icon: FileText,
      title: isArabic ? 'تحسين SEO على الصفحة' : 'On-Page SEO Optimization',
      description: isArabic ? 'تحسين المحتوى وعلامات الميتا والربط الداخلي لتحسين تصنيفات البحث وزيادة الزيارات ذات الصلة.' : 'Optimizing content, meta tags, and internal linking for higher search rankings and relevant traffic.',
      color: 'cyan',
    },
    {
      icon: Link2,
      title: isArabic ? 'SEO خارج الصفحة وبناء الروابط' : 'Off-Page SEO & Link Building',
      description: isArabic ? 'بناء روابط خلفية عالية الجودة وتحسين السلطة العامة عبر الإنترنت لتعزيز ثقة صفحة البحث.' : 'Building high-quality backlinks and improving overall online authority to boost search page trust.',
      color: 'emerald',
    },
    {
      icon: Wrench,
      title: isArabic ? 'تدقيق وتنفيذ SEO التقني' : 'Technical SEO Audit & Implementation',
      description: isArabic ? 'التأكد من أن موقعك الويب سليم تقنيًا ومتوافق مع الموبايل وسهل الزحف.' : 'Ensuring your website is technically sound, mobile-friendly, and easily crawlable.',
      color: 'purple',
    },
    {
      icon: Search,
      title: isArabic ? 'البحث عن الكلمات المفتاحية والاستراتيجية' : 'Keyword Research & Strategy',
      description: isArabic ? 'تحديد الكلمات المفتاحية الأكثر صلة وذات حركة المرور العالية لعملك لاستهداف العملاء المؤهلين.' : 'Identifying the most relevant and high-traffic keywords for your business to target qualified customers.',
      color: 'orange',
    },
    {
      icon: MapPin,
      title: isArabic ? 'تحسين SEO المحلي' : 'Local SEO Optimization',
      description: isArabic ? 'تحسين تواجدك على الإنترنت لجذب المزيد من الأعمال من عمليات البحث المحلية ونتائج الخرائط.' : 'Optimizing your online presence to attract more business from local searches and map results.',
      color: 'cyan',
    },
    {
      icon: Edit3,
      title: isArabic ? 'استراتيجية المحتوى لـ SEO' : 'Content Strategy for SEO',
      description: isArabic ? 'تطوير خطط محتوى تتماشى مع أهداف SEO، تجذب وتشرك جمهورك المستهدف.' : 'Developing content plans that align with SEO goals, attracting and engaging your target audience.',
      color: 'pink',
    },
    {
      icon: ShoppingCart,
      title: isArabic ? 'SEO للتجارة الإلكترونية' : 'E-commerce SEO',
      description: isArabic ? 'استراتيجيات SEO متخصصة للمتاجر عبر الإنترنت لزيادة ظهور المنتجات والمبيعات.' : 'Specialized SEO strategies for online stores to increase product visibility and sales.',
      color: 'yellow',
    },
    {
      icon: BarChart3,
      title: isArabic ? 'مراقبة الأداء وإعداد التقارير' : 'Performance Monitoring & Reporting',
      description: isArabic ? 'تتبع منتظم لأداء SEO الخاص بك مع تقارير مفصلة ورؤى قابلة للتنفيذ.' : 'Regular tracking of your SEO performance with detailed reports and actionable insights.',
      color: 'cyan',
    },
    {
      icon: AlertTriangle,
      title: isArabic ? 'استرداد العقوبات' : 'Penalty Recovery',
      description: isArabic ? 'مساعدة المواقع في التعافي من عقوبات Google واستعادة تصنيفات البحث.' : 'Assisting websites in recovering from Google penalties and restoring search rankings.',
      color: 'pink',
    },
  ];

  const seoTools = [
    { 
      icon: BarChart3,
      name: 'Google Analytics', 
      description: isArabic ? 'تتبع حركة المرور على الموقع وسلوك المستخدم.' : 'Track website traffic and user behavior.',
      color: 'cyan'
    },
    { 
      icon: Search,
      name: 'Google Search Console', 
      description: isArabic ? 'أداء البحث ورؤية الفهرسة.' : 'Search performance and indexing visibility.',
      color: 'cyan'
    },
    { 
      icon: BarChart3,
      name: 'Google Ads', 
      description: isArabic ? 'إدارة وتحسين حملات البحث المدفوعة.' : 'Manage and optimize paid search campaigns.',
      color: 'cyan'
    },
    { 
      icon: BarChart3,
      name: 'SEMrush', 
      description: isArabic ? 'مجموعة SEO للبحث والتدقيقات والمنافسين.' : 'SEO suite for research, audits, and competitors.',
      color: 'cyan'
    },
    { 
      icon: Link2,
      name: 'Ahrefs', 
      description: isArabic ? 'تحليل الروابط الخلفية والبحث عن الكلمات المفتاحية.' : 'Backlink analysis and keyword research.',
      color: 'cyan'
    },
    { 
      icon: Wrench,
      name: 'Screaming Frog', 
      description: isArabic ? 'الزحف على الموقع لتدقيقات SEO التقنية.' : 'Site crawling for technical SEO audits.',
      color: 'cyan'
    },
    { 
      icon: BarChart3,
      name: 'Mailchimp / HubSpot', 
      description: isArabic ? 'أتمتة البريد الإلكتروني وأتمتة CRM.' : 'Email marketing and CRM automations.',
      color: 'cyan'
    },
    { 
      icon: BarChart3,
      name: 'Looker Studio', 
      description: isArabic ? 'لوحات معلومات وإعداد تقارير من مصادر متعددة.' : 'Dashboards and reporting from multiple sources.',
      color: 'cyan'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; icon: string; accent: string }> = {
      cyan: { border: 'border-cyan-400/20', icon: 'text-cyan-400', accent: 'bg-cyan-400/10' },
      emerald: { border: 'border-emerald-400/20', icon: 'text-emerald-400', accent: 'bg-emerald-400/10' },
      purple: { border: 'border-purple-400/20', icon: 'text-purple-400', accent: 'bg-purple-400/10' },
      orange: { border: 'border-orange-400/20', icon: 'text-orange-400', accent: 'bg-orange-400/10' },
      yellow: { border: 'border-yellow-400/20', icon: 'text-yellow-400', accent: 'bg-yellow-400/10' },
      pink: { border: 'border-pink-400/20', icon: 'text-pink-400', accent: 'bg-pink-400/10' },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-[#0f1729] via-[#0a1220] to-[#050a15] ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-[96%] relative z-10">
          {/* Back Link */}
          <div className={`flex items-center gap-3 mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Link 
              href={`/${lang}/services` as any}
              className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors ${isArabic ? 'flex-row-reverse' : ''}`}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {isArabic ? 'العودة إلى الخدمات' : 'Back to Services'}
            </Link>
          </div>

          {/* Hero Content Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            {/* Left Side - Logo/Icon */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`${isArabic ? 'md:order-2' : ''}`}
            >
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 p-1 mb-6">
                <div className="w-full h-full rounded-2xl bg-[#0a1220] flex items-center justify-center">
                  <Image
                    src="/Outdoor.png"
                    alt="SEO Services"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6" dir={isArabic ? 'rtl' : 'ltr'}>
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {isArabic ? 'السيطرة على تصنيفات البحث، قيادة النمو العضوي' : 'Dominating Search Rankings, Driving Organic Growth'}
                </span>
              </h1>
              
              <p className="text-gray-300 text-base leading-relaxed mb-6" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic 
                  ? 'أطلق العنان للإمكانات الكاملة لموقعك الويب من خلال استراتيجيات SEO المتخصصة لدينا، المصممة لزيادة الرؤية وجذب العملاء المحتملين المؤهلين وتعزيز تواجدك على الإنترنت.'
                  : 'Unlock your website\'s full potential with our expert SEO strategies, designed to increase visibility, attract qualified leads, and boost your online presence.'}
              </p>
              
              <Link href={`/${lang}/contact` as any}>
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic ? 'احصل على تدقيق SEO الخاص بك' : 'Get Your SEO Audit'}
                </button>
              </Link>
            </motion.div>

            {/* Right Side Info Box */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`${isArabic ? 'md:order-1' : ''}`}
            >
              <div className="p-8 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-900/20 via-teal-900/10 to-transparent backdrop-blur-sm"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {isArabic ? 'هل أنت مستعد للتصنيف الأعلى؟' : 'Ready to Rank Higher?'}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {isArabic 
                    ? 'دعنا نضع استراتيجية مسارك إلى أعلى نتائج محركات البحث ونمو مستدام عبر الإنترنت.'
                    : 'Let\'s strategize your path to top search engine results and sustainable online growth.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO Services Section */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent block text-center">
                {isArabic ? 'خدمات SEO الشاملة لدينا' : 'Our Comprehensive SEO Services'}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl text-center">
              {isArabic 
                ? 'حلول SEO كاملة لتعزيز رؤية محرك البحث الخاص بك'
                : 'Complete SEO solutions to boost your search engine visibility'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoServices.map((service, index) => {
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
                  <h3 className="text-xl font-bold text-white mb-3" dir={isArabic ? 'rtl' : 'ltr'}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed" dir={isArabic ? 'rtl' : 'ltr'}>
                    {service.description}
                  </p>
                  <div className={`mt-4 h-1 w-full bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 rounded-full`}></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO Tools Section */}
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
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block text-center">
                {isArabic ? 'أدوات ومنصات SEO' : 'SEO Tools & Platforms'}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl text-center">
              {isArabic 
                ? 'أدوات SEO احترافية للتحسين والتحليل الشامل'
                : 'Professional SEO tools for comprehensive optimization and analysis'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {seoTools.map((tool, index) => {
              const Icon = tool.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  className="p-6 rounded-xl border border-cyan-400/20 bg-[#141b2d]/80 backdrop-blur-sm hover:bg-[#1a2332] transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 text-center" dir={isArabic ? 'rtl' : 'ltr'}>{tool.name}</h4>
                  <p className="text-xs text-gray-400 text-center" dir={isArabic ? 'rtl' : 'ltr'}>{tool.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why SEO is Critical Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-900/20 via-orange-900/10 to-transparent backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block text-center">
                {isArabic ? 'لماذا SEO حاسم لعملك' : 'Why SEO is Critical for Your Business'}
              </span>
            </h3>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto text-center" dir={isArabic ? 'rtl' : 'ltr'}>
              {isArabic 
                ? 'في المشهد الرقمي، أن تكون مرئيًا على محركات البحث أمر بالغ الأهمية. يقود SEO حركة المرور العضوية، ويبني '
                : 'In the digital landscape, being visible on search engines is paramount. SEO drives organic traffic, builds '}
              <span className="text-orange-400 font-semibold">
                {isArabic ? 'المصداقية' : 'credibility'}
              </span>
              {isArabic 
                ? '، ويضمن نجاح الأعمال على المدى الطويل.'
                : ', and ensures long-term business success.'}
            </p>
          </motion.div>
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
            className="relative p-12 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-900/20 via-teal-900/10 to-transparent backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="text-white">
                {isArabic ? 'هل أنت مستعد للتصنيف الأعلى؟' : 'Ready to Rank Higher?'}
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto text-center" dir={isArabic ? 'rtl' : 'ltr'}>
              {isArabic 
                ? 'دعنا نضع استراتيجية مسارك إلى أعلى نتائج محركات البحث ونمو مستدام عبر الإنترنت.'
                : 'Let\'s strategize your path to top search engine results and sustainable online growth.'}
            </p>
            <div className="flex justify-center">
              <Link href={`/${lang}/contact` as any}>
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic ? 'احصل على تدقيق SEO الخاص بك' : 'Get Your SEO Audit'}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
