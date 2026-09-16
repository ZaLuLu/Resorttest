import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, Feather } from 'lucide-react';
import { Link } from 'react-router-dom';

const chapters = [
  {
    act: "ACT I",
    eyebrow: "THE ARRIVAL & SANCTUARY",
    title: "A Hidden World in Kodagu",
    subtitle: "Tucked away in the green calm of Kushalnagar, Coorg Laya Resort emerges as an unhurried haven.",
    image: "https://coorglayaresort.com/_next/static/immutable/media/resort-exteriors.2bq9ym6x0i3uq.jpeg",
    quote: "Step beyond the everyday and into the quiet pulse of nature.",
  },
  {
    act: "ACT II",
    eyebrow: "WATERS & VERDANT LAWNS",
    title: "The Rhythm of Sunlit Afternoons",
    subtitle: "From refreshing dips in the swimming pool to friendly rallies on open green lawns.",
    image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
    quote: "Where time slows down and simple moments become unforgettable.",
  },
  {
    act: "ACT III",
    eyebrow: "GARDEN TERRACES & CANOPIES",
    title: "Evenings Beneath Shaded Bamboos",
    subtitle: "Stone-paved garden terraces and covered lounge verandahs for quiet reflection.",
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg",
    quote: "Breathe in the cool hill air as dusk settles softly across the valley.",
  },
];

export const CinematicStoryScroll: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#030712] overflow-hidden">
      {/* Ambient background aura */}
      <div className="pointer-events-none absolute inset-0 bg-anamorphic-glow-gold opacity-25" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-12">
        {/* Section Chapter Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a368]/40 bg-[#091b2e]/80 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-[#dfc79e] backdrop-blur-md">
            <Compass className="size-3.5 text-[#c5a368]" />
            <span>Cinematic Sequence</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
            The Coorg Laya Story
          </h2>

          <div className="mx-auto w-32 letterbox-line my-4" />
        </div>

        {/* IMAX Split Chapter Reel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Chapter Selectors */}
          <div className="lg:col-span-5 space-y-4">
            {chapters.map((chap, idx) => {
              const isActive = activeChapter === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveChapter(idx)}
                  className={`group relative cursor-pointer rounded-3xl border p-6 sm:p-8 transition-all duration-500 ${
                    isActive
                      ? 'border-[#c5a368] bg-[#0c2340]/90 shadow-2xl shadow-cyan-950/40'
                      : 'border-white/10 bg-[#06101e]/60 hover:border-white/25 hover:bg-[#08172b]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#c5a368] font-bold tracking-widest">
                      {chap.act}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
                      {chap.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl text-white font-medium mb-2">
                    {chap.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {chap.subtitle}
                  </p>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-4 mt-4 border-t border-white/10"
                    >
                      <p className="font-serif italic text-xs text-[#dfc79e]">
                        "{chap.quote}"
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Fullscreen Cinematic Film Portal */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-white/15 aspect-[16/11] shadow-2xl bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <img
                  src={chapters[activeChapter].image}
                  alt={chapters[activeChapter].title}
                  className="h-full w-full object-cover"
                />

                {/* Film Vignette & Lens Flair */}
                <div className="absolute inset-0 cinema-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/30" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[#dfc79e] font-semibold block mb-1">
                      {chapters[activeChapter].act} · {chapters[activeChapter].eyebrow}
                    </span>
                    <h4 className="font-heading text-xl sm:text-2xl font-medium">
                      {chapters[activeChapter].title}
                    </h4>
                  </div>

                  <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.65rem] font-mono text-[#c5a368]">
                    0{activeChapter + 1} / 03
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
