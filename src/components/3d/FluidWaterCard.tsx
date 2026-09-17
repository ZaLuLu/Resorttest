import React, { useRef, useEffect, useState } from 'react';
import { Waves, Sparkles, Droplets } from 'lucide-react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface FluidWaterCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  badge?: string;
  description?: string;
  className?: string;
}

export const FluidWaterCard: React.FC<FluidWaterCardProps> = ({
  imageSrc,
  title,
  subtitle,
  badge = 'Crystal Waters',
  description,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, strength: 0 };
    const ripples: Ripple[] = [];
    let lastRippleTime = 0;

    const img = new Image();
    img.src = imageSrc;
    let imgLoaded = false;
    img.onload = () => {
      imgLoaded = true;
    };

    // IntersectionObserver to pause render loop when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = clientX;
      mouse.targetY = clientY;
      mouse.strength = 1.0;

      // Spawn dynamic ripple on cursor velocity threshold
      const now = performance.now();
      if (now - lastRippleTime > 70) {
        lastRippleTime = now;
        ripples.push({
          x: clientX,
          y: clientY,
          radius: 4,
          maxRadius: 140,
          alpha: 0.8,
          speed: 2.4,
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.strength = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      // ONLY render if currently visible on screen
      if (isVisibleRef.current) {
        time += 0.035;
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
        mouse.strength += (0 - mouse.strength) * 0.04;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        ctx.clearRect(0, 0, width, height);

        if (imgLoaded) {
          ctx.drawImage(img, 0, 0, width, height);

          ctx.save();
          ctx.globalCompositeOperation = 'overlay';

          // Interactive Sunlit Aqua Pool Radial Glow
          const gradient = ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            8,
            mouse.x,
            mouse.y,
            180
          );
          gradient.addColorStop(0, 'rgba(40, 200, 220, 0.55)');
          gradient.addColorStop(0.4, 'rgba(26, 150, 170, 0.25)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          // Render Continuous Flowing Ambient Waves
          ctx.globalAlpha = 0.25 + mouse.strength * 0.2;
          ctx.strokeStyle = 'rgba(220, 250, 255, 0.75)';
          ctx.lineWidth = 2.2;

          for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            const waveOffset = time * 2.2 + i * 1.4;
            const yBase = (height / 5) * (i + 1);
            ctx.moveTo(0, yBase + Math.sin(waveOffset) * 8);

            for (let x = 0; x <= width; x += 20) {
              const distToMouse = Math.hypot(x - mouse.x, yBase - mouse.y);
              const mouseWave = Math.max(0, 1 - distToMouse / 140) * 16 * Math.sin(time * 6 + x * 0.08);
              const y = yBase + Math.sin(x * 0.02 + waveOffset) * 7 + mouseWave;
              ctx.lineTo(x, y);
            }
            ctx.stroke();
          }

          // Render Propagating Dynamic Cursor Water Ripples
          for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.radius += r.speed;
            r.alpha -= 0.015;

            if (r.alpha <= 0 || r.radius >= r.maxRadius) {
              ripples.splice(i, 1);
              continue;
            }

            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(230, 250, 255, ${r.alpha * 0.65})`;
            ctx.lineWidth = 2.5 * (1 - r.radius / r.maxRadius);
            ctx.stroke();

            // Inner harmonic ring
            if (r.radius > 15) {
              ctx.beginPath();
              ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(180, 240, 255, ${r.alpha * 0.4})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      className={`relative group rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] shadow-[0_16px_36px_rgba(22,41,38,0.08),_inset_0_2px_4px_rgba(255,255,255,0.9)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(26,150,170,0.22)] ${className}`}
    >
      {/* Canvas Layer */}
      <div className="relative h-[320px] w-full overflow-hidden bg-[#E5DFD3]">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Fallback image */}
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
        />

        {/* Shading Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#132422]/85 via-transparent to-black/20 pointer-events-none" />

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#132422]/80 backdrop-blur-md border border-white/20 text-[#FAF6EF] text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <Waves className="w-3.5 h-3.5 text-[#1A96AA] animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Interactive Indicator */}
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
          <Droplets className="w-3 h-3 text-[#74B4C0] animate-bounce" />
          <span>Move to Ripple Waters</span>
        </div>

        {/* Content on Bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <span className="text-xs uppercase tracking-widest font-bold text-[#74B4C0]">
            {subtitle}
          </span>
          <h3 className="font-serif text-2xl font-extrabold text-white mt-0.5">
            {title}
          </h3>
        </div>
      </div>

      {/* Card Info Footer */}
      {description && (
        <div className="p-5 bg-[#FAF6EF]">
          <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default FluidWaterCard;
