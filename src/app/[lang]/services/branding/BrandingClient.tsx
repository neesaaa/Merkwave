"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users, Palette, MessageCircle, Package, BookOpen, Megaphone } from "lucide-react";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

export default function BrandingClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';

  const services = [
    {
      icon: Users,
      title: isArabic ? 'استراتيجية العلامة التجارية وتحديد المواقع' : 'Brand Strategy & Positioning',
      description: isArabic ? 'تحديد قيمك الأساسية ورسالتك ورؤيتك وعرض البيع الفريد.' : 'Defining your core values, mission, vision, and unique selling proposition.',
      color: 'orange',
    },
    {
      icon: Palette,
      title: isArabic ? 'تصميم الشعار والهوية البصرية' : 'Logo Design & Visual Identity',
      description: isArabic ? 'صياغة شعارات لا تُنسى ولوحات ألوان وطباعة وإرشادات العلامة التجارية.' : 'Crafting memorable logos, color palettes, typography, and brand guidelines.',
      color: 'cyan',
    },
    {
      icon: MessageCircle,
      title: isArabic ? 'تسمية العلامة التجارية وتطوير الشعارات' : 'Brand Naming & Slogan Development',
      description: isArabic ? 'إنشاء أسماء وشعارات مؤثرة تتردد مع جمهورك المستهدف.' : 'Creating impactful names and taglines that resonate with your target audience.',
      color: 'pink',
    },
    {
      icon: Package,
      title: isArabic ? 'تصميم العبوات' : 'Packaging Design',
      description: isArabic ? 'تصميم عبوات جذابة وعملية تعكس جوهر علامتك التجارية.' : 'Designing attractive and functional packaging that reflects your brand essence.',
      color: 'purple',
    },
    {
      icon: BookOpen,
      title: isArabic ? 'أدلة نمط العلامة التجارية' : 'Brand Style Guides',
      description: isArabic ? 'أدلة شاملة لضمان تطبيق العلامة التجارية بشكل متسق عبر جميع نقاط الاتصال.' : 'Comprehensive guides to ensure consistent brand application across all touchpoints.',
      color: 'emerald',
    },
    {
      icon: Megaphone,
      title: isArabic ? 'سرد قصص العلامة التجارية' : 'Brand Storytelling',
      description: isArabic ? 'تطوير روايات مقنعة تتواصل عاطفياً مع عملائك.' : 'Developing compelling narratives that connect emotionally with your customers.',
      color: 'blue',
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
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-[96%] relative z-10">
          {/* Back Link */}
          <Link 
            href={`/${lang}/services`}
            className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {isArabic ? 'العودة إلى الخدمات' : 'Back to Services'}
          </Link>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isArabic ? 'lg:grid-flow-dense' : ''}`}>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`${isArabic ? 'lg:col-start-2' : ''}`}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <div className="mb-8">
                <Image 
                  src="/Branding.png" 
                  alt="Branding Wave" 
                  width={120} 
                  height={120} 
                  className="rounded-2xl shadow-lg shadow-pink-500/20"
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">
                  {isArabic ? 'هوية العلامة التجارية واستراتيجيتها' : 'Brand Identity & Strategy'}
                </span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {isArabic 
                  ? 'تطوير هوية علامة تجارية قوية ومتماسكة تتردد مع جمهورك وتتميز في السوق.'
                  : 'Develop a strong, cohesive brand identity that resonates with your audience and stands out in the market.'}
              </p>

              <Link href={`/${lang}/contact`}>
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic ? 'احصل على استشارة العلامة التجارية' : 'Get a Brand Consultation'}
                </button>
              </Link>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${isArabic ? 'lg:col-start-1 lg:row-start-1' : ''}`}
            >
              <div className="relative p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-bold mb-4" dir={isArabic ? 'rtl' : 'ltr'}>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {isArabic ? 'صياغة الهويات، بناء الإرث' : 'Crafting Identities, Building Legacies'}
                  </span>
                </h2>
                <p className="text-gray-300 leading-relaxed" dir={isArabic ? 'rtl' : 'ltr'}>
                  {isArabic 
                    ? 'علامتك التجارية هي أكثر من مجرد شعار. إنها قصتك ووعدك وهويتك الفريدة. نحن متخصصون في إنشاء علامات تجارية مؤثرة تتردد مع جمهورك وتصمد أمام اختبار الزمن.'
                    : 'Your brand is more than just a logo. It\'s your story, your promise, and your unique identity. We specialize in creating impactful branding that resonates with your audience and stands the test of time.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branding Expertise Section */}
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
              <span className="bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                {isArabic ? 'خبرتنا في العلامات التجارية' : 'Our Branding Expertise'}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              {isArabic 
                ? 'حلول علامات تجارية شاملة لإنشاء حضور فريد في السوق'
                : 'Comprehensive branding solutions to establish your unique market presence'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const colors = getColorClasses(service.color);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group p-6 rounded-xl border ${colors.border} bg-[#0f1729]/60 backdrop-blur-sm hover:border-${service.color}-400/40 transition-all duration-300`}
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
                  <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 transition-all duration-500`}></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Branding Matters Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-[#0a0f1e]/50 to-transparent">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="p-8 rounded-xl border border-orange-400/20 bg-[#141b2d]/80 backdrop-blur-sm text-center">
              <div className="w-16 h-16 rounded-full bg-orange-400/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-orange-400">01</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic ? 'التعرف والثقة' : 'Recognition & Trust'}
              </h3>
              <p className="text-gray-400 leading-relaxed" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic 
                  ? 'العلامة التجارية القوية تبني التعرف الفوري والثقة مع جمهورك، مما يجعلك الخيار المفضل.'
                  : 'A strong brand builds instant recognition and trust with your audience, making you the preferred choice.'}
              </p>
            </div>

            <div className="p-8 rounded-xl border border-cyan-400/20 bg-[#141b2d]/80 backdrop-blur-sm text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-cyan-400">02</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic ? 'التمايز' : 'Differentiation'}
              </h3>
              <p className="text-gray-400 leading-relaxed" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic 
                  ? 'تميز عن المنافسين بهوية علامة تجارية فريدة تعرض عرض القيمة الخاص بك.'
                  : 'Stand apart from competitors with a unique brand identity that showcases your value proposition.'}
              </p>
            </div>

            <div className="p-8 rounded-xl border border-pink-400/20 bg-[#141b2d]/80 backdrop-blur-sm text-center">
              <div className="w-16 h-16 rounded-full bg-pink-400/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-pink-400">03</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic ? 'الاتصال العاطفي' : 'Emotional Connection'}
              </h3>
              <p className="text-gray-400 leading-relaxed" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic 
                  ? 'أنشئ روابط عاطفية دائمة مع عملائك من خلال سرد قصص أصيلة للعلامة التجارية.'
                  : 'Create lasting emotional bonds with your customers through authentic brand storytelling.'}
              </p>
            </div>
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
            className="relative p-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent backdrop-blur-sm text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isArabic ? 'هل أنت مستعد لبناء علامة تجارية لا تُنسى؟' : 'Ready to Build a Memorable Brand?'}
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {isArabic 
                ? 'دعنا نعمل معًا لإنشاء هوية علامة تجارية تحكي قصتك وتتواصل مع جمهورك.'
                : 'Let\'s work together to create a brand identity that tells your story and connects with your audience.'}
            </p>
            <Link href={`/${lang}/contact`}>
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105">
                {isArabic ? 'ابدأ رحلة علامتك التجارية' : 'Start Your Brand Journey'}
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
