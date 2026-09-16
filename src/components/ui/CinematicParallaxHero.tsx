import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowDown } from 'lucide-react';
import { resortData } from '../../data/resortData';

interface CinematicParallaxHeroProps {
  onOpenEnquiry: () => void;
}

const heroSlides = [
  {
    id: 1,
    image: "https://coorglayaresort.com/_next/static/immutable/media/resort-exteriors.2bq9ym6x0i3uq.jpeg",
    title: "Resort Exterior & Palm Pathway",
    caption: "Sunlit architecture nestled in lush greenery",
  },
  {
    id: 2,
    image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
    title: "Swimming Pool & Relaxation Deck",
    caption: "Refreshing waters with shallow circular relaxation section",
  },
  {
    id: 3,
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg",
    title: "Spacious Green Lawns",
    caption: "Open spaces for peaceful morning walks & recreation",
  },
  {
    id: 4,
    image: "https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg",
    title: "Elevated Garden Terrace",
    caption: "Raised stone terrace surrounded by natural bamboo",
  },
  {
    id: 5,
    image: "https://coorglayaresort.com/_next/static/immutable/media/kids-play-trampoline.0vmeruxo86x0z.png",
    title: "Kids Trampoline & Recreation",
    caption: "Family-friendly outdoor play in the heart of nature",
  },
];

export const CinematicParallaxHero: React.FC<CinematicParallaxHeroProps> = ({ onOpenEnquiry }) => {
  const [current, setCurrent] = useState(0);

  // Exact 5-second autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-28 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Background 900ms Cross-Fade Carousel */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }} // Exact 900ms cross-fade
            className="absolute inset-0"
          >
            <img
              src={heroSlides[current].image}
              alt={heroSlides[current].title}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sleek Modern Light-Wash Gradient Scrim */}
        <div className="absolute inset-0 bg-[#18191b]/40 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18191b]/80 via-transparent to-[#18191b]/50" />
      </div>

      {/* Top Location Bar */}
      <div className="mx-auto max-w-7xl w-full flex items-center justify-between z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.25em] text-white font-medium backdrop-blur-md shadow-sm"
        >
          <span>{resortData.brand.locationShort}</span>
        </motion.div>

        {/* Slide Counter */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/90">
          <span className="text-[#dfc79e] font-bold">0{current + 1}</span>
          <span className="opacity-50">/</span>
          <span className="opacity-70">0{heroSlides.length}</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="mx-auto max-w-4xl text-center z-10 my-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="mx-auto h-12 w-px bg-gradient-to-b from-transparent via-[#dfc79e] to-transparent" />

          {/* EXACT BRAND DISPLAY */}
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white uppercase drop-shadow-sm">
            <span className="block font-serif font-light">COORG LAYA</span>
            <span className="block text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.28em] text-[#dfc79e] mt-2">
              RESORT
            </span>
          </h1>

          <p className="font-heading text-lg sm:text-2xl text-white/95 italic font-light pt-2">
            A Peaceful Escape Into Coorg
          </p>

          <p className="mx-auto max-w-lg text-xs sm:text-sm text-white/85 leading-relaxed font-light px-4">
            Slow down, spend time together, and settle into a more relaxed rhythm in Coorg.
          </p>

          {/* CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 rounded-full bg-[#c5a368] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#18191b] hover:bg-[#dfc79e] transition-all shadow-xl hover:shadow-[#c5a368]/30"
            >
              <Sparkles className="size-4 text-[#18191b]" />
              <span>Enquire About Your Stay</span>
            </button>

            <a
              href="#welcome"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-white/30 transition-all backdrop-blur-md"
            >
              <span>Explore the Resort</span>
              <span className="text-[#dfc79e]">↓</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Controls & Indicators */}
      <div className="mx-auto max-w-7xl w-full flex items-end justify-between z-10 text-xs">
        {/* Carousel Prev/Next Arrows & Pill Indicators */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Pill Indicators */}
          <div className="flex items-center gap-1.5 px-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === index ? 'w-6 bg-[#dfc79e]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Show photograph slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Next photograph"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Scroll prompt */}
        <a
          href="#welcome"
          className="hidden md:inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-white/80 hover:text-[#dfc79e] transition-colors"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="size-3.5 animate-bounce text-[#dfc79e]" />
        </a>

        {/* Current slide caption */}
        <div className="hidden lg:block text-right text-xs text-white/90 max-w-xs">
          <p className="text-white font-medium">{heroSlides[current].title}</p>
          <p className="text-[0.68rem] text-white/75 italic">{heroSlides[current].caption}</p>
        </div>
      </div>
    </section>
  );
};
