"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Smartphone, Code, Zap, Shield, Users, Bell, Globe, Palette, Settings } from "lucide-react";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

export default function MobileClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';

  const mobileServices = [
    {
      icon: Smartphone,
      title: isArabic ? 'تطوير تطبيقات iOS' : 'iOS App Development',
      description: isArabic ? 'تطبيقات iOS أصلية مصممة لأجهزة Apple مع أداء استثنائي وتجارب مستخدم سلسة.' : 'Native iOS applications crafted for Apple devices with exceptional performance and seamless user experiences.',
      features: [
        isArabic ? 'تطوير Swift وSwiftUI' : 'Swift & SwiftUI Development',
        isArabic ? 'تكامل App Store' : 'App Store Integration',
        isArabic ? 'تحسين الأداء' : 'Performance Optimization',
      ],
      color: 'cyan',
    },
    {
      icon: Code,
      title: isArabic ? 'تطوير تطبيقات Android' : 'Android App Development',
      description: isArabic ? 'تطبيقات Android قوية مبنية بـ Kotlin وJava لجميع أجهزة Android.' : 'Robust Android applications built with Kotlin and Java for all Android devices.',
      features: [
        isArabic ? 'تطوير Kotlin وJava' : 'Kotlin & Java Development',
        isArabic ? 'تكامل Google Play' : 'Google Play Integration',
        isArabic ? 'Material Design' : 'Material Design',
      ],
      color: 'emerald',
    },
    {
      icon: Zap,
      title: isArabic ? 'التطوير متعدد المنصات' : 'Cross-Platform Development',
      description: isArabic ? 'حلول فعالة من حيث التكلفة باستخدام React Native وFlutter لكل من iOS وAndroid.' : 'Cost-effective solutions using React Native and Flutter for both iOS and Android.',
      features: [
        isArabic ? 'تطوير React Native' : 'React Native Development',
        isArabic ? 'تطوير Flutter' : 'Flutter Development',
        isArabic ? 'قاعدة كود واحدة' : 'Single Codebase',
      ],
      color: 'purple',
    },
    {
      icon: Palette,
      title: isArabic ? 'تصميم UI/UX للموبايل' : 'Mobile UI/UX Design',
      description: isArabic ? 'واجهات جميلة وبديهية تجذب المستخدمين وتدفع التحويلات.' : 'Beautiful, intuitive interfaces that engage users and drive conversions.',
      features: [
        isArabic ? 'نماذج أولية تفاعلية' : 'Interactive Prototypes',
        isArabic ? 'اختبار المستخدم' : 'User Testing',
        isArabic ? 'التصميم المتجاوب' : 'Responsive Design',
      ],
      color: 'pink',
    },
    {
      icon: Bell,
      title: isArabic ? 'نظام الإشعارات الفورية' : 'Push Notification System',
      description: isArabic ? 'إشراك المستخدمين بإشعارات فورية مستهدفة وفي الوقت المناسب.' : 'Engage users with targeted, timely push notifications.',
      features: [
        isArabic ? 'إشعارات مجزأة' : 'Segmented Notifications',
        isArabic ? 'رسائل داخل التطبيق' : 'In-App Messaging',
        isArabic ? 'تتبع التحليلات' : 'Analytics Tracking',
      ],
      color: 'orange',
    },
    {
      icon: Shield,
      title: isArabic ? 'الأمان والامتثال' : 'Security & Compliance',
      description: isArabic ? 'حماية قوية لبيانات المستخدمين والامتثال للوائح الصناعة.' : 'Robust protection for user data and compliance with industry regulations.',
      features: [
        isArabic ? 'التشفير من طرف إلى طرف' : 'End-to-End Encryption',
        isArabic ? 'التوافق مع GDPR' : 'GDPR Compliance',
        isArabic ? 'تخزين آمن للبيانات' : 'Secure Data Storage',
      ],
      color: 'blue',
    },
    {
      icon: Globe,
      title: isArabic ? 'تكامل API' : 'API Integration',
      description: isArabic ? 'اتصال سلس مع الخدمات الخلفية وواجهات برمجة التطبيقات الخارجية.' : 'Seamless connection with backend services and third-party APIs.',
      features: [
        isArabic ? 'تكامل RESTful API' : 'RESTful API Integration',
        isArabic ? 'تكامل GraphQL' : 'GraphQL Integration',
        isArabic ? 'مزامنة البيانات في الوقت الفعلي' : 'Real-time Data Sync',
      ],
      color: 'cyan',
    },
    {
      icon: Settings,
      title: isArabic ? 'الصيانة والدعم' : 'Maintenance & Support',
      description: isArabic ? 'دعم مستمر وتحديثات لإبقاء تطبيقك يعمل بسلاسة.' : 'Ongoing support and updates to keep your app running smoothly.',
      features: [
        isArabic ? 'إصلاحات الأخطاء' : 'Bug Fixes',
        isArabic ? 'تحديثات الميزات' : 'Feature Updates',
        isArabic ? 'مراقبة الأداء' : 'Performance Monitoring',
      ],
      color: 'emerald',
    },
    {
      icon: Users,
      title: isArabic ? 'اختبار المستخدم والتحليلات' : 'User Testing & Analytics',
      description: isArabic ? 'رؤى مدفوعة بالبيانات لتحسين تجربة التطبيق والأداء.' : 'Data-driven insights to optimize app experience and performance.',
      features: [
        isArabic ? 'اختبار A/B' : 'A/B Testing',
        isArabic ? 'تتبع سلوك المستخدم' : 'User Behavior Tracking',
        isArabic ? 'تحليلات الأداء' : 'Performance Analytics',
      ],
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; icon: string; accent: string }> = {
      cyan: { border: 'border-cyan-400/20', icon: 'text-cyan-400', accent: 'bg-cyan-400/10' },
      emerald: { border: 'border-emerald-400/20', icon: 'text-emerald-400', accent: 'bg-emerald-400/10' },
      purple: { border: 'border-purple-400/20', icon: 'text-purple-400', accent: 'bg-purple-400/10' },
      orange: { border: 'border-orange-400/20', icon: 'text-orange-400', accent: 'bg-orange-400/10' },
      pink: { border: 'border-pink-400/20', icon: 'text-pink-400', accent: 'bg-pink-400/10' },
      blue: { border: 'border-blue-400/20', icon: 'text-blue-400', accent: 'bg-blue-400/10' },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-[#0f1729] via-[#0a1220] to-[#050a15] ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-[96%] relative z-10">
          {/* Back Link with NEW UI Badge */}
          <div className={`flex items-center gap-3 mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Link 
              href={`/${lang}/services` as any}
              className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors ${isArabic ? 'flex-row-reverse' : ''}`}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {isArabic ? 'العودة إلى الخدمات' : 'Back to Services'}
            </Link>
            <span className="px-3 py-1 text-xs font-bold bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-400/30">
              NEW UI
            </span>
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
                    src="/Media.png"
                    alt="Mobile App Development"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6" dir={isArabic ? 'rtl' : 'ltr'}>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {isArabic ? 'تطوير تطبيقات الموبايل' : 'MOBILE APP DEVELOPMENT'}
                </span>
              </h1>
              
              <p className="text-gray-300 text-base leading-relaxed mb-6" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic 
                  ? 'حلول تعتمد على الموبايل أولاً واستراتيجيات إعلامية تتصل بالمستخدمين من خلال تفاعلات سلسة.'
                  : 'Mobile-first solutions and media strategies that connect with users through seamless interactions.'}
              </p>
              
              <Link href={`/${lang}/contact` as any}>
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic ? 'ابدأ مشروع الويب الخاص بك' : 'Start Your Web Project'} →
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
              <div className="p-8 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent backdrop-blur-sm"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {isArabic ? 'أهمية التواجد القوي على الويب' : 'The Imperative of a Strong Web Presence'}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {isArabic 
                    ? 'يعد التواجد المتطور بشكل احترافي على الويب أمرًا ضروريًا للوصول إلى جمهورك وبناء المصداقية وتحقيق النمو في الاقتصاد الرقمي اليوم.'
                    : 'A professionally developed web presence is essential for reaching your audience, establishing credibility, and driving growth in today\'s digital economy.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Services Section */}
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
              <span className="text-white block text-center">{isArabic ? 'خدمات ' : 'Mobile App '}</span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block text-center">
                {isArabic ? 'تطوير تطبيقات الموبايل' : 'Development Services'}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl text-center">
              {isArabic 
                ? 'من المفهوم إلى الإطلاق، نقدم خدمات تطوير تطبيقات موبايل شاملة تجذب المستخدمين وتدفع نمو الأعمال.'
                : 'From concept to launch, we provide comprehensive mobile app development services that engage users and drive business growth.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileServices.map((service, index) => {
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
                  <p className="text-gray-400 leading-relaxed mb-4" dir={isArabic ? 'rtl' : 'ltr'}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300 text-sm" dir={isArabic ? 'rtl' : 'ltr'}>
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

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-900/20 via-cyan-900/10 to-transparent backdrop-blur-sm flex flex-col items-center justify-center text-center"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block text-center">
                {isArabic ? 'هل أنت مستعد لبناء تطبيقك الموبايل؟' : 'Ready to Build Your Mobile App?'}
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl text-center">
              {isArabic 
                ? 'دعنا نحول فكرتك إلى تطبيق موبايل قوي يحبه المستخدمون.'
                : 'Let\'s transform your idea into a powerful mobile app that users love.'}
            </p>
            <Link href={`/${lang}/contact` as any}>
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105">
                {isArabic ? 'ابدأ الآن' : 'Get Started Now'} →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
