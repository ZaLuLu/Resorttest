import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CalligraphyIntroScreenProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

export const CalligraphyIntroScreen: React.FC<CalligraphyIntroScreenProps> = ({
  onComplete,
}) => {
  const [canSkip, setCanSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 2.0s minimum threshold before showing Skip button
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 2000);

    // Auto-complete at 3.5s with smooth luxury exit
    const autoExitTimer = setTimeout(() => {
      handleExit();
    }, 3500);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoExitTimer);
    };
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      try {
        sessionStorage.setItem('coorg_laya_intro_seen', 'true');
      } catch {
        // Safe sessionStorage fallback
      }
      onComplete();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(14px)',
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-12 bg-[#FAF6EF] text-[#132422] select-none overflow-hidden"
        >
          {/* Ambient Warm Golden & Sunlit Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,157,102,0.12)_0%,_rgba(250,246,239,0)_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F2E8]/40 to-[#EFE8DC]/50 pointer-events-none" />

          {/* Top Row: Location Tag & Skip Button */}
          <div className="relative z-10 w-full max-w-6xl flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EF]/90 border border-[#E4D9C8] text-xs font-bold text-[#845A2C] shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A3733E]" />
              <span className="tracking-wide">Kushalnagar · Kodagu</span>
            </motion.div>

            {/* Skip Button (Fades in strictly after 2.0 seconds) */}
            <div className="min-w-[120px] flex justify-end">
              <AnimatePresence>
                {canSkip && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    onClick={handleExit}
                    className="group px-4 py-2 rounded-full bg-[#132422] text-[#FAF6EF] text-xs font-bold shadow-md hover:bg-[#845A2C] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Skip Intro</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center Calligraphy Artwork & Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 max-w-2xl w-full my-auto">
            
            {/* Small Monogram Crest / Heritage Tag */}
            <motion.div
              initial={{ opacity: 0, y: -12, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] sm:text-xs font-bold uppercase text-[#845A2C] font-serif"
            >
              EST. KODAGU · KARNATAKA
            </motion.div>

            {/* Prefix "Coorg" in Spaced Roman Serif */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-[0.35em] text-[#344E4A] font-serif"
            >
              COORG
            </motion.div>

            {/* Masterpiece Calligraphy 'Laya' Signature */}
            <div className="relative py-2 sm:py-4 px-6 overflow-hidden">
              
              {/* Calligraphy Word with Ink Mask Reveal */}
              <motion.div
                initial={{
                  clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.4,
                  ease: [0.45, 0, 0.2, 1], // Natural ink flow curve
                }}
                className="relative"
              >
                <span
                  style={{
                    fontFamily: "'Pinyon Script', 'Great Vibes', cursive",
                    background: 'linear-gradient(135deg, #7A4E21 0%, #B88544 35%, #D4A76A 65%, #8B5927 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 8px 30px rgba(163, 115, 62, 0.18)',
                  }}
                  className="text-7xl sm:text-9xl md:text-[10.5rem] font-normal leading-none block select-none tracking-normal pr-4"
                >
                  Laya
                </span>
              </motion.div>

              {/* Decorative Calligraphy Golden Swash Underline */}
              <svg
                viewBox="0 0 400 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-48 sm:w-64 md:w-80 mx-auto -mt-2 sm:-mt-4 overflow-visible"
              >
                <defs>
                  <linearGradient id="goldInkStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7A4E21" stopOpacity="0.2" />
                    <stop offset="40%" stopColor="#B88544" stopOpacity="1" />
                    <stop offset="70%" stopColor="#D4A76A" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7A4E21" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 20,15 C 80,26 220,2 380,18"
                  stroke="url(#goldInkStroke)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </div>

            {/* Subtitle Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1.5 pt-2"
            >
              <p className="text-xs sm:text-sm font-semibold text-[#132422] tracking-wider uppercase">
                A Boutique 15-Suite Sanctuary
              </p>
              <p className="text-[11px] sm:text-xs text-[#845A2C] font-medium tracking-wide">
                Unhurried Mountain Days · 850m ASL
              </p>
            </motion.div>

          </div>

          {/* Bottom Row: Subtle Clean Footer Note (Progress Bar Removed) */}
          <div className="relative z-10 w-full max-w-md flex justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2.0, duration: 0.8 }}
              className="text-[10px] uppercase font-mono tracking-widest text-[#845A2C]"
            >
              Where Mountain Rhythm Meets Stillness
            </motion.span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalligraphyIntroScreen;
