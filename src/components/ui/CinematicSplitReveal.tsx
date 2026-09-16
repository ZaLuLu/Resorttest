import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';

const moments = [
  {
    act: "CHAPTER 01",
    tagline: "THE ARRIVAL & SANCTUARY",
    title: "A Hidden World in Kodagu",
    subtitle: "Tucked away in the green calm of Kushalnagar, Coorg Laya Resort emerges as an unhurried haven surrounded by pure mountain air and whispering palm fronds.",
    image: "https://coorglayaresort.com/_next/static/immutable/media/resort-exteriors.2bq9ym6x0i3uq.jpeg",
    quote: "Step beyond the everyday and into the quiet pulse of Karnataka's hill country.",
  },
  {
    act: "CHAPTER 02",
    tagline: "WATERS & VERDANT LAWNS",
    title: "The Rhythm of Sunlit Afternoons",
    subtitle: "From refreshing dips in the swimming pool to friendly rallies of badminton and volleyball on open landscaped lawns under open skies.",
    image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
    quote: "Where time slows down and simple moments become cherished lifelong memories.",
  },
  {
    act: "CHAPTER 03",
    tagline: "GARDEN TERRACES & CANOPIES",
    title: "Evenings Beneath Shaded Bamboos",
    subtitle: "Stone-paved garden terraces and covered lounge verandahs designed for slow coffee, deep conversations, and tranquil sunset reflection.",
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg",
    quote: "Breathe in the cool hill breeze as dusk settles softly across the lush valley.",
  },
];

export const CinematicSplitReveal: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveMoment((prev) => (prev + 1) % moments.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-50 border-b border-ink-primary/8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-butter-700">
            <Compass className="size-3.5 text-butter-600" />
            <span>Curated Moments</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-primary font-normal">
            The Coorg Laya Experience
          </h2>

          <p className="text-xs sm:text-sm text-ink-muted font-light max-w-xl mx-auto">
            Discover the three acts of a peaceful retreat — arrival, sunlit recreation, and mindful evenings.
          </p>

          <div className="mx-auto w-28 butter-divider my-4" />
        </div>

        {/* Split Reel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Chapter Cards */}
          <div className="lg:col-span-5 space-y-4">
            {moments.map((item, idx) => {
              const isActive = activeMoment === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveMoment(idx)}
                  className={`group relative cursor-pointer rounded-3xl p-6 sm:p-7 transition-all duration-500 border ${
                    isActive
                      ? 'border-butter-400 bg-white ring-2 ring-butter-300/40 shadow-xl'
                      : 'bg-white/60 hover:bg-white border-ink-primary/8 opacity-75 hover:opacity-100 shadow-sm'
                  }`}
                >
                  {/* Butter Yellow Progress Line */}
                  {isActive && (
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-sand-100 overflow-hidden rounded-full">
                      <motion.div
                        key={`bar-${activeMoment}-${isPaused}`}
                        initial={{ width: '0%' }}
                        animate={{ width: isPaused ? '100%' : '100%' }}
                        transition={{ duration: isPaused ? 0 : 7, ease: 'linear' }}
                        className="h-full bg-butter-400"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-butter-700 font-bold tracking-widest">
                      {item.act}
                    </span>
                    <span className="text-[0.62rem] uppercase tracking-[0.25em] text-ink-muted font-medium">
                      {item.tagline}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl text-ink-primary font-medium mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-ink-muted font-light leading-relaxed">
                    {item.subtitle}
                  </p>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-3 mt-3 border-t border-ink-primary/8"
                    >
                      <p className="font-cormorant italic text-sm text-butter-700">
                        "{item.quote}"
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Fluid Full-Bleed Image Frame */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-ink-primary/10 aspect-[16/11] shadow-2xl bg-ink-primary">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMoment}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={moments[activeMoment].image}
                  alt={moments[activeMoment].title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-butter-300 font-semibold block mb-1">
                      {moments[activeMoment].act} · {moments[activeMoment].tagline}
                    </span>
                    <h4 className="font-heading text-2xl sm:text-3xl font-medium">
                      {moments[activeMoment].title}
                    </h4>
                  </div>

                  <span className="rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-xs font-mono font-bold text-butter-300 backdrop-blur-md">
                    0{activeMoment + 1} / 03
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
