import React, { useState, useEffect } from 'react';
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
    side: 'center-back',
    depth: -400,
  },
  {
    id: 'pool',
    image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
    title: "Sunlit Pool & Palms",
    side: 'left-front',
    depth: -150,
  },
  {
    id: 'lawn',
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg",
    title: "Expansive Green Lawns",
    side: 'right-front',
    depth: -180,
  },
  {
    id: 'room',
    image: "https://coorglayaresort.com/_next/static/immutable/media/room-interior-neutral.0i73oyjwh6ntv.jpeg",
    title: "15 Private Rooms",
    side: 'left-back',
    depth: -300,
  },
  {
    id: 'terrace',
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg",
    title: "Stone Garden Terraces",
    side: 'right-back',
    depth: -320,
  },
];

export const ImageCorridorHero: React.FC<ImageCorridorHeroProps> = ({ onOpenEnquiry }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax on scroll
  const corridorZ = useTransform(scrollY, [0, 600], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 px-4 sm:px-6 lg:px-8 select-none bg-[#0e1622]"
    >
      {/* 3D Image Corridor Container with Preserved 3D Perspective */}
      <div 
        className="absolute inset-0 -z-20 overflow-hidden pointer-events-none"
        style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
      >
        <motion.div
          style={{
            z: corridorZ,
            rotateX: -mousePos.y * 0.4,
            rotateY: mousePos.x * 0.4,
            transformStyle: 'preserve-3d',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Central Deep Perspective Image */}
          <div
            className="absolute w-[80vw] max-w-5xl h-[70vh] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 opacity-30 blur-[1px]"
            style={{ transform: `translateZ(${corridorPlanes[0].depth}px) scale(1.3)` }}
          >
            <img
              src={corridorPlanes[0].image}
              alt=""
              className="h-full w-full object-cover brightness-[0.65]"
            />
          </div>

          {/* Left Front Floating Plane */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateZ: [-2, -1, -2],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute left-[2vw] sm:left-[6vw] w-[42vw] sm:w-[28vw] max-w-md aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            style={{ transform: `translateZ(${corridorPlanes[1].depth}px) rotateY(18deg)` }}
          >
            <img
              src={corridorPlanes[1].image}
              alt=""
              className="h-full w-full object-cover brightness-[0.75] hover:brightness-100 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[0.65rem] uppercase tracking-wider text-butter-200 font-semibold">
              {corridorPlanes[1].title}
            </span>
          </motion.div>

          {/* Right Front Floating Plane */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotateZ: [2, 1, 2],
            }}
            transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 1 }}
            className="absolute right-[2vw] sm:right-[6vw] w-[42vw] sm:w-[28vw] max-w-md aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            style={{ transform: `translateZ(${corridorPlanes[2].depth}px) rotateY(-18deg)` }}
          >
            <img
              src={corridorPlanes[2].image}
              alt=""
              className="h-full w-full object-cover brightness-[0.75] hover:brightness-100 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[0.65rem] uppercase tracking-wider text-powder-200 font-semibold">
              {corridorPlanes[2].title}
            </span>
          </motion.div>

          {/* Left Back Floating Plane */}
          <div
            className="hidden lg:block absolute left-[12vw] top-[15vh] w-[20vw] max-w-xs aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-xl opacity-60"
            style={{ transform: `translateZ(${corridorPlanes[3].depth}px) rotateY(24deg)` }}
          >
            <img
              src={corridorPlanes[3].image}
              alt=""
              className="h-full w-full object-cover brightness-[0.7]"
            />
          </div>

          {/* Right Back Floating Plane */}
          <div
            className="hidden lg:block absolute right-[12vw] top-[15vh] w-[20vw] max-w-xs aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-xl opacity-60"
            style={{ transform: `translateZ(${corridorPlanes[4].depth}px) rotateY(-24deg)` }}
          >
            <img
              src={corridorPlanes[4].image}
              alt=""
              className="h-full w-full object-cover brightness-[0.7]"
            />
          </div>
        </motion.div>

        {/* Multi-Stop Cinematic Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1622] via-[#0e1622]/40 to-[#0e1622]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e1622]/50 to-[#0e1622] pointer-events-none" />
      </div>

      {/* Top Meta Bar */}
      <div className="mx-auto max-w-7xl w-full flex items-center justify-between z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-powder-300/30 bg-powder-500/10 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] text-powder-200 font-semibold backdrop-blur-xl shadow-lg"
        >
          <Feather className="size-3.5 text-butter-300" />
          <span>{resortData.brand.locationShort}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-butter-300/30 bg-butter-500/10 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.25em] text-butter-200 font-semibold backdrop-blur-xl shadow-lg"
        >
          <Sparkles className="size-3 text-butter-300" />
          <span>15 Rooms · 500 Lawn Capacity</span>
        </motion.div>
      </div>

      {/* Center Hero: Liquid Metal "LAYA" Reveal + Storyline */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="mx-auto max-w-5xl text-center z-10 my-auto py-8"
      >
        {/* Liquid Metal Title Component */}
        <LiquidMetalLayaReveal />

        {/* Narrative Headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-cormorant italic text-2xl sm:text-3xl lg:text-4xl text-white/95 font-light pt-2 drop-shadow-sm max-w-3xl mx-auto leading-tight"
        >
          "A sanctuary shaped by morning birdsong, open lawns, and unhurried time."
        </motion.p>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mx-auto max-w-xl text-xs sm:text-sm text-sand-200 leading-relaxed font-light mt-3 px-4"
        >
          Nestled in Kushalnagar, Kodagu. Accommodating up to 45 overnight guests across 15 private rooms and hosting open lawn celebrations for up to 500.
        </motion.p>

        {/* Metallic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenEnquiry}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-butter-300 via-butter-400 to-butter-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-ink-primary hover:from-butter-200 hover:to-butter-400 transition-all duration-300 shadow-[0_10px_30px_rgba(232,197,71,0.35)] cursor-pointer border border-butter-200"
          >
            <Sparkles className="size-4 text-ink-primary group-hover:rotate-12 transition-transform" />
            <span>Enquire About Your Stay</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#story"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-xl shadow-lg cursor-pointer"
          >
            <span>Begin The Journey</span>
            <ArrowDown className="size-3.5 text-butter-300 animate-bounce" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom Bar: Verified Features Strip */}
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
