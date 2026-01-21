import { motion, Transition } from "framer-motion";
import React from "react";

interface AnimatedTextRevealProps {
  text: string;
  className?: string;
  delayIncrement?: number;
  isArabic?: boolean;
}

const AnimatedTextReveal: React.FC<AnimatedTextRevealProps> = ({ 
  text, 
  className,
  delayIncrement = 0.1,
  isArabic = false
}) => {
  
  const charTransition: Transition = {
    duration: 1,
  };

  const combinedClassName = className 
    ? className 
    : "text-white font-bold font-sans text-4xl"; 
  const char=isArabic?' ':'';
  const characters = text.split(char);

  return (
      <>     
      {characters.map((char, index) => {
        
        return (
          <motion.span 
            key={index}
            className={combinedClassName}
            
            initial={{
              opacity: 0,
              filter: 'blur(10px)'
            }}
            
            animate={{
              opacity: 1,
              filter: 'blur(0px)'
            }}
            
            transition={{
              ...charTransition,
              delay: delayIncrement * index, 
            }}
          >
            {char === " " ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </>
  );
};

export default AnimatedTextReveal;