import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { resortData } from '../../data/resortData';

interface CinematicPhotoMosaicProps {
  initialFilter?: string;
  limit?: number;
  showFilters?: boolean;
}

export const CinematicPhotoMosaic: React.FC<CinematicPhotoMosaicProps> = ({
  initialFilter = 'All',
  limit,
  showFilters = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Rooms', 'Pool', 'Kids Play Area', 'Garden', 'Events', 'Badminton'];

  const filteredItems = selectedCategory === 'All'
    ? resortData.gallery
    : resortData.gallery.filter((item) => item.category === selectedCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightboxImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % displayedItems.length);
    }
  };

  const prevLightboxImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + displayedItems.length) % displayedItems.length);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Category Pills */}
      {showFilters && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-butter-400 text-ink-primary shadow-sm border border-butter-500/20'
                    : 'bg-white text-ink-muted hover:bg-butter-50 hover:text-ink-primary border border-ink-primary/10 shadow-xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Cinematic Mosaic Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {displayedItems.map((item, index) => {
          const isFeatured = index === 0;
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-3xl border border-ink-primary/8 bg-white cursor-pointer shadow-md sleek-card ${
                isFeatured ? 'sm:col-span-2 sm:row-span-2 aspect-[16/10]' : 'aspect-[4/3]'
              }`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/85 via-ink-primary/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Overlay Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="rounded-full border border-butter-300/30 bg-black/60 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-butter-200 backdrop-blur-md font-semibold">
                    {item.category}
                  </span>

                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-white/30">
                    <Maximize2 className="size-4" />
                  </div>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                  <h4 className="font-heading text-lg sm:text-2xl text-white font-medium">
                    {item.title}
                  </h4>
                  <p className="text-[0.72rem] text-sand-200 line-clamp-1 font-light opacity-90">
                    {item.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-ink-primary/95 backdrop-blur-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="size-6" />
            </button>

            {/* Prev Image */}
            <button
              onClick={prevLightboxImage}
              className="absolute left-6 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next Image */}
            <button
              onClick={nextLightboxImage}
              className="absolute right-6 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Image Container */}
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
                src={displayedItems[activeLightboxIndex].image}
                alt={displayedItems[activeLightboxIndex].alt}
                className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/15"
              />

              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-[0.25em] text-butter-300 font-semibold block mb-1">
                  {displayedItems[activeLightboxIndex].category} · Photo {activeLightboxIndex + 1} of {displayedItems.length}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl text-white">
                  {displayedItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-sand-300 mt-1 max-w-xl mx-auto font-light">
                  {displayedItems[activeLightboxIndex].alt}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
