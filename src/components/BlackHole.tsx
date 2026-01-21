'use client';
import React, { useEffect, useRef } from 'react';

const BlackHole: React.FC<{ lang?: string }> = ({ lang = 'ar' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerHoverRef = useRef<HTMLDivElement | null>(null);
  const STAR_COLORS = ['#02F7FF', '#00FF00', '#FFFF00', '#FF0000'];

  // Flags as refs so both effects can read/write them from closures
  const collapseRef = useRef(false);
  const expanseRef = useRef(false);
  const returningRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

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

    const maxorbit = 255;
    let centerx = cw / 2;
    let centery = ch / 2;

    let startTime = Date.now();
    let currentTime = 0;

    let stars: any[] = [];
    const STAR_COUNT = Math.max(10, Math.floor((cw * ch) / 3000));

    function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [
        cos * (x - cx) + sin * (y - cy) + cx,
        cos * (y - cy) - sin * (x - cx) + cy,
      ];
    }

    class Star {
      x = centerx;
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
        const r1 = Math.random() * (maxorbit / 2) + 1;
        const r2 = Math.random() * (maxorbit / 2) + maxorbit;
        this.orbital = (r1 + r2) / 2;

        this.y = centery + this.orbital;
        this.yOrigin = this.y;

        this.speed = (Math.random() * 2 + 1) * Math.PI / 180;
        this.startRot = (Math.random() * 360) * Math.PI / 180;

        this.collapseBonus = Math.max(0, this.orbital - maxorbit * 0.7);

        this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

        this.hoverPos = centery + maxorbit / 2 + this.collapseBonus;
        this.expansePos = centery + (id % 100) * -10 + (Math.random() * 20 + 1);

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
        const old = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);
        ctx.moveTo(old[0], old[1]);

        ctx.translate(centerx, centery);
        ctx.rotate(this.rotation);
        ctx.translate(-centerx, -centery);

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

    let resizeTimeout: number | undefined;
    let lastHeight = window.innerHeight;

    const handleResize = () => {
      if (Math.abs(window.innerHeight - lastHeight) < 50) return;
      lastHeight = window.innerHeight;

      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        cw = container.offsetWidth;
        ch = container.offsetHeight;

        canvas.width = cw;
        canvas.height = ch;

        centerx = cw / 2;
        centery = ch / 2;

        createStars();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    // cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(canvas)) container.removeChild(canvas);
      window.clearTimeout(resizeTimeout);
    };
  }, []); // run once on mount

  // hover/click effect for the center button — top-level hook (not nested)
  useEffect(() => {
    const hover = centerHoverRef.current;
    if (!hover) return;

    let expanseTimeout: number | undefined;
    let returningTimeout: number | undefined;

    const handleMouseOver = () => {
      if (!expanseRef.current) collapseRef.current = true;
    };
    const handleMouseOut = () => {
      if (!expanseRef.current) collapseRef.current = false;
    };
    const handleClick = () => {
      // set flags via refs
      expanseRef.current = true;
      collapseRef.current = false;

      // optionally open contact window when clicked
      try {
        window.open(`/${lang}/contact`, '_blank', 'width=800,height=600,noopener,noreferrer');
      } catch (e) {
        /* ignore popup blocked */
      }

      // schedule end of expanse and start returning
      expanseTimeout = window.setTimeout(() => {
        expanseRef.current = false;
        returningRef.current = true;

        returningTimeout = window.setTimeout(() => {
          returningRef.current = false;
        }, 6000);
      }, 15000);
    };

    hover.addEventListener('mouseover', handleMouseOver);
    hover.addEventListener('mouseout', handleMouseOut);
    hover.addEventListener('click', handleClick);

    return () => {
      hover.removeEventListener('mouseover', handleMouseOver);
      hover.removeEventListener('mouseout', handleMouseOut);
      hover.removeEventListener('click', handleClick);
      window.clearTimeout(expanseTimeout);
      window.clearTimeout(returningTimeout);
    };
  }, [lang]); // lang included in deps because used inside click

  return (
    <div
      ref={containerRef}
      className="w-full h-[100dvh] bg-[#0B192A] relative overflow-hidden"
      // no container onClick — we handle open in hover click handler
    >
      <div
        ref={centerHoverRef}
        className="absolute left-1/2 top-1/2 w-[255px] h-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer flex items-center justify-center z-10 pointer-events-auto"
      >
        <span className="font text-xl font-bold text-center flex items-center gap-3">
          {lang === 'ar' ? 'اضغط وابدأ مشروعك' : 'Click and Start Your Project'}
        </span>
      </div>
    </div>
  );
};

export default BlackHole;