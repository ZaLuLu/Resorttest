import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowDown, 
  Feather
} from 'lucide-react';
import { resortData } from '../../data/resortData';

interface LuxuryHeroSliderProps {
  onOpenEnquiry: () => void;
}

const slides = [
  {
    id: 'exterior',
    image: "https://coorglayaresort.com/_next/static/immutable/media/resort-exteriors.2bq9ym6x0i3uq.jpeg",
    tagline: "SANCTUARY IN KUSHALNAGAR",
    title: "A Peaceful Escape Into Coorg",
    subtitle: "Sunlit architecture nestled inside towering palms and serene green flora.",
    accent: "Kodagu Countryside",
  },
  {
    id: 'pool',
    image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
    tagline: "REFRESH & UNWIND",
    title: "Sunlit Waters & Palm Canopies",
    subtitle: "Refreshing outdoor swimming pool featuring a shallow circular relaxation deck.",
    accent: "Open Skies & Leisure",
  },
  {
    id: 'lawns',
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg",
    tagline: "EXPANSIVE HORIZONS",
    title: "Open Lawns & Evening Breezes",
    subtitle: "Spacious green grounds for serene morning walks, sports, and celebrations.",
    accent: "Up to 500 Guests",
  },
  {
    id: 'terrace',
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg",
    tagline: "MINDFUL REST",
    title: "Raised Stone Terraces & Bamboo",
    subtitle: "Quiet corners beneath shady canopies to sip freshly brewed coffee in pure air.",
    accent: "Meditation & Calm",
  },
  {
    id: 'rooms',
    image: "https://coorglayaresort.com/_next/static/immutable/media/room-interior-neutral.0i73oyjwh6ntv.jpeg",
    tagline: "INTIMATE COMFORT",
    title: "15 Private Guest Rooms",
    subtitle: "Restorative stays accommodating up to 45 guests amidst natural birdsong.",
    accent: "15 Rooms / ~45 Guests",
  },
];

export const LuxuryHeroSlider: React.FC<LuxuryHeroSliderProps> = ({ onOpenEnquiry }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // 6-second auto slide progress
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section 
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-28 pb-8 px-4 sm:px-6 lg:px-10 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Cinematic Slide Layers with Ken Burns Motion */}
      <div className="absolute inset-0 -z-20 overflow-hidden bg-[#111827]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={slides[current].image}
              alt={slides[current].title}
              initial={{ scale: 1 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 7, ease: "linear" }}
              className="h-full w-full object-cover object-center brightness-[0.92]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Minimalist Multi-Stop Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-[#111827]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/70 via-transparent to-[#111827]/40" />
      </div>

      {/* Top Meta Bar */}
      <div className="mx-auto max-w-7xl w-full flex items-center justify-between z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-powder-200/40 bg-powder-500/15 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] text-powder-100 font-semibold backdrop-blur-xl shadow-lg"
        >
          <Feather className="size-3.5 text-butter-300" />
          <span>{resortData.brand.locationShort}</span>
        </motion.div>

        {/* Slide Counter Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 rounded-full border border-white/15 bg-black/35 px-4 py-1.5 backdrop-blur-xl text-xs font-mono text-white/80"
        >
          <span className="text-butter-300 font-bold">0{current + 1}</span>
          <span className="opacity-40">/</span>
          <span className="opacity-70">0{slides.length}</span>
        </motion.div>
      </div>

      {/* Main Hero Editorial Typography */}
      <div className="mx-auto max-w-5xl text-center z-10 my-auto py-12 px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-400/50 bg-black/40 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] font-semibold text-butter-200 backdrop-blur-md">
              <Sparkles className="size-3 text-butter-400" />
              <span>{slides[current].tagline}</span>
            </div>

            {/* Brand Title Display */}
            <h1 className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white uppercase drop-shadow-md">
              <span className="block font-light">COORG LAYA</span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-extralight tracking-[0.35em] text-butter-300 mt-2">
                RESORT
              </span>
            </h1>

            {/* Dynamic Slide Headline */}
            <p className="font-cormorant italic text-2xl sm:text-3xl lg:text-4xl text-white/95 font-light pt-1 drop-shadow-sm max-w-3xl mx-auto leading-tight">
              "{slides[current].title}"
            </p>

            {/* Slide Description */}
            <p className="mx-auto max-w-xl text-xs sm:text-sm text-white/80 leading-relaxed font-light px-4">
              {slides[current].subtitle}
            </p>

            {/* Butter Yellow & Powder Blue CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenEnquiry}
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-butter-400 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all duration-300 shadow-2xl hover:shadow-butter-400/30 cursor-pointer border border-butter-500/20"
              >
                <Sparkles className="size-4 text-ink-primary group-hover:rotate-12 transition-transform" />
                <span>Enquire About Your Stay</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#welcome"
                className="inline-flex items-center gap-2 rounded-full border border-powder-200/40 bg-powder-500/20 px-7 py-3.5 text-xs font-medium uppercase tracking-wider text-powder-100 hover:bg-powder-500/30 transition-all duration-300 backdrop-blur-xl shadow-lg cursor-pointer"
              >
                <span>Explore Sanctuary</span>
                <span className="text-butter-300">↓</span>
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar: Progress Timers, Controls & Floating Thumbnails */}
      <div className="mx-auto max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-6 z-10 pt-4">
        {/* Left: Interactive Progress Lines & Arrow Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Animated Slide Progress Bars */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => {
              const isActive = current === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className="group relative h-2 overflow-hidden rounded-full transition-all duration-500 cursor-pointer"
                  style={{ width: isActive ? '3rem' : '1.25rem' }}
                  aria-label={`Slide ${index + 1}`}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full" />
                  {isActive && (
                    <motion.div
                      key={`progress-${current}-${isPaused}`}
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '100%' : '100%' }}
                      transition={{ duration: isPaused ? 0 : 6, ease: 'linear' }}
                      className="absolute inset-y-0 left-0 bg-butter-300 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Center: Scroll Discover Prompt */}
        <a
          href="#welcome"
          className="hidden md:inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.25em] text-white/70 hover:text-butter-300 transition-colors"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="size-3.5 animate-bounce text-butter-300" />
        </a>

        {/* Right: Floating Interactive Thumbnails */}
        <div className="hidden lg:flex items-center gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(idx)}
              className={`relative h-12 w-16 overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                current === idx 
                  ? 'border-butter-300 scale-105 ring-2 ring-butter-300/40 shadow-lg' 
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
