'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Target, Award, TrendingUp, CheckCircle2, Users, Zap } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface ClientDetailPageProps {
  locale: Locale;
  clientId: string;
}

// Comprehensive client project data
const clientsData: Record<string, any> = {
  'ion-core': {
    name: '1ON CORE',
    logo: '/1ON CORE.png',
    industry: { en: 'Technology', ar: 'التكنولوجيا' },
    tagline: { 
      en: 'Transforming Digital Innovation', 
      ar: 'تحويل الابتكار الرقمي' 
    },
    description: {
      en: '1ON CORE is a cutting-edge technology platform that empowers businesses to transform their ideas into digital reality. We partnered with them to create a comprehensive digital ecosystem that drives innovation and growth.',
      ar: '1ON CORE هي منصة تقنية متطورة تمكن الشركات من تحويل أفكارها إلى واقع رقمي. لقد شاركنا معهم في إنشاء نظام بيئي رقمي شامل يدفع الابتكار والنمو.'
    },
    challenge: {
      en: '1ON CORE needed a complete digital transformation to compete in the rapidly evolving tech landscape. They required a scalable platform, modern brand identity, and effective digital marketing strategy to reach their target audience of innovative businesses.',
      ar: 'احتاجت 1ON CORE إلى تحول رقمي كامل للمنافسة في المشهد التقني سريع التطور. كانوا بحاجة إلى منصة قابلة للتوسع وهوية علامة تجارية حديثة واستراتيجية تسويق رقمي فعالة للوصول إلى جمهورهم المستهدف من الشركات المبتكرة.'
    },
    solution: {
      en: 'We delivered a comprehensive solution including custom software development with cloud infrastructure, strategic branding and visual identity, and an integrated digital marketing campaign across multiple channels. The platform was built using cutting-edge technologies ensuring scalability and performance.',
      ar: 'قدمنا ​​حلاً شاملاً يشمل تطوير البرمجيات المخصصة مع البنية التحتية السحابية والعلامات التجارية الاستراتيجية والهوية البصرية وحملة تسويق رقمي متكاملة عبر قنوات متعددة. تم بناء المنصة باستخدام تقنيات متطورة تضمن قابلية التوسع والأداء.'
    },
    results: [
      { 
        metric: '300%', 
        label: { en: 'Increase in User Engagement', ar: 'زيادة في مشاركة المستخدمين' }
      },
      { 
        metric: '5x', 
        label: { en: 'Growth in Monthly Active Users', ar: 'نمو في المستخدمين النشطين شهرياً' }
      },
      { 
        metric: '85%', 
        label: { en: 'Improvement in Conversion Rate', ar: 'تحسين في معدل التحويل' }
      },
      { 
        metric: '200%', 
        label: { en: 'ROI in First 6 Months', ar: 'عائد الاستثمار في أول 6 أشهر' }
      }
    ],
    services: {
      en: ['Custom Software Development', 'Cloud Infrastructure Setup', 'Brand Identity & Logo Design', 'UI/UX Design', 'Digital Marketing Strategy', 'SEO & Content Marketing', 'Social Media Management'],
      ar: ['تطوير البرمجيات المخصصة', 'إعداد البنية التحتية السحابية', 'تصميم هوية العلامة التجارية والشعار', 'تصميم واجهة المستخدم', 'استراتيجية التسويق الرقمي', 'تحسين محركات البحث وتسويق المحتوى', 'إدارة وسائل التواصل الاجتماعي']
    },
    deliverables: {
      en: [
        'Scalable Cloud-Based Platform',
        'Complete Brand Identity Package',
        'Responsive Website & Admin Dashboard',
        'Mobile Application (iOS & Android)',
        'Marketing Automation System',
        'Analytics & Reporting Tools'
      ],
      ar: [
        'منصة سحابية قابلة للتوسع',
        'حزمة هوية العلامة التجارية الكاملة',
        'موقع ويب ولوحة تحكم متجاوبة',
        'تطبيق الهاتف المحمول (iOS و Android)',
        'نظام أتمتة التسويق',
        'أدوات التحليلات وإعداد التقارير'
      ]
    },
    timeline: { en: '6 Months', ar: '6 أشهر' },
    year: '2024',
    testimonial: {
      quote: {
        en: 'Merkwave transformed our vision into reality. Their expertise in software development and digital marketing helped us achieve results beyond our expectations. The platform they built is robust, scalable, and perfectly aligned with our business goals.',
        ar: 'حولت Merkwave رؤيتنا إلى واقع. ساعدتنا خبرتهم في تطوير البرمجيات والتسويق الرقمي في تحقيق نتائج تفوق توقعاتنا. المنصة التي بنوها قوية وقابلة للتوسع ومتوافقة تمامًا مع أهداف أعمالنا.'
      },
      author: { en: 'CEO, 1ON CORE', ar: 'الرئيس التنفيذي، 1ON CORE' }
    }
  },
  'boslat': {
    name: 'Boslat',
    logo: '/Boslat.png',
    industry: { en: 'E-commerce', ar: 'التجارة الإلكترونية' },
    tagline: { 
      en: 'Redefining Online Shopping Experience', 
      ar: 'إعادة تعريف تجربة التسوق عبر الإنترنت' 
    },
    description: {
      en: 'Boslat is a modern e-commerce platform that brings convenience and quality together. We helped them build a seamless online shopping experience with cutting-edge technology and user-centric design.',
      ar: 'Boslat هي منصة تجارة إلكترونية حديثة تجمع بين الراحة والجودة. ساعدناهم في بناء تجربة تسوق سلسة عبر الإنترنت بتقنية متطورة وتصميم يركز على المستخدم.'
    },
    challenge: {
      en: 'Boslat faced challenges with their outdated e-commerce platform, poor user experience, and low conversion rates. They needed a complete digital overhaul to compete with major e-commerce players in the market.',
      ar: 'واجهت Boslat تحديات مع منصة التجارة الإلكترونية القديمة وتجربة المستخدم السيئة ومعدلات التحويل المنخفضة. كانوا بحاجة إلى تجديد رقمي كامل للمنافسة مع اللاعبين الرئيسيين في التجارة الإلكترونية في السوق.'
    },
    solution: {
      en: 'We built a custom e-commerce platform with advanced features including AI-powered product recommendations, seamless checkout experience, real-time inventory management, and an integrated marketing automation system. The solution was complemented with a mobile app for on-the-go shopping.',
      ar: 'قمنا ببناء منصة تجارة إلكترونية مخصصة بميزات متقدمة بما في ذلك توصيات المنتجات المدعومة بالذكاء الاصطناعي وتجربة دفع سلسة وإدارة المخزون في الوقت الفعلي ونظام أتمتة التسويق المتكامل. تم استكمال الحل بتطبيق محمول للتسوق أثناء التنقل.'
    },
    results: [
      { 
        metric: '450%', 
        label: { en: 'Growth in Online Sales', ar: 'نمو في المبيعات عبر الإنترنت' }
      },
      { 
        metric: '68%', 
        label: { en: 'Reduction in Cart Abandonment', ar: 'انخفاض في التخلي عن السلة' }
      },
      { 
        metric: '10x', 
        label: { en: 'Increase in Mobile Orders', ar: 'زيادة في الطلبات عبر الهاتف' }
      },
      { 
        metric: '92%', 
        label: { en: 'Customer Satisfaction Rate', ar: 'معدل رضا العملاء' }
      }
    ],
    services: {
      en: ['E-commerce Platform Development', 'AI Product Recommendations', 'Payment Gateway Integration', 'Inventory Management System', 'SEO & Digital Marketing', 'Mobile App Development', 'Customer Support System'],
      ar: ['تطوير منصة التجارة الإلكترونية', 'توصيات المنتجات بالذكاء الاصطناعي', 'تكامل بوابة الدفع', 'نظام إدارة المخزون', 'تحسين محركات البحث والتسويق الرقمي', 'تطوير تطبيقات الهاتف المحمول', 'نظام دعم العملاء']
    },
    deliverables: {
      en: [
        'Full E-commerce Website',
        'iOS & Android Mobile Apps',
        'Admin Dashboard & Analytics',
        'Inventory Management System',
        'Payment Gateway Integration',
        'Customer Loyalty Program'
      ],
      ar: [
        'موقع التجارة الإلكترونية الكامل',
        'تطبيقات الهاتف المحمول iOS و Android',
        'لوحة التحكم والتحليلات',
        'نظام إدارة المخزون',
        'تكامل بوابة الدفع',
        'برنامج ولاء العملاء'
      ]
    },
    timeline: { en: '8 Months', ar: '8 أشهر' },
    year: '2024',
    testimonial: {
      quote: {
        en: 'The team at Merkwave exceeded all expectations. Our new platform has completely transformed our business and customer satisfaction has never been higher. The AI recommendations alone have increased our average order value significantly.',
        ar: 'تجاوز فريق Merkwave جميع التوقعات. لقد غيرت منصتنا الجديدة عملنا بالكامل ولم يكن رضا العملاء أعلى من أي وقت مضى. زادت توصيات الذكاء الاصطناعي وحدها من متوسط ​​قيمة الطلب بشكل كبير.'
      },
      author: { en: 'Founder, Boslat', ar: 'المؤسس، Boslat' }
    }
  },
  'makdouz': {
    name: 'Makdouz',
    logo: '/Makdouz.png',
    industry: { en: 'Food & Beverage', ar: 'الأطعمة والمشروبات' },
    tagline: { 
      en: 'Crafting Digital Experiences for Culinary Excellence', 
      ar: 'صياغة تجارب رقمية للتميز في فن الطهي' 
    },
    description: {
      en: 'Makdouz is a premium food and beverage brand known for quality and authenticity. We partnered to create a digital presence that reflects their culinary excellence and connects with food enthusiasts across the region.',
      ar: 'Makdouz هي علامة تجارية متميزة للأطعمة والمشروبات معروفة بالجودة والأصالة. شاركنا في إنشاء حضور رقمي يعكس تميزهم في الطهي ويتواصل مع عشاق الطعام في جميع أنحاء المنطقة.'
    },
    challenge: {
      en: 'Makdouz had minimal online presence and struggled to reach younger demographics. They needed a comprehensive digital strategy to modernize their brand while maintaining their traditional values and authentic culinary heritage.',
      ar: 'كان لدى Makdouz وجود محدود عبر الإنترنت وواجهت صعوبة في الوصول إلى الفئات العمرية الأصغر. كانوا بحاجة إلى استراتيجية رقمية شاملة لتحديث علامتهم التجارية مع الحفاظ على قيمهم التقليدية وتراثهم في فن الطهي الأصيل.'
    },
    solution: {
      en: 'We developed a visually stunning website showcasing their products and story, created engaging social media content with professional food photography, and implemented an online ordering system with delivery integration. Our content marketing strategy highlighted their unique heritage while appealing to modern consumers.',
      ar: 'قمنا بتطوير موقع ويب مذهل بصريًا يعرض منتجاتهم وقصتهم، وإنشاء محتوى جذاب على وسائل التواصل الاجتماعي مع التصوير الفوتوغرافي الاحترافي للطعام، وتنفيذ نظام طلب عبر الإنترنت مع تكامل التوصيل. سلطت استراتيجية تسويق المحتوى الضوء على تراثهم الفريد مع جذب المستهلكين المعاصرين.'
    },
    results: [
      { 
        metric: '280%', 
        label: { en: 'Increase in Online Orders', ar: 'زيادة في الطلبات عبر الإنترنت' }
      },
      { 
        metric: '150K+', 
        label: { en: 'Social Media Followers', ar: 'متابعون على وسائل التواصل' }
      },
      { 
        metric: '45%', 
        label: { en: 'Growth in Brand Awareness', ar: 'نمو في الوعي بالعلامة التجارية' }
      },
      { 
        metric: '4.8/5', 
        label: { en: 'Average Customer Rating', ar: 'متوسط ​​تقييم العملاء' }
      }
    ],
    services: {
      en: ['Website Design & Development', 'Online Ordering System', 'Social Media Marketing', 'Content Creation & Photography', 'Brand Photography', 'Email Marketing Campaigns'],
      ar: ['تصميم وتطوير الموقع', 'نظام الطلب عبر الإنترنت', 'التسويق عبر وسائل التواصل الاجتماعي', 'إنشاء المحتوى والتصوير الفوتوغرافي', 'التصوير الفوتوغرافي للعلامة التجارية', 'حملات التسويق عبر البريد الإلكتروني']
    },
    deliverables: {
      en: [
        'Restaurant Website with Menu',
        'Online Ordering System',
        'Delivery Integration',
        'Professional Food Photography',
        'Social Media Content Calendar',
        'Brand Guidelines Document'
      ],
      ar: [
        'موقع المطعم مع القائمة',
        'نظام الطلب عبر الإنترنت',
        'تكامل التوصيل',
        'التصوير الفوتوغرافي الاحترافي للطعام',
        'تقويم محتوى وسائل التواصل الاجتماعي',
        'وثيقة إرشادات العلامة التجارية'
      ]
    },
    timeline: { en: '5 Months', ar: '5 أشهر' },
    year: '2023',
    testimonial: {
      quote: {
        en: 'Merkwave helped us bridge tradition and technology perfectly. Our online presence now reflects the quality of our products, and customer engagement has soared. The ordering system they built is intuitive and has significantly increased our revenue.',
        ar: 'ساعدتنا Merkwave في ربط التقليد والتكنولوجيا بشكل مثالي. يعكس تواجدنا عبر الإنترنت الآن جودة منتجاتنا، وقد ارتفعت مشاركة العملاء. نظام الطلب الذي بنوه بديهي وقد زاد إيراداتنا بشكل كبير.'
      },
      author: { en: 'Owner, Makdouz', ar: 'المالك، Makdouz' }
    }
  },
  'balance-box': {
    name: 'Balance Box',
    logo: '/Balance-Box.png',
    industry: { en: 'Health & Wellness', ar: 'الصحة والعافية' },
    tagline: { 
      en: 'Digital Wellness Platform for Healthier Lives', 
      ar: 'منصة العافية الرقمية لحياة أكثر صحة' 
    },
    description: {
      en: 'Balance Box is a comprehensive health and wellness platform offering personalized nutrition plans and fitness programs. We built their complete digital ecosystem from the ground up, creating a seamless experience for health-conscious users.',
      ar: 'Balance Box هي منصة شاملة للصحة والعافية تقدم خطط تغذية مخصصة وبرامج لياقة بدنية. قمنا ببناء نظامهم البيئي الرقمي الكامل من الصفر، مما يخلق تجربة سلسة للمستخدمين المهتمين بالصحة.'
    },
    challenge: {
      en: 'Balance Box was entering a competitive market with established players. They needed a unique digital platform that could scale, differentiate their services, and provide exceptional user experience while handling complex health data securely.',
      ar: 'كانت Balance Box تدخل سوقًا تنافسيًا مع لاعبين راسخين. كانوا بحاجة إلى منصة رقمية فريدة يمكن أن تتوسع وتميز خدماتهم وتوفر تجربة مستخدم استثنائية مع التعامل مع بيانات صحية معقدة بشكل آمن.'
    },
    solution: {
      en: 'We created a custom web and mobile platform with AI-powered meal planning, fitness tracking, progress analytics, and community features. The platform integrates with popular wearable devices and includes subscription management, payment processing, and a comprehensive admin dashboard.',
      ar: 'أنشأنا منصة ويب ومحمول مخصصة مع تخطيط الوجبات المدعوم بالذكاء الاصطناعي وتتبع اللياقة البدنية وتحليلات التقدم وميزات المجتمع. تتكامل المنصة مع الأجهزة القابلة للارتداء الشائعة وتتضمن إدارة الاشتراك ومعالجة الدفع ولوحة تحكم شاملة.'
    },
    results: [
      { 
        metric: '50K+', 
        label: { en: 'Active Subscribers', ar: 'مشتركون نشطون' }
      },
      { 
        metric: '95%', 
        label: { en: 'User Retention Rate', ar: 'معدل الاحتفاظ بالمستخدمين' }
      },
      { 
        metric: '4.9/5', 
        label: { en: 'App Store Rating', ar: 'تقييم متجر التطبيقات' }
      },
      { 
        metric: '$2M+', 
        label: { en: 'Revenue in Year One', ar: 'الإيرادات في السنة الأولى' }
      }
    ],
    services: {
      en: ['Mobile App Development', 'Web Platform Development', 'AI Integration', 'Wearable Device Integration', 'Payment System', 'Analytics Dashboard', 'Community Features'],
      ar: ['تطوير تطبيقات الهاتف المحمول', 'تطوير منصة الويب', 'تكامل الذكاء الاصطناعي', 'تكامل الأجهزة القابلة للارتداء', 'نظام الدفع', 'لوحة التحليلات', 'ميزات المجتمع']
    },
    deliverables: {
      en: [
        'iOS & Android Mobile Apps',
        'Web Platform & Dashboard',
        'AI Meal Planning Engine',
        'Fitness Tracking System',
        'Payment & Subscription System',
        'Admin Control Panel'
      ],
      ar: [
        'تطبيقات الهاتف المحمول iOS و Android',
        'منصة الويب ولوحة المعلومات',
        'محرك تخطيط الوجبات بالذكاء الاصطناعي',
        'نظام تتبع اللياقة البدنية',
        'نظام الدفع والاشتراك',
        'لوحة التحكم الإدارية'
      ]
    },
    timeline: { en: '10 Months', ar: '10 أشهر' },
    year: '2024',
    testimonial: {
      quote: {
        en: 'The platform Merkwave built for us is phenomenal. It\'s helped thousands of people achieve their health goals, and our business has grown beyond our projections. The AI-powered features are truly game-changing.',
        ar: 'المنصة التي بنتها Merkwave لنا رائعة. لقد ساعدت الآلاف من الناس على تحقيق أهدافهم الصحية، وقد نما عملنا بما يتجاوز توقعاتنا. الميزات المدعومة بالذكاء الاصطناعي تغير قواعد اللعبة حقًا.'
      },
      author: { en: 'Co-Founder, Balance Box', ar: 'المؤسس المشارك، Balance Box' }
    }
  },
  'one-chemic': {
    name: 'One Chemic',
    logo: '/One Chemic.png',
    industry: { en: 'Chemicals', ar: 'الكيماويات' },
    tagline: { 
      en: 'Digital Transformation for Chemical Excellence', 
      ar: 'التحول الرقمي للتميز الكيميائي' 
    },
    description: {
      en: 'One Chemic is a leading chemical solutions provider serving industries across the region. We helped them modernize their operations through comprehensive digital transformation and strategic branding initiatives.',
      ar: 'One Chemic هو مزود رائد لحلول الكيميائية يخدم الصناعات في جميع أنحاء المنطقة. ساعدناهم في تحديث عملياتهم من خلال التحول الرقمي الشامل ومبادرات العلامات التجارية الاستراتيجية.'
    },
    challenge: {
      en: 'One Chemic relied heavily on manual processes and lacked a modern digital presence. They needed custom software to manage complex inventory, track orders, and maintain client relationships while establishing a professional brand identity in the B2B space.',
      ar: 'اعتمدت One Chemic بشكل كبير على العمليات اليدوية وتفتقر إلى وجود رقمي حديث. كانوا بحاجة إلى برامج مخصصة لإدارة المخزون المعقد وتتبع الطلبات والحفاظ على علاقات العملاء مع إنشاء هوية علامة تجارية احترافية في مجال B2B.'
    },
    solution: {
      en: 'We developed a comprehensive enterprise resource planning (ERP) system tailored to chemical industry needs, created a professional corporate website, and designed a complete brand identity. The solution included inventory management, CRM, automated reporting, and compliance tracking features.',
      ar: 'قمنا بتطوير نظام تخطيط موارد المؤسسة (ERP) الشامل المصمم خصيصًا لاحتياجات صناعة الكيماويات، وإنشاء موقع ويب للشركات الاحترافية، وتصميم هوية علامة تجارية كاملة. تضمن الحل إدارة المخزون وإدارة علاقات العملاء والتقارير الآلية وميزات تتبع الامتثال.'
    },
    results: [
      { 
        metric: '70%', 
        label: { en: 'Reduction in Processing Time', ar: 'تقليل في وقت المعالجة' }
      },
      { 
        metric: '99.5%', 
        label: { en: 'Inventory Accuracy', ar: 'دقة المخزون' }
      },
      { 
        metric: '60%', 
        label: { en: 'Increase in Operational Efficiency', ar: 'زيادة في الكفاءة التشغيلية' }
      },
      { 
        metric: '$500K', 
        label: { en: 'Annual Cost Savings', ar: 'توفير التكاليف السنوية' }
      }
    ],
    services: {
      en: ['ERP System Development', 'Inventory Management', 'Brand Identity Design', 'Corporate Website', 'Process Automation', 'Training & Support', 'Compliance Systems'],
      ar: ['تطوير نظام ERP', 'إدارة المخزون', 'تصميم هوية العلامة التجارية', 'موقع الشركات', 'أتمتة العمليات', 'التدريب والدعم', 'أنظمة الامتثال']
    },
    deliverables: {
      en: [
        'Custom ERP System',
        'Inventory Management Module',
        'CRM & Order Tracking',
        'Corporate Website',
        'Brand Identity Package',
        'Staff Training Program'
      ],
      ar: [
        'نظام ERP مخصص',
        'وحدة إدارة المخزون',
        'إدارة علاقات العملاء وتتبع الطلبات',
        'موقع الشركات',
        'حزمة هوية العلامة التجارية',
        'برنامج تدريب الموظفين'
      ]
    },
    timeline: { en: '12 Months', ar: '12 شهرًا' },
    year: '2023',
    testimonial: {
      quote: {
        en: 'Merkwave\'s ERP solution revolutionized our operations. What used to take days now takes hours, and our team can focus on growth instead of administrative tasks. The ROI has been exceptional.',
        ar: 'أحدث حل ERP من Merkwave ثورة في عملياتنا. ما كان يستغرق أيامًا أصبح الآن يستغرق ساعات، ويمكن لفريقنا التركيز على النمو بدلاً من المهام الإدارية. كان عائد الاستثمار استثنائيًا.'
      },
      author: { en: 'Managing Director, One Chemic', ar: 'المدير الإداري، One Chemic' }
    }
  },
  'shemokh': {
    name: 'Shemokh',
    logo: '/Shemokh.png',
    industry: { en: 'Services', ar: 'الخدمات' },
    tagline: { 
      en: 'Premium Service Platform with Exceptional UX', 
      ar: 'منصة خدمات متميزة بتجربة مستخدم استثنائية' 
    },
    description: {
      en: 'Shemokh is a comprehensive service platform connecting customers with premium service providers across various categories. We built their entire digital infrastructure from concept to successful market launch.',
      ar: 'Shemokh هي منصة خدمات شاملة تربط العملاء بمقدمي الخدمات المتميزين عبر فئات مختلفة. قمنا ببناء بنيتهم التحتية الرقمية بالكامل من المفهوم إلى الإطلاق الناجح في السوق.'
    },
    challenge: {
      en: 'Shemokh was launching in a competitive service marketplace and needed to differentiate through superior user experience, reliable technology infrastructure, and effective marketing strategy from day one to attract both customers and service providers.',
      ar: 'كانت Shemokh تطلق في سوق خدمات تنافسي وكانت بحاجة إلى التمييز من خلال تجربة مستخدم متفوقة وبنية تحتية تقنية موثوقة واستراتيجية تسويق فعالة من اليوم الأول لجذب العملاء ومقدمي الخدمات.'
    },
    solution: {
      en: 'We created a dual-sided marketplace platform with advanced booking system, secure payment processing, review and rating system, and real-time notifications. The platform includes comprehensive admin dashboard, service provider management tools, and customer support features.',
      ar: 'أنشأنا منصة سوق ذات جانبين مع نظام حجز متقدم ومعالجة دفع آمنة ونظام المراجعة والتقييم والإشعارات في الوقت الفعلي. تتضمن المنصة لوحة تحكم إدارية شاملة وأدوات إدارة مزودي الخدمة وميزات دعم العملاء.'
    },
    results: [
      { 
        metric: '30K+', 
        label: { en: 'Registered Users', ar: 'مستخدمون مسجلون' }
      },
      { 
        metric: '500+', 
        label: { en: 'Service Providers', ar: 'مقدمو الخدمات' }
      },
      { 
        metric: '12K+', 
        label: { en: 'Completed Bookings', ar: 'حجوزات مكتملة' }
      },
      { 
        metric: '4.7/5', 
        label: { en: 'Platform Rating', ar: 'تقييم المنصة' }
      }
    ],
    services: {
      en: ['Marketplace Platform Development', 'Booking System', 'Payment Integration', 'Review System', 'Mobile Applications', 'Digital Marketing', 'Customer Support System'],
      ar: ['تطوير منصة السوق', 'نظام الحجز', 'تكامل الدفع', 'نظام المراجعة', 'تطبيقات الهاتف المحمول', 'التسويق الرقمي', 'نظام دعم العملاء']
    },
    deliverables: {
      en: [
        'Marketplace Web Platform',
        'iOS & Android Apps',
        'Booking & Scheduling System',
        'Payment Gateway',
        'Admin Dashboard',
        'Provider Management Portal'
      ],
      ar: [
        'منصة ويب السوق',
        'تطبيقات iOS و Android',
        'نظام الحجز والجدولة',
        'بوابة الدفع',
        'لوحة التحكم الإدارية',
        'بوابة إدارة مقدمي الخدمة'
      ]
    },
    timeline: { en: '9 Months', ar: '9 أشهر' },
    year: '2024',
    testimonial: {
      quote: {
        en: 'From concept to launch, Merkwave was an exceptional partner. The platform they built has become the foundation of our success. Their attention to detail and understanding of marketplace dynamics was impressive.',
        ar: 'من المفهوم إلى الإطلاق، كانت Merkwave شريكًا استثنائيًا. أصبحت المنصة التي بنوها أساس نجاحنا. كان اهتمامهم بالتفاصيل وفهمهم لديناميكيات السوق مذهلاً.'
      },
      author: { en: 'CEO, Shemokh', ar: 'الرئيس التنفيذي، Shemokh' }
    }
  },
  'saudi-fit': {
    name: 'Saudi Fit',
    logo: '/Saudi-Fit.png',
    industry: { en: 'Fitness', ar: 'اللياقة البدنية' },
    tagline: { 
      en: 'Smart Fitness Center with Digital Innovation', 
      ar: 'مركز لياقة بدنية ذكي مع ابتكار رقمي' 
    },
    description: {
      en: 'Saudi Fit is a state-of-the-art fitness center combining modern equipment with digital technology. We helped them create a seamless member experience through innovative digital solutions that set them apart from competitors.',
      ar: 'Saudi Fit هو مركز لياقة بدنية حديث يجمع بين المعدات الحديثة والتكنولوجيا الرقمية. ساعدناهم في خلق تجربة أعضاء سلسة من خلال حلول رقمية مبتكرة تميزهم عن المنافسين.'
    },
    challenge: {
      en: 'Saudi Fit wanted to stand out in the crowded fitness market by offering a tech-enhanced experience. They needed comprehensive member management software, class booking system, workout tracking capabilities, and engaging digital content to build their brand.',
      ar: 'أرادت Saudi Fit التميز في سوق اللياقة البدنية المزدحم من خلال تقديم تجربة معززة بالتكنولوجيا. كانوا بحاجة إلى برنامج إدارة أعضاء شامل ونظام حجز الفصول وقدرات تتبع التمارين ومحتوى رقمي جذاب لبناء علامتهم التجارية.'
    },
    solution: {
      en: 'We developed a comprehensive member management system with automated billing, mobile app for class bookings and workout tracking, digital check-in system, and created engaging social media content showcasing their facilities, trainers, and member success stories.',
      ar: 'قمنا بتطوير نظام إدارة أعضاء شامل مع الفواتير التلقائية وتطبيق محمول لحجوزات الفصول وتتبع التمارين ونظام تسجيل وصول رقمي، وإنشاء محتوى جذاب على وسائل التواصل الاجتماعي يعرض مرافقهم والمدربين وقصص نجاح الأعضاء.'
    },
    results: [
      { 
        metric: '180%', 
        label: { en: 'Growth in Memberships', ar: 'نمو في العضويات' }
      },
      { 
        metric: '90%', 
        label: { en: 'App Adoption Rate', ar: 'معدل اعتماد التطبيق' }
      },
      { 
        metric: '65%', 
        label: { en: 'Increase in Class Attendance', ar: 'زيادة في حضور الفصول' }
      },
      { 
        metric: '4.8/5', 
        label: { en: 'Member Satisfaction', ar: 'رضا الأعضاء' }
      }
    ],
    services: {
      en: ['Member Management System', 'Mobile App Development', 'Booking System', 'Digital Check-in', 'Social Media Marketing', 'Content Creation', 'Video Production'],
      ar: ['نظام إدارة الأعضاء', 'تطوير تطبيقات الهاتف المحمول', 'نظام الحجز', 'تسجيل الوصول الرقمي', 'التسويق عبر وسائل التواصل الاجتماعي', 'إنشاء المحتوى', 'إنتاج الفيديو']
    },
    deliverables: {
      en: [
        'Member Management Platform',
        'Mobile App (iOS & Android)',
        'Class Booking System',
        'Digital Check-in System',
        'Social Media Content',
        'Marketing Campaign'
      ],
      ar: [
        'منصة إدارة الأعضاء',
        'تطبيق الهاتف المحمول (iOS و Android)',
        'نظام حجز الفصول',
        'نظام تسجيل الوصول الرقمي',
        'محتوى وسائل التواصل الاجتماعي',
        'حملة تسويقية'
      ]
    },
    timeline: { en: '7 Months', ar: '7 أشهر' },
    year: '2023',
    testimonial: {
      quote: {
        en: 'The digital solutions Merkwave provided have transformed how we operate. Our members love the app, and our team has more time to focus on what matters most - helping people achieve their fitness goals. The growth has been remarkable.',
        ar: 'لقد غيرت الحلول الرقمية التي قدمتها Merkwave طريقة عملنا. يحب أعضاؤنا التطبيق، ولدى فريقنا المزيد من الوقت للتركيز على ما يهم أكثر - مساعدة الناس على تحقيق أهدافهم في اللياقة البدنية. كان النمو ملحوظًا.'
      },
      author: { en: 'Founder, Saudi Fit', ar: 'المؤسس، Saudi Fit' }
    }
  }
};

export default function ClientDetailPage({ locale, clientId }: ClientDetailPageProps) {
  const isArabic = locale === 'ar';
  const client = clientsData[clientId];

  if (!client) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <p className="text-white text-2xl">Client not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1f2e] to-[#0a1628]" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-purple-400/10 via-pink-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href={`/${locale}`}>
            <motion.button
              className={`inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors ${isArabic ? 'flex-row-reverse' : ''}`}
              whileHover={{ x: isArabic ? 5 : -5 }}
            >
              <ArrowLeft className={`w-5 h-5 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}
            </motion.button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <div className="relative w-48 h-32 flex items-center">
                  <Image
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    width={192}
                    height={128}
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
              </div>

              <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6">
                <span className="text-cyan-400 text-sm font-semibold">
                  {client.industry[locale]}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {client.tagline[locale]}
              </h1>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {client.description[locale]}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-400">{client.year}</span>
                </div>
                <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-400">{client.timeline[locale]}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {client.results.map((result: any, index: number) => (
                <motion.div
                  key={index}
                  className="bg-[#0a1628]/60 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {result.metric}
                  </div>
                  <p className="text-gray-400 text-sm">{result.label[locale]}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 bg-[#0a1628]/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Target className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {isArabic ? 'التحدي' : 'The Challenge'}
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {client.challenge[locale]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Zap className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {isArabic ? 'الحل' : 'The Solution'}
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              {client.solution[locale]}
            </p>

            {/* Services Grid */}
            <h3 className="text-2xl font-bold text-white mb-6">
              {isArabic ? 'الخدمات المقدمة' : 'Services Provided'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {client.services[locale].map((service: string, index: number) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 bg-[#0a1628]/40 backdrop-blur-xl border border-gray-800/40 rounded-xl p-4 ${isArabic ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-300">{service}</span>
                </motion.div>
              ))}
            </div>

            {/* Deliverables */}
            <h3 className="text-2xl font-bold text-white mb-6">
              {isArabic ? 'المخرجات' : 'Deliverables'}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {client.deliverables[locale].map((deliverable: string, index: number) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-cyan-400/10 to-blue-400/10 border border-cyan-400/20 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-white font-medium">{deliverable}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-[#0a1628]/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/30 rounded-2xl p-8 md:p-12">
              <Award className="w-12 h-12 text-cyan-400 mb-6" />
              <blockquote className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                "{client.testimonial.quote[locale]}"
              </blockquote>
              <cite className="text-gray-400 not-italic font-semibold">
                — {client.testimonial.author[locale]}
              </cite>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isArabic 
                ? 'هل أنت مستعد لتحويل عملك؟' 
                : 'Ready to Transform Your Business?'}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {isArabic 
                ? 'دعنا نساعدك في تحقيق نتائج مماثلة. تواصل معنا اليوم للحصول على استشارة مجانية.' 
                : "Let's help you achieve similar results. Contact us today for a free consultation."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`}>
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isArabic ? 'ابدأ مشروعك' : 'Start Your Project'}
                </motion.button>
              </Link>
              <Link href={`/${locale}/portfolio`}>
                <motion.button
                  className="px-8 py-4 border-2 border-cyan-400/40 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isArabic ? 'عرض المزيد من المشاريع' : 'View More Projects'}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
