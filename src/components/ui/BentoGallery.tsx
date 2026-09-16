import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { resortData, GalleryItem } from '../../data/resortData';

interface BentoGalleryProps {
  initialFilter?: string;
  limit?: number;
  showFilters?: boolean;
}

export const BentoGallery: React.FC<BentoGalleryProps> = ({
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
      {/* Category Filter Pills */}
      {showFilters && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-brass-500 text-navy-950 font-semibold shadow-lg shadow-brass-500/20'
                    : 'bg-navy-900/80 text-slate-300 hover:bg-navy-800 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Bento Grid */}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/60 cursor-pointer ${
                isFeatured ? 'sm:col-span-2 sm:row-span-2 aspect-[16/10]' : 'aspect-[4/3]'
              }`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Hover Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="rounded-full border border-white/20 bg-navy-950/80 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-brass-400 backdrop-blur-md">
                    {item.category}
                  </span>

                  <div className="flex size-9 items-center justify-center rounded-full bg-navy-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <Maximize2 className="size-4" />
                  </div>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-heading text-lg sm:text-xl text-white font-medium">
                    {item.title}
                  </h4>
                  <p className="text-[0.72rem] text-slate-300 line-clamp-1 mt-1 font-light opacity-80">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-navy-950/95 backdrop-blur-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 flex size-12 items-center justify-center rounded-full bg-navy-900/80 text-white hover:bg-navy-800 transition-colors border border-white/10"
              aria-label="Close Lightbox"
            >
              <X className="size-6" />
            </button>

            {/* Prev Image */}
            <button
              onClick={prevLightboxImage}
              className="absolute left-6 z-20 flex size-12 items-center justify-center rounded-full bg-navy-900/80 text-white hover:bg-navy-800 transition-colors border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next Image */}
            <button
              onClick={nextLightboxImage}
              className="absolute right-6 z-20 flex size-12 items-center justify-center rounded-full bg-navy-900/80 text-white hover:bg-navy-800 transition-colors border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Image & Caption Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <motion.img
                key={activeLightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={displayedItems[activeLightboxIndex].image}
                alt={displayedItems[activeLightboxIndex].alt}
                className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />

              {/* Caption */}
              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-brass-400 font-semibold block mb-1">
                  {displayedItems[activeLightboxIndex].category} · Photograph {activeLightboxIndex + 1} of {displayedItems.length}
                </span>
                <h3 className="font-heading text-xl text-white">
                  {displayedItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
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
