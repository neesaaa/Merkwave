"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Users, Target, Shield, Heart, Eye } from "lucide-react";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

export default function AboutClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';

  // Why Merkwave values
  const values = [
    {
      icon: Zap,
      title: isArabic ? 'حلول مبتكرة' : 'Innovative Solutions',
      description: isArabic 
        ? 'نستكشف باستمرار التقنيات الجديدة والأساليب الإبداعية لتقديم حلول رائدة.'
        : 'Continuously exploring new technologies and creative approaches to deliver groundbreaking solutions.',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Users,
      title: isArabic ? 'نمو مثبت' : 'Proven Growth',
      description: isArabic 
        ? 'نعمل عن كثب مع العملاء وداخل فريقنا لتحقيق أهداف مشتركة وتعزيز النمو المتبادل.'
        : 'Working closely with clients and within our team to achieve shared goals and foster mutual growth.',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Target,
      title: isArabic ? 'فريق خبراء' : 'Expert Team',
      description: isArabic 
        ? 'الالتزام بأعلى معايير الجودة والأداء في كل جانب من جوانب عملنا.'
        : 'Committing to the highest standards of quality and performance in every aspect of our work.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Shield,
      title: isArabic ? 'النزاهة' : 'Integrity',
      description: isArabic 
        ? 'العمل بأمانة وشفافية وسلوك أخلاقي في جميع تعاملاتنا.'
        : 'Operating with honesty, transparency, and ethical conduct in all our interactions.',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Heart,
      title: isArabic ? 'التركيز على العميل' : 'Client Focus',
      description: isArabic 
        ? 'وضع احتياجات عملائنا ونجاحهم في طليعة استراتيجياتنا وجهودنا.'
        : "Placing our clients' needs and success at the forefront of our strategies and efforts.",
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Eye,
      title: isArabic ? 'القدرة على التكيف' : 'Adaptability',
      description: isArabic 
        ? 'احتضان التغيير وتطوير استراتيجياتنا لتلبية المتطلبات الديناميكية للمشهد الرقمي.'
        : 'Embracing change and evolving our strategies to meet the dynamic demands of the digital landscape.',
      color: 'from-pink-400 to-pink-600'
    },
  ];

  // Team members
  const team = [
    {
      initials: 'MK',
      name: isArabic ? 'محمد الخولي' : 'Mohamed Elkholy',
      role: isArabic ? 'الرئيس التنفيذي وكبير الاستراتيجيين' : 'CEO & Lead Strategist',
      color: 'from-pink-400 to-pink-600'
    },
    {
      initials: 'MA',
      name: isArabic ? 'محمد عزيز' : 'Mohamed Aziz',
      role: isArabic ? 'مدير الإنتاج الإعلامي' : 'Media Production Manager',
      color: 'from-orange-400 to-orange-600'
    },
    {
      initials: 'AS',
      name: isArabic ? 'عبدالرحمن صبري' : 'Abdelrhman Sabry',
      role: isArabic ? 'مدير التسويق الرقمي' : 'Digital Marketing Manager',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      initials: 'AK',
      name: isArabic ? 'أحمد صبري' : 'Ahmed Sabry',
      role: isArabic ? 'رئيس المبيعات' : 'Head of Sales',
      color: 'from-pink-400 to-pink-600'
    },
    {
      initials: 'AW',
      name: isArabic ? 'أحمد وجيه' : 'Ahmed Wagih',
      role: isArabic ? 'رئيس تطوير الويب' : 'Head of Web Development',
      color: 'from-orange-400 to-orange-600'
    },
  ];

  return (
    <div className={`bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] min-h-screen ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Back to Home Link */}
      <div className="py-6 px-4 max-w-7xl mx-auto">
        <Link 
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-300"
        >
          <ArrowLeft className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
          <span>{isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="text-cyan-400">{isArabic ? 'هل أنت مستعد ' : 'Ready to '}</span>
            <span className="text-green-400">{isArabic ? 'للارتقاء ' : 'elevate '}</span>
            <span className="text-yellow-400">{isArabic ? 'بعملك؟' : 'your business?'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
          >
            {isArabic 
              ? 'نساعد الشركات الصغيرة والمتوسطة على النمو من خلال التسويق الرقمي الإبداعي وتطوير البرمجيات المخصصة والاستشارات الاستراتيجية.'
              : 'We help SMBs grow with creative digital marketing, bespoke software development, and strategic consulting.'}
          </motion.p>
        </div>
      </section>

      {/* Why Merkwave Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section with border */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-2 border-cyan-500/40 rounded-3xl p-10 md:p-16 bg-[#0d1117]/60 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-8 text-center">
              {isArabic ? 'لماذا ميرك ويف؟' : 'WHY MERKWAVE ?'}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {isArabic ? 'لماذا ميرك ويف؟' : 'WHY MERKWAVE ?'}
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed mb-8">
                  {isArabic 
                    ? 'في ميرك ويف، نؤمن بقوة الابتكار لتحويل الشركات وتشكيل المشهد الرقمي للغد. يجمع نهجنا بين التكنولوجيا المتطورة والتصميم الذي يركز على الإنسان، مما يخلق حلولاً لا تلبي الاحتياجات الحالية فحسب، بل تتوقع الفرص المستقبلية أيضاً.'
                    : "At MerkWave, we believe in the power of innovation to transform businesses and shape tomorrow's digital landscape. Our approach combines cutting-edge technology with human-centered design, creating solutions that don't just meet current needs but anticipate future opportunities."}
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {isArabic 
                    ? 'لأننا لا نتكيف مع التيار فحسب؛ بل نصنع المستقبل.'
                    : "Because we don't just adapt to the current; we create the future."}
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed">
                  {isArabic 
                    ? 'تجسد ميرك ويف فلسفة الاستمرارية والتأثير. نحن لا نقدم المشاريع فقط؛ بل نبني شراكات دائمة تتطور مع عملك، مما يضمن النمو المستدام والابتكار في عالم رقمي دائم التغير.'
                    : "MERKWAVE embodies the philosophy of continuity and impact. We don't just deliver projects; we build lasting partnerships that evolve with your business, ensuring sustained growth and innovation in an ever-changing digital world."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Merkwave Values Grid */}
      <section className="py-20 px-4 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-400">{isArabic ? 'لماذا ميرك ويف؟' : 'WHY MERKWAVE ?'}</span>
            </h2>
            <p className="text-gray-200 text-xl max-w-3xl mx-auto">
              {isArabic 
                ? 'لأننا لا نتكيف مع التيار فحسب؛ بل نصنع المستقبل.'
                : "Because we don't just adapt to the current; we create the future."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="h-full p-8 rounded-2xl bg-[#0d1117] border-2 border-cyan-500/30 hover:border-cyan-500/60 backdrop-blur-sm transition-all duration-500">
                    {/* Icon with gradient background */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-white">
                      {value.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4">
              {isArabic ? 'سجلات عملائنا:' : 'Our Client Chronicles:'}
            </h2>
            <p className="text-gray-200 text-xl">
              {isArabic ? 'قصص تجعلنا نبتسم!' : 'Stories that Make Us Smile!'}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 shadow-2xl`}>
                  <span className="text-6xl font-bold text-black">{member.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#000000] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-2 border-cyan-500/40 rounded-3xl p-12 md:p-16 bg-gradient-to-br from-teal-900/10 to-cyan-900/10 backdrop-blur-sm text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
              {isArabic ? 'لنصنع الموجات.' : "LET'S MAKE WAVES."}
            </h2>
            <p className="text-gray-200 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              {isArabic 
                ? 'نساعد الشركات الصغيرة والمتوسطة على النمو من خلال التسويق الرقمي الإبداعي وتطوير البرمجيات المخصصة والاستشارات الاستراتيجية.'
                : 'We help SMBs grow with creative digital marketing, bespoke software development, and strategic consulting.'}
            </p>
            <Link href={`/${lang}/contact`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full transition-all duration-300 shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60"
              >
                <span>{isArabic ? 'لنصنع الموجات.' : "LET'S MAKE WAVES."}</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
