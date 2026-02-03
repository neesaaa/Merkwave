"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  isArabic?: boolean;
}

export const Timeline = ({
  data,
  isArabic,
  titleText,
  subtitleText,
  accentColor,
}: {
  data: TimelineEntry[];
  isArabic: boolean;
  titleText: string;
  subtitleText?: string;
  accentColor?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768); 
    }
  }, []);
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const offsetScroll = useTransform(scrollYProgress, (value) => value + 0.03);
  const heightTransform = useTransform(offsetScroll, [0, 1], [0, height]);
  const opacityTransform = useTransform(offsetScroll, [0, 0.1], [0, 1]);

  return (
    <div className="max-w-screen z-30 px-2 md:px-10 " ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-2 mt-4  "
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span style={{ color: accentColor || "#00FFFF" }}>
            {titleText}
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          {subtitleText}
        </p>
      </motion.div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {/* Timeline entries */}
        {data.map((item, index) => {
          const circleStart = index / data.length;
          const circleEnd = (index + 0.5) / data.length;

          // Circle color: dark cyan to bright cyan
          const circleColor = useTransform(
            scrollYProgress,
            [circleStart, circleEnd],
            ["#00ffff", "#00FFFF"]
          );

          const textColor = useTransform(
            scrollYProgress,
            [circleStart, circleEnd],
            [
              "#6b7280", // neutral gray
              "#ffffff", // white
            ]
          );

          const headerColor = useTransform(
            scrollYProgress,
            [circleStart, circleEnd],
            [
              "#6b7280", // neutral gray
              accentColor, // accent
            ]
          );

          return (
            <div
              key={index}
              className={`flex justify-start pt-10 md:pt-40 ${isArabic ? 'gap-0':'gap-16'} md:gap-10`}
            >
              <div className="md:sticky flex flex-col  md:flex-row z-40 items-center top-40 self-start max-w-sm lg:max-w-sm md:w-full">
                <motion.div
                  style={{ backgroundColor: circleColor }}
                  className={`w-6 h-6 md:h-8 md:w-8    absolute ${
                    isArabic ? "right-3 md:right-2" : "left-3 md:left-2"
                  } flex items-center justify-center mt-4 md:mt-0 shadow-lg rounded-full`}
                >
                  {item.icon && (
                    <motion.div
                      style={{
                        scale: useTransform(
                          scrollYProgress,
                          [circleStart, circleEnd],
                          isMobile ? [0.9, 1.4] : [0.4, 0.9]
                        ),
                        boxShadow: `0 0 40px ${accentColor || "#00FFFF"}`,

                      }}
                      className={`flex items-center justify-center bg-teal-100 gap-12  rounded-full`}
                    >
                      {item.icon}
                    </motion.div>
                  )}
                </motion.div>

                <motion.h3
                  style={{
                    color: headerColor,
                    scale: useTransform(
                      offsetScroll,
                      [circleStart - 0.08, circleEnd],
                      [1, 1.1]
                    ),
                  }}
                  className={`hidden md:block text-2xl z-30   ${
                    isArabic ? " md:pr-26" : "md:pl-26"
                  } lg:text-3xl font-bold `}
                >
                  {item.title}
                </motion.h3>
              </div>

              <div className="relative md:pl-8 w-full">
                <motion.h3
                  style={{ color: headerColor }}
                  className={`md:hidden block text-2xl mb-4  font-bold ${isArabic ? 'text-right' : 'text-left'}   pr-20  `}
                >
                  {item.title}
                </motion.h3>
                <motion.div className="text-sm sm:text-lg w-full" style={{ color: textColor }}>
                  {item.content}
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Vertical line */}
        <div
          style={{ height: height + "px" }}
          className={`absolute ${
            isArabic ? "right-7" : "left-7"
          } top-0 hidden md:block overflow-hidden z-30 w-[2px]`}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          >
            <motion.div
              style={{ height: "100%" }}
              className="w-[2px] bg-gradient-to-t from-cyan-500 via-cyan-800 to-cyan-200 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
