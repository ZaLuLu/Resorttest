import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Compass } from 'lucide-react';
import { resortData, GalleryItem } from '../../data/resortData';

export const InfinitePhotoMarquee: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const items = resortData.gallery;
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="relative py-20 bg-sand-50 border-b border-ink-primary/8 overflow-hidden">
      {/* Header Eyebrow */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-butter-700">
          <Compass className="size-3.5 text-butter-600" />
          <span>Visual Tapestry</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ink-primary font-normal">
          Captured Moments in Kodagu
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted font-light max-w-xl mx-auto">
          Hover over any photograph to pause the stream or click to open high-definition view.
        </p>
      </div>

      {/* Edge Gradient Scrims */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-sand-50 to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-sand-50 to-transparent z-20" />

      {/* Marquee Track (Left Scrolling) */}
      <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max select-none py-3">
        {marqueeItems.map((item, idx) => (
          <div
            key={`marquee-1-${item.id}-${idx}`}
            onClick={() => setSelectedPhoto(item)}
            className="group relative h-64 sm:h-72 w-80 sm:w-96 flex-shrink-0 overflow-hidden rounded-3xl border border-ink-primary/8 bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Top Badge in Butter Yellow / Powder Blue */}
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-butter-50/90 border border-butter-200 backdrop-blur-md px-3 py-1 text-[0.62rem] uppercase tracking-wider font-bold text-butter-800 shadow-sm">
                {item.category}
              </span>
            </div>

            {/* Hover Expand Icon */}
            <div className="absolute top-4 right-4 size-8 rounded-full bg-powder-500/80 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="size-3.5" />
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-4 left-5 right-5 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <h3 className="font-heading text-lg font-medium text-white line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[0.68rem] text-white/75 font-light line-clamp-1 mt-0.5">
                {item.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-4xl w-full flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 size-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close photo"
              >
                <X className="size-5" />
              </button>

              <div className="overflow-hidden rounded-3xl bg-black border border-white/20 shadow-2xl">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.alt}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="mt-4 w-full flex items-center justify-between text-white text-xs px-2">
                <div>
                  <span className="text-butter-300 font-semibold uppercase tracking-wider text-[0.65rem] block">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-heading text-base font-medium">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <p className="text-[0.7rem] text-white/70 italic hidden sm:block">
                  Coorg Laya Resort · Kushalnagar, Kodagu
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
