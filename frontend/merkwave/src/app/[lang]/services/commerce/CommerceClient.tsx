"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Megaphone,
  MonitorPlay,
  Mail,
  PenTool,
  Printer,
  Target,
  Users,
  Search,
  LayoutDashboard,
  Share2,
  Facebook,
  LineChart,
  Palette,
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

export default function CommerceClient({
  dict,
  lang,
}: LocalizedComponentProps) {
  const isArabic = lang === "ar";

  const ecommerceServices = [
    {
      icon: Search,
      title: isArabic ? "تحسين محركات البحث (SEO & SEM)" : "SEO & SEM",
      description: isArabic
        ? "السيادة على نتائج البحث لضمان أن تكون علامتك التجارية الخيار الأول للعملاء المحتملين."
        : "Dominating search results to ensure your brand is the first choice for potential customers.",
      color: "emerald",
    },
    {
      icon: Users,
      title: isArabic
        ? "إدارة وسائل التواصل الاجتماعي"
        : "Social Media Management",
      description: isArabic
        ? "بناء مجتمعات نشطة وولاء قوي للعلامة التجارية عبر محتوى استراتيجي وتفاعل فعّال."
        : "Building active communities and brand loyalty through strategic content and engagement.",
      color: "purple",
    },
    {
      icon: Target,
      title: isArabic
        ? "التسويق عبر الأداء (PPC)"
        : "Performance Marketing (PPC)",
      description: isArabic
        ? "حملات إعلانية مستهدفة على جوجل وميتا مصممة لتحقيق أعلى معدلات التحويل."
        : "Targeted ad campaigns on Google and Meta designed for high conversion.",
      color: "orange",
    },
    {
      icon: Printer,
      title: isArabic ? "حلول الطباعة الفاخرة" : "Premium Printing Solutions",
      description: isArabic
        ? "إنتاج عالي الجودة لكروت الأعمال، البروشورات، واللوحات الإرشادية لدعم مجهوداتك التسويقية."
        : "High-quality production for business cards, brochures, and corporate signage to support your marketing.",
      color: "cyan",
    },
    {
      icon: PenTool,
      title: isArabic ? "صناعة المحتوى الجذاب" : "Content Strategy & Creation",
      description: isArabic
        ? "إنتاج مرئيات ونصوص عالية التأثير تروي قصة علامتك التجارية الفريدة."
        : "Producing high-impact visuals and copy that tell your brand’s unique story.",
      color: "purple",
    },
    {
      icon: Mail,
      title: isArabic ? "حملات البريد الإلكتروني" : "Email Marketing",
      description: isArabic
        ? "رعاية العملاء المحتملين وزيادة المبيعات عبر حملات بريدية مخصصة ومؤتمتة."
        : "Nurturing leads and driving sales with personalized and automated email campaigns.",
      color: "emerald",
    },
    {
      icon: BarChart3,
      title: isArabic ? "تحليلات البيانات والتقارير" : "Analytics & Reporting",
      description: isArabic
        ? "تتبع أداء التسويق في الوقت الفعلي لتحسين النتائج ودعم النمو المستمر."
        : "Real-time tracking of marketing performance to continuously optimize for growth.",
      color: "pink",
    },
    {
      icon: TrendingUp,
      title: isArabic
        ? "تحسين معدل التحويل (CRO)"
        : "Conversion Rate Optimization (CRO)",
      description: isArabic
        ? "تحليل وتدقيق نقاط التواصل الرقمية لتحويل المزيد من الزوار إلى عملاء."
        : "Strategic auditing of digital touchpoints to turn more visitors into customers.",
      color: "orange",
    },
    {
      icon: MonitorPlay,
      title: isArabic ? "شراء المساحات الإعلانية" : "Media Buying",
      description: isArabic
        ? "وضع علامتك التجارية في المساحات الرقمية المناسبة لتعظيم الظهور والتأثير."
        : "Placing your brand in the right digital spaces to maximize visibility and impact.",
      color: "pink",
    },
    {
      icon: Megaphone,
      title: isArabic ? "التسويق عبر المؤثرين" : "Influencer Marketing",
      description: isArabic
        ? "الاستفادة من قادة الرأي لتوسيع نطاق وصول علامتك وبناء ثقة حقيقية."
        : "Leveraging key opinion leaders to expand your brand’s reach and authentic trust.",
      color: "blue",
    },
  ];

  const marketingTools = [
    {
      icon: Search,
      name: isArabic ? "سيادة البحث" : "Search Dominance",
      description: isArabic
        ? "الوصول للعملاء المهتمين فعلاً من خلال استهداف دقيق للكلمات المفتاحية."
        : "Capturing high-intent customers through precision keyword targeting.",
      color: "yellow",
    },
    {
      icon: Facebook,
      name: isArabic ? "النمو الاجتماعي" : "Social Growth",
      description: isArabic
        ? "زيادة التحويلات والوصول لجمهور أكبر عبر فيسبوك وانستقرام."
        : "Scaling conversions and brand reach across Facebook and Instagram.",
      color: "blue",
    },
    {
      icon: Palette,
      name: isArabic ? "الإبداع البصري (Adobe)" : "Creative Excellence",
      description: isArabic
        ? "تصميم محتوى بصري فاخر يخدم علامتك التجارية في العالم الرقمي والمطبوع."
        : "Crafting high-end visual content and brand assets for digital and print.",
      color: "pink",
    },
    {
      icon: BarChart3,
      name: isArabic ? "احتراف الـ SEO" : "SEO & Competitors",
      description: isArabic
        ? "تتبع تحركات المنافسين وخطف الصدارة في محركات البحث."
        : "Tracking market shifts and outranking competitors in search results.",
      color: "emerald",
    },
    {
      icon: LineChart,
      name: isArabic ? "ذكاء البيانات" : "Data Intelligence",
      description: isArabic
        ? "تحليل سلوك زوار موقعك عشان نضمن لك أفضل عائد على استثمارك التسويقي."
        : "Analyzing user behavior to maximize your marketing ROI.",
      color: "cyan",
    },
    {
      icon: Users,
      name: isArabic ? "إدارة العملاء" : "Lead Nurturing",
      description: isArabic
        ? "أتمتة رحلة العميل من أول ضغطة لين تتم عملية البيع بنجاح."
        : "Managing and automating the journey from first click to final sale.",
      color: "purple",
    },
    {
      icon: Share2,
      name: isArabic ? "إدارة التواصل" : "Social Management",
      description: isArabic
        ? "تنظيم ونشر المحتوى وإدارة مجتمعك الرقمي في كل المنصات باحترافية."
        : "Professional scheduling and community management across all platforms.",
      color: "pink",
    },
    {
      icon: LayoutDashboard,
      name: isArabic ? "تقارير الأداء" : "Performance Dashboards",
      description: isArabic
        ? "لوحات تحكم بصرية تعطيك نتائج حملاتك التسويقية لحظة بلحظة وبكل شفافية."
        : "Real-time visual reporting on all marketing campaign results.",
      color: "orange",
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

  const timelineData: TimelineEntry[] = ecommerceServices.map(
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
    },
  );

  return (
    <main
      className={`min-h-screen overflow-x-hidden relative bg-[#0d2342] md:bg-[url('/bg-dots.webp')] md:bg-fixed bg-no-repeat bg-cover bg-center `}
    >
      {/* Hero Section */}
      <div className="absolute inset-0 z-1 backdrop-blur-md bg-black/60"></div>

      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-[96%] relative z-10">
          {/* Back Link */}
          <Link
            href={`/${lang}/services` as any}
            className={`inline-flex items-center text-[#00FFFF] hover:text-cyan-300 py-4 transition-colors md:mb-8 `}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <ArrowLeft
              className={`w-5 h-5 ${isArabic ? "ml-2 rotate-180" : "mr-2"}`}
            />
            {isArabic ? "العودة إلى الخدمات" : "Back to Services"}
          </Link>

          <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-24">
            <div className="mb-6">
              <Image
                src="/Marketing.png"
                alt="Branding Wave"
                width={120}
                height={120}
                className="rounded-full shadow-2xl shadow-pink-500/20"
              />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl  font-bold mb-6"
            >
              <span className="text-white">
                {isArabic ? (
                  <>
                    <span className="block font-bold mb-2 text-[#34D399]">خدمات التسويق</span>
                    <span className="block font-medium">
                      الارتقاء بحضور علامتك التجارية
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block font-bold mb-2 text-[#34D399]">
                      Marketing Services
                    </span>
                    <span className="block font-medium">
                      Elevate Your Brand Presence
                    </span>
                  </>
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-[280px] sm:max-w-3/4 text-md md:text-lg text-gray-300  mx-auto mb-8"
            >
              {isArabic
                ? "نحن نجمع بين الاستراتيجيات الرقمية القائمة على البيانات والتنفيذ الإبداعي لضمان وصول علامتك التجارية إلى الجمهور المناسب. صُممت حلولنا التسويقية لتعزيز التفاعل، وزيادة التحويلات، وتعظيم العائد على الاستثمار."
                : "We combine data-driven digital strategies with creative execution to ensure your brand reaches the right audience. Our marketing solutions are engineered to drive engagement, boost conversions, and maximize your ROI."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href={`/${lang}/contact` as any}>
                <button className="px-4 md:px-8 py-4 bg-gradient-to-r from-green-200 to-green-300 text-black font-bold rounded-full hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic
                    ? "نمِّ علامتك التجارية اليوم"
                    : "Grow Your Brand Today"}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* E-commerce Solutions Section */}
      <section className=" px-4 z-20">
        <div className="container mx-auto max-w-[96%] -mb-4">
          <div className="relative  space-y-2 z-20">
            <Timeline
              titleText={
                isArabic
                  ? "حلول التجارة الإلكترونية الكاملة"
                  : "E-Commerce Solutions"
              }
              subtitleText={
                isArabic
                  ? "من تصميم واجهة المتجر إلى معالجة الدفع، نقدم حلول التجارة الإلكترونية الشاملة التي تدفع المبيعات وتوفر تجارب عملاء استثنائية."
                  : "From storefront design to payment processing, we provide end-to-end e-commerce solutions that drive sales and deliver exceptional customer experiences."
              }
              data={timelineData}
              isArabic={isArabic}
              accentColor="#34D399"
            />
          </div>
        </div>
      </section>

      {/* Digital Marketing Section */}
      <section className="py-16 px-4 bg-gradient-to-b z-30 from-transparent via-[#0a0f1e]/50 to-transparent">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center mb-12 z-20"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center z-20">
            <span className="text-white block text-center">
              {isArabic ? "حلولنا " : "Our Advanced "}
            </span>
            <span className="text-[#34D399] block text-center z-20">
              {isArabic
                ? "للتسويق الرقمي المتقدمة"
                : "Digital Marketing Solutions"}
            </span>
          </h2>
        </motion.div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marketingTools.map((tool, index) => {
            const colors = getColorClasses(tool.color);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className={`
                        group relative overflow-hidden rounded-2xl p-5
                        border ${colors.border}
                        bg-[#0a1220]/70
                        backdrop-blur-xl
                        will-change-transform transform-gpu
                        shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
                        hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]
                        transition-all duration-500 z-20
                      `}
              >
                <div
                  className={`
                          pointer-events-none absolute inset-0 opacity-0
                          bg-gradient-to-br ${colors.gradient}
                          group-hover:opacity-20
                          transition-opacity duration-500
                        `}
                />

                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-white/10 transition" />

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
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 z-30">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative px-2 py-12 md:px-12 rounded-2xl backdrop-blur-sm text-center z-20 flex flex-col items-center justify-center "
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-700 bg-clip-text text-transparent">
                {isArabic
                  ? "هل أنت مستعد للارتقاء بتسويقك؟"
                  : "Ready to Elevate Your Marketing"}
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic
                ? "لنناقش كيف يمكننا تنمية علامتك التجارية وتحقيق نتائج ملموسة لعملك."
                : "Let's discuss how we can grow your brand and drive measurable results for your business"}
            </p>
            <Link href={`/${lang}/contact` as any}>
              <button className="px-4 md:px-8 text-sm sm:text-base py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-400/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                {isArabic
                  ? "ابدأ مشروعك التسويقي"
                  : "Start Your Marketing Project"}
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isArabic ? "rotate-180" : ""
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
