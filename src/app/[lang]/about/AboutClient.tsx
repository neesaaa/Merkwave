"use client"; 

import {  motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Users, Target, Shield, Heart, Eye } from "lucide-react";
import ElectroBorder from "@/components/ElectroBorder";
import { Fragment, useEffect, useState } from "react";





interface LocalizedComponentProps {
  dict: any;
  lang: string;
}


export default function AboutClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';
const borderColors = [
  "#CA8A04", // darker yellow (Tailwind yellow-600)
  "#B91C1C", // darker red (Tailwind red-700)
  "#1E40AF", // darker blue (Tailwind blue-800)
  "#0E7490", // darker cyan (Tailwind cyan-700)
  "#15803D", // darker green (Tailwind green-700)
  "#0369A1", // slightly different cyan/blue shade for variety
];
const borderColorsBright = [
  "#FACC15", // bright yellow (Tailwind yellow-400)
  "#EF4444", // bright red (Tailwind red-500)
  "#3B82F6", // bright blue (Tailwind blue-500)
  "#06B6D4", // bright cyan (Tailwind cyan-500)
  "#22C55E", // bright green (Tailwind green-500)
  "#0EA5E9", // slightly brighter cyan/blue variant
];



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

const team = [
  {
    initials: 'MK',
    name: isArabic ? 'محمد الخولي' : 'Mohamed Elkholy',
    role: isArabic ? 'الرئيس التنفيذي وكبير الاستراتيجيين' : 'CEO & Lead Strategist',
    color: 'from-red-400 via-red-500 to-red-600'
  },
  {
    initials: 'MA',
    name: isArabic ? 'محمد عزيز' : 'Mohamed Aziz',
    role: isArabic ? 'مدير الإنتاج الإعلامي' : 'Media Production Manager',
    color: 'from-[#F6FF00] via-[#F6FF00] to-[#F6FF00]'
  },
  {
    initials: 'AS',
    name: isArabic ? 'عبدالرحمن صبري' : 'Abdelrhman Sabry',
    role: isArabic ? 'مدير التسويق الرقمي' : 'Digital Marketing Manager',
    color: 'from-cyan-400 via-cyan-500 to-cyan-600'
  },
  {
    initials: 'AK',
    name: isArabic ? 'أحمد صبري' : 'Ahmed Sabry',
    role: isArabic ? 'رئيس المبيعات' : 'Head of Sales',
    color: 'from-blue-400 via-blue-500 to-blue-600'
  },
  {
    initials: 'AW',
    name: isArabic ? 'أحمد وجيه' : 'Ahmed Wagih',
    role: isArabic ? 'رئيس تطوير الويب' : 'Head of Web Development',
    color: 'from-orange-400 via-orange-500 to-orange-600'
  },
];


  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);

    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={`relative  min-h-screen bg-[#020617] bg-[url('/mawgatna.webp')] md:bg-fixed bg-cover bg-center  `}>
      <div
        className="absolute inset-0 "
      />

      <div className="relative z-10">      
      {/* Back to Home Link */}
      <div className="py-6 px-4 max-w-7xl mx-auto ">
        <Link 
          href={`/${lang}` as any}
          className=" hover:scale-105  inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-150"
        >
          <ArrowLeft className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
          <span>{isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-black/40 absolute inset-0 -z-9" />
      {/* <ReflectBackground backdropBlurAmount="md" className="absolute inset-0 -z-10" /> */}


      <section className="py-8 md:py-12 px-4 ">
        <div className="max-w-6xl mx-auto text-center ">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              text-3xl md:text-6xl font-bold mb-2 leading-tight tracking-tight
              text-[#F6FF00]
              drop-shadow-[0_0_20px_rgba(250,204,21,0.45)]
            "
          >
            {isArabic ? 'هل أنت مستعد للارتقاء بعملك؟' : 'Ready to elevate your business?'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-xl max-w-4xl mx-auto leading-relaxed"
          >
            {isArabic 
              ? 'نساعد الشركات الصغيرة والمتوسطة على النمو من خلال التسويق الرقمي الإبداعي وتطوير البرمجيات المخصصة والاستشارات الاستراتيجية.'
              : 'We help SMBs grow with creative digital marketing, bespoke software development, and strategic consulting.'}
          </motion.p>
        </div>
      </section>
      



      {/* Why Merkwave Section */}
      <section className="py-12 px-1 md:px-4  ">
        <div className="max-w-8xl mx-auto ">
          {/* Section with border */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(7,234,230,0.6)] bg-black/60 bg-blur-lg  rounded-3xl p-10 md:p-16"
          >
            
            <h2 className="text-xl md:text-5xl font-bold text-center text-[#00FFFF]  mb-8 ">
              {isArabic ? 'لماذا ميرك ويف؟' : 'WHY MERKWAVE ?'}
            </h2>


            <div className="space-y-8">
              <div>
                
                <h3 className="text-xl md:text-4xl font-bold text-white mb-4 md:mt-16 ">
                  {isArabic ? 'لماذا ميرك ويف؟' : 'WHY MERKWAVE ?'}
                </h3>
                <div className=" w-1/4 bg-gradient-to-r from-cyan-400 to-transparent mb-6" />

                <p className="text-gray-200 text-xs sm:text-lg leading-relaxed mb-8">
                  {isArabic 
                    ? 'في ميرك ويف، نؤمن بقوة الابتكار لتحويل الشركات وتشكيل المشهد الرقمي للغد. يجمع نهجنا بين التكنولوجيا المتطورة والتصميم الذي يركز على الإنسان، مما يخلق حلولاً لا تلبي الاحتياجات الحالية فحسب، بل تتوقع الفرص المستقبلية أيضاً.'
                    : "At MerkWave, we believe in the power of innovation to transform businesses and shape tomorrow's digital landscape. Our approach combines cutting-edge technology with human-centered design, creating solutions that don't just meet current needs but anticipate future opportunities."}
                </p>
              </div>
              <div className="relative ">

                {/* Soft glow behind title */}
                <div className="absolute -top-6 left-6 w-48 h-24 bg-cyan-400/20 blur-3xl rounded-full" />

                {/* Content */}
                <h3 className="relative z-10 text-xl  md:text-4xl font-bold text-white mb-4 md:mb-8 md:mt-16 ">
                  {isArabic 
                    ? 'لأننا لا نتكيف مع التيار فحسب؛ بل نصنع المستقبل.'
                    : "Because we don't just adapt to the current; we create the future."}
                </h3>

                {/* Gradient divider */}
                <div className=" w-1/4 bg-gradient-to-r from-cyan-400 to-transparent mb-6" />

                <p className="relative z-10 text-gray-200 text-xs sm:text-lg leading-relaxed">
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
      <section className="py-20 px-4 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[#F6FF00] drop-shadow-[0_0_20px_rgba(250,204,21,0.45)]">{isArabic ? 'لماذا ميرك ويف؟' : 'WHY MERKWAVE ?'}</span>
            </h2>
            <p className="text-gray-200 text-xl max-w-3xl mx-auto">
              {isArabic 
                ? 'لأننا لا نتكيف مع التيار فحسب؛ بل نصنع المستقبل.'
                : "Because we don't just adapt to the current; we create the future."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 z-20">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const borderColor = borderColors[index % borderColors.length]; 
              const borderColorBright = borderColorsBright[index % borderColors.length]; 
              const animationSpeed = 0.6 + (index % 5) * 0.15;
              
              return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* dark cyan 155E75 */}
                    {isDesktop && <ElectroBorder  borderColor={'#155E75'} animationSpeed={animationSpeed}>
                      <div  className={`h-full p-8 rounded-2xl shadow-[0_0_20px_rgba(7,234,230,0.6)]  border-2 border-[#00FFFF]  transition-all duration-500  hover:scale-105 hover:shadow-[0_0px_50px_rgba(2,247,255,0.6)]`}>
                        {/* Icon with gradient background */}
                        <div className={`inline-flex p-4 rounded-2xl  mb-6`} style={{ backgroundColor: borderColorBright }}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">
                          {value.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </ElectroBorder>}
                    {!isDesktop && <div  className={`h-full p-8 rounded-2xl shadow-[0_0_20px_rgba(7,234,230,0.6)]  border-2 border-[#00FFFF]  transition-all duration-500  hover:scale-105 hover:shadow-[0_0px_50px_rgba(2,247,255,0.6)]`}>
                        {/* Icon with gradient background */}
                        <div className={`inline-flex p-4 rounded-2xl  mb-6`} style={{ backgroundColor: borderColorBright }}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">
                          {value.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                      }
                  </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 px-4 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl  text-[#00FFFF] mb-4">
              {isArabic ? 'سجلات عملائنا:' : 'Our Client Chronicles:'}
            </h2>
            <p className="text-gray-200 text-xl">
              {isArabic ? 'قصص تجعلنا نبتسم!' : 'Stories that Make Us Smile!'}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-16">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center flex flex-col items-center"
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
                {/* <MotionPathImage /> */}


      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-4xl p-3 md:p-16  text-center flex flex-col"
          >
          <h2 className="text-xl sm:text-2xl md:text-5xl font-bold text-[#F6FF00] mb-6">
                {isArabic ? (
                  <>
                    لنصنع{" "}
                    <motion.span
                      className="inline-block text-4xl"
                      animate={{
                        y: [0, -10, 10, 0],
                        x: [0, 5, -5, 0],
                        rotateY: [0, 10, -10, 0],
                        rotateX: [0, 5, -5, 0],

                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      الموجات
                    </motion.span>
                    
                  </>
                ) : (
                  <>
                    LET'S MAKE{" "}
                    <motion.span
                      className="inline-block text-4xl"
                      animate={{
                        y: [0, -10, 10, 0],
                        x: [0, 5, -5, 0],
                        rotateY: [0, 10, -10, 0],
                        rotateX: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      WAVES
                    </motion.span>
                    
                  </>
                )}

                </h2>
                  <p

                    className="text-sm sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed relative z-10"
                  >
                    {isArabic
                      ? "نساعد الشركات الصغيرة والمتوسطة على النمو من خلال التسويق الرقمي الإبداعي وتطوير البرمجيات المخصصة والاستشارات الاستراتيجية."
                      : "We help SMBs grow with creative digital marketing, bespoke software development, and strategic consulting."}
                  </p>

              <Link href={`/${lang}/contact` as any}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="  inline-flex items-center gap-3 px-3 md:px-10 py-5 bg-[#F6FF00] text-black font-bold text-sm sm:text-lg rounded-full transition-all duration-300 shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60"
                  >
                  <span>{isArabic ? 'لنصنع الموجات.' : "LET'S MAKE WAVES."}</span>
                </motion.button>
              </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </div> 
  );
}
