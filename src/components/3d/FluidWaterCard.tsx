import React, { useRef, useEffect, useState } from 'react';
import { Waves, Sparkles } from 'lucide-react';

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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR for performance
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.strength = 1.0;
    };

    const handleMouseLeave = () => {
      mouse.strength = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      // ONLY render if currently visible on screen
      if (isVisibleRef.current) {
        time += 0.03;
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
        mouse.strength += (0 - mouse.strength) * 0.05;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        ctx.clearRect(0, 0, width, height);

        if (imgLoaded) {
          ctx.drawImage(img, 0, 0, width, height);

          ctx.save();
          ctx.globalCompositeOperation = 'overlay';

          const gradient = ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            10,
            mouse.x,
            mouse.y,
            160
          );
          gradient.addColorStop(0, 'rgba(26, 150, 170, 0.45)');
          gradient.addColorStop(0.5, 'rgba(116, 180, 192, 0.2)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);

          ctx.globalAlpha = 0.18 + mouse.strength * 0.15;
          ctx.strokeStyle = 'rgba(230, 248, 250, 0.6)';
          ctx.lineWidth = 2.0;

          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            const waveOffset = time * 2 + i * 1.5;
            const yBase = (height / 4) * (i + 1);
            ctx.moveTo(0, yBase + Math.sin(waveOffset) * 10);

            for (let x = 0; x <= width; x += 25) {
              const distToMouse = Math.hypot(x - mouse.x, yBase - mouse.y);
              const mouseWave = Math.max(0, 1 - distToMouse / 120) * 14 * Math.sin(time * 5 + x * 0.05);
              const y = yBase + Math.sin(x * 0.015 + waveOffset) * 8 + mouseWave;
              ctx.lineTo(x, y);
            }
            ctx.stroke();
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
      className={`relative group rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] shadow-[0_16px_36px_rgba(22,41,38,0.08),_inset_0_2px_4px_rgba(255,255,255,0.9)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(26,150,170,0.18)] ${className}`}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#132422]/80 via-transparent to-black/20 pointer-events-none" />

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-[#132422]/80 backdrop-blur-md border border-white/20 text-[#FAF6EF] text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <Waves className="w-3.5 h-3.5 text-[#1A96AA] animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Interactive Indicator */}
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#E2BA84]" />
          <span>Hover to Ripple</span>
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
