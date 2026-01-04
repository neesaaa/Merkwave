"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft,ArrowRight , ShoppingCart, Smartphone, TrendingUp, Package, CreditCard, Shield, Database, Truck, BarChart3, Lock } from "lucide-react";
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

export default function CommerceClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';

  const ecommerceServices = [
    {
      icon: ShoppingCart,
      title: isArabic ? 'تطوير متجر Shopify' : 'Shopify Store Development',
      description: isArabic ? 'بناء متاجر Shopify مذهلة ومحسنة للتحويل تدفع المبيعات وتوفر تجارب تسوق سلسة.' : 'Build stunning, conversion-optimized Shopify stores that drive sales and provide seamless shopping experiences.',
      color: 'emerald',
    },
    {
      icon: Database,
      title: isArabic ? 'حلول WooCommerce' : 'WooCommerce Solutions',
      description: isArabic ? 'الاستفادة من مرونة WordPress مع متاجر WooCommerce القوية المصممة خصيصًا لاحتياجات عملك.' : 'Leverage WordPress flexibility with powerful WooCommerce stores tailored to your business needs.',
      color: 'purple',
    },
    {
      icon: TrendingUp,
      title: isArabic ? 'Magento Commerce' : 'Magento Commerce',
      description: isArabic ? 'حلول تجارة إلكترونية على مستوى المؤسسات مع ميزات متقدمة لمتطلبات الأعمال المعقدة.' : 'Enterprise e-commerce solutions with advanced features for complex business requirements.',
      color: 'orange',
    },
    {
      icon: BarChart3,
      title: isArabic ? 'منصات BigCommerce' : 'BigCommerce Platforms',
      description: isArabic ? 'منصات تجارة إلكترونية قابلة للتوسع تنمو مع عملك وتتعامل مع حركة المرور على مستوى المؤسسات.' : 'Scalable e-commerce platforms that grow with your business and handle enterprise-level traffic.',
      color: 'cyan',
    },
    {
      icon: CreditCard,
      title: isArabic ? 'تكامل بوابة الدفع' : 'Payment Gateway Integration',
      description: isArabic ? 'حلول معالجة دفع آمنة وموثوقة تبني الثقة وتعزز التحويلات.' : 'Secure, reliable payment processing solutions that build trust and maximize conversions.',
      color: 'purple',
    },
    {
      icon: Smartphone,
      title: isArabic ? 'تطبيقات التجارة عبر الموبايل' : 'Mobile Commerce Apps',
      description: isArabic ? 'تطبيقات موبايل أصلية توفر تجارب تسوق استثنائية وتعزز ولاء العملاء.' : 'Native mobile apps that provide exceptional shopping experiences and boost customer loyalty.',
      color: 'emerald',
    },
    {
      icon: BarChart3,
      title: isArabic ? 'تحليلات التجارة الإلكترونية وإعداد التقارير' : 'E-commerce Analytics & Reporting',
      description: isArabic ? 'رؤى مدفوعة بالبيانات لتحسين أداء متجرك وتعظيم الإمكانات.' : 'Data-driven insights to optimize your store performance and maximize potential.',
      color: 'pink',
    },
    {
      icon: Truck,
      title: isArabic ? 'تنفيذ الطلبات والشحن' : 'Order Fulfillment & Shipping',
      description: isArabic ? 'حلول معالجة الطلبات والشحن المبسطة التي تعزز رضا العملاء.' : 'Streamlined order processing and shipping solutions that enhance customer satisfaction.',
      color: 'orange',
    },
    {
      icon: Lock,
      title: isArabic ? 'الأمان والامتثال' : 'Security & Compliance',
      description: isArabic ? 'إجراءات أمنية قوية لحماية بيانات العملاء وضمان الامتثال التنظيمي.' : 'Robust security measures to protect customer data and ensure regulatory compliance.',
      color: 'pink',
    },
    {
      icon: Package,
      title: isArabic ? 'أنظمة إدارة المخزون' : 'Inventory Management Systems',
      description: isArabic ? 'تبسيط عملياتك مع تتبع المخزون المتقدم وإدارة المخزون التلقائية.' : 'Streamline your operations with advanced inventory tracking and automated stock management.',
      color: 'blue',
    },
  ];

  

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
    color: "yellow",
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
    color: "orange",
  },
];


  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; icon: string; accent: string, gradient: string }> = {
    cyan: { border: "border-cyan-400/20", icon: "text-cyan-400", accent: "bg-cyan-400/10", gradient: "from-cyan-400 to-blue-400" },
      emerald: { border: "border-emerald-400/20", icon: "text-emerald-400", accent: "bg-emerald-400/10", gradient: "from-emerald-400 to-teal-400" },
      purple: { border: "border-purple-400/20", icon: "text-purple-400", accent: "bg-purple-400/10", gradient: "from-purple-400 to-pink-400" },
      orange: { border: "border-orange-400/20", icon: "text-orange-400", accent: "bg-orange-400/10", gradient: "from-orange-400 to-red-400" },
      yellow: { border: "border-yellow-400/20", icon: "text-yellow-400", accent: "bg-yellow-400/10", gradient: "from-yellow-400 to-orange-400" },
      pink: { border: "border-pink-400/20", icon: "text-pink-400", accent: "bg-pink-400/10", gradient: "from-pink-400 to-purple-400" },
      blue: { border: "border-blue-400/20", icon: "text-blue-400", accent: "bg-blue-400/10", gradient: "from-blue-400 to-cyan-400" },
    };
    return colors[color] || colors.cyan;
  };


   const timelineData: TimelineEntry[] = ecommerceServices.map((service, index) => {
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
    });

  return (
    <main className={`min-h-screen relative bg-[#07111D] bg-[url('/bg-dots.jpg')] md:bg-fixed bg-no-repeat bg-cover bg-center ${isArabic ? 'font-arabic' : 'font-sans'}`}>
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
            href={`/${lang}` as any}
            className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}
          </Link>

          <div className="flex flex-col items-center justify-center text-center pt-24">
                          <div className="mb-12">
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
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-white ">
                {isArabic ? 'موجة التجارة' : 'COMMERCE WAVE'}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            >
              {isArabic 
                ? 'حوّل عملك بحلول تجارة إلكترونية قوية تحول الزوار إلى عملاء مخلصين وتدفع نمو الإيرادات المستدامة.'
                : 'Transform your business with powerful e-commerce solutions that convert visitors into loyal customers and drive sustainable revenue growth.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href={`/${lang}/contact` as any}>
                <button className="px-8 py-4 bg-gradient-to-r from-green-200 to-green-300 text-black font-bold rounded-full hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic ? 'أطلق متجرك' : 'Launch Your Store'} 
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* E-commerce Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-[96%]">

          <div className="flex items-center justify-center ">
            <Timeline
              titleText={isArabic ? 'حلول التجارة الإلكترونية الكاملة' : 'E-Commerce Solutions'}
              subtitleText={isArabic 
                ? 'من تصميم واجهة المتجر إلى معالجة الدفع، نقدم حلول التجارة الإلكترونية الشاملة التي تدفع المبيعات وتوفر تجارب عملاء استثنائية.'
                : 'From storefront design to payment processing, we provide end-to-end e-commerce solutions that drive sales and deliver exceptional customer experiences.'}
              data={timelineData}
              isArabic={isArabic}
              accentColor="#34D399"
            />
          </div>
        </div>
      </section>

      {/* Digital Marketing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-[#0a0f1e]/50 to-transparent">

          {/* Marketing Tools Grid */}
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
                        transition-all duration-500 z-20
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

      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-2xl backdrop-blur-sm text-center z-20 flex flex-col items-center justify-center "
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-700 bg-clip-text text-transparent">
                {isArabic ? 'ابدأ البيع عبر الإنترنت اليوم' : 'Start Selling Online Today'}
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic 
                ? 'هل أنت مستعد لتحويل عملك؟ دعنا نبني منصة تجارة إلكترونية تحول الزوار إلى عملاء.'
                : 'Ready to transform your business? Let\'s build an e-commerce platform that converts visitors into customers.'}
            </p>
            <Link href={`/${lang}/contact` as any}>
              <button className="px-8 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-400/30 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                {isArabic ? 'ابدأ الآن' : 'Get Started Now'}
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isArabic ? 'rotate-180' : ''
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
