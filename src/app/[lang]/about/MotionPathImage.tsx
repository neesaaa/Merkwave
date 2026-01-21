import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CustomCursorContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 50 });

  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Update cursor only if inside container
      if (
        e.clientX >= rect.left-30 &&
        e.clientX <= rect.right-30 &&
        e.clientY >= rect.top-30 &&
        e.clientY <= rect.bottom-30
      ) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setIsInside(true);
      } else {
        setIsInside(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="mx-auto h-[300px] w-3/4 relative border-2 border-cyan-300 rounded-lg" ref={containerRef} 
         style={{ cursor: isInside ? "none" : "default" }}>
      {/* Custom cursor */}
      <div className="absolute bg-black/60 w-full h-full"></div>
      {isInside && (
        <motion.img
          src="/transparent_logo.png"
          alt="Merkwave Cursor"
          style={{
            width: 190,
            height: 200,
            position: "fixed",
            top: 0,
            left: 0,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
            zIndex: 9999,
          }}
          animate={{ rotate: 360 }} // continuous rotation
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="z-50"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className={`text-4xl font-bold ${
            isInside
              ? "bg-gradient-to-r from-green-400 via-yellow-400 via-cyan-400 via-blue-400 to-red-500 bg-clip-text text-transparent animate-gradient-x"
              : "text-white"
          }`}
        >
          Hover inside this area
        </h1>
      </div>

      {/* Gradient animation keyframes */}
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% }
            50% { background-position: 100% }
            100% { background-position: 0% }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }
        `}
      </style>
    </div>


  );
}
