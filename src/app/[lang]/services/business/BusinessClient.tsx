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
  Globe as gp,
  ArrowRight,
  Filter,
  Settings,
  Handshake,
  Brain,
  DollarSign,
  Shield
} from "lucide-react";
import { Timeline } from "@/components/Timeline";
import Globe from "@/components/Globe";

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
    icon: gp,
    title: isArabic ? "دخول وتوسيع الأسواق" : "Market Entry & Expansion",
    description: isArabic
      ? "تخطيط استراتيجي مدعوم بالبيانات لدخول الأسواق المصرية والسعودية والتوسع فيها بنجاح."
      : "Data-backed strategic planning for successfully entering and scaling in the Egyptian and Saudi markets.",
    color: "cyan",
  },
  {
    icon: Filter,
    title: isArabic ? "هندسة قنوات البيع" : "Sales Funnel Engineering",
    description: isArabic
      ? "تحليل وإعادة بناء عمليات المبيعات لزيادة معدلات التحويل ورفع متوسط قيمة الصفقات."
      : "Analyzing and rebuilding your sales processes to maximize conversion rates and increase average deal value.",
    color: "pink",
  },
  {
    icon: Settings,
    title: isArabic ? "التميز التشغيلي" : "Operational Excellence",
    description: isArabic
      ? "تبسيط مسارات العمل الداخلية والاستفادة من أنظمة ERP للقضاء على المعوقات وتعظيم الأرباح."
      : "Streamlining internal workflows and leveraging ERP systems to eliminate bottlenecks and maximize profitability.",
    color: "yellow",
  },
  {
    icon: Handshake,
    title: isArabic ? "التحالفات الاستراتيجية" : "Strategic Alliances",
    description: isArabic
      ? "تحديد وتأمين شراكات رئيسية توسع نطاق وصولك وتفتح مصادر دخل جديدة."
      : "Identifying and securing key partnerships that expand your reach and create new revenue streams.",
    color: "red",
  },
  {
    icon: Brain,
    title: isArabic ? "دعم القرار الاستراتيجي" : "Strategic Decision Support",
    description: isArabic
      ? "استخدام تحليلات متقدمة لتقديم رؤى واضحة تقلل مخاطر السوق وتعظم العائد على الاستثمار."
      : "Using advanced analytics to deliver clear insights, minimizing market risks while maximizing ROI.",
    color: "blue",
  },
  {
    icon: Target,
    title: isArabic ? "توليد عملاء عالي القيمة (B2B)" : "High-Value Lead Generation",
    description: isArabic
      ? "تنفيذ أنظمة B2B لتحديد واستهداف واكتساب فرص أعمال ذات اهتمام شرائي عالٍ."
      : "Implementing B2B systems to identify, target, and acquire high-intent business opportunities.",
    color: "orange",
  },
  {
    icon: DollarSign,
    title: isArabic ? "الاستراتيجية المالية والنمو" : "Financial Strategy & Growth Planning",
    description: isArabic
      ? "مواءمة الهيكل المالي مع أهداف التوسع لضمان نمو مستدام وقوي."
      : "Aligning your financial structure with expansion goals to ensure sustainable and aggressive scaling.",
    color: "emerald",
  },
  {
    icon: Shield,
    title: isArabic ? "الميزة التنافسية" : "Competitive Edge & Benchmarking",
    description: isArabic
      ? "بحث وتحليل متعمق للمنافسين لضمان بقاء عرض القيمة الخاص بك بلا منازع."
      : "In-depth competitor research to ensure your value proposition remains unrivaled in the market.",
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
    name: "Odoo ERP",
    description: isArabic
      ? "مركزية جميع إجراءات العمل لتحقيق أقصى قدر من الكفاءة التشغيلية."
      : "Centralizing all business processes to achieve maximum operational efficiency.",
    color: "cyan",
  },
  {
    name: "Salesforce / CRM",
    description: isArabic
      ? "تتبع دورة حياة العملاء المحتملين لزيادة معدلات التحويل وتعظيم قيمة الصفقات."
      : "Tracking lead lifecycles to increase conversion rates and maximize deal value.",
    color: "cyan",
  },
  {
    name: "SEMrush",
    description: isArabic
      ? "تحليل المنافسين لتحديد الفجوات وفرص النمو في السوق."
      : "Analyzing competitors to identify market gaps and growth opportunities.",
    color: "cyan",
  },
  {
    name: "Power BI",
    description: isArabic
      ? "تحويل البيانات المعقدة إلى رؤى تنفيذية قابلة للتنفيذ."
      : "Turning complex data into actionable executive-level insights.",
    color: "blue",
  },
  {
    name: "Asana",
    description: isArabic
      ? "إدارة مشاريع التوسع عالية المستوى بدقة وسرعة."
      : "Managing high-level scaling projects with precision and speed.",
    color: "purple",
  },
  {
    name: "Google Trends",
    description: isArabic
      ? "توقع تحولات السوق للبقاء في صدارة احتياجات المستهلكين."
      : "Predicting market shifts to stay ahead of evolving consumer demand.",
    color: "emerald",
  },
  {
    name: "HubSpot",
    description: isArabic
      ? "توسيع نطاق المبيعات عبر مسارات عمل ذكية ومؤتمتة."
      : "Scaling sales outreach through smart, automated workflows.",
    color: "pink",
  },
  {
    name: "Google Data Studio",
    description: isArabic
      ? "بناء لوحات تحكم تنفيذية مخصصة لتتبع عائد الاستثمار الشامل."
      : "Building custom executive dashboards to track total business ROI.",
    color: "blue",
  },
];


  return (
    <main
      className={`min-h-screen overflow-x-hidden relative bg-[#0d2342] md:bg-[url('/bg-dots.webp')] md:bg-fixed bg-no-repeat bg-cover bg-center `}
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
          <div className="flex self-start justify-center md:mb-8">
          <Link
            href={`/${lang}/services` as any}
            className={`inline-flex items-center text-[#00FFFF] hover:text-cyan-300 transition-colors mb-8 `}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <ArrowLeft
              className={`w-5 h-5 ${isArabic ? "ml-2 rotate-180" : "mr-2"}`}
            />
            {isArabic ? "العودة إلى الخدمات" : "Back to Services"}
          </Link>
          </div>

          <div
            className="flex flex-col items-center justify-center text-center pt-4 md:pt-24"
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
              className="text-4xl md:text-5xl font-bold mb-6 h-full  w-full text-center"
            >
              <span className="text-white text-center flex flex-col gap-2">
                {isArabic ? (
                  <>
                    <span className="font-bold text-[#ff3000]">تطوير الأعمال</span>
                    <span>استراتيجيات السيادة على السوق</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-[#ff3000]">Business Development</span>
                    <span>Strategies for Market Dominance</span>
                  </>
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-[280px] sm:max-w-3/4 text-md md:text-lg text-gray-300  mb-8 text-center"
            >
              {isArabic
                ? "نحن لا نقدم مجرد نصائح، بل نهندس النمو. صُممت خدمات تطوير الأعمال لدينا لتحسين عملياتك، وتحديد الفرص عالية القيمة، وتوسيع نطاق علامتك التجارية في منطقة الشرق الأوسط وشمال أفريقيا"
                : "We don't just provide advice; we engineer growth. Our business development services are designed to optimize your operations, identify high-value opportunities, and scale your brand across the MENA region."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link href={`/${lang}/contact`}>
                <button
                  className="px-2 md:px-8 py-4 font-bold rounded-full 
                            text-white 
                            bg-gradient-to-r from-red-500 via-red-600 to-red-700
                            hover:scale-105 hover:shadow-xl hover:shadow-red-500/70
                            transition-all duration-300"
                >
                  {isArabic
                    ? "ابدأ استراتيجية نموك "
                    : "Start Your Growth Strategy →"}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Marketing Solutions Section */}
      <section className=" px-4 z-20">
        <div className="container mx-auto max-w-[96%] -mb-4">
          <div className="relative  space-y-2 z-20">
            <Timeline
              titleText={
                isArabic ? "استراتيجيات قابلة للتوسع للسيادة على السوق" : "Scalable Strategies for Market Dominance"
              }
              subtitleText={
                isArabic
                  ? "نقدم استشارات رفيعة المستوى وتدقيقاً تشغيلياً لمساعدة عملك على الانتقال من النجاح المحلي إلى القيادة الإقليمية. ينصب تركيزنا على الكفاءة، الربحية، والتوسع المستدام."
                  : "We provide high-level consulting and operational auditing to help your business transition from local success to regional leadership. Our focus is on efficiency, profitability, and sustainable scaling."
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
          <section className="relative py-8 md:py-20 px-4 z-20">
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
                <h2 className="text-3xl w-full md:text-4xl font-bold mb-4 text-center z-20">
                  <span className="text-white block text-center">
                    {isArabic ? "أدوات " : "Integrated"}
                  </span>
                  <span className="text-red-500 block text-center">
                    {isArabic
                      ? " متكاملة لنمو قابل للتوسع"
                      : "Tools for Scalable Growth"}
                  </span>
                </h2>
                <p className="text-center">
                  {isArabic
                    ? "نحن نستخدم منصات رائدة عالمياً لإدارة وتتبع وتسريع أهداف عملك"
                    : "We utilize industry-leading platforms to manage, track, and accelerate your business objectives"}
                </p>
              </motion.div>

              {/* Grid */}
              <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            className="relative px-2 py-12 md:p-12 rounded-2xl z-20 backdrop-blur-sm flex flex-col items-center justify-center text-center"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-center"
              dir={isArabic ? "rtl" : "ltr"}
            >
              <span className="text-transparent p-4 bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 block text-center">
                {isArabic
                  ? "هل أنت مستعد لقيادة مجالك؟"
                  : "Ready to Lead Your Industry?"}
              </span>
            </h2>

            <p
              className="text-gray-300 text-md sm:text-lg mb-8 max-w-2xl !text-center"
              dir={isArabic ? "rtl" : "ltr"}
            >
              {isArabic
                ? "لنناقش تحديات عملك الحالية ونبني خارطة طريق للسيادة المطلقة على السوق."
                : "Let’s discuss your current business challenges and build a roadmap for absolute market dominance."}
            </p>


            <Link href={`/${lang}/contact` as any}>
              <button className="px-1 py-2 md:px-8 lg:px-10 md:py-3 bg-gradient-to-r text-md md:text-xl from-yellow-600 via-orange-500 to-red-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-400/30 transition-all duration-300 hover:scale-105 flex items-center ">
                {isArabic
                  ? "احجز جلسة استراتيجية"
                  : "Book Your Strategy Session"}
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${isArabic ? "rotate-180 " : ""}
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
