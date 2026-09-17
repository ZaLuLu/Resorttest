import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';

interface Diorama3DParallaxProps {
  imageSrc: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Diorama3DParallax: React.FC<Diorama3DParallaxProps> = ({
  imageSrc,
  badge = '3D Spatial Depth',
  title = 'Resort Heritage View',
  subtitle = 'Move mouse to experience holographic depth layers',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-[0_16px_36px_rgba(22,41,38,0.1),_inset_0_2px_4px_rgba(255,255,255,0.9)] [perspective:1200px] select-none ${className}`}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1] [transform-style:preserve-3d]">
        
        {/* Background Hill Plane (Slow Parallax) */}
        <motion.div
          animate={{
            x: coords.x * -18,
            y: coords.y * -14,
            scale: 1.12,
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 25 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover filter saturate-[1.1] brightness-[0.95]"
          />
        </motion.div>

        {/* Midground Architecture Depth Layer */}
        <motion.div
          animate={{
            x: coords.x * 22,
            y: coords.y * 18,
            scale: 1.05,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#132422]/80 via-transparent to-black/10" />
        </motion.div>

        {/* Foreground Foliage & Glare Layer (Fast Parallax) */}
        <motion.div
          animate={{
            x: coords.x * 38,
            y: coords.y * 28,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          {/* Radial Sun Glare Sheen */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(255,255,255,0.4) 0%, rgba(26,150,170,0.1) 40%, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* Top Badge */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#132422]/85 backdrop-blur-md border border-white/20 text-[#FAF6EF] text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
          <span>{badge}</span>
        </div>

        {/* Bottom Captions */}
        <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#E2BA84] block mb-0.5">
            {subtitle}
          </span>
          <h4 className="font-serif text-xl font-bold text-white leading-tight">
            {title}
          </h4>
        </div>

      </div>
    </div>
  );
};

export default Diorama3DParallax;
