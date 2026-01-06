  import Link from 'next/link'
  import { useState, useEffect, use } from 'react'
  import { ArrowRight } from 'lucide-react'
  import { motion } from 'framer-motion'
  import Image from 'next/image'
  import dynamic from 'next/dynamic'

  const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })


  interface HeroSectionProps {
    dict: any; 
    lang: string; 
  }

  export default function HeroSection({ dict, lang }: HeroSectionProps) {
    const [mounted, setMounted] = useState(false)
    const isArabic = lang === 'ar';
    const [isMobile, setIsMobile] = useState(false);
    const [show3D, setShow3D] = useState(false);

    useEffect(() => {
      setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
      const ric = window.requestIdleCallback ?? function (cb: FrameRequestCallback) {
        return setTimeout(() => cb({ timeRemaining: () => 0, didTimeout: false } as any), 1)
      }

      const cancel = window.cancelIdleCallback ?? clearTimeout

      const id = ric(() => setShow3D(true))

      return () => cancel(id)
    }, [])




    useEffect(() => {
      setMounted(true)
    }, [])
    
    const textDirClass = isArabic ? 'text-right' : 'text-left';
    const lgTextDirClass = isArabic ? 'lg:text-right' : 'lg:text-left';
    

    return (
      <section className={`relative h-screen bg-[#0B192A] overflow-hidden flex items-center z-0`} dir={isArabic ? 'rtl' : 'ltr'}>


        {/* سstar background behind illustration */}
        <motion.div
          className="absolute inset-0 pointer-events-none scale-120 xl:scale-100"
          style={{ transformOrigin: "top left" }} 
          animate={{
            scale: [1, 1.45, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/starsHero.webp"
            alt="Star Background"
            fill
            className="object-cover"
            decoding="async"
          />
        </motion.div >
      

        <div className="absolute inset-0 pointer-events-none">
          {/* left light */}
          <motion.div 
            className={`

              absolute ${isArabic ? "right-[20%] md:right-1/2 sm:inset-0" : "left-[40%]"} top-[300px]  md:top-[50px]
              w-[350px] md:w-[1000px]
              h-[300px] md:h-[1000px]
              rounded-full
              blur-[140px]
              mix-blend-lighten
              bg-gradient-to-br from-[#00D4CD] via-[#009DA6] to-[#009DA6]
            `}
            animate={{
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* right light */}
          <motion.div 
            className={`
              absolute ${isArabic ? "right-0 md:right-1/2 sm:inset-0" : "left-[40%]"} top-[50px] translate-x-80
              w-[350px] md:w-[1000px]
              h-[300px] md:h-[1000px]
              rounded-full
              blur-[140px]
              mix-blend-lighten
              bg-gradient-to-tr from-[#00D4CD] via-[#009DA6] to-[#009DA6]
            `}
            animate={{
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>




        <div className=" flex flex-col lg:flex-row px-2 sm:px-1 lg:px-0 relative  w-full h-full items-center justify-center">

          <div className={`flex flex-col justify-center w-full md:w-full lg:w-[70%] h-1/2 lg:h-full self-center jus  gap-6  items-center rounded-xl z-[9999] px-1  md:max-w-[80%]  ${isArabic ? "xl:pr-40 lg:pr-80 md:pr-3 sm:pr-1" : "xl:pl-40 lg:pl-80 md:pl-2"}`}>
            {/* Left content */}
            <motion.div 
              className={`${textDirClass} ${lgTextDirClass} `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
             
              {/* Main headline with gradient */}
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl  font-bold mb-6 leading-tight "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                  {isArabic ? (
                    <>
                      <span  className="text-white " > تمكين </span>
                      <span  className="bg-gradient-to-r from-[#FF4D4D ] bg-[#D00000] to-[#FF4D4D ] bg-clip-text text-transparent " >أعمالك</span>
                      <br />
                      <span className="text-white">بحلول </span>
                      <span  className=" from-[#00BEC3]   bg-[#FFF200] to-[#05C1C5] bg-clip-text text-transparent" >رقمية ذكية</span>
                    </>
                  ) : (
                    <>
                      <span className="text-white">Empowering Your </span>
                      <span className="bg-gradient-to-r from-[#00BEC3] via-[#00F9FF] to-[#05C1C5] bg-clip-text text-transparent">
                        Business
                      </span>
                      <br />
                      <span className="text-white">with Smart </span>
                      <span className="bg-gradient-to-r from-[#00BEC3] via-[#00F9FF] to-[#05C1C5] bg-clip-text text-transparent">
                        Digital Solutions
                      </span>
                    </>
                )}
              </motion.h1>

              {/* Subtext */}
              <motion.p 
                className={`text-white text-sm md:text-lg lg:text-xl mb-10 max-w-2xl leading-relaxed`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {isArabic 
                  ? 'نساعد الشركات الصغيرة والمتوسطة على النمو من خلال التسويق الرقمي الإبداعي، وتطوير البرمجيات المخصصة، والاستشارات الاستراتيجية.'
                  : 'We help SMBs grow with creative digital marketing, bespoke software development, and strategic consulting.'}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className={`flex flex-row  w-full  z-50 justify-start gap-2 lg:gap-4 items-start`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Link href={`/${lang}/contact`}>
                  <motion.button
                      className="group relative inline-flex items-center justify-center px-6 md:px-8 py-4  bg-gradient-to-r from-[#F9FF00] to-[#FFD000] text-black font-bold text-sm xl:text-lg   rounded-full shadow-lg shadow-orange-400/30 overflow-hidden"
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(255,220,0,0.45)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={isArabic ? 'ml-2' : 'mr-2'}>
                      {isArabic ? 'ابدأ الآن' : 'Get Started'}
                    </span>
                    <ArrowRight className={`w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200 ${isArabic ? 'rotate-180' : ''}`} />
                  </motion.button>
                </Link>
                
                <Link href={`/${lang}/services`}>
                  <motion.button
                    className="inline-flex items-center z-50 justify-center px-8 py-4  border-2 bg-gradient-to-r from-[#FF4D4D] to-[#C40000]  text-black font-semibold text-sm  xl:text-lg rounded-full  hover:text-black hover:shadow-[0_8px_20px_rgba(255,77,77,0.35)]
 hover:border-red-800 hover:bg-green-200 backdrop-blur-sm transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isArabic ? 'استكشف الخدمات' : 'View Our Work'}
                  </motion.button>

                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Left side: Canvas */}
          <div className="h-1/2 w-full lg:h-full ">
            {mounted && show3D && <HeroCanvas isArabic={isArabic} />}

          </div>
        </div>

      </section>
    )
  }


