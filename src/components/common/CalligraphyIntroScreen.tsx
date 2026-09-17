import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Play, RotateCw } from 'lucide-react';

interface CalligraphyIntroScreenProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

export const CalligraphyIntroScreen: React.FC<CalligraphyIntroScreenProps> = ({
  onComplete,
  forcePlay = false,
}) => {
  const [canSkip, setCanSkip] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 2.0s minimum threshold before showing Skip button
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 2000);

    // Progress bar tick
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.25;
      });
    }, 40);

    // Auto-complete at 3.4s with smooth luxury exit
    const autoExitTimer = setTimeout(() => {
      handleExit();
    }, 3400);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoExitTimer);
      clearInterval(progressInterval);
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
    }, 700); // match exit transition duration
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(12px)',
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-12 bg-[#FAF6EF] text-[#132422] select-none overflow-hidden"
        >
          {/* Subtle Ambient Vignette & Grain */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5EFE6]/40 to-[#EFE8DC]/60 pointer-events-none" />

          {/* Top Row: Location Tag & Skip Button */}
          <div className="relative z-10 w-full max-w-6xl flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] text-xs font-bold text-[#A3733E] shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A3733E]" />
              <span>Kushalnagar · Kodagu</span>
            </motion.div>

            {/* Skip Button (Fades in strictly after 2.0 seconds) */}
            <div className="min-w-[120px] flex justify-end">
              <AnimatePresence>
                {canSkip && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleExit}
                    className="group px-4 py-2 rounded-full bg-[#132422] text-[#FAF6EF] text-xs font-bold shadow-md hover:bg-[#1A96AA] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Skip Intro</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Handcrafted Calligraphy Stroke Animation of 'Laya' */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-xl w-full my-auto">
            
            {/* Calligraphy SVG Drawing Canvas */}
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] h-32 sm:h-44 flex items-center justify-center">
              <svg
                viewBox="0 0 500 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_8px_16px_rgba(163,115,62,0.15)]"
              >
                <defs>
                  <linearGradient id="goldSlateInk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A3733E" />
                    <stop offset="45%" stopColor="#C2935E" />
                    <stop offset="80%" stopColor="#1A96AA" />
                    <stop offset="100%" stopColor="#132422" />
                  </linearGradient>
                </defs>

                {/* Main Calligraphy 'L' Flourish Stroke */}
                <motion.path
                  d="M 60,160 C 50,80 110,20 120,40 C 130,60 100,160 80,165 C 65,168 130,162 170,158"
                  stroke="url(#goldSlateInk)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.45, 0, 0.2, 1] }}
                />

                {/* Calligraphy 'a' Stroke */}
                <motion.path
                  d="M 175,120 C 150,110 145,155 170,155 C 190,155 195,115 195,160 C 195,160 205,150 220,155"
                  stroke="url(#goldSlateInk)"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.9, ease: [0.45, 0, 0.2, 1] }}
                />

                {/* Calligraphy 'y' Descender Stroke */}
                <motion.path
                  d="M 225,120 C 235,145 240,155 255,155 C 270,155 275,115 275,140 C 275,175 250,195 230,190"
                  stroke="url(#goldSlateInk)"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.9, ease: [0.45, 0, 0.2, 1] }}
                />

                {/* Calligraphy Final 'a' Loop */}
                <motion.path
                  d="M 285,120 C 265,110 260,155 285,155 C 305,155 310,115 310,160 C 310,160 340,140 440,140"
                  stroke="url(#goldSlateInk)"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 1.0, ease: [0.45, 0, 0.2, 1] }}
                />
              </svg>
            </div>

            {/* Typography Sub-Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2"
            >
              <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-[0.3em] text-[#132422] font-serif">
                COORG LAYA
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#635546] tracking-wider">
                A Boutique 15-Suite Sanctuary · 850m ASL
              </p>
            </motion.div>
          </div>

          {/* Bottom Row: Minimalist Aesthetic Progress Line */}
          <div className="relative z-10 w-full max-w-md flex flex-col items-center space-y-2.5">
            <div className="w-full h-1 rounded-full bg-[#E8DFD1] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#A3733E] via-[#1A96AA] to-[#132422] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#A3733E] uppercase">
              ENTERING SANCTUARY · {Math.min(100, Math.round(progress))}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalligraphyIntroScreen;
