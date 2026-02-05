"use client";
import React from "react";
import Image from "next/image";
import { Timeline } from "@/components/Timeline";
import { motion } from "framer-motion";
import GlassFolder from "@/components/GlassFolder ";
import Link from "next/link";

import {
  Layers,
  Lock,
  MessageCircle,
  Users,
  Shield,
  Code2,
  CreditCard,
  Package,
  Settings,
  BarChart2,
  Link2,
  BookOpen,
  Star,
} from "lucide-react";
import { section } from "framer-motion/m";

interface propsOdoo {
  lang: string;
}

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

const page = ({ lang }: propsOdoo) => {
  const isArabic = lang === "ar";

  const services = [
    {
      icon: Layers,
      title: isArabic ? "التكيف مع كافة القطاعات" : "Universal Industry Fit",
      description: isArabic
        ? "مهما كان مجال عملك، نحن نبني المنطق البرمجي الذي يناسب دورة عملك الخاصة بنسبة 100%."
        : "No matter your field, we build the custom logic that fits your specific workflow 100%.",
      color: "cyan",
    },
    {
      icon: Lock,
      title: isArabic
        ? "تحكم كامل في الصلاحيات"
        : "Full Access & Permissions Control",
      description: isArabic
        ? "إدارة دقيقة وشاملة لصلاحيات كل مستخدم داخل الشركة لضمان سير العمل بدقة ومنع أي تداخل غير مصرح به."
        : "Complete control over every user’s access rights within the company to ensure workflow accuracy.",
      color: "emerald",
    },
    {
      icon: MessageCircle,
      title: isArabic
        ? "التقارير الآلية عبر الواتساب"
        : "Automated WhatsApp Reporting",
      description: isArabic
        ? 'تقارير إدارية يومية تصلك تلقائياً عبر تطبيق "واتساب" لمتابعة أداء الشركة لحظة بلحظة ومن أي مكان.'
        : "Daily management reports sent directly via WhatsApp for real-time monitoring of your company's performance.",
      color: "purple",
    },
    {
      icon: Users,
      title: isArabic
        ? "تقارير ومطابقات العملاء"
        : "Automated Client Reconciliations",
      description: isArabic
        ? "ربط عملاء الشركة بتقارير ومطابقات مالية أسبوعية تلقائية لتعزيز الاحترافية والشفافية في التعامل."
        : "Link your clients to automated weekly reports and financial reconciliations for professional transparency.",
      color: "orange",
    },
    {
      icon: Shield,
      title: isArabic
        ? "حماية البيانات والنسخ الاحتياطي"
        : "Data Security & Periodic Backups",
      description: isArabic
        ? "تأمين كامل لقواعد البيانات بأحدث أنظمة التشفير، مع نظام حفظ احتياطي يومي وأسبوعي لضمان عدم فقدان البيانات."
        : "Fully encrypted databases with a rigorous daily and weekly backup system to prevent any data loss.",
      color: "cyan",
    },
    {
      icon: Code2,
      title: isArabic ? "تطوير التطبيقات المخصصة" : "Custom App Development",
      description: isArabic
        ? "نبتكر ونطور موديولات ومميزات برمجية من الصفر غير متوفرة في النظام القياسي لتلبي احتياجاتك الخاصة."
        : "We build specialized modules and features from scratch that aren't available in the standard system.",
      color: "pink",
    },
    {
      icon: CreditCard,
      title: isArabic
        ? "الحسابات والمالية المتقدمة"
        : "Advanced Accounting & Finance",
      description: isArabic
        ? "إعداد كامل لشجرة الحسابات، والمراكز الضريبية، والتقارير المالية الختامية المتوافقة مع القوانين المحلية."
        : "Full setup of charts of accounts, fiscal positions, and automated financial statements localized to your country.",
      color: "emerald",
    },
    {
      icon: Package,
      title: isArabic ? "المخازن وسلاسل الإمداد" : "Supply Chain & Inventory",
      description: isArabic
        ? "تحسين إدارة المخزون عبر ربط عدة مستودعات، وقواعد إعادة الطلب التلقائي، وتكامل أنظمة الباركود."
        : "Optimize your stock with multi-warehouse management, automated reordering rules, and barcode integration.",
      color: "yellow",
    },
    {
      icon: Settings,
      title: isArabic ? "التصنيع وإدارة دورة المنتج" : "Manufacturing & PLM",
      description: isArabic
        ? "حلول متكاملة للتصنيع، تشمل قوائم المواد، أوامر التشغيل، ومراقب جودة الإنتاج."
        : "Comprehensive MRP solutions, from bills of materials (BoM) to work orders and quality control checks.",
      color: "purple",
    },
    {
      icon: BarChart2,
      title: isArabic ? "المبيعات وعلاقات العملاء" : "Sales, CRM & Marketing",
      description: isArabic
        ? "تتبع العملاء المحتملين، وأتمتة مسارات المبيعات، وإطلاق حملات التسويق عبر البريد الإلكتروني من منصة واحدة."
        : "Track leads, automate your sales pipeline, and launch email marketing campaigns directly from one platform.",
      color: "cyan",
    },
    {
      icon: Link2,
      title: isArabic
        ? "الربط البرمجي الشامل"
        : "Third-Party & API Integrations",
      description: isArabic
        ? "ربط انسيابي مع بوابات الدفع الإلكتروني، شركات الشحن، وأي برامج خارجية أخرى تستخدمها في عملك."
        : "Seamless connection with payment gateways, shipping providers, and any external software you use.",
      color: "pink",
    },
    {
      icon: BookOpen,
      title: isArabic ? "نقل البيانات والتدريب" : "Legacy Migration & Training",
      description: isArabic
        ? "نقل آمن للبيانات من الأنظمة القديمة مع تقديم تدريب احترافي لفريق عملك لضمان سهولة استخدام النظام الجديد."
        : "Secure migration from old systems and professional training for your staff to ensure a smooth transition.",
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<
      string,
      { border: string; icon: string; accent: string }
    > = {
      emerald: {
        border: "border-emerald-400/20",
        icon: "text-emerald-400",
        accent: "bg-emerald-400/10",
      },
      purple: {
        border: "border-orange-200/20",
        icon: "text-purple-400",
        accent: "bg-purple-400/10",
      },
      orange: {
        border: "border-orange-400/20",
        icon: "text-orange-400",
        accent: "bg-orange-400/10",
      },
      yellow: {
        border: "border-yellow-400/20",
        icon: "text-[#F6FF00]",
        accent: "bg-yellow-400/10",
      },
      pink: {
        border: "border-red-400/50",
        icon: "text-pink-400",
        accent: "bg-pink-400/10",
      },
      blue: {
        border: "border-blue-400/20",
        icon: "text-[#00FFFF]",
        accent: "bg-blue-400/10",
      },
      red: {
        border: "border-red-400/20",
        icon: "text-red-400",
        accent: "bg-red-400/10",
      },
      white: {
        border: "border-gray-400/20",
        icon: "text-white",
        accent: "bg-gray-400/10",
      },
      gray: {
        border: "border-gray-400/20",
        icon: "text-gray-400",
        accent: "bg-gray-400/10",
      },
    };
    return colors[color] || colors.purple;
  };

  const timelineData: TimelineEntry[] = services.map((service, index) => {
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
          group-hover:rotate-6  transition-transform duration-300
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
          {/* subtle space line */}
          <div
            className="
            absolute bottom-0 left-0 h-px w-full
            bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent
            opacity-40 group-hover:opacity-100
            transition-opacity duration-500
          "
          />

          <div className="flex items-start gap-6">
            {/* Content */}
            <div className="w-full mb-2">
              <p
                className="leading-loose text-xl lg:text-3xl text-center z-30 pr-20 md:pr-0"
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
    <section className="relative bg-black w-full h-full text-white min-h-screen flex items-center justify-center overflow-hidden">
      <Image src="/odooo.webp" alt="Odoo Software" fill />
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[10px] "></div>

      <section className="w-full h-full z-20">
        <div className="flex flex-col gap-4 z-20 items-center justify-center text-center px-4 py-16 lg:py-24">
          <div className="relative flex items-center justify-center w-60 h-24 md:w-120 md:h-48 rounded-xl bg-[#714B67] ">
            <Image src="/odoo_logo_inverted.svg" alt="Odoo Logo" fill />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center leading-tight">
            {isArabic ? (
              <>
                <span>شريك</span>{" "}
                <span className="text-[#FF00E5] drop-shadow-[0_0_10px_#FF00E5] bg-transparent">
                  أودو
                </span>{" "}
                <span>رسمي معتمد</span>
              </>
            ) : (
              <>
                <span>official</span>{" "}
                <span className="text-[#FF00E5] drop-shadow-[0_0_10px_#FF00E5] bg-transparent">
                  Odoo
                </span>{" "}
                <span>Partner</span>
              </>
            )}
          </h1>
        </div>
        <section className="w-full z-20">
          <div className="container mx-auto max-w-full -mb-4">
            <div className="relative px-4  space-y-2 overflow-hidden">
              <Timeline
                titleText={
                  isArabic
                    ? "نطوع نظام إدارة الموارد ليناسب حجم أعمالك بنسبة 100%"
                    : "Tailoring the perfect ERP to fit your business 100%"
                }
                subtitleText={
                  isArabic
                    ? 'تضطر معظم الشركات لتغيير طريقة عملها لتناسب البرمجيات، لكن في "ميرك ويف"، نحن نفعل العكس. أياً كان مجال عملك—التجارة، التصنيع، الرعاية الصحية، أو الخدمات—نحن نشكّل النظام ليكون مرآة حقيقية لعملياتك الإدارية والميدانية.'
                    : "Most businesses change how they work to fit their software. At Merkwave, we do the opposite. Whatever your industry—Retail, Manufacturing, Healthcare, or Services—we customize the system to be a perfect mirror of your business operations."
                }
                data={timelineData}
                isArabic={isArabic}
                accentColor="#FF00E5"
              />
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col lg:flex-row   gap-12 lg:gap-10 items-center justify-center py-12 mt-5 z-20">
          <h2 className="text-xl md:text-3xl lg:text-5xl font-bold text-white text-center drop-shadow-[0_0_10px_#FF00E5]">
            {isArabic ? (
              <>
                افتح <span className="text-pink-400">مجلد أودو</span> واكتشف
                خدماتنا
              </>
            ) : (
              <>
                Open the <span className="text-pink-400">Odoo Folder</span> and
                explore our services
              </>
            )}
          </h2>
          <Link href={`/${lang}/services` as never}>
            <GlassFolder
              icon={
                <Image
                  src="/odoo_logo_inverted.svg"
                  alt="Odoo Logo"
                  fill
                  className="object-contain"
                />
              }
            />
          </Link>
        </section>

        {/* CTA Section */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative px-6 py-8 rounded-2xl backdrop-blur-md bg-black/50 shadow-lg text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <Star className="w-10 h-10 text-pink-400 drop-shadow-lg" />
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                {isArabic ? "وعد ميرك ويف" : "The Merkwave Promise"}
              </h2>

              {/* Paragraph */}
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                {isArabic
                  ? 'نحن لا نقدم حلولاً "تقريبية". نحن نضمن لك نظاماً متوافقاً 100% مع واقع عملك، يدعم نموك ويحمي أصولك الرقمية.'
                  : 'We don’t provide "close enough" solutions. We ensure a 100% operational fit that empowers your growth and protects your assets.'}
              </p>

              {/* Accent line */}
              <div className="mt-6 w-16 h-1 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 mx-auto shadow-sm"></div>
            </motion.div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default page;
