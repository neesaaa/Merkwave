"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar({ lang = "en" }: { lang?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currentLang = (lang || "en").toUpperCase();
  const pathname = usePathname();
  const isArabic = lang === "ar";

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const switchLanguage = (newLang: string) => {
    setIsOpen(false);
    const newPath =
      pathname?.replace(`/${lang}`, `/${newLang}`) || `/${newLang}`;
    window.location.href = newPath;
  };

  const navigation = [
    { name: isArabic ? "الرئيسية" : "HOME", href: `/${lang}` },
    { name: isArabic ? "الخدمات" : "SERVICES", href: `/${lang}/services` },
    { name: isArabic ? "الأعمال" : "PORTFOLIO", href: `/${lang}/portfolio` },
    { name: isArabic ? "من نحن" : "ABOUT US", href: `/${lang}/about` },
    { name: isArabic ? "المدونة" : "BLOG", href: `/${lang}/blogs` },
  ];

  const directionClass = isArabic ? "rtl" : "ltr";

  return (
    <nav
      className={`bg-black/90 backdrop-blur-md border-b border-[#00D4CD] top-0 z-50 relative ${directionClass}`}
      dir={directionClass}
    >
      <div className="container z-50 mx-auto md:px-2 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between h-12 md:h-18  gap-2 ">
          {/* Logo */}
          <div className="flex-shrink-0 px-2 md:px-0" suppressHydrationWarning>
            <Link
              href={`/${lang}`}
              className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group transform hover:scale-110 group"
            >
              <Image
                src="/MERKWAV-Logo.png"
                alt="MerkWave Logo"
                width={180}
                height={60}
                className=" "
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center md:space-x-1 lg:space-x-2">
            {navigation.map((item) => {
              const isActive = mounted && pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href as any}
                  className={`relative  transition-all text-md md:text-xs lg:text-base duration-300 group px-3 py-2  ${
                    isActive ? "" : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${
                      isActive ? "w-full shadow-[0_0_8px_#00ffff] " : ""
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side: LET'S TALK + Language Switcher + Mobile Menu */}
          <div
            className={`flex items-center ${isArabic ? "space-x-reverse" : ""} space-x-2 lg:space-x-4`}
          >
            {/* LET'S TALK button */}
            <Link
              href={`/${lang}/contact`}
              className={`hidden md:inline-flex items-center font-semibold px-6 py-3 bg-[#F6FF00] !text-black 
                 rounded-full 
                hover:text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-700 
                hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-200 whitespace-nowrap`}
            >
              <span className="inline lg:hidden !text-black">
                {isArabic ? "لنتحدث" : "TALK"}
              </span>
              <span className="hidden lg:inline !text-black">
                {isArabic ? "لنتحدث" : "LET'S TALK"}
              </span>
            </Link>

            {/* Language Switcher */}
            <div
              className={`hidden md:flex items-center text-white font-medium ${isArabic ? "space-x-reverse" : ""} space-x-2`}
            >
              <button
                onClick={() => switchLanguage("en")}
                className={`px-2 py-1 rounded transition-all duration-200 ${
                  currentLang === "EN"
                    ? "text-[#F6FF00] bg-[#2A0024]"
                    : "hover:text-yellow-100"
                }`}
              >
                EN
              </button>
              <span className="text-gray-500">|</span>
              <button
                onClick={() => switchLanguage("ar")}
                className={`px-2 py-1 rounded transition-all duration-200 ${
                  currentLang === "AR"
                    ? "text-[#F6FF00] bg-[#2A0024]"
                    : "hover:text-yellow-100"
                }`}
              >
                AR
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-cyan-400 transition-all duration-200 p-2 rounded-lg hover:bg-cyan-400/10"
            >
              {isOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 w-full z-50 transition-all duration-400 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-cyan-500/20 py-6 bg-black/95 backdrop-blur-md rounded-b-2xl shadow-2xl mx-2 mb-2">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = mounted && pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href as any}
                    className={`flex items-center py-4 px-6 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 font-medium text-lg rounded-xl mx-3 group ${
                      isActive ? "text-cyan-400 bg-cyan-400/10" : ""
                    }`}
                    style={{
                      borderLeft: isActive
                        ? "4px solid #00ffff"
                        : "4px solid transparent",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile actions */}
              <div className="mt-6 px-4 flex flex-col space-y-3">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-cyan-400 text-black font-semibold rounded-full hover:bg-cyan-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {isArabic ? "لنتحدث" : "LET'S TALK"}
                </Link>

                {/* Mobile language switcher */}
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-white font-medium">
                    {isArabic ? "اللغة:" : "Language:"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => switchLanguage("en")}
                      className={`px-3 py-1 rounded transition-all duration-200 ${
                        currentLang === "EN"
                          ? "text-cyan-400 bg-cyan-400/10"
                          : "text-gray-300 hover:text-cyan-400"
                      }`}
                    >
                      EN
                    </button>
                    <span className="text-gray-500">|</span>
                    <button
                      onClick={() => switchLanguage("ar")}
                      className={`px-3 py-1 rounded transition-all duration-200 ${
                        currentLang === "AR"
                          ? "text-cyan-400 bg-cyan-400/10"
                          : "text-gray-300 hover:text-cyan-400"
                      }`}
                    >
                      AR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
