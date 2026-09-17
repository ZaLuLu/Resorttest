import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

interface CalligraphyIntroScreenProps {
  onComplete: () => void;
}

export const CalligraphyIntroScreen: React.FC<CalligraphyIntroScreenProps> = ({
  onComplete,
}) => {
  const [canSkip, setCanSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [storyBeat, setStoryBeat] = useState<number>(1);

  useEffect(() => {
    // Beat 2 after 1.1s
    const t1 = setTimeout(() => setStoryBeat(2), 1100);
    // Beat 3 & Skip eligibility after 2.0s
    const t2 = setTimeout(() => {
      setStoryBeat(3);
      setCanSkip(true);
    }, 2000);
    // Auto transition after 3.8s
    const t3 = setTimeout(() => {
      handleExit();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
    }, 750);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(16px)',
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-12 bg-[#FAF6EF] text-[#132422] select-none overflow-hidden"
        >
          {/* Ambient Warm Golden & Sunlit Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(163,115,62,0.1)_0%,_rgba(250,246,239,0)_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F2E8]/40 to-[#EFE8DC]/50 pointer-events-none" />

          {/* Top Row: Coordinates Tag & Skip Button */}
          <div className="relative z-10 w-full max-w-6xl flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EF]/90 border border-[#E4D9C8] text-xs font-bold text-[#845A2C] shadow-sm backdrop-blur-md"
            >
              <Compass className="w-3.5 h-3.5 text-[#1A96AA]" />
              <span className="tracking-wide">12.4542° N · 75.9602° E · 850m ASL</span>
            </motion.div>

            {/* Skip / Enter Sanctuary Button (Appears strictly after 2.0s) */}
            <div className="min-w-[140px] flex justify-end">
              <AnimatePresence>
                {canSkip && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    onClick={handleExit}
                    className="group px-5 py-2.5 rounded-full bg-[#132422] text-[#FAF6EF] text-xs font-bold shadow-lg hover:bg-[#1A96AA] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Enter Sanctuary</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Cinematic Brand Story Opener */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-2xl w-full my-auto">
            
            {/* Story Beat 1: Poetic Prologue */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1"
            >
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#A3733E]">
                Kushalnagar · Kodagu
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#344E4A] font-medium">
                "In the gentle morning mist of the Western Ghats..."
              </p>
            </motion.div>

            {/* Story Beat 2: Official Laya Gold-Foil Emblem & Calligraphy Brand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: storyBeat >= 2 ? 1 : 0,
                scale: storyBeat >= 2 ? 1 : 0.92,
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center justify-center py-2"
            >
              {/* Gold Ring Border with Official Logo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#A3733E] via-[#E2BA84] to-[#1A96AA] shadow-[0_12px_32px_rgba(163,115,62,0.22)] flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#162926] p-1.5 flex items-center justify-center">
                  <img
                    src="/images/logo/LayaLogo.jpeg"
                    alt="Coorg Laya Resort Emblem"
                    className="w-full h-full object-contain rounded-full filter brightness-110"
                  />
                </div>
              </div>

              {/* Title & Calligraphy Signature */}
              <div className="mt-4 space-y-1">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.4em] text-[#132422] font-serif block">
                  COORG LAYA
                </span>
                <span
                  style={{
                    fontFamily: "'Pinyon Script', 'Great Vibes', cursive",
                    background: 'linear-gradient(135deg, #7A4E21 0%, #B88544 35%, #D4A76A 65%, #8B5927 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  className="text-6xl sm:text-7xl md:text-8xl font-normal leading-none block select-none pr-3"
                >
                  Resort & Nature Sanctuary
                </span>
              </div>
            </motion.div>

            {/* Story Beat 3: Resolution Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: storyBeat >= 3 ? 1 : 0,
                y: storyBeat >= 3 ? 0 : 10,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1 pt-1"
            >
              <p className="text-xs sm:text-sm font-semibold text-[#132422] tracking-wider">
                15 Private Suites · 500-Guest Celebration Lawn
              </p>
              <p className="text-[11px] text-[#A3733E] font-mono tracking-widest uppercase">
                Where Mountain Rhythm Meets Stillness
              </p>
            </motion.div>

          </div>

          {/* Bottom Footer Note */}
          <div className="relative z-10 w-full max-w-md flex justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-[10px] uppercase font-mono tracking-widest text-[#845A2C]"
            >
              A Boutique Kodagu Experience · Karnataka
            </motion.span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalligraphyIntroScreen;
