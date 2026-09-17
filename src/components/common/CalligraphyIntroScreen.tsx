import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface CalligraphyIntroScreenProps {
  onComplete: () => void;
}

export const CalligraphyIntroScreen: React.FC<CalligraphyIntroScreenProps> = ({
  onComplete,
}) => {
  const [canSkip, setCanSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Skip ready almost immediately (1s)
    const tSkip = setTimeout(() => setCanSkip(true), 1000);

    // Auto complete after 3.8s
    const tExit = setTimeout(() => {
      handleExit();
    }, 3800);

    return () => {
      clearTimeout(tSkip);
      clearTimeout(tExit);
    };
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      try {
        sessionStorage.setItem('coorg_laya_intro_seen', 'true');
      } catch {
        // Safe fallback
      }
      onComplete();
    }, 850);
  };

  const letters = ['L', 'A', 'Y', 'A'];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 md:p-16 bg-[#081211] text-[#FAF6EF] select-none overflow-hidden"
        >
          {/* Top and Bottom Splitting Architectural Curtains for Smooth Exit */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 inset-x-0 h-1/2 bg-[#081211] z-0 pointer-events-none"
          />
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 inset-x-0 h-1/2 bg-[#081211] z-0 pointer-events-none"
          />

          {/* Deep Ambient Sunlit Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(26,150,170,0.18)_0%,_rgba(8,18,17,0)_70%)] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,_rgba(226,186,132,0.14)_0%,_transparent_60%)] pointer-events-none z-10" />

          {/* Top Bar: Sanctuary Coordinates & Skip Button */}
          <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132422]/90 border border-white/15 text-xs font-bold text-[#E2BA84] shadow-[0_8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md"
            >
              <Compass className="w-3.5 h-3.5 text-[#1A96AA]" />
              <span className="tracking-widest uppercase text-[11px]">12.4542° N · 75.9602° E · Kodagu</span>
            </motion.div>

            {/* Skip / Enter Button */}
            <div className="min-w-[140px] flex justify-end">
              <AnimatePresence>
                {canSkip && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    onClick={handleExit}
                    className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1A96AA] to-[#116B7B] text-[#FAF6EF] text-xs font-bold shadow-[0_12px_28px_rgba(0,0,0,0.5)] hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer border border-white/20"
                  >
                    <span>Enter Sanctuary</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* CENTER: BOLD EDITORIAL BIG TYPOGRAPHY ANIMATION               */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto w-full max-w-6xl mx-auto py-8">
            
            {/* Top Micro Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex items-center gap-3 mb-3 sm:mb-4"
            >
              <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#E2BA84]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.55em] text-[#E2BA84]">
                NATURAL LUXURY SANCTUARY
              </span>
              <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#E2BA84]" />
            </motion.div>

            {/* Massive Bold Animated Letterform Display */}
            <div className="relative overflow-hidden py-2 px-4">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center"
              >
                <h1
                  style={{
                    fontFamily: "'Italiana', 'Cormorant Garamond', serif",
                  }}
                  className="text-8xl sm:text-[11rem] md:text-[14rem] lg:text-[18rem] font-normal leading-none tracking-[0.08em] sm:tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-[#FAF6EF] via-[#F0E6D2] to-[#A3733E] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none uppercase"
                >
                  LAYA
                </h1>
              </motion.div>

              {/* Sub-label Ribbon: R E S O R T */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, letterSpacing: '0.65em' }}
                transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
                className="text-xs sm:text-base md:text-lg font-serif uppercase text-[#E2BA84] font-semibold text-center mt-1 sm:mt-2 pl-3 drop-shadow-md"
              >
                RESORT · COORG
              </motion.div>
            </div>

            {/* Official Motto & Poetic Tagline Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-3 mt-4 sm:mt-6 max-w-xl mx-auto"
            >
              <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#FAF6EF]/90 font-light tracking-wide">
                "Where the River Flows & Birds Gather"
              </p>

              <div className="flex items-center justify-center gap-3 pt-1">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1A96AA]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#74B4C0]">
                  15 SUITES · PALM POOL · 500-GUEST LAWN
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1A96AA]" />
              </div>
            </motion.div>

          </div>

          {/* Bottom Micro Footer */}
          <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-xs text-[#E2BA84]/70 font-mono">
            <span>WESTERN GHATS · KARNATAKA</span>
            <span>EXPERIENCE UNHURRIED LUXURY</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalligraphyIntroScreen;
