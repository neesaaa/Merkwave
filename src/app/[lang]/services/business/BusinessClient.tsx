"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Search,
  Share2,
  Edit,
  Mail,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  ArrowRight
} from "lucide-react";
import { Timeline } from "@/components/Timeline";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export default function BusinessClient({
  dict,
  lang,
}: LocalizedComponentProps) {
  const isArabic = lang === "ar";

  const digitalMarketingServices = [
    {
      icon: Search,
      title: isArabic ? "تحسين SEO وSEM" : "SEO & SEM Optimization",
      description: isArabic
        ? "عزز ظهورك وادفع حركة المرور العضوية من خلال خبرة تحسين محركات البحث والتسويق."
        : "Boost your visibility and drive organic traffic with expert search engine optimization and marketing.",
      color: "cyan",
    },
    {
      icon: Share2,
      title: isArabic
        ? "إدارة وسائل التواصل الاجتماعي الاستراتيجية"
        : "Strategic Social Media Management",
      description: isArabic
        ? "بناء مشاركة مجتمعية قوية وولاء للعلامة التجارية عبر منصات التواصل الاجتماعي الرئيسية."
        : "Build strong community engagement and brand loyalty across major social platforms.",
      color: "pink",
    },
    {
      icon: Edit,
      title: isArabic ? "إنشاء محتوى جذاب" : "Engaging Content Creation",
      description: isArabic
        ? "من المقالات المقنعة إلى الفيديوهات الفيروسية، نصنع محتوى يجذب ويحول."
        : "From compelling articles to viral videos, we create content that captivates and converts.",
      color: "yellow",
    },
    {
      icon: Mail,
      title: isArabic
        ? "حملات البريد الإلكتروني المستهدفة"
        : "Targeted Email Campaigns",
      description: isArabic
        ? "رعاية العملاء المحتملين ودفع المبيعات باستراتيجيات التسويق عبر البريد الإلكتروني الشخصية والفعالة."
        : "Nurture leads and drive sales with personalized and effective email marketing strategies.",
      color: "red",
    },
    {
      icon: BarChart3,
      title: isArabic
        ? "تحليلات البيانات وإعداد التقارير"
        : "Data Analytics & Reporting",
      description: isArabic
        ? "احصل على رؤى قابلة للتنفيذ من بيانات التسويق الخاصة بك لتحسين الأداء بشكل مستمر."
        : "Gain actionable insights from your marketing data to continuously optimize performance.",
      color: "blue",
    },
    {
      icon: Target,
      title: isArabic
        ? "إعلانات الدفع بالنقرة (PPC)"
        : "Pay-Per-Click (PPC) Advertising",
      description: isArabic
        ? "عظّم عائد الاستثمار مع حملات إعلانية مدفوعة مستهدفة ومحسنة بدقة."
        : "Maximize your ROI with precisely targeted and optimized paid advertising campaigns.",
      color: "orange",
    },
    {
      icon: TrendingUp,
      title: isArabic
        ? "تحسين معدل التحويل (CRO)"
        : "Conversion Rate Optimization (CRO)",
      description: isArabic
        ? "حوّل المزيد من الزوار إلى عملاء بتحسينات استراتيجية للموقع وصفحات الهبوط."
        : "Turn more visitors into customers with strategic website and landing page optimizations.",
      color: "emerald",
    },
    {
      icon: Users,
      title: isArabic ? "التسويق عبر المؤثرين" : "Influencer Marketing",
      description: isArabic
        ? "استفد من قوة قادة الرأي لتوسيع نطاق علامتك التجارية ومصداقيتها."
        : "Leverage the power of key opinion leaders to expand your brand's reach and credibility.",
      color: "pink",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<
      string,
      { border: string; icon: string; accent: string; gradient: string }
    > = {
      cyan: {
        border: "border-cyan-400/20",
        icon: "text-cyan-400",
        accent: "bg-cyan-400/10",
        gradient: "from-cyan-400 to-blue-400",
      },
      emerald: {
        border: "border-emerald-400/20",
        icon: "text-emerald-400",
        accent: "bg-emerald-400/10",
        gradient: "from-emerald-400 to-teal-400",
      },
      purple: {
        border: "border-purple-400/20",
        icon: "text-purple-400",
        accent: "bg-purple-400/10",
        gradient: "from-purple-400 to-pink-400",
      },
      orange: {
        border: "border-orange-400/20",
        icon: "text-orange-400",
        accent: "bg-orange-400/10",
        gradient: "from-orange-400 to-red-400",
      },
      yellow: {
        border: "border-yellow-400/20",
        icon: "text-yellow-400",
        accent: "bg-yellow-400/10",
        gradient: "from-yellow-400 to-orange-400",
      },
      pink: {
        border: "border-pink-400/20",
        icon: "text-pink-400",
        accent: "bg-pink-400/10",
        gradient: "from-pink-400 to-purple-400",
      },
      blue: {
        border: "border-blue-400/20",
        icon: "text-blue-400",
        accent: "bg-blue-400/10",
        gradient: "from-blue-400 to-cyan-400",
      },
    };
    return colors[color] || colors.cyan;
  };

  const timelineData: TimelineEntry[] = digitalMarketingServices.map(
    (service, index) => {
      const Icon = service.icon;
      const colors = getColorClasses(service.color);

      return {
        title: service.title,

        icon: (
          <div
            className={`
          flex-shrink-0
          self-center
          w-12 h-12 md:w-24 md:h-24 
          flex items-center justify-center
          ${colors.accent}
          rounded-full
          transition-transform duration-300
          group-hover:rotate-6
        `}
          >
            <Icon className={`w-8 h-8 ${colors.icon}`} />
          </div>
        ),

        content: (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group z-30"
          >
            {/* subtle bottom line */}
            <div
              className="
            absolute bottom-0 left-0 h-px w-full
            bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent
            opacity-40 group-hover:opacity-100
            transition-opacity duration-500
          "
            />

            <div className="flex items-start gap-6">
              <div className="w-full mb-2">
                <p
                  className="leading-loose text-xl lg:text-3xl text-center z-30 pr-20 md:pr-0 "
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </motion.article>
        ),
      };
    }
  );

  const marketingTools = [
    {
      name: "Google Analytics",
      description: isArabic
        ? "تتبع حركة المرور على الموقع وسلوك المستخدم."
        : "Track website traffic and user behavior.",
      color: "cyan",
    },
    {
      name: "Google Search Console",
      description: isArabic
        ? "تحسين ظهور محرك البحث والفهرسة."
        : "Optimize search engine visibility and indexing.",
      color: "cyan",
    },
    {
      name: "Google Ads",
      description: isArabic
        ? "إدارة حملات البحث والعرض الإعلانية."
        : "Manage search and display advertising campaigns.",
      color: "cyan",
    },
    {
      name: "Meta Ads Manager",
      description: isArabic
        ? "تشغيل وتحسين الإعلانات على Facebook/Instagram."
        : "Run and optimize ads on Facebook/Instagram.",
      color: "blue",
    },
    {
      name: "Mailchimp / HubSpot",
      description: isArabic
        ? "أتمتة البريد الإلكتروني وتكاملات CRM."
        : "Email automation and CRM integrations.",
      color: "purple",
    },
    {
      name: "SEMrush / Ahrefs",
      description: isArabic
        ? "أدوات شاملة لتحسين محركات البحث والمحتوى والمنافسين."
        : "Comprehensive SEO, content, and competitor tools.",
      color: "emerald",
    },
    {
      name: "Hootsuite / Buffer",
      description: isArabic
        ? "جدولة وإدارة وسائل التواصل الاجتماعي."
        : "Scheduling and social media management.",
      color: "pink",
    },
    {
      name: "Data Studio / Looker",
      description: isArabic
        ? "إنشاء لوحات معلومات وتقارير غنية."
        : "Create dashboards and rich reports.",
      color: "blue",
    },
  ];

  return (
    <main
      className={`min-h-screen relative bg-[#07111D] bg-[url('/bg-dots.jpg')] md:bg-fixed bg-no-repeat bg-cover bg-center ${isArabic ? "font-arabic" : "font-sans"
        }`}
    >
      <div className="absolute inset-0 z-1 backdrop-blur-md bg-black/60"></div>

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container flex flex-col mx-auto max-w-[96%] relative z-10">
          {/* Back Link */}
          <div className="flex self-start justify-center mb-8">
            <Link
              href={`/${lang}`}
              className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors ${isArabic ? "" : ""
                }`}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <ArrowLeft
                className={`w-5 h-5 ${isArabic ? "ml-2 rotate-180" : "mr-2"}`}
              />
              {isArabic ? "العودة إلى الرئيسية" : "Back to Home"}
            </Link>
          </div>

          <div
            className="flex flex-col items-center justify-center text-center pt-24"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div className="mb-12">
              <Image
                src="/Business.png"
                alt="Branding Wave"
                width={120}
                height={120}
                className="rounded-2xl shadow-lg shadow-pink-500/20"
              />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 h-full  w-full text-center"
            >
              <span className="text-white block text-center">
                {isArabic ? "موجة الأعمال" : "BUSINESS WAVE"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mb-8 text-center"
            >
              {isArabic
                ? "نهندس تطبيقات ويب مبتكرة وقابلة للتوسع وآمنة مصممة خصيصًا لاحتياجات عملك، مع التركيز على تجارب مستخدم استثنائية ووظائف قوية."
                : "We engineer innovative, scalable, and secure web applications tailored to your business needs, focusing on exceptional user experiences and robust functionality."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link href={`/${lang}/contact`}>
                <button
                  className="px-8 py-4 font-bold rounded-full 
                            text-white 
                            bg-gradient-to-r from-red-500 via-red-600 to-red-700
                            hover:scale-105 
                            transition-all duration-300"
                >
                  {isArabic
                    ? "ابدأ مشروع الويب الخاص بك"
                    : "Start Your Web Project →"}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Marketing Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-[96%]">
          <div className="flex gap-6">
            <Timeline
              titleText={
                isArabic ? "حلول التسويق الرقمي" : "Digital Marketing Solutions"
              }
              subtitleText={
                isArabic
                  ? "في المشهد الحديث، التواجد الرقمي القوي ليس اختياريًا. إنه كيفية الوصول إلى جمهورك وإشراكه وتحويله بفعالية."
                  : "In the modern landscape, a strong digital presence is not optional. It's how you reach, engage, and convert your audience effectively."
              }
              data={timelineData}
              isArabic={isArabic}
              accentColor="#ff3000"
            />
          </div>
        </div>
      </section>

      {/* Marketing Tools Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent z-20 via-[#0a0f1e]/50 to-transparent">
        <div className="container mx-auto max-w-[96%]">
          {/* Tools Grid */}
          <section className="relative py-20 px-4 z-20">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
              <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px]" />
            </div>

            <div className="container mx-auto max-w-[96%]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center text-center mb-12 z-20"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center z-20">
                  <span className="text-white block text-center">
                    {isArabic ? "حلولنا " : "Our Advanced "}
                  </span>
                  <span className="text-red-500 block text-center">
                    {isArabic
                      ? "للتسويق الرقمي المتقدمة"
                      : "Digital Marketing Solutions"}
                  </span>
                </h2>
              </motion.div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {marketingTools.map((tool, index) => {
                  const colors = getColorClasses(tool.color);

                  return (
                    <motion.div
                      key={index}
                      initial={false}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                        delay: index * 0.02,
                      }}
                      className={`
                        group relative overflow-hidden rounded-2xl p-5
                        border ${colors.border}
                        bg-[#0a1220]/70
                        backdrop-blur-xl
                        will-change-transform transform-gpu
                        shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
                        hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]
                        transition-all duration-500
                      `}
                    >
                      {/* Gradient glow */}
                      <div
                        className={`
                          pointer-events-none absolute inset-0 opacity-0
                          bg-gradient-to-br ${colors.gradient}
                          group-hover:opacity-20
                          transition-opacity duration-500
                        `}
                      />

                      {/* Inner border */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-white/10 transition" />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-start justify-center">
                        <h4
                          className="text-sm md:text-base font-semibold text-white mb-2 tracking-wide
                               group-hover:text-white/90 transition-colors"
                          dir={isArabic ? "rtl" : "ltr"}
                        >
                          {tool.name}
                        </h4>

                        <p
                          className="text-xs md:text-sm text-gray-400 leading-relaxed mb-4
                               group-hover:text-gray-300 transition-colors"
                          dir={isArabic ? "rtl" : "ltr"}
                        >
                          {tool.description}
                        </p>

                        {/* Accent line */}
                        <div
                          className={`
                      h-[2px] w-full rounded-full
                      bg-gradient-to-r ${colors.gradient}
                      opacity-60
                      group-hover:opacity-100
                      group-hover:shadow-[0_0_14px_currentColor]
                      transition-all duration-500
                    `}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 z-20">
        <div className="container mx-auto max-w-[96%] z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-2xl z-20 backdrop-blur-sm flex flex-col items-center justify-center text-center"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-1 text-center"
              dir={isArabic ? "rtl" : "ltr"}
            >
              <span className="text-transparent p-4 bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 block text-center">
                {isArabic
                  ? "هل أنت مستعد لتحويل تواجدك على الإنترنت؟"
                  : "Ready to Transform Your Online Presence?"}
              </span>
            </h2>

            <p
              className="text-gray-300 text-lg mb-8 max-w-2xl text-center"
              dir={isArabic ? "rtl" : "ltr"}
            >
              {isArabic
                ? "دعنا نناقش مشروعك ونحول رؤيتك إلى حقيقة من خلال حل ويب قوي."
                : "Let's discuss your project and bring your vision to life with a powerful web solution."}
            </p>


            <Link href={`/${lang}/contact` as any}>
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-red-400/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                {isArabic
                  ? "ابدأ مشروع الويب الخاص بك"
                  : "Start Your Web Project"}
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${isArabic ? "rotate-180" : ""
                    }`}
                />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
