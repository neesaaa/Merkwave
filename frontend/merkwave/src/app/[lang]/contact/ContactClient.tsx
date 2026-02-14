"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlackHoleMobile from "@/components/BlackHoleMobile";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import BlackHole from "@/components/BlackHole";
import { API_ENDPOINTS } from "@/config/api";

interface LocalizedComponentProps {
  dict: any;
  lang: string;
}

export default function ContactClient({ dict, lang }: LocalizedComponentProps) {
  const isArabic = lang === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Send as JSON to the new .NET backend
      const res = await fetch(API_ENDPOINTS.CLIENTS.CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Contact API error", res.status, errorText);
        throw new Error(errorText || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      console.error("Submit error", err);
      alert(
        isArabic
          ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
          : "An error occurred while sending your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-[#0B192A] min-h-screen `}>
      {/* Back to Home Button */}

      {/* Hero Section */}
      <section
        dir={isArabic ? "rtl" : "ltr"}
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
            <ArrowLeft className={isArabic ? "rotate-180" : ""} size={20} />
            <span>{isArabic ? "العودة إلى الرئيسية" : "Back to Home"}</span>
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

      {isMobile ? <BlackHoleMobile lang={lang} /> : <BlackHole lang={lang} />}

      {/* Contact Form and Details Section */}
      <section id="contact-form" className="py-20 relative bg-[#0B192A] ">
        <div
          className="container mx-auto px-4 max-w-7xl"
          dir={isArabic ? "rtl" : "ltr"}
        >
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
                  <CheckCircle
                    className="text-green-400 mx-auto mb-4"
                    size={64}
                  />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isArabic
                      ? "تم إرسال رسالتك بنجاح!"
                      : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-gray-300">
                    {isArabic
                      ? "سنتواصل معك قريباً"
                      : "We'll get back to you soon."}
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
                      <p id="name-hint" className="text-sm text-gray-400 mt-2">
                        {dict.contact.nameHint}
                      </p>
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
                      <p id="email-hint" className="text-sm text-gray-400 mt-2">
                        {dict.contact.emailHint}
                      </p>
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
                      <p id="phone-hint" className="text-sm text-gray-400 mt-2">
                        {dict.contact.phoneHint}
                      </p>
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
                      <p
                        id="subject-hint"
                        className="text-sm text-gray-400 mt-2"
                      >
                        {dict.contact.subjectHint}
                      </p>
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
                      <p
                        id="message-hint"
                        className="text-sm text-gray-400 mt-2"
                      >
                        {dict.contact.messageHint}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#F6FF00] to-yellow-500 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting
                      ? isArabic
                        ? "جاري الإرسال..."
                        : "Sending..."
                      : dict.contact.sendButton}
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
                      <a
                        href={`tel:${dict.contact.phone}`}
                        className="flex items-center gap-4"
                      >
                        <div className="w-12 h-12 bg-[#F6FF00] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="text-black" size={20} />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            {dict.contact.phoneLabel}
                          </p>
                          <p className="text-white font-semibold" dir="ltr">
                            {dict.contact.phone}
                          </p>
                        </div>
                      </a>
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href={`mailto:${dict.contact.email}`}
                        className="flex items-center gap-4"
                      >
                        <div className="w-12 h-12 bg-[#F6FF00] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="text-black" size={20} />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            {isArabic ? "البريد الإلكتروني:" : "Email:"}
                          </p>
                          <p className="text-white font-semibold">
                            {dict.contact.email}
                          </p>
                        </div>
                      </a>
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href="https://www.google.com/maps/place/30%C2%B006'00.2%22N+31%C2%B020'31.9%22E/@30.100046,31.342199,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.100046!4d31.342199?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4"
                      >
                        <div className="w-12 h-12 bg-[#F6FF00] rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-black" size={20} />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            {isArabic ? "العنوان:" : "Address:"}
                          </p>
                          <p className="text-white font-semibold">
                            {isArabic
                              ? "٩٢ شارع عثمان بن عفان، ميدان تريومف، مصر الجديدة، القاهرة، مصر"
                              : "92 Othman Ibn Affan, Triumph Sq, Heliopolis, Cairo, Egypt"}
                          </p>
                        </div>
                      </a>
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
                      width="100%"
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
                        window.open(
                          `https://www.google.com/maps/place/30%C2%B006'00.2%22N+31%C2%B020'31.9%22E/@30.100046,31.342199,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.100046!4d31.342199?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D`,
                          "_blank",
                        );
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
