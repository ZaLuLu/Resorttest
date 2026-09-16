import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, BedDouble } from 'lucide-react';
import { resortData } from '../../data/resortData';

interface DiagonalCardSliderProps {
  onOpenEnquiry?: () => void;
}

export const DiagonalCardSlider: React.FC<DiagonalCardSliderProps> = ({ onOpenEnquiry }) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const galleryItems = resortData.gallery;

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % galleryItems.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-100 overflow-hidden border-b border-ink-primary/8">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-r from-butter-200/30 via-powder-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Section Narrative Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink-primary/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.25em] font-semibold text-butter-700">
              <Sparkles className="size-3.5 text-butter-600" />
              <span>Chapter 3 · The Sanctuary in Motion</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-primary font-normal">
              A Panoramic Perspective
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              Glide through actual photography of our swimming pool, lush lawns, comfortable room interiors, and bamboo garden terraces.
            </p>
          </div>

          <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-mono self-start md:self-auto">
            Drag or swipe to explore ({galleryItems.length} Photographs)
          </span>
        </div>

        {/* Diagonal Skewed Ribbon Track */}
        <div 
          ref={containerRef}
          className="relative py-10 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ transform: 'rotate(-3deg) scale(1.02)' }}
        >
          <motion.div 
            drag="x"
            dragConstraints={{ left: -1400, right: 0 }}
            className="flex items-center gap-6 sm:gap-8 w-max px-6 sm:px-12"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05, y: -8, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => openLightbox(index)}
                className="group relative w-72 sm:w-96 aspect-[16/11] rounded-3xl overflow-hidden bg-white border border-ink-primary/10 shadow-xl cursor-pointer shrink-0"
              >
                {/* Photo */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/90 via-ink-primary/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[0.65rem] uppercase tracking-wider font-bold text-butter-800 border border-butter-200 shadow-sm">
                    {item.category}
                  </span>

                  <div className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <Maximize2 className="size-4" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-heading text-xl sm:text-2xl font-medium">
                    {item.title}
                  </h3>
                  <p className="text-[0.7rem] text-sand-200 line-clamp-1 font-light mt-0.5">
                    {item.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quick Discovery Navigation Prompt */}
        <div className="flex items-center justify-between text-xs text-ink-muted pt-4">
          <span className="font-mono text-[0.68rem] text-butter-700 font-semibold">
            ✦ Real Verified Resort Grounds
          </span>
          <span className="text-[0.68rem] italic">
            Click any photograph for high-resolution view
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-ink-primary/95 backdrop-blur-2xl"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="size-6" />
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              className="absolute left-6 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              className="absolute right-6 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Main Modal Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <motion.img
                key={activeLightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={galleryItems[activeLightboxIndex].image}
                alt={galleryItems[activeLightboxIndex].alt}
                className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/15"
              />

              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-[0.25em] text-butter-300 font-semibold block mb-1">
                  {galleryItems[activeLightboxIndex].category} · Photo {activeLightboxIndex + 1} of {galleryItems.length}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl text-white">
                  {galleryItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-sand-300 mt-1 max-w-xl mx-auto font-light">
                  {galleryItems[activeLightboxIndex].alt}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
