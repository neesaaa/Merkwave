"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Smartphone, TrendingUp, Package, CreditCard, Shield, Database, Truck, BarChart3, Lock } from "lucide-react";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

export default function CommerceClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';

  const ecommerceServices = [
    {
      icon: ShoppingCart,
      title: isArabic ? 'تطوير متجر Shopify' : 'Shopify Store Development',
      description: isArabic ? 'بناء متاجر Shopify مذهلة ومحسنة للتحويل تدفع المبيعات وتوفر تجارب تسوق سلسة.' : 'Build stunning, conversion-optimized Shopify stores that drive sales and provide seamless shopping experiences.',
      features: [
        isArabic ? 'تصميم قالب مخصص' : 'Custom Theme Design',
        isArabic ? 'تكامل التطبيقات والإعداد' : 'App Integration & Setup',
        isArabic ? 'تكوين بوابة الدفع' : 'Payment Gateway Configuration',
      ],
      color: 'emerald',
    },
    {
      icon: Database,
      title: isArabic ? 'حلول WooCommerce' : 'WooCommerce Solutions',
      description: isArabic ? 'الاستفادة من مرونة WordPress مع متاجر WooCommerce القوية المصممة خصيصًا لاحتياجات عملك.' : 'Leverage WordPress flexibility with powerful WooCommerce stores tailored to your business needs.',
      features: [
        isArabic ? 'تكامل WordPress المخصص' : 'Custom WordPress Integration',
        isArabic ? 'إدارة المنتجات المتقدمة' : 'Advanced Product Management',
        isArabic ? 'نظام تتبع المخزون' : 'Inventory Tracking System',
      ],
      color: 'purple',
    },
    {
      icon: TrendingUp,
      title: isArabic ? 'Magento Commerce' : 'Magento Commerce',
      description: isArabic ? 'حلول تجارة إلكترونية على مستوى المؤسسات مع ميزات متقدمة لمتطلبات الأعمال المعقدة.' : 'Enterprise e-commerce solutions with advanced features for complex business requirements.',
      features: [
        isArabic ? 'إدارة متعددة المتاجر' : 'Multi-Store Management',
        isArabic ? 'حلول B2B وB2C' : 'B2B & B2C Solutions',
        isArabic ? 'إدارة الكتالوج المتقدمة' : 'Advanced Catalog Management',
      ],
      color: 'orange',
    },
    {
      icon: BarChart3,
      title: isArabic ? 'منصات BigCommerce' : 'BigCommerce Platforms',
      description: isArabic ? 'منصات تجارة إلكترونية قابلة للتوسع تنمو مع عملك وتتعامل مع حركة المرور على مستوى المؤسسات.' : 'Scalable e-commerce platforms that grow with your business and handle enterprise-level traffic.',
      features: [
        isArabic ? 'أدوات SEO مدمجة' : 'Built-in SEO Tools',
        isArabic ? 'بيع متعدد القنوات' : 'Multi-Channel Selling',
        isArabic ? 'تحليلات متقدمة' : 'Advanced Analytics',
      ],
      color: 'cyan',
    },
    {
      icon: CreditCard,
      title: isArabic ? 'تكامل بوابة الدفع' : 'Payment Gateway Integration',
      description: isArabic ? 'حلول معالجة دفع آمنة وموثوقة تبني الثقة وتعزز التحويلات.' : 'Secure, reliable payment processing solutions that build trust and maximize conversions.',
      features: [
        isArabic ? 'طرق دفع متعددة' : 'Multiple Payment Methods',
        isArabic ? 'التوافق مع PCI DSS' : 'PCI DSS Compliance',
        isArabic ? 'الحماية من الاحتيال' : 'Fraud Protection',
      ],
      color: 'purple',
    },
    {
      icon: Smartphone,
      title: isArabic ? 'تطبيقات التجارة عبر الموبايل' : 'Mobile Commerce Apps',
      description: isArabic ? 'تطبيقات موبايل أصلية توفر تجارب تسوق استثنائية وتعزز ولاء العملاء.' : 'Native mobile apps that provide exceptional shopping experiences and boost customer loyalty.',
      features: [
        isArabic ? 'تطوير iOS وAndroid' : 'iOS & Android Development',
        isArabic ? 'نظام الإشعارات الفورية' : 'Push Notification System',
        isArabic ? 'عربة التسوق دون اتصال' : 'Offline Shopping Cart',
      ],
      color: 'emerald',
    },
    {
      icon: BarChart3,
      title: isArabic ? 'تحليلات التجارة الإلكترونية وإعداد التقارير' : 'E-commerce Analytics & Reporting',
      description: isArabic ? 'رؤى مدفوعة بالبيانات لتحسين أداء متجرك وتعظيم الإمكانات.' : 'Data-driven insights to optimize your store performance and maximize potential.',
      features: [
        isArabic ? 'تتبع أداء المبيعات' : 'Sales Performance Tracking',
        isArabic ? 'تحليل سلوك العملاء' : 'Customer Behavior Analysis',
        isArabic ? 'تحسين معدل التحويل' : 'Conversion Rate Optimization',
      ],
      color: 'pink',
    },
    {
      icon: Truck,
      title: isArabic ? 'تنفيذ الطلبات والشحن' : 'Order Fulfillment & Shipping',
      description: isArabic ? 'حلول معالجة الطلبات والشحن المبسطة التي تعزز رضا العملاء.' : 'Streamlined order processing and shipping solutions that enhance customer satisfaction.',
      features: [
        isArabic ? 'معالجة الطلبات تلقائيًا' : 'Automated Order Processing',
        isArabic ? 'شحن متعدد الناقلات' : 'Multi-Carrier Shipping',
        isArabic ? 'التتبع في الوقت الفعلي' : 'Real-Time Tracking',
      ],
      color: 'orange',
    },
    {
      icon: Lock,
      title: isArabic ? 'الأمان والامتثال' : 'Security & Compliance',
      description: isArabic ? 'إجراءات أمنية قوية لحماية بيانات العملاء وضمان الامتثال التنظيمي.' : 'Robust security measures to protect customer data and ensure regulatory compliance.',
      features: [
        isArabic ? 'إعداد شهادة SSL' : 'SSL Certificate Setup',
        isArabic ? 'تشفير البيانات' : 'Data Encryption',
        isArabic ? 'التوافق مع GDPR' : 'GDPR Compliance',
      ],
      color: 'pink',
    },
    {
      icon: Package,
      title: isArabic ? 'أنظمة إدارة المخزون' : 'Inventory Management Systems',
      description: isArabic ? 'تبسيط عملياتك مع تتبع المخزون المتقدم وإدارة المخزون التلقائية.' : 'Streamline your operations with advanced inventory tracking and automated stock management.',
      features: [
        isArabic ? 'تتبع المخزون في الوقت الفعلي' : 'Real-Time Stock Tracking',
        isArabic ? 'نقاط إعادة الطلب التلقائية' : 'Automated Reorder Points',
        isArabic ? 'دعم متعدد المستودعات' : 'Multi-Warehouse Support',
      ],
      color: 'blue',
    },
  ];

  const digitalMarketingServices = [
    {
      icon: '🔍',
      title: isArabic ? 'تحسين SEO وSEM' : 'SEO & SEM Optimization',
      description: isArabic ? 'عزز ظهورك وادفع حركة المرور العضوية من خلال خبرة تحسين محركات البحث والتسويق.' : 'Boost your visibility and drive organic traffic with expert search engine optimization and marketing.',
      color: 'pink',
    },
    {
      icon: '📱',
      title: isArabic ? 'إدارة وسائل التواصل الاجتماعي الاستراتيجية' : 'Strategic Social Media Management',
      description: isArabic ? 'بناء مشاركة مجتمعية قوية وولاء للعلامة التجارية عبر منصات التواصل الاجتماعي الرئيسية.' : 'Build strong community engagement and brand loyalty across major social platforms.',
      color: 'cyan',
    },
    {
      icon: '📝',
      title: isArabic ? 'إنشاء محتوى جذاب' : 'Engaging Content Creation',
      description: isArabic ? 'من المقالات المقنعة إلى الفيديوهات الفيروسية، نصنع محتوى يجذب ويحول.' : 'From compelling articles to viral videos, we create content that captivates and converts.',
      color: 'yellow',
    },
    {
      icon: '📧',
      title: isArabic ? 'حملات البريد الإلكتروني المستهدفة' : 'Targeted Email Campaigns',
      description: isArabic ? 'رعاية العملاء المحتملين ودفع المبيعات باستراتيجيات التسويق عبر البريد الإلكتروني الشخصية والفعالة.' : 'Nurture leads and drive sales with personalized and effective email marketing strategies.',
      color: 'pink',
    },
    {
      icon: '📊',
      title: isArabic ? 'تحليلات البيانات وإعداد التقارير' : 'Data Analytics & Reporting',
      description: isArabic ? 'احصل على رؤى قابلة للتنفيذ من بيانات التسويق الخاصة بك لتحسين الأداء بشكل مستمر.' : 'Gain actionable insights from your marketing data to continuously optimize performance.',
      color: 'cyan',
    },
    {
      icon: '💡',
      title: isArabic ? 'إعلانات الدفع بالنقرة (PPC)' : 'Pay-Per-Click (PPC) Advertising',
      description: isArabic ? 'عظّم عائد الاستثمار مع حملات إعلانية مدفوعة مستهدفة ومحسنة بدقة.' : 'Maximize your ROI with precisely targeted and optimized paid advertising campaigns.',
      color: 'yellow',
    },
    {
      icon: '🔄',
      title: isArabic ? 'تحسين معدل التحويل (CRO)' : 'Conversion Rate Optimization (CRO)',
      description: isArabic ? 'حوّل المزيد من الزوار إلى عملاء بتحسينات استراتيجية للموقع وصفحات الهبوط.' : 'Turn more visitors into customers with strategic website and landing page optimizations.',
      color: 'cyan',
    },
    {
      icon: '⭐',
      title: isArabic ? 'التسويق عبر المؤثرين' : 'Influencer Marketing',
      description: isArabic ? 'استفد من قوة قادة الرأي لتوسيع نطاق علامتك التجارية ومصداقيتها.' : 'Leverage the power of key opinion leaders to expand your brand\'s reach and credibility.',
      color: 'emerald',
    },
  ];

  const marketingTools = [
    { name: 'Google Analytics', description: isArabic ? 'تتبع حركة المرور على الموقع وسلوك المستخدم.' : 'Track website traffic and user behavior.' },
    { name: 'Google Search Console', description: isArabic ? 'تحسين ظهور محرك البحث والفهرسة.' : 'Optimize search engine visibility and indexing.' },
    { name: 'Google Ads', description: isArabic ? 'إدارة حملات البحث والعرض الإعلانية.' : 'Manage search and display advertising campaigns.' },
    { name: 'Meta Ads Manager', description: isArabic ? 'تشغيل وتحسين الإعلانات على Facebook/Instagram.' : 'Run and optimize ads on Facebook/Instagram.' },
    { name: 'Mailchimp / HubSpot', description: isArabic ? 'أتمتة البريد الإلكتروني وتكاملات CRM.' : 'Email automation and CRM integrations.' },
    { name: 'SEMrush / Ahrefs', description: isArabic ? 'أدوات شاملة لتحسين محركات البحث والمحتوى والمنافسين.' : 'Comprehensive SEO, content, and competitor tools.' },
    { name: 'Hootsuite / Buffer', description: isArabic ? 'جدولة وإدارة وسائل التواصل الاجتماعي.' : 'Scheduling and social media management.' },
    { name: 'Data Studio / Looker', description: isArabic ? 'إنشاء لوحات معلومات وتقارير غنية.' : 'Create dashboards and rich reports.' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; icon: string; accent: string }> = {
      cyan: { border: 'border-cyan-400/20', icon: 'text-cyan-400', accent: 'bg-cyan-400/10' },
      emerald: { border: 'border-emerald-400/20', icon: 'text-emerald-400', accent: 'bg-emerald-400/10' },
      purple: { border: 'border-purple-400/20', icon: 'text-purple-400', accent: 'bg-purple-400/10' },
      orange: { border: 'border-orange-400/20', icon: 'text-orange-400', accent: 'bg-orange-400/10' },
      yellow: { border: 'border-yellow-400/20', icon: 'text-yellow-400', accent: 'bg-yellow-400/10' },
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
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-[96%] relative z-10">
          {/* Back Link */}
          <Link 
            href={`/${lang}`}
            className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}
          </Link>

          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
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
              <Link href={`/${lang}/contact`}>
                <button className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic ? 'أطلق متجرك' : 'Launch Your Store'} →
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* E-commerce Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">{isArabic ? 'حلول ' : 'Complete '}</span>
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                {isArabic ? 'التجارة الإلكترونية الكاملة' : 'E-Commerce Solutions'}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              {isArabic 
                ? 'من تصميم واجهة المتجر إلى معالجة الدفع، نقدم حلول التجارة الإلكترونية الشاملة التي تدفع المبيعات وتوفر تجارب عملاء استثنائية.'
                : 'From storefront design to payment processing, we provide end-to-end e-commerce solutions that drive sales and deliver exceptional customer experiences.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecommerceServices.map((service, index) => {
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

      {/* Digital Marketing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-[#0a0f1e]/50 to-transparent">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">{isArabic ? 'حلولنا ' : 'Our '}</span>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {isArabic ? 'للتسويق الرقمي المتقدمة' : 'Advanced Digital Marketing Solutions'}
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {digitalMarketingServices.map((service, index) => {
              const colors = getColorClasses(service.color);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`p-6 rounded-xl border ${colors.border} bg-[#0a1220]/80 backdrop-blur-sm hover:bg-[#0f1729] transition-all duration-300`}
                >
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3" dir={isArabic ? 'rtl' : 'ltr'}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4" dir={isArabic ? 'rtl' : 'ltr'}>
                    {service.description}
                  </p>
                  <div className={`h-1 w-full bg-gradient-to-r from-${service.color}-400 to-${service.color}-600`}></div>
                </motion.div>
              );
            })}
          </div>

          {/* Marketing Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {marketingTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="p-4 rounded-xl border border-cyan-400/20 bg-[#141b2d]/80 backdrop-blur-sm hover:bg-[#1a2332] transition-all duration-300"
              >
                <h4 className="text-sm font-bold text-white mb-2">{tool.name}</h4>
                <p className="text-xs text-gray-400">{tool.description}</p>
                <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
              </motion.div>
            ))}
          </div>

          {/* Marketing Power Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 p-12 rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-900/10 via-orange-900/5 to-transparent backdrop-blur-sm text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {isArabic ? 'قوة التسويق الرقمي اليوم' : 'The Power of Digital Marketing Today'}
              </span>
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              {isArabic 
                ? 'في المشهد الحديث، التواجد الرقمي القوي ليس اختياريًا. إنه كيفية الوصول إلى جمهورك وإشراكه وتحويله بفعالية.'
                : 'In the modern landscape, a strong digital presence isn\'t optional. It\'s how you reach, engage, and convert your audience effectively.'}
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
            className="relative p-12 rounded-2xl border border-orange-400/30 bg-gradient-to-br from-orange-900/20 via-pink-900/10 to-transparent backdrop-blur-sm text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                {isArabic ? 'ابدأ البيع عبر الإنترنت اليوم' : 'Start Selling Online Today'}
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic 
                ? 'هل أنت مستعد لتحويل عملك؟ دعنا نبني منصة تجارة إلكترونية تحول الزوار إلى عملاء.'
                : 'Ready to transform your business? Let\'s build an e-commerce platform that converts visitors into customers.'}
            </p>
            <Link href={`/${lang}/contact`}>
              <button className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-400/30 transition-all duration-300 hover:scale-105">
                {isArabic ? 'ابدأ الآن' : 'Get Started Now'} →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
