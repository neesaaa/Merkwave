"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Globe as gb,
  Boxes,
  Code2,
  Cloud,
  Smartphone,
  LayoutDashboard,
  Workflow,
  Link2,
  Palette,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import { Timeline } from "@/components/Timeline";
import Globe from "@/components/Globe";
import { useEffect, useState } from "react";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export default function SoftwareClient({
  dict,
  lang,
}: LocalizedComponentProps) {
  const isArabic = lang === "ar";

  const services = [
    {
      icon: Boxes,
      title: isArabic ? "تنفيذ نظام أودو ERP" : "Odoo ERP Integration",
      description: isArabic
        ? "تنفيذ نظام أودو الرسمي: إعداد متكامل للمحاسبة، المبيعات، والمخازن وكل تطبيقات أودو الأخرى لتبسيط عملياتك التشغيلية."
        : "Official Odoo implementation including Accounting, CRM, Inventory, and all Odoo apps to streamline operations.",
      color: "cyan",
    },
    {
      icon: Code2,
      title: isArabic ? "تطوير برمجيات مخصصة" : "Custom Software Development",
      description: isArabic
        ? "هندسة حلول برمجية فريدة وقابلة للتوسع مصممة خصيصاً لحل تحديات عملك."
        : "Engineering bespoke, scalable software solutions tailored to your specific business challenges.",
      color: "emerald",
    },
    {
      icon: Cloud,
      title: isArabic ? "الاستضافة السحابية المُدارة" : "Managed Cloud Hosting",
      description: isArabic
        ? "استضافة عالية الأداء لنظام أودو وتطبيقات الشركات مع ضمان تشغيل 99.9% ونسخ احتياطي دوري."
        : "High-performance managed hosting for Odoo and enterprise apps with 99.9% uptime and daily backups.",
      color: "purple",
    },
    {
      icon: Smartphone,
      title: isArabic ? "تطبيقات الموبايل" : "Mobile App Development",
      description: isArabic
        ? "تطوير تطبيقات جوال ذكية (iOS & Android) تعزز تفاعل المستخدمين وتدفع بالنمو."
        : "Developing native and cross-platform mobile apps that boost engagement and drive growth.",
      color: "orange",
    },
    {
      icon: LayoutDashboard,
      title: isArabic ? "بوابات الويب للمؤسسات" : "Enterprise Web Portals",
      description: isArabic
        ? "بناء منصات ويب آمنة ومحركات تجارة إلكترونية تتحمل ضغط الزيارات العالي."
        : "Building secure, high-traffic web platforms and enterprise-grade e-commerce portals.",
      color: "cyan",
    },
    {
      icon: Workflow,
      title: isArabic
        ? "أتمتة العمليات الإدارية"
        : "Business Process Automation",
      description: isArabic
        ? "تحويل مسارات العمل الداخلية المعقدة إلى أنظمة رقمية مؤتمتة تقلل الجهد اليدوي."
        : "Automating complex internal workflows to reduce manual work and increase efficiency.",
      color: "purple",
    },
    {
      icon: Link2,
      title: isArabic ? "الربط المتكامل للأنظمة" : "API Integration",
      description: isArabic
        ? "ربط نظام أودو بالأدوات الخارجية والـ APIs لخلق بيئة بيانات موحدة."
        : "Seamless integration between Odoo ERP and third-party tools through secure APIs.",
      color: "yellow",
    },
    {
      icon: Palette,
      title: isArabic ? "تصميم واجهة وتجربة المستخدم" : "UI / UX Design",
      description: isArabic
        ? "تصميم واجهات بديهية تركز على المستخدم وتجعل البرمجيات المعقدة سهلة الاستخدام."
        : "User-centric UI/UX design that makes complex enterprise software intuitive and easy to use.",
      color: "cyan",
    },
    {
      icon: LifeBuoy,
      title: isArabic ? "الصيانة والدعم الفني" : "Maintenance & Tech Support",
      description: isArabic
        ? "دعم فني مخصص ومستمر لضمان بقاء أنظمتك آمنة، محدثة، وفعالة دائماً."
        : "Dedicated ongoing support to keep your systems secure, updated, and running smoothly.",
      color: "pink",
    },
    {
      icon: ShieldCheck,
      title: isArabic
        ? "الاستشارات والتدقيق التقني"
        : "Technical Consulting & Auditing",
      description: isArabic
        ? "استشارات استراتيجية حول التحول الرقمي، أمن الأنظمة، وخرائط الطريق التقنية."
        : "Strategic consulting on digital transformation, system security, and technology roadmaps.",
      color: "pink",
    },
  ];
  const technologies = [
    {
      name: "React.js",
      description: isArabic
        ? "مكتبة JavaScript لبناء واجهات المستخدم."
        : "A JavaScript library for building user interfaces.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <ellipse
            cx="12"
            cy="12"
            rx="8"
            ry="3"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="8"
            ry="3"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="8"
            ry="3"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            transform="rotate(120 12 12)"
          />
        </svg>
      ),
      color: "cyan",
    },
    {
      name: "Node.js",
      description: isArabic
        ? "بيئة تشغيل JavaScript مبنية على محرك Chrome V8 JavaScript."
        : "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.12-.21V7.71c0-.09.04-.17.12-.21l7.44-4.29c.07-.04.19-.04.27 0l7.44 4.29c.08.04.12.12.12.21v8.58c0 .08-.04.16-.12.21l-7.44 4.29c-.08.04-.2.04-.27 0L9.9 19.77c-.07-.03-.17-.04-.24-.01-.63.35-.76.4-1.35.6-.14.05-.35.12.07.34l2.26 1.34c.24.14.5.2.78.2.27 0 .54-.07.77-.2l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.77-.2z" />
        </svg>
      ),
      color: "emerald",
    },
    {
      name: "Python (Django/Flask)",
      description: isArabic
        ? "أطر عمل قوية لتطوير الويب السريع وواجهات برمجة التطبيقات."
        : "Powerful frameworks for rapid web development and APIs.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 3 7.647 3l-.006 2.347h4.363v.617H5.937s-2.927-.332-2.927 4.282c0 4.613 2.55 4.446 2.55 4.446h1.524v-2.144s-.083-2.55 2.501-2.55zm-.195-5.925a.83.83 0 1 1 0-1.66.83.83 0 0 1 0 1.66z" />
          <path d="M18.452 9.429h-1.524v2.144s.083 2.551-2.501 2.551h-4.328s-2.432-.04-2.432 2.35v3.951S7.298 23 12.076 23c4.574 0 4.289 0 4.289 0l.006-2.347h-4.363v-.617h6.067s2.927.332 2.927-4.282c0-4.613-2.55-4.446-2.55-4.446zm-4.134 10.429a.83.83 0 1 1 0 1.66.83.83 0 0 1 0-1.66z" />
        </svg>
      ),
      color: "blue",
    },
    {
      name: "Laravel",
      description: isArabic
        ? "إطار عمل PHP أنيق لبناء تطبيقات ويب قوية."
        : "An elegant PHP framework for building robust web applications.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.048-.096.338.338 0 01.062-.08c.008-.01.018-.017.027-.024l.006-.007.02-.014L4.972.185c.117-.067.261-.067.377 0l4.436 2.56.02.014.007.008c.01.008.018.016.026.025a.316.316 0 01.062.08.367.367 0 01.048.096c.005.012.01.021.015.033.01.031.014.064.014.098v9.652l3.696-2.132V5.527c0-.033.004-.066.013-.098.004-.013.01-.021.015-.033a.372.372 0 01.048-.095.336.336 0 01.062-.08c.009-.01.018-.018.026-.025l.007-.007.02-.014 4.436-2.56a.376.376 0 01.377 0l4.435 2.56.02.014.006.006c.01.008.018.017.027.025a.316.316 0 01.062.08.374.374 0 01.048.096c.005.012.01.021.014.033zM23.273 9.806V6.23l-1.555.898-2.14 1.235v3.574l3.695-2.131zm-4.074 7.17v-3.574l-2.106 1.199-6.901 3.92v3.61l9.007-5.155zM1.91 3.64v14.81l8.64 4.974v-3.61l-4.315-2.44-.006-.005-.008-.004a.312.312 0 01-.065-.052l-.004-.003-.003-.003a.319.319 0 01-.063-.076c-.003-.005-.003-.01-.007-.015a.367.367 0 01-.044-.098c-.002-.008-.006-.015-.008-.023a.371.371 0 01-.013-.108V5.728L3.465 4.53 1.91 3.64zm5.014.854l-3.695 2.13 3.695 2.133 3.695-2.132-3.695-2.131zM10.9 17.33l2.14-1.235V5.527l-1.55.893-2.14 1.234v10.565l1.55-.89zm8.644-12.196l-3.695 2.131 3.695 2.133 3.694-2.132-3.694-2.132zm-.188 4.542l-2.14-1.235-1.555-.898v3.574l2.14 1.235 1.555.899V9.676zm-4.636 10.448l6.695-3.807V5.527l-1.555.898-2.14 1.235v10.565l-3 1.7z" />
        </svg>
      ),
      color: "red",
    },
    {
      name: "Next.js",
      description: isArabic
        ? "إطار عمل React لتطبيقات الويب على مستوى الإنتاج."
        : "A React framework for production-grade web applications.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-1.511-2.303-1.512-2.303v-1.743c0-.953.005-1.763.013-1.802a.534.534 0 0 1 .184-.298c.113-.074.133-.076.665-.076h.426z" />
        </svg>
      ),
      color: "white",
    },
    {
      name: "MongoDB",
      description: isArabic
        ? "قاعدة بيانات NoSQL شهيرة لتطبيقات الويب الحديثة."
        : "A popular NoSQL database for modern web applications.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 4.877-3.582 4.292-11.375zm-5.336 11.73a11.56 11.56 0 01-.481-.36c-.922-.728-1.988-2.064-2.066-3.93l-.001-.022c.062 1.07.58 2.01 1.551 2.81.943.774 2.537 1.502 3.29 1.91-.447.732-.726 1.037-1.145 1.328a11.823 11.823 0 01-1.148-.736z" />
        </svg>
      ),
      color: "emerald",
    },
    {
      name: "Angular",
      description: isArabic
        ? "منصة لبناء تطبيقات عميل أحادية الصفحة."
        : "A platform for building single-page client applications.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.93 12.645h4.134L12 7.67l-2.07 4.975zm-1.374 3.31L7.18 19.5h2.052l.65-1.726h4.236l.65 1.726h2.052l-1.375-3.545H8.556zM11.996.005L.606 3.992l1.737 14.948 9.653 5.055 9.653-5.055 1.737-14.948L11.996.005z" />
        </svg>
      ),
      color: "red",
    },
    {
      name: "Odoo",
      description: isArabic
        ? "نظام إدارة أعمال شامل مفتوح المصدر."
        : "A comprehensive open‑source business management system.",
      iconPath: (
        <Image
          src="/odoo.svg"
          alt="Odoo Logo"
          className="w-12 h-12"
          width={12}
          height={12}
        />
      ),
      color: "purple",
    },
    {
      name: "PostgreSQL",
      description: isArabic
        ? "قاعدة بيانات علائقية قوية ومفتوحة المصدر."
        : "A powerful, open source object-relational database system.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-.7325-.1778-.2413.1545-.3174.4782-.166.7195.0563.0954.1464.1618.2621.1934.1151.0324.2375.0115.3403-.0595.1123-.077.1816-.1964.1816-.3222 0-.0485-.0083-.0962-.0292-.1343zm-6.4692 5.0418c-.0232.0168-.0232.0924 0 .1095.0253.0174.0674.0227.0987.0068.0311-.0161.0311-.0925 0-.1096-.0313-.0166-.0734-.0227-.0987-.0067zm.7394.9035c-.0258.0063-.0381.0327-.0369.0714.0016.0384.0174.0618.0445.0663.0283.0049.0512-.0155.053-.0538.0018-.0388-.0148-.0682-.0396-.0738-.0102-.0023-.0179-.0023-.021-.0101zm-.4153-.3392c-.0058.0031-.0073.0158-.0043.0281.0033.0122.0124.0196.0206.0166.0086-.0024.0104-.0139.0071-.0264-.0031-.0123-.012-.0202-.0234-.0183zm.2424.0327c-.0035.0092.0033.0178.0164.0206.0128.0025.0256-.0015.0291-.0101.0031-.0089-.0038-.0175-.0166-.0204-.0127-.0024-.0253.0017-.0289.0099zm.6181.0169c-.0038.009.0051.0184.0212.0219.0156.0033.0298-.0009.0339-.0098.004-.009-.0048-.0184-.0209-.0219-.0158-.0031-.0301.001-.0342.0098zm.6082-.3659c-.0033.0092.0072.0189.0247.0229.0167.0039.0322-.0003.0358-.0096.0035-.0095-.0068-.0193-.0238-.0232-.0166-.0036-.0324.0006-.0367.0099zm-2.7934-.0428c-.0141.0013-.0246.0137-.0232.0297.0015.0155.0136.0262.0276.0244.014-.0015.0241-.014.0227-.0295-.0015-.0154-.0131-.0261-.0271-.0246z" />
          <path d="M17.0504 6.8781c-.1462-.5378-.3195-1.1602-.5111-1.8049-.1916-.6447-.3946-1.2927-.5965-1.9313-.1963-.6383-.3946-1.2767-.5809-1.9144-.1862-.6373-.3546-1.2741-.4945-1.8913-.0703-.3087-.1339-.6024-.1889-.8765-.0556-.274-.099-.5318-.1339-.7654-.0697-.4677-.112-.8396-.136-1.0902-.0239-.2506-.0239-.381-.0239-.381s-.0366.1279-.1035.3774c-.0678.2506-.1602.6163-.2864 1.0782-.063.2311-.1339.4835-.2148.7573-.0816.2738-.1716.5685-.2721.8792-.2006.6209-.4444 1.2659-.6993 1.9109-.2549.645-.5226 1.2906-.7902 1.9264-.2612.636-.5295 1.2627-.7747 1.8574-.2458.5952-.4631 1.1542-.6279 1.6525-.0812.2477-.1531.4827-.2148.7002-.0615.2176-.1125.4139-.1525.5865-.0812.348-.1339.6262-.1801.8181-.0456.1919-.0719.3024-.0719.3024s.031-.1076.0911-.2995c.0598-.1919.1525-.4677.2676-.8112.0574-.172.1262-.363.2006-.5723.0744-.2093.1531-.438.2439-.6801.181-.4868.415-1.0336.6802-1.6164.2661-.5828.5561-1.1999.8641-1.8289.3079-.6285.6331-1.267.9573-1.8984.3242-.6308.6445-1.2547.9412-1.854.1494-.2989.2864-.5926.4126-.8765.1262-.2843.2379-.5591.3429-.8223.2031-.527.3799-1.0167.5226-1.4519.1444-.4357.2549-.8146.3373-1.1075.0824-.2929.1339-.5008.1792-.6155.0448-.1146.0668-.1733.0668-.1733s.1753.8907.4662 2.3776c.1454.7434.3195 1.6111.5111 2.5611.1916.9496.3946 1.9813.5965 3.0443.2024 1.063.3946 2.1572.5809 3.2513.1862 1.0942.3546 2.1879.4945 3.2394.0703.5258.1339 1.0408.1889 1.5406.0556.4999.099 1.0027.1339 1.4711.0697.9373.112 1.7965.136 2.5611.0239.7651.0239 1.4355.0239 1.9932v.7579c0 .2929-.007.5715-.0175.834-.0099.2621-.031.5135-.0494.7472-.0366.4672-.0838.8771-.1262 1.2188-.0239.1713-.0478.3245-.0668.4599-.0197.1354-.0394.2522-.0556.3501-.0366.1948-.0662.3272-.0662.3272s-.0302-.1324-.0838-.3716c-.0543-.2397-.1262-.5829-.2148-.9996-.0444-.2081-.0954-.4381-.1531-.6855-.0571-.2477-.1195-.5142-.1954-.7958-.1465-.5636-.3242-1.204-.5226-1.9026s-.415-1.4533-.6506-2.2576c-.1189-.4017-.2379-.8181-.3662-1.2331-.1274-.415-.2611-.8373-.3946-1.2698-.2661-.8646-.5445-1.7568-.8117-2.6579-.2676-.9011-.5226-1.8109-.7583-2.7032-.2379-.8923-.4508-1.7759-.6516-2.6361-.2006-.8602-.3742-1.6881-.5226-2.4659-.074-.3892-.1393-.7607-.1963-1.1132-.0556-.3525-.1035-.6748-.1454-.9748-.0838-.6011-.1454-1.1132-.1885-1.5094-.0436-.3962-.0662-.6011-.0662-.6011zM4.8588 8.5337c-.0436-.0106-.1045.014-.1453.0685-.0413.054-.0479.1268-.0127.1617.035.0355.0961.0382.1367-.0104.0401-.0486.0645-.1093.0213-.1575-.0212-.0237-.0579-.0381-.1-.0623zm15.775 8.4784c-.0141.0055-.0232.024-.0232.0486 0 .0313.0197.0588.0479.0588.0292 0 .0494-.0272.0494-.0588 0-.0313-.0232-.0588-.053-.0588-.0096 0-.0141.0055-.0211.0102z" />
        </svg>
      ),
      color: "blue",
    },
    {
      name: "AWS",
      description: isArabic
        ? "خدمات حوسبة سحابية رائدة لبنية تحتية ويب قابلة للتوسع."
        : "Leading cloud computing services for scalable web infrastructure.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.031-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.191l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.168.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.08-.215-.168-.247-.24a.583.583 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.415-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.814a1.902 1.902 0 01-.391-1.165c0-.335.072-.631.215-.886.144-.255.335-.479.575-.654.239-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256-.063 0-.167-.024-.303-.08-.48-.216-1.021-.32-1.628-.32-.455 0-.815.072-1.062.224-.248.151-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.575.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
        </svg>
      ),
      color: "orange",
    },
    {
      name: "Azure",
      description: isArabic
        ? "منصة الحوسبة السحابية من Microsoft لبناء ونشر التطبيقات."
        : "Microsoft's cloud computing platform for building and deploying applications.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.11 5.634l-6.268 15.73a1.5 1.5 0 01-1.393.969H2.358L11.03 2.417a1.5 1.5 0 011.393-.917h7.314a1.5 1.5 0 011.373 2.134zM17.16 19.5H24L15.33 4.5h-1.935l3.765 15z" />
        </svg>
      ),
      color: "blue",
    },
    {
      name: "Docker",
      description: isArabic
        ? "منصة لتطوير وشحن وتشغيل التطبيقات باستخدام الحاويات."
        : "Platform for developing, shipping, and running applications using containerization.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.09-.73-2.347-2.39-3.437-2.448-3.473l-.462-.252-.298.467c-.51.876-.77 1.935-.652 3.018.094.683.25 1.316.59 1.877-.43.252-.915.417-1.45.417H.948c-.411 0-.747.336-.747.747 0 1.336.215 2.672.646 3.963.46 1.38 1.215 2.347 2.244 2.876 1.103.566 2.684.85 4.302.85 3.04 0 5.545-1.017 7.247-2.945 1.64-1.856 2.547-4.383 2.547-7.107l.051-.025c.734-.357 1.228-.778 1.475-1.26.204-.397.247-.732.247-.732l-.032-.072a.001.001 0 00-.002 0l-.098.076z" />
        </svg>
      ),
      color: "cyan",
    },
    {
      name: "Kubernetes",
      description: isArabic
        ? "نظام مفتوح المصدر لأتمتة نشر وإدارة التطبيقات المحتواة."
        : "An open-source system for automating deployment and management of containerized applications.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.853-1.057L11.225.174a1.613 1.613 0 0 1 1.55 0l8.271 4.342c.428.193.745.587.853 1.057l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.005-.142-.02-.3-.231-.548-.526-.548s-.506.249-.527.548a1.88 1.88 0 0 0-.004.142c.006.177.044.312.067.475.042.348.078.637.056.905-.02.135-.098.188-.162.25l-.007.211a6.424 6.424 0 0 0-4.166 2.003c-.053-.038-.12-.09-.189-.135-.055.002-.211.021-.309-.034-.223-.151-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349a2.691 2.691 0 0 0-.111-.089.594.594 0 0 0-.745.046c-.172.215-.117.544.123.735.034.027.078.065.111.089.142.105.272.159.414.242.299.184.546.337.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.896.147-.164.014-.305.006-.48.039-.039.008-.109.024-.144.033-.25.063-.423.304-.385.577.039.274.283.461.543.418.036-.006.1-.02.138-.028.179-.036.327-.058.503-.07.375-.026.696-.03.962.007.118.027.239.062.282.179l.217.038a6.51 6.51 0 0 0 2.88 3.596l-.09.182c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.015.591.248.7.263.108.575-.042.696-.329.017-.04.037-.104.052-.142.07-.173.096-.331.144-.544.1-.451.183-.815.338-1.108.07-.13.186-.181.282-.185l.14-.15a6.317 6.317 0 0 0 1.862.28 6.28 6.28 0 0 0 2.21-.4l.127.134c.08.002.19.052.284.182.155.293.238.657.338 1.108.048.213.075.371.144.544.015.038.035.102.052.142.121.287.433.437.696.33.263-.11.376-.426.248-.701-.019-.039-.044-.097-.064-.134-.083-.157-.177-.263-.268-.399-.19-.296-.355-.561-.452-.813-.025-.083.011-.198.044-.282-.035-.061-.059-.115-.09-.182a6.51 6.51 0 0 0 2.88-3.596c.064-.01.176-.03.215-.039.068-.137.175-.161.283-.178.266-.037.587-.033.962-.007.176.012.324.034.503.07.038.008.101.021.137.028.26.043.505-.144.543-.418.038-.273-.135-.514-.385-.577zM12.09 16.865l-.36-1.342a1.2 1.2 0 0 0-.254-.089l-1.428.265-.357.066a1.2 1.2 0 0 1-.165-.092l-.88-1.043c-.073-.087-.14-.174-.207-.262l-.003-.004-.003-.004a5.195 5.195 0 0 0 .238-1.549l1.214-.326.018-.005a1.2 1.2 0 0 0 .115-.291l.001-.004c.002-.01.005-.02.007-.031l.05-1.449a1.2 1.2 0 0 1 .131-.191c.45-.603 1.146-.958 1.91-.975.765.017 1.46.372 1.91.975.044.058.087.117.128.178l.003.013.048 1.462a1.2 1.2 0 0 0 .116.291l.018.005 1.214.326a5.194 5.194 0 0 0 .238 1.549l-.003.004-.003.004c-.067.088-.134.175-.207.262l-.88 1.043a1.2 1.2 0 0 1-.165.092l-.357-.066-1.428-.265a1.2 1.2 0 0 0-.254.089l-.36 1.342a5.17 5.17 0 0 1-1.778 0zm3.384-4.678l-.003.01a.44.44 0 0 0 .484-.607l.004-.005 2.578.437a5.171 5.171 0 0 1-2.075 2.597l-.999-2.413.011-.019zm.977-2.422l-1.961 1.754a.44.44 0 0 0-.173.757l.002.009 2.514.725a5.143 5.143 0 0 0-.73-3.255l.348.01z" />
        </svg>
      ),
      color: "blue",
    },
    {
      name: "GraphQL",
      description: isArabic
        ? "لغة استعلام لواجهات برمجة التطبيقات ووقت تشغيل لبناء تلك الواجهات."
        : "A query language for APIs and a runtime for building those APIs.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.002 0a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.54 4.931a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm0 9.862a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zM3.46 4.931a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zM2.138 12c0 .602.25 1.146.654 1.532l-4.116 7.113A2.137 2.137 0 1 0 2.8 22.3l4.116-7.113c.206.027.418.042.634.042.489 0 .95-.102 1.37-.287l4.116 7.113a2.138 2.138 0 1 0 3.645-2.242L12.564 12.7c.377-.385.61-.904.61-1.481 0-.602-.25-1.146-.654-1.532l4.116-7.113A2.137 2.137 0 1 0 13.036.33L8.92 7.443a2.134 2.134 0 0 0-1.37-.287L3.434.043A2.137 2.137 0 1 0-.21 2.285l4.116 7.113A2.134 2.134 0 0 0 3.252 11c0 .602.25 1.146.654 1.532l-4.116 7.113A2.137 2.137 0 1 0 3.434 21.89l4.116-7.113c.206.027.418.042.634.042.489 0 .95-.102 1.37-.287l4.116 7.113a2.138 2.138 0 1 0 3.645-2.242L13.2 12.286a2.134 2.134 0 0 0 .654-1.532c0-.602-.25-1.146-.654-1.532l4.116-7.113A2.137 2.137 0 1 0 13.672.866L9.556 7.979a2.134 2.134 0 0 0-1.37-.287L3.434.579A2.137 2.137 0 1 0-.21 2.821l4.116 7.113A2.134 2.134 0 0 0 3.252 11.536z" />
        </svg>
      ),
      color: "red",
    },
    {
      name: "RESTful APIs",
      description: isArabic
        ? "معيار لتصميم تطبيقات الشبكة لتواصل بيانات فعال."
        : "Standard for designing networked applications for efficient data communication.",
      iconPath: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.84 4.67h1.68v2.168h-1.68V4.67zm-3.36 1.512h1.68v2.52h-1.68v-2.52zm6.72 0h1.68v2.52h-1.68v-2.52zM7.8 8.85h1.68v2.52H7.8v-2.52zm3.36 0h1.68v2.52h-1.68V8.85zm3.36 0h1.68v2.52h-1.68V8.85zm-6.72 3.36h1.68v2.52H7.8v-2.52zm3.36 0h1.68v2.52h-1.68v-2.52zm3.36 0h1.68v2.52h-1.68v-2.52zm-3.36 3.36h1.68v2.52h-1.68v-2.52z" />
        </svg>
      ),
      color: "gray",
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial value
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Listen for resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <main
      className={`min-h-screen max-w-screen overflow-x-hidden relative flex flex-col bg-[#0d2342] md:bg-[url('/bg-dots.webp')] bg-scroll md:bg-fixed bg-no-repeat bg-cover bg-center `}
    >
      <div className="absolute inset-0 z-1 backdrop-blur-lg md:backdrop-blur-md  bg-black/40"></div>

      {/* Hero Section */}

      <section className="flex  items-center justify-center flex-col pb-4 px-4 py-12 z-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-[96%] relative  flex flex-col z-20">
          <Link
            href={`/${lang}/services` as any}
            className={`inline-flex items-center text-[#00FFFF] hover:text-cyan-300 transition-colors md:mb-8 `}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <ArrowLeft
              className={`w-5 h-5 ${isArabic ? "ml-2 rotate-180" : "mr-2"}`}
            />
            {isArabic ? "العودة إلى الخدمات" : "Back to Services"}
          </Link>
          <div className={`flex self-center items-center justify-center mb-4 md:mb-24`}>
            {/* Left Content */}
            {/* Back Link */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              dir={isArabic ? "rtl" : "ltr"}
              className="flex flex-col items-center justify-center  text-center"
            >
              <div className="mb-8 flex h-full w-full pt-16 justify-center">
                <motion.div className=" w-full">
                  <Globe
                    theta={0.2}
                    dark={1}
                    scale={isMobile ? 0.7 : 1.2}
                    diffuse={1.5}
                    baseColor="#009999"
                    markerColor="#ff0000"
                    glowColor="#444444"
                  />
                </motion.div>
              </div>

              <h1 className="max-w-[280px] sm:max-w-screen text-4xl md:text-5xl  text-center font-bold mb-6">
                {" "}
                <span className="text-[#00FFFF] mb-1">
                  {isArabic ? "ابتكر في عملياتك" : "Innovate Your Operations "}
                </span>
                <br />
                <span className="text-md md:text-3xl text-white">
                                    {isArabic
                    ? "خلال البرمجيات المخصصة ونظام أودو"
                    : "Custom Software & Odoo"}
                </span>
              </h1>

              <p className="text-gray-300  max-w-[280px] sm:max-w-screen text-md sm:text-base  md:text-lg  mb-8 text-center break-words ">
                {isArabic
                  ? "نحن نصمم حلولاً برمجية ذكية، آمنة وقابلة للتوسع. بصفتنا شريك أودو الرسمي، نردم الفجوة بين احتياجات العمل المعقدة والتنفيذ الرقمي السلس"
                  : "We engineer scalable, secure, and intelligent software solutions. As an Official Odoo Partner, we bridge the gap between complex business needs and seamless digital execution."}
              </p>

              <Link
                href={`/${lang}/contact` as any}
                className="flex justify-center"
              >
                <button className="px-2 md:px-8 py-4 bg-gradient-to-r text-sm sm:text-lg  from-cyan-400 to-sky-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105">
                  {isArabic
                    ? "ابدأ رحلتك البرمجية"
                    : "Start Your Software Journey"}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-Spectrum Services Section */}
      <section className=" px-4 z-20">
        <div className="container mx-auto max-w-[96%] -mb-4">
          <div className="relative  space-y-2">
            <Timeline
              titleText={
                isArabic
                  ? "خدمات تطوير الويب الشاملة"
                  : "Our Full-Spectrum Web Development Services"
              }
              subtitleText={
                isArabic
                  ? "حلول ويب شاملة لإنشاء تواجدك الرقمي"
                  : "Comprehensive web solutions to establish your digital presence"
              }
              data={timelineData}
              isArabic={isArabic}
              accentColor="#00ffff"
            />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 z-20 px-4 bg-gradient-to-b from-transparent via-[#0a0f1e]/50 to-transparent">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#00FFFF] ">
                {isArabic
                  ? "التقنيات والأطر الأساسية"
                  : "Our Core Technologies & Frameworks"}
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              {isArabic
                ? "تقنيات متطورة تضمن لك السيادة في السوق"
                : "Cutting-Edge Tech for Market Dominance"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies.map((tech, index) => {
              const colors = getColorClasses(tech.color);

              // Check for Odoo to apply special UI
              if (tech.name === "Odoo") {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: [0, 1, -1, 0] }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.03,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -10, scale: 1.08, rotate: 2 }}
                    className="group relative p-6 rounded-3xl bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-700 text-white shadow-2xl hover:shadow-[0_20px_60px_rgba(128,90,213,0.5)] cursor-pointer transition-all duration-500"
                  >
                    <Link href={`/${lang}/services/software/odoo` as never}>
                      {/* Glow / floating shine */}
                      <div
                        className="absolute inset-0 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 70%)",
                        }}
                      />

                      <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Logo container with subtle hover scale */}
                        <div className="w-24 h-12 mb-4 relative">
                          <div className="absolute inset-0 rounded-full bg-purple-400 opacity-10 blur-xl group-hover:scale-110 transition-transform duration-500" />
                          <Image
                            src="/odoo.svg"
                            alt="Odoo Logo"
                            width={48}
                            height={48}
                            className="relative w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Name and description */}
                        <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                          Odoo
                        </h3>
                        <p className="mt-2 text-sm md:text-base text-gray-100  leading-snug">
                          {tech.description ||
                            (isArabic
                              ? "نظام إدارة أعمال شامل مفتوح المصدر."
                              : "A comprehensive open-source business management system.")}
                        </p>

                        {/* Bottom accent line */}
                        <div className="mt-4 h-1 w-10 rounded-full bg-white/40 group-hover:bg-white/60 transition-all duration-300" />
                      </div>
                    </Link>
                  </motion.div>
                );
              }

              // Default card for other technologies
              return (
                <motion.div
                  key={index}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.02 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className={`group relative p-4 md:p-6 rounded-xl border ${colors.border}  bg-gradient-to-br from-[#0f1729]/60 via-[#0a0f1e]/40 to-[#050812]/20 backdrop-blur-lg hover:from-[#0d1220]/85 hover:via-[#070b15]/60 hover:to-[#030509]/35 transition-all duration-200 cursor-pointer`}
                >
                  {/* Animated shine effect */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Icon container with enhanced styling */}
                    <div className="relative mb-3 md:mb-4">
                      <div
                        className={`absolute inset-0 rounded-lg ${colors.accent} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-200`}
                      />
                      <div
                        className={`relative w-24 h-24 md:w-14 md:h-14 rounded-lg ${colors.accent} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <div
                          className={`${colors.icon} group-hover:scale-125 transition-transform duration-200`}
                        >
                          {tech.iconPath}
                        </div>
                      </div>
                    </div>

                    {/* Text content */}
                    <h3 className="text-sm md:text-base font-bold text-white group-hover:text-white transition-colors duration-200 leading-tight">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200 mt-1.5 leading-snug hidden md:block">
                      {tech.description}
                    </p>

                    {/* Bottom accent bar */}
                    <div
                      className={`mt-4 md:mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${colors.accent} transition-all duration-300`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 lg:py-20  px-4">
        <div className="container mx-auto max-w-[96%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative px-2 py-12 md:p-12 rounded-2xl z-20  backdrop-blur-sm   transition-all duration-200 group text-center overflow-hidden"
          >
            <div className="relative z-10 h-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {isArabic
                  ? "هل أنت مستعد للارتقاء ببنيتك التحتية الرقمية؟"
                  : "Ready to Elevate Your Digital Infrastructure?"}
              </h2>
              <p className="text-gray-300 text-md sm:text-lg mb-8 max-w-2xl mx-auto">
                {isArabic
                  ? "لنبني البرمجيات التي تساعدك على السيادة في مجالك"
                  : "Let’s build the software that helps you dominate your industry"}
              </p>
              <Link href={`/${lang}/contact` as any}>
                <button className="px-3 py-2 md:px-8 md:py-4 bg-gradient-to-r text-md md:text-2xl from-cyan-400 to-sky-500 text-black font-medium  rounded-lg hover:shadow-xl hover:shadow-purple-800 transition-all duration-300 hover:scale-110 active:scale-95">
                  {isArabic ? "احجز عرضاً تجريبياً لأودو" : "Book an Odoo Demo"}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
