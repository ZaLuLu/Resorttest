import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Compass, Sun } from 'lucide-react';

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
  subtitle = 'Move cursor to experience 3D mountain perspective',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Sunbeam drifting motes configuration
  const sunbeams = [
    { x: '15%', y: '25%', size: 6, delay: 0, dur: 4 },
    { x: '35%', y: '65%', size: 4, delay: 1.2, dur: 5 },
    { x: '70%', y: '30%', size: 8, delay: 0.6, dur: 4.5 },
    { x: '85%', y: '75%', size: 5, delay: 2.1, dur: 6 },
    { x: '50%', y: '45%', size: 5, delay: 1.8, dur: 3.8 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-[0_16px_36px_rgba(22,41,38,0.1),_inset_0_2px_4px_rgba(255,255,255,0.9)] [perspective:1000px] select-none ${className}`}
    >
      {/* 3D Tilting Card Canvas Container */}
      <motion.div
        animate={{
          rotateX: isHovered ? coords.y * -16 : 0,
          rotateY: isHovered ? coords.x * 18 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 22,
          mass: 0.6,
        }}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1] [transform-style:preserve-3d] shadow-lg"
      >
        
        {/* Background Layer: Slow Parallax Shift + Deep Color Grade */}
        <motion.div
          animate={{
            x: coords.x * -24,
            y: coords.y * -18,
            scale: 1.15,
          }}
          transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover filter saturate-[1.12] brightness-[0.96]"
          />
        </motion.div>

        {/* Midground Mist & Atmosphere Gradients */}
        <motion.div
          animate={{
            x: coords.x * 16,
            y: coords.y * 12,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E1B]/85 via-[#0F1E1B]/20 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1A96AA]/20 via-transparent to-[#E2BA84]/15" />
        </motion.div>

        {/* Floating Sunbeam Light Motes Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {sunbeams.map((beam, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3, y: 0 }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                y: [-12, 12, -12],
                x: [-6, 6, -6],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: beam.dur,
                delay: beam.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                left: beam.x,
                top: beam.y,
                width: beam.size,
                height: beam.size,
              }}
              className="absolute rounded-full bg-[#FFE4A0] shadow-[0_0_12px_#FFE4A0]"
            />
          ))}
        </div>

        {/* Foreground Cursor-tracking Specular Light Glare Sheen */}
        <motion.div
          animate={{
            x: coords.x * 42,
            y: coords.y * 32,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.65 : 0.25,
              background: `radial-gradient(circle 320px at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(255,255,255,0.45) 0%, rgba(226,186,132,0.2) 35%, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-full bg-[#132422]/85 backdrop-blur-md border border-white/20 text-[#FAF6EF] text-xs font-semibold flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#1A96AA] animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Top Right Live Indicator */}
        <div className="absolute top-4 right-4 z-30 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#38D39F] animate-ping" />
          <span>Live 3D Parallax</span>
        </div>

        {/* Bottom Captions & Spatial Typography */}
        <div className="absolute bottom-4 left-4 right-4 z-30 text-white">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#E2BA84] flex items-center gap-1 mb-0.5">
            <Compass className="w-3 h-3" />
            {subtitle}
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
            {title}
          </h4>
        </div>

      </motion.div>
    </div>
  );
};

export default Diorama3DParallax;
