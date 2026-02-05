"use client";

import React, { useState, useEffect } from "react";

type GlassFolderProps = {
  icon?: React.ReactNode;
  className?: string;
};

const GlassFolder: React.FC<GlassFolderProps> = ({ icon, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only run timer on mobile devices (below md breakpoint)
    const checkMobile = () => window.innerWidth < 768;

    if (checkMobile()) {
      const interval = setInterval(() => {
        setIsOpen((prev) => !prev);
      }, 1000); // Toggle every 2 seconds

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section
      className={`relative group flex flex-col items-center justify-center ${className ?? ""}`}
    >
      <div className="relative w-40 h-28 sm:w-52 sm:h-36 md:w-60 md:h-40 lg:w-72 lg:h-48 cursor-pointer origin-bottom [perspective:1500px] z-10">
        {/* Top tab */}
        <div
          className={`bg-pink-600/30 backdrop-blur-md w-full h-full origin-top rounded-2xl rounded-tl-none 
          ${isOpen ? "shadow-[inset_0_20px_40px_rgba(255,105,180,0.4),inset_0_-20px_40px_rgba(219,112,147,0.3)]" : ""} 
          md:group-hover:shadow-[inset_0_20px_40px_rgba(255,105,180,0.4),inset_0_-20px_40px_rgba(219,112,147,0.3)] 
          transition-all ease duration-700 relative 
          after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-16 sm:after:w-20 after:h-3 sm:after:h-4 after:bg-pink-600/30 after:backdrop-blur-md after:rounded-t-2xl 
          before:absolute before:content-[''] before:-top-[12px] sm:before:-top-[15px] before:left-[60px] sm:before:left-[75.5px] before:w-3 sm:before:w-4 before:h-3 sm:before:h-4 before:bg-pink-600/30 before:backdrop-blur-md before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]`}
        ></div>

        {/* Folder layers */}
        <div
          className={`absolute inset-1 ${isOpen ? 'bg-pink-500/25' : 'bg-pink-500/10'} backdrop-blur-md rounded-2xl transition-all ease duration-700 origin-bottom select-none z-[5]
          ${isOpen ? "[transform:rotateX(-20deg)]" : ""} 
          md:group-hover:[transform:rotateX(-20deg)] md:group-hover:bg-pink-500/25`}
        ></div>
        <div
          className={`absolute inset-1 ${isOpen ? 'bg-pink-500/20' : 'bg-pink-500/10'} backdrop-blur-md rounded-2xl transition-all ease duration-700 origin-bottom z-[4]
          ${isOpen ? "[transform:rotateX(-30deg)]" : ""} 
          md:group-hover:[transform:rotateX(-30deg)] md:group-hover:bg-pink-500/20`}
        ></div>
        <div
          className={`absolute inset-1 ${isOpen ? 'bg-pink-500/15' : 'bg-pink-500/10'} backdrop-blur-md rounded-2xl transition-all ease duration-700 origin-bottom z-[3]
          ${isOpen ? "[transform:rotateX(-38deg)]" : ""} 
          md:group-hover:[transform:rotateX(-38deg)] md:group-hover:bg-pink-500/15`}
        ></div>

        {/* Front folder layer with icon */}
        <div
          className={`absolute bottom-0 bg-pink-500/20 backdrop-blur-md w-full h-[130px] sm:h-[140px] md:h-[156px] lg:h-[180px] rounded-2xl rounded-tr-none z-[10]
          after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[120px] sm:after:w-[146px] after:h-[14px] sm:after:h-[16px] after:bg-pink-500/20 after:backdrop-blur-md after:rounded-t-2xl 
          before:absolute before:content-[''] before:-top-[8px] sm:before:-top-[10px] before:right-[120px] sm:before:right-[142px] before:size-3 before:bg-pink-500/20 before:backdrop-blur-md before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] 
          transition-all ease duration-700 origin-bottom flex items-center justify-center 
          ${isOpen ? "shadow-[inset_0_20px_40px_rgba(255,105,180,0.4),inset_0_-20px_40px_rgba(219,112,147,0.3)] [transform:rotateX(-46deg)_translateY(1px)]" : ""} 
          md:group-hover:shadow-[inset_0_20px_40px_rgba(255,105,180,0.4),inset_0_-20px_40px_rgba(219,112,147,0.3)] 
          md:group-hover:[transform:rotateX(-46deg)_translateY(1px)]`}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl z-20">
            {icon}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlassFolder;
