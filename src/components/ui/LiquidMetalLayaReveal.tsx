import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const LiquidMetalLayaReveal: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const strokeProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div className="relative flex flex-col items-center justify-center text-center select-none py-6">
      {/* Subtle Metallic Ambient Glow behind logo */}
      <div className="absolute -inset-10 bg-gradient-to-r from-butter-400/20 via-powder-400/20 to-butter-400/20 rounded-full blur-3xl pointer-events-none opacity-60 animate-pulse-slow" />

      {/* Top Pre-Title */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[0.68rem] sm:text-xs uppercase tracking-[0.4em] text-powder-200 font-semibold mb-3 drop-shadow-md"
      >
        <span>SANCTUARY IN KODAGU</span>
      </motion.div>

      {/* Main Brand Title: COORG LAYA RESORT */}
      <div className="relative font-cinzel tracking-tight text-white uppercase drop-shadow-2xl">
        {/* "COORG" in refined metallic chrome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.12em] bg-gradient-to-b from-white via-sand-100 to-sand-400 bg-clip-text text-transparent"
        >
          COORG
        </motion.div>

        {/* "LAYA" — Liquid Metal Sweep from Left and Right */}
        <div className="relative my-2 sm:my-3">
          {/* Base metallic silhouette */}
          <div className="relative inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[0.2em] text-transparent select-none">
            {/* Liquid Metal Sweep Left Stream */}
            <motion.div
              initial={{ x: '-100%', opacity: 0, filter: 'blur(12px)' }}
              animate={{ x: '0%', opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-butter-200 via-butter-400 to-powder-300 bg-clip-text text-transparent pointer-events-none"
            >
              LAYA
            </motion.div>

            {/* Liquid Metal Sweep Right Stream */}
            <motion.div
              initial={{ x: '100%', opacity: 0, filter: 'blur(12px)' }}
              animate={{ x: '0%', opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-l from-butter-200 via-butter-300 to-powder-200 bg-clip-text text-transparent mix-blend-screen pointer-events-none"
            >
              LAYA
            </motion.div>

            {/* Core Solid Liquid Shimmering Typography */}
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="relative inline-block bg-gradient-to-b from-[#FFFDF0] via-[#E8C547] to-[#8C680D] bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(232,197,71,0.4)]"
            >
              LAYA
            </motion.span>
          </div>

          {/* Liquid Sheen Shimmer Reflection passing across */}
          <motion.div
            initial={{ left: '-30%' }}
            animate={{ left: '130%' }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', repeatDelay: 2 }}
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none"
          />
        </div>

        {/* "RESORT" in subtle spaced gold-butter lettering */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[0.45em] text-sand-200"
        >
          RESORT
        </motion.div>
      </div>

      {/* Draw-On-Scroll SVG Stroke Flourish underneath */}
      <div className="relative w-64 sm:w-96 h-10 mt-3 flex items-center justify-center">
        <svg
          viewBox="0 0 400 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Center decorative diamond */}
          <motion.polygon
            points="200,10 206,20 200,30 194,20"
            fill="#E8C547"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />

          {/* Left sweeping cursive line with draw-on-scroll / entrance animation */}
          <motion.path
            d="M 10,20 Q 100,5 185,20"
            stroke="url(#butterGradientLeft)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
          />

          {/* Right sweeping cursive line with draw-on-scroll */}
          <motion.path
            d="M 390,20 Q 300,5 215,20"
            stroke="url(#butterGradientRight)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="butterGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="60%" stopColor="#E8C547" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFDF0" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="butterGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="60%" stopColor="#E8C547" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFDF0" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
