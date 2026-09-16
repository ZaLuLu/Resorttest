import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from 'lucide-react';
import { resortData } from '../../data/resortData';

const categories = ['All', 'Rooms', 'Pool', 'Garden', 'Kids Play Area', 'Badminton', 'Events'] as const;

export const CinematicLightboxGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'All'
    ? resortData.gallery
    : resortData.gallery.filter(item => item.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [activeImageIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [activeImageIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handlePrev, handleNext]);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-50 border-b border-ink-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-butter-700">
            <ImageIcon className="size-3.5 text-butter-600" />
            <span>Visual Gallery</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-primary font-normal">
            Glimpses of Coorg Laya
          </h2>

          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
            Real photography capturing the authentic atmosphere of our rooms, swimming pool, palm walkways, and open recreational lawns.
          </p>

          <div className="mx-auto w-24 butter-divider my-4" />
        </div>

        {/* Category Filter Pills with Layout Animation in Butter & Powder */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full px-5 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-ink-primary shadow-md'
                    : 'bg-white border border-ink-primary/10 text-ink-muted hover:text-ink-primary hover:border-butter-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-butter-300 rounded-full -z-10 border border-butter-400/50"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Photo Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveImageIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-ink-primary/8 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* 16:11 Aspect Frame */}
                <div className="relative aspect-[16/11] overflow-hidden bg-sand-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <div className="flex justify-between items-start">
                      <span className="rounded-full bg-butter-200/90 text-ink-primary backdrop-blur-md px-3 py-1 text-[0.62rem] uppercase tracking-wider font-bold">
                        {item.category}
                      </span>
                      <div className="size-8 rounded-full bg-powder-500/80 backdrop-blur-md flex items-center justify-center text-white">
                        <Maximize2 className="size-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="text-[0.68rem] text-white/80 line-clamp-1 font-light mt-0.5">
                        {item.alt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Meta */}
                <div className="p-4 flex items-center justify-between text-xs bg-white">
                  <span className="font-medium text-ink-primary line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-widest text-butter-700 font-semibold">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Full-Screen Lightbox Modal */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveImageIndex(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveImageIndex(null)}
                  className="absolute -top-12 right-0 size-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="size-5" />
                </button>

                {/* Main Lightbox Frame */}
                <div className="relative w-full overflow-hidden rounded-3xl bg-black border border-white/20 shadow-2xl flex items-center justify-center">
                  <img
                    src={filteredItems[activeImageIndex].image}
                    alt={filteredItems[activeImageIndex].alt}
                    className="max-h-[75vh] w-auto max-w-full object-contain"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </div>

                {/* Caption Bar */}
                <div className="mt-4 w-full flex items-center justify-between text-white text-xs px-2">
                  <div>
                    <span className="text-butter-300 font-semibold uppercase tracking-wider text-[0.65rem] block">
                      {filteredItems[activeImageIndex].category}
                    </span>
                    <h3 className="font-heading text-lg font-medium">
                      {filteredItems[activeImageIndex].title}
                    </h3>
                  </div>

                  <span className="font-mono text-white/70 text-xs">
                    0{activeImageIndex + 1} / 0{filteredItems.length}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
