"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Users,
  Palette,
  MessageCircle,
  Package,
  BookOpen,
  Megaphone,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
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

export default function BrandingClient({
  dict,
  lang,
}: LocalizedComponentProps) {
  const isArabic = lang === "ar";

  const services = [
    {
      icon: Users,
      title: isArabic
        ? "استراتيجية وتموضع العلامة"
        : "Brand Strategy & Positioning",
      description: isArabic
        ? 'تحديد "لماذا" مشروعك. نقوم بمحاذاة مهمتك ورؤيتك وقيمك الأساسية لخلق مساحة فريدة لك في السوق.'
        : 'Defining your "Why." We align your mission, vision, and core values to carve out a unique space in the market.',
      color: "orange",
    },
    {
      icon: Palette,
      title: isArabic ? "الشعار والهوية البصرية" : "Logo & Visual Identity",
      description: isArabic
        ? "ابتكار شعارات أيقونية، لوحات ألوان، وخطوط تجعل علامتك التجارية قابلة للتمييز فوراً."
        : "Crafting iconic logos, color palettes, and typography that make your brand instantly recognizable.",
      color: "cyan",
    },
    {
      icon: MessageCircle,
      title: isArabic
        ? "تسمية العلامة والشعارات"
        : "Naming & Slogan Development",
      description: isArabic
        ? 'ابتكار أسماء قوية وشعارات رنانة - مثل "ابتكار، ارتقاء، سيادة" - تلتصق في أذهان جمهورك.'
        : 'Creating powerful names and taglines—like "Innovate, Elevate, Dominate"—that stick in the minds of your audience.',
      color: "pink",
    },
    {
      icon: Package,
      title: isArabic
        ? "تصميم التغليف والمنتجات"
        : "Packaging & Product Design",
      description: isArabic
        ? "تحويل المنتجات المادية إلى تجارب للعلامة التجارية من خلال تغليف عملي وجذاب بصرياً."
        : "Turning physical products into brand experiences through functional and aesthetically stunning packaging.",
      color: "purple",
    },
    {
      icon: BookOpen,
      title: isArabic ? "أدلة الهوية التجارية" : "Brand Style Guides",
      description: isArabic
        ? 'توفير "كتاب القواعد" لعلامتك التجارية لضمان الاتساق في كل منشور، وثيقة، أو مكتب تابع لك.'
        : 'Providing the "Rulebook" for your brand to ensure consistency across every social media post, document, and office.',
      color: "emerald",
    },
    {
      icon: Megaphone,
      title: isArabic ? "السرد القصصي للعلامة" : "Brand Storytelling",
      description: isArabic
        ? "صياغة رواية تربط عملائك عاطفياً بك، وتحولهم من مجرد مشترين إلى مدافعين عن علامتك التجارية."
        : "Crafting a narrative that connects emotionally with your customers, turning them from buyers into brand advocates.",
      color: "blue",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<
      string,
      { border: string; icon: string; accent: string }
    > = {
      cyan: {
        border: "border-cyan-400/20",
        icon: "text-cyan-400",
        accent: "bg-cyan-400/10",
      },
      emerald: {
        border: "border-emerald-400/20",
        icon: "text-emerald-400",
        accent: "bg-emerald-400/10",
      },
      purple: {
        border: "border-purple-400/20",
        icon: "text-purple-400",
        accent: "bg-purple-400/10",
      },
      orange: {
        border: "border-orange-400/20",
        icon: "text-orange-400",
        accent: "bg-orange-400/10",
      },
      pink: {
        border: "border-pink-400/20",
        icon: "text-pink-400",
        accent: "bg-pink-400/10",
      },
      blue: {
        border: "border-blue-400/20",
        icon: "text-blue-400",
        accent: "bg-blue-400/10",
      },
    };
    return colors[color] || colors.cyan;
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
    <main
      className={`min-h-screen relative bg-[#0d2342] md:bg-[url('/bg-dots.webp')] md:bg-fixed bg-no-repeat bg-cover bg-center  `}
    >
      <div className="absolute inset-0 z-1 backdrop-blur-md bg-black/60"></div>
      {/* Hero Section */}
      <section className="relative py-8 lg:py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-[96%] relative z-10">
          {/* Back Link */}
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

          <div
            className={`flex justify-center items-center gap-12 pt-2 md:pt-24 ${
              isArabic ? "lg:grid-flow-dense" : ""
            }`}
          >
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col items-center`}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <div className="mb-12">
                <Image
                  src="/Branding.png"
                  alt="Branding Wave"
                  width={120}
                  height={120}
                  className="rounded-2xl shadow-lg shadow-pink-500/20"
                />
              </div>

              <h1 className="text-4xl md:text-5xl text-center font-bold mb-6 text-white">
                {isArabic ? (
                  <>
                    <span className="block font-bold mb-3 text-[#F6FF00]">
                      ارتقِ بحضورك
                    </span>
                    <span className="block font-medium">
                      استراتيجيات بناء الهوية والعلامة التجارية
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block font-bold mb-3 text-[#F6FF00]">
                      Elevate Your Presence
                    </span>
                    <span className="block font-medium">
                      Strategic Branding & Identity
                    </span>
                  </>
                )}
              </h1>

              <p className="text-gray-300 max-w-[280px] sm:max-w-screen text-sm md:text-lg leading-relaxed mb-12 text-center">
                {isArabic
                  ? "تطوير هوية علامة تجارية قوية ومتماسكة تتردد مع جمهورك وتتميز في السوق."
                  : "Develop a strong, cohesive brand identity that resonates with your audience and stands out in the market."}
              </p>

              <Link href={`/${lang}/contact` as any}>
                <button className="px-2 md:px-8 py-4 bg-gradient-to-r text-sm sm:text-lg from-amber-400 via-yellow-400 to-yellow-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic
                    ? "احصل على استشارة العلامة التجارية"
                    : "Get a Brand Consultation"}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branding Expertise Section */}
      <section className=" px-4 z-20">
        <div className="container mx-auto max-w-[96%] -mb-4">
          <div className="relative  space-y-2 z-20 ">
            <Timeline
              titleText={
                isArabic
                  ? "خبرتنا في العلامات التجارية"
                  : "Our Branding Expertise"
              }
              subtitleText={
                isArabic
                  ? "حلول علامات تجارية شاملة لإنشاء حضور فريد في السوق"
                  : "Comprehensive branding solutions to establish your unique market presence"
              }
              data={timelineData}
              isArabic={isArabic}
              accentColor="#F6FF00"
            />
          </div>
        </div>
      </section>

      {/* Why Branding Matters Section */}

      <section
        className="
    relative z-20 py-24 px-4
    bg-gradient-to-b
    from-transparent
    via-[#060912]/90
    to-transparent
  "
      >
        <div className="container mx-auto flex flex-col max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-20 flex flex-col items-center justify-center">
              <h2
                className="
            text-2xl sm:text-3xl md:text-4xl font-bold h-full py-4
            bg-clip-text text-transparent
            bg-gradient-to-r from-amber-400 via-yellow-400 to-yellow-500
            mb-6 text-center
          "
              >
                {isArabic
                  ? "ما وراء البصريات: هندسة الأثر"
                  : "How Brand Identity Creates Real Impact"}
              </h2>

              <p className="text-gray-400 text-md sm:text-lg leading-relaxed text-center">
                {isArabic
                  ? "نحن لا نصمم فقط، بل نبني أنظمة بصرية تتفاعل مع جمهورك وتترك أثرًا طويل الأمد."
                  : "We don’t just design visuals — we build brand systems that interact, resonate, and leave a lasting impression."}
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  color: "cyan",
                  titleAr: "الثقة والمصداقية",
                  titleEn: "Trust & Credibility",
                  descAr:
                    "في أسواق تنافسية مثل السعودية ومصر، الهوية المصقولة تعني أنك منافس حقيقي، مما يبني سلطة فورية لعلامتك.",
                  descEn:
                    "In competitive markets like KSA and Egypt, a polished identity signals that you are a serious player, building instant authority.",
                },
                {
                  icon: Sparkles,
                  color: "violet",
                  titleAr: "حضور متميز",
                  titleEn: "Distinct Presence",
                  descAr:
                    "نضمن لعلامتك ألا تكتفي بالانضمام إلى الحوار، بل تقوده بلغة بصرية ولفظية فريدة.",
                  descEn:
                    "We ensure your brand doesn't just join the conversation—it leads it with a unique visual and verbal language.",
                },
                {
                  icon: HeartHandshake,
                  color: "indigo",
                  titleAr: "عامل السيادة",
                  titleEn: "The Domination Factor",
                  descAr:
                    "الهوية التجارية هي أساس النمو. من خلال الارتقاء بصورتك، نوفر لك المنصة التي تحتاجها للسيادة في مجالك.",
                  descEn:
                    "Branding is the foundation of growth. By elevating your image, we provide the platform you need to dominate your industry.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="
                group relative
                p-8 rounded-2xl
                border border-white/10
                bg-gradient-to-br from-[#0b1020] via-[#070b1a] to-[#03050f]
                backdrop-blur-xl
                overflow-hidden
              "
                  >
                    {/* Glow */}
                    <div
                      className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition duration-700
                  bg-gradient-to-br
                  from-${item.color}-500/20
                  via-transparent
                  to-transparent
                `}
                    />

                    {/* Icon */}
                    <div
                      className={`
                  relative z-10
                  w-16 h-16 mb-6 mx-auto
                  rounded-xl
                  bg-${item.color}-500/10
                  flex items-center justify-center
                  shadow-[0_0_30px_-10px_var(--tw-${item.color}-500)]
                `}
                    >
                      <Icon className={`w-8 h-8 text-${item.color}-400`} />
                    </div>

                    {/* Content */}
                    <h3
                      className="relative z-10 text-xl font-semibold text-white mb-3"
                      dir={isArabic ? "rtl" : "ltr"}
                    >
                      {isArabic ? item.titleAr : item.titleEn}
                    </h3>

                    <p
                      className="relative z-10 text-gray-400 leading-relaxed"
                      dir={isArabic ? "rtl" : "ltr"}
                    >
                      {isArabic ? item.descAr : item.descEn}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-4 ">
        <div className="container  mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-20 px-2 py-12 md:p-12 rounded-2xl to-transparent backdrop-blur-sm text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {isArabic
                ? "هل أنت مستعد لبناء علامة تجارية سائدة؟"
                : "Ready to Build a Dominant Brand?"}
            </h2>
            <p className="text-gray-300 text-md sm:text-lg mb-8 max-w-2xl mx-auto">
              {isArabic
                ? "لنحول رؤيتك إلى تحفة بصرية تترك أثراً وتحقق نتائج."
                : "Let’s transform your vision into a visual masterpiece that resonates and converts."}
            </p>
            <Link href={`/${lang}/contact` as any}>
              <button className="px-2 md:px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-yellow-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105">
                {isArabic
                  ? "ابدأ رحلة بناء علامتك الآن"
                  : "Start Your Brand Journey"}
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
