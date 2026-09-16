import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CalligraphicIntroProps {
  onComplete: () => void;
}

export const CalligraphicIntro: React.FC<CalligraphicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'drawing' | 'revealed' | 'exiting'>('drawing');

  useEffect(() => {
    // Stage 1: Draw calligraphy (2.2s)
    const timer1 = setTimeout(() => {
      setStage('revealed');
    }, 2200);

    // Stage 2: Hold for impact and start exit (3.4s)
    const timer2 = setTimeout(() => {
      setStage('exiting');
    }, 3400);

    // Stage 3: Complete transition (4.1s)
    const timer3 = setTimeout(() => {
      onComplete();
    }, 4100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'exiting' ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f4ec] text-[#1a1c1e] px-4 overflow-hidden"
    >
      {/* Background ambient radial aura */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(197,163,104,0.18)_0%,rgba(247,244,236,0)_70%)]" />

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 rounded-full border border-[#1a1c1e]/15 bg-white/60 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-[#1a1c1e]/70 hover:bg-white hover:text-[#1a1c1e] transition-all backdrop-blur-md"
      >
        Skip Intro ↗
      </button>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Monogram Seal Draw */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4 relative size-16 flex items-center justify-center rounded-full border border-[#c5a368]/50 bg-white/70 shadow-sm"
        >
          <span className="font-heading text-2xl font-bold italic text-[#c5a368]">
            CL
          </span>
        </motion.div>

        {/* Location Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[0.65rem] uppercase tracking-[0.35em] text-[#c5a368] font-semibold mb-2"
        >
          Coorg · Karnataka
        </motion.span>

        {/* Calligraphic SVG Script Drawing of "Laya" */}
        <div className="relative w-72 sm:w-96 h-28 sm:h-32 flex items-center justify-center">
          <svg
            viewBox="0 0 400 120"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant Calligraphic Script Paths for 'Laya' */}
            {/* Letter L Flourish */}
            <motion.path
              d="M 50 30 C 70 10, 110 15, 95 65 C 80 110, 50 115, 65 115 C 80 115, 120 105, 140 100"
              stroke="#1a1c1e"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.45, 0, 0.15, 1] }}
            />

            {/* Letter a */}
            <motion.path
              d="M 170 65 C 145 65, 130 85, 145 105 C 160 115, 185 110, 190 90 L 190 115"
              stroke="#1a1c1e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: 'easeInOut' }}
            />

            {/* Letter y */}
            <motion.path
              d="M 215 65 L 230 100 C 240 110, 255 105, 260 70 M 260 70 L 220 135 C 210 150, 190 150, 180 135"
              stroke="#1a1c1e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1.4, ease: 'easeInOut' }}
            />

            {/* Letter a (final) */}
            <motion.path
              d="M 295 65 C 275 65, 260 85, 275 105 C 290 115, 315 110, 320 90 L 320 115 C 330 115, 360 105, 380 95"
              stroke="#1a1c1e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 1.2, ease: 'easeInOut' }}
            />

            {/* Subtle Gold Swash Accent */}
            <motion.path
              d="M 40 105 Q 200 125 370 105"
              stroke="#c5a368"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ delay: 1.8, duration: 1.0 }}
            />
          </svg>
        </div>

        {/* Subtitle Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stage !== 'drawing' ? 1 : 0, y: stage !== 'drawing' ? 0 : 10 }}
          transition={{ duration: 0.6 }}
          className="mt-2 space-y-1"
        >
          <span className="font-heading text-lg tracking-[0.25em] text-[#1a1c1e] uppercase font-light">
            Resort & Sanctuary
          </span>
          <p className="text-[0.7rem] text-[#1a1c1e]/60 tracking-wider">
            Wake Up to Birdsong · Settle Into Nature
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
