"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  ChevronRight,
  X,
} from "lucide-react";

interface SocialLink {
  icon: React.ElementType;
  href: string;
  color: string;
  label: string;
}

export default function Footer({ lang }: { lang: string }) {
  const isRTL = lang === "ar";
  const isArabic = lang === "ar";

  type ModalTab = "privacy" | "terms" | "sitemap" | null;
  const [activeModal, setActiveModal] = useState<ModalTab>(null);

  const legalTabs = [
    {
      id: "privacy" as const,
      label: isArabic ? "سياسة الخصوصية" : "Privacy Policy",
    },
    {
      id: "terms" as const,
      label: isArabic ? "شروط الخدمة" : "Terms of Service",
    },
    { id: "sitemap" as const, label: isArabic ? "خريطة الموقع" : "Sitemap" },
  ];

  const legalContent = {
    privacy: {
      title: isArabic ? "سياسة الخصوصية" : "Privacy Policy",
      updated: isArabic
        ? "تم التحديث في سبتمبر 2025"
        : "Updated September 2025",
      intro: isArabic
        ? "نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. تشرح هذه السياسة كيفية جمعنا للمعلومات واستخدامها وحمايتها عبر تجارب مِرك ويف."
        : "We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard information across Merkwave experiences.",
      sections: isArabic
        ? [
            {
              heading: "المعلومات التي نجمعها",
              body: "نجمع بيانات التواصل ومعلومات الشركة ورؤى تحليلات عند تعبئة النماذج أو حضور الفعاليات أو تصفح منصاتنا الرقمية. لا نجمع إلا البيانات اللازمة لتقديم خدماتنا وتحسينها.",
            },
            {
              heading: "كيفية استخدام البيانات",
              body: "تساعدنا بياناتك في الرد على الاستفسارات، وتنفيذ المشاريع، وتخصيص التسويق، وإجراء التحليلات. لا نبيع بياناتك الشخصية أبدًا ونشاركها فقط مع شركاء موثوقين عند الضرورة لتقديم الخدمة.",
            },
            {
              heading: "خياراتك",
              body: "يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت عن طريق إرسال بريد إلكتروني إلى privacy@merkwave.com. نرد على جميع الطلبات خلال 30 يومًا.",
            },
          ]
        : [
            {
              heading: "What we collect",
              body: "We collect contact details, company information, and analytics insights when you submit forms, attend events, or browse our digital platforms. We only collect the data needed to deliver or improve our services.",
            },
            {
              heading: "How we use data",
              body: "Your data helps us respond to inquiries, deliver projects, personalise marketing, and perform analytics. We never sell your personal data and share it only with trusted partners when necessary for service delivery.",
            },
            {
              heading: "Your choices",
              body: "You can request access, correction, or deletion of your personal data at any time by emailing privacy@merkwave.com. We respond to all requests within 30 days.",
            },
          ],
      footer: isArabic
        ? "لأي أسئلة حول الخصوصية تواصل معنا عبر privacy@merkwave.com"
        : "For any privacy questions, contact privacy@merkwave.com",
    },
    terms: {
      title: isArabic ? "الشروط والأحكام" : "Terms of Service",
      updated: isArabic
        ? "تم التحديث في سبتمبر 2025"
        : "Updated September 2025",
      intro: isArabic
        ? "تحكم هذه الشروط استخدامك لخدمات ومنصات مِرك ويف الرقمية. باستخدامك لخدماتنا، فإنك توافق على الالتزامات الموضحة أدناه."
        : "These terms govern your use of Merkwave services and digital platforms. By engaging with us, you agree to the commitments outlined below.",
      sections: isArabic
        ? [
            {
              heading: "نطاق التطبيق",
              body: "تنطبق هذه الشروط على الاستشارات، والاتفاقيات الشهرية، وتطوير البرمجيات، والإنتاج الإعلامي، وأي خدمات ذات صلة تقدمها مِرك ويف أو شركاؤها المعتمدون.",
            },
            {
              heading: "المسؤوليات",
              body: "نلتزم بتقديم نطاق العمل المتفق عليه باستخدام أفضل الممارسات. ويتحمل العملاء مسؤولية تزويدنا بالتغذية الراجعة والموافقات اللازمة في الوقت المحدد لضمان سير المشروع.",
            },
            {
              heading: "الدفع وحقوق الملكية الفكرية",
              body: "تستحق الفواتير خلال 15 يومًا ما لم يُنص خلاف ذلك في العرض. تنتقل ملكية المخرجات النهائية بعد السداد الكامل. تبقى الأدوات أو الأطر الموجودة مسبقًا ملكًا فكريًا لمِرك ويف.",
            },
          ]
        : [
            {
              heading: "Scope",
              body: "These terms apply to consulting, retainers, software development, media production, and any related services provided by Merkwave or our appointed partners.",
            },
            {
              heading: "Responsibilities",
              body: "We commit to delivering the agreed scope using industry best practices. Clients are responsible for providing timely feedback, approvals, and necessary assets to meet project timelines.",
            },
            {
              heading: "Payment & intellectual property",
              body: "Invoices are due within 15 days unless otherwise stated in the proposal. Final deliverables transfer upon full payment. Pre-existing tools or frameworks remain the intellectual property of Merkwave.",
            },
          ],
      footer: isArabic
        ? "للأسئلة القانونية راسلنا عبر legal@merkwave.com"
        : "For legal inquiries, email legal@merkwave.com",
    },
  };

  const sitemapGroups = isArabic
    ? [
        {
          title: "الصفحات الرئيسية",
          links: [
            { label: "الرئيسية", href: "/ar/" },
            { label: "من نحن", href: "/ar/about/" },
            { label: "أعمالنا", href: "/ar/portfolio/" },
            { label: "المدوّنات", href: "/ar/blogs/" },
            { label: "تواصل معنا", href: "/ar/contact/" },
            { label: "العملاء", href: "/ar/clients/" },
          ],
        },
        {
          title: "خدماتنا",
          links: [
            { label: "تطوير الأعمال", href: "/ar/services/business/" },
            { label: "التسويق", href: "/ar/services/commerce/" },
            { label: "هندسة البرمجيات", href: "/ar/services/software/" },
            {
              label: "الهوية والعلامة التجارية",
              href: "/ar/services/branding/",
            },
          ],
        },
        {
          title: "القانوني",
          links: [
            { label: "سياسة الخصوصية", href: "/ar/privacy/" },
            { label: "الشروط والأحكام", href: "/ar/terms/" },
          ],
        },
      ]
    : [
        {
          title: "Main Pages",
          links: [
            { label: "Home", href: "/en/" },
            { label: "About Us", href: "/en/about/" },
            { label: "Portfolio", href: "/en/portfolio/" },
            { label: "Blog", href: "/en/blogs/" },
            { label: "Contact", href: "/en/contact/" },
            { label: "Clients", href: "/en/clients/" },
          ],
        },
        {
          title: "Services",
          links: [
            { label: "Business Development", href: "/en/services/business/" },
            { label: "Marketing", href: "/en/services/commerce/" },
            { label: "Software Engineering", href: "/en/services/software/" },
            { label: "Branding & Identity", href: "/en/services/branding/" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy Policy", href: "/en/privacy/" },
            { label: "Terms of Service", href: "/en/terms/" },
          ],
        },
      ];

  // Services
  const services = [
    {
      name: isArabic ? "تطوير الأعمال" : "Business Development",
      href: `/${lang}/services/business` as const,
    },
    {
      name: isArabic ? "التسويق" : "Marketing",
      href: `/${lang}/services/commerce` as const,
    },
    {
      name: isArabic ? "هندسة البرمجيات" : "Software Engineering",
      href: `/${lang}/services/software` as const,
    },
    {
      name: isArabic ? "الهوية والعلامة التجارية" : "Branding & Identity",
      href: `/${lang}/services/branding` as const,
    },
  ];

  const company = [
    { name: isArabic ? "من نحن" : "About Us", href: `/${lang}/about` as const },
    {
      name: isArabic ? "الأعمال" : "Portfolio",
      href: `/${lang}/portfolio` as const,
    },
    { name: isArabic ? "المدونة" : "Blog", href: `/${lang}/blogs` as const },
    {
      name: isArabic ? "اتصل بنا" : "Contact",
      href: `/${lang}/contact` as const,
    },
  ];

  const contactInfo = {
    address: isArabic
      ? "٩٢ شارع عثمان بن عفان، ميدان تريومف، مصر الجديدة، القاهرة، مصر"
      : "92 Othman Ibn Affan, Triumph Sq, Heliopolis, Cairo, Egypt",
    phone: "+20 100 5224435",
    email: "info@merkwave.com",
  };

  interface SocialLink {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    href: string;
    color: string;
    label: string;
  }

  const socialLinks: SocialLink[] = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/merkwave.co",
      color: "hover:text-blue-500",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/merk.wave/",
      color: "hover:text-pink-500",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/merkwave",
      color: "hover:text-blue-500",
      label: "LinkedIn",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/201005224435",
      color: "hover:text-green-500",
      label: "WhatsApp",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@merkwave",
      color: "hover:text-red-500",
      label: "YouTube",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <>
      <footer
        className="relative bg-[#0a0e17] overflow-hidden"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 -right-10 w-[28rem] h-[28rem] bg-[conic-gradient(at_20%_20%,rgba(34,211,238,.08),transparent_30%)] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-10 w-[26rem] h-[26rem] bg-[conic-gradient(at_80%_80%,rgba(16,185,129,.08),transparent_30%)] rounded-full blur-3xl"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800/60">
            <motion.div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? "text-right" : "text-left"}`}
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Brand + Socials */}
              <motion.div variants={itemVariants}>
                <h3 className="text-white text-2xl font-bold mb-4">Merkwave</h3>
                <p className="text-gray-400 text-sm leading-6 mb-6">
                  {isArabic ? (
                    <>
                      ميرك ويف هي شريك استراتيجي مقرها مصر والسعودية. نمكن
                      الشركات من{" "}
                      <span className="font-bold text-[#00F9FF]">ابتكار</span>{" "}
                      تقنياً،{" "}
                      <span className="font-bold text-[#D00000]">الارتقاء</span>{" "}
                      بهويتها، و
                      <span className="font-bold text-[#FFF200]">السيادة</span>{" "}
                      في سوقها
                    </>
                  ) : (
                    <>
                      Merkwave is a dynamic strategic partner based in Egypt and
                      Saudi Arabia. We empower businesses to{" "}
                      <span className="font-bold text-[#00F9FF]">Innovate</span>{" "}
                      their tech,{" "}
                      <span className="font-bold text-[#D00000]">Elevate</span>{" "}
                      their brand, and{" "}
                      <span className="font-bold text-[#FFF200]">Dominate</span>{" "}
                      their market.
                    </>
                  )}
                </p>

                <div
                  className={`flex  ${isRTL ? "flex-row-reverse justify-end" : "flex-row"} gap-4 flex-wrap`}
                >
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={`social-${index}`}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:bg-gray-700/70`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Our Services */}
              <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-bold mb-6">
                  {isArabic ? "خدماتنا" : "Our Services"}
                </h3>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={`service-${index}`}>
                      <Link
                        href={service.href as any}
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm"
                      >
                        <ChevronRight className="w-4 h-4 text-emerald-300/80" />
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company + Legal */}
              <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-bold mb-6">
                  {isArabic ? "الشركة" : "Company"}
                </h3>
                <ul className="space-y-3">
                  {company.map((item, index) => (
                    <li key={`company-${index}`}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <h4 className="text-white text-sm font-bold mt-8 mb-4">
                  {isArabic ? "القانوني" : "Legal"}
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  {legalTabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveModal(tab.id)}
                        className={`flex items-center gap-2 hover:text-rose-300 transition-colors duration-200 cursor-pointer w-full ${isRTL ? "flex-row" : ""}`}
                      >
                        <ChevronRight className="w-4 h-4 text-rose-300/80 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Us + Stay Updated */}
              <motion.div variants={itemVariants}>
                <h3 className="text-white text-xl font-bold mb-6">
                  {isArabic ? "اتصل بنا" : "Contact Us"}
                </h3>
                <address className="space-y-4 text-sm mb-6 not-italic">
                  <p className={`text-gray-300 flex items-start gap-3 `}>
                    <Link
                      href="https://www.google.com/maps/place/30%C2%B006'00.2%22N+31%C2%B020'31.9%22E/@30.100046,31.342199,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.100046!4d31.342199?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 shrink-0 text-cyan-400" />
                      <span>{contactInfo.address}</span>
                    </Link>
                  </p>
                  <p className={`text-gray-300  items-start gap-3 rtl-text`}>
                    <Link
                      dir="ltr"
                      href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Phone className="w-4 h-4 shrink-0 text-cyan-400" />
                      {contactInfo.phone}
                    </Link>
                  </p>
                  <p className={`text-gray-300 flex items-start gap-3 `}>
                    <Link
                      href={`mailto:${contactInfo.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 shrink-0 text-cyan-400" />
                      {contactInfo.email}
                    </Link>
                  </p>
                </address>

                {/* Stay Updated */}
                <div className="mt-10  ">
                  <h4 className="text-white text-sm font-bold mb-4">
                    {isArabic ? "ابق على اطلاع" : "Stay Updated"}
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">
                    {isArabic
                      ? "اشترك في نشرتنا الإخبارية للحصول على أحدث الرؤى والتحديثات."
                      : "Subscribe to our newsletter for the latest insights and updates."}
                  </p>
                  <form
                    className={`flex flex-col   md:flex-row gap-3`}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      required
                      placeholder={
                        isArabic ? "عنوان بريدك الإلكتروني" : "Email address"
                      }
                      className="w-full flex-1 md:w-[70%] px-4 py-3 rounded-md text-sm bg-[#0f1625] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/30"
                    />
                    <button
                      type="submit"
                      className="px-3 py-3 text-sm rounded-md bg-gradient-to-r from-orange-400 to-red-700 text-black font-semibold hover:brightness-95"
                    >
                      {isArabic ? "اشترك" : "Subscribe"}
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>

            {/* Copyright Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-gray-800"
            >
              <div
                className={`flex flex-col md:flex-row items-center ${isRTL ? "md:space-x-reverse" : ""} md:justify-between gap-4 text-sm text-gray-400`}
              >
                <p className="text-center md:text-start">
                  {isArabic
                    ? "© 2026 Merkwave. صُنع بشغف في مصر."
                    : "© 2026 Merkwave. Crafted with passion in Egypt."}
                </p>
                <div
                  className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <Link href={`/${lang}/about`} className="hover:text-cyan-400">
                    {isArabic ? "من نحن" : "About"}
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link
                    href={`/${lang}/contact`}
                    className="hover:text-cyan-400"
                  >
                    {isArabic ? "اتصل بنا" : "Contact"}
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href={`/${lang}/blogs`} className="hover:text-cyan-400">
                    {isArabic ? "المدونة" : "Blog"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </footer>

      {/* ── Legal Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            key="legal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              key="legal-panel"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              dir={isRTL ? "rtl" : "ltr"}
              className="relative w-full sm:max-w-2xl max-h-[90dvh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#0d1525] border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Header + Tabs */}
              <div className="flex-shrink-0 px-5 pt-5 pb-0 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">
                    {isArabic ? "القانوني" : "Legal"}
                  </span>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Tab bar */}
                <div className="flex gap-1">
                  {legalTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveModal(tab.id)}
                      className={`relative px-3 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                        activeModal === tab.id
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {tab.label}
                      {activeModal === tab.id && (
                        <motion.span
                          layoutId="legal-tab-indicator"
                          className="absolute bottom-0 inset-x-0 h-0.5 bg-cyan-400 rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                <AnimatePresence mode="wait">
                  {(activeModal === "privacy" || activeModal === "terms") && (
                    <motion.div
                      key={activeModal}
                      initial={{ opacity: 0, x: isRTL ? -12 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 12 : -12 }}
                      transition={{ duration: 0.2 }}
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {legalContent[activeModal].title}
                      </h2>
                      <p className="text-xs text-gray-500 mb-4">
                        {legalContent[activeModal].updated}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {legalContent[activeModal].intro}
                      </p>
                      <div className="space-y-5">
                        {legalContent[activeModal].sections.map((s, idx) => (
                          <div key={idx}>
                            <h3 className="text-base font-semibold text-cyan-300 mb-1">
                              {s.heading}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {s.body}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 rounded-2xl border border-blue-800/40 bg-blue-900/20 px-4 py-3 text-xs text-gray-400">
                        {legalContent[activeModal].footer}
                      </div>
                    </motion.div>
                  )}

                  {activeModal === "sitemap" && (
                    <motion.div
                      key="sitemap"
                      initial={{ opacity: 0, x: isRTL ? -12 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 12 : -12 }}
                      transition={{ duration: 0.2 }}
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {isArabic ? "خريطة الموقع" : "Sitemap"}
                      </h2>
                      <p className="text-xs text-gray-500 mb-6">
                        {isArabic
                          ? "جميع صفحات الموقع"
                          : "All pages on this site"}
                      </p>

                      <div className="flex flex-col gap-8">
                        {sitemapGroups.map((group) => (
                          <div key={group.title}>
                            {/* Group header */}
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                                {group.title}
                              </span>
                              <div className="flex-1 h-px bg-gradient-to-r from-cyan-800/50 to-transparent" />
                            </div>

                            {/* Links grid — 2 cols on all sizes inside the modal */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                              {group.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href as any}
                                  onClick={() => setActiveModal(null)}
                                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-300 transition-colors duration-200 group"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors shrink-0" />
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
