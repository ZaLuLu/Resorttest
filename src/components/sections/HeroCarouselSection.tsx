import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
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
      image: '/images/amenities/swimming-pool.png',
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
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section id="hero-section" className="relative w-full pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center select-none overflow-hidden">
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Main 3D Clay Hero Frame */}
        <div className="relative rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-10 md:p-12 shadow-[0_24px_50px_rgba(22,41,38,0.08),_inset_0_2px_4px_rgba(255,255,255,0.9)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left z-10">
              
              {/* Location Pill */}
              <CinematicReveal delay={0.05}>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-bold text-[#116B7B] shadow-sm">
                  <Compass className="w-4 h-4 text-[#1A96AA]" />
                  <span>Kushalnagar · Kodagu · 850m ASL</span>
                </div>
              </CinematicReveal>

              {/* Dynamic Slide Title */}
              <div className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                  >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#132422] font-serif leading-[1.14] tracking-tight">
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-sm sm:text-base text-[#344E4A] leading-relaxed font-medium">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Magnetic Action Buttons */}
              <CinematicReveal delay={0.2} className="flex flex-wrap items-center gap-3.5 pt-2">
                <MagneticButton
                  onClick={onOpenEnquiry}
                  className="px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-[0_8px_20px_rgba(26,150,170,0.35)] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Your Stay</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>

                <a
                  href="#rooms"
                  className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-[#132422] bg-[#EFE8DC] hover:bg-[#E4D9C8] border border-[#DFD3C0] transition-colors"
                >
                  Explore 15 Suites
                </a>
              </CinematicReveal>

              {/* Slide Navigation & Indicator Bar */}
              <div className="flex items-center gap-4 pt-3">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-[#FAF6EF] text-[#132422] border border-[#E4D9C8] shadow-sm flex items-center justify-center hover:bg-[#1A96AA] hover:text-white hover:border-[#1A96AA] transition-all"
                  aria-label="Previous Hero Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === idx
                          ? 'w-7 bg-[#1A96AA] shadow-sm'
                          : 'w-2.5 bg-[#D5C7B2] hover:bg-[#A3733E]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-[#FAF6EF] text-[#132422] border border-[#E4D9C8] shadow-sm flex items-center justify-center hover:bg-[#1A96AA] hover:text-white hover:border-[#1A96AA] transition-all"
                  aria-label="Next Hero Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <span className="text-xs font-bold text-[#116B7B] ml-2 font-mono">
                  0{currentSlide + 1} / 0{heroSlides.length}
                </span>
              </div>
            </div>

            {/* Right Top-Fold 3D Parallax Diorama Showcase */}
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

                  {/* Floating Stat Pill Badge */}
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -bottom-4 -left-3 sm:bottom-4 sm:left-4 z-30 px-4 py-2 rounded-2xl bg-[#132422]/90 backdrop-blur-md text-[#FAF6EF] flex items-center gap-2.5 border border-white/20 shadow-lg"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1A96AA] animate-pulse" />
                    <span className="text-xs font-bold">
                      {heroSlides[currentSlide].quickTag}
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroCarouselSection;
