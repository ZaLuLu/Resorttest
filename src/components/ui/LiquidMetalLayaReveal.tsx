import React from 'react';
import { motion } from 'framer-motion';

export const LiquidMetalLayaReveal: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center select-none py-4">
      {/* Warm Ambient Backlight */}
      <div className="absolute -inset-8 bg-gradient-to-r from-butter-300/30 via-powder-300/20 to-butter-300/30 rounded-full blur-3xl pointer-events-none opacity-50" />

      {/* Top Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-[0.68rem] sm:text-xs uppercase tracking-[0.4em] text-sand-200 font-semibold mb-2 drop-shadow-md"
      >
        <span>SANCTUARY IN KODAGU</span>
      </motion.div>

      {/* Main Brand Title: COORG LAYA RESORT */}
      <div className="relative font-cinzel tracking-tight text-white uppercase drop-shadow-2xl">
        {/* "COORG" in polished silver-gold metallic font */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.14em] text-white"
        >
          COORG
        </motion.div>

        {/* "LAYA" — Liquid Metal Stream Sweep & Converge */}
        <div className="relative my-2 sm:my-3">
          <div className="relative inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-[0.2em] select-none">
            {/* Liquid Stream 1 (Left to Center) */}
            <motion.div
              initial={{ x: '-80%', opacity: 0, filter: 'blur(8px)' }}
              animate={{ x: '0%', opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-butter-200 via-butter-400 to-butter-100 bg-clip-text text-transparent pointer-events-none"
            >
              LAYA
            </motion.div>

            {/* Liquid Stream 2 (Right to Center) */}
            <motion.div
              initial={{ x: '80%', opacity: 0, filter: 'blur(8px)' }}
              animate={{ x: '0%', opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-l from-butter-300 via-powder-200 to-butter-200 bg-clip-text text-transparent mix-blend-screen pointer-events-none"
            >
              LAYA
            </motion.div>

            {/* Solid Converged Metallic Shimmering Core */}
            <motion.span
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative inline-block bg-gradient-to-b from-[#FFFDF0] via-[#E8C547] to-[#8C680D] bg-clip-text text-transparent drop-shadow-[0_8px_20px_rgba(232,197,71,0.45)]"
            >
              LAYA
            </motion.span>
          </div>
        </div>

        {/* "RESORT" spaced lettering */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[0.45em] text-sand-200"
        >
          RESORT
        </motion.div>
      </div>

      {/* SVG Stroke Draw-On-Scroll Flourish Underneath */}
      <div className="relative w-64 sm:w-96 h-8 mt-2 flex items-center justify-center">
        <svg
          viewBox="0 0 400 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Central Diamond */}
          <motion.polygon
            points="200,8 205,15 200,22 195,15"
            fill="#E8C547"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
          />

          {/* Left sweeping line */}
          <motion.path
            d="M 20,15 Q 110,5 190,15"
            stroke="url(#butterGradientLeft)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
          />

          {/* Right sweeping line */}
          <motion.path
            d="M 380,15 Q 290,5 210,15"
            stroke="url(#butterGradientRight)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
          />

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
