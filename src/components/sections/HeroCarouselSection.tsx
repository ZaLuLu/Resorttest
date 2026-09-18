import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Compass, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Diorama3DParallax } from '../3d/Diorama3DParallax';
import { MagneticButton } from '../3d/MagneticButton';
import { CinematicReveal } from '../common/CinematicReveal';

interface HeroCarouselSectionProps {
  onOpenEnquiry: () => void;
}

export const HeroCarouselSection: React.FC<HeroCarouselSectionProps> = ({ onOpenEnquiry }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: '/images/resort/resort-exteriors.jpeg',
      badge: 'Resort Architecture · Kushalnagar',
      title: 'Unhurried Days Under the Coorg Sun',
      subtitle: 'A boutique 15-suite natural sanctuary set amidst misty plantation breezes, towering palms, and lush manicured lawns in Kodagu.',
      quickTag: '15 Private Suites · ~45 Guests',
    },
    {
      id: 2,
      image: '/images/amenities/swimming-pool.jpeg',
      badge: 'Palm Pool Deck',
      title: 'Cool Off in Tropical Sanctuary Waters',
      subtitle: 'Circular relaxation shallow pool framed by tall coconut palms, timber loungers, and clean mountain air.',
      quickTag: 'Palm Swimming Pool',
    },
    {
      id: 3,
      image: '/images/resort/garden-lawn.jpeg',
      badge: '500-Guest Celebration Lawn',
      title: 'Open-Air Celebrations Under the Stars',
      subtitle: 'Expansive manicured green lawns tailored for intimate weddings, milestones, retreats, and group gatherings.',
      quickTag: '500-Capacity Lawn',
    },
    {
      id: 4,
      image: '/images/rooms/room-interior-neutral.jpeg',
      badge: 'Peaceful Living Quarters',
      title: 'Restful Suites with Garden Breezes',
      subtitle: 'Thoughtfully designed interiors with handcrafted vanity dressings, en-suite baths, and morning birdsong.',
      quickTag: 'King Plush & Garden Views',
    },
    {
      id: 5,
      image: '/images/resort/garden-terrace.jpeg',
      badge: 'Garden Terraces & Decks',
      title: 'Slow Mornings & Steaming Coorg Coffee',
      subtitle: 'Raised garden decks surrounded by bamboo canopies, fresh estate coffee aromas, and starlit night skies.',
      quickTag: 'Raised Garden Terraces',
    },
    {
      id: 6,
      image: '/images/nearby/kaveri-river.png',
      badge: 'Kaveri River Nature',
      title: 'Discover the Waterways of Kodagu',
      subtitle: 'Minutes from Kaveri Nisargadhama hanging bridge, bamboo groves, Dubare Elephant Camp, and serene riverbanks.',
      quickTag: 'River & Wildlife Exploration',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full select-none">
      
      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO FOLD: PURE LUXURY BRAND SANCTUARY LANDING                   */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero-section"
        className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-between pt-28 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
      >
        {/* Ambient Warm Sunlit Gradient Glow */}
        <div className="absolute top-1/3 inset-x-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[600px] sm:w-[900px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(163,115,62,0.14)_0%,_rgba(26,150,170,0.06)_45%,_transparent_70%)] filter blur-3xl" />
        </div>

        {/* Top Geographic Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EF]/95 border border-[#E4D9C8] text-xs font-bold text-[#845A2C] shadow-[0_4px_14px_rgba(0,0,0,0.08)] backdrop-blur-md z-10 mb-2"
        >
          <Compass className="w-3.5 h-3.5 text-[#1A96AA]" />
          <span className="tracking-wide">12.4542° N · 75.9602° E · 850m ASL · Kodagu</span>
        </motion.div>

        {/* Authentic Center Brand Display */}
        <div className="relative flex flex-col items-center justify-center z-10 my-auto py-4">
          
          {/* Perched Songbird on the tall loop of 'l' */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative -mb-2 sm:-mb-3 z-20"
            style={{ marginLeft: '-95px' }}
          >
            <svg
              viewBox="0 0 48 32"
              className="w-8 h-6 sm:w-10 sm:h-7 text-[#A3733E]"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 6,24 C 10,21 16,17 24,15 C 28,14 34,11 38,7 C 41,4 45,5 44,8 C 43,10 40,14 36,17 C 32,20 28,21 24,22 C 20,23 14,26 6,24 Z" />
              <circle cx="39" cy="8" r="3.5" fill="#132422" />
              <circle cx="40" cy="7.5" r="1.2" fill="#FAF6EF" />
              <path d="M 42,9 L 47,8.5 L 43,11 Z" fill="#A3733E" />
            </svg>
          </motion.div>

          {/* Main Brand Text: laya */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Italiana', 'Cormorant Garamond', serif",
              letterSpacing: '0.04em',
            }}
            className="text-8xl sm:text-9xl md:text-[10.5rem] lg:text-[12rem] font-normal leading-none text-[#132422] drop-shadow-[0_8px_20px_rgba(0,0,0,0.1)] lowercase tracking-normal"
          >
            laya
          </motion.h1>

          {/* R E S O R T */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.55em' }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xs sm:text-sm font-semibold uppercase text-[#A3733E] font-serif block -mt-1 sm:-mt-2 pl-2"
          >
            RESORT
          </motion.span>

          {/* Official Motto & Wavy Line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="space-y-2 mt-4 max-w-lg mx-auto"
          >
            <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#344E4A] font-medium">
              "Where the River Flows & Birds Gather"
            </p>

            {/* Wavy River Line Motif: — ~ — */}
            <div className="flex items-center justify-center gap-3 pt-0.5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#A3733E]" />
              <svg
                viewBox="0 0 40 12"
                className="w-7 h-2.5 text-[#A3733E]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M 2,6 Q 10,1 20,6 T 38,6" />
              </svg>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#A3733E]" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#A3733E] block pl-2">
              COORG
            </span>

            <p className="text-xs sm:text-sm font-semibold text-[#132422] tracking-wide pt-1">
              15 Private Suites · 500-Guest Celebration Lawn · Palm Pool
            </p>
          </motion.div>
        </div>

        {/* Scroll Down Prompt to Second Section */}
        <motion.button
          onClick={() => scrollToSection('showcase-section')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col items-center gap-2 cursor-pointer group z-10 mt-6"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#845A2C]/85 group-hover:text-[#116B7B] transition-colors">
            Explore Sanctuary Spaces
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.12)] text-[#1A96AA] group-hover:bg-[#E5F3F5] transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 2. SECOND SECTION: SANCTUARY HIGHLIGHTS SHOWCASE CAROUSEL           */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section
        id="showcase-section"
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F3F5] text-[#116B7B] text-xs font-bold border border-[#BCE2E7] shadow-[0_4px_10px_rgba(0,0,0,0.06)] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
            <span>Curated Estate Living</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#132422] font-serif leading-tight">
            Discover the Coorg Laya Experience
          </h2>
          <p className="text-sm sm:text-base text-[#344E4A] leading-relaxed mt-2.5">
            An intimate botanical haven where luxury architecture meets unfiltered Western Ghats nature.
          </p>
        </div>

        {/* Main 3D Luxury Showcase Carousel Frame */}
        <div className="relative w-full rounded-3xl sm:rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.18),_inset_0_2px_4px_rgba(255,255,255,0.9)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Slide Narrative & Booking Actions */}
            <div className="lg:col-span-6 space-y-5 text-left z-10">
              
              {/* Location Tag */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-3.5 py-1.5 text-xs font-bold text-[#116B7B] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                <Compass className="w-3.5 h-3.5 text-[#1A96AA]" />
                <span>Kushalnagar · Kodagu · 850m ASL</span>
              </div>

              {/* Dynamic Slide Title */}
              <div className="min-h-[130px] sm:min-h-[150px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-[#132422] font-serif leading-[1.18] tracking-tight">
                      {heroSlides[currentSlide].title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#344E4A] leading-relaxed font-medium">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <MagneticButton
                  onClick={onOpenEnquiry}
                  className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-[0_10px_25px_rgba(0,0,0,0.25)] flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Your Stay</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>

                <a
                  href="/rooms"
                  className="px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-[#132422] bg-[#EFE8DC] hover:bg-[#E4D9C8] border border-[#DFD3C0] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-colors"
                >
                  Explore 15 Suites
                </a>
              </div>

              {/* Slide Navigation & Indicator Bar */}
              <div className="flex items-center gap-3.5 pt-3 border-t border-[#E4D9C8]">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-[#FAF6EF] text-[#132422] border border-[#E4D9C8] shadow-[0_4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#1A96AA] hover:text-white hover:border-[#1A96AA] transition-all cursor-pointer"
                  aria-label="Previous Hero Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === idx
                          ? 'w-8 bg-[#1A96AA] shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
                          : 'w-2.5 bg-[#D5C7B2] hover:bg-[#A3733E]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-[#FAF6EF] text-[#132422] border border-[#E4D9C8] shadow-[0_4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[#1A96AA] hover:text-white hover:border-[#1A96AA] transition-all cursor-pointer"
                  aria-label="Next Hero Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold text-[#116B7B] ml-2 font-mono">
                  0{currentSlide + 1} / 0{heroSlides.length}
                </span>
              </div>
            </div>

            {/* Right Column: 3D Parallax Diorama Showcase Card */}
            <div className="lg:col-span-6 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <Diorama3DParallax
                    imageSrc={heroSlides[currentSlide].image}
                    badge={heroSlides[currentSlide].badge}
                    title={heroSlides[currentSlide].title}
                    subtitle={heroSlides[currentSlide].quickTag}
                  />

                  {/* Floating Stat Badge */}
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -bottom-3 -left-2 sm:bottom-3 sm:left-3 z-30 px-3.5 py-1.5 rounded-xl bg-[#132422]/90 backdrop-blur-md text-[#FAF6EF] flex items-center gap-2 border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#1A96AA] animate-pulse" />
                    <span className="text-xs font-bold">
                      {heroSlides[currentSlide].quickTag}
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HeroCarouselSection;
