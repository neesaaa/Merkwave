'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle
} from 'lucide-react'
import BlackHole from '@/components/BlackHole'

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

export default function ContactClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Build the endpoint from env var so you can configure where the PHP API is hosted
  // Default to the production API base if the env var isn't set
  const base = process.env.NEXT_PUBLIC_API_BASE ?? 'https://merkwave.com/api'
  const url = `${base.replace(/\/+$/,'')}/mails/contact.php`

      // Send as form-encoded values (PHP expects request parameters)
      const body = new URLSearchParams()
      body.append('name', formData.name)
      body.append('email', formData.email)
  body.append('subject', formData.subject)
      body.append('phone', formData.phone)
      body.append('message', formData.message)

      const bodyString = body.toString()
      
      

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyString,
        // include credentials if your PHP API requires cookies/auth
        // credentials: 'include'
      })

      // Try to print response body (JSON or text). Some servers don't set content-type correctly,
      // so read text then try to parse JSON as a fallback.
      const text = await res.text()
      
      
      let parsed
      try {
        parsed = JSON.parse(text)
        
      } catch (e) {
        
        if (!res.ok) {
          throw new Error('Failed to send message')
        }
      }

      // Check if the response indicates failure
      if (parsed && parsed.status === 'failure') {
        console.error('[ContactClient] API returned failure:', parsed.message)
        alert(parsed.message || (isArabic ? 'فشل في إرسال الرسالة' : 'Failed to send message'))
        throw new Error(parsed.message || 'Failed to send message')
      }

      if (!res.ok) {
        console.error('Contact API error', res.status, text)
        throw new Error('Failed to send message')
      }

      setIsSubmitted(true)
      // clear only the visible fields (keep subject if you want)
      setFormData({ name: '', email: '', subject: '', phone: '', message: '' })

      // Hide the success after a short delay
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (err) {
      console.error('Submit error', err)
      // Optionally show an error toast here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-[#0B192A] min-h-screen ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Back to Home Button */}

      {/* Hero Section */}
      <section
        dir={isArabic ? 'rtl' : 'ltr'}
        className="
          relative
          flex flex-col
          min-h-[35vh]
          items-center
          justify-center
          text-center
          overflow-hidden
          bg-[#0B162C]
        "
      >
            <div className="py-4 lg:py-8 px-4 lg:px-[20%] max-w-7xl  self-start ">
              <Link 
                href={`/${lang}` as any}
                className="inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-300"
              >
                <ArrowLeft className={isArabic ? 'rotate-180' : ''} size={20} />
                <span>{isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}</span>
              </Link>
            </div>
        {/* Soft gradient glow */}
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* Subtle noise / depth overlay */}

        {/* Content */}
        <div className=" relative z-10 flex flex-col items-center justify-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">
              {dict.contact.heroTitle}
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {dict.contact.heroSubtitle}
          </motion.p>

          {/* Accent line */}
          <div className="mt-10 h-px w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>
      </section>


      <BlackHole lang={lang} />

      {/* Contact Form and Details Section */}
      <section className="py-20 relative bg-[#0B192A] ">
        <div className="container mx-auto px-4 max-w-7xl" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form - Left Column */}
            <motion.div 
              className="lg:col-span-1  backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30"
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">
                {dict.contact.formTitle}
              </h2>
              
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="text-green-400 mx-auto mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isArabic ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
                  </h3>
                  <p className="text-gray-300">
                    {isArabic ? 'سنتواصل معك قريباً' : 'We\'ll get back to you soon.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {dict.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={dict.contact.namePlaceholder}
                      className="w-full px-4 py-3  border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                    {dict?.contact?.nameHint && (
                      <p id="name-hint" className="text-sm text-gray-400 mt-2">{dict.contact.nameHint}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {dict.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={dict.contact.emailPlaceholder}
                      className="w-full px-4 py-3  border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                    {dict?.contact?.emailHint && (
                      <p id="email-hint" className="text-sm text-gray-400 mt-2">{dict.contact.emailHint}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {dict.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={dict.contact.phonePlaceholder}
                      className="w-full px-4 py-3  border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                    {dict?.contact?.phoneHint && (
                      <p id="phone-hint" className="text-sm text-gray-400 mt-2">{dict.contact.phoneHint}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {dict.contact.subjectLabel}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={dict.contact.subjectPlaceholder}
                      className="w-full px-4 py-3 bg-[#0B162C] border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                    {dict?.contact?.subjectHint && (
                      <p id="subject-hint" className="text-sm text-gray-400 mt-2">{dict.contact.subjectHint}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {dict.contact.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={dict.contact.messagePlaceholder}
                      rows={5}
                      className="w-full px-4 py-3 bg-[#0B192A] border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300 resize-none"
                      required
                      disabled={isSubmitting}
                    />
                    {dict?.contact?.messageHint && (
                      <p id="message-hint" className="text-sm text-gray-400 mt-2">{dict.contact.messageHint}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#F6FF00] to-yellow-500 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (isArabic ? 'جاري الإرسال...' : 'Sending...') : dict.contact.sendButton}
                    <Send size={18} />
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Right Column - Contact Info and Map */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Direct Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="bg-[#0B192A]/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
                  <h2 className="text-2xl font-bold text-[#F6FF00] mb-6">
                    {dict.contact.directContactTitle}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F6FF00] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="text-black" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm ">{dict.contact.phoneLabel}</p>
                        <p className="text-white font-semibold " dir='ltr'>{dict.contact.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F6FF00] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="text-black" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">
                          {isArabic ? 'البريد الإلكتروني:' : 'Email:'}
                        </p>
                        <p className="text-white font-semibold">{dict.contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F6FF00] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-black" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{dict.contact.addressLabel}</p>
                        <p className="text-white font-semibold">{dict.contact.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="bg-[#0B192A]/80 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
                  <h2 className="text-2xl font-bold text-red-400 mb-6">
                    {dict.contact.locationTitle}
                  </h2>
                  
                  {/* Map Container */}
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3451.795381203831!2d31.342198999999997!3d30.100046000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA2JzAwLjIiTiAzMcKwMjAnMzEuOSJF!5e0!3m2!1sen!2seg!4v1766535600332!5m2!1sen!2seg"                  
                      height="100%"
                      width='100%'
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="mt-6 text-center">
                    <motion.button
                      onClick={() => {
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(dict.contact.address)}`, '_blank');
                      }}
                      className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MapPin size={18} />
                      {dict.contact.getDirectionsButton}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
