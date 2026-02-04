import { Locale, ServiceSlug, servicesSlugs } from "@/lib/i18n";

type ServiceContent = {
  slug: ServiceSlug;
  name: string;
  description: string;
};

type Dictionary = {
  meta: {
    siteName: string;
    description: string;
    keywords: string[];
  };
  navigation: {
    home: string;
    services: string;
    about: string;
    contact: string;
    portfolio: string;
    blogs: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    ctaButton: string;
    clientExperiencesTitle: string;
    clientExperiencesSubtitle: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    emailPlaceholder: string;
    activateButton: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceContent[];
  };
  about: {
    title: string;
    body: string;
  };
  contact: {
    title: string;
    heroTitle: string;
    heroSubtitle: string;
    formTitle: string;
    directContactTitle: string;
    locationTitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder?: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    phoneLabel: string;
    addressLabel: string;
    phone: string;
    email: string;
    address: string;
    getDirectionsButton: string;
    // optional helper hints for form fields
    nameHint?: string;
    emailHint?: string;
    phoneHint?: string;
    subjectHint?: string;
    messageHint?: string;
  };
  footer: {
    rights: string;
    linksTitle: string;
    privacy: string;
    terms: string;
  };
  pages?: {
    portfolio?: { title: string; body: string };
    services?: { title: string; body: string };
    blogs?: { title: string; body: string };
    about?: { title: string; body: string };
    contact?: { title: string; body: string };
  };
  legal: {
    privacy: {
      title: string;
      updated: string;
      intro: string;
      sections: { heading: string; body: string }[];
    };
    terms: {
      title: string;
      updated: string;
      intro: string;
      sections: { heading: string; body: string }[];
    };
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      siteName: "Merkwave ",
      description:
        "Merkwave crafts digital strategies, software, social media, SEO, and media production that amplify ambitious brands.",
      keywords: [
        "Merkwave",
        "marketing agency",
        "digital solutions",
        "SEO",
        "social media",
        "media production",
        "software development",
        "marketing",
        "brand growth",
      ],
    },
    navigation: {
      home: "Home",
      services: "Services",
      about: "About",
      contact: "Contact",
      portfolio: "Portfolio",
      blogs: "Blogs",
    },
    hero: {
      headline: "We launch brands into their next wave of growth",
      subheadline:
        "Full-service marketing experts delivering digital products, performance campaigns, and content that converts across every channel.",
      ctaPrimary: "Explore services",
      ctaSecondary: "Talk to us",
    },
    home: {
      heroTitle: "Ready to Launch Your Next Success Story?",
      heroSubtitle: "Partner with us to turn your vision into measurable results.",
      ctaButton: "Start Your Journey",
      clientExperiencesTitle: "What Our Clients Say",
      clientExperiencesSubtitle: "Real stories from businesses that have grown with Merkwave",
      newsletterTitle: "Stay Connected",
      newsletterSubtitle: "Get insights, updates, and industry trends delivered to your inbox",
      emailPlaceholder: "Enter your email",
      activateButton: "Subscribe",
    },
    services: {
      title: "Marketing solutions built around your goals",
      subtitle:
        "From strategic planning to full execution, our multidisciplinary teams ship measurable impact.",
      items: [
        {
          slug: "business",
          name: "Business Development",
          description:
            "Strategic consulting to optimize operations and scale your market presence.",
        },
        {
          slug: "software",
          name: "Software Engineering",
          description:
            "Official Odoo Partner providing custom ERP and high-performance software.",
        },
        {
          slug: "branding",
          name: "Branding & Identity",
          description:
            "Crafting iconic identities that demand attention and build lasting trust.",
        },
        {
          slug: "commerce",
          name: "Marketing",
          description:
            " Data-led digital growth strategies combined with premium printing solutions.",
        },
      ],
    },
    about: {
      title: "Why Merkwave",
      body:
        "We transform ambitious ideas into measurable business outcomes , Data-driven strategies designed to scale with your vision. Global execution delivered with local market expertise. "
    },
    contact: {
      title: "Let's build your next success story",
      heroTitle: "Let's Connect",
      heroSubtitle: "Have a project in mind, a question, or just want to say hello? Reach out to us, and let's discuss how MerkWave can help elevate your business.",
      formTitle: "Send Us a Message",
      directContactTitle: "Direct Contact",
      locationTitle: "Find Our Location",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      subjectLabel: "Subject",
      messageLabel: "Your Message",
      namePlaceholder: "Enter your name",
      emailPlaceholder: "Enter your email",
  phonePlaceholder: "Enter your phone number",
      subjectPlaceholder: "Enter subject",
      messagePlaceholder: "Write your message here...",
      sendButton: "Send Message",
      phoneLabel: "Phone:",
      addressLabel: "Address:",
      phone: "+20 100 5224435",
      email: "info@merkwave.com",
      address: "Cairo, Egypt",
      getDirectionsButton: "Get Directions",
    },
    footer: {
      rights: "© " + new Date().getFullYear() + " Merkwave. All rights reserved.",
      linksTitle: "Resources",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    pages: {
      portfolio: { title: "Portfolio", body: "Our selected projects and case studies." },
      services: { title: "Services", body: "A short overview of the services we offer." },
      blogs: { title: "Blogs", body: "Insights, thoughts, and updates from our team." },
      about: { title: "About", body: "Why Merkwave: we bring strategy, creativity, and engineering together." },
      contact: { title: "Contact", body: "Reach out to start a conversation." },
    },
    legal: {
      privacy: {
        title: "Privacy Policy",
        updated: "Updated September 2025",
        intro:
          "We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard information across Merkwave experiences.",
        sections: [
          {
            heading: "What we collect",
            body:
              "We collect contact details, company information, and analytics insights when you submit forms, attend events, or browse our digital platforms. We only collect the data needed to deliver or improve our services.",
          },
          {
            heading: "How we use data",
            body:
              "Your data helps us respond to inquiries, deliver projects, personalize marketing, and perform analytics. We never sell your personal data and share it only with trusted partners when necessary for service delivery.",
          },
          {
            heading: "Your choices",
            body:
              "You can request access, correction, or deletion of your personal data at any time by emailing privacy@merkwave.com. We respond to all requests within 30 days.",
          },
        ],
      },
      terms: {
        title: "Terms of Service",
        updated: "Updated September 2025",
        intro:
          "These terms govern your use of Merkwave services and digital platforms. By engaging with us, you agree to the commitments outlined below.",
        sections: [
          {
            heading: "Scope",
            body:
              "These terms apply to consulting, retainers, software development, media production, and any related services provided by Merkwave or our appointed partners.",
          },
          {
            heading: "Responsibilities",
            body:
              "We commit to delivering the agreed scope using industry best practices. Clients are responsible for providing timely feedback, approvals, and necessary assets to meet project timelines.",
          },
          {
            heading: "Payment & intellectual property",
            body:
              "Invoices are due within 15 days unless otherwise stated in the proposal. Final deliverables transfer upon full payment. Pre-existing tools or frameworks remain the intellectual property of Merkwave.",
          },
        ],
      },
    },
  },
  ar: {
    meta: {
      siteName: "ميرك ويڨ",
      description:
        "مِرك ويف تقدّم استراتيجيات تسويق رقمية، وبرمجيات، وإدارة منصات اجتماعية، وتحسين محركات البحث، وإنتاج إعلامي يشعل نمو العلامات الطموحة.",
      keywords: [
        "مرك ويف",
        "وكالة تسويق",
        "حلول رقمية",
        "تحسين محركات البحث",
        "وسائل التواصل الاجتماعي",
        "إنتاج إعلامي",
        "تطوير برمجيات",
        "تسويق",
        "نمو العلامة",
      ],
    },
    navigation: {
      home: "الرئيسية",
      services: "خدماتنا",
      about: "من نحن",
      contact: "تواصل معنا",
      portfolio: "أعمالنا",
      blogs: "المدوّنات",
    },
    hero: {
      headline: "نقود علامتك نحو موجة النمو التالية",
      subheadline:
        "فريق تسويق متكامل يقدّم منتجات رقمية، وحملات أداء، ومحتوى يحفّز العملاء عبر كل قناة.",
      ctaPrimary: "استكشاف الخدمات",
      ctaSecondary: "تواصل معنا",
    },
    home: {
      heroTitle: "هل أنت مستعد لإطلاق قصة نجاحك القادمة؟",
      heroSubtitle: "شاركنا في تحويل رؤيتك إلى نتائج قابلة للقياس.",
      ctaButton: "ابدأ رحلتك",
      clientExperiencesTitle: "ماذا يقول عملاؤنا",
      clientExperiencesSubtitle: "قصص حقيقية من شركات نمت مع مرك ويف",
      newsletterTitle: "ابق على تواصل",
      newsletterSubtitle: "احصل على الرؤى والتحديثات واتجاهات الصناعة في بريدك الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      activateButton: "اشتراك",
    },
    services: {
      title: "حلول تسويقية مصممة وفق أهدافك",
      subtitle:
        "من التخطيط الاستراتيجي إلى التنفيذ الكامل، فرقنا المتعددة الاختصاص تؤمّن نتائج قابلة للقياس.",
      items: [
        {
          slug: "business",
          name: "تطوير الأعمال",
          description:
            "استشارات استراتيجية لتحسين العمليات وتوسيع نطاق تواجدك في السوق",
        },
        {
          slug: "software",
          name: "هندسة البرمجيات",
          description:
            "شريك أودو الرسمي لتقديم حلول ERP مخصصة وبرمجيات عالية الأداء.",
        },
        {
          slug: "marketing",
          name: "التسويق",
          description:
            "استراتيجيات نمو رقمي قائمة على البيانات مدمجة مع حلول الطباعة الفاخرة",
        },
        {
          slug: "branding",
          name: "العلامة التجارية والهوية",
          description:
            "ابتكار هويات بصرية أيقونية تفرض حضورها وتبني ثقة مستدامة.",
        },
      ],
    },
    about: {
      title: "لماذا مِرك ويف",
      body:
        "نحول الأفكار الطموحة إلى نتائج أعمال ملموسة,استراتيجيات قائمة على البيانات مصممة للتوسع مع رؤيتك,فريق من الخبراء بتنفيذ عالمي وخبرة محلية",
    },
    contact: {
      title: "فلنصنع قصة نجاحك التالية",
      heroTitle: "دعنا نتواصل",
      heroSubtitle: "هل لديك مشروع في ذهنك، أو سؤال، أو تريد فقط أن تقول مرحبًا؟ تواصل معنا، ودعنا نناقش كيف يمكن لمرك ويف أن تساعد في الارتقاء بعملك.",
      formTitle: "أرسل لنا رسالة",
      directContactTitle: "اتصال مباشر",
      locationTitle: "موقعنا",
      nameLabel: "اسمك",
      emailLabel: "بريدك الإلكتروني",
      subjectLabel: "الموضوع",
      messageLabel: "رسالتك",
      namePlaceholder: "أدخل اسمك",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
  phonePlaceholder: "أدخل رقم الهاتف",
      subjectPlaceholder: "أدخل الموضوع",
      messagePlaceholder: "اكتب رسالتك هنا...",
      sendButton: "إرسال الرسالة",
      phoneLabel: "الهاتف:",
      addressLabel: "العنوان:",
      phone: "+20 100 5224435",
      email: "info@merkwave.com",
      address: "القاهرة, جمهورية مصر العربية",
      getDirectionsButton: "احصل على الاتجاهات",
    },
    footer: {
      rights: "© " + new Date().getFullYear() + " مِرك ويف. جميع الحقوق محفوظة.",
      linksTitle: "روابط",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
    },
    pages: {
      portfolio: { title: "أعمالنا", body: "مشاريع مختارة ودراسات حالة." },
      services: { title: "خدماتنا", body: "نظرة موجزة على الخدمات التي نقدّمها." },
      blogs: { title: "المدوّنات", body: "أفكار وتحديثات من فريقنا." },
      about: { title: "من نحن", body: "لماذا مِرك ويف: نجمع الاستراتيجية والإبداع والهندسة معًا." },
      contact: { title: "تواصل", body: "تواصل معنا لبدء محادثة." },
    },
    legal: {
      privacy: {
        title: "سياسة الخصوصية",
        updated: "تم التحديث في سبتمبر 2025",
        intro:
          "نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. تشرح هذه السياسة كيفية جمعنا للمعلومات واستخدامها وحمايتها عبر تجارب مِرك ويف.",
        sections: [
          {
            heading: "المعلومات التي نجمعها",
            body:
              "نجمع بيانات التواصل ومعلومات الشركة ورؤى تحليلات عند تعبئة النماذج أو حضور الفعاليات أو تصفح منصاتنا الرقمية. لا نجمع إلا البيانات اللازمة لتقديم خدماتنا وتحسينها.",
          },
          {
            heading: "كيفية استخدام البيانات",
            body:
              "تساعدنا بياناتك في الرد على الاستفسارات، وتنفيذ المشاريع، وتخصيص التسويق، وإجراء التحليلات. لا نبيع بياناتك الشخصية أبدًا ونشاركها فقط مع شركاء موثوقين عند الضرورة لتقديم الخدمة.",
          },
          {
            heading: "خياراتك",
            body:
              "يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت عن طريق إرسال بريد إلكتروني إلى privacy@merkwave.com. نرد على جميع الطلبات خلال 30 يومًا.",
          },
        ],
      },
      terms: {
        title: "الشروط والأحكام",
        updated: "تم التحديث في سبتمبر 2025",
        intro:
          "تحكم هذه الشروط استخدامك لخدمات ومنصات مِرك ويف الرقمية. باستخدامك لخدماتنا، فإنك توافق على الالتزامات الموضحة أدناه.",
        sections: [
          {
            heading: "نطاق التطبيق",
            body:
              "تنطبق هذه الشروط على الاستشارات، والاتفاقيات الشهرية، وتطوير البرمجيات، والإنتاج الإعلامي، وأي خدمات ذات صلة تقدمها مِرك ويف أو شركاؤها المعتمدون.",
          },
          {
            heading: "المسؤوليات",
            body:
              "نلتزم بتقديم نطاق العمل المتفق عليه باستخدام أفضل الممارسات. ويتحمل العملاء مسؤولية تزويدنا بالتغذية الراجعة والموافقات اللازمة والمواد المطلوبة في الوقت المحدد لضمان سير المشروع.",
          },
          {
            heading: "الدفع وحقوق الملكية الفكرية",
            body:
              "تستحق الفواتير خلال 15 يومًا ما لم يُنص خلاف ذلك في العرض. تنتقل ملكية المخرجات النهائية بعد السداد الكامل. تبقى الأدوات أو الأطر الموجودة مسبقًا ملكًا فكريًا لمِرك ويف.",
          },
        ],
      },
    },
  },
};

export type { Dictionary, ServiceContent };

export const getDictionary = (locale: Locale): Dictionary => {
  if (!dictionaries[locale]) {
    return dictionaries.en;
  }
  return dictionaries[locale];
};

export const getServiceBySlug = (locale: Locale, slug: ServiceSlug) =>
  getDictionary(locale).services.items.find((item) => item.slug === slug);

export const allServices = servicesSlugs;
