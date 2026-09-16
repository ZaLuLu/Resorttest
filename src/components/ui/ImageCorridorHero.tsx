import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowDown, Feather, Waves, ShieldCheck } from 'lucide-react';
import { resortData } from '../../data/resortData';
import { LiquidMetalLayaReveal } from './LiquidMetalLayaReveal';

interface ImageCorridorHeroProps {
  onOpenEnquiry: () => void;
}

const corridorPlanes = [
  {
    id: 'exterior',
    image: "https://coorglayaresort.com/_next/static/immutable/media/resort-exteriors.2bq9ym6x0i3uq.jpeg",
    title: "Sanctuary Architecture",
  },
  {
    id: 'pool',
    image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
    title: "Swimming Pool & Palms",
  },
  {
    id: 'lawn',
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg",
    title: "500-Guest Event Lawns",
  },
  {
    id: 'room',
    image: "https://coorglayaresort.com/_next/static/immutable/media/room-interior-neutral.0i73oyjwh6ntv.jpeg",
    title: "15 Private Rooms",
  },
  {
    id: 'terrace',
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg",
    title: "Garden Terraces",
  },
];

export const ImageCorridorHero: React.FC<ImageCorridorHeroProps> = ({ onOpenEnquiry }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 16,
      y: (clientY / innerHeight - 0.5) * 16,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8 select-none bg-[#111c2a]"
    >
      {/* 3D Image Corridor Spatial Background with Rich Scenery */}
      <div 
        className="absolute inset-0 -z-20 overflow-hidden pointer-events-none"
        style={{ perspective: '1100px' }}
      >
        <motion.div
          style={{
            rotateX: -mousePos.y * 0.35,
            rotateY: mousePos.x * 0.35,
            transformStyle: 'preserve-3d',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Main Full-Bleed Center Scenery */}
          <div className="absolute inset-0 scale-105">
            <img
              src={corridorPlanes[0].image}
              alt=""
              className="h-full w-full object-cover object-center brightness-[0.55]"
            />
          </div>

          {/* Left Spatial Floating Photo Plane */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotateZ: [-2, -1, -2],
            }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            className="absolute left-[3vw] sm:left-[5vw] top-[22vh] w-[38vw] sm:w-[26vw] max-w-sm aspect-[16/11] rounded-3xl overflow-hidden border border-white/25 shadow-2xl"
            style={{ transform: 'translateZ(60px) rotateY(16deg)' }}
          >
            <img
              src={corridorPlanes[1].image}
              alt=""
              className="h-full w-full object-cover brightness-[0.85] hover:brightness-100 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[0.65rem] uppercase tracking-wider text-butter-200 font-semibold drop-shadow-md">
              {corridorPlanes[1].title}
            </span>
          </motion.div>

          {/* Right Spatial Floating Photo Plane */}
          <motion.div
            animate={{
              y: [0, 8, 0],
              rotateZ: [2, 1, 2],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
            className="absolute right-[3vw] sm:right-[5vw] top-[22vh] w-[38vw] sm:w-[26vw] max-w-sm aspect-[16/11] rounded-3xl overflow-hidden border border-white/25 shadow-2xl"
            style={{ transform: 'translateZ(60px) rotateY(-16deg)' }}
          >
            <img
              src={corridorPlanes[2].image}
              alt=""
              className="h-full w-full object-cover brightness-[0.85] hover:brightness-100 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[0.65rem] uppercase tracking-wider text-powder-200 font-semibold drop-shadow-md">
              {corridorPlanes[2].title}
            </span>
          </motion.div>
        </motion.div>

        {/* Ambient Darkened Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111c2a] via-[#111c2a]/30 to-[#111c2a]/70 pointer-events-none" />
      </div>

      {/* Top Meta Bar */}
      <div className="mx-auto max-w-7xl w-full flex items-center justify-between z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-powder-300/30 bg-powder-500/15 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] text-powder-200 font-semibold backdrop-blur-xl shadow-lg"
        >
          <Feather className="size-3.5 text-butter-300" />
          <span>{resortData.brand.locationShort}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-butter-300/30 bg-butter-500/15 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.25em] text-butter-200 font-semibold backdrop-blur-xl shadow-lg"
        >
          <Sparkles className="size-3 text-butter-300" />
          <span>15 Rooms · 500 Lawn Capacity</span>
        </motion.div>
      </div>

      {/* Center Hero: Liquid Metal "LAYA" Reveal & Story */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="mx-auto max-w-5xl text-center z-10 my-auto py-6"
      >
        {/* Liquid Metal Title */}
        <LiquidMetalLayaReveal />

        {/* Headline Quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-cormorant italic text-2xl sm:text-3xl lg:text-4xl text-white/95 font-light pt-2 drop-shadow-sm max-w-3xl mx-auto leading-tight"
        >
          "A sanctuary shaped by morning birdsong, open lawns, and unhurried time."
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto max-w-xl text-xs sm:text-sm text-sand-200 leading-relaxed font-light mt-2.5 px-4"
        >
          Nestled in Kushalnagar, Kodagu. Accommodating up to 45 overnight guests across 15 private rooms and hosting open lawn celebrations for up to 500.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenEnquiry}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-butter-400 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all duration-300 shadow-xl cursor-pointer border border-butter-200"
          >
            <Sparkles className="size-4 text-ink-primary group-hover:rotate-12 transition-transform" />
            <span>Enquire About Your Stay</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#story"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-xl shadow-lg cursor-pointer"
          >
            <span>Begin The Journey</span>
            <ArrowDown className="size-3.5 text-butter-300 animate-bounce" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom Features Strip */}
      <div className="mx-auto max-w-7xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 z-10 pt-4 border-t border-white/10 text-xs text-sand-300">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1.5 text-butter-200">
            <ShieldCheck className="size-4 text-butter-400" />
            15 Private Rooms (~45 Capacity)
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-powder-200">
            <Waves className="size-4 text-powder-400" />
            Pool with Circular Shallow Section
          </span>
        </div>

        <a
          href="#story"
          className="inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.25em] text-white/70 hover:text-butter-300 transition-colors"
        >
          <span>Scroll To Discover</span>
          <ArrowDown className="size-3 text-butter-300" />
        </a>
      </div>
    </section>
  );
};
