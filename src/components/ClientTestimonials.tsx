'use client'

interface ClientTestimonialsProps {
  lang: string;
  dict?: any;
}

export default function ClientTestimonials({ lang, dict }: ClientTestimonialsProps) {
  const isArabic = lang === 'ar';

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: isArabic 
        ? 'عملت مع ميرك ويف على مشروع تطوير موقعنا الإلكتروني وكانت النتيجة رائعة. فريق محترف ومبدع يفهم احتياجاتنا تمامًا.'
        : 'Working with Merkwave on our website development was exceptional. Professional and creative team that truly understands our needs.',
      clientName: isArabic ? 'أحمد محمد' : 'Ahmed Mohammed',
      clientPosition: isArabic ? 'المدير التنفيذي، 1ON CORE' : 'CEO, 1ON CORE',
      avatar: "AM"
    },
    {
      id: 2,
      rating: 5,
      text: isArabic 
        ? 'استراتيجية التسويق الرقمي التي قدمها فريق ميرك ويف ساعدتنا على مضاعفة مبيعاتنا عبر الإنترنت في ستة أشهر فقط.'
        : 'The digital marketing strategy from Merkwave helped us double our online sales in just six months. Highly recommended!',
      clientName: isArabic ? 'سارة أحمد' : 'Sarah Ahmed',
      clientPosition: isArabic ? 'مديرة التسويق، Boslat' : 'Marketing Manager, Boslat',
      avatar: "SA"
    },
    {
      id: 3,
      rating: 4,
      text: isArabic 
        ? 'فريق محترف جدًا وملتزم بالمواعيد. ساعدونا في بناء هوية بصرية قوية لعلامتنا التجارية.'
        : 'Very professional team that delivered on time. They helped us build a strong visual identity for our brand.',
      clientName: isArabic ? 'خالد العلي' : 'Khalid Al-Ali',
      clientPosition: isArabic ? 'المالك، Makdouz' : 'Owner, Makdouz',
      avatar: "KA"
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-600'
        }`}
      >
        ★
      </span>
    ))
  }

  return (
    <section className="py-20 relative">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              {isArabic ? 'آراء عملائنا' : 'CLIENT EXPERIENCES'}
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {isArabic 
              ? 'اكتشف ما يقوله عملاؤنا عن رحلتهم الرقمية التحويلية'
              : 'Discover what our clients say about their transformative digital journey.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative group">
              {/* Decorative circles */}
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/30 to-teal-500/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-6 -right-6 w-14 h-14 rounded-full bg-gradient-to-br from-teal-400/30 to-blue-500/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card */}
              <div className="relative bg-[#0a1628]/85 backdrop-blur-lg border border-white/25 rounded-3xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.7)] hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col hover:bg-[#0a1628]/95 hover:shadow-[0_15px_60px_rgba(0,0,0,0.8)]">
                {/* Rating Stars */}
                <div className={`flex ${isArabic ? 'justify-end' : 'justify-start'} mb-4`}>
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote Icon */}
                <div className="mb-6">
                  <svg className="w-10 h-10 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                {/* Testimonial Text */}
                <p className="text-white text-base leading-relaxed mb-6 flex-grow drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-medium">
                  {testimonial.text}
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.clientName}</h4>
                    <p className="text-cyan-300 text-sm">{testimonial.clientPosition}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                {isArabic ? 'قصص نجاح عملائنا' : 'Our Client Success Stories'}
              </span>
            </h3>
            <p className="text-cyan-300 text-lg">
              {isArabic ? 'قصص تجعلنا نبتسم!' : 'Stories that Make Us Smile!'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
