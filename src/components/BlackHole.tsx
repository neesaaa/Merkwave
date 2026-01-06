'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';


const BlackHole: React.FC<{ lang?: string }> = ({ lang = 'ar' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerHoverRef = useRef<HTMLDivElement | null>(null);
  const STAR_COLORS = ['#02F7FF', '#00FF00', '#FFFF00', '#FF0000'];
  const [isMobile, setIsMobile] = useState(false);
  const collapseRef = useRef(false);
  const expanseRef = useRef(false);
  const returningRef = useRef(false);
  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Stars effect
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // ----- MOBILE: static stars -----
if (isMobile) {
  const canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  const ctx = canvas.getContext('2d')!;

  const STAR_COUNT = 10;
  const stars: { x: number; y: number; color: string; alpha: number; delta: number }[] = [];

  // Initialize stars
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      alpha: Math.random() * 0.5 + 0.5, // initial brightness
      delta: (Math.random() * 0.02) + 0.005, // speed of twinkle
    });
  }

  container.appendChild(canvas);

  let rafId: number;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      ctx.fillStyle = star.color;
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
      ctx.fill();

      // update alpha for twinkle
      star.alpha += star.delta;
      if (star.alpha > 1 || star.alpha < 0.5) star.delta *= -1;
    });

    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup
  return () => {
    cancelAnimationFrame(rafId);
    if (container.contains(canvas)) container.removeChild(canvas);
  };
}

    // ----- DESKTOP: animated stars -----
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    let cw = container.offsetWidth;
    let ch = container.offsetHeight;
    canvas.width = cw;
    canvas.height = ch;

    const maxOrbit = 255;
    let centerX = cw / 2;
    let centerY = ch / 2;

    let startTime = Date.now();
    let currentTime = 0;

    const STAR_COUNT = Math.max(10, Math.floor((cw * ch) / 3000));
    let stars: any[] = [];

    function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [cos * (x - cx) + sin * (y - cy) + cx, cos * (y - cy) - sin * (x - cx) + cy];
    }

    class Star {
      x = centerX;
      y: number;
      yOrigin: number;
      speed: number;
      rotation = 0;
      startRot: number;
      collapseBonus: number;
      color: string;
      hoverPos: number;
      expansePos: number;
      prevR: number;
      prevX: number;
      prevY: number;
      originalY: number;
      orbital: number;

      constructor(id: number) {
        const r1 = Math.random() * (maxOrbit / 2) + 1;
        const r2 = Math.random() * (maxOrbit / 2) + maxOrbit;
        this.orbital = (r1 + r2) / 2;

        this.y = centerY + this.orbital;
        this.yOrigin = this.y;
        this.speed = (Math.random() * 2 + 1) * Math.PI / 180;
        this.startRot = (Math.random() * 360) * Math.PI / 180;
        this.collapseBonus = Math.max(0, this.orbital - maxOrbit * 0.7);
        this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        this.hoverPos = centerY + maxOrbit / 2 + this.collapseBonus;
        this.expansePos = centerY + (id % 100) * -10 + (Math.random() * 20 + 1);
        this.prevR = this.startRot;
        this.prevX = this.x;
        this.prevY = this.y;
        this.originalY = this.yOrigin;
      }

      draw() {
        const collapse = collapseRef.current;
        const expanse = expanseRef.current;
        const returning = returningRef.current;

        if (!expanse && !returning) {
          this.rotation = this.startRot + currentTime * this.speed;
          this.y += collapse ? (this.hoverPos - this.y) * 0.05 : (this.yOrigin - this.y) * 0.1;
        } else if (expanse) {
          this.rotation = this.startRot + currentTime * (this.speed / 2);
          this.y += (this.expansePos - this.y) * 0.02;
        } else if (returning) {
          this.rotation = this.startRot + currentTime * this.speed;
          this.y += (this.originalY - this.y) * 0.05;
        }

        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        ctx.beginPath();
        const old = rotate(centerX, centerY, this.prevX, this.prevY, -this.prevR);
        ctx.moveTo(old[0], old[1]);

        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);
        ctx.translate(-centerX, -centerY);

        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
      }
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star(i));
    }

    createStars();

    let last = 0;
    let rafId = 0;
    function loop(t: number) {
      if (t - last < 33) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      last = t;
      currentTime = (Date.now() - startTime) / 50;
      ctx.fillStyle = 'rgba(11,25,42,0.25)';
      ctx.fillRect(0, 0, cw, ch);
      stars.forEach((s) => s.draw());
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    const handleResize = () => {
        cw = container.offsetWidth;
        ch = container.offsetHeight;
        canvas.width = cw;
        canvas.height = ch;
      centerX = cw / 2;
      centerY = ch / 2;
        createStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[100dvh] bg-[#0B192A] relative overflow-hidden"
      // no container onClick — we handle open in hover click handler
    >
 <motion.div
      ref={centerHoverRef}
      className={`
        absolute left-1/2 top-1/2 w-[255px] h-[80px] -translate-x-1/2 -translate-y-1/2 
        rounded-full cursor-pointer flex items-center justify-center z-10 pointer-events-auto
        ${isMobile ? 'border-2 border-white' : ''}
      `}
      animate={isMobile ? { scale: [1, 1.05, 1] } : {}}
      transition={isMobile ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <span className="font text-xl font-bold text-center flex items-center gap-3">
        {lang === 'ar' ? 'اضغط وابدأ مشروعك' : 'Click and Start Your Project'}
      </span>
    </motion.div>
    </div>
  );
};

export default BlackHole;
